import { useState } from 'react';
import { useParams } from 'react-router-dom';

import PageLogicHelper from '../../helpers/PageLogicHelper';
import NewBidLogic from '../NewBid/NewBidLogic';

export default function BookLogic() {
  const {
    API_ORIGIN,
    axios,
    pageStatus,
    setPageStatus,
    getStatusCode,
    navigate,
    useLoadPage,
    pathname,
  } = PageLogicHelper();

  const { conditionOptions, customisationOptions } = NewBidLogic({
    fromOtherPage: true,
  });

  const { uuid: urlUuid } = useParams();
  const [bookData, setBookData] = useState({});
  const [filteredInstitutions, setFilteredInstitutions] = useState([]);
  const [defaultInstitutions, setDefaultInstitutions] = useState();

  useLoadPage(async () => {
    // Fetch the book from its uuid
    try {
      const { data: book } = await axios.get(API_ORIGIN + '/book', {
        params: { uuid: urlUuid },
      });
      if (book) {
        setBookData(book);
      } else {
        setPageStatus('not found');
        return;
      }
    } catch (err) {
      console.log(err);
    }

    // Add user inst pref when page load
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      // Fetch the book from the user
      try {
        const { data: user } = await axios.get(API_ORIGIN + '/user/u', {
          headers: { 'x-access-token': accessToken },
        });

        setFilteredInstitutions(user.institutions);
        setDefaultInstitutions(
          user.institutions.map((institution) => institution.name)
        );
        setPageStatus('active');
      } catch (err) {
        if (getStatusCode(err) === 404) {
          navigate(`/login`, {
            replace: true,
            state: { destination: pathname },
          });
        } else console.log(err);
      }
    } else setPageStatus('active');
  });

  const onInstitutionsChange = (_, newValues) => {
    setFilteredInstitutions(
      newValues.map((newName) => {
        return { name: newName };
      })
    );
  };

  const adaptedBook =
    Boolean(bookData) && Boolean(bookData.bids)
      ? {
          ...bookData,
          bids: bookData.bids.map((bid) => {
            return {
              ...bid,
              customisation: customisationOptions[bid.customisation],
              condition: conditionOptions[bid.condition],
            };
          }),
        }
      : bookData;

  const sortBidsByInstitutions = () => {
    const bids = adaptedBook.bids;
    if (!Boolean(bids)) return {};

    let newSortedBids = {};
    for (const bid of bids) {
      for (const institution of bid.user.institutions) {
        const institutionName = institution.name;
        if (!newSortedBids[institutionName])
          newSortedBids[institutionName] = [];
        newSortedBids[institutionName].push(bid);
      }
    }

    return newSortedBids;
  };

  const sortedBids = adaptedBook ? sortBidsByInstitutions() : [];
  const institutionsOptions = Object.keys(sortedBids).map((institutionName) => {
    return { name: institutionName };
  });

  return {
    pageStatus,
    book: adaptedBook,
    sortedBids,
    institutions:
      filteredInstitutions.length > 0
        ? filteredInstitutions
        : institutionsOptions,
    institutionsOptions,
    onInstitutionsChange,
    defaultInstitutions,
  };
}

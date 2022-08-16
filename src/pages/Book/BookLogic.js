import { useState } from 'react';
import { useParams } from 'react-router-dom';

import PageLogicHelper from '../../helpers/PageLogicHelper';
import NewBidLogic from '../NewBid/NewBidLogic';

export default function () {
  const {
    API_ORIGIN,
    axios,
    pageStatus,
    setPageStatus,
    getStatusCode,
    navigate,
    useLoadPage,
    pathname,
    location,
  } = PageLogicHelper();

  const { conditionOptions, customisationOptions } = NewBidLogic({
    fromOtherPage: true,
  });

  const { uuid: urlUuid } = useParams();
  const [bookData, setBookData] = useState({});
  const [filteredInstitutions, setFilteredInstitutions] = useState([]);

  useLoadPage(async () => {
    // Fetch the book from its uuid
    axios
      .get(API_ORIGIN + '/book', { params: { uuid: urlUuid } })
      .then(({ data: book }) => {
        setBookData(book);
        setPageStatus('active');
      })
      .catch((err) => {
        if (getStatusCode(err) === 404) {
          setPageStatus('not found');
        } else console.log(err);
      });

    // TODO : add user inst pref when page load
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

  const sortedBids = sortBidsByInstitutions();

  return {
    pageStatus,
    book: adaptedBook,
    sortedBids,
    institutions:
      filteredInstitutions.length > 0
        ? filteredInstitutions
        : Object.keys(sortedBids).map((institutionName) => {
            return { name: institutionName };
          }),
    onInstitutionsChange,
  };
}

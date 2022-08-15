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
  });

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

  return {
    pageStatus,
    book: adaptedBook,
  };
}

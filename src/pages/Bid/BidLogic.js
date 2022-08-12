import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { HiMail, HiPhone, HiCog } from 'react-icons/hi';
import { GrInstagram } from 'react-icons/gr';

import PageLogicHelper from '../../helpers/PageLogicHelper';

const BidLogic = (props) => {
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

  const { uuid: urlUuid } = useParams();
  const [bidData, setBidData] = useState({});

  useLoadPage(async () => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      // Fetch the book from the user
      axios
        .get(API_ORIGIN + '/user/u', {
          headers: { 'x-access-token': accessToken },
        })
        .then(({ data: user }) => {
          const userBids = user.bids.filter((bid) => bid.uuid === urlUuid);

          if (userBids.length) {
            setBidData(userBids[0]);
            setPageStatus('owner');
          } else fetchBidFromUrl();
        })
        .catch((err) => {
          if (getStatusCode(err) === 404) {
            navigate(`/login`, {
              replace: true,
              state: { destination: pathname },
            });
          } else console.log(err);
        });
    } else {
      fetchBidFromUrl();
    }
  });

  const fetchBidFromUrl = async () => {
    // Fetch the book from its uuid
    axios
      .get('/bid', { params: { uuid: urlUuid } })
      .then(({ data: bid }) => {
        setBidData(bid);
        setPageStatus('active');
      })
      .catch((err) => {
        if (getStatusCode(err) === 404) {
          setPageStatus('not found');
        } else console.log(err);
      });
  };

  return {
    pageStatus,
    bidData,
  };
};

export default BidLogic;

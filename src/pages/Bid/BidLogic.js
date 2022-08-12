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
  } = PageLogicHelper();

  const { username: profileUsername } = useParams();
  const [userData, setUserData] = useState({});
  const [bidData, setBidData] = useState({});

  useLoadPage(async () => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      try {
        const { data: user } = await axios.get(API_ORIGIN + '/user/u', {
          headers: { 'x-access-token': accessToken },
        });
        console.log(user);
      } catch (err) {
        if (getStatusCode(err) === 404) {
          navigate(`/login`, {
            replace: true,
            state: { destination: '/user/u' },
          });
        } else console.log(err);
      }
    } else if (profileUsername === 'u') {
      navigate(`/login`, {
        replace: true,
        state: { destination: '/user/u' },
      });
      return;
    }

    try {
      const { data: user } = await axios.get(API_ORIGIN + '/user', {
        params: { username: profileUsername },
      });
      setUserData(user);
      setPageStatus('guest');
    } catch (err) {
      if (getStatusCode(err) === 404) setPageStatus('not found');
      else console.log(err);
    }
  });

  return {
    username: userData.username,
    bids: userData.bids,
    pageStatus,
  };
};

export default BidLogic;

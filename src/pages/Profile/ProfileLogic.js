import { useState } from 'react';
import { useParams } from 'react-router-dom';

import PageLogicHelper from '../../helpers/PageLogicHelper';

const ProfileLogic = (props) => {
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

  useLoadPage(async () => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      try {
        const { data: user } = await axios.get(API_ORIGIN + '/user/u', {
          headers: { 'x-access-token': accessToken },
        });
        if (user.username === profileUsername || profileUsername === 'u') {
          // If the user is on his own page replace the url with his username
          if (profileUsername === 'u')
            navigate(`/user/${user.username}`, {
              replace: true,
            });

          setUserData(user);
          setPageStatus('owner');
          return;
        }
      } catch (err) {
        console.log(err);
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
      setPageStatus('not found');
    }
  });

  return { userData, pageStatus };
};

export default ProfileLogic;

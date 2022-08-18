import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { HiMail, HiPhone, HiCog } from 'react-icons/hi';
import { GrInstagram } from 'react-icons/gr';

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
  const [searchQuery, setSearchQuery] = useState('');

  const socials = [
    Boolean(userData.email) && {
      text: userData.email,
      link: 'mailto:' + userData.email,
      icon: <HiMail />,
    },

    Boolean(userData.instagram) && {
      text: '@' + userData.instagram,
      link: 'https://www.instagram.com/' + userData.instagram,
      icon: <GrInstagram />,
    },
    Boolean(userData.phone) && {
      text: userData.phone,
      link: 'tel:' + userData.phone,
      icon: <HiPhone />,
    },
    pageStatus === 'owner' && {
      text: 'Modifier mon profil',
      to: `/user/${profileUsername}/edit`,
      icon: <HiCog />,
    },
  ];

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
        if (getStatusCode(err) === 401 || getStatusCode(err) === 404) {
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

  const onSearchChange = ({ target }) => {
    setSearchQuery(target.value);
  };

  const filterBids = () => {
    const queryWords = searchQuery.split(' ');
    if (searchQuery === '') return userData && userData.bids;
    return (
      userData &&
      userData.bids &&
      userData.bids.filter(({ book }) => {
        for (const queryWord of queryWords) {
          if (
            !book.title
              .toLocaleLowerCase()
              .includes(queryWord.toLocaleLowerCase())
          )
            return false;
        }
        return true;
      })
    );
  };

  return {
    username: userData.username,
    pageStatus,
    socials,
    bids: filterBids(),
    onSearchChange,
  };
};

export default ProfileLogic;

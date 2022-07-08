import { useParams } from 'react-router-dom';

import PageLogicHelper from '../../helpers/PageLogicHelper';

const ProfileLogic = (props) => {
  const {
    API_ORIGIN,
    axios,
    /* pageStatus,
    setPageStatus,
    getStatusCode, */
    navigate,
    useLoadPage,
  } = PageLogicHelper();

  const { username } = useParams();
  //let userData;

  useLoadPage(() => {
    if (username === 'u') {
      const accessToken = localStorage.getItem('accessToken');
      if (accessToken) {
        axios
          .get(API_ORIGIN + '/user/u', {
            headers: { 'x-access-token': accessToken },
          })
          .then((user) => {
            console.log(user);
          });
      } else
        navigate(`/login`, {
          replace: true,
          state: { destination: '/user/u' },
        });
    }
  });

  return {};
};

export default ProfileLogic;

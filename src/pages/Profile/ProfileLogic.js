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
    if (username === 'u')
      localStorage.getItem('accessToken')
        ? axios.get(API_ORIGIN + '/user/u').then((user) => {
            console.log(user);
          })
        : navigate(`/login`, { replace: true });
  });

  return {};
};

export default ProfileLogic;

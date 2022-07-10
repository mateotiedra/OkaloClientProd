import { useState } from 'react';
import { useParams } from 'react-router-dom';
import PageLogicHelper from '../../helpers/PageLogicHelper';

const SettingsLogic = (props) => {
  const {
    pageStatus,
    API_ORIGIN,
    axios,
    setPageStatus,
    navigate,
    useLoadPage,
  } = PageLogicHelper();

  const [userData, setUserData] = useState({});

  useLoadPage(
    async () => {
      setPageStatus('active');
    },
    {
      setUserData: (user) => {
        console.log(user);
        navigate(`/user/${user.username}/edit`, { replace: true });
        setUserData(user);
      },
      authNeeded: true,
    }
  );

  return { pageStatus };
};

export default SettingsLogic;

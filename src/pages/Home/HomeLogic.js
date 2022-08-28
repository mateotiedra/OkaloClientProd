import axios from 'axios';
import { useState } from 'react';
import PageLogicHelper from '../../helpers/PageLogicHelper';

const HomeLogic = () => {
  const { navigate, useLoadPage, API_ORIGIN } = PageLogicHelper();
  /* const [bestAder, setBestAder] = useState();
  const [bestInstitutions, setBestInstitutions] = useState();

  useLoadPage(() => {
    axios.get(API_ORIGIN + '');
  }); */

  const goToSearch = () => {
    navigate('/search');
  };

  return { goToSearch };
};

export default HomeLogic;

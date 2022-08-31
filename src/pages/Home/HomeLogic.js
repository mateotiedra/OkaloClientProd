import axios from 'axios';
import { useState } from 'react';
import PageLogicHelper from '../../helpers/PageLogicHelper';

const HomeLogic = () => {
  const { navigate, useLoadPage, API_ORIGIN } = PageLogicHelper();
  const [bestAders, setBestAders] = useState();
  const [bestSellers, setBestSellers] = useState();

  useLoadPage(() => {
    // Fetch the best ader
    axios
      .get(API_ORIGIN + '/user/best')
      .then(({ data }) => setBestAders(data))
      .catch((err) => console.log(err));

    // Fetch the best sellers
    axios
      .get(API_ORIGIN + '/book/best', { params: { limit: 3 } })
      .then(({ data }) => setBestSellers(data))
      .catch((err) => console.log(err));

    /*// Fetch the best school
     axios
      .get(API_ORIGIN + '/institution/best')
      .then(({ data }) => setBestInstitutions(data))
      .catch((err) => console.log(err)); */
  });

  const goToSearch = () => {
    navigate('/search');
  };

  return { goToSearch, bestAders, bestSellers };
};

export default HomeLogic;

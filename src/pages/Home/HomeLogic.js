import { useState } from 'react';

import PageLogicHelper from '../../helpers/PageLogicHelper';

const HomeLogic = () => {
  const {
    pageStatus,
    setPageStatus,
    useLoadPage,
    axios,
    API_ORIGIN,
    setErrorCode,
  } = PageLogicHelper();

  useLoadPage(() => {}, {});

  return {};
};

export default HomeLogic;

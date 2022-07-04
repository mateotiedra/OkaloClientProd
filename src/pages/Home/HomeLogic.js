import { useState } from 'react';

import PageLogicHelper from '../../helpers/PageLogicHelper';

const HomeLogic = () => {
  const { pageStatus, setPageStatus, useLoadPage, axios, API_ORIGIN } =
    PageLogicHelper();

  const [linksDialogOpen, setLinksDialogOpen] = useState(false);

  const handleCloseLinksDialog = () => setLinksDialogOpen(false);
  const handleOpenLinksDialog = () => setLinksDialogOpen(true);

  const [newsList, setNewsList] = useState();

  useLoadPage(() => {
    axios
      .get(API_ORIGIN + '/news/all', { params: { limit: 3 } })
      .then(({ data }) => {
        setNewsList(data);
        setPageStatus('active');
      })
      .catch((err) => {});
  }, {});

  return {
    linksDialogOpen,
    handleCloseLinksDialog,
    handleOpenLinksDialog,
    pageStatus,
    newsList,
  };
};

export default HomeLogic;

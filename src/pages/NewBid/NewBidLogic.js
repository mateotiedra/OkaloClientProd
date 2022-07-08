import PageLogicHelper from '../../helpers/PageLogicHelper';

const NewBidLogic = (props) => {
  const {
    pageStatus,
    API_ORIGIN,
    axios,
    setPageStatus,
    navigate,
    useLoadPage,
  } = PageLogicHelper();

  useLoadPage(async () => {
    const accessToken = localStorage.getItem('accessToken');
    axios
      .get(API_ORIGIN + '/user/u', {
        headers: { 'x-access-token': accessToken },
      })
      .then(() => {
        setPageStatus('step-1');
      })
      .catch(() => {
        // Leave this page if the user couldn't be logged
        navigate(`/login`, {
          replace: true,
          state: { destination: '/new-bid' },
        });
      });
  });

  return { pageStatus };
};

export default NewBidLogic;

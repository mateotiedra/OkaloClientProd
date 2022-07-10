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

  useLoadPage(
    () => {
      setPageStatus('step-1');
    },
    { authNeeded: true }
  );

  return { pageStatus };
};

export default NewBidLogic;

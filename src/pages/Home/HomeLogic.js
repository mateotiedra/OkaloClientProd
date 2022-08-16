import PageLogicHelper from '../../helpers/PageLogicHelper';

const HomeLogic = () => {
  const { navigate } = PageLogicHelper();

  const goToSearch = () => {
    navigate('/search');
  };

  return { goToSearch };
};

export default HomeLogic;

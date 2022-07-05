import PageLogicHelper from '../../helpers/PageLogicHelper';

const HomeLogic = () => {
  const { useLoadPage } = PageLogicHelper();

  useLoadPage(() => {}, {});

  return {};
};

export default HomeLogic;

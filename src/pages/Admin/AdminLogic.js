import PageLogicHelper from '../../helpers/PageLogicHelper';

const ChangePasswordLogic = () => {
  const { API_ORIGIN, axios, navigate, useLoadPage } = PageLogicHelper();

  useLoadPage(() => {
    axios
      .delete(API_ORIGIN + '/admin/clean/books/isbn', {
        headers: { 'x-access-token': localStorage.getItem('accessToken') },
      })
      .then(() => {
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

export default ChangePasswordLogic;

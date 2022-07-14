import { useForm } from 'react-hook-form';
import PageLogicHelper from '../../helpers/PageLogicHelper';

const ChangePasswordLogic = () => {
  const { API_ORIGIN, axios, pageStatus, setPageStatus, navigate } =
    PageLogicHelper();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const changePassword = (formData) => {
    setPageStatus('sending');
    axios
      .put(
        API_ORIGIN + '/auth/change-password',
        { newPassword: formData.newPassword },
        { headers: { 'x-access-token': localStorage.getItem('accessToken') } }
      )
      .then(() => {
        navigate('/user/u/edit');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return {
    changePassword: handleSubmit(changePassword),
    errors,
    register,
    pageStatus,
  };
};

export default ChangePasswordLogic;

import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import PageLogicHelper from '../../helpers/PageLogicHelper';

const ChangePasswordLogic = () => {
  const {
    API_ORIGIN,
    axios,
    pageStatus,
    setPageStatus,
    navigate,
    useLoadPage,
  } = PageLogicHelper();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const { emailToken } = useParams();

  useLoadPage(() => {
    if (emailToken) {
      axios
        .put(API_ORIGIN + '/auth/recover', { emailToken: emailToken })
        .then(({ data }) => {
          navigate(`/user/${data.username}/edit/change-password`);
          localStorage.setItem('accessToken', data.accessToken);
        })
        .catch((err) => {
          console.log(err);
        });
    } else setPageStatus('active');
  });

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

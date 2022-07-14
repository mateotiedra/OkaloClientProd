import { useParams } from 'react-router-dom';
import PageLogicHelper from '../../helpers/PageLogicHelper';

const EmailConfirmationLogic = () => {
  const {
    API_ORIGIN,
    axios,
    pageStatus,
    setPageStatus,
    navigate,
    useLoadPage,
  } = PageLogicHelper();

  const { emailToken } = useParams();

  useLoadPage(() => {
    axios
      .put(API_ORIGIN + '/auth/signup/confirm', {
        emailToken: emailToken,
      })
      .then(({ data }) => {
        localStorage.setItem('accessToken', data.accessToken);
        setPageStatus('ok');
      })
      .catch(() => {
        setPageStatus('expired');
      });
  });

  const goToProfile = () => {
    navigate('/user/u', { replace: true });
  };

  const goToNewLink = () => {
    navigate('/confirm-email/resend');
  };

  return { pageStatus, goToProfile, goToNewLink };
};

export default EmailConfirmationLogic;

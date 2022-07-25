import { useRef } from 'react';
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
  const username = useRef('');

  useLoadPage(() => {
    axios
      .put(API_ORIGIN + '/auth/signup/confirm', {
        emailToken: emailToken,
      })
      .then(({ data }) => {
        username.context = data.username;
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

  const goToSocials = () => {
    navigate(`/user/${username.context}/edit#socials`, { replace: true });
  };

  const goToNewLink = () => {
    navigate('/confirm-email/resend');
  };

  return { pageStatus, goToProfile, goToSocials, goToNewLink };
};

export default EmailConfirmationLogic;

import { useParams } from 'react-router-dom';
import PageLogicHelper from '../../helpers/PageLogicHelper';

const EmailConfirmationLogic = (props) => {
  const {
    API_ORIGIN,
    axios,
    pageStatus,
    setPageStatus,
    getStatusCode,
    navigate,
    useLoadPage,
  } = PageLogicHelper();

  const { emailToken } = useParams();

  useLoadPage(() => {
    axios
      .put(API_ORIGIN + '/auth/signup/confirm', {
        body: {
          emailToken: emailToken,
        },
      })
      .then(({ accessToken }) => {
        localStorage.setItem('accessToken', accessToken);
        setPageStatus('ok');
      })
      .catch(() => {
        setPageStatus('expired');
      });
  });

  return { pageStatus };
};

export default EmailConfirmationLogic;

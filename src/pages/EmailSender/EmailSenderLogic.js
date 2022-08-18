import { useForm } from 'react-hook-form';
import { useLocation, useParams } from 'react-router-dom';
import PageLogicHelper from '../../helpers/PageLogicHelper';

const EmailSenderLogic = () => {
  const {
    API_ORIGIN,
    axios,
    pageStatus,
    setPageStatus,
    getStatusCode,
    navigate,
    useLoadPage,
  } = PageLogicHelper();

  const {
    register,
    setError,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const { action } = useParams();
  const { state } = useLocation();
  const email = state?.email;

  useLoadPage(() => {
    setPageStatus(action);
  });

  const switchTo = (newPageAction) => () => {
    navigate('/confirm-email/' + newPageAction);
    setPageStatus(newPageAction, { replace: true });
  };

  const resend = ({ email }) => {
    axios
      .put(API_ORIGIN + '/auth/signup/resend', {
        email: email,
      })
      .then(() => {
        navigate('/confirm-email/sent', {
          replace: true,
          state: { email: email },
        });
        setPageStatus('sent');
      })
      .catch((err) => {
        switch (getStatusCode(err)) {
          case 404:
            setError('email', {
              type: 'custom',
              message: 'Cette adresse email ne correspond à aucun compte',
            });
            break;
          case 403:
            setError('email', {
              type: 'custom',
              message: 'Tu a déjà confirmé ton adresse email',
            });
            break;
          case 409:
            setError('email', {
              type: 'custom',
              message:
                'Tu as déjà reçu un mail de confirmation à cette adresse, attends quelques minutes avant de réessayer',
            });
            break;
          default:
            console.log(err);
            break;
        }
      });
  };

  const resetPassword = ({ email }) => {
    axios
      .put(API_ORIGIN + '/auth/reset-password', {
        email: email,
      })
      .then(() => {
        navigate('/confirm-email/reset-password-sent', {
          replace: true,
          state: { email: email },
        });
        setPageStatus('reset-password-sent');
      })
      .catch((err) => {
        switch (getStatusCode(err)) {
          case 404:
            setError('email', {
              type: 'custom',
              message: 'Cette adresse email ne correspond à aucun compte',
            });
            break;
          case 409:
            setError('email', {
              type: 'custom',
              message:
                'Attends quelques minutes avant de demander un autre email de confirmation',
            });
            break;
          default:
            console.log(err);
            break;
        }
      });
  };

  return {
    pageStatus,
    email,
    register,
    errors,
    switchTo,
    resend: handleSubmit(resend),
    resetPassword: handleSubmit(resetPassword),
  };
};

export default EmailSenderLogic;

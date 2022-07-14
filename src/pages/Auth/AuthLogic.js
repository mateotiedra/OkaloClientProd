import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';

import PageLogicHelper from '../../helpers/PageLogicHelper';

const AuthLogic = ({ startingMode }) => {
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

  const { state } = useLocation();

  const destination = state?.destination;

  const [loginMode, setLoginMode] = useState(startingMode === 'login');
  const [displayResend, setDisplayResend] = useState(false);

  const switchLoginMode = () => {
    // TODO : reset fields error
    loginMode
      ? navigate('/register', {
          replace: true,
        })
      : navigate('/login', {
          replace: true,
        });

    setLoginMode(!loginMode);
  };

  useLoadPage(() => {
    const accessToken = localStorage.getItem('accessToken');
    accessToken &&
      axios
        .get(API_ORIGIN + '/user/u', {
          headers: {
            'x-access-token': accessToken,
          },
        })
        .then(() => {
          navigate('/user/u', { replace: true });
        })
        .catch((err) => {
          if (getStatusCode(err) === 401 || getStatusCode(err) === 404) {
            localStorage.removeItem('accessToken');
          }
        });
  });

  const onSubmit = (login) => (formData) => {
    setPageStatus('sending');
    axios
      .post(API_ORIGIN + '/auth/' + (login ? 'signin' : 'signup'), {
        email: formData.email,
        password: formData.password,
        username: formData.username,
      })
      .then((res) => {
        switch (res.status) {
          case 200:
            localStorage.setItem('accessToken', res.data.accessToken);
            navigate(destination || '/', { replace: true });
            break;
          case 201:
            navigate('/confirm-email/sent', {
              state: { email: formData.email },
            });
            break;
          case 202:
            setDisplayResend(true);
            setError('email', {
              type: 'custom',
              message: 'Adresse email pas encore confirmée',
            });
            break;
          default:
            break;
        }
      })
      .catch((err) => {
        switch (getStatusCode(err)) {
          case 403:
            console.log('heere');
            setError('password', {
              type: 'custom',
              message: 'Mot de passe incorrect',
            });
            break;

          case 404:
            setError('email', {
              type: 'custom',
              message: 'Adresse email inconnue',
            });
            break;

          case 409:
            if (err.response.data.message.includes('email'))
              setError('email', {
                type: 'custom',
                message: 'Adresse déjà utilisée par un autre compte',
              });
            else
              setError('username', {
                type: 'custom',
                message: "Nom d'utilisateur déjà utilisée par un autre compte",
              });
            break;

          default:
            console.log(err);
            break;
        }
      })
      .finally(() => {
        setPageStatus('active');
      });
  };

  const fields = loginMode
    ? [
        {
          id: 'email',
          label: 'Email',
          registration: {
            required: true,
            pattern: /^[\w]+@([\w-]+\.)+[\w-]{2,4}$/g,
          },
        },
        {
          id: 'password',
          password: true,
          label: 'Mot de passe',
          registration: { required: true },
        },
      ]
    : [
        {
          id: 'username',
          label: "Nom d'utilisateur",
          registration: { required: true },
        },
        {
          id: 'email',
          label: 'Email',
          registration: {
            required: true,
            pattern: /^[\w]+@([\w-]+\.)+[\w-]{2,4}$/g,
          },
        },
        {
          id: 'password',
          password: true,
          label: 'Mot de passe',
          registration: { required: true },
        },
      ];

  return {
    pageStatus,
    register,
    errors,
    onSubmit: handleSubmit(onSubmit(loginMode)),
    loginMode,
    switchLoginMode,
    fields,
    displayResend,
  };
};

export default AuthLogic;

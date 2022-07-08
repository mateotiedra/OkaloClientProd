import { useState } from 'react';
import { useForm } from 'react-hook-form';

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

  const [loginMode, setLoginMode] = useState(startingMode === 'login');

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
      })
      .then((res) => {
        switch (res.status) {
          case 200:
            localStorage.setItem('accessToken', res.data.accessToken);
            navigate('/', { replace: true });
            break;
          case 201:
            navigate('/confirm-email/sent', {
              state: { email: formData.email },
            });
            break;
          case 202:
            setError('email', {
              type: 'custom',
              message: 'Adresse email pas encore confirmée',
            });
            break;
        }
      })
      .catch((err) => {
        if (login) {
          if (getStatusCode(err) === 404) {
            setError('email', {
              type: 'custom',
              message: 'Adresse email inconnue',
            });
          } else if (getStatusCode(err) === 403) {
            setError('password', {
              type: 'custom',
              message: 'Mot de passe incorrect',
            });
          }
        } else {
          if (getStatusCode(err) === 409) {
            setError('email', {
              type: 'custom',
              message: 'Adresse déjà utilisée par un autre compte',
            });
          } else {
            //console.log('fdsfdsafdsafdsafsda');
          }
        }
      })
      .finally(() => {
        setPageStatus('active');
      });
  };

  return {
    pageStatus,
    register,
    errors,
    onSubmit: handleSubmit(onSubmit(loginMode)),
    loginMode,
    switchLoginMode,
  };
};

export default AuthLogic;

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
    loginMode
      ? navigate('/membre/inscription', {
          replace: true,
        })
      : navigate('/membre/connexion', {
          replace: true,
        });

    setLoginMode(!loginMode);
  };

  useLoadPage(() => {
    axios
      .get(API_ORIGIN + '/user/u', {
        headers: {
          'x-access-token': localStorage.getItem('accessToken'),
        },
      })
      .then(() => {
        navigate('/membre', { replace: true });
      })
      .catch((err) => {
        if (getStatusCode(err) === 401) {
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
      .then(({ data }) => {
        if (login) {
          localStorage.setItem('accessToken', data.accessToken);
          navigate('/membre', { replace: true });
        } else {
          onSubmit(true)(formData);
        }
      })
      .catch((err) => {
        if (login) {
          if (getStatusCode(err) === 404) {
            setError('email', { type: 'custom', message: 'Adresse inconnue' });
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
            console.log('fdsfdsafdsafdsafsda');
          }
        }
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

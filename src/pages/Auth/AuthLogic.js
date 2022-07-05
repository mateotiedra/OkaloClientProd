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
    console.log(API_ORIGIN + '/auth/' + (login ? 'signin' : 'signup'));
    axios
      .post(API_ORIGIN + '/auth/' + (login ? 'signin' : 'signup'), {
        email: formData.email,
        password: formData.password,
      })
      .then((res) => {
        if (res.status === 200) {
          if (login) {
            localStorage.setItem('accessToken', res.data.accessToken);
            navigate('/', { replace: true });
          } else {
            console.log('email sent');
            onSubmit(true)(formData);
          }
        } else if (res.status === 202) {
          setError('email', {
            type: 'custom',
            message: 'Adresse email pas encore confirmée',
          });
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

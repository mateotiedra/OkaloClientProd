import { useRef, useState } from 'react';
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
    clearErrors,
  } = useForm();

  const { state } = useLocation();

  const destination = state?.destination;

  const [displayResend, setDisplayResend] = useState(false);

  // Institutions managment
  const [institutions, setInstitutions] = useState([]);
  const userInstitutions = useRef([]);

  useLoadPage(() => {});

  const onSubmit = (formData) => {
    // If the user register it add some checks
    setPageStatus('loading');
    axios
      .post(API_ORIGIN + '/auth/signup', {
        email: formData.email,
        password: 'contributor',
        username: formData.email,
        institutionIds: [1],
      })
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setPageStatus('success');
      });
  };

  const fields = [
    {
      id: 'email',
      label: 'Email',
      registration: {
        required: true,
        // eslint-disable-next-line
        pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
      },
    },
  ];

  return {
    pageStatus,
    register,
    errors,
    onSubmit: handleSubmit(onSubmit),
    fields,
  };
};

export default AuthLogic;

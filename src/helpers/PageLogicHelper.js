import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import axios from 'axios';

import AppConfig from '../config/AppConfig';
import AxiosHelper from './AxiosHelper';
import ErrorHandlerContext from '../ErrorHandler/ErrorHandlerContext';

const PageLogic = () => {
  const { API_ORIGIN } = AppConfig();
  const { getStatusCode, setInterceptors } = AxiosHelper(axios);
  const { setErrorCode } = useContext(ErrorHandlerContext);
  let navigate = useNavigate();
  let params = useParams();

  const [pageStatus, setPageStatus] = useState('loading');
  const hasFetchedData = useRef(false);

  const useLoadPage = (actionIn, options) => {
    useEffect(() => {
      const { actionOut, allowedRoles, setUserData, mustFetchUserData } =
        options || {};
      if (!hasFetchedData.current) {
        hasFetchedData.current = true;
        setInterceptors(setErrorCode);
        if (allowedRoles || setUserData || mustFetchUserData)
          fetchUserData(allowedRoles, setUserData).then((userData) => {
            actionIn && actionIn(userData);
          });
        else actionIn && actionIn();
      }
      return () => {
        if (actionOut) return actionOut;
      };
    }, [actionIn, options]);
  };

  const fetchUserData = (allowedRoles, setUserData) =>
    new Promise((resolve, reject) => {
      if (localStorage.getItem('accessToken')) {
        axios
          .get(API_ORIGIN + '/user/u', {
            headers: {
              'x-access-token': localStorage.getItem('accessToken'),
            },
          })
          .then(({ data }) => {
            const user = data;
            if (allowedRoles) {
              if (
                allowedRoles.includes(user.role) &&
                user.status === 'active'
              ) {
                setUserData && setUserData(user);
              } else {
                navigate('/', { replace: true });
                reject();
              }
            } else {
              setUserData && setUserData(user);
            }
            resolve(user);
          })
          .catch((err) => {
            if (
              allowedRoles &&
              (getStatusCode(err) === 401 || getStatusCode(err) === 403)
            ) {
              localStorage.removeItem('accessToken');
              navigate('/membre/connexion', { replace: true });
              reject();
            }
          });
      } else if (allowedRoles) {
        navigate('/membre/connexion', { replace: true });
      } else {
        resolve();
      }
    });

  return {
    API_ORIGIN,
    getStatusCode,
    pageStatus,
    setPageStatus,
    axios,
    navigate,
    useLoadPage,
    params,
    setErrorCode,
  };
};

export default PageLogic;

import { useContext, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

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
  let { pathname } = useLocation();

  const [pageStatus, setPageStatus] = useState('loading');
  const hasFetchedData = useRef(false);

  const useLoadPage = (actionIn, options) => {
    useEffect(() => {
      const { actionOut, allowedRoles, setUserData, authNeeded } =
        options || {};
      if (!hasFetchedData.current) {
        hasFetchedData.current = true;
        setInterceptors(setErrorCode);
        if (allowedRoles || setUserData || authNeeded)
          fetchUserData(allowedRoles, setUserData, authNeeded).then(
            (userData) => {
              actionIn && actionIn(userData);
            }
          );
        else actionIn && actionIn();
      }
      return () => {
        if (actionOut) return actionOut;
      };
    }, [actionIn, options]);
  };

  const fetchUserData = (allowedRoles, setUserData, authNeeded) =>
    new Promise((resolve, reject) => {
      console.log('heere');
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
              navigate('/login', {
                replace: true,
                state: { destination: pathname },
              });
              reject();
            }
          });
      } else if (allowedRoles || authNeeded) {
        navigate('/login', { replace: true, state: { destination: pathname } });
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

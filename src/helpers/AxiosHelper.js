const AxiosConfig = (axios) => {
  const setInterceptors = (setErrorCode) => {
    axios.interceptors.response.use(
      function (res) {
        console.log(res.status);

        setErrorCode(res.status);
        return res;
      },
      function (err) {
        console.log(err);
        console.log(!err.response, err.response.status >= 500);
        if (!err.response || err.response.status >= 500) {
          setErrorCode(500);
        } else {
          return Promise.reject(err);
        }
      }
    );
  };

  const errorCodeEquals = (err, statusCode) => {
    return (
      err &&
      err.response &&
      err.response.status &&
      err.response.status === statusCode
    );
  };

  const getStatusCode = (err) => {
    if (err && err.response && err.response.status) return err.response.status;
    return NaN;
  };

  return { setInterceptors, errorCodeEquals, getStatusCode };
};

export default AxiosConfig;

const AppConfig = () => {
  const API_ORIGIN =
    process.env.NODE_ENV === 'development'
      ? process.env.REACT_APP_API_URL_DEVELOPMENT
      : process.env.REACT_APP_API_URL_PRODUCTION;

  return { API_ORIGIN: API_ORIGIN };
};

export default AppConfig;

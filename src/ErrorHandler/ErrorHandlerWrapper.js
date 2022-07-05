import { useState } from 'react';
import Context from './ErrorHandlerContext';

function ErrorHandlerWrapper({ children }) {
  const [errorCode, setErrorCode] = useState(200);
  console.log(errorCode);

  return (
    <Context.Provider value={{ errorCode, setErrorCode }}>
      {children}
    </Context.Provider>
  );
}

export default ErrorHandlerWrapper;

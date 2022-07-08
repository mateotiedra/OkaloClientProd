import React from 'react';

import EmailConfirmationLogic from './EmailConfirmationLogic';
import AlertPage from '../../components/AlertPage/AlertPage';

function EmailConfirmation(props) {
  const { pageStatus } = EmailConfirmationLogic();
  console.log(pageStatus);
  return <AlertPage />;
}

export default EmailConfirmation;

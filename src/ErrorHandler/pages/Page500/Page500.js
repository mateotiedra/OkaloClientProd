import React, { useContext } from 'react';
import ErrorHandlerContext from '../../ErrorHandlerContext';

import AlertPage from '../../../components/AlertPage/AlertPage';
import { Link, Typography } from '@mui/material';

function Page500() {
  const { setErrorCode } = useContext(ErrorHandlerContext);
  return (
    <AlertPage
      title='Oops.. Le serveur a crashé'
      body={
        <Typography>
          Il semblerait que nos serveurs rencontrent quelques problèmes
          concernants cette action... Merci de réessayer plus tard et de
          contacter{' '}
          <Link href='mailto:okalo@contact.com'>okalo@contact.com</Link> si le
          problème persiste.
        </Typography>
      }
      ctaButtons={[
        {
          text: 'Réessayer',
          onClick: () => {
            setErrorCode(200);
            window.location.reload();
          },
        },
      ]}
    />
  );
}

export default Page500;

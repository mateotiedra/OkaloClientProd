import React from 'react';

import EmailConfirmationLogic from './EmailConfirmationLogic';
import AlertPage from '../../components/AlertPage/AlertPage';
import Loading from '../Loading/Loading';

function EmailConfirmation(props) {
  const { pageStatus, goToProfile } = EmailConfirmationLogic();
  console.log(pageStatus);

  if (pageStatus === 'loading') return <Loading />;

  if (pageStatus === 'expired')
    return (
      <AlertPage
        title='Oops.. Lien erroné'
        body='Le lien est erroné ou a expiré. Tu peux réessayer ou en demander un nouveau.'
        error={true}
        ctaButtons={[{ text: 'Nouveau lien', onclick: goToProfile }]}
      />
    );

  if (pageStatus === 'ok')
    return (
      <AlertPage
        title='Adresse email confirmée'
        body="Ton compte est maintenant finalisé. N'hésite pas à ajouter d'autres moyens de contact afin de faciliter la communication avec tes futurs acheteurs !"
        ctaButtons={[{ text: 'Accéder à mon profile' }]}
      />
    );
}

export default EmailConfirmation;

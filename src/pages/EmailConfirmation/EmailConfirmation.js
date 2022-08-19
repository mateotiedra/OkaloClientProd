import React from 'react';

import EmailConfirmationLogic from './EmailConfirmationLogic';
import AlertPage from '../../components/AlertPage/AlertPage';
import Loading from '../Loading/Loading';

function EmailConfirmation() {
  const { pageStatus, goToProfile, goToSocials, goToNewLink } =
    EmailConfirmationLogic();

  if (pageStatus === 'loading') return <Loading />;

  if (pageStatus === 'expired')
    return (
      <AlertPage
        title='Oops.. Lien erroné'
        body='Le lien est erroné ou a expiré. Tu peux réessayer ou en demander un nouveau.'
        error={true}
        ctaButtons={[{ text: 'Nouveau lien', onClick: goToNewLink }]}
      />
    );

  if (pageStatus === 'ok')
    return (
      <AlertPage
        title='Compte créé'
        body="Ton compte est maintenant finalisé. N'hésite pas à ajouter d'autres moyens de contact afin de faciliter la communication avec tes futurs acheteurs ! Ils ont pour l'instant uniquement accès à ton adresse email."
        ctaButtons={[
          { text: 'Ajouter', onClick: goToSocials },
          {
            text: 'Plus tard',
            onClick: goToProfile,
            variant: 'outlined',
          },
        ]}
      />
    );
}

export default EmailConfirmation;

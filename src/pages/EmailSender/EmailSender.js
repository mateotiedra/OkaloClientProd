import React from 'react';

import AlertPage from '../../components/AlertPage/AlertPage';
import { Typography, Link, TextField } from '@mui/material';
import FormFields from '../../components/FormFields/FormFields';
import { HiMailOpen } from 'react-icons/hi';

import EmailSenderLogic from './EmailSenderLogic';
import Navbar from '../../components/Navbar/Navbar';

function EmailSender(props) {
  const {
    pageStatus,
    email,
    resend,
    register,
    errors,
    switchTo,
    resetPassword,
  } = EmailSenderLogic();

  if (pageStatus === 'sent')
    return (
      <AlertPage
        title='Email de confirmation'
        body={
          <Typography>
            Afin de finaliser la création de ton compte, clique sur le lien de
            confirmation que tu vas recevoir par email à l'adresse suivante :{' '}
            <Link>{email}</Link>. Il peut prendre quelques minutes à arriver.
          </Typography>
        }
        ctaButtons={[
          { text: 'Envoyer un nouvel email', onClick: switchTo('resend') },
        ]}
      />
    );

  if (pageStatus === 'reset-password-sent')
    return (
      <AlertPage
        title='Email de réinitialisation'
        body={
          <Typography>
            Afin de définir un nouveau mot de passe, clique sur le lien de
            réinitialisation que tu vas recevoir par email à l'adresse suivante
            : <Link>{email}</Link>. Il peut prendre quelques minutes à arriver.
          </Typography>
        }
        ctaButtons={[
          {
            text: 'Envoyer un nouvel email',
            onClick: switchTo('reset-password'),
          },
        ]}
      />
    );
  if (pageStatus === 'resend')
    return (
      <>
        <Navbar empty coverPage />
        <FormFields
          page={true}
          centered
          title={'Nouvel email de confirmation'}
          avatarIcon={<HiMailOpen />}
          onSubmit={resend}
          register={register}
          sending={pageStatus === 'sending'}
          buttonText={'Envoyer'}
          errors={errors}
          fields={[
            {
              id: 'email',
              label: 'Adresse email du compte',
              registration: { pattern: /^[\w]+@([\w-]+\.)+[\w-]{2,4}$/g },
            },
          ]}
        />
      </>
    );

  if (pageStatus === 'reset-password')
    return (
      <>
        <Navbar empty coverPage />
        <FormFields
          page={true}
          centered
          title={'Réinitialistion du mot de passe'}
          avatarIcon={<HiMailOpen />}
          onSubmit={resetPassword}
          register={register}
          sending={pageStatus === 'sending'}
          buttonText={'Réinitialiser le mot de passe'}
          errors={errors}
          fields={[
            {
              id: 'email',
              label: 'Adresse email du compte',
              registration: { pattern: /^[\w]+@([\w-]+\.)+[\w-]{2,4}$/g },
            },
          ]}
        />
      </>
    );
}

export default EmailSender;

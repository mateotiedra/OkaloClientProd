import React from 'react';

import EmailSenderLogic from './EmailSenderLogic';
import AlertPage from '../../components/AlertPage/AlertPage';
import Loading from '../Loading/Loading';
import { Typography, Link, TextField } from '@mui/material';

function EmailSender(props) {
  const { pageStatus, email, resend, register, errors, switchTo } =
    EmailSenderLogic();

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
  if (pageStatus === 'resend')
    return (
      <AlertPage
        title='Nouvel email de confirmation'
        onSubmit={resend}
        noValidate
        component='form'
        body={
          <TextField
            id='email'
            label='Adresse email'
            autoComplete='email'
            autoFocus
            helperText={errors['email'] && errors['email'].message}
            error={errors['email'] !== undefined}
            {...register('email', {
              required: true,
              pattern: /^[\w]+@([\w-]+\.)+[\w-]{2,4}$/g,
            })}
          />
        }
        ctaButtons={[
          {
            text: 'Envoyer',
            onClick: resend,
          },
        ]}
      />
    );
}

export default EmailSender;

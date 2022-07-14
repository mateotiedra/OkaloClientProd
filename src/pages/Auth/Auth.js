import * as React from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import { Avatar, Link, Grid, Box, Typography, TextField } from '@mui/material';
import { HiUser } from 'react-icons/hi';
import { HashLink as RouterLink } from 'react-router-hash-link';

import PasswordField from '../../components/PasswordField/PasswordField';
import Navbar from '../../components/Navbar/Navbar';
import SectionContainer from '../../components/SectionContainer/SectionContainer';
import Footer from '../../components/Footer/Footer';

import AuthLogic from './AuthLogic';
import FormFields from '../../components/FormFields/FormFields';

function RegisterFields({ register, errors }) {
  return (
    <>
      <TextField
        id='username'
        label="Nom d'utilisateur"
        autoFocus
        helperText={errors['username'] && errors['username'].message}
        error={errors['username'] !== undefined}
        {...register('username', {
          required: true,
        })}
      />
    </>
  );
}

export default function Auth(props) {
  const {
    register,
    errors,
    onSubmit,
    pageStatus,
    loginMode,
    switchLoginMode,
    fields,
    displayResend,
  } = AuthLogic(props);

  return (
    <>
      <Navbar empty coverPage />
      <FormFields
        page
        centered
        title={loginMode ? 'Connexion' : 'Inscription'}
        avatarIcon={<HiUser />}
        onSubmit={onSubmit}
        register={register}
        sending={pageStatus === 'sending'}
        buttonText={loginMode ? 'Se connecter' : "S'inscrire"}
        errors={errors}
        fields={fields}
        extraComponents={
          displayResend && {
            0: (
              <Link
                sx={{ alignSelf: 'flex-end' }}
                component={RouterLink}
                to='/confirm-email/resend'
              >
                <Typography variant='body2'>
                  Renvoyer un code de confirmation
                </Typography>
              </Link>
            ),
          }
        }
      >
        <Grid container>
          <Grid item xs>
            <Link variant='body2' onClick={switchLoginMode}>
              {loginMode ? "S'inscrire" : 'Se connecter'}
            </Link>
          </Grid>
          <Grid item md>
            <Link href='#' variant='body2'>
              {loginMode && false && 'Mot de passe oublié ?'}
            </Link>
          </Grid>
        </Grid>
        <Footer />
      </FormFields>
    </>
  );
}

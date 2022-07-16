import * as React from 'react';
import { Link, Typography, Box } from '@mui/material';
import { HiUser } from 'react-icons/hi';
import { HashLink as RouterLink } from 'react-router-hash-link';

import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import FormFields from '../../components/FormFields/FormFields';

import AuthLogic from './AuthLogic';

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
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Link variant='body2' onClick={switchLoginMode}>
            {loginMode ? "S'inscrire" : 'Se connecter'}
          </Link>
          <Link
            href='#'
            component={RouterLink}
            variant='body2'
            to='/confirm-email/reset-password'
          >
            {loginMode && 'Mot de passe oublié ?'}
          </Link>
        </Box>
        <Footer />
      </FormFields>
    </>
  );
}

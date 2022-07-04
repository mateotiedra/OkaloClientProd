import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import LoadingButton from '@mui/lab/LoadingButton';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import { FiUser } from 'react-icons/fi';

import FormTextField from '../../components/FormTextField/FormTextField';
import PasswordField from '../../components/PasswordField/PasswordField';
import Navbar from '../../components/Navbar/Navbar';

import AuthLogic from './AuthLogic';

function Copyright(props) {
  return (
    <Typography
      variant='body2'
      color='text.secondary'
      align='center'
      {...props}
    >
      {'Copyright © '}
      <Link color='inherit' href='https://mui.com/'>
        CTT Bernex
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// Signin/signup page 'https://cttbernex.ch/membre/connexion'
export default function Auth({ startingMode }) {
  const { register, errors, onSubmit, pageStatus, loginMode, switchLoginMode } =
    AuthLogic({ startingMode: startingMode });

  return (
    <>
      <Navbar coverPage empty />
      <Container
        component='main'
        maxWidth='xs'
        sx={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1 }}>
            <FiUser />
          </Avatar>
          <Typography component='h1' variant='h5'>
            {loginMode ? 'Connexion' : 'Inscription'}
          </Typography>
          <Box component='form' onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
            <FormTextField
              required
              id='email'
              label='Adresse email'
              autoComplete='email'
              autoFocus
              errors={errors}
              registration={register('email', {
                required: true,
                pattern: /^[\w]+@([\w-]+\.)+[\w-]{2,4}$/g,
              })}
            />
            <PasswordField
              required
              id='password'
              label='Mot de passe'
              errors={errors}
              registration={register('password', {
                required: true,
              })}
            />
            <LoadingButton
              variant='contained'
              type='submit'
              disableElevation
              fullWidth
              sx={{ mt: 3, mb: 2 }}
              loading={pageStatus === 'sending'}
            >
              {loginMode ? 'Se connecter' : "S'inscrire"}
            </LoadingButton>
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
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </>
  );
}

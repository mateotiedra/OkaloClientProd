import * as React from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import { Avatar, Link, Grid, Box, Typography, TextField } from '@mui/material';

import { HiUser } from 'react-icons/hi';

import PasswordField from '../../components/PasswordField/PasswordField';
import Navbar from '../../components/Navbar/Navbar';
import SectionContainer from '../../components/SectionContainer/SectionContainer';
import Footer from '../../components/Footer/Footer';

import AuthLogic from './AuthLogic';

export default function Auth({ startingMode }) {
  const { register, errors, onSubmit, pageStatus, loginMode, switchLoginMode } =
    AuthLogic({ startingMode: startingMode });

  return (
    <>
      <Navbar coverPage empty />
      <SectionContainer
        component='main'
        maxWidth='sm'
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
            <HiUser />
          </Avatar>
          <Typography component='h1' variant='h5'>
            {loginMode ? 'Connexion' : 'Inscription'}
          </Typography>
          <Box component='form' onSubmit={onSubmit} noValidate sx={{ mt: 2 }}>
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
              fullWidth
              sx={{ mt: 3, mb: 2 }}
              loading={pageStatus === 'sending'}
            >
              <Typography variant='body1'>
                {loginMode ? 'Se connecter' : "S'inscrire"}
              </Typography>
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
        <Footer push={false} />
      </SectionContainer>
    </>
  );
}
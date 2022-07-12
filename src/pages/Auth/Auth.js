import * as React from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import { Avatar, Link, Grid, Box, Typography, TextField } from '@mui/material';

import { HiUser } from 'react-icons/hi';

import PasswordField from '../../components/PasswordField/PasswordField';
import Navbar from '../../components/Navbar/Navbar';
import SectionContainer from '../../components/SectionContainer/SectionContainer';
import Footer from '../../components/Footer/Footer';

import AuthLogic from './AuthLogic';

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

export default function Auth({ startingMode }) {
  const { register, errors, onSubmit, pageStatus, loginMode, switchLoginMode } =
    AuthLogic({ startingMode: startingMode });

  return (
    <>
      <Navbar coverPage empty />
      <SectionContainer
        maxWidth='sm'
        sx={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          pt: 8,
        }}
      >
        <Avatar sx={{ m: 1 }}>
          <HiUser />
        </Avatar>
        <Typography component='h1' variant='h5'>
          {loginMode ? 'Connexion' : 'Inscription'}
        </Typography>
        <Box
          component='form'
          noValidate
          onSubmit={onSubmit}
          sx={{
            mt: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            width: '100%',
          }}
        >
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
          {!loginMode && <RegisterFields register={register} errors={errors} />}
          <PasswordField
            required
            id='password'
            label='Mot de passe'
            error={errors['password'] !== undefined}
            helperText={errors['password'] && errors['password'].message}
            {...register('password', {
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
        <Footer push={false} />
      </SectionContainer>
    </>
  );
}

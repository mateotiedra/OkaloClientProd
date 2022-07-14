import React from 'react';

import { Avatar, Typography, Link, TextField } from '@mui/material';

import Navbar from '../../components/Navbar/Navbar';
import SectionContainer from '../../components/SectionContainer/SectionContainer';
import Loading from '../Loading/Loading';
import SettingsLogic from './SettingsLogic';
import { HiCog } from 'react-icons/hi';
import FormFields from '../../components/FormFields/FormFields';
import AlertPage from '../../components/AlertPage/AlertPage';

function Settings(props) {
  const {
    pageStatus,
    onSubmit,
    register,
    errors,
    fields,
    goToChangePassword,
    changePassword,
  } = SettingsLogic(props);

  if (pageStatus === 'loading') return <Loading />;

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
          <HiCog />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Paramètres
        </Typography>
        <FormFields
          onSubmit={onSubmit}
          register={register}
          sending={pageStatus === 'sending'}
          buttonText='Sauvegarder'
          errors={errors}
          fields={fields}
          extraComponents={{
            2: (
              <>
                <Link
                  sx={{ alignSelf: 'flex-end' }}
                  onClick={goToChangePassword}
                >
                  <Typography variant='body2'>
                    Changer le mot de passe
                  </Typography>
                </Link>
                <Typography variant='h6' sx={{ mt: 2 }}>
                  Autres moyens de contact
                </Typography>
                <Typography variant='body2'>
                  L'adresse email est le moyen de contact acheteur/vendeur par
                  défaut. Pour faciliter les prises de contact, tu peux en
                  ajouter d'autres.
                </Typography>
              </>
            ),
          }}
        />
      </SectionContainer>
    </>
  );
}

export default Settings;

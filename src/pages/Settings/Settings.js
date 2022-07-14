import React from 'react';

import {
  Avatar,
  Typography,
  Link,
  TextField,
  Grid,
  Container,
} from '@mui/material';

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
    logOut,
  } = SettingsLogic(props);

  if (pageStatus === 'loading') return <Loading />;

  return (
    <>
      <Navbar />
      <FormFields
        page={true}
        title='Paramètres'
        avatarIcon={<HiCog />}
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
                sx={{ alignSelf: 'flex-end', mt: 1 }}
                onClick={goToChangePassword}
              >
                <Typography variant='body2'>Changer le mot de passe</Typography>
              </Link>
              <Typography variant='h6' sx={{ mt: 2 }}>
                Autres moyens de contact
              </Typography>
              <Typography variant='body2'>
                L'adresse email est le moyen de contact acheteur/vendeur par
                défaut. Pour faciliter les prises de contact, tu peux en ajouter
                d'autres.
              </Typography>
            </>
          ),
        }}
      >
        <Grid container>
          <Grid item xs>
            <Link variant='body2' onClick={logOut}>
              Se déconnecter
            </Link>
          </Grid>
          <Grid item md></Grid>
        </Grid>
      </FormFields>
    </>
  );
}

export default Settings;

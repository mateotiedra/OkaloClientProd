import React from 'react';

import { Typography, Link, Grid } from '@mui/material';

import { HiCog } from 'react-icons/hi';
import Navbar from '../../components/Navbar/Navbar';
import Loading from '../Loading/Loading';
import SettingsLogic from './SettingsLogic';
import FormFields from '../../components/FormFields/FormFields';
import Footer from '../../components/Footer/Footer';
import SectionContainer from '../../components/SectionContainer/SectionContainer';

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
      <SectionContainer fullPage centered>
        <FormFields
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
                  <Typography variant='body2'>
                    Changer le mot de passe
                  </Typography>
                </Link>
                <Typography variant='h6' id='socials' sx={{ mt: 2 }}>
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

        <Grid container>
          <Grid item xs>
            <Link variant='body2' onClick={logOut}>
              Se déconnecter
            </Link>
          </Grid>
          <Grid item md></Grid>
        </Grid>
        <Footer />
      </SectionContainer>
    </>
  );
  // TODO : add change institutions
}

export default Settings;

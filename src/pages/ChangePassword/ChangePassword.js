import React from 'react';

import { Typography, Link, TextField } from '@mui/material';
import { HiLockOpen } from 'react-icons/hi';

import FormFields from '../../components/FormFields/FormFields';

import SettingsLogic from './ChangePasswordLogic';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';

function Settings(props) {
  const { register, errors, changePassword, pageStatus } = SettingsLogic(props);

  return (
    <>
      <Navbar empty coverPage />
      <FormFields
        page
        centered
        title='Changer le mot de passe'
        avatarIcon={<HiLockOpen />}
        onSubmit={changePassword}
        register={register}
        sending={pageStatus === 'sending'}
        buttonText='Sauvegarder'
        errors={errors}
        fields={[
          { id: 'newPassword', label: 'Nouveau mot de passe', password: true },
        ]}
      >
        <Footer />
      </FormFields>
    </>
  );
}

export default Settings;

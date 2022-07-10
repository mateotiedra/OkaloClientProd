import React from 'react';

import { Avatar, Typography } from '@mui/material';

import Navbar from '../../components/Navbar/Navbar';
import SectionContainer from '../../components/SectionContainer/SectionContainer';
import Loading from '../Loading/Loading';
import SettingsLogic from './SettingsLogic';
import { HiCog } from 'react-icons/hi';

function Settings() {
  const { pageStatus } = SettingsLogic();

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
      </SectionContainer>
    </>
  );
}

export default Settings;

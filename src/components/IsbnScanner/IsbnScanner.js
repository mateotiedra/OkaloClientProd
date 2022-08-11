import React from 'react';

import { Box, Typography } from '@mui/material';
import Navbar from '../Navbar/Navbar';
import SectionContainer from '../SectionContainer/SectionContainer';

import IsbnScannerLogic from './IsbnScannerLogic';
import IconTitle from '../IconTitle/IconTitle';
import { HiCamera } from 'react-icons/hi';

function IsbnScanner(props) {
  const { videoRef } = IsbnScannerLogic(props);

  return (
    <>
      <Navbar coverPage />
      <SectionContainer fullPage centered>
        <IconTitle icon={<HiCamera />}>Scan du codebar</IconTitle>
        <Box
          sx={{
            width: 350,
            height: 200,
            position: 'relative',
            borderRadius: 1.5,
            overflow: 'hidden',
            /* border: 'solid black 10px',
          backgroundColor: 'primary.main',
          borderColor: 'primary.main', */
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              transform: 'translate(0, -50%)',
              top: '50%',
            }}
          >
            <video ref={videoRef} id='videosamere' width='100%' />
          </Box>
        </Box>
        <Typography variant='body1' sx={{ mt: 2, pb: 10 }}>
          Détection en cours...
        </Typography>
      </SectionContainer>
    </>
  );
}

export default IsbnScanner;

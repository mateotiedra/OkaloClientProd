import React from 'react';

import { Box, IconButton, Link, Typography } from '@mui/material';
import Navbar from '../Navbar/Navbar';
import SectionContainer from '../SectionContainer/SectionContainer';

import IsbnScannerLogic from './IsbnScannerLogic';
import IconTitle from '../IconTitle/IconTitle';
import { HiCamera } from 'react-icons/hi';
import { TbCameraRotate } from 'react-icons/tb';

function IsbnScanner({ switchManual, ...props }) {
  const { videoRef, cameraLoaded, rotateCam } = IsbnScannerLogic(props);

  return (
    <>
      <Navbar coverPage />
      <SectionContainer fullPage centered>
        <IconTitle icon={<HiCamera />}>Scan du code-barre</IconTitle>
        <Box
          sx={{
            width: 350,
            height: 200,
            position: 'relative',
            borderRadius: 1.5,
            overflow: 'hidden',
            /* backgroundColor: 'text.primary',
            color: 'white', */
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              transform: 'translate(0, -50%)',
              top: '50%',
              display: cameraLoaded ? 'block' : 'none',
            }}
          >
            <video ref={videoRef} id='videosamere' width='100%' />
          </Box>
          {cameraLoaded && (
            <>
              <IconButton
                sx={{ position: 'absolute', bottom: 3, right: 3, zIndex: 11 }}
                onClick={rotateCam}
              >
                <TbCameraRotate color='white' size={30} />
              </IconButton>
              <Box
                sx={{
                  zIndex: 10,
                  position: 'absolute',
                  transform: 'translate(0, -50%)',
                  top: '50%',
                  display: 'flex',
                  justifyContent: 'center',
                  width: '100%',
                  height: '100%',
                }}
              >
                <Box
                  sx={{
                    height: '100%',
                    width: '1px',
                    backgroundColor: 'white',
                    mr: 8,
                  }}
                />
                <Box
                  sx={{
                    height: '100%',
                    width: '1px',
                    backgroundColor: 'white',
                  }}
                />
              </Box>
            </>
          )}

          <Typography>Chargement de la caméra...</Typography>
        </Box>
        <Typography variant='body1' sx={{ mt: 2, pb: 10 }}>
          Si cela ne marche pas essaie de :<br />
          1) Aligner le code-barre au lignes
          <br />
          2) Avoir une image bien nette
          <br />
          3) Rester immobile <br />
          Si cela ne fonctionne toujours pas tu peux
          <Link onClick={switchManual}> rentrer le code ISBN</Link> à la main
        </Typography>
      </SectionContainer>
    </>
  );
}

export default IsbnScanner;

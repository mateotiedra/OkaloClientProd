import React from 'react';

import { Alert, Box, IconButton, Link, Typography } from '@mui/material';
import Navbar from '../Navbar/Navbar';
import SectionContainer from '../SectionContainer/SectionContainer';

import IsbnScannerLogic from './IsbnScannerLogic';
import IconTitle from '../IconTitle/IconTitle';
import { HiCamera } from 'react-icons/hi';
import { TbCameraRotate } from 'react-icons/tb';

function IsbnScanner({ switchManual, ...props }) {
  const { videoRef, cameraStatus } = IsbnScannerLogic(props);

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
            ref={videoRef}
            sx={{
              position: 'absolute',
              transform: 'translate(0, -50%)',
              top: '50%',
              display: cameraStatus === 'active' ? 'block' : 'none',
            }}
          >
            <video src='' />
            <canvas className='drawingBuffer' style={{ display: 'none' }} />
          </Box>
          {cameraStatus === 'active' && (
            <>
              <Box
                sx={{
                  zIndex: 10,
                  position: 'absolute',
                  transform: 'translate(0, -50%)',
                  top: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  width: '100%',
                  height: '100%',
                }}
              >
                <Box
                  sx={{
                    width: '100%',
                    height: '1px',
                    mt: 10,
                    backgroundColor: 'white',
                  }}
                />
              </Box>
            </>
          )}

          <Typography textAlign='center'>
            {cameraStatus === 'loading'
              ? 'Chargement de la caméra...'
              : cameraStatus === 'fail'
              ? 'Échec du chargement de la caméra... Essaie de relancer la page'
              : ''}
          </Typography>
        </Box>
        <Typography variant='body1' sx={{ mt: 2, pb: 10 }}>
          Si cela ne marche pas essaie de :<br />
          1) Aligner le code-barre à la ligne
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

import React from 'react';
import { Box, Container, Typography } from '@mui/material';

import { HiMail } from 'react-icons/hi';
import { GrInstagram } from 'react-icons/gr';

function Footer({ push }) {
  return (
    <>
      <Box
        component='footer'
        sx={{
          py: 6,
          px: 2,
          mt: push ? 'auto' : 0,
        }}
      >
        <Container
          maxWidth='sm'
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            gap: 1,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: 2,
            }}
          >
            <Box
              component='a'
              href='mailto:contact@okalo.ch'
              display='flex'
              alignItems='center'
              color='text.secondary'
              sx={{ textDecoration: 'none' }}
            >
              <HiMail />
              <Typography variant='body2' color='text.secondary' ml={0.5}>
                Contact
              </Typography>
            </Box>
            <Box
              component='a'
              href='https://www.instagram.com/okalo.ch/'
              display='flex'
              alignItems='center'
              color='text.secondary'
              sx={{ textDecoration: 'none' }}
            >
              <GrInstagram size={15} />
              <Typography variant='body2' color='text.secondary' ml={0.5}>
                Instagram
              </Typography>
            </Box>
          </Box>
          <Typography variant='body2' color='text.secondary'>
            {'Copyright © Mateo Tiedra '}
            {new Date().getFullYear()}
            {'.'}
          </Typography>
        </Container>
      </Box>
      <Box sx={{ height: 90, display: { md: 'none' } }} />
    </>
  );
}

export default Footer;

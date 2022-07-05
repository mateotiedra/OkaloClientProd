import React from 'react';

//import { HashLink as RouterLink } from 'react-router-hash-link';
import { Typography, Box, TextField, Container, Button } from '@mui/material';

import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import SectionDivider from '../../components/SectionDivider/SectionDivider';

//import HomeLogic from './HomeLogic';

function TitleSection() {
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography
        variant='inherit'
        sx={{
          fontSize: {
            xs: '20vw',
            sm: '20vw',
            md: '8vw',
            lg: '8vw',
            xl: '8vw',
          },
          fontWeight: 700,
        }}
      >
        Okalo
      </Typography>
      <Box
        sx={{
          backgroundColor: 'primary.main',
          width: '100%',
          borderRadius: 10,
          position: 'relative',
          height: { xs: '1.2vw', sm: '1.2vw', md: '0.7vw' },
          right: { xs: '23vw', sm: '23vw', md: '39vw' },
          bottom: { xs: '5vw', sm: '5vw', md: '2.5vw' },
        }}
      />
      <Typography
        variant='inherit'
        sx={{
          fontSize: {
            xs: '8vw',
            sm: '8vw',
            md: '2.5vw',
          },
          fontWeight: 700,
          px: 5,
        }}
      >
        Tes livres scolaires, + proches et - chers
      </Typography>
      <Box
        sx={{
          backgroundColor: 'primary.main',
          borderRadius: '10px 0 0 10px',
          position: 'relative',
          height: { xs: '1.2vw', sm: '1.2vw', md: '0.7vw' },
          alignSelf: 'flex-end',
          width: { xs: '91vw', sm: '94vw', md: '74vw' },
        }}
      />
    </Box>
  );
}

function CTASection() {
  return (
    <Container maxWidth='sm' sx={{ px: 4 }}>
      <TextField
        placeholder='Chercher un livre, un auteur, ...'
        variant='outlined'
        sx={{ width: '100%' }}
        inputProps={{
          sx: { fontSize: { xs: 18, sm: 25, md: 25 } },
        }}
      />
      <Button
        placeholder='Chercher un livre, un auteur, ...'
        variant='contained'
        fullWidth
        sx={{ fontSize: { xs: 18, sm: 25, md: 25 }, mt: 3 }}
      >
        Mettre un livre en vente
      </Button>
    </Container>
  );
}

function Home() {
  // const {} = HomeLogic();
  return (
    <>
      <Navbar coverPage />
      <Box
        sx={{
          height: '100vh',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          pb: { xs: 10, sm: 10 },
        }}
      >
        <TitleSection />
        <SectionDivider h={2} />
        <CTASection />
      </Box>
      <Footer />
    </>
  );
}

export default Home;

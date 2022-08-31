import React from 'react';

import { HashLink, HashLink as RouterLink } from 'react-router-hash-link';
import {
  Typography,
  Box,
  TextField,
  Container,
  Button,
  Link,
  Avatar,
  CircularProgress,
  ListItem,
  ListItemAvatar,
  List,
  ListItemText,
  ListItemButton,
  Skeleton,
} from '@mui/material';

import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import SectionDivider from '../../components/SectionDivider/SectionDivider';
import SectionContainer from '../../components/SectionContainer/SectionContainer';

import HomeLogic from './HomeLogic';
import BookList from '../../components/BookList/BookList';

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
          height: 7,
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
          height: 7,
          alignSelf: 'flex-end',
          width: { xs: '91vw', sm: '94vw', md: '74vw' },
        }}
      />
    </Box>
  );
}

function CTASection({ goToSearch }) {
  return (
    <Container maxWidth='sm' sx={{ px: 4, py: 6 }}>
      <TextField
        placeholder='Chercher un livre, un auteur, ...'
        variant='outlined'
        sx={{ width: '100%' }}
        onFocus={goToSearch}
        inputProps={{
          sx: { fontSize: { xs: 18, sm: 21, md: 20 }, textAlign: 'center' },
        }}
      />
      <Button
        variant='contained'
        fullWidth
        sx={{ fontSize: { xs: 18, sm: 21, md: 20 }, mt: 3 }}
        component={RouterLink}
        to='/new-bid'
      >
        Mettre un livre en vente
      </Button>
    </Container>
  );
}

function LoadingList({
  avatarShape = 'circular',
  number = 3,
  avatarDimensions = { width: 40, height: 40 },
}) {
  const list = new Array(number).fill(0);
  return list.map((_, index) => (
    <Box
      sx={{ display: 'flex', flexDirection: 'row', gap: 3, mb: 2 }}
      key={index}
    >
      <Skeleton variant={avatarShape} {...avatarDimensions} />
      <Skeleton variant='text' width={210} />
    </Box>
  ));
}

function Leaderboard({ bestAders, bestSellers }) {
  const categoryBoxStyle = {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    alignItems: 'center',
  };

  return (
    <Container
      maxWidth='md'
      sx={{
        display: 'flex',
        flexDirection: 'row',
        gap: { xs: 0, sm: 1, md: 6 },
        mt: { xs: 2, sm: 4, md: 6 },
      }}
    >
      <Box sx={categoryBoxStyle}>
        <Typography variant='h5' textAlign='center' pb={1} px={2}>
          Meilleurs vendeurs
        </Typography>
        {Boolean(bestAders) ? (
          <List sx={{ width: '100%' }}>
            {bestAders.map((user, index) => (
              <ListItemButton
                key={user.username}
                component={HashLink}
                to={'/user/' + user.username}
              >
                <ListItemAvatar>
                  <Avatar>{user.username[0]}</Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Link variant='body1' py={1} component='span'>
                      {/* {index + 1 + '. '} */}
                      {user.username}
                    </Link>
                  }
                  secondary={
                    <Typography
                      variant='caption'
                      color='text.primary'
                      sx={{
                        display: { xs: 'inline', sm: 'inline', md: 'none' },
                      }}
                    >
                      {user.n_bids} livres
                    </Typography>
                  }
                />
                <Typography
                  variant='caption'
                  color='text.primary'
                  sx={{ display: { xs: 'none', sm: 'none', md: 'inline' } }}
                >
                  {user.n_bids} livres
                </Typography>
              </ListItemButton>
            ))}
          </List>
        ) : (
          <LoadingList number={5} />
        )}
      </Box>
      <Box sx={categoryBoxStyle}>
        <Typography
          variant='h5'
          textAlign='center'
          sx={{ pb: { xs: 3, sm: 2, md: 1 } }}
        >
          Best sellers
        </Typography>
        {Boolean(bestSellers) ? (
          <BookList items={bestSellers} dense sx={{ pl: 2 }} />
        ) : (
          <LoadingList
            avatarShape='rectangular'
            avatarDimensions={{ width: 70, height: 90 }}
          />
        )}
      </Box>
    </Container>
  );
}

function Home() {
  const { goToSearch, bestAders, bestSellers } = HomeLogic();

  return (
    <>
      <Navbar coverPage />
      <Box
        sx={{
          minHeight: '100vh',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          pt: { xs: 0, sm: 0, md: 20 },
          mt: { xs: 20, sm: 20, md: 0 },
        }}
      >
        <TitleSection />
        <CTASection goToSearch={goToSearch} />
        <Leaderboard bestAders={bestAders} bestSellers={bestSellers} />
        <Footer />
      </Box>
    </>
  );
}

export default Home;

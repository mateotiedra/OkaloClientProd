import React from 'react';

import NavbarLogic from './NavbarLogic';

import Logo from '../../assets/rsvg/logo.js';
import {
  AppBar,
  Container,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemText,
  SwipeableDrawer,
  Typography,
} from '@mui/material';
import { FiMenu, FiX } from 'react-icons/fi';
import { Box } from '@mui/system';
import { HashLink as RouterLink } from 'react-router-hash-link';
import SectionDivider from '../SectionDivider/SectionDivider';

function Navbar({ admin, coverPage, empty }) {
  const { navLinksObj, drawerOpened, toggleDrawer } = NavbarLogic(admin);

  return (
    <>
      <AppBar
        elevation={0}
        sx={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: 'background.default',
          position: 'fixed',
          top: 'auto',
          bottom: { xs: 0, sm: 0, md: 'auto' },
        }}
      >
        <Container
          maxWidth='xl'
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}
        >
          <Link
            sx={{
              display: { xs: 'none', sm: 'flex' },
              flexDirection: 'row',
              alignItems: 'center',
              height: '70px',
              mr: !empty && 'auto',
              '&:hover': {
                textDecoration: 'none',
              },
            }}
            component={RouterLink}
            to='/'
          >
            <Typography
              variant='h4'
              sx={{
                fontWeight: 700,
                color: 'text.primary',
              }}
            >
              Okalo
            </Typography>
            <Box sx={{ height: 40, width: 40, ml: 1 }}>
              <Logo />
            </Box>
          </Link>
          {!empty &&
            navLinksObj.map((linkObj) => {
              return (
                <Link
                  key={linkObj.text}
                  component={RouterLink}
                  to={linkObj.to}
                  sx={{
                    mx: 1,
                    px: 1,
                    py: 2,
                    color: 'text.primary',
                    transitionDuration: '500ms',
                    border: '2px solid transparent',
                    ':hover': {
                      textDecoration: 'none',
                    },
                    ':active': {
                      opacity: 0.5,
                    },
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                  }}
                >
                  {React.cloneElement(linkObj.icon, {
                    size: linkObj.current ? 32 : 30,
                  })}
                  <Typography
                    variant='caption'
                    sx={{
                      fontSize: 12,
                      fontWeight: linkObj.current ? 'bold' : 'regular',
                    }}
                  >
                    {linkObj.text}
                  </Typography>
                </Link>
              );
            })}
        </Container>
      </AppBar>
      {!coverPage && <SectionDivider />}
    </>
  );
}

export default Navbar;

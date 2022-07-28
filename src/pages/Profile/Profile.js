import React from 'react';

import { Box, Link, ListItem, ListItemIcon } from '@mui/material';
import { HashLink } from 'react-router-hash-link';

import Navbar from '../../components/Navbar/Navbar';
import PageButton from '../../components/PageButton/PageButton';
import SectionContainer from '../../components/SectionContainer/SectionContainer';
import SectionDivider from '../../components/SectionDivider/SectionDivider';
import UnderlinedTitle from '../../components/UnderlinedTitle/UnderlinedTitle';
import Loading from '../Loading/Loading';

import ProfileLogic from './ProfileLogic';

function Profile() {
  const { userData: user, pageStatus, socials } = ProfileLogic();

  if (pageStatus === 'loading') return <Loading />;

  return (
    <>
      <Navbar />
      <SectionContainer
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <SectionDivider />
        <UnderlinedTitle>{user.username}</UnderlinedTitle>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            gap: '15px 35px',
            flexWrap: 'wrap',
            width: '100%',
          }}
        >
          {socials &&
            socials.map(
              (social, index) =>
                social && (
                  <Box
                    sx={{
                      display: 'flex',
                      flex: 'row',
                      alignItems: 'center',
                    }}
                    key={index}
                  >
                    {React.cloneElement(social.icon, {
                      size: 20,
                    })}
                    <Link
                      sx={{ ml: 1 }}
                      href={social.link}
                      rel='noopener noreferrer'
                      target={Boolean(social.to) ? '' : '_blank'}
                      component={Boolean(social.to) ? HashLink : 'a'}
                      to={social.to}
                    >
                      {social.text}
                    </Link>
                  </Box>
                )
            )}
        </Box>
      </SectionContainer>
    </>
  );
}

export default Profile;

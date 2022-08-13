import React from 'react';

import { Box, Button, Link, Typography } from '@mui/material';
import { HiSparkles } from 'react-icons/hi';
import { HashLink } from 'react-router-hash-link';

import Navbar from '../../components/Navbar/Navbar';
import SectionContainer from '../../components/SectionContainer/SectionContainer';
import SectionDivider from '../../components/SectionDivider/SectionDivider';
import UnderlinedTitle from '../../components/UnderlinedTitle/UnderlinedTitle';
import Loading from '../Loading/Loading';

import ProfileLogic from './ProfileLogic';
import IconTitle from '../../components/IconTitle/IconTitle';

function Profile() {
  const { username, pageStatus, socials, bids } = ProfileLogic();

  if (pageStatus === 'loading') return <Loading />;

  const TitleAndSocials = (
    <SectionContainer centered>
      <UnderlinedTitle>{username}</UnderlinedTitle>
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
  );

  const BidsList =
    bids && bids.length ? (
      <></>
    ) : (
      <SectionContainer
        centered
        fullPage
        sx={{
          position: 'absolute',
          top: 0,
          justifyContent: 'center',
          zIndex: -10,
        }}
        maxWidth='none'
      >
        <IconTitle icon={<HiSparkles />}>
          Aucune annonce n'a encore été postée
        </IconTitle>
        {pageStatus === 'owner' && (
          <Button sx={{ mt: 2 }} component={HashLink} to='/new-bid'>
            <Typography>Nouvelle annonce</Typography>
          </Button>
        )}
      </SectionContainer>
    );

  return (
    <>
      <Navbar />
      <SectionDivider />
      {TitleAndSocials}
      <SectionDivider />
      {BidsList}
    </>
  );
}

export default Profile;

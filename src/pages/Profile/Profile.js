import React from 'react';

import {
  Box,
  Button,
  IconButton,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import { HiCog, HiOutlineEmojiSad, HiSparkles, HiShare } from 'react-icons/hi';
import { HashLink } from 'react-router-hash-link';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import Navbar from '../../components/Navbar/Navbar';
import SectionContainer from '../../components/SectionContainer/SectionContainer';
import SectionDivider from '../../components/SectionDivider/SectionDivider';
import UnderlinedTitle from '../../components/UnderlinedTitle/UnderlinedTitle';
import Loading from '../Loading/Loading';
import IconTitle from '../../components/IconTitle/IconTitle';
import BookList from '../../components/BookList/BookList';
import PopPageAlert from '../../components/PopPageAlert/PopPageAlert';

import ProfileLogic from './ProfileLogic';

function Profile() {
  const {
    username,
    pageStatus,
    socials,
    bids,
    onSearchChange,
    noBidsPublished,
    shareUserLink,
    copyAlertOpen,
    closeCopyAlert,
  } = ProfileLogic();

  if (pageStatus === 'loading') return <Loading />;

  const Title = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '15px',
      }}
    >
      <UnderlinedTitle>{username}</UnderlinedTitle>
    </Box>
  );

  const Socials = (
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
  );

  const UserActions = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 1,
        width: '100%',
        mb: 2,
      }}
    >
      <CopyToClipboard text={window.location.href} onCopy={shareUserLink}>
        <Button
          variant='outlined'
          size='small'
          startIcon={<HiShare />}
          onClick={shareUserLink}
        >
          <Typography>Partager</Typography>
        </Button>
      </CopyToClipboard>
      <Button
        component={HashLink}
        to='/user/u/edit'
        variant='outlined'
        startIcon={<HiCog />}
        size='medium'
      >
        <Typography>{'Modifier'}</Typography>
      </Button>
    </Box>
  );

  const BidsSection = noBidsPublished ? (
    <Box
      centered
      sx={{
        py: 10,
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
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
    </Box>
  ) : bids && bids.length ? (
    <BookList items={bids} />
  ) : (
    <Box
      centered
      sx={{
        py: 10,
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
      maxWidth='none'
    >
      <IconTitle icon={<HiOutlineEmojiSad />}>
        Aucun résultat{' '}
        <Typography>Il semble que {username} ne vend pas ce livre</Typography>
      </IconTitle>
    </Box>
  );

  return (
    <>
      <Navbar />
      <SectionContainer maxWidth='md' sx={{ pb: 12 }}>
        <SectionDivider />
        {Title}
        <PopPageAlert
          open={copyAlertOpen}
          onClose={closeCopyAlert}
          closeOnTimer
        >
          Le lien vers ta page a bien été copié
        </PopPageAlert>
        {pageStatus === 'owner' && UserActions}
        {Socials}
        <TextField
          sx={{ mb: 2, mt: 4 }}
          variant='outlined'
          placeholder={'Chercher un livre de ' + username + '...'}
          onChange={onSearchChange}
        />
        {BidsSection}
      </SectionContainer>
    </>
  );
}

export default Profile;

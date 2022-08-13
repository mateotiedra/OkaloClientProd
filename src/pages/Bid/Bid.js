import React from 'react';

import { Box, Button, Link, Skeleton, Typography } from '@mui/material';
import { HiSparkles } from 'react-icons/hi';
import { HashLink } from 'react-router-hash-link';

import Navbar from '../../components/Navbar/Navbar';
import SectionContainer from '../../components/SectionContainer/SectionContainer';
import SectionDivider from '../../components/SectionDivider/SectionDivider';
import UnderlinedTitle from '../../components/UnderlinedTitle/UnderlinedTitle';
import Loading from '../Loading/Loading';
import IconTitle from '../../components/IconTitle/IconTitle';
import BidLogic from './BidLogic';

function Bid() {
  const { pageStatus, bidData, institutions } = BidLogic();

  if (pageStatus === 'loading') return <Loading />;

  return (
    <>
      <Navbar coverPage />
      <SectionContainer fullPage>
        <Box sx={{ display: 'flex' }}>
          <BookImage book={bidData.book} sx={{ mr: 5, ml: 2 }} />
          <Box sx={{ wordBreak: 'break-word' }}>
            <Typography variant='h4'>{bidData.book.title}</Typography>
            <Typography variant='body1' mb={2}>
              {bidData.book.author}
            </Typography>
            <Typography variant='h6'>{bidData.book.publisher}</Typography>
          </Box>
        </Box>
        <Typography variant='body1' mt={4}>
          <Typography component='span' fontWeight='bold'>
            {bidData.condition}
          </Typography>
          {' et '}
          <Typography
            component='span'
            fontWeight='bold'
            textTransform='lowercase'
          >
            {bidData.customisation}
          </Typography>
        </Typography>
        <Typography variant='body1' mt={2}>
          {pageStatus === 'owner' ? (
            'Vous vendez'
          ) : (
            <>
              <Link component={HashLink} to={'/user/' + bidData.user.username}>
                {bidData.user.username}
              </Link>{' '}
              vend
            </>
          )}
          {` ce livre ${
            institutions.length && institutions.length > 1
              ? 'aux établissements suivants :' +
                institutions.map((institution, index) => {
                  return ' ' + institution.name;
                })
              : 'à/au ' + institutions[0].name
          } `}
        </Typography>
        {bidData.comment && (
          <Typography variant='body1' mt={2}>
            {bidData.comment}
          </Typography>
        )}
        <Box
          display='flex'
          sx={{ mt: 3, justifyContent: 'space-around', alignItems: 'center' }}
        >
          <Typography variant='h4'>CHF {bidData.price}</Typography>
          {pageStatus === 'owner' ? (
            <>
              <Button>
                <Typography>Modifier l'annonce</Typography>
              </Button>
            </>
          ) : (
            <Button component={HashLink} to={'/user/' + bidData.user.username}>
              <Typography>Voir le vendeur</Typography>
            </Button>
          )}
        </Box>
      </SectionContainer>
    </>
  );
}

function BookImage({ book, sx }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        minWidth: 120,
        height: !book.coverLink && 180,
        border: 'solid 3px',
        borderColor: 'text.primary',
        borderRadius: '5px',
        overflow: 'hidden',
        ...sx,
      }}
    >
      {book.coverLink ? (
        <Box
          component='img'
          src={book.coverLink}
          sx={{
            width: '100%',
          }}
        />
      ) : (
        <Typography variant='caption' sx={{ mx: 1, textAlign: 'center' }}>
          Aucune image disponible
        </Typography>
      )}
    </Box>
  );
}

export default Bid;

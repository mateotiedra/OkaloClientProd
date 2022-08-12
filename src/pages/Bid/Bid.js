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
  const { pageStatus, bidData } = BidLogic();

  if (pageStatus === 'loading') return <Loading />;
  console.log(bidData, pageStatus);

  return (
    <>
      <Navbar coverPage />
      <SectionContainer fullPage centered>
        <BookImage />
        <Typography variant='h5'>{bidData.book.title}</Typography>
      </SectionContainer>
    </>
  );
}

function BookImage() {
  return (
    <Box sx={{position: 'relative' }}>
      <Skeleton
        variant="rounded"
        sx={{
          height: 220,
          width: 150,
          position: 'absolute',
          transform: 'translate(-50%, -50%)',
          top: '50%',
          left: '50%',
        }}
      />
    </Box>
  );
}

export default Bid;

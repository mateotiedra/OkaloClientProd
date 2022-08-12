import React from 'react';

import { Box, Button, Link, Typography } from '@mui/material';
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
  const { pageStatus } = BidLogic();

  if (pageStatus === 'loading') return <Loading />;

  return <></>;
}

export default Bid;

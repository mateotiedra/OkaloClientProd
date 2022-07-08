import React from 'react';

import Navbar from '../../components/Navbar/Navbar';
import SectionContainer from '../../components/SectionContainer/SectionContainer';
import Loading from '../Loading/Loading';
import NewBidLogic from './NewBidLogic';

function NewBid() {
  const { pageStatus } = NewBidLogic();

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
      ></SectionContainer>
    </>
  );
}

export default NewBid;

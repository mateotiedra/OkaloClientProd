import React from 'react';

import { Box } from '@mui/material';
import { HiBookOpen } from 'react-icons/hi';

import Navbar from '../../components/Navbar/Navbar';
import FormFields from '../../components/FormFields/FormFields';
import Loading from '../Loading/Loading';
import NewBidLogic from './NewBidLogic';
import Footer from '../../components/Footer/Footer';
import IconTitle from '../../components/IconTitle/IconTitle';
import SectionContainer from '../../components/SectionContainer/SectionContainer';
import SectionDivider from '../../components/SectionDivider/SectionDivider';

function NewBid() {
  const { pageStatus } = NewBidLogic();

  if (pageStatus === 'loading') return <Loading />;

  return (
    <>
      <Navbar />
      <SectionContainer>
        <SectionDivider />
        <IconTitle icon={<HiBookOpen />}>Mettre un livre en vente</IconTitle>
      </SectionContainer>
      {/* <FormFields
        page
        centered
        title={'Nouvelle annonce'}
        avatarIcon={<HiBookOpen />}
        sending={pageStatus === 'sending'}
        buttonText={'Suivant'}
        fields={[]}
      >
        <Footer />
      </FormFields> */}
    </>
  );
}

export default NewBid;

import React from 'react';

import Navbar from '../../components/Navbar/Navbar';
import SectionContainer from '../../components/SectionContainer/SectionContainer';
import SectionDivider from '../../components/SectionDivider/SectionDivider';
import UnderlinedTitle from '../../components/UnderlinedTitle/UnderlinedTitle';
import Loading from '../Loading/Loading';
import ProfileLogic from './ProfileLogic';

function Profile(props) {
  const { userData, pageStatus } = ProfileLogic();

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
        <UnderlinedTitle>{userData.username}</UnderlinedTitle>
      </SectionContainer>
    </>
  );
}

export default Profile;

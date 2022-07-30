import React from 'react';

import { Box, Button, Divider, Link, Typography } from '@mui/material';
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
  const {
    pageStatus,
    switchToManual,
    register,
    errors,
    onSubmitBook,
    onSubmitISBN,
  } = NewBidLogic();

  if (pageStatus === 'loading') return <Loading />;

  if (pageStatus.includes('step-1'))
    return (
      <>
        <Navbar coverPage />
        <SectionContainer fullPage maxWidth={'sm'}>
          <IconTitle icon={<HiBookOpen />}>Mettre un livre en vente</IconTitle>
          <Typography variant='body1'>
            Pour renseigner les informations sur ton livre automatiquement, il
            te suffit de scanner son code barre !
          </Typography>
          <Typography sx={{ mb: 2 }} variant='body2'>
            Si cela ne marche pas essaie de rentrer le code ISBN qui est juste
            en dessous.
          </Typography>
          {pageStatus.includes('manual') ? (
            <FormFields
              onSubmit={onSubmitBook}
              register={register}
              errors={errors}
              sending={pageStatus.includes('sending')}
              buttonText={'Suivant'}
              fields={[
                {
                  id: 'title',
                  label: 'Titre',
                  registration: { required: true },
                },
                {
                  id: 'author',
                  label: 'Auteur',
                },
                {
                  id: 'publisher',
                  label: "Maison d'édition",
                  registration: { required: true },
                },
              ]}
            />
          ) : (
            <>
              <Button>
                <Typography variant='body1'>Scanner</Typography>
              </Button>
              <Typography width='100%' textAlign='center' sx={{ my: 1 }}>
                ou
              </Typography>
              <FormFields
                onSubmit={onSubmitISBN}
                register={register}
                errors={errors}
                sending={pageStatus.includes('sending')}
                variant='outlined'
                noAutofocus
                fields={[
                  {
                    id: 'isbn',
                    label: 'Code ISBN',
                    registration: { required: true },
                  },
                ]}
              />
            </>
          )}
          <Link sx={{ ml: 'auto', mt: 1 }} onClick={switchToManual}>
            {pageStatus.includes('manual')
              ? 'Renseigner automatiquement'
              : 'Renseigner manuellement'}
          </Link>
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

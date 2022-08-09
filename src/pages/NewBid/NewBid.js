import React from 'react';

import { Button, Link, Typography } from '@mui/material';
import { HiBookOpen } from 'react-icons/hi';

import Navbar from '../../components/Navbar/Navbar';
import FormFields from '../../components/FormFields/FormFields';
import Loading from '../Loading/Loading';
import NewBidLogic from './NewBidLogic';
import Footer from '../../components/Footer/Footer';
import IconTitle from '../../components/IconTitle/IconTitle';
import SectionContainer from '../../components/SectionContainer/SectionContainer';
import IsbnScanner from '../../components/IsbnScanner/IsbnScanner';

function NewBid() {
  const {
    pageStatus,
    switchManual,
    startScan,
    register,
    errors,
    infoFields,
    stateFields,
    setValue,
    onSubmitBook,
    onSubmitISBN,
    onSubmitBid,
  } = NewBidLogic();

  if (pageStatus === 'loading') return <Loading />;

  if (pageStatus.includes('step-1.scan')) {
    return <IsbnScanner />;
  }

  if (pageStatus.includes('step-1')) {
    return (
      <>
        <Navbar coverPage />
        <SectionContainer fullPage maxWidth={'sm'}>
          <IconTitle icon={<HiBookOpen />}>Informations sur le livre</IconTitle>
          {!pageStatus.includes('manual') && (
            <>
              <Typography variant='body1'>
                Pour renseigner les informations sur ton livre automatiquement,
                il te suffit de scanner son code barre !
              </Typography>
              <Typography sx={{ mb: 2 }} variant='body2'>
                Si cela ne marche pas essaie de rentrer le code ISBN qui est
                juste en dessous.
              </Typography>
            </>
          )}
          {pageStatus.includes('manual') ? (
            <FormFields
              onSubmit={onSubmitBook}
              register={register}
              errors={errors}
              sending={pageStatus.includes('sending')}
              buttonText={'Suivant'}
              fields={infoFields}
            />
          ) : (
            <>
              <Button onClick={startScan}>
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
          {pageStatus.includes('manual') ? (
            <Link sx={{ ml: 'auto', mt: 1 }} onClick={switchManual}>
              Renseigner automatiquement
            </Link>
          ) : (
            <Typography variant='body1' sx={{ ml: 'auto', mt: 1 }}>
              {'Pas de code ISBN ? '}
              <Link onClick={switchManual}>Renseigner manuellement</Link>
            </Typography>
          )}
        </SectionContainer>
        <Footer />
      </>
    );
  }

  if (pageStatus.includes('step-2')) {
    return (
      <>
        <Navbar coverPage />
        <SectionContainer fullPage maxWidth={'sm'}>
          <IconTitle icon={<HiBookOpen />}>État du livre</IconTitle>
          <FormFields
            onSubmit={onSubmitBid}
            register={register}
            errors={errors}
            sending={pageStatus.includes('sending')}
            buttonText={'Suivant'}
            fields={stateFields}
            setValue={setValue}
          />
        </SectionContainer>
        <Footer />
      </>
    );
  }
}

export default NewBid;

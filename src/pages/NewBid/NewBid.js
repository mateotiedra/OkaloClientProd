import React from 'react';

import {
  Alert,
  Button,
  CircularProgress,
  InputAdornment,
  Link,
  Typography,
} from '@mui/material';
import { HiBookOpen } from 'react-icons/hi';

import Navbar from '../../components/Navbar/Navbar';
import FormFields from '../../components/FormFields/FormFields';
import Loading from '../Loading/Loading';
import NewBidLogic from './NewBidLogic';
import Footer from '../../components/Footer/Footer';
import IconTitle from '../../components/IconTitle/IconTitle';
import SectionContainer from '../../components/SectionContainer/SectionContainer';
import IsbnScanner from '../../components/IsbnScanner/IsbnScanner';

function FetchBookAlert({ state, retry }) {
  if (state)
    return (
      <Alert sx={{ mb: 2 }} severity={state.type}>
        {state.text + ' '}
        {state.error && <Link onClick={retry}>Réessayer</Link>}
      </Alert>
    );
  return null;
}

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
    onSubmitISBNManu,
    onSubmitISBNAuto,
    onSubmitBid,
    alertState,
    goBack,
    isbnLoading,
  } = NewBidLogic({});

  if (pageStatus === 'loading') return <Loading />;

  if (pageStatus.includes('step-1.scan')) {
    return <IsbnScanner onResult={onSubmitISBNAuto} switchManual={goBack} />;
  }

  if (pageStatus.includes('step-1')) {
    return (
      <>
        <Navbar coverPage />
        <SectionContainer fullPage maxWidth={'sm'}>
          <IconTitle icon={<HiBookOpen />}>Informations sur le livre</IconTitle>
          {pageStatus.includes('manual') ? (
            // Manual
            <>
              <FetchBookAlert state={alertState} retry={goBack} />
              <FormFields
                onSubmit={onSubmitBook}
                register={register}
                errors={errors}
                sending={pageStatus.includes('sending')}
                buttonText={'Suivant'}
                fields={infoFields}
                readOnly={Boolean(alertState) && alertState.type === 'success'}
              />
            </>
          ) : (
            // new bid Home
            <>
              <Typography variant='body1' sx={{ mb: 2 }}>
                Pour renseigner les informations sur ton livre automatiquement,
                il te suffit de scanner son code-barre au dos (code ISBN)
              </Typography>
              <Button onClick={startScan}>
                <Typography variant='body1'>Scanner</Typography>
              </Button>
              <Typography width='100%' textAlign='center' sx={{ my: 1 }}>
                ou
              </Typography>
              <FormFields
                onSubmit={onSubmitISBNManu}
                register={register}
                errors={errors}
                sending={isbnLoading}
                variant='outlined'
                noAutofocus
                fields={[
                  {
                    id: 'isbn',
                    label: 'Code ISBN',
                    registration: {
                      required: true,

                      pattern: {
                        value: /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/,
                        message:
                          'Tu as mal du rentrer le code... Celui-ci ne doit pas contenir de lettre',
                      },
                    },
                    endAdornment: isbnLoading && (
                      <InputAdornment position='end' mr={10}>
                        <CircularProgress size='1.5rem' />
                      </InputAdornment>
                    ),
                  },
                ]}
              />
            </>
          )}
          {pageStatus.includes('manual') ? (
            (!alertState || alertState.type !== 'success') && (
              <Link sx={{ ml: 'auto', mt: 1 }} onClick={switchManual}>
                Renseigner automatiquement
              </Link>
            )
          ) : (
            <Typography variant='body1' sx={{ ml: 'auto', mt: 1 }}>
              {'Pas de code ISBN ? '}
              <Link onClick={switchManual}>Renseigner manuellement</Link>
            </Typography>
          )}
          <Footer />
        </SectionContainer>
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
          <Footer />
        </SectionContainer>
      </>
    );
  }
}

export default NewBid;

import React from 'react';

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Link,
  Typography,
} from '@mui/material';
import { HashLink } from 'react-router-hash-link';

import Navbar from '../../components/Navbar/Navbar';
import SectionContainer from '../../components/SectionContainer/SectionContainer';
import Loading from '../Loading/Loading';
import FormFields from '../../components/FormFields/FormFields';

import BidLogic from './BidLogic';

function Bid() {
  const {
    pageStatus,
    bidData,
    institutions,
    stateFields,
    setValue,
    register,
    errors,
    switchToEdit,
    onSubmitChange,
    deleteDialogOpened,
    toggleDeleteDialog,
    deleteBid,
  } = BidLogic();

  if (pageStatus === 'loading') return <Loading />;

  if (pageStatus === 'edit') {
    return (
      <>
        <Navbar coverPage />
        <DeleteDialog
          opened={deleteDialogOpened}
          handleClose={toggleDeleteDialog}
          deleteBid={deleteBid}
        />
        <SectionContainer fullPage>
          <BookSection book={bidData.book} />
          <FormFields
            onSubmit={onSubmitChange}
            register={register}
            errors={errors}
            sending={pageStatus.includes('sending')}
            fields={stateFields}
            setValue={setValue}
            sx={{ mt: 4 }}
          />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              mt: 4,
              gap: 2,
            }}
          >
            <Button
              onClick={toggleDeleteDialog}
              variant='outlined'
              color='error'
            >
              <Typography>Supprimer</Typography>
            </Button>
            <Button onClick={onSubmitChange}>
              <Typography>Sauvegarder</Typography>
            </Button>
          </Box>
        </SectionContainer>
      </>
    );
  }

  return (
    <>
      <Navbar coverPage />
      <SectionContainer fullPage>
        <BookSection book={bidData.book} />
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
              <Button onClick={switchToEdit}>
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

function BookSection({ book }) {
  return (
    <Box sx={{ display: 'flex' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          minWidth: 120,
          maxWidth: 120,
          height: !book.coverLink && 180,
          border: 'solid 3px',
          borderColor: 'text.primary',
          borderRadius: '5px',
          overflow: 'hidden',
          mr: 5,
          ml: 2,
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
            Pas de preview disponible
          </Typography>
        )}
      </Box>
      <Box sx={{ wordBreak: 'break-word' }}>
        <Typography variant='h5'>{book.title}</Typography>
        <Typography variant='body1' mb={2}>
          {book.author}
        </Typography>
        <Typography variant='h6'>{book.publisher}</Typography>
      </Box>
    </Box>
  );
}

function DeleteDialog({ opened, deleteBid, handleClose }) {
  return (
    <Dialog
      open={opened}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>Supprimer l'annonce</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          Cette action supprimera définitivement l'annonce du livre et toutes
          les données associées.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant='text' onClick={handleClose}>
          Annuler
        </Button>
        <Button variant='text' onClick={() => deleteBid(true)} autoFocus>
          Je l'ai vendu
        </Button>
        <Button variant='text' onClick={() => deleteBid(false)} autoFocus>
          Supprimer
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default Bid;

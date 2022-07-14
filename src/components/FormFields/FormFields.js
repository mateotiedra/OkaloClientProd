import React, { useState } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import { Avatar, Box, TextField, Typography } from '@mui/material';

import PasswordField from '../PasswordField/PasswordField';
import SectionContainer from '../SectionContainer/SectionContainer';
import Navbar from '../Navbar/Navbar';
import AlertPageLogic from '../AlertPage/AlertPageLogic';
import Footer from '../Footer/Footer';

function FormFields({
  onSubmit,
  register,
  sending,
  errors,
  buttonText,
  fields,
  extraComponents,
  avatarIcon,
  title,
  page,
}) {
  const { goHomeAction } = AlertPageLogic();
  const Inside = (
    <>
      {title && (
        <>
          <Avatar sx={{ m: 1 }}>{avatarIcon}</Avatar>
          <Typography sx={{ mb: 2 }} component='h1' variant='h5'>
            {title}
          </Typography>
        </>
      )}
      <Box
        component='form'
        noValidate
        onSubmit={onSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          width: '100%',
        }}
      >
        {fields.map((field, index) => {
          const Field = field.password ? PasswordField : TextField;
          var registration = register(field.id, field.registration);
          if (Field === PasswordField) {
            registration.innerRef = registration.ref;
            registration.ref = undefined;
            registration.visibilityDisabled = field.visibilityDisabled;
          }

          return (
            <React.Fragment key={field.id}>
              <Field
                id={field.id}
                label={field.label}
                autoComplete={field.id}
                helperText={errors[field.id] && errors[field.id].message}
                error={errors[field.id] !== undefined}
                disabled={field.disabled}
                inputProps={field.inputProps}
                {...registration}
              />
              {extraComponents && extraComponents[index]}
            </React.Fragment>
          );
        })}
        <LoadingButton
          variant='contained'
          type='submit'
          fullWidth
          sx={{ mt: 3, mb: 2 }}
          loading={sending}
        >
          <Typography variant='body1'>{buttonText}</Typography>
        </LoadingButton>
      </Box>
    </>
  );

  if (page)
    return (
      <>
        <Navbar coverPage empty goHomeAction={goHomeAction} />
        <SectionContainer
          maxWidth='sm'
          sx={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            pt: 8,
          }}
        >
          {Inside}
          <Footer push={false} />
        </SectionContainer>
      </>
    );
  else return Inside;
}

export default FormFields;

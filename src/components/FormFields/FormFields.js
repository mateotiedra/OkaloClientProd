import React from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import { Avatar, Box, TextField, Typography } from '@mui/material';

import PasswordField from '../PasswordField/PasswordField';
import SectionContainer from '../SectionContainer/SectionContainer';

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
  centered,
  children,
}) {
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
          gap: 2,
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
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                width: '100%',
              }}
              key={field.id}
            >
              <Field
                id={field.id}
                label={field.label}
                autoComplete={field.id}
                helperText={errors[field.id] && errors[field.id].message}
                error={errors[field.id] !== undefined}
                disabled={field.disabled}
                inputProps={field.inputProps}
                autoFocus={index === 0}
                {...registration}
              />
              {extraComponents &&
                (extraComponents[index] ||
                  (extraComponents['-1'] &&
                    index === fields.length - 1 &&
                    extraComponents['-1']))}
            </Box>
          );
        })}
        <LoadingButton
          variant='contained'
          type='submit'
          fullWidth
          sx={{ mt: 2, mb: 2 }}
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
        <SectionContainer
          maxWidth='sm'
          sx={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: centered ? 'center' : 'flex-start',
            alignItems: 'center',
            pt: 8,
          }}
        >
          {Inside}
          {children}
        </SectionContainer>
      </>
    );
  else return Inside;
}

export default FormFields;

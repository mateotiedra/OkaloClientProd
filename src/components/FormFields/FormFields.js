import React, { useState } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box, TextField, Typography } from '@mui/material';

import PasswordField from '../PasswordField/PasswordField';

function FormFields({
  onSubmit,
  register,
  sending,
  errors,
  buttonText,
  fields,
  extraComponents,
}) {
  return (
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
              sx={{ mt: 2 }}
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
  );
}

export default FormFields;

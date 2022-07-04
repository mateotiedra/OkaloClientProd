import { TextField } from '@mui/material';
import React from 'react';

const FormTextField = ({
  required,
  id,
  label,
  autoComplete,
  autoFocus,
  errors,
  registration,
  type,
  multiline,
  onChange,
  ...props
}) => {
  return (
    <TextField
      margin='normal'
      required={required}
      fullWidth
      id={id}
      label={label}
      name={id}
      autoComplete={autoComplete}
      autoFocus={autoFocus}
      type={type}
      variant='filled'
      error={errors[id] !== undefined}
      helperText={errors[id] && errors[id].message}
      multiline
      onChange={onChange}
      {...registration}
      {...props}
    />
  );
};

export default FormTextField;

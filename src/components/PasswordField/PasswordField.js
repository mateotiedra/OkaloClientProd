import {
  FilledInput,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
} from '@mui/material';
import React, { useState } from 'react';
import { HiEye, HiEyeOff } from 'react-icons/hi';

const PasswordField = ({
  required,
  id,
  label,
  autoFocus,
  errors,
  registration,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <FormControl
      variant='filled'
      fullWidth
      margin='normal'
      error={errors[id] !== undefined}
      autoFocus={autoFocus}
    >
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <FilledInput
        id={id}
        type={showPassword ? 'text' : 'password'}
        required={required}
        {...registration}
        aria-describedby='my-helper-text'
        endAdornment={
          <InputAdornment position='end' sx={{ mr: 1 }}>
            <IconButton
              aria-label='toggle password visibility'
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge='end'
            >
              {showPassword ? <HiEyeOff /> : <HiEye />}
            </IconButton>
          </InputAdornment>
        }
        label='Password'
      />
      {errors[id] !== undefined && errors[id].message.length > 0 && (
        <FormHelperText id='my-helper-text'>
          {errors[id].message}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default PasswordField;

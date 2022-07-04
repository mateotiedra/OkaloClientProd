import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React from 'react';

const SelectField = ({
  options,
  id,
  label,
  register,
  disabled,
  required,
  sx,
}) => {
  return (
    <FormControl variant='filled' fullWidth disabled={disabled} sx={sx}>
      <InputLabel id={`select-${id}-label`}>{label}</InputLabel>
      <Select
        labelId={`select-${id}-label`}
        id={`select-${id}`}
        label={label}
        {...register(id, {
          required: required === undefined ? true : required,
        })}
        defaultValue={(options[0] && options[0].value) || ''}
      >
        {options.map((option) => {
          return (
            <MenuItem
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.text}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default SelectField;

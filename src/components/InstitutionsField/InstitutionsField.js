import { Autocomplete, Box, Chip, TextField } from '@mui/material';
import React from 'react';

export default function InstitutionsField({
  institutions = [],
  loading,
  onChange,
  helperText,
  error,
  sx,
  variant,
  defaultValue,
  freeSolo,
  placeholder,
  label,
}) {
  return (
    <Box sx={{ width: '100%' }}>
      <Autocomplete
        sx={{ mt: 2, mb: 1, ...sx }}
        multiple
        freeSolo={freeSolo}
        id='tags-filled'
        options={institutions.map((institution) => institution.name)}
        defaultValue={defaultValue}
        loading={loading}
        onChange={onChange}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip
              variant='outlined'
              label={option}
              {...getTagProps({ index })}
            />
          ))
        }
        renderInput={(params) => (
          <TextField
            {...params}
            variant={variant || 'filled'}
            label={label || 'Établissements'}
            error={error}
            helperText={helperText}
            placeholder={placeholder}
          />
        )}
      />
    </Box>
  );
}

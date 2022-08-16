import { Autocomplete, Box, Chip, TextField } from '@mui/material';
import React from 'react';

export default function ({
  institutions = [],
  loading,
  onChange,
  helperText,
  sx,
  variant,
}) {
  return (
    <Box sx={{ width: '100%' }}>
      <Autocomplete
        sx={{ mt: 2, mb: 1, ...sx }}
        multiple
        id='tags-filled'
        options={institutions.map((institution) => institution.name)}
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
            label='Établissements'
            error={Boolean(helperText)}
            helperText={helperText}
          />
        )}
      />
    </Box>
  );
}

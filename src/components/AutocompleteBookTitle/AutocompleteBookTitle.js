import { Autocomplete, TextField } from '@mui/material';
import React from 'react';

import AutocompleteBookTitleLogic from './AutocompleteBookTitleLogic';

function AutocompleteBookTitle({ onTitleSelected }) {
  const { booksTitle, loading, onChange, handleTitleSelected } =
    AutocompleteBookTitleLogic({ onTitleSelected });

  return (
    <Autocomplete
      freeSolo
      id='tags-filled'
      options={booksTitle}
      loading={loading}
      onInputChange={onChange}
      onChange={handleTitleSelected}
      renderInput={(params) => (
        <TextField
          {...params}
          variant='outlined'
          placeholder='Titre du livre'
        />
      )}
    />
  );
}

export default AutocompleteBookTitle;

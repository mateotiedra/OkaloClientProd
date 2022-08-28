import React from 'react';

import { Alert, Autocomplete, Box, TextField, Typography } from '@mui/material';

import BookList from '../BookList/BookList';
import Loading from '../../pages/Loading/Loading';

import AutocompleteBookAttrLogic from './AutocompleteBookAttrLogic';
import { HiSearch } from 'react-icons/hi';
import IconTitle from '../IconTitle/IconTitle';

function AutocompleteBookAttr({
  variant,
  placeholder,
  wholeBook,
  autoFocus,
  children,
  sx,
  ...props
}) {
  const {
    autocompleteOptions,
    loading,
    onChange,
    handleAttrSelected,
    emptySearch,
    searchValue,
  } = AutocompleteBookAttrLogic({ wholeBook, ...props });

  if (wholeBook)
    return (
      <Box sx={sx}>
        <TextField
          variant='outlined'
          placeholder='Nom du livre...'
          onChange={onChange}
          value={searchValue}
          autoFocus={autoFocus}
        />
        {loading ? (
          <Loading notFullPage />
        ) : autocompleteOptions.length ? (
          <BookList items={autocompleteOptions} />
        ) : emptySearch ? (
          children
        ) : (
          <>
            <Alert severity='warning' sx={{ mt: 3 }}>
              Si tu ne trouves pas ton livres, reviens plus tard. Nous sommes
              encore proche de la rentrée et tous les livres n'ont pas déjà été
              mis en vente.
            </Alert>
            <IconTitle icon={<HiSearch />} sx={{ mt: 6 }}>
              Recherche
              <Typography>
                Vérifie l'orthographe ou diminue la longueur de la recherche
              </Typography>
            </IconTitle>
          </>
        )}
      </Box>
    );

  return (
    <Autocomplete
      freeSolo
      id='tags-filled'
      options={autocompleteOptions}
      autoFocus={autoFocus}
      loading={loading}
      onInputChange={onChange}
      onChange={handleAttrSelected}
      clearOnBlur
      selectOnFocus
      renderInput={(params) => (
        <TextField
          {...params}
          variant={variant || 'outlined'}
          placeholder={placeholder}
        />
      )}
    />
  );
}

export default AutocompleteBookAttr;

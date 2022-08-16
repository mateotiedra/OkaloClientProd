import React, { Children } from 'react';

import { Autocomplete, Box, TextField, Typography } from '@mui/material';

import BookList from '../BookList/BookList';
import Loading from '../../pages/Loading/Loading';

import AutocompleteBookAttrLogic from './AutocompleteBookAttrLogic';
import { HiSearch, HiOutlineEmojiSad } from 'react-icons/hi';
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
  } = AutocompleteBookAttrLogic({ wholeBook, ...props });

  if (wholeBook)
    return (
      <Box sx={sx}>
        <TextField
          variant='outlined'
          placeholder='Nom du livre...'
          onChange={onChange}
          autoFocus={autoFocus}
        />
        {loading ? (
          <Loading notFullPage />
        ) : autocompleteOptions.length ? (
          <BookList items={autocompleteOptions} />
        ) : emptySearch ? (
          children
        ) : (
          <IconTitle
            icon={emptySearch ? <HiSearch /> : <HiOutlineEmojiSad />}
            sx={{ mt: 6 }}
          >
            {emptySearch ? 'Recherche' : 'Aucun résultat'}
            <Typography>
              {emptySearch
                ? 'Si tu as plusieurs livres : crée une liste de recherche afin de gagner du temps'
                : "Vérifie l'orthographe ou diminue la longueur de la recherche"}
            </Typography>
          </IconTitle>
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

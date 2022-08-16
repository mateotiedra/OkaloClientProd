import React from 'react';

import { Typography } from '@mui/material';
import { HiSearch } from 'react-icons/hi';

import Navbar from '../../components/Navbar/Navbar';
import SectionContainer from '../../components/SectionContainer/SectionContainer';
import Loading from '../Loading/Loading';
import AutocompleteBookAttr from '../../components/AutocompleteBookAttr/AutocompleteBookAttr';
import BookList from '../../components/BookList/BookList';
import IconTitle from '../../components/IconTitle/IconTitle';
import SearchLogic from './SearchLogic';

function Search() {
  const { pageStatus, onTitleSelect, resultBids } = SearchLogic();

  return (
    <>
      <Navbar />
      <SectionContainer>
        <AutocompleteBookAttr
          attr='title'
          placeholder='Titre du livre'
          wholeBook
          autoFocus
          onSelect={onTitleSelect}
          sx={{ minHeight: '100vh', py: 12 }}
        >
          <IconTitle icon={<HiSearch />} sx={{ mt: 6 }}>
            {'Recherche'}
            <Typography>
              Entre le titre de ton livre afin de le trouver parmi des centaines
              d'autre
            </Typography>
          </IconTitle>
        </AutocompleteBookAttr>
        {pageStatus === 'loading-books' ? (
          <Loading />
        ) : pageStatus === 'results ' ? (
          <BookList bids={resultBids} />
        ) : (
          <></>
        )}
      </SectionContainer>
    </>
  );
}

export default Search;

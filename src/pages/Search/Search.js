import React from 'react';

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import { HashLink } from 'react-router-hash-link';

import Navbar from '../../components/Navbar/Navbar';
import SectionContainer from '../../components/SectionContainer/SectionContainer';
import SectionDivider from '../../components/SectionDivider/SectionDivider';
import Loading from '../Loading/Loading';
import FormFields from '../../components/FormFields/FormFields';

import SearchLogic from './SearchLogic';
import AutocompleteBookTitle from '../../components/AutocompleteBookTitle/AutocompleteBookTitle';

function Search() {
  const { pageStatus, submitSearch } = SearchLogic();

  return (
    <>
      <Navbar />
      <SectionContainer sx={{ pb: 12 }}>
        <SectionDivider />
        <AutocompleteBookTitle />
        {
          {
            /* todo: autocomplete attribute */
          }
        }
      </SectionContainer>
    </>
  );
}

export default Search;

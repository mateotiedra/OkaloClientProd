import {
  Divider,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import React from 'react';

import { HashLink } from 'react-router-hash-link';
import BookSection from '../../components/BookSection/BookSection';
import Navbar from '../../components/Navbar/Navbar';
import SectionContainer from '../../components/SectionContainer/SectionContainer';
import Loading from '../Loading/Loading';

import BookLogic from './BookLogic';
import InstitutionsField from '../../components/InstitutionsField/InstitutionsField';

export default function Book(props) {
  const {
    book,
    pageStatus,
    sortedBids,
    institutions,
    onInstitutionsChange,
    defaultInstitutions,
    institutionsOptions,
  } = BookLogic(props);

  if (pageStatus === 'loading') return <Loading />;
  return (
    <>
      <Navbar coverPage />
      <SectionContainer fullPage>
        <BookSection book={book} />
        <Typography variant='h4' mt={5} alignSelf='center'>
          {book.bids.length} annonce
          {book.bids.length && book.bids.length > 1 ? 's' : ''}
        </Typography>
        {defaultInstitutions && (
          <InstitutionsField
            defaultValue={defaultInstitutions}
            institutions={institutionsOptions}
            variant='standard'
            onChange={onInstitutionsChange}
            sx={{ mt: 1, mb: 5 }}
          />
        )}
        {institutions.map(({ name }) => (
          <React.Fragment key={name}>
            <Divider>
              <Typography variant='h6'>{name}</Typography>
            </Divider>
            <BidsList bids={sortedBids[name]} />
          </React.Fragment>
        ))}
      </SectionContainer>
    </>
  );
}

function BidsList({ bids }) {
  return (
    <List sx={{ width: '100%', pt: 0, mb: 2 }}>
      {bids.map((bid, index) => (
        <React.Fragment key={bid.uuid}>
          <ListItem disablePadding>
            <ListItemButton
              disableGutters
              component={HashLink}
              to={'/ad/' + bid.uuid}
            >
              <ListItemText
                primary={
                  <>
                    Vendu par <Link component='span'>{bid.user.username}</Link>
                  </>
                }
                secondary={bid.customisation + ' - ' + bid.condition}
              />
              <Typography variant='body1'>CHF {bid.price}</Typography>
            </ListItemButton>
          </ListItem>
          {index !== bids.length - 1 && <Divider component='li' />}
        </React.Fragment>
      ))}
    </List>
  );
}

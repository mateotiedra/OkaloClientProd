import {
  Divider,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import React from 'react';

import { HashLink } from 'react-router-hash-link';
import BookSection from '../../components/BookSection/BookSection';
import Navbar from '../../components/Navbar/Navbar';
import SectionContainer from '../../components/SectionContainer/SectionContainer';
import Loading from '../Loading/Loading';
import { HiInformationCircle } from 'react-icons/hi';

import BookLogic from './BookLogic';

export default function (props) {
  const { book, pageStatus } = BookLogic(props);

  if (pageStatus === 'loading') return <Loading />;
  return (
    <>
      <Navbar coverPage />
      <SectionContainer fullPage>
        <BookSection book={book} />
        <Typography variant='h5' mt={5}>
          {book.bids.length} annonce
          {book.bids.length && book.bids.length > 1 ? 's' : ''} pour ce livre :
        </Typography>
        <List sx={{ width: '100%' }}>
          {book.bids.map((bid, index) => (
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
                        Vendu par{' '}
                        <Link component='span'>{bid.user.username}</Link>
                      </>
                    }
                    secondary={bid.customisation + ' - ' + bid.condition}
                  />
                  <Typography variant='body1'>CHF {bid.price}</Typography>
                </ListItemButton>
              </ListItem>
              {index !== book.bids.length - 1 && <Divider component='li' />}
            </React.Fragment>
          ))}
        </List>
      </SectionContainer>
    </>
  );
}

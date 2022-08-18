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
import { HiOutlineEmojiSad } from 'react-icons/hi';
import { HashLink } from 'react-router-hash-link';

import BookSection from '../../components/BookSection/BookSection';
import Navbar from '../../components/Navbar/Navbar';
import SectionContainer from '../../components/SectionContainer/SectionContainer';
import Loading from '../Loading/Loading';
import InstitutionsField from '../../components/InstitutionsField/InstitutionsField';
import IconTitle from '../../components/IconTitle/IconTitle';
import AlertPage from '../../components/AlertPage/AlertPage';

import BookLogic from './BookLogic';

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

  if (pageStatus === 'not found')
    return (
      <AlertPage
        title='Oops... livre inconnu'
        error
        body="Ce livre n'existe pas ou plus..."
        ctaButtons={[{ text: 'Retourner au menu', to: '/' }]}
      />
    );

  const bidLists = institutions
    .map(({ name }) => {
      if (Boolean(sortedBids[name]))
        return (
          <React.Fragment key={name}>
            <Divider>
              <Typography variant='h6'>{name}</Typography>
            </Divider>
            <BidsList bids={sortedBids[name]} />
          </React.Fragment>
        );

      return undefined;
    })
    .filter((component) => Boolean(component));

  return (
    <>
      <Navbar coverPage />
      <SectionContainer fullPage>
        <BookSection book={book} />
        {institutionsOptions && institutionsOptions.length > 0 ? (
          <>
            <InstitutionsField
              defaultValue={defaultInstitutions}
              institutions={institutionsOptions}
              variant='standard'
              freeSolo
              label='Filtrer par établissements'
              onChange={onInstitutionsChange}
              sx={{ mt: 4, mb: 3 }}
            />
            {/* <Typography variant='body2' mb={4} alignSelf='flex-end'>
              {bidLists.length} résultat
              {book.bids.length && book.bids.length > 1 ? 's' : ''}
            </Typography> */}
            {bidLists.length > 0 ? (
              bidLists
            ) : (
              <Typography variant='body1' textAlign='center'>
                Personne ne vend ce livre dans les établissements mentionnés
                ci-dessus
              </Typography>
            )}
          </>
        ) : (
          <IconTitle icon={<HiOutlineEmojiSad />} sx={{ mt: 6 }}>
            {'Aucune annonce'}
            <Typography>Personne ne vend ce livre pour le moment...</Typography>
          </IconTitle>
        )}
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

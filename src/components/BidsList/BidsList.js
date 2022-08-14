import React from 'react';

import {
  Box,
  Divider,
  List,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';

import BidsListLogic from './BidsListLogic';
import { HashLink } from 'react-router-hash-link';

function BidsList(props) {
  const { bids } = BidsListLogic(props);

  return (
    <List
      sx={{
        width: '100%',
        margin: 'auto',
      }}
    >
      {bids &&
        bids.map((bid, index) => {
          return (
            <React.Fragment key={bid.uuid}>
              <ListItemButton
                disableGutters
                component={HashLink}
                to={'/ad/' + bid.uuid}
                sx={{
                  width: '100%',
                  alignItems: 'center',
                }}
              >
                {bid.book.coverLink ? (
                  <Box
                    component='img'
                    src={bid.book.coverLink}
                    sx={{
                      height: 90,
                      border: 'solid 2px',
                      borderColor: 'text.primary',
                      borderRadius: '3px',
                    }}
                  />
                ) : (
                  <Box
                    sx={{
                      width: 55,
                      height: 90,
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <Typography
                      variant='caption'
                      sx={{
                        textAlign: 'center',
                        display: 'block',
                      }}
                    >
                      Pas de preview
                    </Typography>
                  </Box>
                )}

                <ListItemText
                  primary={bid.book.title}
                  secondary={
                    <Typography
                      sx={{ display: 'inline' }}
                      component='span'
                      variant='body2'
                    >
                      {bid.book.publisher}
                    </Typography>
                  }
                  sx={{ px: 3 }}
                />
                <Typography
                  sx={{
                    alignSelf: 'flex-end',
                    mb: 1,
                    minWidth: 70,
                    textAlign: 'right',
                  }}
                >
                  CHF {bid.price}
                </Typography>
              </ListItemButton>
              {index !== bids.length - 1 && <Divider component='li' />}
            </React.Fragment>
          );
        })}
    </List>
  );
}

export default BidsList;

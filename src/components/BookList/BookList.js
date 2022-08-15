import React from 'react';

import {
  Box,
  Divider,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  Link,
} from '@mui/material';

import BookListLogic from './BookListLogic';
import { HashLink } from 'react-router-hash-link';

export default function (props) {
  const { items } = BookListLogic(props);

  return (
    <List
      sx={{
        width: '100%',
        margin: 'auto',
      }}
    >
      {items &&
        items.map((item, index) => {
          const isBid = Boolean(item.book);
          const book = item.book || item;
          return (
            <React.Fragment key={item.uuid}>
              <ListItemButton
                disableRipple
                disableGutters
                component={HashLink}
                to={(isBid ? '/ad/' : '/book/') + item.uuid}
                sx={{
                  width: '100%',
                  alignItems: 'center',
                }}
              >
                {book.coverLink ? (
                  <Box
                    component='img'
                    src={book.coverLink}
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
                  primary={book.title}
                  sx={{ pl: 3, pr: 2 }}
                  secondary={
                    <Typography
                      sx={{ display: 'inline' }}
                      component='span'
                      variant='body2'
                    >
                      {book.publisher}
                    </Typography>
                  }
                />
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                    minWidth: 70,
                  }}
                >
                  {Boolean(item.price) && (
                    <Typography
                      sx={{
                        alignSelf: 'flex-end',
                        mb: 1,
                        textAlign: 'right',
                      }}
                    >
                      CHF {item.price}
                    </Typography>
                  )}
                  <Link component='span' variant='body2'>
                    Voir plus
                  </Link>
                </Box>
              </ListItemButton>
              {index !== items.length - 1 && <Divider component='li' />}
            </React.Fragment>
          );
        })}
    </List>
  );
}

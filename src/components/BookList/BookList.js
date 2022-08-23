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
import { HiCheckCircle } from 'react-icons/hi';

export default function BookList(props) {
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
                      maxWidth: 75,
                      border: 'solid 2px',
                      borderColor: 'text.primary',
                      borderRadius: '3px',
                    }}
                  />
                ) : (
                  <Box
                    sx={{
                      width: 58,
                      height: 90,
                      display: 'flex',
                      alignItems: 'center',
                      border: 'solid 2px',
                      borderColor: 'text.primary',
                      borderRadius: '3px',
                      p: 0.5,
                    }}
                  >
                    <Typography
                      variant='caption'
                      sx={{
                        textAlign: 'center',
                        display: 'block',
                        fontSize: 11,
                      }}
                    >
                      Pas de preview
                    </Typography>
                  </Box>
                )}

                <ListItemText
                  primary={
                    <>
                      {book.title}
                      {Boolean(book.isbn) && (
                        <Box
                          display='inline'
                          component={HiCheckCircle}
                          size={20}
                          sx={{
                            color: 'primary.main',
                            position: 'relative',
                            ml: 0.5,
                            top: 4,
                          }}
                        />
                      )}
                    </>
                  }
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

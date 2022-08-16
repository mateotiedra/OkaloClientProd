import { Box, Typography } from '@mui/material';
import React from 'react';

export default function BookSection({ book }) {
  return (
    <Box sx={{ display: 'flex' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          minWidth: 120,
          maxWidth: 120,
          height: !book.coverLink && 180,
          border: 'solid 3px',
          borderColor: 'text.primary',
          borderRadius: '5px',
          overflow: 'hidden',
          mr: 5,
          ml: 2,
        }}
      >
        {book.coverLink ? (
          <Box
            component='img'
            src={book.coverLink}
            sx={{
              width: '100%',
            }}
          />
        ) : (
          <Typography variant='caption' sx={{ mx: 1, textAlign: 'center' }}>
            Pas de preview disponible
          </Typography>
        )}
      </Box>
      <Box sx={{ wordBreak: 'break-word' }}>
        <Typography variant='h5'>{book.title}</Typography>
        <Typography variant='body1' mb={2}>
          {book.author}
        </Typography>
        <Typography variant='h6'>{book.publisher}</Typography>
      </Box>
    </Box>
  );
}

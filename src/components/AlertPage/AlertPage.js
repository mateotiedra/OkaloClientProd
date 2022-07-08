import React from 'react';
import { Box, Button, Container, Typography } from '@mui/material';

import AlertPageLogic from './AlertPageLogic';
import Navbar from '../Navbar/Navbar';

function AlertPage({ title, body, ctaButtons, error, form, ...props }) {
  const { goHomeAction } = AlertPageLogic();

  return (
    <>
      <Navbar coverPage empty goHomeAction={goHomeAction} />
      <Container
        {...props}
        maxWidth='md'
        sx={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          p: 6,
        }}
      >
        <Box>
          <Typography component='h2' variant='h3'>
            {title}
          </Typography>
          <Box
            sx={{
              backgroundColor: error ? 'error.main' : 'primary.main',
              width: '100%',
              borderRadius: 10,
              height: 10,
              mb: 2,
            }}
          />
        </Box>
        {typeof body === 'string' ? (
          <Typography variant='body1'>{body}</Typography>
        ) : (
          body
        )}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: { xs: 'center', sm: 'center', md: 'flex-start' },
            flexWrap: 'wrap',
            mt: 3,
            width: '100%',
          }}
        >
          {ctaButtons &&
            ctaButtons.map((button) => {
              return (
                <Button
                  variant='contained'
                  onClick={button.onClick}
                  key={button.text}
                >
                  <Typography variant='body1'>{button.text}</Typography>
                </Button>
              );
            })}
        </Box>
      </Container>
    </>
  );
}

export default AlertPage;

import React from 'react';
import { Box, Button, Container, Typography } from '@mui/material';

import AlertPageLogic from './AlertPageLogic';
import Navbar from '../Navbar/Navbar';

function AlertPage({ title, body, ctaButtons, error }) {
  const { goHomeAction } = AlertPageLogic();

  return (
    <>
      <Navbar coverPage empty goHomeAction={goHomeAction} />
      <Container
        component='main'
        maxWidth='md'
        sx={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
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
        {typeof body === 'string' ? (
          <Typography variant='body1'>{body}</Typography>
        ) : (
          body
        )}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            mt: 3,
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

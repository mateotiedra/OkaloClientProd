import React from 'react';

import { Button, Typography } from '@mui/material';
import { HashLink } from 'react-router-hash-link';

function PageButton({ text, onClick, to, children, ...props }) {
  return (
    <Button
      variant='contained'
      size='large'
      sx={{
        margin: 0,
        top: 'auto',
        right: 20,
        bottom: { xs: 90, sm: 90, md: 20 },
        left: 'auto',
        position: 'fixed',
      }}
      onClick={onClick}
      component={to && HashLink}
      to={to}
      {...props}
    >
      <Typography variant='body1'>{text || children}</Typography>
    </Button>
  );
}

export default PageButton;

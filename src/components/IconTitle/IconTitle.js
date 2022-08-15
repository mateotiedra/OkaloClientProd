import React from 'react';
import { Box, Typography } from '@mui/material';

function IconTitle({ icon, title, children, sx }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        mb: 2,
        ...sx,
      }}
    >
      {icon &&
        React.cloneElement(icon, {
          size: 60,
          opacity: 0.8,
        })}
      <Typography variant='h5' sx={{ textAlign: 'center', mt: 1 }}>
        {title || children}
      </Typography>
    </Box>
  );
}

export default IconTitle;

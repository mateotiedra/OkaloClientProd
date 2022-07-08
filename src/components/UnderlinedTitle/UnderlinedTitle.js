import { Box, Typography } from '@mui/material';

function UnderlinedTitle({ children, color = 'primary.main' }) {
  return (
    <Box>
      <Typography component='h2' variant='h3'>
        {children}
      </Typography>
      <Box
        sx={{
          backgroundColor: color,
          width: '100%',
          borderRadius: 10,
          height: 7,
          mb: 2,
        }}
      />
    </Box>
  );
}

export default UnderlinedTitle;

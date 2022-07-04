import { Box } from '@mui/material';

function SectionContainer(props) {
  return (
    <Box
      id={props.id}
      ref={props.ref}
      sx={{
        px: { xs: 4, sm: 5, md: 10, lg: 10, ...props.sx },
        maxWidth: '1300px',
        mx: 'auto',
        ...props.sx,
      }}
    >
      {props.children}
    </Box>
  );
}

export default SectionContainer;

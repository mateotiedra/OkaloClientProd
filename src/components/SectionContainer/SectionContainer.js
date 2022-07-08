import { Container } from '@mui/material';

function SectionContainer(props) {
  return (
    <Container
      id={props.id}
      ref={props.ref}
      maxWidth={props.maxWidth || 'lg'}
      sx={{
        px: { xs: 4, sm: 5, md: 10, lg: 10, ...props.sx },
        ...props.sx,
      }}
    >
      {props.children}
    </Container>
  );
}

export default SectionContainer;

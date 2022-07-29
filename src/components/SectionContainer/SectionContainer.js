import { Container } from '@mui/material';

function SectionContainer({
  id,
  ref,
  maxWidth,
  sx,
  children,
  centered,
  ...props
}) {
  return (
    <Container
      id={id}
      ref={ref}
      maxWidth={maxWidth || 'lg'}
      sx={{
        px: { xs: 4, sm: 5, md: 10, lg: 10, ...sx },
        display: 'flex',
        flexDirection: 'column',
        alignItems: centered && 'center',
        ...sx,
      }}
      {...props}
    >
      {children}
    </Container>
  );
}

export default SectionContainer;

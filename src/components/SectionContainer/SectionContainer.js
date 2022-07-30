import { Container } from '@mui/material';

function SectionContainer({
  id,
  ref,
  maxWidth,
  sx,
  children,
  centered,
  fullPage,
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
        height: fullPage && '100vh',
        justifyContent: fullPage && 'center',
        ...sx,
      }}
      {...props}
    >
      {children}
    </Container>
  );
}

export default SectionContainer;

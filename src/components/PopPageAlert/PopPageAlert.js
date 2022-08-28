import React, { useRef } from 'react';
import { Alert, Collapse, Container, IconButton } from '@mui/material';
import { HiX } from 'react-icons/hi';

export default function PopPageAlert({
  severity,
  children,
  open,
  onClose,
  closeOnTimer,
}) {
  const willClose = useRef(false);

  if (open && closeOnTimer) {
    willClose.current = true;
    setTimeout(() => {
      onClose();
    }, 3000);
  }

  return (
    <Container
      maxWidth='md'
      sx={{
        position: 'absolute',
        width: '100%',
        left: '50%',
        transform: 'translate(-50%, 0)',
        top: { xs: 0, sm: 0, md: 80 },
        pt: 2,
        px: 3,
      }}
    >
      <Collapse in={open}>
        <Alert
          severity={severity || 'success'}
          action={
            Boolean(onClose) && (
              <IconButton
                aria-label='close'
                color='inherit'
                size='small'
                onClick={onClose}
              >
                <HiX />
              </IconButton>
            )
          }
        >
          {children}
        </Alert>
      </Collapse>
    </Container>
  );
}

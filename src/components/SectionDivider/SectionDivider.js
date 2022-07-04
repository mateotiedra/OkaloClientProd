import { Box } from '@mui/material';

function SectionDivider({ sx, ...props }) {
  const h = props.h || 1;
  return <Box sx={{ height: 70 * h, ...sx }} {...props} />;
}

export default SectionDivider;

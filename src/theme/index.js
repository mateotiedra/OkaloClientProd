import { createTheme, responsiveFontSizes } from '@mui/material/styles';

const primaryBlue = '#0496FF';
const secondaryBlue = '#0D3B66';
const lightGrey = '#FAFAFA';
const darkGrey = '#2E3438';

// Manage the website theme
let theme = createTheme({
  palette: {
    primary: {
      main: primaryBlue,
    },
    secondary: {
      main: secondaryBlue,
    },
    background: {
      default: '#FFFFFF',
      paper: lightGrey,
    },
    text: {
      primary: darkGrey,
    },
    error: {
      main: '#DB3A34',
    },
  },
  typography: {
    h1: {
      fontFamily: '"Rubik", "Helvetica", "Arial", sans-serif',
      fontWeight: 600,
    },
    h2: {
      fontFamily: '"Rubik", "Helvetica", "Arial", sans-serif',
      fontWeight: 500,
    },
    fontFamily: '"Rubik", "Helvetica", "Arial", sans-serif',
    fontSize: 16,
    fontWeightLight: 300,
    body1: {
      fontWeight: 200,
    },
    h4: {
      fontFamily: '"Rubik", "Helvetica", "Arial", sans-serif',
    },
    h3: {
      fontFamily: '"Rubik", "Helvetica", "Arial", sans-serif',
    },
  },

  components: {
    MuiAppBar: {
      defaultProps: {
        color: 'primary',
      },
    },
    MuiButton: {
      defaultProps: {
        disableRipple: true,
        disableElevation: true,
        textTransform: 'none',
      },
      styleOverrides: {
        root: { textTransform: 'none', padding: '12px 0' },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          padding: '0 20px',
          color: 'text',
          fontWeight: 700,
          fontSize: 30,
          fieldset: {
            borderColor: darkGrey,
            borderOpacity: 0.5,
          },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: 'none',
          '&:hover': {
            textDecoration: 'underline',
          },
        },
      },
    },
  },
  shape: {
    borderRadius: 14,
  },
});

theme = responsiveFontSizes(theme);

export default theme;

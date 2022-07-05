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
    fontFamily: '"Rubik", "Helvetica", "Arial", sans-serif',
    fontSize: 16,
    fontWeightLight: 300,
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 700,
    },
    h4: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 700,
    },
    body1: {
      fontWeight: 500,
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
    MuiTextField: {
      defaultProps: {
        variant: 'filled',
        fullWidth: true,
      },
      styleOverrides: {
        root: {
          color: darkGrey,
          fontWeight: 700,
          input: {
            color: darkGrey,
            fontWeight: 500,
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          padding: '0 20px',
          fieldset: {
            borderColor: darkGrey,
            borderOpacity: 0.5,
          },
        },
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          color: 'text',
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
          fontWeight: 500,
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

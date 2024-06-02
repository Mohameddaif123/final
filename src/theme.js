import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#8D6E63', // Soft brown for primary elements
    },
    secondary: {
      main: '#FFB74D', // Soft orange for secondary elements
    },
    error: {
      main: '#E57373', // Soft red for errors
    },
    warning: {
      main: '#FFB74D', // Soft orange for warnings
    },
    info: {
      main: '#64B5F6', // Soft blue for informational messages
    },
    success: {
      main: '#81C784', // Soft green for success messages
    },
    background: {
      default: '#FFF3E0', // Light peach background color
      paper: '#FFFFFF', // White background for paper elements
    },
  },
  typography: {
    fontFamily: [
      'Comic Sans MS', // Playful font for pet theme
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      marginBottom: '1rem',
      color: '#8D6E63', // Soft brown
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 700,
      marginBottom: '0.8rem',
      color: '#8D6E63', // Soft brown
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 700,
      marginBottom: '0.6rem',
      color: '#8D6E63', // Soft brown
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 700,
      marginBottom: '0.5rem',
      color: '#8D6E63', // Soft brown
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 700,
      marginBottom: '0.4rem',
      color: '#8D6E63', // Soft brown
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 700,
      marginBottom: '0.3rem',
      color: '#8D6E63', // Soft brown
    },
    body1: {
      fontSize: '1rem',
      color: '#4E342E', // Darker brown for body text
    },
    body2: {
      fontSize: '0.875rem',
      color: '#4E342E', // Darker brown for secondary body text
    },
    button: {
      textTransform: 'none', // Remove uppercase transformation from buttons
      fontWeight: 700,
      color: '#8D6E63', // Soft brown for buttons
    },
  },
});

export default theme;

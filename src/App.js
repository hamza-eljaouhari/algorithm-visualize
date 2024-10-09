// src/App.js
import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Dashboard from './Dashboard';

const theme = createTheme({
  typography: {
    fontFamily: 'Ubuntu, sans-serif',
    htmlFontSize: 14, // Decrease the base font size by about 20%
  },
  spacing: 8 * 0.8, // Scale down spacing by 20%
  components: {
    MuiTypography: {
      defaultProps: {
        fontSize: '0.8rem', // Decrease font sizes
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: '0.8rem', // Scale down button font size
          padding: '4px 8px', // Reduce padding
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          fontSize: '0.8rem', // Scale down text field font size
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          width: 240 * 0.8, // 20% smaller drawer width
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          minHeight: '32px', // Reduce accordion header height
          '& .MuiAccordionSummary-content': {
            margin: '8px 0', // Reduce margin for accordion content
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          height: '48px', // Reduce AppBar height
        },
      },
    },
    // Add other components with similar overrides as needed
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Dashboard />
    </ThemeProvider>
  );
}

export default App;

// src/App.js
import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Dashboard from './Dashboard';

// Create a custom theme with the Ubuntu font
const theme = createTheme({
  typography: {
    fontFamily: 'Ubuntu, sans-serif',
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

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import App from './App';
import store from './store';
// Import the alert service for initialization
import './services/alertService';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2E7D32', // Green color representing sustainability
      light: '#4CAF50',
      dark: '#1B5E20'
    },
    secondary: {
      main: '#FF8F00', // Orange color for calls-to-action
      light: '#FFB74D',
      dark: '#F57C00'
    },
    background: {
      default: '#F5F5F5',
      paper: '#FFFFFF'
    }
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem'
    },
    h2: {
      fontWeight: 600,
      fontSize: '2rem'
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.75rem'
    },
    h4: {
      fontWeight: 500,
      fontSize: '1.5rem'
    },
    h5: {
      fontWeight: 500,
      fontSize: '1.25rem'
    },
    h6: {
      fontWeight: 500,
      fontSize: '1rem'
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 500
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }
      }
    }
  }
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
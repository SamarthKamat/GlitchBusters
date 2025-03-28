import { createTheme } from '@mui/material/styles';

// Create theme settings for both light and dark modes
export const themeSettings = (mode) => {
  return {
    palette: {
      mode,
      ...(mode === 'dark'
        ? {
            primary: {
              main: '#4CAF50',
              light: '#81C784',
              dark: '#388E3C',
              contrastText: '#FFFFFF'
            },
            secondary: {
              main: '#FF9800',
              light: '#FFB74D',
              dark: '#F57C00',
              contrastText: '#000000'
            },
            background: {
              default: '#121212',
              paper: '#1E1E1E',
              alternate: '#2D2D2D'
            },
            text: {
              primary: '#FFFFFF',
              secondary: '#B0B0B0',
              disabled: '#6C6C6C'
            },
            divider: 'rgba(255, 255, 255, 0.12)'
          }
        : {
            primary: {
              main: '#2E7D32',
              light: '#4CAF50',
              dark: '#1B5E20',
              contrastText: '#FFFFFF'
            },
            secondary: {
              main: '#FF8F00',
              light: '#FFB74D',
              dark: '#F57C00',
              contrastText: '#000000'
            },
            background: {
              default: '#F5F5F5',
              paper: '#FFFFFF',
              alternate: '#F9F9F9'
            },
            text: {
              primary: '#212121',
              secondary: '#757575',
              disabled: '#9E9E9E'
            },
            divider: 'rgba(0, 0, 0, 0.12)'
          })
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      h1: { fontWeight: 700, fontSize: '2.5rem', lineHeight: 1.2, letterSpacing: '-0.01562em' },
      h2: { fontWeight: 700, fontSize: '2rem', lineHeight: 1.3, letterSpacing: '-0.00833em' },
      h3: { fontWeight: 700, fontSize: '1.75rem', lineHeight: 1.4, letterSpacing: '0em' },
      h4: { fontWeight: 700, fontSize: '1.5rem', lineHeight: 1.4, letterSpacing: '0.00735em' },
      h5: { fontWeight: 700, fontSize: '1.25rem', lineHeight: 1.4, letterSpacing: '0em' },
      h6: { fontWeight: 700, fontSize: '1rem', lineHeight: 1.5, letterSpacing: '0.0075em' },
      body1: { fontWeight: 600, fontSize: '1rem', lineHeight: 1.5, letterSpacing: '0.00938em' },
      body2: { fontWeight: 600, fontSize: '0.875rem', lineHeight: 1.5, letterSpacing: '0.01071em' },
      button: { fontWeight: 700, fontSize: '0.875rem', textTransform: 'none', letterSpacing: '0.02857em' }
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: { 
            backgroundImage: 'none',
            transition: 'all 0.3s ease',
            '&:hover': {
              boxShadow: '0 10px 20px rgba(0, 0, 0, 0.15), 0 6px 6px rgba(0, 0, 0, 0.1)'
            }
          }
        }
      },
      MuiButton: {
        styleOverrides: {
          root: {
            fontWeight: 700,
            borderRadius: 8,
            textTransform: 'none',
            transition: 'all 0.3s ease',
            position: 'relative',
            overflow: 'hidden'
          },
          containedPrimary: {
            boxShadow: '0 4px 10px rgba(46, 125, 50, 0.25)',
            '&:hover': {
              boxShadow: '0 6px 15px rgba(46, 125, 50, 0.35)',
              transform: 'translateY(-2px)'
            }
          },
          containedSecondary: {
            boxShadow: '0 4px 10px rgba(255, 143, 0, 0.25)',
            '&:hover': {
              boxShadow: '0 6px 15px rgba(255, 143, 0, 0.35)',
              transform: 'translateY(-2px)'
            }
          }
        }
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            overflow: 'hidden',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-5px)',
              boxShadow: '0 12px 20px rgba(0, 0, 0, 0.15), 0 6px 6px rgba(0, 0, 0, 0.1)'
            }
          }
        }
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            fontWeight: 700
          }
        }
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'scale(1.1)'
            }
          }
        }
      }
    },
    shape: { borderRadius: 8 },
    shadows: Array.from({ length: 25 }, (_, index) =>
      index === 0 ? 'none' : mode === 'dark'
        ? `0 ${index}px ${index * 2}px rgba(0,0,0,0.5)`
        : `0 ${index}px ${index * 2}px rgba(0,0,0,0.1)`
    )
  };
};

export const createAppTheme = (mode) => createTheme(themeSettings(mode));
import { createTheme } from '@mui/material/styles';

// Create theme settings for both light and dark modes
export const themeSettings = (mode) => {
  return {
    palette: {
      mode,
      ...(mode === 'dark'
        ? {
            // Dark mode palette
            primary: {
              main: '#4CAF50', // Brighter green for dark mode
              light: '#81C784',
              dark: '#388E3C',
              contrastText: '#FFFFFF'
            },
            secondary: {
              main: '#FF9800', // Brighter orange for dark mode
              light: '#FFB74D',
              dark: '#F57C00',
              contrastText: '#000000'
            },
            background: {
              default: '#121212', // Dark background
              paper: '#1E1E1E',   // Slightly lighter dark for cards
              alternate: '#2D2D2D' // For alternating elements
            },
            text: {
              primary: '#FFFFFF',
              secondary: '#B0B0B0',
              disabled: '#6C6C6C'
            },
            divider: 'rgba(255, 255, 255, 0.12)',
            success: {
              main: '#4CAF50',
              light: '#81C784',
              dark: '#388E3C'
            },
            info: {
              main: '#2196F3',
              light: '#64B5F6',
              dark: '#1976D2'
            },
            warning: {
              main: '#FF9800',
              light: '#FFB74D',
              dark: '#F57C00'
            },
            error: {
              main: '#F44336',
              light: '#E57373',
              dark: '#D32F2F'
            }
          }
        : {
            // Light mode palette (original theme)
            primary: {
              main: '#2E7D32', // Green color representing sustainability
              light: '#4CAF50',
              dark: '#1B5E20',
              contrastText: '#FFFFFF'
            },
            secondary: {
              main: '#FF8F00', // Orange color for calls-to-action
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
            divider: 'rgba(0, 0, 0, 0.12)',
            success: {
              main: '#4CAF50',
              light: '#81C784',
              dark: '#388E3C'
            },
            info: {
              main: '#2196F3',
              light: '#64B5F6',
              dark: '#1976D2'
            },
            warning: {
              main: '#FF9800',
              light: '#FFB74D',
              dark: '#F57C00'
            },
            error: {
              main: '#F44336',
              light: '#E57373',
              dark: '#D32F2F'
            }
          })
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontWeight: 700,
        fontSize: '2.5rem',
        lineHeight: 1.2
      },
      h2: {
        fontWeight: 600,
        fontSize: '2rem',
        lineHeight: 1.3
      },
      h3: {
        fontWeight: 600,
        fontSize: '1.75rem',
        lineHeight: 1.4
      },
      h4: {
        fontWeight: 500,
        fontSize: '1.5rem',
        lineHeight: 1.4
      },
      h5: {
        fontWeight: 500,
        fontSize: '1.25rem',
        lineHeight: 1.4
      },
      h6: {
        fontWeight: 500,
        fontSize: '1rem',
        lineHeight: 1.5
      },
      body1: {
        fontSize: '1rem',
        lineHeight: 1.5
      },
      body2: {
        fontSize: '0.875rem',
        lineHeight: 1.5
      },
      button: {
        fontWeight: 500,
        fontSize: '0.875rem',
        textTransform: 'none'
      }
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            textTransform: 'none',
            fontWeight: 500,
            padding: '8px 16px'
          },
          contained: {
            boxShadow: 'none',
            '&:hover': {
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
            }
          }
        }
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            boxShadow: mode === 'dark' 
              ? '0 4px 8px rgba(0, 0, 0, 0.5)' 
              : '0 4px 6px rgba(0, 0, 0, 0.1)'
          }
        }
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none'
          }
        }
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            boxShadow: mode === 'dark' 
              ? '0 4px 8px rgba(0, 0, 0, 0.5)' 
              : '0 1px 3px rgba(0, 0, 0, 0.12)'
          }
        }
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundImage: 'none'
          }
        }
      },
      MuiListItemButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            margin: '4px 8px',
            '&.Mui-selected': {
              backgroundColor: mode === 'dark' 
                ? 'rgba(76, 175, 80, 0.2)' 
                : 'rgba(46, 125, 50, 0.1)'
            }
          }
        }
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 16
          }
        }
      },
      MuiAvatar: {
        styleOverrides: {
          root: {
            fontWeight: 600
          }
        }
      }
    },
    shape: {
      borderRadius: 8
    },
    shadows: [
      'none',
      mode === 'dark' 
        ? '0 2px 4px rgba(0,0,0,0.4)' 
        : '0 2px 4px rgba(0,0,0,0.1)',
      mode === 'dark' 
        ? '0 4px 8px rgba(0,0,0,0.5)' 
        : '0 4px 8px rgba(0,0,0,0.1)',
      // ... other shadow levels
      mode === 'dark' 
        ? '0 8px 16px rgba(0,0,0,0.6)' 
        : '0 8px 16px rgba(0,0,0,0.1)',
      // ... remaining shadow levels from default theme
    ]
  };
};

// Create theme instance with the settings
export const createAppTheme = (mode) => {
  return createTheme(themeSettings(mode));
};
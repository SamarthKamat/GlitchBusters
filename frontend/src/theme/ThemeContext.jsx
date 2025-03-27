import React, { createContext, useState, useEffect, useMemo, useContext } from 'react';

// Create context for theme mode
const ThemeContext = createContext({
  mode: 'light',
  toggleColorMode: () => {},
});

// Custom hook to use the theme context
export const useThemeContext = () => useContext(ThemeContext);

// Theme provider component
export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState(() => {
    // Check if user has a saved preference
    const savedMode = localStorage.getItem('theme-mode');
    return savedMode || 'light';
  });

  // Toggle between light and dark mode
  const toggleColorMode = () => {
    setMode((prevMode) => {
      const newMode = prevMode === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme-mode', newMode);
      return newMode;
    });
  };

  // Apply dark mode class to html element
  useEffect(() => {
    const htmlElement = document.documentElement;
    if (mode === 'dark') {
      htmlElement.classList.add('dark');
    } else {
      htmlElement.classList.remove('dark');
    }
  }, [mode]);

  // Memoize the context value
  const contextValue = useMemo(
    () => ({
      mode,
      toggleColorMode,
    }),
    [mode]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};
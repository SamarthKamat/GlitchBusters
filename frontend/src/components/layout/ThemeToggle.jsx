import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { Brightness4 as DarkModeIcon, Brightness7 as LightModeIcon } from '@mui/icons-material';
import { useThemeContext } from '../../theme/ThemeContext';

const ThemeToggle = () => {
  const { mode, toggleColorMode } = useThemeContext();

  return (
    <Tooltip title={mode === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}>
      <IconButton onClick={toggleColorMode} color="inherit" aria-label="toggle theme">
        {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggle;
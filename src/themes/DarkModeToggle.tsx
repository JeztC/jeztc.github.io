import React from 'react';
import { useTheme } from './ThemeContext';
import { IconButton, useMediaQuery } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

export const DarkModeToggle = () => {
    const { theme, toggleMode } = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const iconFontSize = isMobile ? '37px' : 'inherit';

    return (
        <IconButton
            sx={{ ml: 1, marginBottom: '10px' }}
            onClick={toggleMode}
            color="secondary"
        >
            {theme.palette.mode === 'dark' ? <LightModeIcon sx={{ fontSize: iconFontSize }} /> : <DarkModeIcon sx={{ fontSize: iconFontSize }} />}
        </IconButton>
    );
};
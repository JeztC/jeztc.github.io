import React from 'react';
import { useTheme } from './theme-context';
import { IconButton, useMediaQuery } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useTheme as muiTheme } from "@mui/material/styles";

export const DarkModeToggle: React.FC = () => {
    const { theme, toggleMode } = useTheme();
    const mTheme = muiTheme();
    const isMobile = useMediaQuery(mTheme.breakpoints.down("sm"));
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
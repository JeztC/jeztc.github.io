import React from 'react';
import { IconButton, useMediaQuery, Tooltip } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useTheme } from "./ThemeContext";
import { useTranslation } from "react-i18next";

export const DarkModeToggle = () => {
    const { theme, toggleMode } = useTheme();
    const { t } = useTranslation();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const iconFontSize = isMobile ? '37px' : 'inherit';
    const tooltipText = theme.palette.mode === 'dark' ? t('changeLightTheme') : t('changeDarkTheme');

    return (
        <Tooltip
            title={tooltipText}
            arrow
            slotProps={{
                tooltip: {
                    sx: {
                        backgroundColor: '#1B1A1A',
                        color: '#fff',
                        backdropFilter: 'none',
                        boxShadow: 'none',
                    },
                },
                arrow: {
                    sx: {
                        color: '#333',
                    },
                },
            }}
        >
            <IconButton
                onClick={toggleMode}
            >
                {theme.palette.mode === 'dark' ? (
                    <LightModeIcon sx={{ fontSize: iconFontSize, color: theme.palette.text.primary }} />
                ) : (
                    <DarkModeIcon sx={{ fontSize: iconFontSize, color: theme.palette.text.primary }} />
                )}
            </IconButton>
        </Tooltip>
    );
};
import {
    IconButton,
    Tooltip,
    useMediaQuery,
} from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useTranslation } from 'react-i18next';
import { useTheme } from "../themes/ThemeContext";

export const DarkModeToggle = () => {
    const { theme, toggleMode } = useTheme();
    const { t } = useTranslation();
    const isMobile = useMediaQuery('(max-width:960px)');
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
                color="secondary"
            >
                {theme.palette.mode === 'dark' ? (
                    <LightModeIcon sx={{ fontSize: iconFontSize }} />
                ) : (
                    <DarkModeIcon sx={{ fontSize: iconFontSize }} />
                )}
            </IconButton>
        </Tooltip>
    );
};
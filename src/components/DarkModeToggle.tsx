import {
    IconButton,
    useMediaQuery,
    Tooltip,
    useColorScheme,
} from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useTranslation } from 'react-i18next';

export const DarkModeToggle = () => {
    const { mode, setMode } = useColorScheme();
    const { t } = useTranslation();
    const isMobile = useMediaQuery('(max-width:960px)');
    const iconFontSize = isMobile ? '37px' : 'inherit';
    const tooltipText = mode === 'dark' ? t('changeLightTheme') : t('changeDarkTheme');

    const toggleMode = () => {
        setMode(mode === 'light' ? 'dark' : 'light');
    };

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
            <IconButton onClick={toggleMode}>
                {mode === 'dark' ? (
                    <LightModeIcon
                        sx={(theme) => ({
                            fontSize: iconFontSize, color: theme.palette.text.primary
                        })}
                    />
                ) : (
                    <DarkModeIcon
                        sx={(theme) => ({
                            fontSize: iconFontSize, color: theme.palette.text.primary
                        })}
                    />
                )}
            </IconButton>
        </Tooltip>
    );
};
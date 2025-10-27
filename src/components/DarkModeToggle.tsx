import {
    IconButton,
    Tooltip, tooltipClasses,
    useMediaQuery,
} from '@mui/material';
import { styled, useColorScheme } from '@mui/material/styles';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useTranslation } from 'react-i18next';
import { StyledModeIconProps } from "../interfaces/styledModeIconProps";

const CustomTooltip = styled(Tooltip)(() => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: '#1B1A1A',
        color: '#fff',
        backdropFilter: 'none',
        boxShadow: 'none',
    },
    [`& .${tooltipClasses.arrow}`]: {
        color: '#333',
    },
}));

const StyledDarkModeIcon = styled(DarkModeIcon, {
    shouldForwardProp: (prop) => prop !== 'iconFontSize',
})<StyledModeIconProps>(({ theme, iconFontSize }) => ({
    fontSize: iconFontSize,
    color: theme.palette.text.primary,
}))

const StyledLightModeIcon = styled(LightModeIcon, {
    shouldForwardProp: (prop) => prop !== 'iconFontSize',
})<StyledModeIconProps>(({ theme, iconFontSize }) => ({
    fontSize: iconFontSize,
    color: theme.palette.text.primary,
}))

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
        <CustomTooltip
            title={tooltipText}
            arrow
        >
            <IconButton onClick={toggleMode}>
                {mode === 'dark' ? (
                    <StyledLightModeIcon iconFontSize={iconFontSize}/>
                ) : (
                    <StyledDarkModeIcon iconFontSize={iconFontSize}/>
                )}
            </IconButton>
        </CustomTooltip>
    );
};
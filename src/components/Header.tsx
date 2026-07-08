import { styled, useTheme } from "@mui/material/styles";
import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import type { MouseEvent } from "react";
import {
    AppBar,
    Box,
    IconButton,
    Menu,
    MenuItem,
    Tab,
    Tabs,
    Toolbar,
    Tooltip,
    useMediaQuery,
} from "@mui/material";
import LanguageIcon from '@mui/icons-material/Language';
import { useTranslation } from 'react-i18next';
import { DarkModeToggle } from "./DarkModeToggle";
import ReactCountryFlag from "react-country-flag";
import { routesConfig } from "./AppRoutes";

const BrandLink = styled(Link)(({ theme }) => ({
    fontWeight: 700,
    fontSize: '1.25rem',
    letterSpacing: '0.08em',
    textDecoration: 'none',
    color: theme.palette.text.primary,
    whiteSpace: 'nowrap',
    flexShrink: 0,
    transition: 'color 0.2s ease',
    '&:hover': {
        color: theme.palette.primary.main,
    },
}));

const StyledNavLink = styled(NavLink)`
    text-decoration: none;
    color: inherit;
`;

const StyledTabs = styled(Tabs)(({ theme }) => ({
    minHeight: 64,

    // Windows 11-style short pill indicator, centered under the active tab.
    '& .MuiTabs-indicator': {
        height: 3,
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    '& .MuiTabs-indicatorSpan': {
        width: '100%',
        maxWidth: 22,
        height: 3,
        borderRadius: 3,
        backgroundColor: theme.palette.primary.main,
    },

    '& .MuiTab-root': {
        textTransform: 'none',
        minHeight: 64,
        fontWeight: 500,
        fontSize: '0.875rem',
        padding: '6px 20px',
        color: theme.palette.text.secondary,
        transition: 'color 0.2s ease',

        '&:hover': {
            color: theme.palette.text.primary,
        },

        '&.Mui-selected': {
            color: theme.palette.text.primary,
            fontWeight: 600,
        },
    },
}));


const LanguageMenuItem = styled(MenuItem)`
    width: 200px;
`;

const ControlsBox = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
    flexShrink: 0,
    gap: 4,
}));

const Header = () => {
    const { t, i18n } = useTranslation();
    const location = useLocation();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [languageMenuAnchor, setLanguageMenuAnchor] = useState<null | HTMLElement>(null);

    const handleLanguageMenuOpen = (event: MouseEvent<HTMLElement>) => setLanguageMenuAnchor(event.currentTarget);
    const handleLanguageMenuClose = () => setLanguageMenuAnchor(null);
    const handleLanguageChange = (language: string) => {
        i18n.changeLanguage(language);
        handleLanguageMenuClose();
    };

    return (
        <AppBar
            position="sticky"
            elevation={0}
            sx={({ palette }) => ({
                backdropFilter: 'blur(10px)',
                borderBottom: `1px solid ${palette.divider}`,
                backgroundColor: palette.mode === 'dark'
                    ? 'rgba(0,0,0,0.82)'
                    : 'rgba(255,255,255,0.82)',
            })}
        >
            <Toolbar sx={{ minHeight: 64, px: { xs: 1, sm: 2 }, gap: 1 }}>
                {isMobile ? (
                    <>
                        <BrandLink to="/">Portfolio</BrandLink>
                        <Box sx={{ flex: 1 }} />
                        <ControlsBox sx={{ gap: 0 }}>
                            <DarkModeToggle />
                            <Tooltip title={t('changeLanguage')} arrow>
                                <IconButton onClick={handleLanguageMenuOpen} sx={{ color: 'text.primary' }}>
                                    <LanguageIcon sx={{ fontSize: '37px' }} />
                                </IconButton>
                            </Tooltip>
                        </ControlsBox>
                    </>
                ) : (
                    <>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <BrandLink to="/">Portfolio</BrandLink>
                            <StyledTabs
                                value={location.pathname}
                                variant="scrollable"
                                scrollButtons="auto"
                                slotProps={{ indicator: { children: <span className="MuiTabs-indicatorSpan" /> } }}
                            >
                                {routesConfig.map((item) => (
                                    <Tab
                                        key={item.path}
                                        component={StyledNavLink}
                                        to={item.path}
                                        label={t(item.labelKey)}
                                        icon={item.icon}
                                        iconPosition="start"
                                        value={item.path}
                                    />
                                ))}
                            </StyledTabs>
                        </Box>
                        <Box sx={{ flex: 1 }} />
                        <ControlsBox>
                            <DarkModeToggle />
                            <Tooltip title={t('changeLanguage')} arrow>
                                <IconButton onClick={handleLanguageMenuOpen} sx={{ color: 'text.primary' }}>
                                    <LanguageIcon sx={{ fontSize: '30px' }} />
                                </IconButton>
                            </Tooltip>
                        </ControlsBox>
                    </>
                )}
            </Toolbar>

            <Menu
                anchorEl={languageMenuAnchor}
                open={Boolean(languageMenuAnchor)}
                onClose={handleLanguageMenuClose}
                sx={{ zIndex: 2000 }}
            >
                <LanguageMenuItem onClick={() => handleLanguageChange('en')}>
                    <Box display="flex" alignItems="center" gap={1}>
                        <ReactCountryFlag countryCode="GB" svg cdnUrl="/" />
                        {t('english')}
                    </Box>
                </LanguageMenuItem>
                <LanguageMenuItem onClick={() => handleLanguageChange('fi')}>
                    <Box display="flex" alignItems="center" gap={1}>
                        <ReactCountryFlag countryCode="FI" svg cdnUrl="/" />
                        {t('finnish')}
                    </Box>
                </LanguageMenuItem>
            </Menu>
        </AppBar>
    );
};

export default Header;

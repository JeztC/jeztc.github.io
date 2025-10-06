import { styled, Theme } from "@mui/material/styles";
import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import React from "react";
import { MouseEvent } from "react";
import {
    AccountCircle,
    School,
    GitHub,
    Link as LinkIcon,
    Menu as MenuIcon,
    Close,
    Folder, Work,
} from "@mui/icons-material";
import {
    Box,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Menu,
    MenuItem,
    Tab,
    Tabs,
    Tooltip, Typography,
    useMediaQuery, useTheme
} from "@mui/material";
import LanguageIcon from '@mui/icons-material/Language';
import { useTranslation } from 'react-i18next';
import { DarkModeToggle } from "./DarkModeToggle";
import ReactCountryFlag from "react-country-flag";

const HeaderWrapper = styled('header')(({ theme }: { theme: Theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '3px',
    minHeight: '70px',
    width: '100vw',
    maxWidth: '100vw',
    boxSizing: 'border-box',
    overflowX: 'auto',
    position: 'sticky',
    top: 0,
    zIndex: 1100,
    borderBottom: `1px solid ${theme.palette.divider}`,
    borderTop: `2px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.background.default,

    [theme.breakpoints.down('md')]: {
        display: 'block',
        justifyContent: 'initial',
        alignItems: 'initial',
        paddingTop: 0,
        minHeight: 'auto',
        overflowX: 'visible',
        position: 'static',
        borderBottom: 'none',
        borderTop: 'none',
        backgroundColor: 'transparent',
    },
}));


const LanguageMenuItem = styled(MenuItem)`
    width: 200px;
`;

const StyledHeader = styled(Typography)`
    font-size: 24px;
    font-weight: bold;
    letter-spacing: 2px;
    text-decoration: none;
    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
    padding-bottom: 15px;
`;

const StyledDrawer = styled(Box)(({ theme }) => ({
    flexShrink: 0,
    width: 250,
    height: '100vh',
    padding: 16,
    borderRight: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.background.default,
}));

const MobileListItemLink = styled(Link)`
    color: ${({ theme }) => theme.palette.text.primary};
`;

const TabsStyled = styled(Tabs)(({ theme }) => ({
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'flex',
    justifyContent: 'center',
    minHeight: '60px',
    '& .MuiTabs-indicator': {
        transition: 'none',
        backgroundColor: theme.palette.primary.main,
    },
}));

const StyledNavLink = styled(NavLink)`
    width: 134px;
    text-align: center;
    text-transform: none !important;
    background-color: ${({ theme }) => theme.palette.background.default} !important;
    border-top: ${({ theme }) => `1px solid ${theme.palette.divider}`} !important;
    border-left: ${({ theme }) => `1px solid ${theme.palette.divider}`} !important;
    border-right: ${({ theme }) => `1px solid ${theme.palette.divider}`} !important;
    border-bottom: none !important;

    &:not(:last-child) {
        border-right: ${({ theme }) => `1px solid ${theme.palette.divider}`} !important;
    }

    &:hover {
        background-color: ${({ theme }) => theme.palette.action.hover} !important;
    }

    &.active {
        background-color: ${({ theme }) => theme.palette.action.selected} !important;
        color: ${({ theme }) => theme.palette.text.primary} !important;
        border-bottom: ${({ theme }) => `2px solid ${theme.palette.primary.main}`} !important;
    }

    &:hover.active {
        border-bottom: ${({ theme }) => `2px solid ${theme.palette.primary.main}`} !important;
    }
`;

const Header = () => {
    const { t, i18n } = useTranslation();
    const location = useLocation();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
    const [languageMenuAnchor, setLanguageMenuAnchor] = useState<null | HTMLElement>(null);

    const menuItems = [
        { path: '/', label: t('menu_about'), icon: <AccountCircle fontSize={'medium'} /> },
        { path: '/education', label: t('menu_education'), icon: <School fontSize={'medium'} /> },
        { path: '/experience', label: t('menu_experience'), icon: <Work fontSize={'medium'} /> },
        { path: '/projects', label: t('menu_projects'), icon: <Folder fontSize={'medium'} /> },
        { path: '/github', label: 'GitHub', icon: <GitHub fontSize={'medium'} /> },
        { path: '/links', label: t('menu_links'), icon: <LinkIcon fontSize={'medium'} /> },
    ];

    const handleDrawerOpen = () => setIsDrawerOpen(true);

    const handleDrawerClose = () => setIsDrawerOpen(false);

    const handleLanguageMenuOpen = (event: MouseEvent<HTMLElement>) => setLanguageMenuAnchor(event.currentTarget);

    const handleLanguageMenuClose = () => setLanguageMenuAnchor(null);

    const handleLanguageChange = (language : string) => {
        i18n.changeLanguage(language);
        handleLanguageMenuClose();
    };

    return (
        <HeaderWrapper>
            {!isMobile && <StyledHeader>Portfolio</StyledHeader>}
            {isMobile ? (
                <>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                        <IconButton onClick={handleDrawerOpen} sx={{ mr: 2 }}>
                            {isDrawerOpen ? <Close fontSize="large" /> : <MenuIcon fontSize="large" />}
                        </IconButton>
                    </Box>
                    <Drawer anchor="left" open={isDrawerOpen} onClose={handleDrawerClose} >
                        <StyledDrawer>
                            <List>
                                {menuItems.map((item) => (
                                    <ListItem
                                        key={item.path}
                                        component={MobileListItemLink}
                                        to={item.path}
                                        onClick={handleDrawerClose}
                                        sx={{
                                            marginRight: 40,
                                            bgcolor: location.pathname === item.path ? theme.palette.action.selected : 'transparent',
                                        }}
                                    >
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            {item.icon}
                                            <ListItemText primary={item.label} />
                                        </Box>
                                    </ListItem>
                                ))}
                            </List>
                            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                                <DarkModeToggle />
                                <IconButton sx={{ color: theme.palette.text.primary }} onClick={handleLanguageMenuOpen}>
                                    <LanguageIcon fontSize="large" />
                                </IconButton>
                            </Box>
                        </StyledDrawer>
                    </Drawer>
                </>
            ) : (
                <TabsStyled
                    value={location.pathname}
                    variant="scrollable"
                    sx={{ borderColor: 'divider' }}
                >
                    {menuItems.map((item) => (
                        <Tab
                            key={item.path}
                            component={StyledNavLink}
                            to={item.path}
                            label={item.label}
                            icon={item.icon}
                            value={item.path}
                        />
                    ))}
                </TabsStyled>
            )}
            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', margin: '15px' }}>
                {!isMobile && (
                    <>
                        <DarkModeToggle />
                        <Tooltip
                            title={t('changeLanguage')}
                            arrow
                            slotProps={{
                                tooltip: {
                                    sx: {
                                        backgroundColor: '#1B1A1A',
                                        color: '#fff',
                                        backdropFilter: 'none',
                                        boxShadow: 'none' } },
                                arrow: { sx: { color: '#333' } },
                            }}
                        >
                            <IconButton sx={{ color: theme.palette.text.primary }} onClick={handleLanguageMenuOpen}>
                                <LanguageIcon />
                            </IconButton>
                        </Tooltip>
                    </>
                )}
                <Menu
                    anchorEl={languageMenuAnchor}
                    open={Boolean(languageMenuAnchor)}
                    onClose={handleLanguageMenuClose}
                >
                    <LanguageMenuItem onClick={() => handleLanguageChange('en')}>
                        <Box display="flex" alignItems="center" gap={1}>
                            <ReactCountryFlag countryCode="GB" svg style={{ width: '1.5em', height: '1em' }} />
                            {t('english')}
                        </Box>
                    </LanguageMenuItem>
                    <LanguageMenuItem onClick={() => handleLanguageChange('fi')}>
                        <Box display="flex" alignItems="center" gap={1}>
                            <ReactCountryFlag countryCode="FI" svg style={{ width: '1.5em', height: '1em' }} />
                            {t('finnish')}
                        </Box>
                    </LanguageMenuItem>
                </Menu>
            </Box>
        </HeaderWrapper>
    );
};

export default Header;
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import type { MouseEvent } from "react";
import {
    Menu as MenuIcon,
    Close,
} from "@mui/icons-material";
import {
    AppBar,
    Box,
    SwipeableDrawer,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Tab,
    Tabs,
    Toolbar,
    Tooltip,
    Typography,
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
    flex: 1,
    minHeight: 64,
    '& .MuiTabs-indicator': {
        height: 3,
        borderRadius: '3px 3px 0 0',
        backgroundColor: theme.palette.primary.main,
    },
    '& .MuiTab-root': {
        textTransform: 'none',
        minHeight: 64,
        fontWeight: 500,
        fontSize: '0.875rem',
        color: theme.palette.text.secondary,
        padding: '6px 20px',
        transition: 'color 0.2s ease, background-color 0.2s ease',
        '&:hover': {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.action.hover,
        },
        '&.Mui-selected': {
            color: theme.palette.primary.main,
            fontWeight: 600,
        },
    },
}));

const LanguageMenuItem = styled(MenuItem)`
    width: 200px;
`;

const StyledDrawerBox = styled(Box)(({ theme }) => ({
    width: 270,
    height: '100vh',
    padding: '16px 0',
    borderRight: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    flexDirection: 'column',
}));

const DrawerBrand = styled(Typography)(({ theme }) => ({
    fontWeight: 700,
    fontSize: '1.1rem',
    letterSpacing: '0.08em',
    padding: '8px 20px 16px',
    borderBottom: `1px solid ${theme.palette.divider}`,
    marginBottom: 8,
}));

const MobileNavItem = styled(ListItem)<{ component?: React.ElementType; to?: string }>(({ theme }) => ({
    borderRadius: 8,
    margin: '2px 8px',
    width: 'calc(100% - 16px)',
    transition: 'background-color 0.2s ease',
    '&:hover': {
        backgroundColor: theme.palette.action.hover,
    },
})) as typeof ListItem;

const ControlsBox = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
    flexShrink: 0,
    gap: 4,
}));

const Header = () => {
    const { t, i18n } = useTranslation();
    const location = useLocation();
    const isMobile = useMediaQuery('(max-width:960px)');
    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
    const [languageMenuAnchor, setLanguageMenuAnchor] = useState<null | HTMLElement>(null);

    const handleDrawerOpen = () => setIsDrawerOpen(true);
    const handleDrawerClose = () => setIsDrawerOpen(false);
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
                        <IconButton onClick={handleDrawerOpen} size="large">
                            {isDrawerOpen ? <Close /> : <MenuIcon />}
                        </IconButton>
                        <SwipeableDrawer
                            anchor="left"
                            open={isDrawerOpen}
                            onOpen={handleDrawerOpen}
                            onClose={handleDrawerClose}
                        >
                            <StyledDrawerBox>
                                <DrawerBrand>Portfolio</DrawerBrand>
                                <List sx={{ flex: 1, py: 0 }}>
                                    {routesConfig.map((item) => (
                                        <MobileNavItem
                                            key={item.path}
                                            component={Link}
                                            to={item.path}
                                            onClick={handleDrawerClose}
                                            sx={({ palette }) => ({
                                                bgcolor: location.pathname === item.path
                                                    ? palette.action.selected
                                                    : 'transparent',
                                                color: location.pathname === item.path
                                                    ? palette.primary.main
                                                    : palette.text.primary,
                                            })}
                                        >
                                            <ListItemIcon sx={{ minWidth: 36, color: 'inherit' }}>
                                                {item.icon}
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={t(item.labelKey)}
                                                slotProps={{ primary: { fontWeight: location.pathname === item.path ? 600 : 400 } }}
                                            />
                                        </MobileNavItem>
                                    ))}
                                </List>
                                <Box sx={{ display: 'flex', alignItems: 'center', px: 2, pt: 1, borderTop: 1, borderColor: 'divider' }}>
                                    <DarkModeToggle />
                                    <IconButton onClick={handleLanguageMenuOpen}>
                                        <LanguageIcon fontSize="large" />
                                    </IconButton>
                                </Box>
                            </StyledDrawerBox>
                        </SwipeableDrawer>
                    </>
                ) : (
                    <>
                        <BrandLink to="/">Portfolio</BrandLink>
                        <StyledTabs
                            value={location.pathname}
                            variant="scrollable"
                            scrollButtons="auto"
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
                        <ControlsBox>
                            <DarkModeToggle />
                            <Tooltip title={t('changeLanguage')} arrow>
                                <IconButton onClick={handleLanguageMenuOpen} sx={{ color: 'text.primary' }}>
                                    <LanguageIcon />
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

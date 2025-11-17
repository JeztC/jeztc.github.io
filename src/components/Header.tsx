import { styled } from "@mui/material/styles";
import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import type { MouseEvent } from "react";
import {
    Menu as MenuIcon,
    Close,
} from "@mui/icons-material";
import {
    Box,
    SwipeableDrawer,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Menu,
    MenuItem,
    Tab,
    Tabs,
    Tooltip, Typography,
    useMediaQuery,
} from "@mui/material";
import LanguageIcon from '@mui/icons-material/Language';
import { useTranslation } from 'react-i18next';
import { DarkModeToggle } from "./DarkModeToggle";
import ReactCountryFlag from "react-country-flag";
import { routesConfig } from "./AppRoutes";

const HeaderWrapper = styled(Box)(({ theme }) => ({
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

const StyledDrawerBox = styled(Box)(({ theme }) => ({
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

const StyledBox = styled(Box)(() => ({
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin: '15px',
}));

const FlexEndBox = styled(Box)(() => ({
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%',
}));

const CenteredBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(2),
}));

const GapBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
}));


const StyledNavLink = styled(NavLink)`
    width: 120.6px; /* 134px * 0.9 */
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
`

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

    const handleLanguageChange = (language : string) => {
        i18n.changeLanguage(language);
        handleLanguageMenuClose();
    };

    return (
        <HeaderWrapper>
            {!isMobile && <StyledHeader>Portfolio</StyledHeader>}
            {isMobile ? (
                <>
                    <FlexEndBox>
                        <IconButton onClick={handleDrawerOpen} sx={{ mr: 2 }}>
                            {isDrawerOpen ? <Close fontSize="large" /> : <MenuIcon fontSize="large" />}
                        </IconButton>
                    </FlexEndBox>
                    <SwipeableDrawer anchor="left" open={isDrawerOpen} onOpen={handleDrawerOpen} onClose={handleDrawerClose} >
                        <StyledDrawerBox>
                            <List>
                                {routesConfig.map((item) => (
                                    <ListItem
                                        key={item.path}
                                        component={MobileListItemLink}
                                        to={item.path}
                                        onClick={handleDrawerClose}
                                        sx={(theme) => ({
                                            marginRight: 40,
                                            bgcolor: location.pathname === item.path
                                                ? theme.palette.action.selected
                                                : 'transparent',
                                        })}
                                    >
                                        <GapBox>
                                            {item.icon}
                                            <ListItemText primary={t(item.labelKey)} />
                                        </GapBox>
                                    </ListItem>
                                ))}
                            </List>
                            <CenteredBox>
                                <DarkModeToggle />
                                <IconButton sx={(theme) => ({ color: theme.palette.text.primary })} onClick={handleLanguageMenuOpen}>
                                    <LanguageIcon fontSize="large" />
                                </IconButton>
                            </CenteredBox>
                        </StyledDrawerBox>
                    </SwipeableDrawer>
                </>
            ) : (
                <TabsStyled
                    value={location.pathname}
                    variant="scrollable"
                    sx={{ borderColor: 'divider' }}
                >
                    {routesConfig.map((item) => (
                        <Tab
                            key={item.path}
                            component={StyledNavLink}
                            to={item.path}
                            label={t(item.labelKey)}
                            icon={item.icon}
                            value={item.path}
                        />
                    ))}
                </TabsStyled>
            )}
            <StyledBox>
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
                            <IconButton
                                sx={(theme) => ({
                                    color: theme.palette.text.primary,
                                })}
                                onClick={handleLanguageMenuOpen}
                            >
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
                            <ReactCountryFlag
                                countryCode="GB"
                                svg
                                cdnUrl="/"
                            />
                            {t('english')}
                        </Box>
                    </LanguageMenuItem>
                    <LanguageMenuItem onClick={() => handleLanguageChange('fi')}>
                        <Box display="flex" alignItems="center" gap={1}>
                            <ReactCountryFlag
                                countryCode="FI"
                                svg
                                cdnUrl="/"
                            />
                            {t('finnish')}
                        </Box>
                    </LanguageMenuItem>
                </Menu>
            </StyledBox>
        </HeaderWrapper>
    );
};

export default Header;
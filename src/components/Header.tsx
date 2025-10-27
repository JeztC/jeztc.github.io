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
import { StyledListItemProps } from "../interfaces/styledListItemProps";

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
    borderColor: 'divider',
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

const StyledListItem = styled(ListItem, {
    shouldForwardProp: (prop) => prop !== 'isActive',
})<StyledListItemProps>(({ theme, isActive }) => ({
    marginRight: 40,
    backgroundColor: isActive ? theme.palette.action.selected : 'transparent',
}));

const DrawerToggleButton = styled(IconButton)(({ theme }) => ({
    marginRight: theme.spacing(2),
}));

const FlexBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
    color: theme.palette.text.primary,
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
                        <DrawerToggleButton onClick={handleDrawerOpen}>
                            {isDrawerOpen ? <Close fontSize="large" /> : <MenuIcon fontSize="large" />}
                        </DrawerToggleButton>
                    </FlexEndBox>
                    <SwipeableDrawer anchor="left" open={isDrawerOpen} onOpen={handleDrawerOpen} onClose={handleDrawerClose} >
                        <StyledDrawerBox>
                            <List>
                                {routesConfig.map((item) => (
                                    <StyledListItem
                                        key={item.path}
                                        component={MobileListItemLink}
                                        to={item.path}
                                        onClick={handleDrawerClose}
                                        isActive={location.pathname === item.path}
                                    >
                                        <GapBox>
                                            {item.icon}
                                            <ListItemText primary={t(item.labelKey)} />
                                        </GapBox>
                                    </StyledListItem>
                                ))}
                            </List>
                            <CenteredBox>
                                <DarkModeToggle />
                                <StyledIconButton onClick={handleLanguageMenuOpen}>
                                    <LanguageIcon fontSize="large" />
                                </StyledIconButton>
                            </CenteredBox>
                        </StyledDrawerBox>
                    </SwipeableDrawer>
                </>
            ) : (
                <TabsStyled
                    value={location.pathname}
                    variant="scrollable"
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
                        >
                            <StyledIconButton
                                onClick={handleLanguageMenuOpen}
                            >
                                <LanguageIcon />
                            </StyledIconButton>
                        </Tooltip>
                    </>
                )}
                <Menu
                    anchorEl={languageMenuAnchor}
                    open={Boolean(languageMenuAnchor)}
                    onClose={handleLanguageMenuClose}
                >
                    <LanguageMenuItem onClick={() => handleLanguageChange('en')}>
                        <FlexBox>
                            <ReactCountryFlag countryCode="GB" svg />
                            {t('english')}
                        </FlexBox>
                    </LanguageMenuItem>
                    <LanguageMenuItem onClick={() => handleLanguageChange('fi')}>
                        <FlexBox>
                            <ReactCountryFlag countryCode="FI" svg />
                            {t('finnish')}
                        </FlexBox>
                    </LanguageMenuItem>
                </Menu>
            </StyledBox>
        </HeaderWrapper>
    );
};

export default Header;
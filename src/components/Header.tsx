import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { styled } from "@mui/material/styles";
import { ChangeEvent, useState, MouseEvent } from "react";
import { Link, useLocation } from "react-router-dom";
import React from "react";
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
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Tooltip, Typography,
    useMediaQuery, useTheme
} from "@mui/material";
import LanguageIcon from '@mui/icons-material/Language';
import { useTranslation } from 'react-i18next';
import i18n from "i18next";
import { DarkModeToggle } from "../themes/DarkModeToggle";
import ReactCountryFlag from "react-country-flag";

const HeaderWrapper = styled('header')(({ theme }) => ({
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: theme.spacing(0, 2),
    height: '58px',
    width: '100vw',
    maxWidth: '100vw',
    boxSizing: 'border-box',
    overflowX: 'hidden',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    borderBottom: '1px solid rgb(62, 65, 68)',
    backgroundColor: theme.palette.background.default,
    [theme.breakpoints.down('md')]: {
        padding: theme.spacing(0, 1),
    },
}));

const BottomNavigationStyled = styled(BottomNavigation)`
    margin-left: auto;
    margin-right: auto;
    display: flex;
    justify-content: center;
`

const StyledLink = styled(Link)`
    width: 134px;
    border: 1px solid rgb(62, 65, 68) !important;
    border-bottom: none !important;
    border-bottom: ${({ theme }) => `2px solid ${theme.palette.primary.main}`};

    &:not(:last-child) {
        border-right: none !important;
    }

    &.Mui-selected {
        color: ${({ theme }) => theme.palette.text.primary} !important;
        border-bottom: ${({ theme }) => `2px solid ${theme.palette.primary.main} !important`};
    }

    &:hover {
        background-color: ${({ theme }) => theme.palette.action.hover} !important;
    }
`

const LanguageMenuItem = styled(MenuItem)`
    width: 200px;
`;

const StyledHeader = styled(Typography)`
    font-size: 24px;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 2px;
    margin: 0;
    text-decoration: none;
    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
    padding-bottom: 15px;
`;

const StyledDrawer = styled(Box)(({ theme }) => ({
    flexShrink: 0,
    width: 250,
    height: 1000,
    padding: 16,
    backgroundColor: theme.palette.background.default,
}));

const MobileListItemLink = styled(Link)`
    color: ${({ theme }) => theme.palette.text.primary};
`;


const Header = () => {
    const [, setValue] = useState<string>('/')
    const [languageMenuAnchor, setLanguageMenuAnchor] = useState<null | HTMLElement>(null);
    const { t } = useTranslation();
    const location = useLocation()
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const tabOpened = location?.pathname?.slice(1) || '/';
    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

    const handleDrawerOpen = () => {
        setIsDrawerOpen(true);
    };

    const handleDrawerClose = () => {
        setIsDrawerOpen(false);
    };

    const handleChange = (_event: ChangeEvent<object>, newValue: string) => {
        setValue(newValue);
    }

    const handleLanguageMenuOpen = (event: MouseEvent<HTMLElement>) => {
        setLanguageMenuAnchor(event.currentTarget);
    };

    const handleLanguageMenuClose = () => {
        setLanguageMenuAnchor(null);
    };

    const handleLanguageChange = (language: string)  => {
        i18n.changeLanguage(language)
        handleLanguageMenuClose();
    };

    return (
        <HeaderWrapper>
            {!isMobile && <StyledHeader>Portfolio</StyledHeader>}
            {isMobile ?
                <>
                    <IconButton onClick={handleDrawerOpen} style={{ marginRight: '10px' }}>
                        {isDrawerOpen ? <Close style={{ fontSize: '37px' }} /> : <MenuIcon style={{ fontSize: '37px' }} />}
                    </IconButton>
                    <Drawer
                        anchor="left"
                        open={isDrawerOpen}
                        onClose={handleDrawerClose}
                    >
                        <StyledDrawer>
                            <List>
                                <ListItem component={MobileListItemLink} to="/" onClick={handleDrawerClose}>
                                    <ListItemIcon><AccountCircle /></ListItemIcon>
                                    <ListItemText primary={t('menu_about')} />
                                </ListItem>
                                <ListItem component={MobileListItemLink} to="/education" onClick={handleDrawerClose}>
                                    <ListItemIcon><School /></ListItemIcon>
                                    <ListItemText primary={t('menu_education')} />
                                </ListItem>
                                <ListItem component={MobileListItemLink} to="/experience" onClick={handleDrawerClose}>
                                    <ListItemIcon><Work /></ListItemIcon>
                                    <ListItemText primary={t('menu_experience')} />
                                </ListItem>
                                <ListItem component={MobileListItemLink} to="/projects" onClick={handleDrawerClose}>
                                    <ListItemIcon><Folder /></ListItemIcon>
                                    <ListItemText primary={t('menu_projects')} />
                                </ListItem>
                                <ListItem component={MobileListItemLink} to="/github" onClick={handleDrawerClose}>
                                    <ListItemIcon><GitHub /></ListItemIcon>
                                    <ListItemText primary={"Github"} />
                                </ListItem>
                                <ListItem component={MobileListItemLink} to="/links" onClick={handleDrawerClose}>
                                    <ListItemIcon><LinkIcon /></ListItemIcon>
                                    <ListItemText primary={t('menu_links')} />
                                </ListItem>
                            </List>
                            <Box style={{ display: 'flex', justifyContent: 'center' }}>
                                <DarkModeToggle/>
                                <IconButton color="secondary" onClick={handleLanguageMenuOpen} style={{ marginBottom : '10px' }}>
                                    <LanguageIcon style={{ fontSize: '37px' }}/>
                                </IconButton>
                                <Menu
                                    anchorEl={languageMenuAnchor}
                                    keepMounted
                                    open={Boolean(languageMenuAnchor)}
                                    onClose={handleLanguageMenuClose}
                                >
                                    <LanguageMenuItem onClick={() => handleLanguageChange('fi')}>
                                        <Box display="flex" alignItems="center" gap={1}>
                                            <ReactCountryFlag
                                                countryCode="FI"
                                                svg
                                                style={{
                                                    width: '1.5em',
                                                    height: '1em',
                                                }}
                                                title="Finnish"
                                            />
                                            {t('finnish')}
                                        </Box>
                                    </LanguageMenuItem>
                                    <LanguageMenuItem onClick={() => handleLanguageChange('en')}>
                                        <Box display="flex" alignItems="center" gap={1}>
                                            <ReactCountryFlag
                                                countryCode="GB"
                                                svg
                                                style={{
                                                    width: '1.5em',
                                                    height: '1em',
                                                }}
                                                title="English"
                                            />
                                            {t('english')}
                                        </Box>
                                    </LanguageMenuItem>
                                </Menu>
                            </Box>
                        </StyledDrawer>
                    </Drawer>
                </>
                : <BottomNavigationStyled
                    value={tabOpened}
                    onChange={handleChange}
                    showLabels
                >
                    <BottomNavigationAction
                        component={StyledLink}
                        to="/"
                        label={t('menu_about')}
                        value="/"
                        id='/'
                        icon={<AccountCircle />}
                    />
                    <BottomNavigationAction
                        component={StyledLink}
                        to="/education"
                        value="education"
                        id='education'
                        label={t('menu_education')}
                        icon={<School />}
                    />
                    <BottomNavigationAction
                        component={StyledLink}
                        to="/experience"
                        value="experience"
                        id='experience'
                        label={t('menu_experience')}
                        icon={<Work />}
                    />
                    <BottomNavigationAction
                        component={StyledLink}
                        to="/projects"
                        value="projects"
                        id='projects'
                        label={t('menu_projects')}
                        icon={<Folder/>}
                    />
                    <BottomNavigationAction
                        component={StyledLink}
                        to="/github"
                        value="github"
                        id='github'
                        label={'GitHub'}
                        icon={<GitHub />}
                    />
                    <BottomNavigationAction
                        component={StyledLink}
                        to="/links"
                        value="links"
                        id='links'
                        label={t('menu_links')}
                        icon={<LinkIcon />}
                    />
                </BottomNavigationStyled>}
            {!isMobile ?
                <Box display="flex" justifyContent="center">
                    <DarkModeToggle />

                    <Tooltip
                        title={t('changeLanguage')}
                        arrow
                        slotProps={{
                            tooltip: {
                                sx: {
                                    backgroundColor: '#333',
                                    color: '#fff',
                                },
                            },
                            arrow: {
                                sx: {
                                    color: '#333',
                                },
                            },
                        }}
                    >
                        <IconButton onClick={handleLanguageMenuOpen} style={{ marginBottom: '10px' }}>
                            <LanguageIcon />
                        </IconButton>
                    </Tooltip>

                    <Menu
                        anchorEl={languageMenuAnchor}
                        keepMounted
                        open={Boolean(languageMenuAnchor)}
                        onClose={handleLanguageMenuClose}
                    >
                        <LanguageMenuItem onClick={() => handleLanguageChange('fi')}>
                            <Box display="flex" alignItems="center" gap={1}>
                                <ReactCountryFlag
                                    countryCode="FI"
                                    svg
                                    style={{ width: '1.5em', height: '1em' }}
                                    title="Finnish"
                                />
                                {t('finnish')}
                            </Box>
                        </LanguageMenuItem>
                        <LanguageMenuItem onClick={() => handleLanguageChange('en')}>
                            <Box display="flex" alignItems="center" gap={1}>
                                <ReactCountryFlag
                                    countryCode="GB"
                                    svg
                                    style={{ width: '1.5em', height: '1em' }}
                                    title="English"
                                />
                                {t('english')}
                            </Box>
                        </LanguageMenuItem>
                    </Menu>
                </Box> : <Box/>}
        </HeaderWrapper>
    );
}

export default Header;
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { styled } from "@mui/material/styles";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
    AccountCircle,
    School,
    ContactMail,
    GitHub,
    Link as LinkIcon,
    Menu as MenuIcon,
    Close,
    Folder, Work
} from "@mui/icons-material";
import { Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import LanguageIcon from '@mui/icons-material/Language';
import { useTranslation } from 'react-i18next';
import i18n from "i18next";
import { DarkModeToggle } from "../themes/DarkModeToggle";
import { isMobile } from "react-device-detect";

const HeaderWrapper = styled('header')`
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
    padding: 0 16px;
    height: 58px;
    width: 100%;
    position: sticky;
    top: 0;
    z-index: 1000;
    background-color: ${({ theme }) => theme.palette.mode === 'light' ? '#fff' : '#000'};
    border-bottom: 1px solid rgb(62, 65, 68);
    color: #fff;
`;

const StyledLink = styled(Link)`
    width: 150px;
    border: 1px solid rgb(62, 65, 68) !important;
    border-bottom: none !important;
    background-color: ${({ theme }) => theme.palette.mode === 'light' ? '#fff' : '#000'};
    border-bottom: 2px solid #90caf9;
    
    &.Mui-selected {
        background-color: ${({ theme }) => theme.palette.mode === 'light' ? '#fff' : 'inherit'} !important;
        color: ${({ theme }) => theme.palette.mode === 'light' ? '#000' : '#fff'} !important;
        border-bottom: 2px solid #90caf9 !important;
    }

    &:hover {
        background-color: ${({ theme }) => theme.palette.mode === 'light' ? '#EAEDF1' : '#181919'} !important;
    }
`

const LanguageMenuItem = styled(MenuItem)`
    width: 200px;
`;

const StyledHeader = styled(Link)`
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
    color: ${({ theme }) => theme.palette.mode === 'light' ? '#000' : '#fff'};
`;

const StyledDrawer = styled('div')`
    flex-shrink: 0;
    width: 250px;
    height: 1000px;
    padding: 16px;
    background-color: ${({ theme }) => theme.palette.mode === 'light' ? '#fff' : '#000'};
`;

const Header = () => {
    const [, setValue] = React.useState<string>('about')
    const [languageMenuAnchor, setLanguageMenuAnchor] = React.useState<null | HTMLElement>(null);
    const { t } = useTranslation();
    const location = useLocation()
    const tabOpened = location === null ? 'about' : location.pathname.replace('/', '')
    const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setIsDrawerOpen(true);
    };

    const handleDrawerClose = () => {
        setIsDrawerOpen(false);
    };

    const handleChange = (event: React.ChangeEvent<object>, newValue: string) => {
        setValue(newValue);
    }

    const handleLanguageMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
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
            <StyledHeader to="/about">Jesse Lågland Portfolio</StyledHeader>
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
                            <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                                <List>
                                    <ListItem component={Link} to="/about" onClick={handleDrawerClose}>
                                        <ListItemIcon><AccountCircle /></ListItemIcon>
                                        <ListItemText primary={t('menu_about')} />
                                    </ListItem>
                                    <ListItem component={Link} to="/education" onClick={handleDrawerClose}>
                                        <ListItemIcon><School /></ListItemIcon>
                                        <ListItemText primary={t('menu_education')} />
                                    </ListItem>
                                    <ListItem component={Link} to="/experience" onClick={handleDrawerClose}>
                                        <ListItemIcon><Work /></ListItemIcon>
                                        <ListItemText primary={t('menu_experience')} />
                                    </ListItem>
                                    <ListItem component={Link} to="/projects" onClick={handleDrawerClose}>
                                        <ListItemIcon><Folder /></ListItemIcon>
                                        <ListItemText primary={"Projects"} />
                                    </ListItem>
                                    <ListItem component={Link} to="/github" onClick={handleDrawerClose}>
                                        <ListItemIcon><GitHub /></ListItemIcon>
                                        <ListItemText primary={"Github"} />
                                    </ListItem>
                                    <ListItem component={Link} to="/contact" onClick={handleDrawerClose}>
                                        <ListItemIcon><ContactMail /></ListItemIcon>
                                        <ListItemText primary={t('menu_contact')} />
                                    </ListItem>
                                    <ListItem component={Link} to="/links" onClick={handleDrawerClose}>
                                        <ListItemIcon><LinkIcon /></ListItemIcon>
                                        <ListItemText primary={t('menu_links')} />
                                    </ListItem>
                                </List>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
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
                                    <LanguageMenuItem onClick={() => handleLanguageChange('fi')}>🇫🇮  Finnish</LanguageMenuItem>
                                    <LanguageMenuItem onClick={() => handleLanguageChange('en')}>🇬🇧  English</LanguageMenuItem>
                                </Menu>
                            </div>
                        </StyledDrawer>
                    </Drawer>
                </>
                : <BottomNavigation
                    value={tabOpened}
                    onChange={handleChange}
                    showLabels
                    style={{ marginLeft: 'auto', marginRight: 'auto', display: 'flex', justifyContent: 'center' }}
                >
                    <BottomNavigationAction
                        component={StyledLink}
                        to="/about"
                        label={t('menu_about')}
                        value="about"
                        id='about'
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
                </BottomNavigation>}
            {!isMobile ?
                <div>
                    <DarkModeToggle/>
                    <IconButton color="secondary" onClick={handleLanguageMenuOpen} style={{ marginBottom : '10px' }}>
                        <LanguageIcon />
                    </IconButton>
                    <Menu
                        anchorEl={languageMenuAnchor}
                        keepMounted
                        open={Boolean(languageMenuAnchor)}
                        onClose={handleLanguageMenuClose}
                    >
                        <LanguageMenuItem onClick={() => handleLanguageChange('fi')}>🇫🇮  Finnish</LanguageMenuItem>
                        <LanguageMenuItem onClick={() => handleLanguageChange('en')}>🇬🇧  English</LanguageMenuItem>
                    </Menu>
                </div> : <div/>}
        </HeaderWrapper>
    );
}

export default Header;
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { styled } from "@mui/material/styles";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
    AccountCircle,
    School,
    GitHub,
    Link as LinkIcon,
    Menu as MenuIcon,
    Close,
    Folder, Work
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
    useMediaQuery, useTheme
} from "@mui/material";
import LanguageIcon from '@mui/icons-material/Language';
import { useTranslation } from 'react-i18next';
import i18n from "i18next";
import { DarkModeToggle } from "../themes/DarkModeToggle";
import Flag from 'react-world-flags';

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
    backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#000',
    borderBottom: '1px solid rgb(62, 65, 68)',
    color: '#fff',
    [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(0, 1), // Adjust padding for mobile (8px)
    },
}));

const BottomNavigationStyled = styled(BottomNavigation)`
    margin-left: auto;
    margin-right: auto;
    display: flex;
    justify-content: center;
`

const StyledLink = styled(Link)`
    width: 150px;
    border: 1px solid rgb(62, 65, 68) !important;
    border-bottom: none !important;
    background-color: ${({ theme }) => theme.palette.mode === 'light' ? '#fff' : '#000'};
    border-bottom: 2px solid #308fe8;
    
    &.Mui-selected {
        background-color: ${({ theme }) => theme.palette.mode === 'light' ? '#fff' : 'inherit'} !important;
        color: ${({ theme }) => theme.palette.mode === 'light' ? '#000' : '#fff'} !important;
        border-bottom: 2px solid #308fe8 !important;
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
    const [, setValue] = React.useState<string>('/')
    const [languageMenuAnchor, setLanguageMenuAnchor] = React.useState<null | HTMLElement>(null);
    const { t } = useTranslation();
    const location = useLocation()
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const tabOpened = location?.pathname?.slice(1) || '/';
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
            {!isMobile && <StyledHeader to="/">Portfolio</StyledHeader>}
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
                                    <ListItem component={Link} to="/" onClick={handleDrawerClose}>
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
                                    <LanguageMenuItem onClick={() => handleLanguageChange('fi')}>
                                        <Box display="flex" alignItems="center" gap={1}>
                                            <Flag code="FI" style={{ width: 24, height: 16 }} />
                                            {t('finnish')}
                                        </Box>
                                    </LanguageMenuItem>
                                    <LanguageMenuItem onClick={() => handleLanguageChange('en')}>
                                        <Box display="flex" alignItems="center" gap={1}>
                                            <Flag code="GB" style={{ width: 24, height: 16 }} />
                                            {t('english')}
                                        </Box>
                                    </LanguageMenuItem>
                                </Menu>
                            </div>
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
                        <LanguageMenuItem onClick={() => handleLanguageChange('fi')}>
                            <Box display="flex" alignItems="center" gap={1}>
                                <Flag code="FI" style={{ width: 24, height: 16 }} />
                                {t('finnish')}
                            </Box>
                        </LanguageMenuItem>
                        <LanguageMenuItem onClick={() => handleLanguageChange('en')}>
                            <Box display="flex" alignItems="center" gap={1}>
                                <Flag code="GB" style={{ width: 24, height: 16 }} />
                                {t('english')}
                            </Box>
                        </LanguageMenuItem>
                    </Menu>
                </div> : <div/>}
        </HeaderWrapper>
    );
}

export default Header;
import {
    BottomNavigation,
    BottomNavigationAction,
    Box,
    IconButton,
    Tooltip,
    useMediaQuery,
    type IconButtonProps,
} from "@mui/material";
import { Email, GitHub, LinkedIn } from "@mui/icons-material";
import { styled, useTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import { routesConfig } from "./AppRoutes";

const FOOTER_HEIGHT = 64;

const FooterBar = styled('footer')(({ theme }) => ({
    position: 'fixed',
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1100,
    minHeight: FOOTER_HEIGHT,
    padding: theme.spacing(1.5, 3),
    borderTop: `1px solid ${theme.palette.divider}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.spacing(2),
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    backgroundColor: theme.palette.mode === 'dark'
        ? 'rgba(0,0,0,0.82)'
        : 'rgba(255,255,255,0.82)',
    [theme.breakpoints.down('md')]: {
        padding: 0,
    },
}));

const IconRow = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(0.75),
}));

const SocialButton = styled(IconButton)<IconButtonProps<'a'> & { }>(({ theme }) => ({
    width: 44,
    height: 44,
    color: theme.palette.text.secondary,
    transition: 'color 0.2s ease, background-color 0.2s ease, transform 0.2s ease',
    '& svg': {
        fontSize: 26,
    },
    '&:hover': {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.action.hover,
        transform: 'translateY(-2px)',
    },
}));

const MobileNav = styled(BottomNavigation)(({ theme }) => {
    // Windows 11 taskbar-style highlight: white in dark mode, black in light mode.
    const highlight = theme.palette.mode === 'dark' ? '#ffffff' : '#000000';
    return {
        width: '100%',
        height: FOOTER_HEIGHT,
        gap: theme.spacing(4),
        padding: theme.spacing(0, 1.5),
        backgroundColor: 'transparent',
        '& .MuiBottomNavigationAction-root': {
            position: 'relative',
            minWidth: 0,
            padding: theme.spacing(0.5, 0.25),
            color: theme.palette.text.secondary,
            transition: 'color 0.2s ease',
            // Windows 11-style pill indicator centered below the icon/label.
            '&::after': {
                content: '""',
                position: 'absolute',
                bottom: 4,
                left: '50%',
                width: 18,
                height: 3,
                borderRadius: 3,
                backgroundColor: theme.palette.primary.main,
                transform: 'translateX(-50%) scaleX(0)',
                transformOrigin: 'center',
                transition: 'transform 0.2s ease',
            },
        },
        '& .MuiBottomNavigationAction-root.Mui-selected': {
            color: highlight,
            '&::after': {
                transform: 'translateX(-50%) scaleX(1)',
            },
        },
        '& .MuiBottomNavigationAction-label': {
            fontSize: '0.65rem',
            '&.Mui-selected': {
                fontSize: '0.7rem',
            },
        },
    };
});

const Footer = () => {
    const { t } = useTranslation();
    const theme = useTheme();
    const location = useLocation();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const email = import.meta.env.VITE_USER_EMAIL as string;
    const githubUrl = import.meta.env.VITE_USER_URL as string;
    const linkedinUrl = import.meta.env.VITE_LINKEDIN_URL as string;

    if (isMobile) {
        return (
            <FooterBar>
                <MobileNav value={location.pathname} showLabels>
                    {routesConfig.map((item) => (
                        <BottomNavigationAction
                            key={item.path}
                            component={Link}
                            to={item.path}
                            value={item.path}
                            label={t(item.labelKey)}
                            icon={item.icon}
                        />
                    ))}
                </MobileNav>
            </FooterBar>
        );
    }

    return (
        <FooterBar>
            <IconRow>
                <Tooltip title="GitHub" arrow>
                    <SocialButton
                        component="a"
                        href={githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                    >
                        <GitHub />
                    </SocialButton>
                </Tooltip>
                <Tooltip title="LinkedIn" arrow>
                    <SocialButton
                        component="a"
                        href={linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                    >
                        <LinkedIn />
                    </SocialButton>
                </Tooltip>
                <Tooltip title={t('links_email')} arrow>
                    <SocialButton
                        component="a"
                        href={`mailto:${email}`}
                        aria-label="Email"
                    >
                        <Email />
                    </SocialButton>
                </Tooltip>
            </IconRow>
        </FooterBar>
    );
};

export { FOOTER_HEIGHT };
export default Footer;

import { Box, IconButton, Tooltip, type IconButtonProps } from "@mui/material";
import { Email, GitHub, LinkedIn } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";

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
    [theme.breakpoints.down('sm')]: {
        flexDirection: 'row',
        padding: theme.spacing(1, 2),
    },
}));

const IconRow = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(0.75),
}));

const SocialButton = styled(IconButton)<IconButtonProps<'a'> & { brandcolor: string }>(({ theme, brandcolor }) => ({
    width: 44,
    height: 44,
    color: theme.palette.text.secondary,
    transition: 'color 0.2s ease, background-color 0.2s ease, transform 0.2s ease',
    '& svg': {
        fontSize: 26,
    },
    '&:hover': {
        color: brandcolor,
        backgroundColor: `${brandcolor}1f`,
        transform: 'translateY(-2px)',
    },
}));

const Footer = () => {
    const { t } = useTranslation();
    const email = import.meta.env.VITE_USER_EMAIL as string;
    const githubUrl = import.meta.env.VITE_USER_URL as string;
    const linkedinUrl = import.meta.env.VITE_LINKEDIN_URL as string;

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
                        brandcolor="#e6edf3"
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
                        brandcolor="#0A66C2"
                    >
                        <LinkedIn />
                    </SocialButton>
                </Tooltip>
                <Tooltip title={t('links_email')} arrow>
                    <SocialButton
                        component="a"
                        href={`mailto:${email}`}
                        aria-label="Email"
                        brandcolor="#308fe8"
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
import { Email, GitHub, LinkedIn } from "@mui/icons-material";
import { styled, useTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import { Box, Paper, Typography } from "@mui/material";
import type { ReactNode } from "react";

interface LinkItem {
    label: string;
    sublabel: string;
    icon: ReactNode;
    href: string;
    color: string;
}

const PageWrapper = styled(Box)(() => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 'calc(100vh - 64px)',
    padding: '32px 16px',
}));

const CardsRow = styled(Box)(({ theme }) => ({
    display: 'flex',
    gap: 24,
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 32,
    [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        alignItems: 'center',
        gap: 16,
    },
}));

const LinkCard = styled(Paper)<{ brandcolor: string }>(({ theme, brandcolor }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    height: 200,
    borderRadius: 20,
    border: `1px solid ${theme.palette.divider}`,
    textDecoration: 'none',
    cursor: 'pointer',
    gap: 12,
    padding: 24,
    boxShadow: 'none',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease, background-color 0.25s ease',
    [theme.breakpoints.down('sm')]: {
        width: '100%',
        maxWidth: 340,
        height: 'auto',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        gap: 16,
        padding: '16px 20px',
    },
    '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: `0 8px 24px ${brandcolor}30`,
        borderColor: `${brandcolor}80`,
    },
}));

const IconCircle = styled(Box)<{ brandcolor: string }>(({ brandcolor }) => ({
    width: 56,
    height: 56,
    borderRadius: '50%',
    backgroundColor: `${brandcolor}18`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    '& svg': {
        fontSize: 26,
        color: brandcolor,
    },
}));

const Links = () => {
    const { t } = useTranslation();
    const theme = useTheme();
    const githubColor = theme.palette.mode === 'dark' ? '#e6edf3' : '#24292e';

    const linksData: LinkItem[] = [
        {
            label: 'GitHub',
            sublabel: '@JeztC',
            icon: <GitHub />,
            href: import.meta.env.VITE_USER_URL,
            color: githubColor,
        },
        {
            label: t('links_email'),
            sublabel: import.meta.env.VITE_USER_EMAIL,
            icon: <Email />,
            href: `mailto:${import.meta.env.VITE_USER_EMAIL}`,
            color: '#308fe8',
        },
        {
            label: 'LinkedIn',
            sublabel: 'jesse-l-3213a0347',
            icon: <LinkedIn />,
            href: import.meta.env.VITE_LINKEDIN_URL,
            color: '#0A66C2',
        },
    ];

    return (
        <PageWrapper>
            <Typography variant="h4" fontWeight={700} letterSpacing={1}>
                {t('links_title')}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                {t('links_subtitle')}
            </Typography>

            <CardsRow>
                {linksData.map((link) => (
                    <LinkCard
                        key={link.label}
                        component="a"
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        brandcolor={link.color}
                    >
                        <IconCircle brandcolor={link.color}>
                            {link.icon}
                        </IconCircle>
                        <Box sx={{ textAlign: { xs: 'left', sm: 'center' }, minWidth: 0 }}>
                            <Typography variant="body1" fontWeight={700} lineHeight={1.2}>
                                {link.label}
                            </Typography>
                            <Typography
                                variant="caption"
                                color="text.secondary"
                                sx={{ display: 'block', mt: 0.5, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: { xs: 220, sm: 140 } }}
                            >
                                {link.sublabel}
                            </Typography>
                        </Box>
                    </LinkCard>
                ))}
            </CardsRow>
        </PageWrapper>
    );
};

export default Links;

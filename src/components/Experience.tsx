import React from 'react';
import { Box, Avatar, Typography, Link } from '@mui/material';
import { useTranslation } from "react-i18next";
import { styled } from "@mui/material/styles";
import { jobs } from "../data";

export type Job = {
    company: string;
    duration: string;
    logo: string;
    link: string;
};

const Container = styled('div')`
    display: flex;
    flex-direction: column;
    margin-top: 32px;
    gap: 3;
    width: 100%;
    max-width: 600px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
        transform: translateY(-10px);
        box-shadow: 0 12px 24px ${({ theme }) => theme.palette.mode === 'light' ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.12)'};
    }

    @media (max-width: 600px) {
        margin-top: 16px;
        gap: 2;
    }
`;

const Experience = () => {
    const { t } = useTranslation();
    return (
        <Box
            sx={{
                p: { xs: 2, sm: 4 },
                maxWidth: '100%',
                width: '100%',
                display: 'flex', // Add flexbox to center content
                flexDirection: 'column',
                alignItems: 'center', // Center horizontally
                minHeight: '100vh', // Optional: ensures content is vertically centered if needed
            }}
        >
            <Typography variant="h4" component="h1" gutterBottom>
                {t('menu_experience')}
            </Typography>
            <Container>
                {jobs.map((job, index) => (
                    <Link
                        key={index}
                        href={job.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        underline="none"
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            p: { xs: 1.5, sm: 2 },
                            borderRadius: 3,
                            border: theme => `1px solid ${theme.palette.divider}`,
                            transition: 'box-shadow 0.2s',
                            '&:hover': { boxShadow: 6 },
                        }}
                    >
                        <Avatar
                            src={job.logo}
                            alt={`${job.company} logo`}
                            sx={{
                                width: { xs: 100, sm: 200, md: 400 },
                                height: { xs: 50, sm: 75, md: 150 },
                                mr: { xs: 1.5, sm: 2.5 },
                                borderRadius: 2,
                                bgcolor: '#f5f5f5',
                            }}
                            variant="rounded"
                        />
                        <Box>
                            <Typography variant="subtitle1" fontWeight="bold">
                                {job.company}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                                {t(`job_${index}_duration`)}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, fontWeight: 'bold' }}>
                                {t(`experience_${index}_job`)}
                            </Typography>
                        </Box>
                    </Link>
                ))}
            </Container>
        </Box>
    );
}

export default Experience;
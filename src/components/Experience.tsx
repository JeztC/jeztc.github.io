import React from 'react';
import { Box, Card, Avatar, Typography, Link } from '@mui/material';
// @ts-ignore
import AvatarImg from '../assets/pictures/vitec.png';
import {useTranslation} from "react-i18next";
import { styled } from "@mui/material/styles";
import {jobs} from "../data";

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
    width : 600px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
        transform: translateY(-10px);
        box-shadow: 0 12px 24px ${({ theme }) => theme.palette.mode === 'light' ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.12)'};
    }
`;

const Experience = () => {
    const { t } = useTranslation();
    return (
        <Box sx={{p: 4, maxWidth: 600, mx: 'auto'}}>
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
                        underline="none" // disables underline
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            p: 2,
                            borderRadius: 3,
                            border: theme => `1px solid ${theme.palette.divider}`,
                            transition: 'box-shadow 0.2s',
                            '&:hover': {boxShadow: 6},
                        }}
                    >
                        <Avatar
                            src={job.logo}
                            alt={`${job.company} logo`}
                            sx={{
                                width: 400,
                                height: 150,
                                mr: 2.5,
                                borderRadius: 2,
                                bgcolor: '#f5f5f5',
                            }}
                            variant="rounded"
                        />
                        <Box>
                            <Typography variant="subtitle1" fontWeight="bold">
                                {job.company}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{mt: 0.5}}>
                                {job.duration}
                            </Typography>
                        </Box>
                    </Link>
                ))}
            </Container>
        </Box>
    );
}

export default Experience;
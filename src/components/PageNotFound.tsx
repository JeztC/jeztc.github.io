import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
// @ts-expect-error TypeScript cannot resolve PNG imports
import Image from '../assets/pictures/notfound.png';
import { useTranslation } from 'react-i18next';

const CenteredContainer = styled(Box)({
    minHeight: '60vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
});

const PageNotFound = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <CenteredContainer>
            <Typography variant="h5" gutterBottom>
                {t('pageNotFound')}
            </Typography>
            <img src={Image} alt="Page Not Found" />
            <Button variant="contained" onClick={() => navigate('/')}>
                {t('returnHome')}
            </Button>
        </CenteredContainer>
    );
};

export default PageNotFound;
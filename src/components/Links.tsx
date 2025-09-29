import { Email, GitHub, LinkedIn } from "@mui/icons-material";
import Icon from "./Icon";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import { Box, Typography } from "@mui/material";
import React from "react";

const LinksContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingTop: '150px',
    marginBottom: 0,

    [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
        paddingTop: '40px',
        marginBottom: '150px',
    },
}));

const LinksBox = styled(Box)`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 250px;
    height: 250px;
    margin: 20px;
    background-color: inherit;
    transition: all 0.2s;
`;

const Links = () => {
    const { t } = useTranslation()
    return (
        <LinksContainer>
            <LinksBox>
                <Icon size={250} href={import.meta.env.VITE_USER_URL} target="_blank">
                    <GitHub />
                </Icon>
                <Typography variant="body1">GitHub</Typography>
            </LinksBox>
            <LinksBox>
                <Icon size={250} href={`mailto:${import.meta.env.VITE_USER_EMAIL}`} target="_blank">
                    <Email />
                </Icon>
                <Typography variant="body1">{t('links_email')}</Typography>
            </LinksBox>
            <LinksBox>
                <Icon size={250} href={import.meta.env.VITE_LINKEDIN_URL} target="_blank">
                    <LinkedIn />
                </Icon>
                <Typography variant="body1">LinkedIn</Typography>
            </LinksBox>
        </LinksContainer>
    )
}

export default Links
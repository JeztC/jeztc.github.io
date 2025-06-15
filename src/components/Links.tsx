import {Email, GitHub, LinkedIn} from "@mui/icons-material";
import Icon from "./Icon";
import styled from "@emotion/styled";
import {useTranslation} from "react-i18next";
import {css} from "@emotion/react";
import React from "react";
import {isMobile} from "react-device-detect";

const LinksContainer = styled.div`
    ${() => {
        return isMobile
                ? css`
                    flex-direction: column;
                    margin-bottom: 150px;
                    padding-top: 40px;
                ` : css`
                    padding-top: 150px;
                    flex-direction: row;
                `
    }}
    display: flex;
    align-items: center;
    justify-content: center;
`

const Box = styled.div`
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
            <Box>
                <Icon size={250} href="https://github.com/JeztC/" target="_blank">
                    <GitHub />
                </Icon>
                <p>GitHub</p>
            </Box>
            <Box>
                <Icon size={250} href={`mailto:"jesse.lagland@gmail.com`} target="_blank">
                    <Email />
                </Icon>
                <p>{t('links_email')}</p>
            </Box>
            <Box>
                <Icon size={250} href={`https://www.linkedin.com/in/jesse-l%C3%A5gland-3213a0347/`} target="_blank">
                    <LinkedIn />
                </Icon>
                <p>LinkedIn</p>
            </Box>
        </LinksContainer>
    )
}

export default Links
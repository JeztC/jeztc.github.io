import React from "react";
// @ts-ignore
import AvatarImg from '../assets/pictures/avatar.png';
import {Badge, Rating} from "@mui/material";
import { skillsList } from "../data";
import { useTranslation } from "react-i18next";
import { styled } from "@mui/material/styles";

const SkillBox = styled('div')`
    display: flex;
    flex-direction: column; /* Stack items vertically */
    align-items: center;
    justify-content: center;
    background-color: #1D9BF0;
    color: ${({ theme }) => theme.palette.mode === 'light' ? '#000' : '#fff'};
    min-width: 50px;
    width: auto;
    height: auto; /* Allow height to adjust based on content */
    font-size: 16px;
    font-weight: bold;
    border-radius: 4px;
    margin-right: 8px;
    margin-bottom: 8px;
    padding: 10px; /* Adjust padding for better spacing */
    text-align: center; /* Center text */
`;

const AvatarContainer = styled('img')`
    width: 300px;
    height: 300px;
    object-fit: cover;
    border-radius: 50%;
    border-width: 1px;
    border-style: solid;
    border-color: ${({ theme }) => theme.palette.mode === 'light' ? '#D0D7DE' : 'rgb(35, 35, 35)'};
`

const SkillsColumn = styled('div')`
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    width: 100%; /* Adjust width for smaller screens */
`;

const SkillsContainer = styled('div')`
    max-width: 950px;
    display: flex;
    flex-wrap: wrap;
    margin-top: 24px;
    margin-bottom : 150px;
`;

const MainContainer = styled('div')`
    display: flex;
    flex-direction: column; /* Change to column layout for smaller screens */
    align-items: center;
    margin-top : 50px;
    padding-top: 60px;
    height: 80vh;
    margin: 16px;

    @media (max-width: 768px) {
        height: 60vh;
        margin: 8px;
    }

    @media (max-width: 576px) {
        height: 40vh;
        margin: 4px;
    }
`;

const About: React.FC = () => {
    const { t } = useTranslation();
    return (
        <MainContainer>
            <Badge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <AvatarContainer src={AvatarImg} alt="Description"/>
            </Badge>
            <div style={{ marginLeft: '0', marginTop: '16px', textAlign: 'center' }}>
                <h1>{t('menu_about')}</h1>
                <p>{t('about_desc')}</p>
                <SkillsContainer>
                    <SkillsColumn>
                        {skillsList.map(skill => (
                            <SkillBox key={skill.title}>
                                {skill.title}
                                <Rating value={skill.value * 5} precision={1} size="large" />
                            </SkillBox>
                        ))}
                    </SkillsColumn>
                </SkillsContainer>
            </div>
        </MainContainer>
    );
};

export default About;
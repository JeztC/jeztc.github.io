import React from "react";
import {Badge, Box, LinearProgress, Rating, Typography} from "@mui/material";
import { skillsList } from "../data";
import { useTranslation } from "react-i18next";
import { styled } from "@mui/material/styles";

const AboutContainer = styled('div')`
    margin-left: 0;
    margin-top: 16px;
    text-align: center
`

const SkillContainer = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  width: 100%;
  max-width: 400px;
`;

const SkillLabel = styled(Typography)`
  font-size: 16px;
  font-weight: 500;
  flex: 1;
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
    width: 100%;
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
    flex-direction: column;
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
                <AvatarContainer src={'./media/avatar.png'} alt="Description"/>
            </Badge>
            <AboutContainer>
                <h1>{t('menu_about')}</h1>
                <p>{t('about_desc')}</p>
                <SkillsContainer>
                    <SkillsColumn>
                        {skillsList
                            .sort((a, b) => b.value - a.value)
                            .map(skill => (
                                <SkillContainer key={skill.title}>
                                    <SkillLabel>{skill.title}</SkillLabel>
                                    <LinearProgress
                                        variant="determinate"
                                        value={skill.value * 100}
                                        sx={{ width: '60%', height: 10, borderRadius: 5 }}
                                    />
                                </SkillContainer>
                            ))}
                    </SkillsColumn>
                </SkillsContainer>
            </AboutContainer>
        </MainContainer>
    );
};

export default About;
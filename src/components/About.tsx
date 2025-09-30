import React from "react";
import { Badge, Box, LinearProgress, Typography } from "@mui/material";
import { skillsList } from "../data";
import { useTranslation } from "react-i18next";
import { styled } from "@mui/material/styles";
import { getAgeFromEnvStamp } from "../utils/dateUtils";

const AboutContainer = styled(Box)`
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
    border-color: ${({ theme }) => theme.palette.divider};
`

const SkillsColumn = styled(Box)`
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    width: 100%;
`;

const SkillsContainer = styled(Box)`
    max-width: 950px;
    display: flex;
    flex-wrap: wrap;
    margin-top: 24px;
    margin-bottom : 150px;
`;

const MainContainer = styled(Box)`
    display: flex;
    flex-direction: column;
    align-items: center;
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

const About = () => {
    const { t } = useTranslation();
    const actualAge = getAgeFromEnvStamp();
    return (
        <MainContainer>
            <Badge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <AvatarContainer src={'./media/avatar.png'} alt="Description"/>
            </Badge>
            <AboutContainer>
                <Typography variant="h4" gutterBottom>
                    {t('menu_about')}
                </Typography>
                <Typography variant="body1" sx={{ maxWidth: '900px', margin: '0 auto' }}>
                    {t('about_desc', { age: actualAge })}
                </Typography>
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
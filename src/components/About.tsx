import React from "react";
import { Badge, Rating } from "@mui/material";
import { skillsList } from "../data";
import { useTranslation } from "react-i18next";
import { styled } from "@mui/material/styles";

const AboutContainer = styled('div')`
    margin-left: 0;
    margin-top: 16px;
    text-align: center
`

const SkillBox = styled('div')`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #308fe8;
    min-width: 50px;
    width: auto;
    height: auto;
    font-size: 16px;
    font-weight: bold;
    border-radius: 4px;
    margin-right: 8px;
    margin-bottom: 8px;
    padding: 10px;
    text-align: center;
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
                        {skillsList.map(skill => (
                            <SkillBox key={skill.title}>
                                {skill.title}
                                <Rating
                                    value={skill.value * 5}
                                    precision={1}
                                    size="large"
                                    readOnly
                                />
                            </SkillBox>
                        ))}
                    </SkillsColumn>
                </SkillsContainer>
            </AboutContainer>
        </MainContainer>
    );
};

export default About;
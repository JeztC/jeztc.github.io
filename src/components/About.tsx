import React from "react";
// @ts-ignore
import AvatarImg from '../assets/pictures/avatar.jpg';
import { Badge } from "@mui/material";
import VerificationIcon from "./VerificationIcon";
import styled from "@emotion/styled";
import { skillsList } from "../data";
import { useTranslation } from "react-i18next";
import { useTheme } from "../themes/theme-context";

const SkillBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #1D9BF0;
  color: white;
  color: ${() => {
    const currentTheme = useTheme().theme;
    return currentTheme.palette.mode === 'light'
            ? '#000'
            : '#fff'
  }};
  min-width: 50px;
  width: auto;
  height: 50px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 4px;
  margin-right: 8px;
  margin-bottom: 8px;
  padding-right: 10px;
  padding-left: 10px;
`;

const SkillsColumn = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  width: 100%; /* Adjust width for smaller screens */
`;

const SkillsContainer = styled.div`
  max-width: 950px;
  display: flex;
  flex-wrap: wrap;
  margin-top: 24px;
  margin-bottom : 150px;
`;

const MainContainer = styled.div`
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
        badgeContent={<VerificationIcon />}
      >
        <img src={AvatarImg} alt="Description" style={{
          width: '300px',
          height: '300px',
          objectFit: 'cover',
          borderRadius: '50%',
        }} />
      </Badge>
      <div style={{ marginLeft: '0', marginTop: '16px', textAlign: 'center' }}>
        <h1 style={{ margin: '0' }}>{t('menu_about')}</h1>
        <p style={{ margin: '0' }}>{t('about_desc')}</p>
        <SkillsContainer>
          <SkillsColumn>
            {skillsList.map(skill => <SkillBox key={skill.title}>{skill.title}</SkillBox>)}
          </SkillsColumn>
        </SkillsContainer>
      </div>
    </MainContainer>
  );
};

export default About;

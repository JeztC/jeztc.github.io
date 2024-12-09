import React from 'react';
import styled from '@emotion/styled';
import {GitHub, Email} from '@mui/icons-material';
import Icon from "./Icon";

const IconContainer = styled.div`
  position: fixed;
  bottom: 0;
  right: 20px;
  display: flex;
  flex-direction: row;
`;

const FloatingIcons: React.FC = () => {
    return (
        <IconContainer>
            <Icon size={70} href="https://github.com/JeztC/" target="_blank">
                <GitHub />
            </Icon>
            <Icon size={70} href={`mailto:jesse.lagland@gmail.com`} target="_blank">
                <Email />
            </Icon>
        </IconContainer>
    );
};

export default FloatingIcons;

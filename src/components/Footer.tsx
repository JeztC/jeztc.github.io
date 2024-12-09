import React from 'react';
import styled from "@emotion/styled";
import {css} from "@emotion/react";
import {useTheme} from "../themes/theme-context";
import { GitHub } from '@mui/icons-material';
import { Link } from '@mui/material';

const StyledFooter = styled.footer`
  justify-content: flex-start;
  flex-direction: column;
  align-items: flex-start;
  height: fit-content;
  width: 100%;
  position: fixed;
  bottom: 0;
  border-top: 1px solid grey;
  padding: 10px 16px;
  z-index: 1000;

  ${() => {
    const currentTheme = useTheme().theme;
    return currentTheme.palette.mode === 'light'
            ? css`
        background-color: #F2F2F2;
    ` : css`
        background-color: rgb(22, 27, 34);
    `
  }}
`;

const Footer: React.FC = () => {
    return (
        <StyledFooter>
            <div style={{
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
}}>
    <GitHub /><span style={{ marginLeft: '3px' }}>Source code is free and open-source under GPL-3. Source code available at <Link href={`https://github.com/JeztC/portfolio`} target={`_blank`}>Github</Link></span>
</div>
        </StyledFooter>
    );
}

export default Footer;
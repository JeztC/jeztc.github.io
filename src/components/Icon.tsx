import styled from "@emotion/styled";
import {css} from "@emotion/react";
import {useTheme} from "../themes/theme-context";

const Icon = styled.a<{ size: number }>`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s;

  &:hover {
    transform: scale(1.3);
    color: white;
  }

  svg {
    fill: grey;
    transition: fill 0.5s;
    font-size: ${props => props.size * 0.6}px;
  }

  ${() => {
    const currentTheme = useTheme().theme;
    return currentTheme.palette.mode === 'light' 
        ? css`
      &:hover svg {
        fill: black;
      }
    ` : css`
      &:hover svg {
        fill: white;
      }
    `
  }}
`;

export default Icon;
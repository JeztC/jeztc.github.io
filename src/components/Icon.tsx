import { styled } from "@mui/material/styles";

const Icon = styled('a')<{ size: number }>`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s;

  &:hover {
    transform: scale(1.3);
  }

  svg {
    fill: grey;
    transition: fill 0.5s;
    font-size: ${props => props.size * 0.6}px;
  }

  &:hover svg {
    fill: ${({ theme }) => theme.palette.text.primary};
  }
`;

export default Icon;
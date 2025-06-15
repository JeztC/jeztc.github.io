import styled from "@emotion/styled";
import { useMediaQuery } from "@mui/material";
import { css } from "@emotion/react";
import { useTheme as useMuiTheme } from "@mui/material";
// @ts-ignore
import demo from '../assets/demo.gif';
// @ts-ignore
import portfolio from '../assets/pictures/img.png';
import {isMobile} from "react-device-detect";

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
`;

const ProjectsContainer = styled.div`
    ${() => {
        return css`
            display: flex;
            justify-content: center;
            align-items: center;
            padding: ${isMobile ? "40px 20px" : "100px 0"};
            flex-direction: ${isMobile ? "column" : "row"};
            gap: ${isMobile ? "40px" : "60px"};
            max-width: 1200px;
            margin: 0 auto;
        `;
    }}
`;

const ProjectCard = styled.a`
    display: flex;
    flex-direction: column;
    width: 600px;
    height: 400px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    text-decoration: none;
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
        transform: translateY(-10px);
        box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
    }
`;

const PreviewContainer = styled.div`
    width: 100%;
    height: 300px;
    overflow: hidden;
`;

const PreviewGif = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

const ProjectInfo = styled.div`
    padding: 20px;
    text-align: center;
`;

const ProjectTitle = styled.h3`
    margin: 0;
    color: #333;
    font-size: 1.25rem;
    font-weight: 600;
`;

const Projects = () => {
    return (
        <Container>
            <ProjectsContainer>
                <ProjectCard
                    href="https://github.com/JeztC/freegle"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <PreviewContainer>
                        <PreviewGif
                            src={demo}
                            alt="Project Preview"
                        />
                    </PreviewContainer>
                    <ProjectInfo>
                        <ProjectTitle>Freegle</ProjectTitle>
                    </ProjectInfo>
                </ProjectCard>
                <ProjectCard
                    href="https://github.com/JeztC/portfolio"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <PreviewContainer>
                        <PreviewGif
                            src={portfolio}
                            alt="Project Preview"
                        />
                    </PreviewContainer>
                    <ProjectInfo>
                        <ProjectTitle>Portfolio</ProjectTitle>
                    </ProjectInfo>
                </ProjectCard>
            </ProjectsContainer>
        </Container>
    );
};

export default Projects;
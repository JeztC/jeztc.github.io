import { styled } from "@mui/material/styles";
import React from 'react';
import { Box } from "@mui/material";

const Container = styled(Box)`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ProjectsContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '100px 0',
    flexDirection: 'row',
    gap: '60px',
    maxWidth: '1200px',
    margin: '0 auto',

    [theme.breakpoints.down('md')]: {
        padding: '40px 20px',
        flexDirection: 'column',
        gap: '40px',
    },
}));

const ProjectCard = styled('a')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    width: '600px',
    height: '400px',
    borderRadius: '12px',
    textDecoration: 'none',
    overflow: 'hidden',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    boxShadow:
        theme.palette.mode === 'light'
            ? '0 4px 6px rgba(0, 0, 0, 0.1)'
            : '0 4px 6px rgba(255, 255, 255, 0.08)',

    '&:hover': {
        transform: 'translateY(-10px)',
        boxShadow:
            theme.palette.mode === 'light'
                ? '0 12px 24px rgba(0, 0, 0, 0.15)'
                : '0 12px 24px rgba(255, 255, 255, 0.12)',
    },
}));


const PreviewContainer = styled(Box)`
    width: 100%;
    height: 300px;
    overflow: hidden;
`;

const PreviewGif = styled('img')`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

const ProjectInfo = styled(Box)`
    padding: 20px;
    text-align: center;
`;

const ProjectTitle = styled('h3')(({ theme }) => ({
    margin: 0,
    color: theme.palette.text.primary,
    fontSize: '1.25rem',
    fontWeight: 600,
    '&:visited': {
        color: theme.palette.text.primary,
    },
    '&:hover': {
        color: theme.palette.text.primary,
    },
    '&:active': {
        color: theme.palette.text.primary,
    },
}));


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
                            src={`./media/demo.gif`}
                            alt="Project Preview"
                        />
                    </PreviewContainer>
                    <ProjectInfo>
                        <ProjectTitle>Freegle</ProjectTitle>
                    </ProjectInfo>
                </ProjectCard>
                <ProjectCard
                    href="https://github.com/JeztC/jeztc.github.io/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <PreviewContainer>
                        <PreviewGif
                            src={`./media/img.png`}
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
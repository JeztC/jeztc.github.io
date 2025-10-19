import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import { projectData } from "../data";

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
    boxShadow: `0 4px 6px ${theme.palette.action.hover}`,
    '&:hover': {
        transform: 'translateY(-10px)',
        boxShadow: `0 12px 24px ${theme.palette.action.hover}`
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
}));

const Projects = () => {
    return (
        <Container>
            <ProjectsContainer>
                {projectData.map((project, index) => (
                    <ProjectCard
                        key={index}
                        href={project.href}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <PreviewContainer>
                            <PreviewGif
                                src={project.imgSrc}
                                alt="Project Preview"
                            />
                        </PreviewContainer>
                        <ProjectInfo>
                            <ProjectTitle>{project.title}</ProjectTitle>
                        </ProjectInfo>
                    </ProjectCard>
                ))}
            </ProjectsContainer>
        </Container>
    );
};

export default Projects;
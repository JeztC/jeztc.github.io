import { styled } from "@mui/material/styles";
import { Box, Typography, IconButton, Tooltip, Chip } from "@mui/material";
import { GitHub, OpenInNew } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { projectData } from "../data";

interface Project {
    title: string;
    href: string;
    imgSrc?: string;
    liveUrl?: string;
    tags?: string[];
}

const tagColors: Record<string, string> = {
    'React.js': '#61dafb',
    'TypeScript': '#3178c6',
    'Material UI': '#007fff',
};

const hexToRgba = (hex: string, alpha: number) => {
    const h = hex.replace('#', '');
    const r = parseInt(h.substring(0, 2), 16);
    const g = parseInt(h.substring(2, 4), 16);
    const b = parseInt(h.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const TagRow = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    gap: theme.spacing(0.75),
    padding: theme.spacing(1.5, 2.5, 0),
}));

const TagChip = styled(Chip)<{ tagcolor: string }>(({ theme, tagcolor }) => ({
    height: 24,
    fontSize: '0.72rem',
    fontWeight: 600,
    letterSpacing: '0.01em',
    color: tagcolor,
    backgroundColor: hexToRgba(tagcolor, theme.palette.mode === 'dark' ? 0.14 : 0.1),
    border: `1px solid ${hexToRgba(tagcolor, theme.palette.mode === 'dark' ? 0.35 : 0.28)}`,
    borderRadius: 999,
    '& .MuiChip-label': {
        padding: '0 10px',
    },
}));

const PageContainer = styled(Box)`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 60px 16px 80px;
`;

const Grid = styled(Box)(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: 32,
    width: '100%',
    maxWidth: 1100,
    [theme.breakpoints.down('md')]: {
        gridTemplateColumns: '1fr',
        gap: 24,
    },
}));

const Card = styled(Box)(({ theme }) => ({
    borderRadius: 16,
    border: `1px solid ${theme.palette.divider}`,
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    transition: 'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease',
    '&:hover': {
        transform: 'translateY(-6px)',
        boxShadow: theme.shadows[8],
        borderColor: theme.palette.primary.main,
    },
}));

const PreviewArea = styled(Box)({
    height: 220,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#0d1117',
});

// width: 200% + scale(0.5) makes the iframe exactly fill the container width responsively
const LiveFrame = styled('iframe')({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '200%',
    height: 440,
    border: 'none',
    transform: 'scale(0.5)',
    transformOrigin: 'top left',
    pointerEvents: 'none',
});

const PreviewImg = styled('img')({
    width: '100%',
    height: '100%',
    objectFit: 'cover',
});

const CardFooter = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(2, 2.5),
    borderTop: `1px solid ${theme.palette.divider}`,
}));

const Projects = () => {
    const { t } = useTranslation();

    return (
        <PageContainer>
            <Typography variant="h4" component="h1" fontWeight={700} gutterBottom sx={{ mb: 5 }}>
                {t('menu_projects')}
            </Typography>
            <Grid>
                {(projectData as Project[]).map((project, index) => (
                    <Card key={index}>
                        <PreviewArea>
                            {project.liveUrl ? (
                                <LiveFrame
                                    src={project.liveUrl}
                                    title={project.title}
                                    loading="lazy"
                                    sandbox="allow-scripts allow-same-origin"
                                />
                            ) : (
                                <PreviewImg src={project.imgSrc} alt={project.title} />
                            )}
                        </PreviewArea>
                        {project.tags && project.tags.length > 0 && (
                            <TagRow>
                                {project.tags.map((tag) => (
                                    <TagChip
                                        key={tag}
                                        label={tag}
                                        size="small"
                                        tagcolor={tagColors[tag] ?? '#888'}
                                    />
                                ))}
                            </TagRow>
                        )}
                        <CardFooter>
                            <Typography variant="subtitle1" fontWeight={600}>
                                {project.title}
                            </Typography>
                            <Box display="flex" gap={0.5}>
                                <Tooltip title="GitHub">
                                    <IconButton
                                        size="small"
                                        onClick={() => window.open(project.href, '_blank', 'noopener noreferrer')}
                                    >
                                        <GitHub fontSize="small" />
                                    </IconButton>
                                </Tooltip>
                                {project.liveUrl && (
                                    <Tooltip title={t('view_project')}>
                                        <IconButton
                                            size="small"
                                            onClick={() => window.open(project.liveUrl, '_blank', 'noopener noreferrer')}
                                        >
                                            <OpenInNew fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                )}
                            </Box>
                        </CardFooter>
                    </Card>
                ))}
            </Grid>
        </PageContainer>
    );
};

export default Projects;

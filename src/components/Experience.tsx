import { Box, Typography, Chip } from '@mui/material';
import { useTranslation } from "react-i18next";
import { styled, useTheme } from "@mui/material/styles";
import { OpenInNew } from "@mui/icons-material";
import { jobs } from "../data";

interface Job {
    company: string;
    name: string;
    link: string;
    tags?: string[];
}

const tagColors: Record<string, string> = {
    'Full-Stack Development': '#10b981',
    'React.js': '#61dafb',
    'TypeScript': '#3178c6',
    'GraphQL': '#e535ab',
    'Material UI': '#007fff',
};

const hexToRgba = (hex: string, alpha: number) => {
    const h = hex.replace('#', '');
    const r = parseInt(h.substring(0, 2), 16);
    const g = parseInt(h.substring(2, 4), 16);
    const b = parseInt(h.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const PageContainer = styled(Box)`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 60px 16px 80px;
`;

const CardList = styled(Box)`
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;
    max-width: 760px;
`;

const JobCard = styled('a')(({ theme }) => ({
    display: 'flex',
    alignItems: 'flex-start',
    gap: theme.spacing(3),
    padding: theme.spacing(3),
    borderRadius: 16,
    border: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.background.paper,
    textDecoration: 'none',
    color: 'inherit',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',
    '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: theme.shadows[4],
        borderColor: theme.palette.primary.main,
    },
    [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: theme.spacing(2),
    },
}));

const TagRow = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    gap: theme.spacing(0.75),
    marginTop: theme.spacing(1.5),
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

const CompanyLogo = styled('img')(({ theme }) => ({
    width: 120,
    height: 60,
    objectFit: 'contain',
    flexShrink: 0,
    borderRadius: 8,
    border: `1px solid ${theme.palette.divider}`,
    padding: 8,
    backgroundColor: '#fff',
    [theme.breakpoints.down('sm')]: {
        width: 100,
        height: 50,
    },
}));

const Experience = () => {
    const { t } = useTranslation();
    const theme = useTheme();
    const mutedColor = theme.palette.mode === 'light' ? '#59636e' : '#8b949e';

    return (
        <PageContainer>
            <Typography variant="h4" component="h1" fontWeight={700} gutterBottom sx={{ mb: 5 }}>
                {t('menu_experience')}
            </Typography>
            <CardList>
                {(jobs as Job[]).map((job, index) => (
                    <JobCard key={index} href={job.link} target="_blank" rel="noopener noreferrer">
                        <CompanyLogo src={`/media/${job.name}.png`} alt={`${job.company} logo`} />
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                            <Typography variant="h6" fontWeight={600} sx={{ lineHeight: 1.2 }}>
                                {job.company}
                            </Typography>
                            <Typography variant="body2" sx={{ mt: 0.5, fontWeight: 500, color: mutedColor }}>
                                {t(`experience_${index}_job`)}
                            </Typography>
                            <Chip
                                label={t(`job_${index}_duration`)}
                                size="small"
                                sx={{ mt: 1, height: 22, fontSize: '0.72rem' }}
                            />
                            {job.tags && job.tags.length > 0 && (
                                <TagRow>
                                    {job.tags.map((tag) => (
                                        <TagChip
                                            key={tag}
                                            label={tag}
                                            size="small"
                                            tagcolor={tagColors[tag] ?? theme.palette.primary.main}
                                        />
                                    ))}
                                </TagRow>
                            )}
                        </Box>
                        <OpenInNew sx={{ color: mutedColor, flexShrink: 0, fontSize: 18 }} />
                    </JobCard>
                ))}
            </CardList>
        </PageContainer>
    );
};

export default Experience;

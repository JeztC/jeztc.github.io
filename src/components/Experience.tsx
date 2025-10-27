import { Box, Avatar, Typography, Link } from '@mui/material';
import { useTranslation } from "react-i18next";
import { styled } from "@mui/material/styles";
import { jobs } from "../data";

const Container = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    marginTop: theme.spacing(4),
    gap: theme.spacing(3),
    width: '100%',
    maxWidth: '600px',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    '&:hover': {
        transform: 'translateY(-10px)',
        boxShadow: `0 12px 24px ${theme.palette.action.hover}`
    },
    boxShadow: `0 4px 6px ${theme.palette.action.hover}`,
    [theme.breakpoints.down('md')]: {
        marginTop: theme.spacing(2),
        gap: theme.spacing(2),
    },
}));

const StyledBox = styled(Box)(({ theme }) => ({
    padding: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
        padding: theme.spacing(4),
    },
    maxWidth: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: '100vh',
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
    width: 100,
    height: 50,
    marginRight: theme.spacing(1.5),
    backgroundColor: '#f5f5f5',

    [theme.breakpoints.up('md')]: {
        width: 200,
        height: 75,
        marginRight: theme.spacing(2.5),
    },
    [theme.breakpoints.up('md')]: {
        width: 400,
        height: 150,
    },
}));

const StyledLink = styled(Link)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(1.5),
    border: `1px solid ${theme.palette.divider}`,
    transition: 'box-shadow 0.2s',
    textDecoration: 'none',
    '&:hover': {
        boxShadow: theme.shadows[6],
    },
    [theme.breakpoints.up('md')]: {
        padding: theme.spacing(2),
    },
}));


const JobDurationText = styled(Typography)(({ theme }) => ({
    marginTop: theme.spacing(0.5),
    color: theme.palette.text.secondary,
}));

const JobTitleText = styled(Typography)(({ theme }) => ({
    marginTop: theme.spacing(0.5),
    color: theme.palette.text.secondary,
    fontWeight: 'bold',
}));

const CompanyNameText = styled(Typography)(() => ({
    fontWeight: 'bold',
}));

export const Experience = () => {
    const { t } = useTranslation();
    return (
        <StyledBox>
            <Typography variant="h4" component="h1" gutterBottom>
                {t('menu_experience')}
            </Typography>
            <Container>
                {jobs.map((job, index) => (
                    <StyledLink
                        key={index}
                        href={job.link}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <StyledAvatar
                            src={`./media/${job.name}.png`}
                            alt={`${job.company} logo`}
                            variant="rounded"
                        />
                        <Box>
                            <CompanyNameText variant="subtitle1">
                                {job.company}
                            </CompanyNameText>
                            <JobDurationText>
                                {t(`job_${index}_duration`)}
                            </JobDurationText>
                            <JobTitleText>
                                {t(`experience_${index}_job`)}
                            </JobTitleText>
                        </Box>
                    </StyledLink>
                ))}
            </Container>
        </StyledBox>
    );
}

export default Experience;
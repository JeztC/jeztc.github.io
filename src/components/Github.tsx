import { useEffect, useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, Grid, Link, Typography, Box } from '@mui/material';
import axios from 'axios';
import GithubIcon from "./GithubIcon";
import GroupIcon from '@mui/icons-material/Group';
import { Star } from "@mui/icons-material";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import FacebookCircularProgress from "./FacebookCircularProgress";
import dayjs from "dayjs";
import { getLanguageColor } from "../utils/languageColors";
import type { LanguageProps } from "../interfaces/languageProps";
import type { GithubRepository } from "../types/githubRepository";
import type { GitHubUser } from "../types/githubUser";

const StyledUserCard = styled(Card)`
    display: flex;
    box-shadow: none;
    width: 900px;
    height: max-content;
    background: inherit;
    border: 1px solid ${({ theme }) => theme.palette.divider};
    @media (max-width: 768px) {
        width: 90%;
        margin: 0 auto;
    }
`;

const ProjectBox = styled(Box)`
    background: inherit;
    margin: 23px;
    border-radius: 0;
    border: 1px solid ${({ theme }) => theme.palette.divider};
    width: 420px;
    height: 150px;
    box-shadow: none;
    @media (max-width: 768px) {
        width: 300px;
    }
`;

const AvatarContainer = styled('img')`
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border-style: solid;
    border-width: 1px;
    border-color: ${({ theme }) => theme.palette.divider};
`

const StyledUserCardSection = styled(Box)`
    display: flex;
    align-items: center;
    padding-bottom: 10px;
`

const DescriptionTypography = styled(Typography)(() => ({
    marginTop: '-30px',
    color: '#999999',
}));

const CardContainer = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
    paddingTop: '50px',
    marginBottom: '50px',
    marginTop: '25px',
    boxSizing: 'border-box',
    borderRadius: '5px',
});

const StyledGridContainer = styled(Grid)(() => ({
    marginTop: '40px',
    marginLeft: '20px',
    marginBottom: '5%',
}));

const StyledIcon = styled('svg')(() => ({
    color: 'rgb(139, 148, 158)',
    marginRight: '5px',
    fontSize: 'inherit',
}));

const StyledRepoText = styled(Typography)(() => ({
    color: '#999999',
}));

const StyledRepoTextPadding = styled(Typography)(() => ({
    paddingLeft: '5px',
    color: '#999999',
}));

const StyledGroupIcon = styled(GroupIcon)(() => ({
    marginRight: '5px',
    color: '#999999',
}));

const StyledSubtitle = styled(Typography)(() => ({
    marginTop: '20px',
    marginBottom: '20px',
    fontSize: '18px',
    color: 'inherit',
}));

const StyledHeading = styled(Typography)(() => ({
    fontSize: '20px',
    color: '#999999',
}));

const CenteredBox = styled(Box)(() => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '40vh',
}));

const RepoMetaText = styled(Typography)(() => ({
    color: 'rgb(139, 148, 158)',
    component: 'p'
}));

const LanguageTypography = styled(Typography)<LanguageProps>(({ language }) => {
    const safeLanguage = typeof language === 'string' ? language : '';
    return {
        marginTop: '20px',
        display: 'flex',
        alignItems: 'center',
        color: '#999999',
        '&:before': {
            content: '""',
            display: 'inline-block',
            width: '14px',
            height: '14px',
            borderRadius: '50%',
            marginRight: '5px',
            backgroundColor: getLanguageColor(safeLanguage),
        },
    };
});

const CardTitleText = styled(Typography)(({ theme }) => ({
    ...theme.typography.h6,
}));


const Github = () => {
    const [user, setUser] = useState<GitHubUser | null>(null);
    const [starred, setStarred] = useState<number>(0);
    const [repositories, setRepositories] = useState<GithubRepository[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const { t } = useTranslation();

    const formattedDate = useMemo(() => {
        return dayjs(user?.created_at).format('DD/MM/YYYY');
    }, [user?.created_at]);

    const filteredRepositories = useMemo(() => {
        return repositories.filter(repo => repo.language !== null)
    }, [repositories]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [userResult, starredResult, reposResult] = await axios.all([
                    axios.get<GitHubUser>(import.meta.env.VITE_USER_API_URL),
                    axios.get(import.meta.env.VITE_USER_API_URL_STARRED),
                    axios.get<GithubRepository[]>(import.meta.env.VITE_USER_API_PROJECTS),
                ]);

                const userData = userResult.data;
                setStarred(starredResult.data.length)
                setUser(userData);
                setRepositories(reposResult.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            {loading ? (
                <CenteredBox>
                    <FacebookCircularProgress />
                </CenteredBox>
            ) : (
                !loading && (
                    <>
                        <CardContainer>
                            <StyledUserCard>
                                <CardHeader
                                    avatar={<AvatarContainer src={user?.avatar_url} alt={`Avatar for ${user?.login}`} />}
                                    title={<CardTitleText>{user?.name}</CardTitleText>}
                                />
                                <CardContent>
                                    <StyledHeading variant="h5">
                                        <Link href={user?.html_url} target="_blank">{user?.login}</Link>
                                    </StyledHeading>
                                    <StyledSubtitle variant="subtitle1">{user?.bio}</StyledSubtitle>
                                    <StyledUserCardSection>
                                        <StyledGroupIcon />
                                        <StyledRepoText
                                            variant="body2">
                                            {user?.followers} {t('followers')} · {user?.following} {t('following')}
                                        </StyledRepoText>
                                    </StyledUserCardSection>
                                    <StyledUserCardSection>
                                        <GithubIcon />
                                        <StyledRepoTextPadding variant="body2">{t('repositories')}: {user?.public_repos}</StyledRepoTextPadding>
                                    </StyledUserCardSection>
                                    <StyledUserCardSection>
                                        <StyledIcon as={Star} />
                                        <StyledRepoText variant="body2">{t('stars')}: {starred}</StyledRepoText>
                                    </StyledUserCardSection>
                                    <StyledUserCardSection>
                                        <StyledIcon as={CalendarMonthIcon} />
                                        <StyledRepoText variant="body2">{t('registered')}: {formattedDate}</StyledRepoText>
                                    </StyledUserCardSection>
                                </CardContent>
                            </StyledUserCard>
                        </CardContainer>
                        <StyledGridContainer container>
                            {filteredRepositories.map((repository) => (
                                <Grid key={repository.id}>
                                    <ProjectBox>
                                        <CardHeader
                                            avatar={<GithubIcon />}
                                            title={<Link href={repository.html_url} target="_blank">{repository.name}</Link>}
                                            subheader={<RepoMetaText variant="body2">{`${repository.stargazers_count} ${t('stars').toLowerCase()} • ${repository.forks} ${t('forks')}`}</RepoMetaText>}
                                        />
                                        <CardContent>
                                            <DescriptionTypography variant="body2">
                                                {repository.description}
                                            </DescriptionTypography>
                                            <LanguageTypography variant="body2" language={repository.language ?? ''}>
                                                {repository.language}
                                            </LanguageTypography>
                                        </CardContent>
                                    </ProjectBox>
                                </Grid>
                            ))}
                        </StyledGridContainer>
                    </>
                )
            )}
        </>
    );
};

export default Github;
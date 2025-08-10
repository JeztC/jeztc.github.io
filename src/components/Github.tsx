import React, { useEffect, useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, Grid, Link, Typography, Box } from '@mui/material';
import axios from 'axios';
import GithubIcon from "./GithubIcon";
import GroupIcon from '@mui/icons-material/Group';
import { Star } from "@mui/icons-material";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import moment from "moment/moment";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import FacebookCircularProgress from "./FacebookCircularProgress";

interface Repository {
    id: number;
    name: string;
    description: string;
    html_url: string;
    stargazers_count: number;
    forks: number;
    language: string;
}

interface User {
    login: string;
    id: number;
    avatar_url: string;
    name: string;
    bio: string;
    html_url: string;
    followers: number;
    following: number;
    description: string;
    public_repos: number;
    public_gists: number;
    starred_url: string;
    total_starred: number;
    created_at: string;
}

const StyledUserCard = styled(Card)`
    display: flex;
    box-shadow: none;
    width: 900px;
    height: max-content;
    background: inherit;
    border: 1px solid ${({ theme }) => theme.palette.mode === 'light' ? '#D0D7DE' : 'rgb(35, 35, 35)'};
    @media (max-width: 768px) {
        width: 90%;
        margin: 0 auto;
    }
`;

const ProjectBox = styled(Box)`
    background: inherit;
    margin: 23px;
    border-radius: 0;
    border: 1px solid ${({ theme }) => theme.palette.mode === 'light' ? '#D0D7DE' : 'rgb(35, 35, 35)'};
    width: 420px;
    height: 150px;
    box-shadow: none;
`;

const AvatarContainer = styled('img')`
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border-style: solid;
    border-width: 1px;
    border-color: ${({ theme }) => theme.palette.mode === 'light' ? '#D0D7DE' : 'rgb(35, 35, 35)'};
`

const StyledUserCardSection = styled('div')`
    display: flex;
    align-items: center;
    padding-bottom: 10px;
`

const DescriptionTypography = styled(Typography)(() => ({
    marginTop: '-30px',
    color: 'rgb(139, 148, 158)',
}));

interface LanguageProps {
    language: string;
}

const LanguageTypography = styled(Typography)<LanguageProps>(({ language }) => ({
    marginTop: '20px',
    display: 'flex',
    alignItems: 'center',
    color: 'rgb(139, 148, 158)',
    '&:before': {
        content: '""',
        display: 'inline-block',
        width: '14px',
        height: '14px',
        borderRadius: '50%',
        marginRight: '5px',
        backgroundColor: getLanguageColor(language),
    },
}));

const getLanguageColor = (language : string) => {
    if (!language) return 'transparent';

    const normalizedLang = language.trim().toLowerCase();

    const colorMap: Record<string, string> = {
        javascript: '#f1e05a',
        python: '#3572A5',
        java: '#b07219',
        'c++': '#f34b7d',
        c: '#555555',
        ruby: '#701516',
        swift: '#ffac45',
        go: '#00ADD8',
        php: '#4F5D95',
        html: '#e44b23',
        css: '#563d7c',
        kotlin: '#F18E33',
        'c#': '#178600',
        typescript: '#3178C6',
        nix: '#7e7eff',
        shell: '#89e051',
    };
    return colorMap[normalizedLang] || 'transparent';
};

const Github: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [repositories, setRepositories] = useState<Repository[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const { t } = useTranslation();

    const formattedDate = useMemo(() => {
        return moment(user?.created_at).format('DD/MM/YYYY');
    }, [user?.created_at]);

    const filteredRepositories = useMemo(() => {
        return repositories
            .filter(repo => repo.language !== null)
    }, [repositories]);

    useEffect(() => {
        const fetchData = async () => {
            const [userResult, starredResult, reposResult] = await Promise.all([
                axios.get<User>('https://api.github.com/users/JeztC'),
                axios.get('https://api.github.com/users/JeztC/starred'),
                axios.get<Repository[]>('https://api.github.com/users/JeztC/repos?sort=updated&direction=desc&type=all&per_page=100&page=1&affiliation=owner,collaborator&sort=pushed'),
            ]);

            setUser({
                ...userResult.data,
                total_starred: starredResult.data.length,
            });
            setRepositories(reposResult.data);
            setLoading(false);
        };

        fetchData();
    }, []);

    return (
        <>
            {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '40vh' }}>
                    <FacebookCircularProgress />
                </div>
            ) : (
                !loading && (
                    <>
                        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '50px', marginBottom: '50px', marginTop: '25px', boxSizing: 'border-box', borderRadius: '5px' }}>
                            <StyledUserCard>
                                <CardHeader
                                    avatar={<AvatarContainer src={user?.avatar_url} alt={`Avatar for ${user?.login}`} />}
                                    title={<Typography variant="h6">{user?.name}</Typography>}
                                />
                                <CardContent>
                                    <Typography sx={{ fontSize: '20px', fontFamily: 'Segoe UI' }} color="rgb(139, 148, 158)" variant="h5">
                                        <Link href={user?.html_url} target="_blank">{user?.login}</Link>
                                    </Typography>
                                    <Typography sx={{ marginTop: '20px', marginBottom: '20px', fontSize: '18px', fontFamily: 'Segoe UI' }} color="inherit" variant="subtitle1">{user?.bio}</Typography>
                                    <StyledUserCardSection>
                                        <GroupIcon style={{ color: 'rgb(139, 148, 158)', marginRight: '5px' }} />
                                        <Typography color="#999999" variant="body2">{user?.followers} {t('followers')} · {user?.following} {t('following')}</Typography>
                                    </StyledUserCardSection>
                                    <StyledUserCardSection>
                                        <GithubIcon />
                                        <Typography style={{ paddingLeft: '5px' }} color="#999999" variant="body2">{t('repositories')}: {user?.public_repos}</Typography>
                                    </StyledUserCardSection>
                                    <StyledUserCardSection>
                                        <Star style={{ color: 'rgb(139, 148, 158)', marginRight: '5px' }} />
                                        <Typography color="#999999" variant="body2">{t('stars')}: {user?.total_starred}</Typography>
                                    </StyledUserCardSection>
                                    <StyledUserCardSection>
                                        <CalendarMonthIcon style={{ color: 'rgb(139, 148, 158)', marginRight: '5px' }} />
                                        <Typography color="#999999" variant="body2">{t('registered')}: {formattedDate}</Typography>
                                    </StyledUserCardSection>
                                </CardContent>
                            </StyledUserCard>
                        </div>
                        <Grid container style={{ marginTop: '40px', marginLeft: '20px', marginBottom: '5%' }}>
                            {filteredRepositories.map((repository) => (
                                <Grid key={repository.id}>
                                    <ProjectBox>
                                        <CardHeader
                                            avatar={<GithubIcon />}
                                            title={<Link href={repository.html_url} target="_blank">{repository.name}</Link>}
                                            subheader={<Typography variant="body2" color="rgb(139, 148, 158)" component="p">{`${repository.stargazers_count} ${t('stars').toLowerCase()} • ${repository.forks} ${t('forks')}`}</Typography>}
                                        />
                                        <CardContent>
                                            <DescriptionTypography variant="body2">
                                                {repository.description}
                                            </DescriptionTypography>
                                            <LanguageTypography variant="body2" language={repository.language}>
                                                {repository.language}
                                            </LanguageTypography>
                                        </CardContent>
                                    </ProjectBox>
                                </Grid>
                            ))}
                        </Grid>
                    </>
                )
            )}
        </>
    );
};

export default Github;
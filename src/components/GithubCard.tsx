import React, {useEffect, useState} from 'react';
import {Card, CardContent, CardHeader, CircularProgress, Grid, Link, Typography, css} from '@mui/material';
import axios from 'axios';
import GithubIcon from "./GithubIcon";
import '../index.css'
import GroupIcon from '@mui/icons-material/Group';
import {Star} from "@mui/icons-material";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import moment from "moment/moment";
import { useTheme } from '../themes/theme-context';
import styled from "@emotion/styled";

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
  width: 250;
  height: max-content;
  background: inherit;
  ${() => {
    const currentTheme = useTheme().theme;
    return currentTheme.palette.mode === 'light'
            ? css`
              border: 1px solid #D0D7DE;
            ` : css`
              border: 1px solid rgb(35, 35, 35);
            `
  }}
`;

const ProjectCard = styled(Card)`
 background : inherit;
 margin: 10px 0;
 border-radius: 5%;
 border-width: 1px;
 box-shadow : none;
  ${() => {
    const currentTheme = useTheme().theme;
    return currentTheme.palette.mode === 'light'
            ? css`
              border: 1px solid #D0D7DE;
            ` : css`
              border: 1px solid rgb(35, 35, 35);
            `
  }}
`;

const GitHubCard: React.FC = () => {
    const [user, setUser] = useState<User>({
        login: '',
        id: 0,
        avatar_url: '',
        name: '',
        bio: '',
        html_url: '',
        followers: 0,
        following: 0,
        description: '',
        public_repos: 0,
        public_gists: 0,
        starred_url: '',
        total_starred: 0,
        created_at: '1970-1-1T00:00:00Z'
    });
    const [repositories, setRepositories] = React.useState<Repository[]>([]);
    const [loading, setLoading] = React.useState<boolean>(true);
    
    useEffect(() => {
        const fetchUser = async () => {
            const result = await axios.get<User>("https://api.github.com/users/JeztC" === undefined ? "" : "https://api.github.com/users/JeztC");
            const starredResult = await axios.get("https://api.github.com/users/JeztC/starred" === undefined ? "" : "https://api.github.com/users/JeztC/starred");
            const totalStarred = starredResult.data.length;

            setUser({
                ...result.data,
                total_starred: totalStarred
            });

            setLoading(false);
        }
        fetchUser();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get<Repository[]>(
                `https://api.github.com/users/JeztC/repos?sort=updated&direction=desc&type=all&per_page=100&page=1&affiliation=owner,collaborator&sort=pushed`,
            );
            setRepositories(result.data);
        };
        fetchData();
    }, []);

    return (
        <div>
            {/* Render the profile information panel */}
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                paddingTop : '50px',
                marginBottom: '50px',
                marginTop: '25px',
                boxSizing: 'border-box',
                borderRadius: '5px',
            }}>
                {loading ? <CircularProgress/> :
                    <StyledUserCard>
                    <CardHeader
                        avatar={
                            <img
                                src={user.avatar_url}
                                alt={`Avatar for ${user.login}`}
                                style={{
                                    borderRadius: '50%',
                                    borderColor: 'rgb(31, 35, 40)',
                                    borderStyle: 'solid',
                                    borderWidth: '2px',
                                }}
                            />
                        }
                        title={<Typography variant="h6">{user.name}</Typography>}
                    />
                    <CardContent>
                        <Typography sx={{fontSize : '20px', fontFamily : 'Segoe UI'}} color="rgb(139, 148, 158)" variant="h5">
                            <Link href={user.html_url} target="_blank">
                                {user.login}
                            </Link>
                        </Typography>
                        <Typography sx={{marginTop : '20px', marginBottom : '20px', fontSize : '18px', fontFamily : 'Segoe UI'}} color="inherit" variant="subtitle1">{user.bio} </Typography>
                        {/* Display the user's followers, following, repositories, and stars */}
                        <div style={{ display: 'flex', alignItems: 'center', paddingBottom : '10px' }}>
                            <GroupIcon style={{ color : "rgb(139, 148, 158)", marginRight: '5px' }} />
                            <Typography color="#999999" variant="body2">{user.followers} followers · {user.following} following </Typography>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', paddingBottom : '10px' }}>
                            <GithubIcon/>
                            <Typography style={{paddingLeft : '5px'}} color="#999999" variant="body2">Repositories: {user.public_repos}</Typography>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', paddingBottom : '10px' }}>
                            <Star style={{ color : "rgb(139, 148, 158)", marginRight: '5px' }} />
                            <Typography color="#999999" variant="body2">Stars: {user.total_starred}</Typography>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', paddingBottom : '10px' }}>
                            <CalendarMonthIcon style={{ color : "rgb(139, 148, 158)", marginRight: '5px' }} />
                            <Typography color="#999999" variant="body2">Registered: {moment(user.created_at).format('DD/MM/YYYY')}</Typography>
                        </div>
                    </CardContent>
                </StyledUserCard>
                }
            </div>
            <Grid container spacing={2} style={{ marginTop: '40px', marginLeft: '250px', marginBottom: '5%' }}>
                {repositories.map((repository) => (
                    <Grid item xs={12} sm={6} md={5} key={repository.id}>
                        <ProjectCard>
                            <CardHeader
                                avatar={<GithubIcon />}
                                title=
                                    {
                                        <Link href={repository.html_url} target="_blank">
                                            {repository.name}
                                        </Link>}
                                subheader={
                                    <Typography variant="body2" color="rgb(139, 148, 158)" component="p">
                                        {`${repository.stargazers_count} stars • ${repository.forks} forks`}
                                    </Typography>}
                            />
                            <CardContent>
                                <Typography style={{marginTop : '-30px'}} variant="body2" color="rgb(139, 148, 158)">
                                    {repository.description}
                                </Typography>
                                {repository.language === null ? (
                                    <Typography variant="body2" color="rgb(139, 148, 158)" style={{marginTop : '20px', display: 'flex', alignItems: 'center'}}>
                                        Language: Unknown
                                    </Typography>
                                ) : (
                                    <Typography variant="body2" color="rgb(139, 148, 158)" component="p" style={{marginTop : '20px', display: 'flex', alignItems: 'center'}} className={`language-text ${repository.language.toLowerCase().replace("c#", "csharp")}`}>
                                        {repository.language}
                                    </Typography>
                                )}
                            </CardContent>
                        </ProjectCard>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default GitHubCard;
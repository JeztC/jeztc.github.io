import { Badge, Box, LinearProgress, LinearProgressProps, Typography } from "@mui/material";
import { skillsList } from "../data";
import { useTranslation } from "react-i18next";
import { styled, useTheme } from "@mui/material/styles";
import { getAgeFromEnvStamp } from "../utils/dateUtils";

interface Skill {
    title: string;
    value: number;
    iconUrl: string;
    color: string;
    darkInvert?: boolean;
    link: string;
}

const MainContainer = styled(Box)`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 60px;
    margin: 16px;
`;

const AvatarContainer = styled('img')`
    width: 300px;
    height: 300px;
    object-fit: cover;
    border-radius: 50%;
    border-width: 1px;
    border-style: solid;
    border-color: ${({ theme }) => theme.palette.divider};
`;

const AboutContainer = styled(Box)`
    margin-top: 16px;
    text-align: center;
    width: 100%;
    max-width: 1000px;
`;

const SkillsGrid = styled(Box)`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 14px;
    margin-top: 32px;
    margin-bottom: 80px;
    width: 100%;

    @media (max-width: 900px) {
        grid-template-columns: repeat(3, 1fr);
    }
    @media (max-width: 600px) {
        grid-template-columns: repeat(2, 1fr);
    }
`;

const SkillCard = styled(Box)<{ brandcolor: string }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 16px 12px 12px;
    border-radius: 12px;
    background: ${({ theme }) =>
        theme.palette.mode === 'dark'
            ? 'rgba(255,255,255,0.05)'
            : 'rgba(0,0,0,0.03)'};
    border: 1px solid ${({ theme }) =>
        theme.palette.mode === 'dark'
            ? 'rgba(255,255,255,0.08)'
            : 'rgba(0,0,0,0.08)'};
    transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.25s ease, background-color 0.25s ease;
    text-decoration: none;
    color: inherit;
    cursor: pointer;

    &:hover {
        transform: translateY(-3px);
        box-shadow: 0 6px 20px ${({ brandcolor }) => `${brandcolor}40`};
        border-color: ${({ brandcolor }) => `${brandcolor}80`};
    }
`;

const SkillIcon = styled('img')<{ darkinvert: string }>`
    width: 40px;
    height: 40px;
    object-fit: contain;
    margin-bottom: 8px;
    filter: ${({ darkinvert, theme }) =>
        darkinvert === 'true' && theme.palette.mode === 'dark' ? 'invert(1)' : 'none'};
`;

const SkillName = styled(Typography)`
    font-size: 12px;
    font-weight: 600;
    text-align: center;
    margin-bottom: 8px;
    line-height: 1.2;
    min-height: 28px;
    display: flex;
    align-items: center;
`;

const SkillProgressRow = styled(Box)`
    display: flex;
    align-items: center;
    gap: 6px;
    width: 100%;
`;

const StyledLinearProgress = styled(LinearProgress)<LinearProgressProps & { brandcolor: string }>(
    ({ brandcolor }) => ({
        flex: 1,
        height: 6,
        borderRadius: 3,
        backgroundColor: `${brandcolor}25`,
        '& .MuiLinearProgress-bar': {
            borderRadius: 3,
            backgroundColor: brandcolor,
        },
    })
);

const PercentLabel = styled(Typography)`
    font-size: 11px;
    font-weight: 600;
    min-width: 30px;
    text-align: right;
    opacity: 0.8;
`;

const About = () => {
    const { t } = useTranslation();
    const age = getAgeFromEnvStamp();
    useTheme();

    return (
        <MainContainer>
            <Badge overlap="circular" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                <AvatarContainer src="/media/avatar.png" alt="Avatar" />
            </Badge>
            <AboutContainer>
                <Typography sx={{ maxWidth: '900px', margin: '0 auto' }} variant="h4" gutterBottom>
                    {t('menu_about')}
                </Typography>
                <Typography sx={{ maxWidth: '900px', margin: '0 auto' }} variant="body1">
                    {t('about_desc', { age })}
                </Typography>

                <SkillsGrid>
                    {(skillsList as Skill[])
                        .sort((a, b) => b.value - a.value)
                        .map(skill => {
                            const percent = Math.round(skill.value * 100);
                            return (
                                <SkillCard
                                    key={skill.title}
                                    brandcolor={skill.color}
                                    component="a"
                                    href={skill.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <SkillIcon
                                        src={skill.iconUrl}
                                        alt={skill.title}
                                        darkinvert={skill.darkInvert ? 'true' : 'false'}
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).style.display = 'none';
                                        }}
                                    />
                                    <SkillName variant="body2">{skill.title}</SkillName>
                                    <SkillProgressRow>
                                        <StyledLinearProgress
                                            variant="determinate"
                                            value={percent}
                                            brandcolor={skill.color}
                                        />
                                        <PercentLabel variant="caption">{percent}%</PercentLabel>
                                    </SkillProgressRow>
                                </SkillCard>
                            );
                        })}
                </SkillsGrid>
            </AboutContainer>
        </MainContainer>
    );
};

export default About;

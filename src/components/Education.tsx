import React, { useCallback } from 'react'
import {
    Tabs,
    Tab,
    Typography,
    Box,
    Link, useMediaQuery, useTheme,
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { education } from '../data'
import {
    Facebook,
    Instagram,
    Language,
} from '@mui/icons-material'
import XIcon from '@mui/icons-material/X';
import { styled } from "@mui/material/styles";

const TabStyled = styled(Tabs)(({ theme }) => ({
    borderRight: '1px solid rgb(62, 65, 68)',
    width: '200px',
    height: '100vh',

    [theme.breakpoints.down('md')]: {
        width: 'inherit',
        height: 'inherit',
        maxWidth: 'inherit',
        minWidth: 'inherit',
        borderRight: 'none',
    },
}));

const EducationTab = styled(Tab)(({ theme }) => ({
    '&.Mui-selected': {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.mode === 'light' ? '#EAEDF1' : '#181919',
    },
    '&:hover': {
        backgroundColor: theme.palette.mode === 'light' ? '#EAEDF1' : '#181919',
    },
}));


const StyledLink = styled(Link)`
    color: #999999;
    &:hover {
        color: ${({ theme }) => theme.palette.text.primary };
    }
`;

const ResponsiveBox = styled(Box)(({ theme }) => ({
    height: '200%',
    display: 'block',
    [theme.breakpoints.up('md')]: {
        display: 'flex',
    },
}));


const Education = () => {
    const { t } = useTranslation()
    const [value, setValue] = React.useState<number>(0)
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const iconFontSize = isMobile ? '37px' : '25px';

    const handleChange = useCallback((_event: React.ChangeEvent<object>, newValue: number) => {
        setValue(newValue);
    }, []);

    return (
        <ResponsiveBox>
            <TabStyled
                orientation={isMobile ? 'horizontal' : 'vertical'}
                value={value}
                onChange={handleChange}
                centered={!isMobile}
                sx={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 1,
                    flexShrink: 0
                }}
            >
                {education.map((elem) => (
                    <EducationTab
                        disableFocusRipple
                        label={t(`${elem.school}`)}
                        key={elem.id}
                    />
                ))}
            </TabStyled>
            {education.map((elem) => (
                <TabPanel value={value} index={elem.id} key={elem.id}>
                    {elem.schoolAlias && (
                        <Box component="img" src={`./media/${elem.schoolAlias}.png`} />
                    )}
                    <Box mb={4}>
                        <Typography variant="h5">
                            {t(`experience_${elem.id}_education`)}
                            <Link
                                href={
                                    elem.links.website || elem.links.x || elem.links.facebook || elem.links.instagram
                                }
                                color="#ffffff"
                                target="_blank"
                            ></Link>
                        </Typography>
                        <Typography variant="body2" color="textSecondary" fontSize="14">
                            {t(`experience_${elem.id}_duration`)}
                        </Typography>
                    </Box>
                    <Box mb={4}>
                        <Typography
                            variant="body1"
                            color="textPrimary"
                            sx={{ wordBreak: 'break-word', whiteSpace: 'pre-line' }}
                        >
                            {t(`experience_${elem.id}_overview`)}
                        </Typography>
                    </Box>
                    {elem.links.website || elem.links.x || elem.links.facebook || elem.links.instagram ? (
                        <Box mt={4}>
                            <Box mt={1}>
                                {elem.links.website && (
                                    <StyledLink href={elem.links.website} target="_blank">
                                        <Language sx={{ fontSize: iconFontSize }} />
                                    </StyledLink>
                                )}
                                {elem.links.x && (
                                    <StyledLink href={elem.links.x} target="_blank">
                                        <XIcon sx={{ fontSize: iconFontSize }} />
                                    </StyledLink>
                                )}
                                {elem.links.facebook && (
                                    <StyledLink href={elem.links.facebook} target="_blank">
                                        <Facebook sx={{ fontSize: iconFontSize }} />
                                    </StyledLink>
                                )}
                                {elem.links.instagram && (
                                    <StyledLink href={elem.links.instagram} target="_blank">
                                        <Instagram sx={{ fontSize: iconFontSize }} />
                                    </StyledLink>
                                )}
                            </Box>
                        </Box>
                    ) : null}
                </TabPanel>
            ))}
        </ResponsiveBox>
    )
}

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <Box
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </Box>
    );
}

export default Education
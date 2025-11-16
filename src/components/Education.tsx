import { type ChangeEvent, type ReactNode, useCallback, useState } from 'react'
import {
    Tabs,
    Tab,
    Typography,
    Box,
    Link,
    useMediaQuery,
} from '@mui/material'
import type { TypographyProps } from '@mui/material/Typography';
import type { BoxProps } from '@mui/material/Box';
import { useTranslation } from 'react-i18next'
import { education } from '../data'
import {
    Facebook,
    Instagram,
    Language,
    X
} from '@mui/icons-material'
import { styled } from "@mui/material/styles";

const TabStyled = styled(Tabs)(({ theme }) => ({
    borderRight: `1px solid ${theme.palette.divider}`,
    width: '300px',
    height: '100vh',
    position: 'sticky',
    top: 0,
    zIndex: 1,
    flexShrink: 0,

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
        backgroundColor: theme.palette.action.selected,
    },
    '&:hover': {
        backgroundColor: theme.palette.action.hover,
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

const BreakableTypography = styled(Typography)<TypographyProps>(() => ({
    wordBreak: 'break-word',
    whiteSpace: 'pre-line',
}));

const PaddedBox = styled(Box)<BoxProps>(({ theme }) => ({
    padding: theme.spacing(3),
}));


const Education = () => {
    const { t } = useTranslation()
    const [value, setValue] = useState<number>(0)
    const isMobile = useMediaQuery('(max-width:960px)');
    const iconFontSize = isMobile ? '37px' : '25px';

    const handleChange = useCallback((_event: ChangeEvent<object>, newValue: number) => {
        setValue(newValue);
    }, []);

    return (
        <ResponsiveBox>
            <TabStyled
                orientation={isMobile ? 'horizontal' : 'vertical'}
                value={value}
                onChange={handleChange}
                centered={!isMobile}
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
                        <BreakableTypography
                            variant="body1"
                            color="textPrimary"
                        >
                            {t(`experience_${elem.id}_overview`)}
                        </BreakableTypography>
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
                                        <X sx={{ fontSize: iconFontSize }} />
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
    children?: ReactNode;
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
            {value === index && <PaddedBox>{children}</PaddedBox>}
        </Box>
    );
}

export default Education
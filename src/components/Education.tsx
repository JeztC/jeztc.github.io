import { type ChangeEvent, type ReactNode, useCallback, useState } from 'react'
import {
    Tabs,
    Tab,
    Typography,
    Box,
    Chip,
    Link,
    Tooltip,
    IconButton,
    MenuItem,
    Select,
    FormControl,
    useMediaQuery,
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { education } from '../data'
import {
    Facebook,
    Instagram,
    Language,
    X,
} from '@mui/icons-material'
import { styled } from "@mui/material/styles";

const SidebarTabs = styled(Tabs)(({ theme }) => ({
    borderRight: `1px solid ${theme.palette.divider}`,
    width: 280,
    flexShrink: 0,
    position: 'sticky',
    top: 64,
    maxHeight: 'calc(100vh - 64px)',
    overflowY: 'auto',
}));

const SchoolTab = styled(Tab)(({ theme }) => ({
    alignItems: 'flex-start',
    textAlign: 'left',
    textTransform: 'none',
    minHeight: 88,
    padding: '12px 16px',
    width: '100%',
    maxWidth: '100%',
    borderRadius: 0,
    transition: 'background-color 0.15s ease, color 0.15s ease',
    '&.Mui-selected': {
        backgroundColor: theme.palette.action.selected,
        color: theme.palette.primary.main,
        borderLeft: `3px solid ${theme.palette.primary.main}`,
        paddingLeft: 13,
    },
    '&:hover': {
        backgroundColor: theme.palette.action.hover,
    },
    [theme.breakpoints.down('md')]: {
        minHeight: 80,
        alignItems: 'center',
        borderLeft: 'none',
        paddingLeft: '16px !important',
        '&.Mui-selected': {
            borderLeft: 'none',
        },
    },
}));

const ContentArea = styled(Box)(({ theme }) => ({
    flex: 1,
    padding: theme.spacing(5),
    minWidth: 0,
    [theme.breakpoints.down('md')]: {
        padding: theme.spacing(3, 2),
    },
}));

const SchoolLogoImg = styled('img')(({ theme }) => ({
    width: 120,
    height: 120,
    objectFit: 'contain',
    borderRadius: 16,
    display: 'block',
    marginBottom: 24,
    [theme.breakpoints.down('md')]: {
        width: 90,
        height: 90,
        marginBottom: 16,
    },
}));

const SocialButton = styled(IconButton)(({ theme }) => ({
    color: theme.palette.text.secondary,
    transition: 'color 0.2s ease, transform 0.2s ease',
    '&:hover': {
        color: theme.palette.text.primary,
        transform: 'translateY(-2px)',
        backgroundColor: 'transparent',
    },
}));

interface TabLabelProps {
    school: string;
    alias: string | null;
    isMobile: boolean;
}

const TabLabel = ({ school, alias, isMobile }: TabLabelProps) => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, width: '100%' }}>
        {alias && (
            <Box
                component="img"
                src={`/media/${alias}.png`}
                alt=""
                sx={{
                    width: { xs: 52, md: 44 },
                    height: { xs: 52, md: 44 },
                    objectFit: 'contain',
                    flexShrink: 0,
                    borderRadius: 1,
                }}
            />
        )}
        <Typography
            variant="body2"
            fontWeight={600}
            lineHeight={1.3}
            sx={{ textAlign: 'left', wordBreak: 'break-word', whiteSpace: isMobile ? 'nowrap' : 'normal' }}
        >
            {school}
        </Typography>
    </Box>
);

const Education = () => {
    const { t } = useTranslation();
    const [value, setValue] = useState<number>(0);
    const isMobile = useMediaQuery('(max-width:960px)');

    const handleChange = useCallback((_event: ChangeEvent<object>, newValue: number) => {
        setValue(newValue);
    }, []);

    return (
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, minHeight: 'calc(100vh - 64px)' }}>
            {isMobile ? (
                <Box sx={{ px: 2, pt: 2 }}>
                    <FormControl fullWidth size="small">
                        <Select
                            value={value}
                            onChange={(e) => setValue(e.target.value as number)}
                            renderValue={(v) => (
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                    {education[v as number]?.schoolAlias && (
                                        <Box
                                            component="img"
                                            src={`/media/${education[v as number].schoolAlias}.png`}
                                            alt=""
                                            sx={{ width: 24, height: 24, objectFit: 'contain', flexShrink: 0 }}
                                        />
                                    )}
                                    <Typography variant="body2" fontWeight={600}>
                                        {t(education[v as number]?.school ?? '')}
                                    </Typography>
                                </Box>
                            )}
                        >
                            {education.map((elem, i) => (
                                <MenuItem key={elem.id} value={i}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                        {elem.schoolAlias && (
                                            <Box
                                                component="img"
                                                src={`/media/${elem.schoolAlias}.png`}
                                                alt=""
                                                sx={{ width: 28, height: 28, objectFit: 'contain', flexShrink: 0 }}
                                            />
                                        )}
                                        <Box>
                                            <Typography variant="body2" fontWeight={600}>{t(elem.school)}</Typography>
                                        </Box>
                                    </Box>
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
            ) : (
                <SidebarTabs
                    orientation="vertical"
                    value={value}
                    onChange={handleChange}
                    sx={{ '& .MuiTabs-indicator': { display: 'none' } }}
                >
                    {education.map((elem) => (
                        <SchoolTab
                            key={elem.id}
                            disableFocusRipple
                            label={
                                <TabLabel
                                    school={t(elem.school)}
                                    alias={elem.schoolAlias ?? null}
                                    isMobile={false}
                                />
                            }
                        />
                    ))}
                </SidebarTabs>
            )}

            <ContentArea>
                {education.map((elem) => (
                    <TabPanel value={value} index={elem.id} key={elem.id}>
                        {elem.schoolAlias && (
                            <SchoolLogoImg
                                src={`/media/${elem.schoolAlias}.png`}
                                alt={t(elem.school)}
                            />
                        )}

                        <Typography variant="h5" fontWeight={700} gutterBottom>
                            {t(`experience_${elem.id}_education`)}
                        </Typography>

                        <Chip
                            label={t(`experience_${elem.id}_duration`)}
                            size="small"
                            variant="outlined"
                            color="primary"
                            sx={{ mb: 3, fontWeight: 500 }}
                        />

                        <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8, mb: 3 }}>
                            {t(`experience_${elem.id}_overview`)}
                        </Typography>

                        {(elem.links.website || elem.links.x || elem.links.facebook || elem.links.instagram) && (
                            <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mt: 1 }}>
                                {elem.links.website && (
                                    <Tooltip title="Website">
                                        <SocialButton component={Link} href={elem.links.website} target="_blank" rel="noopener noreferrer">
                                            <Language />
                                        </SocialButton>
                                    </Tooltip>
                                )}
                                {elem.links.x && (
                                    <Tooltip title="X / Twitter">
                                        <SocialButton component={Link} href={elem.links.x} target="_blank" rel="noopener noreferrer">
                                            <X />
                                        </SocialButton>
                                    </Tooltip>
                                )}
                                {elem.links.facebook && (
                                    <Tooltip title="Facebook">
                                        <SocialButton component={Link} href={elem.links.facebook} target="_blank" rel="noopener noreferrer">
                                            <Facebook />
                                        </SocialButton>
                                    </Tooltip>
                                )}
                                {elem.links.instagram && (
                                    <Tooltip title="Instagram">
                                        <SocialButton component={Link} href={elem.links.instagram} target="_blank" rel="noopener noreferrer">
                                            <Instagram />
                                        </SocialButton>
                                    </Tooltip>
                                )}
                            </Box>
                        )}
                    </TabPanel>
                ))}
            </ContentArea>
        </Box>
    );
};

interface TabPanelProps {
    children?: ReactNode;
    index: number;
    value: number;
}

function TabPanel({ children, value, index }: TabPanelProps) {
    return (
        <Box hidden={value !== index}>
            {value === index && children}
        </Box>
    );
}

export default Education;

import React, { ReactNode } from 'react'
import {
    Tabs,
    Tab,
    Typography,
    Box,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Link,
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { education } from '../data'
import ShowMoreText from 'react-show-more-text'
import {
    Facebook,
    Instagram,
    Language,
} from '@mui/icons-material'
import XIcon from '@mui/icons-material/X';
import { css } from "@emotion/react";
import { isMobile } from 'react-device-detect';
import { styled } from "@mui/material/styles";

const Root = styled('div')`
    flex-grow: 1;
    display: flex;
    width: 100%;
    height: 100%;
    margin-top: 120px;
    margin-left: ${() => (isMobile ? '20px' : '250px')};
    flex-direction: ${() => (isMobile ? 'column' : 'row')};
    ${() => isMobile && 'padding-bottom: 100px;'}
`

const TabStyled = styled(Tabs)`
    ${() => (isMobile ? css`
    width: inherit;
    height: inherit;
    max-width: inherit;
    min-width: inherit;
  ` : css`
    border-right: 1px solid rgb(62, 65, 68);
    width: 200px;
    height: 550px;
  `)}
`;

const EducationTab = styled(Tab)`
    ${({ theme }) => css`
    &.Mui-hover {
      color: ${theme.palette.mode === 'light' ? '#EAEDF1' : '#181919'} !important;
    }
    
    &.Mui-selected {
      color: ${theme.palette.mode === 'light' ? '#000' : '#fff'} !important;
      background-color: ${theme.palette.mode === 'light' ? '#EAEDF1' : '#181919'};
    }
    
    &:hover {
      background-color: ${theme.palette.mode === 'light' ? '#EAEDF1' : '#181919'};
    }
  `}
`;

const TabShowMore = styled(ShowMoreText)`
    margin-top: 30px;
    margin-bottom: 30px;
`

const StyledTableContainer = styled(TableContainer)`
    & .MuiTableCell-root {
        border: 1px solid rgb(62, 65, 68);
    }
`;

const StyledLink = styled(Link)`
    color: #999999;
    &:hover {
        color: ${({ theme }) => theme.palette.mode === 'light' ? 'black' : 'white'};
    }
`;

const Education = () => {
    const { t } = useTranslation()
    const [value, setValue] = React.useState<number>(0)
    const [expand, setExpand] = React.useState<boolean>(false)
    const iconFontSize = isMobile ? '37px' : '25px';

    const onClick = () => {
        setExpand(!expand)
    }

    const handleChange = (event: React.ChangeEvent<object>, newValue : number) => {
        setValue(newValue)
    }

    return (
        <Box
            sx={{ flexGrow: 1, display: 'flex', height: '200%' }}
        >
            <TabStyled
                orientation={isMobile ? 'horizontal' : 'vertical'}
                value={value}
                onChange={handleChange}
                centered={isMobile ? false : true}
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
                    {elem.schoolLogo && (
                        <Box component="img" src={elem.schoolLogo} />
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
                        <Typography variant="body1" color="textPrimary">
                            {t(`experience_${elem.id}_overview`)}
                        </Typography>
                    </Box>
                    {elem.courses && (
                        <TabShowMore
                            onClick={onClick}
                            expanded={expand}
                            more={t("show_courses")}
                            less={t("hide_courses")}
                            truncatedEndingComponent=""
                            width={expand ? 1000 : 1}
                        >
                            {<StyledTableContainer>
                                <Table aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>
                                                <b>{t('course_name')}</b>
                                            </TableCell>
                                            <TableCell align="center">
                                                <b>{t('school_name')}</b>
                                            </TableCell>
                                            <TableCell align="right">
                                                <b>{t('grade')}</b>
                                            </TableCell>
                                            <TableCell align="right">
                                                <b>{t('completed_date')}</b>
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {elem.courses.map((course) => (
                                            <TableRow key={course.courseName}>
                                                <TableCell component="th" scope="row">
                                                    <Link href={course.courseLink} target={`_blank`}>{course.courseName}</Link>
                                                </TableCell>
                                                <TableCell align="center"><Link href={course.schoolLink} target={`_blank`}>{course.schoolName}</Link></TableCell>
                                                <TableCell align="right">{course.grade}</TableCell>
                                                <TableCell align="right">{course.dateFinished}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </StyledTableContainer>}
                        </TabShowMore>
                    )}
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
        </Box>
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
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

export default Education
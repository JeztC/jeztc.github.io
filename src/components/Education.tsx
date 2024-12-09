import React, {ReactNode} from 'react'
import {
    Tabs,
    Tab,
    Typography,
    Box,
    useMediaQuery,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    useTheme as useMuiTheme,
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
import styled from "@emotion/styled";
import {css} from "@emotion/react";
import { useTheme } from '../themes/theme-context'

const Root = styled.div`
  flex-grow: 1;
  display: flex;
  width: 100%;
  height: 100%;
  ${() => {
    const theme = useMuiTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
    return isMobile
            ? css`
    flex-direction: column;
    margin-left: 20px;
    padding-bottom: 100px;
    ` : css`
    margin-left: 250px;
    flex-direction: row;
    `
  }}
  margin-top: 120px;
`

const TabStyled = styled(Tabs)`
${() => {
    const theme = useMuiTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
    return isMobile
            ? css`
    width: inherit;
    height: inherit;
    max-width: inherit;
    min-width: inherit;
    ` : css`
    border-right: 1px solid #2C394B;
    width: 200px;
    height: 550px;
    `
  }}
`

const EducationTab = styled(Tab)`
  ${() => {
    const currentTheme = useTheme().theme;
    return currentTheme.palette.mode === 'light'
        ? css`
        &.Mui-hover {
            color: #EAEDF1;
        }
        &.Mui-selected {
            color: #000 !important;
            background-color: #EAEDF1;
        }
        &:hover {
            background-color: #EAEDF1;
        }
      ` : css`
      &.Mui-hover {
          color: #161A20 !important;
      }
      &.Mui-selected {
          color: #fff !important;
          background-color: #161A20;
      }
      &:hover {
          background-color: #161A20;
      }
    `
  }}
`;


const TabShowMore = styled(ShowMoreText)`
  margin-top: 30px;
  margin-bottom: 30px;
`

const StyledTableContainer = styled(TableContainer)`
  '& .MuiTableCell-root': {
    border-top: 1px solid rgba(224, 224, 224, 1);
    border-right: 1px solid rgba(224, 224, 224, 1);
    border-left: 1px solid rgba(224, 224, 224, 1);
}
`

const StyledLink = styled(Link)`
  color: #999999;
  ${() => {
    const currentTheme = useTheme().theme;
    return currentTheme.palette.mode === 'light'
            ? css`
      &:hover {
        color: black;
      }
    ` : css`
      &:hover {
        color: white;
      }
    `
  }}
`

const Education = () => {
    const theme = useMuiTheme()
    const { t } = useTranslation()
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
    const [value, setValue] = React.useState<number>(0)
    const [expand, setExpand] = React.useState<boolean>(false)
    const iconFontSize = isMobile ? '37px' : '25px';

    const onClick = () => {
        setExpand(!expand)
    }

    const handleChange = (event: React.ChangeEvent<{}>, newValue : number) => {
        setValue(newValue)
    }

    return (
        <Root>
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
                                    elem.links.website || elem.links.facebook || elem.links.instagram
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
                            truncatedEndingComponent=""
                            width={30}
                        >
                            <StyledTableContainer>
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
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </StyledTableContainer>
                        </TabShowMore>
                    )}
                    {elem.links.website || elem.links.facebook || elem.links.instagram ? (
                        <Box mt={4}>
                            <Box mt={1}>
                                {elem.links.website && (
                                    <StyledLink href={elem.links.website} target="_blank">
                                        <Language sx={{ fontSize: iconFontSize }} />
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
        </Root>
    )
}

const TabPanel: React.FC<{ children : ReactNode, value: number; index: number }> = (props) => {
    const { children, value, index, ...other } = props
    const theme = useMuiTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3} minHeight={isMobile ? 0 : "250px"}>
                    <div style={{ maxWidth: 700 }}>{children}</div>
                </Box>
            )}
        </div>
    )
}
export default Education
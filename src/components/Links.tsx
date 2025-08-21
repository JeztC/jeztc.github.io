import { Email, GitHub, LinkedIn } from "@mui/icons-material";
import Icon from "./Icon";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";

const LinksContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingTop: '150px',
    marginBottom: 0,

    [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
        paddingTop: '40px',
        marginBottom: '150px',
    },
}));

const Box = styled('div')`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 250px;
    height: 250px;
    margin: 20px;
    background-color: inherit;
    transition: all 0.2s;
`;

const Links = () => {
    const { t } = useTranslation()
    return (
        <LinksContainer>
            <Box>
                <Icon size={250} href="https://github.com/JeztC/" target="_blank">
                    <GitHub />
                </Icon>
                <p>GitHub</p>
            </Box>
            <Box>
                <Icon size={250} href={`mailto:"jesse.lagland@gmail.com"`} target="_blank">
                    <Email />
                </Icon>
                <p>{t('links_email')}</p>
            </Box>
            <Box>
                <Icon size={250} href={`https://www.linkedin.com/in/jesse-l%C3%A5gland-3213a0347/`} target="_blank">
                    <LinkedIn />
                </Icon>
                <p>LinkedIn</p>
            </Box>
        </LinksContainer>
    )
}

export default Links
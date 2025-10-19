import { Email, GitHub, LinkedIn } from "@mui/icons-material";
import Icon from "./Icon";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import { Box, Typography } from "@mui/material";
import { LinkItem } from "../interfaces/linkItem";

const LinksContainer = styled(Box)(({ theme }) => ({
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

const LinksBox = styled(Box)`
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

const linksData: LinkItem[] = [
    {
        label: "GitHub",
        icon: <GitHub />,
        href: import.meta.env.VITE_USER_URL,
    },
    {
        label: "links_email",
        icon: <Email />,
        href: `mailto:${import.meta.env.VITE_USER_EMAIL}`,
    },
    {
        label: "LinkedIn",
        icon: <LinkedIn />,
        href: import.meta.env.VITE_LINKEDIN_URL,
    },
];


const Links = () => {
    const { t } = useTranslation();

    return (
        <LinksContainer>
            {linksData.map((link, index) => (
                <LinksBox key={index}>
                    <Icon size={250} href={link.href} target="_blank">
                        {link.icon}
                    </Icon>
                    <Typography variant="body1">
                        {link.label === "links_email" ? t(link.label) : link.label}
                    </Typography>
                </LinksBox>
            ))}
        </LinksContainer>
    );
};


export default Links
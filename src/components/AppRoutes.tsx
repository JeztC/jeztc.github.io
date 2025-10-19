import { Navigate, Route, Routes } from "react-router-dom";
import {
    AccountCircle,
    School,
    GitHub,
    Link as LinkIcon,
    Folder, Work,
} from "@mui/icons-material";
import Education from "./Education";
import About from "./About";
import Experience from "./Experience";
import Projects from "./Projects";
import Github from "./Github";
import Links from "./Links";

export const routesConfig = [
    { path: '/', labelKey: 'menu_about', icon: <AccountCircle />, element: <About /> },
    { path: '/education', labelKey: 'menu_education', icon: <School />, element: <Education /> },
    { path: '/experience', labelKey: 'menu_experience', icon: <Work />, element: <Experience /> },
    { path: '/projects', labelKey: 'menu_projects', icon: <Folder />, element: <Projects /> },
    { path: '/github', labelKey: 'menu_github', icon: <GitHub />, element: <Github /> },
    { path: '/links', labelKey: 'menu_links', icon: <LinkIcon />, element: <Links /> },
];

const AppRoutes = () => (
    <Routes>
        {routesConfig.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
        ))}
        <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
);

export default AppRoutes;
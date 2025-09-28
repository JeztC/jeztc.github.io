import { Navigate, Route, Routes } from "react-router-dom";
import About from "./About";
import Education from "./Education";
import Experience from "./Experience";
import Links from "./Links";
import Projects from "./Projects";
import Github from "./Github";
import React from "react";
import { CVPage } from "./CVPage";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<About/>} />
            <Route path="/education" element={<Education/>} />
            <Route path="/experience" element={<Experience/>} />
            <Route path="/links" element={<Links/>} />
            <Route path="/projects" element={<Projects/>} />
            <Route path="/github" element={<Github/>} />
            <Route path="/cvpage" element={<CVPage/>} />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}

export default AppRoutes;
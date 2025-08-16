import { Navigate, Route, Routes } from "react-router-dom";
import About from "./About";
import Education from "./Education";
import Experience from "./Experience";
import Links from "./Links";
import Projects from "./Projects";
import Github from "./Github";
import PageNotFound from "./PageNotFound";
import React from "react";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/about" element={<About/>} />
            <Route path="/education" element={<Education/>} />
            <Route path="/experience" element={<Experience/>} />
            <Route path="/links" element={<Links/>} />
            <Route path="/projects" element={<Projects/>} />
            <Route path="/github" element={<Github/>} />
            <Route path="/" element={<Navigate replace to="/about" />} />
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    );
}

export default AppRoutes;
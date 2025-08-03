import React, { Fragment } from 'react';
import {
    BrowserRouter as Router,
    Routes, Route, Navigate
} from "react-router-dom"
import About from "./components/About";
import CssBaseline from '@mui/material/CssBaseline';
import Education from "./components/Education";
import Header from "./components/Header";
import Links from "./components/Links";
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Github from "./components/Github";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import PageNotFound from './components/PageNotFound';

const App = () => {
    return (
        <>
            <CssBaseline />
            <Router>
                <Fragment>
                    <Header/>
                    <TransitionGroup>
                        <CSSTransition
                            in={true}
                            appear={true}
                            timeout={300}
                            classNames="slide"
                        >
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
                        </CSSTransition>
                    </TransitionGroup>
                </Fragment>
            </Router>
        </>
    )
}

export default App;
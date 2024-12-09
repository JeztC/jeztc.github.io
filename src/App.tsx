import React, {Fragment} from 'react';
import {
    BrowserRouter as Router,
    Routes, Route, Navigate
} from "react-router-dom"
import About from "./components/About";
import Footer from "./components/Footer";
import {ThemeProvider, Theme} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {ThemeContext} from './themes/theme-context';
import Education from "./components/Education";
import Header from "./components/Header";
import FloatingIcons from "./components/FloatingIcons";
import Contact from "./components/Contact";
import Links from "./components/Links";
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import './index.css'
import {darkTheme, lightTheme} from "./themes/theme-context";
import GithubCard from "./components/GithubCard";

const App = () => {
    const initialTheme = localStorage.getItem('mode') === 'light' ? lightTheme : darkTheme;
    const [mode, setMode] = React.useState<'light' | 'dark'>(localStorage.getItem('mode') as 'light' | 'dark');
    const [theme, setTheme] = React.useState<Theme>(initialTheme);

    const toggleMode = () => {
        const newMode = mode === 'light' ? 'dark' : 'light';
        setMode(newMode);
        localStorage.setItem('mode', newMode);
    };

    React.useEffect(() => {
        const newMode = mode === 'light' ? 'dark' : 'light';
        setTheme(newMode === 'light' ? darkTheme : lightTheme);
    }, [mode]);

    return (
        <ThemeProvider theme={theme}>
            <ThemeContext.Provider value={{ theme, toggleMode }}>
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
                                    <Route path="/contact" element={<Contact/>} />
                                    <Route path="/links" element={<Links/>} />
                                    <Route path="/github" element={<GithubCard/>} />
                                    <Route path="/" element={<Navigate replace to="/about" />} />
                                </Routes>
                            </CSSTransition>
                        </TransitionGroup>
                        <Footer/>
                    </Fragment>
                    <FloatingIcons />
                </Router>
            </ThemeContext.Provider>
        </ThemeProvider>
    )
}

export default App;
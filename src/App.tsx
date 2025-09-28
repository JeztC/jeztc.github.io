import { Fragment } from 'react';
import {
    BrowserRouter as Router,
} from "react-router-dom"
import CssBaseline from '@mui/material/CssBaseline';
import Header from "./components/Header";
import AppRoutes from "./components/AppRoutes";
import React from "react";

const App = () => {
    return (
        <>
            <CssBaseline />
            <Router>
                <Fragment>
                    <Header/>
                    <AppRoutes/>
                </Fragment>
            </Router>
        </>
    )
}

export default App;
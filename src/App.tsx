import { Fragment } from 'react';
import {
    BrowserRouter as Router,
} from "react-router-dom"
import CssBaseline from '@mui/material/CssBaseline';
import Header from "./components/Header";
import AppRoutes from "./components/AppRoutes";
import { ThemeProvider } from "./themes/ThemeContext";

const App = () => {
    return (
        <>
            <ThemeProvider>
                <CssBaseline />
                <Router>
                    <Fragment>
                        <Header/>
                        <AppRoutes/>
                    </Fragment>
                </Router>
            </ThemeProvider>
        </>
    )
}

export default App;
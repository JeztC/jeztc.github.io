import { Fragment } from 'react';
import {
    BrowserRouter as Router,
} from "react-router-dom"
import CssBaseline from '@mui/material/CssBaseline';
import Header from "./components/Header";
import AppRoutes from "./components/AppRoutes";
import { theme } from "./themes/theme";
import { ThemeProvider } from "@mui/material";

const App = () => {
    return (
        <>
            <ThemeProvider theme={theme} defaultMode='system' >
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
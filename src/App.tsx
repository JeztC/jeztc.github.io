import { Box } from "@mui/material";
import {
    BrowserRouter as Router,
} from "react-router-dom"
import Header from "./components/Header";
import AppRoutes from "./components/AppRoutes";
import Footer, { FOOTER_HEIGHT } from "./components/Footer";
import { ThemeProvider } from "./themes/ThemeContext";

const App = () => {
    return (
        <ThemeProvider>
            <Router>
                <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                    <Header/>
                    <Box
                        component="main"
                        sx={{ flex: 1, display: 'flex', flexDirection: 'column', paddingBottom: `${FOOTER_HEIGHT}px` }}
                    >
                        <AppRoutes/>
                    </Box>
                    <Footer/>
                </Box>
            </Router>
        </ThemeProvider>
    )
}

export default App;
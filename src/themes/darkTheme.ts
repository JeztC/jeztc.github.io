import { createTheme } from "@mui/material/styles";

export const darkTheme = createTheme({
    typography: {
        fontFamily: '"Segoe UI", "Helvetica", "Arial", sans-serif',
    },
    palette: {
        background: {
            default: 'black',
        },
        mode: 'dark',
        primary: {
            main: '#308fe8'
        },
        text: {
            primary: "#FFFFFF"
        },
    },
});
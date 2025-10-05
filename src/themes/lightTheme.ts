import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
    typography: {
        fontFamily: '"Segoe UI", "Helvetica", "Arial", sans-serif',
    },
    palette: {
        mode: 'light',
        background: {
            default: 'white',
        },
        primary: {
            main: '#308fe8',
        },
        text: {
            primary: '#000000',
        },
    },
});

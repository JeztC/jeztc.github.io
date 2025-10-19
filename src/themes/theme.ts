import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
    typography: {
        fontFamily: '"Segoe UI", "Helvetica", "Arial", sans-serif',
    },
    colorSchemes: {
        light: {
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
        },
        dark: {
            palette: {
                mode: 'dark',
                background: {
                    default: '#000',
                },
                primary: {
                    main: '#308fe8',
                },
                text: {
                    primary: '#FFFFFF',
                },
            },
        },
    },
});
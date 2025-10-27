import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
    typography: {
        fontFamily: '"Segoe UI", "Helvetica", "Arial", sans-serif',
    },
    components: {
        MuiTooltip: {
            styleOverrides: {
                tooltip: {
                    backgroundColor: '#1B1A1A',
                    color: '#fff',
                    backdropFilter: 'none',
                    boxShadow: 'none',
                },
                arrow: {
                    color: '#333',
                },
            },
        },
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
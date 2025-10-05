import React, { createContext, useContext, useMemo, useState } from 'react';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { useMediaQuery } from "@mui/material";

const darkTheme = createTheme({
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

const lightTheme = createTheme({
    typography: {
        fontFamily: '"Segoe UI", "Helvetica", "Arial", sans-serif',
    },
    palette: {
        mode: 'light',
        background: {
            default: 'white',
        },
        primary: {
            main: '#308fe8'
        },
        text: {
            primary: '#000000',
        },
    },
});

const ThemeContext = createContext({
    theme: darkTheme,
    toggleMode: () => {},
});

export function useTheme() {
    return useContext(ThemeContext);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const [mode, setMode] = useState<'light' | 'dark'>(prefersDarkMode ? 'dark' : 'light');

    const theme = useMemo(() => (
        mode === 'light' ? lightTheme : darkTheme
    ), [mode]);

    const toggleMode = () => {
        setMode(prev => (prev === 'light' ? 'dark' : 'light'));
    };

    return (
        <MuiThemeProvider theme={theme}>
            <ThemeContext.Provider value={{ theme, toggleMode }}>
                {children}
            </ThemeContext.Provider>
        </MuiThemeProvider>
    );
}

export { ThemeContext, darkTheme, lightTheme };
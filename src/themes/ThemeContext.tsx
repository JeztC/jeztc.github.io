import React, { createContext, useContext, useState } from 'react';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';

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
        secondary: {
            main: '#fff',
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
        secondary: {
            main: '#000',
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
    const [mode, setMode] = useState<'light' | 'dark'>(
        () => (localStorage.getItem('mode') as 'light' | 'dark') || 'dark'
    );

    const theme = mode === 'light' ? lightTheme : darkTheme;

    const toggleMode = () => {
        const newMode = mode === 'light' ? 'dark' : 'light';
        localStorage.setItem('mode', newMode);
        setMode(newMode);
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
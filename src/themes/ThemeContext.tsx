import React, { createContext, useContext, useMemo, useState, useEffect } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { PaletteMode, useMediaQuery } from '@mui/material';
import CssBaseline from "@mui/material/CssBaseline";

const darkTheme = createTheme({
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
    palette: {
        mode: 'dark',
        background: {
            default: 'black',
        },
        primary: {
            main: '#308fe8',
        },
        text: {
            primary: '#FFFFFF',
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
        secondary: {
            main: '#000',
        },
    },
});

const ThemeContext = createContext({
    theme: darkTheme,
    toggleMode: () => {},
});

function useTheme() {
    return useContext(ThemeContext);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    const getInitialMode = (): PaletteMode => {
        const saved = localStorage.getItem('mui-mode');
        if (saved === 'light' || saved === 'dark') return saved;
        return prefersDarkMode ? 'dark' : 'light';
    };

    const [mode, setMode] = useState<PaletteMode>(getInitialMode);

    useEffect(() => {
        localStorage.setItem('mui-mode', mode);
    }, [mode]);

    const theme = useMemo(() => (mode === 'light' ? lightTheme : darkTheme), [mode]);

    const toggleMode = () => {
        setMode(prev => (prev === 'light' ? 'dark' : 'light'));
    };

    return (
        <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <ThemeContext.Provider value={{ theme, toggleMode }}>
                {children}
            </ThemeContext.Provider>
        </MuiThemeProvider>
    );
}

export { useTheme, ThemeContext, darkTheme, lightTheme };
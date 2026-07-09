import React, { createContext, useContext, useMemo, useState, useEffect } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { GlobalStyles, PaletteMode, useMediaQuery } from '@mui/material';
import CssBaseline from "@mui/material/CssBaseline";

const themeTransition = 'background-color 0.25s ease, color 0.25s ease, border-color 0.25s ease';
const globalThemeTransition = 'background-color 0.25s ease, border-color 0.25s ease';

const sharedComponents = {
    MuiCssBaseline: {
        styleOverrides: {
            body: {
                transition: themeTransition,
                WebkitFontSmoothing: 'antialiased',
                MozOsxFontSmoothing: 'grayscale',
                textRendering: 'optimizeLegibility',
                fontFeatureSettings: '"kern" 1, "liga" 1, "calt" 1',
            },
        },
    },
    MuiPaper: {
        styleOverrides: {
            root: {
                transition: `${themeTransition}, box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms`,
            },
        },
    },
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
};

const darkTheme = createTheme({
    typography: {
        fontFamily: '"Inter Variable", "Inter", "Segoe UI", sans-serif',
    },
    components: sharedComponents,
    palette: {
        mode: 'dark',
        background: { default: 'black' },
        primary: { main: '#4CC2FF' },
        text: { primary: '#FFFFFF' },
        secondary: { main: '#fff' },
    },
});

const lightTheme = createTheme({
    typography: {
        fontFamily: '"Inter Variable", "Inter", "Segoe UI", sans-serif',
    },
    components: sharedComponents,
    palette: {
        mode: 'light',
        background: { default: 'white' },
        primary: { main: '#0067C0' },
        text: { primary: '#000000' },
        secondary: { main: '#000' },
    },
});

const globalTransitionStyles = {
    '*, *::before, *::after': {
        transition: globalThemeTransition,
    },
};

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
        document.documentElement.style.backgroundColor = mode === 'dark' ? '#000000' : '#ffffff';
    }, [mode]);

    const theme = useMemo(() => (mode === 'light' ? lightTheme : darkTheme), [mode]);

    const toggleMode = () => {
        setMode(prev => (prev === 'light' ? 'dark' : 'light'));
    };

    return (
        <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <GlobalStyles styles={globalTransitionStyles} />
            <ThemeContext.Provider value={{ theme, toggleMode }}>
                {children}
            </ThemeContext.Provider>
        </MuiThemeProvider>
    );
}

export { useTheme, ThemeContext, darkTheme, lightTheme };

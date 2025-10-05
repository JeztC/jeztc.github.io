import React, { createContext, useContext, useMemo, useState } from 'react';
import { PaletteMode, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { useMediaQuery } from "@mui/material";
import { lightTheme } from "./lightTheme";
import { darkTheme } from "./darkTheme";

const ThemeContext = createContext({
    theme: lightTheme,
    toggleMode: () => {},
});

function ThemeProvider({ children }: { children: React.ReactNode }) {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const [mode, setMode] = useState<PaletteMode>(prefersDarkMode ? 'dark' : 'light');

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

function useTheme() {
    return useContext(ThemeContext);
}

export { ThemeContext, ThemeProvider, useTheme };
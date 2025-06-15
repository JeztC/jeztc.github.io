import {createContext, useContext} from 'react';
import { createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
    palette: {
        background: {
            default: '#000000',
        },
        mode: 'dark',
        primary: {
            main: 'rgb(26, 140, 216)'
        },
        secondary: {
            main: '#fff', // this is the secondary color
        },
    },
});

const lightTheme = createTheme({
    palette: {
        mode: 'light',
        background: {
            default: 'white',
        },
        primary: {
            main: 'rgb(26, 140, 216)'
        },
        text: {
            primary: '#000000',
        },
        secondary: {
            main: '#000', // this is the secondary color
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

export { ThemeContext, darkTheme, lightTheme };
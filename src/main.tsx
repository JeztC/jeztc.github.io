import ReactDOM from 'react-dom/client';
import App from './App';
import './i18n';
import React from 'react';
import { ThemeProvider } from "./themes/ThemeContext";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <ThemeProvider>
        <App/>
    </ThemeProvider>
);
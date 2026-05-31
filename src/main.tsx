import '@fontsource-variable/inter';
import ReactDOM from 'react-dom/client';
import App from './App';
import './i18n';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<App/>);

requestAnimationFrame(() => {
    requestAnimationFrame(() => {
        document.documentElement.classList.remove('preload');
    });
});
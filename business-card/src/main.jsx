import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

const root = createRoot(document.querySelector('div#root'));

root.render(
    <>
        <App />
    </>
);

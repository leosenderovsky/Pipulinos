import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BRAND_CONFIG } from './brand.config';

const root = document.documentElement;

for (const [name, value] of Object.entries(BRAND_CONFIG.theme)) {
  const cssName = name.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
  root.style.setProperty(`--brand-${cssName}`, value);
}

root.style.setProperty('--brand-font-headings', BRAND_CONFIG.typography.headings);
root.style.setProperty('--brand-font-body', BRAND_CONFIG.typography.body);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

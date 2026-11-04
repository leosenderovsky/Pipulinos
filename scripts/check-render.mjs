import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { createServer } from 'vite';

globalThis.localStorage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
};

const server = await createServer({
  configFile: './vite.config.ts',
  server: { middlewareMode: true },
  appType: 'custom',
});

try {
  const { default: App } = await server.ssrLoadModule('/src/App.tsx');
  const markup = renderToStaticMarkup(React.createElement(App));
  if (!markup.includes('<main') || markup.length === 0) {
    throw new Error('App did not render the catalog page.');
  }
  console.log(`Render correcto: ${markup.length} caracteres.`);
} finally {
  await server.close();
}

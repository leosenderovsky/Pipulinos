import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { defineConfig, loadEnv, type Plugin } from 'vite';
import { BRAND_CONFIG } from './src/brand.config.ts';

function brandMetadataPlugin(siteUrl: string): Plugin {
  const publicUrl = (asset: string) => (siteUrl ? new URL(asset, siteUrl).href : asset);
  const title = `${BRAND_CONFIG.shortName} - ${BRAND_CONFIG.seo.titleSuffix}`;
  const replacements: Record<string, string> = {
    __BRAND_TITLE__: title,
    __BRAND_DESCRIPTION__: BRAND_CONFIG.seo.description,
    __BRAND_IMAGE__: publicUrl(BRAND_CONFIG.seo.socialImage),
    __BRAND_CANONICAL__: publicUrl('/'),
    __BRAND_FAVICON_32__: BRAND_CONFIG.logo.faviconUrl,
    __BRAND_APPLE_ICON__: BRAND_CONFIG.logo.appleTouchIconUrl,
    __BRAND_FONT_STYLESHEET__: BRAND_CONFIG.typography.stylesheetUrl,
  };

  return {
    name: 'brand-metadata',
    transformIndexHtml(html) {
      return Object.entries(replacements).reduce(
        (result, [placeholder, value]) =>
          result.replaceAll(placeholder, value.replaceAll('&', '&amp;').replaceAll('"', '&quot;')),
        html,
      );
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  const siteUrl =
    env.VITE_SITE_URL?.trim() ||
    process.env.DEPLOY_PRIME_URL?.trim() ||
    process.env.URL?.trim() ||
    '';

  if (siteUrl) new URL(siteUrl);

  return {
    plugins: [react(), tailwindcss(), brandMetadataPlugin(siteUrl)],
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});

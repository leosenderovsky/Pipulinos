import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { defineConfig, loadEnv, type Plugin, type PluginOption } from 'vite';
import { BRAND_CONFIG } from './src/brand.config.ts';

type SiteUrlSource = 'VITE_SITE_URL' | 'URL' | 'DEPLOY_PRIME_URL' | 'none';

interface SiteUrlResolution {
  url: string;
  source: SiteUrlSource;
}

interface SiteUrlEnv {
  VITE_SITE_URL?: string;
  CONTEXT?: string;
  URL?: string;
  DEPLOY_PRIME_URL?: string;
}

function resolveSiteUrl(env: SiteUrlEnv): SiteUrlResolution {
  const viteSiteUrl = env.VITE_SITE_URL?.trim();
  if (viteSiteUrl) {
    new URL(viteSiteUrl);
    return { url: viteSiteUrl, source: 'VITE_SITE_URL' };
  }

  const candidates =
    env.CONTEXT === 'production'
      ? [
          { value: env.URL, source: 'URL' as const },
          { value: env.DEPLOY_PRIME_URL, source: 'DEPLOY_PRIME_URL' as const },
        ]
      : [
          { value: env.DEPLOY_PRIME_URL, source: 'DEPLOY_PRIME_URL' as const },
          { value: env.URL, source: 'URL' as const },
        ];
  const selected = candidates.find(({ value }) => value?.trim());

  if (!selected) return { url: '', source: 'none' };

  const url = selected.value!.trim();
  new URL(url);
  return { url, source: selected.source };
}

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

interface BuildInfo {
  commit: string;
  commitShort: string;
  branch: string;
  context: string;
  deployId: string | null;
  builtAt: string;
  siteUrl: string;
  siteUrlSource: SiteUrlSource;
  env: {
    VITE_SITE_URL: boolean;
    VITE_DEMO_BRAND_NAME: boolean;
    VITE_DEMO_BRAND_URL: boolean;
  };
}

function buildInfoPlugin(info: BuildInfo): Plugin {
  return {
    name: 'build-info',
    apply: 'build',
    buildStart() {
      console.info(
        `[build-info] commit=${info.commit} contexto=${info.context} URL=${info.siteUrl || '(vacía)'} fuente=${info.siteUrlSource}`,
      );
      if (!info.env.VITE_SITE_URL) {
        console.warn(
          'VITE_SITE_URL no definida: se usa la URL de Netlify; definila al conectar un dominio propio',
        );
      }
      if (info.siteUrlSource === 'none') {
        console.warn('No se pudo resolver la URL pública del sitio.');
      }
    },
    transformIndexHtml(html) {
      return html.replace(
        /<head\b[^>]*>/i,
        (head) => `${head}<meta name="build-commit" content="${info.commitShort}">`,
      );
    },
    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: 'build-info.json',
        source: JSON.stringify(info, null, 2),
      });
    },
  };
}

function gitValue(args: string[]): string {
  try {
    return execFileSync('git', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim() || 'unknown';
  } catch {
    return 'unknown';
  }
}

export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  const siteUrlEnv = {
    VITE_SITE_URL: env.VITE_SITE_URL ?? process.env.VITE_SITE_URL,
    CONTEXT: process.env.CONTEXT,
    URL: process.env.URL,
    DEPLOY_PRIME_URL: process.env.DEPLOY_PRIME_URL,
  };
  const siteUrl = resolveSiteUrl(siteUrlEnv);
  const plugins: PluginOption[] = [react(), tailwindcss(), brandMetadataPlugin(siteUrl.url)];

  if (command === 'build') {
    const commit = process.env.COMMIT_REF?.trim() || gitValue(['rev-parse', 'HEAD']);
    const branch = process.env.BRANCH?.trim() || gitValue(['rev-parse', '--abbrev-ref', 'HEAD']);
    const buildInfo: BuildInfo = {
      commit,
      commitShort: commit.slice(0, 7),
      branch,
      context: process.env.CONTEXT || 'local',
      deployId: process.env.DEPLOY_ID || null,
      builtAt: new Date().toISOString(),
      siteUrl: siteUrl.url,
      siteUrlSource: siteUrl.source,
      env: {
        VITE_SITE_URL: Boolean(siteUrlEnv.VITE_SITE_URL?.trim()),
        VITE_DEMO_BRAND_NAME: Boolean(env.VITE_DEMO_BRAND_NAME?.trim() || process.env.VITE_DEMO_BRAND_NAME?.trim()),
        VITE_DEMO_BRAND_URL: Boolean(env.VITE_DEMO_BRAND_URL?.trim() || process.env.VITE_DEMO_BRAND_URL?.trim()),
      },
    };
    plugins.push(buildInfoPlugin(buildInfo));
  }

  return {
    plugins,
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

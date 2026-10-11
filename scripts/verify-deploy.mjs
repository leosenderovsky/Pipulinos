#!/usr/bin/env node
import { execFileSync } from 'node:child_process';

const [, , siteArg] = process.argv;

if (!siteArg) {
  console.error('Uso: npm run verify:deploy -- https://<sitio>.netlify.app');
  process.exit(1);
}

function normalizeSiteUrl(value) {
  try {
    const url = new URL(value);
    url.hash = '';
    return url.href.replace(/\/+$/, '');
  } catch {
    throw new Error(`URL invalida: ${value}`);
  }
}

function absoluteUrl(value, baseUrl) {
  if (!value) return null;
  try {
    return new URL(value, baseUrl).href;
  } catch {
    return null;
  }
}

function getAttr(html, selectorAttr, selectorValue, attrName) {
  const tagPattern = new RegExp(`<[^>]+${selectorAttr}=["']${selectorValue}["'][^>]*>`, 'i');
  const tag = html.match(tagPattern)?.[0];
  if (!tag) return null;
  const attrPattern = new RegExp(`${attrName}=["']([^"']+)["']`, 'i');
  return tag.match(attrPattern)?.[1] ?? null;
}

async function fetchJson(url) {
  const response = await fetch(url, { headers: { Accept: 'application/json' } });
  if (!response.ok) {
    throw new Error(`${url} respondio HTTP ${response.status}`);
  }
  return response.json();
}

async function fetchText(url) {
  const response = await fetch(url, { headers: { Accept: 'text/html' } });
  if (!response.ok) {
    throw new Error(`${url} respondio HTTP ${response.status}`);
  }
  return response.text();
}

async function checkGet200(label, url) {
  if (!url) return { label, url: '(no encontrado)', status: 'FALTA' };
  try {
    const response = await fetch(url, { method: 'GET' });
    return { label, url, status: response.status === 200 ? '200 OK' : `HTTP ${response.status}` };
  } catch (error) {
    return { label, url, status: `ERROR: ${error.message}` };
  }
}

function mainCommit() {
  return execFileSync('git', ['ls-remote', 'origin', 'refs/heads/main'], {
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
  }).trim().split(/\s+/)[0];
}

function sameCommit(published, main) {
  if (!published || !main || published === 'unknown') return false;
  const minLength = Math.min(published.length, main.length);
  if (minLength < 7) return false;
  return published.slice(0, minLength) === main.slice(0, minLength);
}

function yesNo(value) {
  return value ? 'si' : 'no';
}

let exitCode = 0;
const failures = [];
const warnings = [];

try {
  const siteUrl = normalizeSiteUrl(siteArg);
  const results = await Promise.allSettled([
    fetchJson(`${siteUrl}/build-info.json`),
    fetchJson(`${siteUrl}/api/health`),
    fetchText(`${siteUrl}/`),
    Promise.resolve().then(mainCommit),
  ]);

  const buildInfo = results[0].status === 'fulfilled' ? results[0].value : null;
  const health = results[1].status === 'fulfilled' ? results[1].value : null;
  const html = results[2].status === 'fulfilled' ? results[2].value : null;
  const main = results[3].status === 'fulfilled' ? results[3].value : 'unknown';

  const rows = [];

  // Commit publicado
  if (buildInfo) {
    const publishedCommit = String(buildInfo.commit ?? 'unknown');
    const commitIsCurrent = sameCommit(publishedCommit, main);
    rows.push(['Commit publicado', commitIsCurrent ? 'OK' : 'ATENCIÓN', `${publishedCommit.slice(0, 12)} vs main ${main.slice(0, 12)}`]);
    if (!commitIsCurrent) {
      failures.push('El commit publicado esta desactualizado respecto de origin/main.');
    }

    rows.push(['Contexto', 'INFO', String(buildInfo.context ?? 'unknown')]);
    rows.push(['URL/fuente', 'INFO', `${buildInfo.siteUrl || '(vacia)'} (${buildInfo.siteUrlSource ?? 'unknown'})`]);
    rows.push(['VITE_SITE_URL', 'INFO', yesNo(buildInfo.env?.VITE_SITE_URL)]);
    rows.push(['VITE_DEMO_BRAND_NAME', 'INFO', yesNo(buildInfo.env?.VITE_DEMO_BRAND_NAME)]);
    rows.push(['VITE_DEMO_BRAND_URL', 'INFO', yesNo(buildInfo.env?.VITE_DEMO_BRAND_URL)]);

    if (buildInfo.context === 'production' && buildInfo.siteUrlSource === 'DEPLOY_PRIME_URL') {
      warnings.push('ATENCION: production esta usando DEPLOY_PRIME_URL como URL canonica.');
    }
  } else {
    rows.push(['build-info.json', 'ERROR', results[0].reason.message]);
    failures.push('No se pudo leer build-info.json');
  }

  // Health check
  if (health) {
    const runtime = health.runtime ?? {};
    rows.push(['/api/health', 'OK', 'Respondió correctamente']);
    rows.push(['Token Mercado Pago', 'INFO', `${yesNo(runtime.MERCADO_PAGO_ACCESS_TOKEN)} (${runtime.tokenMode ?? 'null'})`]);
    rows.push(['APP_URL', 'INFO', yesNo(runtime.APP_URL)]);
    rows.push(['MP_DEMO_MODE', 'INFO', String(runtime.MP_DEMO_MODE ?? 'false')]);

    const checkoutCannotWork = runtime.MERCADO_PAGO_ACCESS_TOKEN !== true && runtime.MP_DEMO_MODE !== 'true';
    if (checkoutCannotWork) {
      failures.push('El checkout no puede funcionar: falta MERCADO_PAGO_ACCESS_TOKEN y MP_DEMO_MODE no es true.');
    }
    if (buildInfo?.context === 'production' && runtime.tokenMode === 'test') {
      warnings.push('ATENCION: production tiene tokenMode test.');
    }
  } else {
    const httpStatus = results[1].reason.message.match(/HTTP (\d+)/)?.[1] || 'error';
    rows.push(['/api/health', 'ERROR', `HTTP ${httpStatus} (Functions no desplegadas o ruta incorrecta)`]);
    failures.push('Endpoint /api/health no responde');
  }

  // HTML principal
  if (html) {
    rows.push(['HTML principal', 'OK', 'Cargado correctamente']);
    const canonical = absoluteUrl(getAttr(html, 'rel', 'canonical', 'href'), siteUrl);
    const ogImage = absoluteUrl(getAttr(html, 'property', 'og:image', 'content'), siteUrl);
    const assetChecks = await Promise.all([
      checkGet200('canonical', canonical),
      checkGet200('og:image', ogImage),
    ]);

    for (const check of assetChecks) {
      const status = check.status === '200 OK' ? 'OK' : 'ATENCIÓN';
      rows.push([`${check.label} GET`, status, `${check.status} - ${check.url}`]);
      if (check.status !== '200 OK') {
        warnings.push(`ATENCION: ${check.label} no respondio 200 (${check.status}).`);
      }
    }
  } else {
    rows.push(['HTML principal', 'ERROR', results[2].reason.message]);
    failures.push('No se pudo cargar el HTML principal');
  }

  console.table(rows.map(([verificacion, estado, detalle]) => ({ 'Verificación': verificacion, 'Estado': estado, 'Detalle': detalle })));

  console.log('');
  for (const warning of warnings) console.warn(`⚠️  ${warning}`);
  for (const failure of failures) console.error(`❌ ${failure}`);

  if (failures.length > 0) exitCode = 1;
} catch (error) {
  console.error(`ERROR GENERAL: ${error.message}`);
  exitCode = 1;
}

process.exit(exitCode);

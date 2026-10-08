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
  const [buildInfo, health, html, main] = await Promise.all([
    fetchJson(`${siteUrl}/build-info.json`),
    fetchJson(`${siteUrl}/api/health`),
    fetchText(`${siteUrl}/`),
    Promise.resolve().then(mainCommit),
  ]);

  const publishedCommit = String(buildInfo.commit ?? 'unknown');
  const commitIsCurrent = sameCommit(publishedCommit, main);
  if (!commitIsCurrent) {
    failures.push('El commit publicado esta desactualizado respecto de origin/main.');
  }

  if (buildInfo.context === 'production' && buildInfo.siteUrlSource === 'DEPLOY_PRIME_URL') {
    warnings.push('ATENCION: production esta usando DEPLOY_PRIME_URL como URL canonica.');
  }

  const runtime = health.runtime ?? {};
  const checkoutCannotWork =
    runtime.MERCADO_PAGO_ACCESS_TOKEN !== true && runtime.MP_DEMO_MODE !== 'true';
  if (checkoutCannotWork) {
    failures.push('El checkout no puede funcionar: falta MERCADO_PAGO_ACCESS_TOKEN y MP_DEMO_MODE no es true.');
  }
  if (buildInfo.context === 'production' && runtime.tokenMode === 'test') {
    warnings.push('ATENCION: production tiene tokenMode test.');
  }

  const canonical = absoluteUrl(getAttr(html, 'rel', 'canonical', 'href'), siteUrl);
  const ogImage = absoluteUrl(getAttr(html, 'property', 'og:image', 'content'), siteUrl);
  const assetChecks = await Promise.all([
    checkGet200('canonical', canonical),
    checkGet200('og:image', ogImage),
  ]);

  for (const check of assetChecks) {
    if (check.status !== '200 OK') {
      warnings.push(`ATENCION: ${check.label} no respondio 200 (${check.status}).`);
    }
  }

  const rows = [
    ['Commit publicado', `${publishedCommit.slice(0, 12)} vs main ${main.slice(0, 12)}: ${commitIsCurrent ? 'OK' : 'DESACTUALIZADO'}`],
    ['Contexto', String(buildInfo.context ?? 'unknown')],
    ['URL/fuente', `${buildInfo.siteUrl || '(vacia)'} (${buildInfo.siteUrlSource ?? 'unknown'})`],
    ['VITE_SITE_URL', yesNo(buildInfo.env?.VITE_SITE_URL)],
    ['VITE_DEMO_BRAND_NAME', yesNo(buildInfo.env?.VITE_DEMO_BRAND_NAME)],
    ['VITE_DEMO_BRAND_URL', yesNo(buildInfo.env?.VITE_DEMO_BRAND_URL)],
    ['Token Mercado Pago', `${yesNo(runtime.MERCADO_PAGO_ACCESS_TOKEN)} (${runtime.tokenMode ?? 'null'})`],
    ['APP_URL', yesNo(runtime.APP_URL)],
    ['MP_DEMO_MODE', String(runtime.MP_DEMO_MODE ?? 'false')],
    ['Canonical GET', `${assetChecks[0].status} - ${assetChecks[0].url}`],
    ['og:image GET', `${assetChecks[1].status} - ${assetChecks[1].url}`],
  ];

  console.table(rows.map(([item, estado]) => ({ item, estado })));

  for (const warning of warnings) console.warn(warning);
  for (const failure of failures) console.error(`ERROR: ${failure}`);

  if (failures.length > 0) exitCode = 1;
} catch (error) {
  console.error(`ERROR: ${error.message}`);
  exitCode = 1;
}

process.exit(exitCode);

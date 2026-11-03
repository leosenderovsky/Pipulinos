#!/usr/bin/env node
/**
 * Garantiza que NINGÚN texto visible esté escrito en el código: todo debe salir de src/data/brand.json
 * (o de los archivos de catálogo declarados en scripts/check-texts.config.json, que también son datos editables).
 * Recorre los componentes con un analizador sintáctico (@babel/parser) y marca:
 *   - texto dentro de JSX (<p>Hola</p>),
 *   - atributos visibles o accesibles (aria-label, alt, title, placeholder, label, value…),
 *   - cadenas y plantillas de texto en el código (mensajes, avisos, etiquetas).
 * Se ignoran los identificadores técnicos (clases de Tailwind, claves, comparaciones, errores de desarrollo y consola).
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from '@babel/parser';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const cfg = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts/check-texts.config.json'), 'utf8'));
const exclude = new Set(cfg.excludeFiles ?? []);
const allowStrings = new Set((cfg.allowStrings ?? []).map((s) => s.trim()));
const usedByTooling = cfg.usedByTooling ?? {};
const toolingFiles = [
  'index.html',
  'vite.config.ts',
  'scripts/make-icons.mjs',
  'server.ts',
];

const SKIP_ATTRS = new Set(['className', 'style', 'id', 'key', 'type', 'href', 'src', 'srcSet', 'rel', 'target', 'name', 'htmlFor', 'role', 'inputMode', 'autoComplete', 'loading', 'decoding', 'fetchPriority', 'sizes', 'method', 'viewBox', 'd', 'fill', 'stroke', 'strokeLinecap', 'strokeLinejoin', 'xmlns', 'width', 'height', 'mode', 'variant', 'size', 'as', 'to', 'step', 'min', 'max', 'pattern', 'accept', 'lang', 'dir', 'tabIndex', 'crossOrigin', 'referrerPolicy', 'media', 'color', 'align', 'aria-modal', 'aria-hidden', 'aria-live', 'aria-busy', 'aria-haspopup', 'aria-orientation', 'aria-selected', 'aria-checked', 'aria-pressed', 'aria-expanded', 'aria-current', 'aria-controls', 'aria-describedby', 'aria-labelledby', 'data-testid']);
const files = [];
(function walk(d) { for (const f of fs.readdirSync(d, { withFileTypes: true })) { const p = path.join(d, f.name); if (f.isDirectory()) walk(p); else if (/\.(tsx?|jsx?)$/.test(f.name)) files.push(p); } })(path.join(ROOT, 'src'));

const looksLikeText = (s) => {
  const t = s.trim();
  if (!t || !/[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]{2,}/.test(t)) return false;
  if (allowStrings.has(t)) return false;
  if (/^(\/|https?:|#|\.|data:|[\w.-]+\.(png|jpe?g|webp|svg|json|css|mjs|ts|tsx))/i.test(t)) return false;
  const tokens = t.split(/\s+/);
  const tailwind = tokens.every((k) => /^[\w\-:/[\].%#&!()>*,=@'"+_]+$/.test(k) && !/^[A-ZÁÉÍÓÚÑ][a-záéíóúñ]/.test(k)) && tokens.some((k) => /[-:[\]]/.test(k) && k.length > 1);
  if (tailwind) return false;
  if (/^[a-z][a-zA-Z0-9_-]*$/.test(t)) return false;                       // identificador (catalog, cart, all)
  if (/^[A-Z0-9_]+$/.test(t) && !/\s/.test(t) && (/[_0-9]/.test(t) || t.length <= 4)) return false; // CONSTANTE
  return /[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+|\s|[áéíóúñ¿¡]/.test(t);
};

const findings = [];
for (const file of files) {
  const rel = path.relative(ROOT, file).replaceAll('\\', '/');
  if (exclude.has(rel)) continue;
  const code = fs.readFileSync(file, 'utf8');
  let ast;
  try { ast = parse(code, { sourceType: 'module', plugins: ['typescript', 'jsx'] }); } catch (e) { console.error(`check:texts ERROR - no se pudo analizar ${rel}: ${e.message}`); process.exit(1); }
  const add = (kind, node, text) => { if (looksLikeText(text)) findings.push({ rel, line: node.loc.start.line, kind, text: text.replace(/\s+/g, ' ').trim() }); };
  (function visit(node, parent, ctx) {
    if (!node || typeof node.type !== 'string') return;
    switch (node.type) {
      case 'ImportDeclaration': case 'ExportAllDeclaration': case 'TSLiteralType': case 'TSTypeAnnotation': case 'TSTypeAliasDeclaration': case 'TSInterfaceDeclaration': return;
      case 'ThrowStatement': return;                                         // mensajes de error de desarrollo
      case 'CallExpression': if (node.callee?.object?.name === 'console') return; break;
      case 'JSXText': add('texto', node, node.value); return;
      case 'JSXAttribute': {
        const n = node.name.name; const v = node.value;
        if (v && v.type === 'StringLiteral' && !SKIP_ATTRS.has(n)) add(`atributo ${n}`, v, v.value);
        if (v && v.type === 'JSXExpressionContainer' && (!SKIP_ATTRS.has(n) || n === 'href')) visit(v.expression, node, { attr: n });
        return;
      }
      case 'StringLiteral':
        if (parent?.type === 'ObjectProperty' && parent.key === node) return;
        if (parent?.type === 'BinaryExpression' && ['===', '!==', '==', '!='].includes(parent.operator)) return;
        if (parent?.type === 'SwitchCase') return;
        add(ctx?.attr ? `atributo ${ctx.attr}` : 'cadena', node, node.value); return;
      case 'TemplateLiteral': add('plantilla', node, node.quasis.map((q) => q.value.cooked).join('{}')); node.expressions.forEach((e) => visit(e, node, ctx)); return;
    }
    for (const k of Object.keys(node)) { if (['loc', 'leadingComments', 'trailingComments'].includes(k)) continue; const v = node[k]; if (Array.isArray(v)) v.forEach((c) => visit(c, node, ctx)); else if (v && typeof v.type === 'string') visit(v, node, ctx); }
  })(ast.program, null, null);
}

console.log(`check:texts - ${files.length - exclude.size} archivos revisados`);
if (findings.length) {
  findings.forEach((f) => console.error(`  ERROR ${f.rel}:${f.line} [${f.kind}] "${f.text.slice(0, 100)}"`));
  console.error(`\n${findings.length} texto(s) escrito(s) en el código. Movelos a src/data/brand.json (y a brand.schema.json) para que sean editables,`);
  console.error('o, si es un dato técnico, agregalo a "allowStrings" en scripts/check-texts.config.json.');
  process.exit(1);
}

const brand = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/data/brand.json'), 'utf8'));
const stringPaths = [];
const collectStringPaths = (value, prefix = []) => {
  if (typeof value === 'string') {
    stringPaths.push(prefix.join('.'));
    return;
  }
  if (Array.isArray(value)) {
    value.forEach((item, index) => collectStringPaths(item, [...prefix, String(index)]));
    return;
  }
  if (!value || typeof value !== 'object') return;
  for (const [key, child] of Object.entries(value)) {
    collectStringPaths(child, [...prefix, key]);
  }
};

for (const section of ['announcement', 'hero', 'copy', 'ui', 'seo', 'contact']) {
  collectStringPaths(brand[section], [section]);
}
collectStringPaths(brand.logo?.alt, ['logo', 'alt']);
collectStringPaths(brand.commerce?.standardShippingDays, ['commerce', 'standardShippingDays']);
collectStringPaths(brand.commerce?.expressShippingDays, ['commerce', 'expressShippingDays']);

const sourceFiles = files.map((file) => ({
  rel: path.relative(ROOT, file).replaceAll('\\', '/'),
  code: fs.readFileSync(file, 'utf8'),
}));
const externalFiles = toolingFiles
  .map((rel) => ({ rel, file: path.join(ROOT, rel) }))
  .filter(({ file }) => fs.existsSync(file))
  .map(({ rel, file }) => ({ rel, code: fs.readFileSync(file, 'utf8') }));
const unusedKeys = [];
for (const keyPath of stringPaths) {
  const expression = new RegExp(
    `\\bBRAND_CONFIG\\.${keyPath.replaceAll('.', '\\.')}(?![\\w])`,
  );
  if (sourceFiles.some(({ code }) => expression.test(code))) continue;
  const isDynamicallyReadArrayEntry = keyPath.includes('.') && sourceFiles.some(({ code }) => {
    const parts = keyPath.split('.');
    const arrayIndex = parts.findIndex((part) => /^\d+$/.test(part));
    if (arrayIndex < 0) return false;
    const parentPath = parts.slice(0, arrayIndex).join('.');
    const dynamicRead = new RegExp(
      `\\bBRAND_CONFIG\\.${parentPath.replaceAll('.', '\\.')}\\.(?:find|map|filter)\\b`,
    );
    return dynamicRead.test(code);
  });
  if (isDynamicallyReadArrayEntry) continue;
  const toolingUse = externalFiles.some(({ code }) => expression.test(code));
  const reason = usedByTooling[keyPath];
  if (toolingUse && typeof reason === 'string' && reason.trim()) continue;
  unusedKeys.push(keyPath);
}
for (const [keyPath, reason] of Object.entries(usedByTooling)) {
  if (typeof reason !== 'string' || !reason.trim()) {
    unusedKeys.push(`${keyPath} (usedByTooling: falta el motivo)`);
  } else if (!stringPaths.includes(keyPath)) {
    unusedKeys.push(`${keyPath} (usedByTooling: clave inexistente)`);
  }
}

if (unusedKeys.length) {
  unusedKeys.forEach((keyPath) => console.error(`  ERROR clave sin uso: ${keyPath}`));
  console.error(`\n${unusedKeys.length} clave(s) de texto de brand.json sin uso en src.`);
  process.exit(1);
}
console.log(`Todos los textos visibles salen de brand.json; ${stringPaths.length} claves editables tienen uso.`);

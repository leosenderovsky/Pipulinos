import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const schemas = [
  ['brand.schema.json', 'Marca'],
  ['catalog.schema.json', 'Catálogo'],
  ['size-guide.schema.json', 'Guía de talles'],
];

const readJson = async (file) =>
  JSON.parse(await readFile(path.join(root, 'src', 'data', file), 'utf8'));
const rows = [];

const visit = (schema, fieldPath) => {
  if (schema.type === 'object' && schema.properties) {
    for (const [key, property] of Object.entries(schema.properties)) {
      visit(property, fieldPath ? `${fieldPath}.${key}` : key);
    }
    if (schema.additionalProperties && typeof schema.additionalProperties === 'object') {
      visit(schema.additionalProperties, `${fieldPath}.*`);
    }
    return;
  }
  if (schema.type === 'array') {
    rows.push({
      path: fieldPath,
      title: schema.title ?? 'Lista',
      group: schema['x-group'] ?? 'Secciones',
      widget: schema['x-widget'] ?? 'list',
      optional: schema['x-optional'] ? 'Sí' : 'No',
      variables: (schema['x-vars'] ?? []).map((variable) => `{${variable}}`).join(', '),
      asset: schema['x-asset'] ? JSON.stringify(schema['x-asset']) : '',
      description: schema.description ?? '',
    });
    visit(schema.items ?? {}, `${fieldPath}[]`);
    return;
  }
  if (schema.properties) {
    visit(schema, fieldPath);
    return;
  }
  if (schema.type === 'object' && schema.additionalProperties && typeof schema.additionalProperties === 'object') {
    rows.push({
      path: fieldPath,
      title: schema.title ?? 'Datos',
      group: schema['x-group'] ?? 'Secciones',
      widget: schema['x-widget'] ?? 'list',
      optional: schema['x-optional'] ? 'Sí' : 'No',
      variables: (schema['x-vars'] ?? []).map((variable) => `{${variable}}`).join(', '),
      asset: schema['x-asset'] ? JSON.stringify(schema['x-asset']) : '',
      description: schema.description ?? '',
    });
    visit(schema.additionalProperties, `${fieldPath}.*`);
    return;
  }
  rows.push({
    path: fieldPath,
    title: schema.title ?? 'Dato',
    group: schema['x-group'] ?? 'Secciones',
    widget: schema['x-widget'] ?? 'text',
    optional: schema['x-optional'] ? 'Sí' : 'No',
    variables: (schema['x-vars'] ?? []).map((variable) => `{${variable}}`).join(', '),
    asset: schema['x-asset'] ? JSON.stringify(schema['x-asset']) : '',
    description: schema.description ?? '',
  });
};

const lines = [
  '# Campos editables',
  '',
  'Referencia generada desde los esquemas JSON. Los formularios deben leer los esquemas, no este documento.',
  '',
];

for (const [file, sectionTitle] of schemas) {
  rows.length = 0;
  const schema = await readJson(file);
  visit(schema, '');
  lines.push(`## ${sectionTitle}`, '', `Esquema: \`src/data/${file}\``, '');
  lines.push('| Campo | Título | Grupo | Control | Opcional | Variables | Imagen | Descripción |');
  lines.push('|---|---|---|---|---|---|---|---|');
  for (const row of rows) {
    const values = [
      row.path,
      row.title,
      row.group,
      row.widget,
      row.optional,
      row.variables,
      row.asset,
      row.description,
    ]
      .map((value) => String(value).replaceAll('|', '\\|').replaceAll('\n', ' '));
    lines.push(`| ${values.join(' | ')} |`);
  }
  lines.push('');
}

await writeFile(path.join(root, 'docs', 'CAMPOS.md'), `${lines.join('\n')}\n`);
console.log(`Generated docs/CAMPOS.md from ${schemas.length} schemas.`);

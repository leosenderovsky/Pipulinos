# Pipulinos

Showroom y catálogo de indumentaria infantil con filtros, carrito y checkout por Mercado Pago o WhatsApp.
Prototipo white-label para duplicar y adaptar a clientes reales.

Stack: React 19, TypeScript 7, Vite 8, Tailwind CSS 4 y Express 4.

## Cómo empezar

Necesitás Node.js y npm instalados.

```sh
npm install
npm run dev
```

`npm run dev` levanta `server.ts`: un servidor Express local que integra Vite en modo middleware.
La app queda disponible en `http://localhost:3000` por defecto; podés cambiar el puerto con `PORT`.

Para generar y revisar el build:

```sh
npm run build
npm run preview
```

`npm run preview` sirve el contenido compilado de `dist/`.
En producción, Netlify redirige las rutas `/api/*` a Netlify Functions, según `netlify.toml`.

## Mapa del proyecto

- `src/components/`: vistas y componentes de catálogo, producto, carrito y checkout.
- `src/context/CartContext.tsx`: estado y operaciones del carrito.
- `src/lib/`: filtros, búsqueda, talles, referencias y cálculo de precios del checkout.
- `src/data/products.ts`: productos, categorías, edades/etapas, telas y vocabulario de etiquetas.
- `src/data/sizeGuide.ts`: tablas y consejos de medidas.
- `src/brand.config.ts`: configuración central de marca.
- `netlify/functions/create-preference.ts`: creación de preferencias de Mercado Pago.
- `netlify/functions/mp-webhook.ts`: recepción y consulta de notificaciones de pago.
- `server.ts`: Express local para desarrollo y compatibilidad de rutas de API.
- `public/assets/`: fotos, logo, íconos y recursos visuales.
- `scripts/`: generación y controles de imágenes, íconos y filtros.
- `docs/IMAGENES.md`: criterios y comandos para preparar imágenes y logo.

## Adaptar para un cliente nuevo

Editá `src/brand.config.ts` en este orden:

- `seo`: sufijo del título, descripción y recurso para compartir en redes.
- `typography`: familias tipográficas y stylesheet.
- `theme`: colores y tokens visuales; `src/main.tsx` los inyecta como variables CSS.
- `storage`: clave usada para persistir el carrito en el navegador.
- `demo`: activación del carrito y checkout de ejemplo, dedicatoria, cupón y envoltorio.
- `logo`: imagen, texto alternativo, íconos, `iconCrop` y `iconBackground`.
- `contact`: WhatsApp, asesoría, Instagram, showroom, horarios y email.
- `commerce`: moneda, cupones porcentuales o fijos, descuentos, envíos y cambios.
- `announcement`: activación y texto de la franja de anuncio.
- `hero`: título, bajada, promociones, imagen y mensajes destacados.
- `copy`: textos del catálogo, checkout, regalo, WhatsApp y pie de página.

Después adaptá `src/data/products.ts`. Cada producto define, entre otros campos, `id`,
`nombre`, `categoria`, `subcategoria`, `precio`, `precioAnterior`, `tallesDisponibles`,
`coloresDisponibles`, `imagenes`, `descripcion`, `tela`, `caracteristicas`, `cuidados`,
`stockPorTalle`, `destacado`, `esPack` y `tags`.

Las categorías son Bodys & Enteritos, Remeras & Tops, Pantalones & Calzas, Pijamas & Abrigo y Accesorios & Packs; las etapas son recién nacidos, bebés y niños.
Las telas de `FABRICS_LIST`: 100% Algodón Pima, Algodón Peinado 24/1, Plush & Friza Abrigada,
Rústico con Lycra, Denim Ultra Soft y Muselina Pura. `src/data/filterOptions.ts` define talles, colores y filtros rápidos.
Actualizá también `src/data/sizeGuide.ts` si cambian las medidas o recomendaciones.

Cuando cambies datos o comportamiento de filtros, actualizá sus resultados esperados
en `scripts/filters.expected.json` y validalos con:

```sh
npm run check:filters
```

## Imágenes y logo

| Asset | Uso | Medidas y proporción |
| --- | --- | --- |
| `public/assets/products/` (JPG) | Fotos del catálogo | Origen recomendado: 1600×2000 px; proporción 4:5 o 1:1; el verificador exige al menos 900 px de ancho. |
| Variantes `.webp` con el mismo nombre | Alternativa WebP de cada foto de producto | `ProductPicture` las ofrece primero y deja el JPG como respaldo. |
| `public/assets/logo/logo.png` | Logo de la interfaz y fuente para generar íconos | `logo:optimize` limita el ancho a 800 px y el peso a 120 KiB. |
| `public/assets/logo/logo.svg` | Original vectorial editable del logo | Sin dimensiones obligatorias definidas por los scripts. |
| `public/assets/logo/favicon-32.png` | Favicon | 32×32 px, proporción 1:1. |
| `public/assets/logo/apple-touch-icon.png` | Ícono para Apple | 180×180 px, proporción 1:1 y opaco. |
| `public/assets/hero/hero-1.jpg` | Imagen de origen para la vista previa social | El generador recorta al centro; no fija dimensiones para el original. |
| `public/assets/misc/og-image.jpg` | Imagen de vista previa social | 1200×630 px, proporción 40:21 y hasta 200 KiB. |

Las fotos de producto no deben tener texto ni capturas de interfaz. La optimización redimensiona sin agrandar y conserva la proporción; usá 4:5 o cuadrado.
`scripts/check-images.mjs` también informa peso, duplicados y variantes WebP faltantes.

Comandos disponibles:

```sh
npm run images:optimize
npm run logo:optimize
npm run check:images
npm run check:images:strict
npm run icons:make
npm run check:icons
npm run make:og
```

`check:images:strict` falla si hay advertencias. `icons:make` genera los dos íconos
desde el PNG, aplicando `iconCrop` y el fondo configurado. `check:icons` compara
los archivos generados con los publicados. `make:og` acepta `OG_IMAGE_QUALITY`.

## Mercado Pago y pagos

Configurá `MERCADO_PAGO_ACCESS_TOKEN` como variable de entorno de servidor en Netlify:
nunca lo guardes en el repositorio ni uses el prefijo `VITE_`.
`APP_URL` establece la URL base de los retornos y el webhook; si falta, se usa `URL`.

`MP_DEMO_MODE` solo permite omitir el error de token faltante en producción cuando vale
`true`. Sin token, la función devuelve una preferencia simulada `development_demo`:
no se realiza ningún cobro. No lo uses como configuración de pagos reales.

El servidor calcula el importe con los precios de `src/data/products.ts`, no con precios
enviados por el navegador. `src/lib/checkoutPricing.ts` valida productos y cantidades,
aplica el cupón, calcula el envío express y el descuento por transferencia cuando
corresponde. Los cupones y reglas comerciales se editan en `BRAND_CONFIG.commerce`.

`netlify/functions/health.ts` expone `/api/health` para revisar, sin revelar valores,
si Netlify ve las variables necesarias para Functions. Configurá las variables privadas
con alcance `Functions` para que aparezcan como cargadas en ese endpoint.

`netlify/functions/mp-webhook.ts` valida la notificación consultando el pago a Mercado
Pago y registra su estado y referencia en los logs. Hoy no guarda órdenes ni envía emails.

Mercado Pago retorna con `?checkout=success`, `?checkout=pending` o `?checkout=failure`.
La app muestra el aviso correspondiente; ante una aprobación con identificador de pago
limpia el carrito mientras espera la confirmación definitiva del webhook.

Antes de producción, probá en una deploy preview de Netlify con credenciales de prueba
configuradas solo en el entorno del servidor. La API devuelve `sandbox_init_point` si
Mercado Pago lo informa, pero la UI prioriza `init_point` y lo usa como respaldo.
Revisá el flujo y sus URLs de retorno antes de reemplazar las credenciales por las reales.

## Variables de entorno

| Variable | Uso y resolución |
| --- | --- |
| `VITE_SITE_URL` | URL pública/canónica para metadatos; se recorta whitespace. |
| `DEPLOY_PRIME_URL` | Segundo valor para la URL del sitio en el build, si no hay `VITE_SITE_URL`. |
| `URL` | Tercer valor para esa URL; también es fallback de `APP_URL`. |
| `VITE_DEMO_BRAND_NAME` | Nombre opcional que muestra el banner de demo. |
| `VITE_DEMO_BRAND_URL` | Enlace opcional del banner; solo acepta URL HTTP o HTTPS válida. |
| `MERCADO_PAGO_ACCESS_TOKEN` | Credencial privada de servidor, configurada en Netlify; nunca en el repo ni con `VITE_`. |
| `APP_URL` | Base de los retornos y notificaciones de pago; fallback `URL`. |
| `MP_DEMO_MODE` | `false` en el ejemplo; con `true` permite la preferencia simulada sin token en producción. |
| `BRAND_ICON_BACKGROUND` | Fondo opcional de favicon y Apple Touch Icon; precede a `BRAND_CONFIG.logo.iconBackground`. |
| `MP_STATEMENT_DESCRIPTOR` | Descriptor opcional del resumen de Mercado Pago; si falta, usa el nombre de marca en mayúsculas. |
| `PORT` | Puerto del Express local; por defecto `3000`. |
| `NODE_ENV` / `CONTEXT` | Se usan para detectar contexto de producción y exigir el token. |
| `DISABLE_HMR` | Con `true`, Vite desactiva HMR y el watcher local. |
| `OG_IMAGE_QUALITY` | Calidad inicial de la imagen social: entero de 1 a 100; por defecto, 85. |

El orden real de `VITE_SITE_URL` en `vite.config.ts` es:
`VITE_SITE_URL` → `URL` en `CONTEXT=production` → `DEPLOY_PRIME_URL` en otros contextos
→ `URL` → `DEPLOY_PRIME_URL` → cadena vacía.
Los tres valores se leen con `trim`; si hay URL, Vite la valida.
Las variables de marca demo y `BRAND_ICON_BACKGROUND` están listadas en `.env.example`.

## Verificar un deploy

Cada build genera `dist/build-info.json` con commit, rama, contexto, URL pública y
booleanos de variables `VITE_*`; Netlify lo publica como `/build-info.json` con
`Cache-Control: no-store` y `X-Robots-Tag: noindex`. El HTML también incluye
`<meta name="build-commit">` en el `<head>`.

El endpoint `/api/health` responde solo datos seguros: contexto, booleanos de variables
de runtime, `MP_DEMO_MODE` y el modo del token de Mercado Pago (`test`, `production`,
`unknown` o `null`), nunca el token ni valores secretos.

Para comparar el deploy con `origin/main` y revisar checkout, URL canónica y `og:image`:

```sh
npm run verify:deploy -- https://<sitio>.netlify.app
```

## Modo demo

`src/components/PrototypeBanner.tsx` muestra el aviso de prototipo. El nombre y el enlace
vienen de `src/demoBanner.config.ts`; `getDemoLegend` también arma la aclaración del pie.
Si no hay nombre configurado, se muestra el aviso genérico.

En `BRAND_CONFIG.demo`, `prefillCart` y `prefillCheckout` están desactivados por defecto.
Al activar el primero, se precargan tres productos y se aplican los datos demo de regalo
y cupón. El segundo precarga el formulario con los campos de ejemplo definidos en
`BRAND_CONFIG.demo.checkout` (nombre, email, teléfono, domicilio, localidad y notas).

Al entregar a un cliente real, desactivá o quitá esas precargas y reemplazá los datos
de muestra. Borrá el banner demo y su configuración, el import y render en `src/App.tsx`,
y el import y la llamada a `getDemoLegend` junto con el texto de `copy.footerDisclaimer`.

## Despliegue en Netlify y entrega

`netlify.toml` define `npm run build`, publica `dist`, registra `netlify/functions/`
y redirige `/api/*` a `/.netlify/functions/:splat`. Configurá en Netlify las variables
de servidor necesarias para el contexto de deploy; no subas secretos al repositorio.

Antes de entregar:

- [ ] Revisá `BRAND_CONFIG`, el catálogo, los talles, los filtros y el contenido de muestra.
- [ ] Prepará las fotos y el logo; regenerá íconos y vista previa social si corresponde.
- [ ] Configurá `VITE_SITE_URL`, `APP_URL` y credenciales de pago en el entorno de Netlify.
- [ ] Corré `npm run lint`, `npm run check:filters` y `npm run build`.
- [ ] Corré `npm run check:images` y `npm run check:icons`; atendé las advertencias.
- [ ] Probá la compra por Mercado Pago y por WhatsApp en una deploy preview.
- [ ] Confirmá el retorno, la URL del webhook y la ausencia del banner/precargas demo.

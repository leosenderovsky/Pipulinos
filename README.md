# Pipulinos

## Adaptar para un cliente

- Editá `src/brand.config.ts` para cambiar identidad, contacto, tema, tipografía, textos, SEO y valores iniciales del checkout.
- Reemplazá los archivos en `public/assets/` y ejecutá `npm run icons:make` para generar los iconos desde `public/assets/logo/logo.png`.
- Actualizá el catálogo y la guía de talles en `src/data/`.

## Variables de entorno

- `VITE_SITE_URL`: URL pública canónica; tiene prioridad en el build.
- `VITE_DEMO_BRAND_NAME` y `VITE_DEMO_BRAND_URL`: marca y enlace del banner de demostración.
- `URL` y `DEPLOY_PRIME_URL`: URLs que proporciona Netlify; el build usa el deploy preview cuando está disponible y, si no, la URL del sitio.
- `MERCADO_PAGO_ACCESS_TOKEN`: credencial de servidor de Mercado Pago; nunca usar el prefijo `VITE_`.
- `APP_URL`: URL de retorno de pagos; si se omite, se usa `URL` de Netlify.
- `MP_DEMO_MODE`: permite usar pagos simulados explícitamente (`true`/`false`).
- `BRAND_ICON_BACKGROUND`: fondo sólido opcional para los iconos (por defecto `#FFFDF9`).

## Validación

```sh
npm run icons:make
npm run lint
npm run build
npm run check:filters
npm run check:images
```

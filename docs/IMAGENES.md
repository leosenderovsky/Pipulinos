# Imágenes de productos

- Usar fotografía de estudio en proporción 4:5, con un archivo de origen de al menos 1600x2000 px.
- Las imágenes no deben incluir texto ni capturas de interfaz.
- Mantener el nombre de archivo del producto en `public/assets/products/` (por ejemplo, `nombre-del-producto.jpg`) para reemplazar el recurso sin cambiar el código.
- Antes de commitear, ejecutar `npm run images:optimize` y `npm run check:images`. El verificador informa dimensiones, proporción, peso, baja resolución, duplicados entre productos, proporciones no admitidas y variantes WebP faltantes. `npm run check:images:strict` termina con error cuando encuentra advertencias.

## Logo, íconos y vista previa social

- `npm run icons:make` genera `favicon-32.png` y `apple-touch-icon.png` desde `public/assets/logo/logo.png`. El recorte opcional `BRAND_CONFIG.logo.iconCrop` se expresa como fracciones del logo (`left`, `top`, `width`, `height`); si no está definido se usa la imagen completa. El fondo se toma de `BRAND_ICON_BACKGROUND`, luego de `BRAND_CONFIG.logo.iconBackground`.
- `npm run check:icons` compara los íconos generados en memoria con los archivos publicados. Acepta diferencias de hasta 2 niveles por canal en un máximo del 0,1 % de los píxeles, y verifica que no haya más del 1 % de píxeles negros y que el Apple Touch Icon sea 180x180 y opaco.
- `npm run logo:optimize` guarda el original en `.image-originals/` y reduce `logo.png` a un máximo de 800 px de ancho con PNG de paleta. Si ya mide como máximo 800 px y pesa hasta 120 KiB, no lo modifica.
- `npm run make:og` recorta el centro de `public/assets/hero/hero-1.jpg` a 1200x630 y crea `public/assets/misc/og-image.jpg` con mozjpeg, ajustando la calidad para no superar 200 KiB. Se puede cambiar la calidad inicial con `OG_IMAGE_QUALITY` (entero de 1 a 100; por defecto 85).

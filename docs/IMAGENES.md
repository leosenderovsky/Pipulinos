# Imágenes de productos

- Usar fotografía de estudio en proporción 4:5, con un archivo de origen de al menos 1600x2000 px.
- Las imágenes no deben incluir texto ni capturas de interfaz.
- Mantener el nombre de archivo del producto en `public/assets/products/` (por ejemplo, `nombre-del-producto.jpg`) para reemplazar el recurso sin cambiar el código.
- Antes de commitear, ejecutar `npm run images:optimize` y `npm run check:images`. El verificador informa dimensiones, proporción, peso, baja resolución, duplicados entre productos, proporciones no admitidas y variantes WebP faltantes. `npm run check:images:strict` termina con error cuando encuentra advertencias.

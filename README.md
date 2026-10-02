# Pipulinos

## Mercado Pago

Configure `MERCADO_PAGO_ACCESS_TOKEN` como variable de entorno del servidor o de Netlify. No use una variable `VITE_`, porque expondría la credencial en el navegador. En producción, la compra devuelve un error si falta el token.

Configure `APP_URL` con la URL pública de la tienda para las URLs de retorno. En Netlify puede omitirse: se usa la variable `URL` proporcionada por la plataforma.
# Diccionario de Campos Editables

Este documento lista todos los campos editables del archivo `src/data/brand.json` definidos en `src/data/brand.schema.json`.

| Ruta | Título | Descripción | Widget | Asset | Ejemplo |
|---|---|---|---|---|---|
| `schemaVersion` | versión del esquema | Valor numérico. | `number` |  |  |
| `site` | identificador del sitio | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `name` | nombre | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | PIPULINO |
| `shortName` | nombre corto | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | Pipulinos |
| `tagline` | frase de la marca | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | Showroom de Indumentaria Infantil |
| `slogan` | eslogan | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | Amor en cada puntada para crecer jugando 🎈 |
| `foundedYear` | año de fundación | Valor numérico. | `number` |  |  |
| `catalogYear` | año del catálogo | Valor numérico. | `number` |  |  |
| `seo.titleSuffix` | SEO y redes: sufijo del título | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | Showroom & Catálogo de Indumentaria Infantil |
| `seo.description` | SEO y redes: descripción | Texto editable. Dejalo vacío para ocultar el elemento. | `textarea` |  | Showroom y catálogo de indumentaria infantil. Ropa tierna para bebés y niños de 0 a 10 años, compra online con Mercado Pago y WhatsApp. |
| `seo.socialImage` | SEO y redes: imagen para redes | Ruta pública de la imagen (carpeta public/assets). | `image` |  |  |
| `typography.headings` | Tipografías: fuente de títulos | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `typography.body` | Tipografías: fuente de texto | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `typography.stylesheetUrl` | Tipografías: hoja de fuentes | Dirección web completa (https://…). | `url` |  |  |
| `theme.primary` | Colores: color principal | Color en formato #RRGGBB. | `color` |  |  |
| `theme.primaryHover` | Colores: principal al pasar el cursor | Color en formato #RRGGBB. | `color` |  |  |
| `theme.secondary` | Colores: color secundario | Color en formato #RRGGBB. | `color` |  |  |
| `theme.secondarySoft` | Colores: secundario suave | Color en formato #RRGGBB. | `color` |  |  |
| `theme.background` | Colores: fondo de página | Color en formato #RRGGBB. | `color` |  |  |
| `theme.surface` | Colores: fondo de página | Color en formato #RRGGBB. | `color` |  |  |
| `theme.surfaceCheckout` | Colores: superficie de la compra | Color en formato #RRGGBB. | `color` |  |  |
| `theme.surfaceLilac` | Colores: superficie lila | Color en formato #RRGGBB. | `color` |  |  |
| `theme.surfacePink` | Colores: superficie rosa | Color en formato #RRGGBB. | `color` |  |  |
| `theme.surfacePinkStrong` | Colores: superficie rosa fuerte | Color en formato #RRGGBB. | `color` |  |  |
| `theme.surfaceBlue` | Colores: superficie azul | Color en formato #RRGGBB. | `color` |  |  |
| `theme.surfaceGreen` | Colores: superficie verde | Color en formato #RRGGBB. | `color` |  |  |
| `theme.surfacePurple` | Colores: superficie violeta | Color en formato #RRGGBB. | `color` |  |  |
| `theme.surfaceWarm` | Colores: superficie cálida | Color en formato #RRGGBB. | `color` |  |  |
| `theme.text` | Colores: texto | Color en formato #RRGGBB. | `color` |  |  |
| `theme.textMuted` | Colores: texto apagado | Color en formato #RRGGBB. | `color` |  |  |
| `theme.accentBlue` | Colores: azul de acento | Color en formato #RRGGBB. | `color` |  |  |
| `theme.accentBlueDark` | Colores: azul de acento oscuro | Color en formato #RRGGBB. | `color` |  |  |
| `theme.payment` | Colores: color del pago (Mercado Pago) | Color en formato #RRGGBB. | `color` |  |  |
| `theme.paymentHover` | Colores: pago al pasar el cursor | Color en formato #RRGGBB. | `color` |  |  |
| `theme.success` | Colores: éxito | Color en formato #RRGGBB. | `color` |  |  |
| `theme.whatsapp` | Colores: color de WhatsApp | Color en formato #RRGGBB. | `color` |  |  |
| `theme.whatsappHover` | Colores: whatsApp al pasar el cursor | Color en formato #RRGGBB. | `color` |  |  |
| `theme.neutral` | Colores: neutro | Color en formato #RRGGBB. | `color` |  |  |
| `theme.blueTint` | Colores: azul tenue | Color en formato #RRGGBB. | `color` |  |  |
| `theme.productPastelBlue` | Colores: azul pastel de producto | Color en formato #RRGGBB. | `color` |  |  |
| `theme.productCoral` | Colores: coral de producto | Color en formato #RRGGBB. | `color` |  |  |
| `storage.cartKey` | Almacenamiento: clave del carrito en el navegador | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `demo.prefillCart` | Demostración: precargar carrito | Activa o desactiva este elemento. | `boolean` |  |  |
| `demo.prefillCheckout` | Demostración: precargar datos de compra | Activa o desactiva este elemento. | `boolean` |  |  |
| `demo.giftDedication` | Demostración: dedicatoria de ejemplo | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `demo.coupon` | Demostración: cupón aplicado | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `demo.giftPackaging` | Demostración: packaging de regalo activado | Activa o desactiva este elemento. | `boolean` |  |  |
| `demo.checkout.name` | Datos de ejemplo del checkout: nombre | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `demo.checkout.email` | Datos de ejemplo del checkout: correo electrónico | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `demo.checkout.phone` | Datos de ejemplo del checkout: teléfono | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `demo.checkout.streetAddress` | Datos de ejemplo del checkout: calle y altura | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `demo.checkout.apartment` | Datos de ejemplo del checkout: piso / depto | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `demo.checkout.zipCode` | Datos de ejemplo del checkout: código postal | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `demo.checkout.city` | Datos de ejemplo del checkout: ciudad | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `demo.checkout.deliveryNotes` | Datos de ejemplo del checkout: indicaciones de entrega | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `logo.url` | Logo: dirección web | Ruta pública de la imagen (carpeta public/assets). | `image` |  |  |
| `logo.alt` | Logo: texto alternativo | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | Pipulinos - Indumentaria Infantil |
| `logo.faviconUrl` | Logo: favicon | Ruta pública de la imagen (carpeta public/assets). | `image` |  |  |
| `logo.appleTouchIconUrl` | Logo: ícono Apple | Ruta pública de la imagen (carpeta public/assets). | `image` |  |  |
| `logo.iconBackground` | Logo: fondo del ícono | Color en formato #RRGGBB. | `color` |  |  |
| `logo.iconCrop.left` | Recorte del ícono: izquierda | Valor numérico. | `number` |  |  |
| `logo.iconCrop.top` | Recorte del ícono: arriba | Valor numérico. | `number` |  |  |
| `logo.iconCrop.width` | Recorte del ícono: ancho | Valor numérico. | `number` |  |  |
| `logo.iconCrop.height` | Recorte del ícono: alto | Valor numérico. | `number` |  |  |
| `contact.whatsappNumberFormatted` | Contacto: whatsApp visible | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | +54 9 11 4820-9912 |
| `contact.whatsappRaw` | Contacto: número de WhatsApp (solo dígitos) | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `contact.whatsappAdvisorName` | Contacto: nombre de la asesora | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | Sofi de Pipulinos |
| `contact.instagramHandle` | Contacto: usuario de Instagram | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | @pipulinos.kids |
| `contact.instagramUrl` | Contacto: enlace de Instagram | Dirección web completa (https://…). | `url` |  |  |
| `contact.showroomAddress` | Contacto: dirección del showroom | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | Palermo Soho, CABA (Honduras 4850) |
| `contact.showroomId` | Contacto: nombre del showroom | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | Showroom Pipulinos Palermo |
| `contact.showroomHours` | Contacto: horario del showroom | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | Lunes a Sábados de 10:00 a 19:00 hs |
| `contact.email` | Contacto: correo electrónico | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | pedidos@pipulinos.kids |
| `commerce.currency` | Reglas comerciales: moneda (código) | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `commerce.currencySymbol` | Reglas comerciales: símbolo de moneda | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `commerce.coupons[].code` | Cupones: código | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `commerce.coupons[].type` | Cupones: tipo | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | percent |
| `commerce.coupons[].value` | Cupones: valor | Valor numérico. | `number` |  |  |
| `commerce.freeShippingThreshold` | Reglas comerciales: monto para envío gratis | Valor numérico. | `number` |  |  |
| `commerce.transferDiscountPercent` | Reglas comerciales: descuento por transferencia (%) | Valor numérico. | `number` |  |  |
| `commerce.installmentsWithoutInterest` | Reglas comerciales: cuotas sin interés | Valor numérico. | `number` |  |  |
| `commerce.expressShippingCost` | Reglas comerciales: costo del envío exprés | Valor numérico. | `number` |  |  |
| `commerce.standardShippingDays` | Reglas comerciales: plazo del envío estándar | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | 3 a 5 días hábiles (Correo Argentino) |
| `commerce.expressShippingDays` | Reglas comerciales: plazo del envío exprés | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | Llega en 24hs (Moto CABA/GBA) |
| `commerce.exchangePeriodDays` | Reglas comerciales: días para cambios | Valor numérico. | `number` |  |  |
| `announcement.enabled` | Barra de anuncio: activado | Activa o desactiva este elemento. | `boolean` |  |  |
| `announcement.text` | Barra de anuncio: texto | Texto editable. Dejalo vacío para ocultar el elemento. | `textarea` |  | Envíos gratis desde $45.000 • 3 y 6 cuotas sin interés con Mercado Pago • ¡Atención personalizada por WhatsApp! |
| `hero.badge` | Portada: sello | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | NUEVA COLECCIÓN 2027 |
| `hero.title` | Portada: título | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | Amor en cada puntada para crecer jugando 🎈 |
| `hero.subtitle` | Portada: subtítulo | Texto editable. Dejalo vacío para ocultar el elemento. | `textarea` |  | Prendas suaves, nobles e hipoalergénicas para acompañar los primeros pasos y sueños de tu peque. |
| `hero.promoCreditCard` | Portada: promoción de tarjeta | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | Hasta 6 Cuotas Sin Interés con Mercado Pago |
| `hero.promoTransfer` | Portada: promoción de transferencia | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | + 10% OFF abonando por Transferencia Bancaria |
| `hero.bannerImageUrl` | Portada: imagen de la portada | Ruta pública de la imagen (carpeta public/assets). | `image` |  |  |
| `hero.bannerImageAlt` | Portada: texto alternativo de la imagen | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | Bebés jugando felices con prendas suaves Pipulinos en showroom |
| `hero.trustPill` | Portada: sello de confianza | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | 100% Algodón Peinado Suave |
| `copy.sizeAssistancePrompt` | Textos generales: invitación a consultar talles | Texto editable. Dejalo vacío para ocultar el elemento. | `textarea` |  | ¿Dudas con el talle de tu peque? Escribinos por WhatsApp y una asesora te pasa medidas en centímetros y fotos en vivo. |
| `copy.giftPackagingTitle` | Textos generales: título del packaging de regalo | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | ¿Es para regalo? 🎁 |
| `copy.giftPackagingDescription` | Textos generales: descripción del packaging de regalo | Texto editable. Dejalo vacío para ocultar el elemento. | `textarea` |  | Te enviamos la bolsita ilustrada Pipulinos con moño, papel de seda y tarjetita con dedicatoria lista para sorprender. |
| `copy.footerAbout` | Textos generales: descripción del pie | Texto editable. Dejalo vacío para ocultar el elemento. | `textarea` |  | Showroom oficial de ropa tierna y noble para bebés y peques de 0 a 10 años. Diseñado con amor para jugar, explorar y dormir felices. |
| `copy.whatsappShippingMessage` | Textos generales: consulta de envíos | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | tengo una consulta sobre envíos y cambios |
| `copy.whatsappFaqMessage` | Textos generales: consulta de preguntas frecuentes | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | tengo preguntas frecuentes |
| `copy.whatsappSizeMessage` | Textos generales: consulta de talles | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | tengo dudas con las medidas para mi bebé |
| `copy.whatsappOrderConfirmation` | Textos generales: confirmación de pedido | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | confirmo mi pedido |
| `copy.catalogTitle` | Textos generales: título del catálogo | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | Catálogo Showroom |
| `copy.catalogCollectionTitle` | Textos generales: título de la colección | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | Colección Showroom |
| `copy.customerServiceLabel` | Textos generales: atención al cliente | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | Atendido por Madres |
| `copy.handmadeGuarantee` | Textos generales: garantía de confección | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | Garantía de confección artesanal Showroom |
| `copy.crossSellTitle` | Textos generales: título de venta cruzada | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | Completá el Conjunto |
| `copy.checkoutOrderHeading` | Textos generales: encabezado del pedido por WhatsApp | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | NUEVO PEDIDO SHOWROOM |
| `copy.thankYouMessage` | Textos generales: mensaje de agradecimiento | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | ¡Gracias por elegir! |
| `copy.orderPreparationMessage` | Textos generales: mensaje de preparación del pedido | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | Preparamos tus prendas con todo el amor en nuestro showroom. |
| `copy.giftDedicationPlaceholder` | Textos generales: ayuda de la dedicatoria | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | Ej: ¡Bienvenido al mundo! Con mucho cariño |
| `copy.checkoutPlaceholders.name` | Ayudas del formulario de compra: nombre | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | Nombre y apellido |
| `copy.checkoutPlaceholders.email` | Ayudas del formulario de compra: correo electrónico | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | tu@email.com |
| `copy.checkoutPlaceholders.phone` | Ayudas del formulario de compra: teléfono | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | 11 2345 6789 |
| `copy.checkoutPlaceholders.street` | Ayudas del formulario de compra: calle | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | Calle y número |
| `copy.checkoutPlaceholders.apartment` | Ayudas del formulario de compra: piso / depto | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | Piso / depto (opcional) |
| `copy.checkoutPlaceholders.zip` | Ayudas del formulario de compra: código postal | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | Código postal |
| `copy.checkoutPlaceholders.city` | Ayudas del formulario de compra: ciudad | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | Localidad |
| `copy.checkoutPlaceholders.notes` | Ayudas del formulario de compra: notas | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | Indicaciones para la entrega (opcional) |
| `copy.footerDisclaimer` | Leyenda de demostración | Texto base de prototipo. El sitio lo completa con el nombre del servicio (no se edita en brand.json). | `textarea` |  | Marca, productos y precios de ejemplo — prototipo de demostración |
| `ui.app.retry` | Aplicación: botón reintentar | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.app.closeNotice` | Aplicación: cerrar aviso | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.payment.received` | Avisos de pago: pago recibido | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.payment.verifyError` | Avisos de pago: error al verificar | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.payment.pending` | Avisos de pago: pago pendiente | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.payment.failed` | Avisos de pago: pago fallido | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.emptyTitle` | Carrito: título vacío | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.emptyDescription` | Carrito: descripción vacía | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.keepShopping` | Carrito: botón seguir comprando | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.title` | Carrito: título | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.trustProtectedTitle` | Carrito: confianza protected título | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.trustExchangeTitle` | Carrito: confianza cambio título | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.trustDispatchTitle` | Carrito: confianza despacho título | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.stepBadge` | Carrito: step sello | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.freeShippingTitle` | Carrito: gratis envío título | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.nearFreeShippingTitle` | Carrito: near gratis envío título | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.freeShippingReached` | Carrito: gratis envío alcanzado | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.sizeLabel` | Carrito: etiqueta de talle | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.colorLabel` | Carrito: etiqueta de color | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.decreaseLabel` | Carrito: etiqueta accesible de restar | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.increaseLabel` | Carrito: etiqueta accesible de sumar | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.removeLabel` | Carrito: etiqueta accesible de eliminar | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.noExtraCharge` | Carrito: sin extra charge | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.dedicationPrompt` | Carrito: dedicatoria prompt | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.dedicationFree` | Carrito: dedicatoria gratis | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.trustCottonTitle` | Carrito: confianza cotton título | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.trustCottonText` | Carrito: confianza cotton texto | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.trustSizeExchangeTitle` | Carrito: confianza talle cambio título | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.trustSizeExchangeText` | Carrito: confianza talle cambio texto | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.trustSizeGuideText` | Carrito: confianza talle guía texto | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.summaryTitle` | Carrito: resumen título | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.promoFallback` | Carrito: promoción fallback | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.shippingCost` | Carrito: envío costo | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.shippingPending` | Carrito: envío pendiente | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.couponPlaceholder` | Carrito: cupón ayuda | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.couponApply` | Carrito: cupón aplicar | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.couponInvalid` | Carrito: cupón invalid | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.total` | Carrito: total | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.paymentPrompt` | Carrito: pago prompt | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.mpTitle` | Carrito: mp título | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.mpText` | Carrito: mp texto | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.whatsappTitle` | Carrito: ayuda de WhatsApp | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.whatsappText` | Carrito: whatsApp texto | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.sslNote` | Carrito: ssl nota | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.sizeHelpTitle` | Carrito: talle ayuda título | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.sizeHelpText` | Carrito: talle ayuda texto | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.sizeHelpButton` | Carrito: talle ayuda botón | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.upsellText` | Carrito: upsell texto | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.upsellFreeShipping` | Carrito: upsell gratis envío | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.upsellAdd` | Carrito: upsell agregar | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.emptyButton` | Carrito: botón vacío | Texto con variables que el sitio reemplaza solo: {name}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.orderTitle` | Carrito: título del pedido | Texto con variables que el sitio reemplaza solo: {name}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.itemSingular` | Carrito: ítem (singular) | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.itemPlural` | Carrito: ítems (plural) | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.itemsCount` | Carrito: cantidad de productos | Texto con variables que el sitio reemplaza solo: {count}, {unit}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.reachedStart` | Carrito: alcanzado start | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.reachedMiddle` | Carrito: alcanzado middle | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.reachedBadge` | Carrito: alcanzado sello | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.reachedEnd` | Carrito: alcanzado end | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.nearStart` | Carrito: near start | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.nearMiddle` | Carrito: near middle | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.nearStrong` | Carrito: near fuerte | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.nearEnd` | Carrito: near end | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.orderCode` | Carrito: pedido código | Texto con variables que el sitio reemplaza solo: {name}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.subtotal` | Carrito: subtotal | Texto con variables que el sitio reemplaza solo: {count}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.discountLabel` | Carrito: descuento etiqueta | Texto con variables que el sitio reemplaza solo: {coupon}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.installmentsStart` | Carrito: cuotas start | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.installmentsStrong` | Carrito: cuotas fuerte | Texto con variables que el sitio reemplaza solo: {count}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.installmentsEnd` | Carrito: cuotas end | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.installmentOf` | Carrito: installment de | Texto con variables que el sitio reemplaza solo: {amount}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.transferLine` | Carrito: transferencia línea | Texto con variables que el sitio reemplaza solo: {percent}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.shippingFree` | Carrito: envío gratis | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.catalog.breadcrumbHome` | Catálogo: inicio de la ruta | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.catalog.badgeStock` | Catálogo: sello stock | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.catalog.badgeExpress` | Catálogo: sello exprés | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.catalog.badgeLove` | Catálogo: sello love | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.catalog.sortLabel` | Catálogo: orden etiqueta | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.catalog.sortPopular` | Catálogo: orden populares | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.catalog.sortPriceAsc` | Catálogo: orden precio ascendente | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.catalog.sortPriceDesc` | Catálogo: orden precio descendente | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.catalog.sortDiscount` | Catálogo: orden descuento | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.catalog.clearAll` | Catálogo: limpiar all | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.catalog.similarResults` | Catálogo: similares resultados | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.catalog.clearSearch` | Catálogo: limpiar búsqueda | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.catalog.emptyTitle` | Catálogo: título vacío | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.catalog.emptyDescription` | Catálogo: descripción vacía | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.catalog.viewAll` | Catálogo: botón ver todos | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.catalog.sizeCtaTitle` | Catálogo: talle cta título | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.catalog.sizeCtaButton` | Catálogo: talle cta botón | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.catalog.pillSearch` | Catálogo: pill búsqueda | Texto con variables que el sitio reemplaza solo: {query}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.catalog.pillSize` | Catálogo: pill talle | Texto con variables que el sitio reemplaza solo: {size}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.catalog.pillColor` | Catálogo: pill color | Texto con variables que el sitio reemplaza solo: {color}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.catalog.pillPrice` | Catálogo: pill precio | Texto con variables que el sitio reemplaza solo: {price}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.catalog.productCount` | Catálogo: producto count | Texto con variables que el sitio reemplaza solo: {count}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.catalog.headline` | Catálogo: títulos | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.catalog.modelsAvailable` | Catálogo: models disponible | Texto con variables que el sitio reemplaza solo: {count}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.catalog.pagination` | Catálogo: pagination | Texto con variables que el sitio reemplaza solo: {page}, {shown}, {total}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.catalog.filterButton` | Catálogo: filtro botón | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.catalog.activeCount` | Catálogo: activos count | Texto con variables que el sitio reemplaza solo: {count}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.footer.helpTitle` | Pie de página: título de ayuda | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.footer.helpSizeGuide` | Pie de página: enlace a guía de talles | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.footer.helpShipping` | Pie de página: enlace a envíos y cambios | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.footer.helpFaq` | Pie de página: enlace a preguntas frecuentes | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.footer.paymentTitle` | Pie de página: título de pagos | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.footer.contactTitle` | Pie de página: título de contacto | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.footer.love` | Pie de página: frase final | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.footer.installmentsLine` | Pie de página: línea de cuotas | Texto con variables que el sitio reemplaza solo: {count}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.footer.transferLabel` | Pie de página: etiqueta de transferencia | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.footer.transferValue` | Pie de página: valor de transferencia | Texto con variables que el sitio reemplaza solo: {percent}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.footer.shippingNote` | Pie de página: nota de envíos | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.footer.whatsappLine` | Pie de página: línea de WhatsApp | Texto con variables que el sitio reemplaza solo: {phone}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.footer.instagramLine` | Pie de página: línea de Instagram | Texto con variables que el sitio reemplaza solo: {handle}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.footer.copyright` | Pie de página: derechos de autor | Texto con variables que el sitio reemplaza solo: {year}, {name}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.header.season` | Encabezado: sello de temporada | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.header.whatsappLong` | Encabezado: whatsApp (largo) | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.header.whatsappShort` | Encabezado: whatsApp (corto) | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.header.sizeGuide` | Encabezado: guía de talles | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.header.cartLabel` | Encabezado: etiqueta accesible del carrito | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.header.searchPlaceholder` | Encabezado: ayuda del buscador | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.header.clearSearch` | Encabezado: limpiar búsqueda | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.header.searchTitle` | Encabezado: ayuda del botón buscar | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.header.whatsappMessage` | Encabezado: whatsApp mensaje | Texto con variables que el sitio reemplaza solo: {name}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.hero.cta` | Portada (textos de la interfaz): botón de acción | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.hero.ctaNote` | Portada (textos de la interfaz): cta nota | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.hero.benefitInstallmentsTitle` | Portada (textos de la interfaz): benefit cuotas título | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.hero.benefitInstallmentsText` | Portada (textos de la interfaz): benefit cuotas texto | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.hero.benefitShippingText` | Portada (textos de la interfaz): benefit envío texto | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.hero.benefitExchangeText` | Portada (textos de la interfaz): benefit cambio texto | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.hero.freeShippingBadge` | Portada (textos de la interfaz): gratis envío sello | Texto con variables que el sitio reemplaza solo: {amount}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.hero.benefitShippingTitle` | Portada (textos de la interfaz): benefit envío título | Texto con variables que el sitio reemplaza solo: {amount}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.hero.benefitExchangeTitle` | Portada (textos de la interfaz): benefit cambio título | Texto con variables que el sitio reemplaza solo: {days}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.mobileFilters.title` | Filtros (celular): título | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.mobileFilters.clear` | Filtros (celular): botón vaciar | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.mobileFilters.apply` | Filtros (celular): aplicar | Texto con variables que el sitio reemplaza solo: {count}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.orderSuccess.title` | Pedido confirmado: título | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.orderSuccess.nextTitle` | Pedido confirmado: siguiente título | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.orderSuccess.nextTracking` | Pedido confirmado: siguiente seguimiento | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.orderSuccess.nextExchange` | Pedido confirmado: siguiente cambio | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.orderSuccess.whatsapp` | Pedido confirmado: color de WhatsApp | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.orderSuccess.back` | Pedido confirmado: volver | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.orderSuccess.registered` | Pedido confirmado: registered | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.orderSuccess.paymentMethod` | Pedido confirmado: pago method | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productCard.removeFavorite` | Tarjeta de producto: quitar favorite | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productCard.addFavorite` | Tarjeta de producto: agregar favorite | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productCard.mercadoPago` | Tarjeta de producto: mercado pago | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productCard.chooseSize` | Tarjeta de producto: choose talle | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productCard.addToCart` | Tarjeta de producto: agregar to carrito | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productCard.moreColors` | Tarjeta de producto: more colores | Texto con variables que el sitio reemplaza solo: {count}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productCard.installmentsStart` | Tarjeta de producto: cuotas start | Texto con variables que el sitio reemplaza solo: {count}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productCard.noInterest` | Tarjeta de producto: sin interest | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.sizeGuide.title` | Guía de talles: título | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.sizeGuide.subtitle` | Guía de talles: subtítulo | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.sizeGuide.babyStage` | Guía de talles: etapa bebé | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.sizeGuide.kidsStage` | Guía de talles: etapa niños | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.sizeGuide.colSize` | Guía de talles: columna talle | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.sizeGuide.colAge` | Guía de talles: columna edad | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.sizeGuide.colHeight` | Guía de talles: columna altura | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.sizeGuide.colWeight` | Guía de talles: columna peso | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.sizeGuide.colLength` | Guía de talles: columna largo | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.sizeGuide.colArmhole` | Guía de talles: columna sisa | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.sizeGuide.colChest` | Guía de talles: columna pecho | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.sizeGuide.colWaist` | Guía de talles: columna cintura | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.sizeGuide.close` | Guía de talles: cerrar | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.sizeGuide.cm` | Guía de talles: medida en cm | Texto con variables que el sitio reemplaza solo: {value}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.errors.name` | Errores de la compra: nombre | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.errors.emailRequired` | Errores de la compra: correo required | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.errors.emailInvalid` | Errores de la compra: correo invalid | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.errors.phone` | Errores de la compra: teléfono | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.errors.street` | Errores de la compra: calle | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.errors.zip` | Errores de la compra: código postal | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.errors.city` | Errores de la compra: ciudad | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.errors.mpNotConfigured` | Errores de la compra: mp not configured | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.errors.mpInvalidPreference` | Errores de la compra: mp invalid preference | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.errors.mpUnexpected` | Errores de la compra: mp unexpected | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.errors.paymentFailed` | Errores de la compra: pago failed | Texto con variables que el sitio reemplaza solo: {status}, {details}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.paymentWhatsapp` | Compra (checkout): pago WhatsApp | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.banner` | Compra (checkout): banner | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.backToCart` | Compra (checkout): volver to carrito | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.secureBadge` | Compra (checkout): secure sello | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.step1` | Compra (checkout): paso 1 | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.step2` | Compra (checkout): paso 2 | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.step3` | Compra (checkout): paso 3 | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.contactTitle` | Compra (checkout): título de contacto | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.stepOfTwo` | Compra (checkout): step de dos | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.emailLabel` | Compra (checkout): correo etiqueta | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.phoneLabel` | Compra (checkout): campo teléfono | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.phoneHelp` | Compra (checkout): ayuda del teléfono | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.nameLabel` | Compra (checkout): campo nombre | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.deliveryPrompt` | Compra (checkout): entrega prompt | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.standardTitle` | Compra (checkout): estándar título | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.standardBadge` | Compra (checkout): estándar sello | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.standardText` | Compra (checkout): estándar texto | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.expressTitle` | Compra (checkout): exprés título | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.expressBadge` | Compra (checkout): exprés sello | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.expressText` | Compra (checkout): exprés texto | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.free` | Compra (checkout): gratis | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.streetLabel` | Compra (checkout): calle etiqueta | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.apartmentLabel` | Compra (checkout): piso/depto etiqueta | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.zipLabel` | Compra (checkout): código postal etiqueta | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.cityLabel` | Compra (checkout): ciudad etiqueta | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.notesLabel` | Compra (checkout): notas etiqueta | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.paymentTitle` | Compra (checkout): título de pagos | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.paymentBadge` | Compra (checkout): pago sello | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.mpTitle` | Compra (checkout): mp título | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.mpRecommended` | Compra (checkout): mp recommended | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.mpText` | Compra (checkout): mp texto | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `textarea` |  |  |
| `ui.checkout.methodVisa` | Compra (checkout): method visa | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.methodMastercard` | Compra (checkout): method mastercard | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.methodAmex` | Compra (checkout): method amex | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.methodNaranja` | Compra (checkout): method naranja | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.methodDebit` | Compra (checkout): method debit | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.methodCash` | Compra (checkout): method cash | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.methodBalance` | Compra (checkout): method balance | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.installmentsPrompt` | Compra (checkout): cuotas prompt | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.installmentOne` | Compra (checkout): installment uno | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.installmentThree` | Compra (checkout): installment tres | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.installmentCft` | Compra (checkout): installment cft | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.generating` | Compra (checkout): generating | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.redirectNote` | Compra (checkout): redirect nota | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.orCoordinate` | Compra (checkout): or coordinate | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.whatsappTitle` | Compra (checkout): ayuda de WhatsApp | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.whatsappBadge` | Compra (checkout): whatsApp sello | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.sizeCheck` | Compra (checkout): talle check | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.whatsappConfirm` | Compra (checkout): whatsApp confirm | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.summaryTitle` | Compra (checkout): resumen título | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.subtotal` | Compra (checkout): subtotal | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.discount` | Compra (checkout): descuento | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.shippingSelected` | Compra (checkout): envío seleccionado | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.total` | Compra (checkout): total | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.guaranteeTitle` | Compra (checkout): garantía título | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.guaranteeText` | Compra (checkout): garantía texto | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `textarea` |  |  |
| `ui.checkout.trustExchange` | Compra (checkout): confianza cambio | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.trustGift` | Compra (checkout): confianza regalo | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.trustSupport` | Compra (checkout): confianza support | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.demoNotice` | Compra (checkout): demo notice | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.demoTitle` | Compra (checkout): demo título | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.demoDetails` | Compra (checkout): demo details | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.demoCurrency` | Compra (checkout): demo moneda | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.demoModeLocal` | Compra (checkout): demo mode local | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.demoOpen` | Compra (checkout): demo open | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.demoSimulate` | Compra (checkout): demo simulate | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.demoBack` | Compra (checkout): demo volver | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.dedicationNote` | Compra (checkout): dedicatoria nota | Texto con variables que el sitio reemplaza solo: {text}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.whatsapp.itemLine` | Mensaje de WhatsApp del pedido: línea de producto | Texto con variables que el sitio reemplaza solo: {quantity}, {name}, {size}, {color}, {price}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.whatsapp.pickup` | Mensaje de WhatsApp del pedido: retiro | Texto con variables que el sitio reemplaza solo: {address}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.whatsapp.express` | Mensaje de WhatsApp del pedido: exprés | Texto con variables que el sitio reemplaza solo: {address}, {price}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.whatsapp.standard` | Mensaje de WhatsApp del pedido: estándar | Texto con variables que el sitio reemplaza solo: {address}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.whatsapp.notes` | Mensaje de WhatsApp del pedido: notas | Texto con variables que el sitio reemplaza solo: {notes}. Dejalo vacío para ocultar el elemento. | `textarea` |  |  |
| `ui.checkout.whatsapp.message` | Mensaje de WhatsApp del pedido: mensaje | Texto con variables que el sitio reemplaza solo: {heading}, {name}, {customer}, {phone}, {email}, {items}, {delivery}, {notes}, {total}, {percent}, {transferTotal}, {savings}. Dejalo vacío para ocultar el elemento. | `textarea` |  |  |
| `ui.checkout.pickupTitle` | Compra (checkout): retiro título | Texto con variables que el sitio reemplaza solo: {name}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.pickupHours` | Compra (checkout): retiro horario | Texto con variables que el sitio reemplaza solo: {hours}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.installmentAmount` | Compra (checkout): installment amount | Texto con variables que el sitio reemplaza solo: {count}, {amount}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.payButton` | Compra (checkout): pay botón | Texto con variables que el sitio reemplaza solo: {amount}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.transferStart` | Compra (checkout): transferencia start | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.transferStrong` | Compra (checkout): transferencia fuerte | Texto con variables que el sitio reemplaza solo: {percent}, {amount}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.transferEnd` | Compra (checkout): transferencia end | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `textarea` |  |  |
| `ui.checkout.savingsLine` | Compra (checkout): ahorro línea | Texto con variables que el sitio reemplaza solo: {amount}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.itemsCount` | Compra (checkout): cantidad de productos | Texto con variables que el sitio reemplaza solo: {count}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.itemSizeColor` | Compra (checkout): item talle color | Texto con variables que el sitio reemplaza solo: {size}, {color}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.itemQuantity` | Compra (checkout): item cantidad | Texto con variables que el sitio reemplaza solo: {quantity}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.totalTransfer` | Compra (checkout): total transferencia | Texto con variables que el sitio reemplaza solo: {amount}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.demoTextStart` | Compra (checkout): demo texto start | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `textarea` |  |  |
| `ui.checkout.demoTextEnd` | Compra (checkout): demo texto end | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.demoPrefId` | Compra (checkout): demo pref identificador | Texto con variables que el sitio reemplaza solo: {id}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.demoMode` | Compra (checkout): demo mode | Texto con variables que el sitio reemplaza solo: {mode}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.demoModeReal` | Compra (checkout): demo mode real | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.demoMethodLabel` | Compra (checkout): demo method etiqueta | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.filters.activeTitle` | Filtros (escritorio): título de filtros activos | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.filters.activeEmpty` | Filtros (escritorio): texto sin filtros | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.filters.clear` | Filtros (escritorio): botón vaciar | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.filters.removeLabel` | Filtros (escritorio): etiqueta accesible de eliminar | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.filters.categories` | Filtros (escritorio): categorías | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.filters.categoriesBadge` | Filtros (escritorio): sello de categorías | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.filters.sizesTitle` | Filtros (escritorio): título de talles | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.filters.sizeGuideLink` | Filtros (escritorio): enlace a la guía | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.filters.babyStage` | Filtros (escritorio): etapa bebé | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.filters.kidsStage` | Filtros (escritorio): etapa niños | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.filters.colors` | Filtros (escritorio): colores | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.filters.price` | Filtros (escritorio): precio | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.filters.priceCurrency` | Filtros (escritorio): moneda del rango | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.filters.priceMin` | Filtros (escritorio): mínimo | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.filters.fabrics` | Filtros (escritorio): telas y confort | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.filters.ageNewborn` | Filtros (escritorio): edad recién nacidos | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.filters.ageBabies` | Filtros (escritorio): edad bebés | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.filters.ageKids` | Filtros (escritorio): edad niños | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.filters.selectedCount` | Filtros (escritorio): filtros seleccionados | Texto con variables que el sitio reemplaza solo: {count}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.filters.priceUpTo` | Filtros (escritorio): hasta | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productDetail.breadcrumbLabel` | Ficha de producto: etiqueta accesible de la ruta | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productDetail.breadcrumbHome` | Ficha de producto: inicio de la ruta | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productDetail.badgeHypoallergenic` | Ficha de producto: sello hipoalergénico | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productDetail.favoriteLabel` | Ficha de producto: etiqueta de favoritos | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productDetail.zoomOut` | Ficha de producto: alejar | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productDetail.zoomIn` | Ficha de producto: ampliar | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productDetail.featureCottonTitle` | Ficha de producto: característica algodón (título) | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productDetail.featureCottonText` | Ficha de producto: característica algodón (texto) | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productDetail.featureSeamsTitle` | Ficha de producto: característica costuras (título) | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productDetail.featureSeamsText` | Ficha de producto: característica costuras (texto) | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productDetail.featureSnapsTitle` | Ficha de producto: característica broches (título) | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productDetail.featureSnapsText` | Ficha de producto: característica broches (texto) | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productDetail.reviews` | Ficha de producto: opiniones | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productDetail.colorLabel` | Ficha de producto: etiqueta de color | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productDetail.sizeLabel` | Ficha de producto: etiqueta de talle | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productDetail.sizeTable` | Ficha de producto: enlace a la tabla de talles | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productDetail.inStock` | Ficha de producto: en stock | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productDetail.weight1` | Ficha de producto: peso 1 | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productDetail.weight2` | Ficha de producto: peso 2 | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productDetail.weight3` | Ficha de producto: peso 3 | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productDetail.weight4` | Ficha de producto: peso 4 | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productDetail.weight5` | Ficha de producto: peso 5 | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productDetail.weight6` | Ficha de producto: peso 6 | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productDetail.available` | Ficha de producto: disponible | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productDetail.tipText` | Ficha de producto: texto del consejo | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `textarea` |  |  |
| `ui.productDetail.decreaseLabel` | Ficha de producto: etiqueta accesible de restar | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productDetail.increaseLabel` | Ficha de producto: etiqueta accesible de sumar | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productDetail.askAvailability` | Ficha de producto: consultar disponibilidad | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productDetail.careTitle` | Ficha de producto: título de cuidados | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productDetail.careWash` | Ficha de producto: lavado | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productDetail.careSoap` | Ficha de producto: jabón | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productDetail.careDry` | Ficha de producto: secado | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productDetail.careIron` | Ficha de producto: planchado | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productDetail.shippingTitle` | Ficha de producto: título de envíos | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productDetail.shippingExpress` | Ficha de producto: envíos exprés | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productDetail.exchangeTitle` | Ficha de producto: título de cambios | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productDetail.exchangeIntro` | Ficha de producto: introducción de cambios | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `textarea` |  |  |
| `ui.productDetail.exchangeFirst` | Ficha de producto: primer cambio | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productDetail.guideTitle` | Ficha de producto: título de la guía | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productDetail.guideSubtitle` | Ficha de producto: subtítulo de la guía | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productDetail.guideTip` | Ficha de producto: consejo (etiqueta) | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productDetail.colSize` | Ficha de producto: columna talle | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productDetail.colAge` | Ficha de producto: columna edad | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productDetail.colHeight` | Ficha de producto: columna altura | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productDetail.colWeight` | Ficha de producto: columna peso | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productDetail.colLength` | Ficha de producto: columna largo | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productDetail.colArmhole` | Ficha de producto: columna sisa | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productDetail.colMoment` | Ficha de producto: columna momento | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productDetail.measureTitle` | Ficha de producto: título de cómo medir | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productDetail.measureText` | Ficha de producto: texto de cómo medir | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `textarea` |  |  |
| `ui.productDetail.helpTitle` | Ficha de producto: título de ayuda | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productDetail.helpButton` | Ficha de producto: botón de ayuda | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productDetail.addedToast` | Ficha de producto: aviso de agregado | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productDetail.viewAlt` | Ficha de producto: texto alternativo de la vista | Texto con variables que el sitio reemplaza solo: {number}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productDetail.lineTitle` | Ficha de producto: título de la línea | Texto con variables que el sitio reemplaza solo: {name}, {fabric}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productDetail.savings` | Ficha de producto: ahorro | Texto con variables que el sitio reemplaza solo: {amount}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productDetail.transferText` | Ficha de producto: texto de transferencia | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productDetail.transferBadge` | Ficha de producto: sello de transferencia | Texto con variables que el sitio reemplaza solo: {percent}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productDetail.installments` | Ficha de producto: cuotas | Texto con variables que el sitio reemplaza solo: {count}, {amount}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productDetail.colorsCount` | Ficha de producto: cantidad de colores | Texto con variables que el sitio reemplaza solo: {count}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productDetail.lastUnits` | Ficha de producto: últimas unidades | Texto con variables que el sitio reemplaza solo: {stock}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productDetail.tipTitle` | Ficha de producto: título del consejo | Texto con variables que el sitio reemplaza solo: {name}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productDetail.addToOrder` | Ficha de producto: botón agregar al pedido | Texto con variables que el sitio reemplaza solo: {price}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productDetail.careComposition` | Ficha de producto: composición | Texto con variables que el sitio reemplaza solo: {fabric}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productDetail.shippingFreeLabel` | Ficha de producto: envío gratis (etiqueta) | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productDetail.shippingFreeText` | Ficha de producto: envío gratis (texto) | Texto con variables que el sitio reemplaza solo: {amount}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productDetail.pickupLabel` | Ficha de producto: retiro (etiqueta) | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productDetail.pickupText` | Ficha de producto: retiro (texto) | Texto con variables que el sitio reemplaza solo: {address}, {hours}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productDetail.exchangeStart` | Ficha de producto: cambio (inicio) | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productDetail.exchangeStrong` | Ficha de producto: cambio (destacado) | Texto con variables que el sitio reemplaza solo: {days}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productDetail.exchangeEnd` | Ficha de producto: cambio (final) | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productDetail.guideTipText` | Ficha de producto: consejo (texto) | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.whatsapp.greeting` | Saludos de WhatsApp: saludo | Texto con variables que el sitio reemplaza solo: {name}, {message}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.whatsapp.greetingOrder` | Saludos de WhatsApp: saludo con pedido | Texto con variables que el sitio reemplaza solo: {name}, {message}, {order}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.whatsapp.productInterest` | Saludos de WhatsApp: interés en un producto | Texto con variables que el sitio reemplaza solo: {name}, {product}, {size}, {color}. Dejalo vacío para ocultar el elemento. | `textarea` |  |  |
| `ui.defaults.size` | Valores por defecto: talle | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.defaults.color` | Valores por defecto: color | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |

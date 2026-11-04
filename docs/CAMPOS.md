# Campos editables

Referencia generada desde los esquemas JSON. Los formularios deben leer los esquemas, no este documento.

## Marca

Esquema: `src/data/brand.schema.json`

| Campo | Título | Grupo | Control | Opcional | Variables | Imagen | Descripción |
|---|---|---|---|---|---|---|---|
| schemaVersion | Versión del esquema | Secciones | number | No |  |  | Versión del formato de configuración. |
| site | Identificador del sitio | Marca | text | No |  |  | Texto editable. Dejalo vacío para ocultar el elemento. |
| name | Nombre de la marca | Marca | text | No |  |  | Ingresá el texto de «nombre de la marca». |
| shortName | Nombre corto de la marca | Marca | text | No |  |  | Ingresá el texto de «nombre corto de la marca». |
| tagline | Descripción breve de la marca | Marca | text | No |  |  | Ingresá el texto de «descripción breve de la marca». |
| slogan | Frase de marca | Marca | text | No |  |  | Ingresá el texto de «frase de marca». |
| foundedYear | Año de fundación | Marca | number | No |  |  | Valor numérico. |
| seo.titleSuffix | Sufijo del título | Textos | text | No |  |  | Ingresá el texto de «sufijo del título». |
| seo.description | Descripción para los buscadores | Textos | textarea | No |  |  | Ingresá el texto de «descripción». |
| seo.socialImage | Imagen para compartir | Imágenes | image | No |  | {"path":"/assets/misc/og-image.jpg","minWidth":1200,"maxKB":200,"ratio":"1200:630"} | Elegí la imagen que se usará para «imagen para compartir». |
| typography.headings | Tipografía de títulos | Secciones | text | No |  |  | Ingresá el texto de «tipografía de títulos». |
| typography.body | Tipografía del texto | Secciones | text | No |  |  | Ingresá el texto de «tipografía del texto». |
| typography.stylesheetUrl | Dirección de la tipografía | Secciones | url | No |  |  | Ingresá el texto de «dirección de la tipografía». |
| theme.primary | Color principal | Botones | color | No |  |  | Elegí el color para «color principal». |
| theme.primaryHover | Color principal al pasar el cursor | Botones | color | No |  |  | Elegí el color para «color principal al pasar el cursor». |
| theme.secondary | Color secundario | Botones | color | No |  |  | Elegí el color para «color secundario». |
| theme.secondarySoft | Color secundario suave | Fondos | color | No |  |  | Elegí el color para «color secundario suave». |
| theme.background | Fondo de la página | Fondos | color | No |  |  | Elegí el color para «fondo de la página». |
| theme.surface | Fondo de las tarjetas | Fondos | color | No |  |  | Elegí el color para «fondo de las tarjetas». |
| theme.surfaceCheckout | Fondo del pago | Fondos | color | No |  |  | Elegí el color para «fondo del pago». |
| theme.surfaceLilac | Fondo lila | Fondos | color | No |  |  | Elegí el color para «fondo lila». |
| theme.surfacePink | Fondo rosa | Fondos | color | No |  |  | Elegí el color para «fondo rosa». |
| theme.surfacePinkStrong | Fondo rosa intenso | Fondos | color | No |  |  | Elegí el color para «fondo rosa intenso». |
| theme.surfaceBlue | Fondo celeste | Fondos | color | No |  |  | Elegí el color para «fondo celeste». |
| theme.surfaceGreen | Fondo verde | Fondos | color | No |  |  | Elegí el color para «fondo verde». |
| theme.surfacePurple | Fondo violeta | Fondos | color | No |  |  | Elegí el color para «fondo violeta». |
| theme.surfaceWarm | Fondo cálido | Fondos | color | No |  |  | Elegí el color para «fondo cálido». |
| theme.text | Color del texto principal | Textos | color | No |  |  | Elegí el color para «color del texto principal». |
| theme.textMuted | Color del texto secundario | Textos | color | No |  |  | Elegí el color para «color del texto secundario». |
| theme.accentBlue | Acento celeste | Acentos | color | No |  |  | Elegí el color para «acento celeste». |
| theme.accentBlueDark | Acento celeste oscuro | Acentos | color | No |  |  | Elegí el color para «acento celeste oscuro». |
| theme.payment | Botón de pago | Botones | color | No |  |  | Elegí el color para «botón de pago». |
| theme.paymentHover | Botón de pago al pasar el cursor | Botones | color | No |  |  | Elegí el color para «botón de pago al pasar el cursor». |
| theme.success | Color de confirmación | Estados | color | No |  |  | Elegí el color para «color de confirmación». |
| theme.whatsapp | Botón de WhatsApp | Botones | color | No |  |  | Elegí el color para «botón de whatsapp». |
| theme.whatsappHover | Botón de WhatsApp al pasar el cursor | Botones | color | No |  |  | Elegí el color para «botón de whatsapp al pasar el cursor». |
| theme.neutral | Color de los bordes | Bordes | color | No |  |  | Elegí el color para «color de los bordes». |
| theme.blueTint | Fondo azul suave | Fondos | color | No |  |  | Elegí el color para «fondo azul suave». |
| theme.productPastelBlue | Color celeste de producto | Acentos | color | No |  |  | Elegí el color para «color celeste de producto». |
| theme.productCoral | Color coral de producto | Acentos | color | No |  |  | Elegí el color para «color coral de producto». |
| storage.cartKey | Clave del carrito | Secciones | text | No |  |  | Ingresá el texto de «clave del carrito». |
| demo.prefillCart | Precargar el carrito | Secciones | boolean | No |  |  | Activá esta opción cuando corresponda. |
| demo.prefillCheckout | Precargar el pago | Secciones | boolean | No |  |  | Activá esta opción cuando corresponda. |
| demo.giftDedication | Dedicatoria de ejemplo | Secciones | text | No |  |  | Ingresá el texto de «dedicatoria de ejemplo». |
| demo.coupon | Cupón de ejemplo | Secciones | text | No |  |  | Ingresá el texto de «cupón de ejemplo». |
| demo.giftPackaging | Activar el envoltorio de regalo | Secciones | boolean | No |  |  | Activá esta opción cuando corresponda. |
| demo.checkout.name | Nombre de la persona | Marca | text | No |  |  | Ingresá el texto de «nombre de la persona». |
| demo.checkout.email | Correo electrónico | Secciones | text | No |  |  | Ingresá el texto de «correo electrónico». |
| demo.checkout.phone | Teléfono | Secciones | text | No |  |  | Ingresá el texto de «teléfono». |
| demo.checkout.streetAddress | Calle y número | Secciones | text | No |  |  | Ingresá el texto de «calle y número». |
| demo.checkout.apartment | Piso o departamento | Secciones | text | No |  |  | Ingresá el texto de «piso o departamento». |
| demo.checkout.zipCode | Código postal | Secciones | text | No |  |  | Ingresá el texto de «código postal». |
| demo.checkout.city | Localidad | Secciones | text | No |  |  | Ingresá el texto de «localidad». |
| demo.checkout.deliveryNotes | Indicaciones de entrega | Secciones | text | No |  |  | Ingresá el texto de «indicaciones de entrega». |
| demo.showPrototypeBanner | Mostrar el aviso de prototipo | Secciones | boolean | No |  |  | Activá esta opción cuando corresponda. |
| logo.url | Dirección de la imagen | Imágenes | image | No |  | {"path":"/assets/logo/logo.png","maxKB":120} | Elegí la imagen que se usará para «dirección de la imagen». |
| logo.alt | Texto alternativo de la imagen | Secciones | text | No |  |  | Ingresá el texto de «texto alternativo de la imagen». |
| logo.faviconUrl | Ícono del sitio | Imágenes | image | No |  | {"path":"/assets/logo/favicon-32.png","minWidth":32,"ratio":"1:1"} | Elegí la imagen que se usará para «ícono del sitio». |
| logo.appleTouchIconUrl | Ícono para dispositivos Apple | Imágenes | image | No |  | {"path":"/assets/logo/apple-touch-icon.png","minWidth":180,"ratio":"1:1"} | Elegí la imagen que se usará para «ícono para dispositivos apple». |
| logo.iconBackground | Fondo de los íconos | Secciones | color | No |  |  | Elegí el color para «fondo de los íconos». |
| logo.iconCrop.left | Margen izquierdo del recorte | Secciones | number | No |  |  | Ingresá el valor de «margen izquierdo del recorte». |
| logo.iconCrop.top | Margen superior del recorte | Secciones | number | No |  |  | Ingresá el valor de «margen superior del recorte». |
| logo.iconCrop.width | Ancho del recorte | Secciones | number | No |  |  | Ingresá el valor de «ancho del recorte». |
| logo.iconCrop.height | Alto del recorte | Secciones | number | No |  |  | Ingresá el valor de «alto del recorte». |
| contact.whatsappNumberFormatted | Número de WhatsApp para mostrar | Contacto | whatsapp | No |  |  | Ingresá el texto de «número de whatsapp para mostrar». |
| contact.whatsappRaw | Número de WhatsApp para enlaces | Contacto | whatsapp | No |  |  | Ingresá el texto de «número de whatsapp para enlaces». |
| contact.whatsappAdvisorName | Nombre de quien atiende | Contacto | text | No |  |  | Ingresá el texto de «nombre de quien atiende». |
| contact.instagramHandle | Usuario de Instagram | Contacto | text | No |  |  | Ingresá el texto de «usuario de instagram». |
| contact.instagramUrl | Dirección de Instagram | Contacto | url | No |  |  | Ingresá el texto de «dirección de instagram». |
| contact.showroomAddress | Dirección del local | Contacto | text | No |  |  | Ingresá el texto de «dirección del local». |
| contact.showroomId | Nombre del local | Contacto | text | No |  |  | Ingresá el texto de «nombre del local». |
| contact.showroomHours | Horarios del local | Contacto | hours-list | No |  |  | Ingresá el texto de «horarios del local». |
| contact.email | Correo electrónico | Contacto | text | No |  |  | Ingresá el texto de «correo electrónico». |
| commerce.currency | Moneda | Comercial | text | No |  |  | Ingresá el texto de «moneda». |
| commerce.currencySymbol | Símbolo de la moneda | Comercial | text | No |  |  | Ingresá el texto de «símbolo de la moneda». |
| commerce.coupons | Cupones | Comercial | list | No |  |  | Agregá, quitá o reordená los elementos de «cupones». |
| commerce.coupons[].code | Código | Comercial | text | No |  |  | Ingresá el texto de «código». |
| commerce.coupons[].type | Tipo de descuento | Comercial | select | No |  |  | Elegí una opción para «tipo de descuento». |
| commerce.coupons[].value | Valor | Comercial | number | No |  |  | Ingresá el valor de «valor». |
| commerce.freeShippingThreshold | Monto mínimo para el envío gratis | Comercial | number | No |  |  | Ingresá el valor de «monto mínimo para el envío gratis». |
| commerce.transferDiscountPercent | Descuento por transferencia | Comercial | number | No |  |  | Ingresá el valor de «descuento por transferencia». |
| commerce.installmentsWithoutInterest | Cuotas sin interés | Comercial | number | No |  |  | Ingresá el valor de «cuotas sin interés». |
| commerce.expressShippingCost | Costo del envío rápido | Comercial | number | No |  |  | Ingresá el valor de «costo del envío rápido». |
| commerce.standardShippingDays | Plazo del envío estándar | Comercial | text | No |  |  | Ingresá el texto de «plazo del envío estándar». |
| commerce.expressShippingDays | Plazo del envío rápido | Comercial | text | No |  |  | Ingresá el texto de «plazo del envío rápido». |
| commerce.exchangePeriodDays | Plazo para cambios | Comercial | number | No |  |  | Ingresá el valor de «plazo para cambios». |
| announcement.enabled | Mostrar el aviso | Textos | boolean | No |  |  | Activá esta opción cuando corresponda. |
| announcement.text | Texto del aviso | Textos | text | No | {amount}, {installments} |  | Ingresá el texto de «texto del aviso». Variables: {amount} significa monto mínimo para el envío gratis; {installments} significa cantidad de cuotas sin interés. |
| hero.badge | Etiqueta destacada | Textos | text | No |  |  | Ingresá el texto de «etiqueta destacada». |
| hero.title | Título de la portada | Textos | text | No |  |  | Ingresá el texto de «título». |
| hero.subtitle | Bajada | Textos | text | No |  |  | Ingresá el texto de «bajada». |
| hero.promoCreditCard | Promoción con tarjeta | Textos | text | No | {installments} |  | Ingresá el texto de «promoción con tarjeta». Variables: {installments} significa cantidad de cuotas sin interés. |
| hero.promoTransfer | Promoción por transferencia | Textos | text | No | {percent} |  | Ingresá el texto de «promoción por transferencia». Variables: {percent} significa porcentaje de descuento por transferencia. |
| hero.bannerImageUrl | Imagen de portada | Imágenes | image | No |  | {"path":"/assets/hero/hero-1.jpg"} | Elegí la imagen que se usará para «imagen de portada». |
| hero.bannerImageAlt | Descripción de la imagen de portada | Textos | text | No |  |  | Ingresá el texto de «descripción de la imagen de portada». |
| hero.trustPill | Mensaje destacado | Textos | text | No |  |  | Ingresá el texto de «mensaje destacado». |
| copy.sizeAssistancePrompt | Mensaje para pedir ayuda con el talle | Textos | text | No |  |  | Ingresá el texto de «mensaje para pedir ayuda con el talle». |
| copy.giftPackagingTitle | Título del regalo | Textos | text | No |  |  | Ingresá el texto de «título del regalo». |
| copy.giftPackagingDescription | Descripción del regalo | Textos | textarea | No |  |  | Ingresá el texto de «descripción del regalo». |
| copy.footerAbout | Texto de presentación del pie | Textos de interfaz | text | No |  |  | Ingresá el texto de «texto de presentación del pie». |
| copy.whatsappShippingMessage | Mensaje sobre envíos y cambios | Textos | textarea | No |  |  | Ingresá el texto de «mensaje sobre envíos y cambios». |
| copy.whatsappFaqMessage | Mensaje sobre preguntas frecuentes | Textos | textarea | No |  |  | Ingresá el texto de «mensaje sobre preguntas frecuentes». |
| copy.whatsappSizeMessage | Mensaje sobre talles | Textos | textarea | No |  |  | Ingresá el texto de «mensaje sobre talles». |
| copy.whatsappOrderConfirmation | Mensaje para confirmar el pedido | Textos | textarea | No |  |  | Ingresá el texto de «mensaje para confirmar el pedido». |
| copy.catalogTitle | Título del catálogo | Textos | text | No |  |  | Ingresá el texto de «título del catálogo». |
| copy.catalogCollectionTitle | Título de la colección | Textos | text | No |  |  | Ingresá el texto de «título de la colección». |
| copy.customerServiceLabel | Nombre de atención al cliente | Textos | text | No |  |  | Ingresá el texto de «nombre de atención al cliente». |
| copy.handmadeGuarantee | Garantía del producto | Textos | text | No |  |  | Ingresá el texto de «garantía del producto». |
| copy.crossSellTitle | Título de productos relacionados | Textos | text | No |  |  | Ingresá el texto de «título de productos relacionados». |
| copy.checkoutOrderHeading | Título del pedido | Textos | text | No |  |  | Ingresá el texto de «título del pedido». |
| copy.thankYouMessage | Mensaje de agradecimiento | Textos | text | No |  |  | Ingresá el texto de «mensaje de agradecimiento». |
| copy.orderPreparationMessage | Mensaje de preparación del pedido | Textos | text | No |  |  | Ingresá el texto de «mensaje de preparación del pedido». |
| copy.giftDedicationPlaceholder | Ayuda para escribir una dedicatoria | Textos | text | No |  |  | Ingresá el texto de «ayuda para escribir una dedicatoria». |
| copy.checkoutPlaceholders.name | Nombre y apellido de quien recibe | Textos | text | No |  |  | Ingresá el texto que aparece en el campo para el nombre y apellido de quien recibe. |
| copy.checkoutPlaceholders.email | Correo electrónico | Textos | text | No |  |  | Ingresá el texto de «correo electrónico». |
| copy.checkoutPlaceholders.phone | Ayuda para ingresar el teléfono | Textos | text | No |  |  | Ingresá el texto de «ayuda para ingresar el teléfono». |
| copy.checkoutPlaceholders.street | Calle | Textos | text | No |  |  | Ingresá el texto de «calle». |
| copy.checkoutPlaceholders.apartment | Piso o departamento | Textos | text | No |  |  | Ingresá el texto de «piso o departamento». |
| copy.checkoutPlaceholders.zip | Código postal | Textos | text | No |  |  | Ingresá el texto de «código postal». |
| copy.checkoutPlaceholders.city | Localidad | Textos | text | No |  |  | Ingresá el texto de «localidad». |
| copy.checkoutPlaceholders.notes | Indicaciones de entrega | Textos | text | No |  |  | Ingresá el texto de «indicaciones de entrega». |
| copy.footerDisclaimer | Aviso de demostración | Textos de interfaz | textarea | No |  |  | Ingresá el texto de «aviso de demostración». |
| copy.catalogYear | Año de la colección | Textos | number | No |  |  | Ingresá el valor de «año de la colección». |
| copy.sizeHintFallback | Texto alternativo para el talle | Textos | text | No |  |  | Ingresá el texto de «texto alternativo para el talle». |
| ui.app.retry | Botón para volver a intentar | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.app.closeNotice | Cerrar el aviso | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.app.x-group | Dato | Secciones | text | No |  |  |  |
| ui.payment.received | Pago recibido | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.payment.verifyError | Error al verificar el pago | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.payment.pending | Pago pendiente | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.payment.failed | Pago fallido | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.payment.x-group | Dato | Secciones | text | No |  |  |  |
| ui.cart.emptyTitle | Título del carrito vacío | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.cart.emptyDescription | Descripción del carrito vacío | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.cart.keepShopping | Botón para seguir comprando | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.cart.title | Título del carrito | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.cart.trustProtectedTitle | Título sobre la protección de la compra | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.cart.trustExchangeTitle | Mensaje sobre los cambios de talle | Textos de interfaz | text | No | {days} |  | Ingresá el texto de «mensaje sobre cambios». Variables: {days} significa cantidad de días para cambios. |
| ui.cart.trustDispatchTitle | Título sobre los envíos | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.cart.stepBadge | Etiqueta del paso | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.cart.freeShippingTitle | Título del envío gratis | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.cart.nearFreeShippingTitle | Título del mensaje sobre cuánto falta para el envío gratis | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.cart.freeShippingReached | Mensaje de confirmación del envío gratis | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.cart.sizeLabel | Etiqueta del talle | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.cart.colorLabel | Etiqueta del color | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.cart.decreaseLabel | Descripción accesible del botón para restar | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.cart.increaseLabel | Descripción accesible del botón para sumar | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.cart.removeLabel | Descripción accesible del botón para eliminar | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.cart.noExtraCharge | Sin costo adicional | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.cart.dedicationPrompt | Indicación para escribir la dedicatoria | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.cart.dedicationFree | Dedicatoria sin cargo | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.cart.trustCottonTitle | Título de confianza sobre el algodón | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.cart.trustCottonText | Texto sobre la suavidad del algodón | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.cart.trustSizeExchangeTitle | Título sobre los cambios de talle | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.cart.trustSizeExchangeText | Texto sobre el cambio de talle | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.cart.trustSizeGuideText | Texto sobre la guía de talles | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.cart.summaryTitle | Título del resumen del pedido | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.cart.promoFallback | Promoción alternativa | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.cart.shippingCost | Costo del envío | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.cart.shippingPending | Envío pendiente | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.cart.couponPlaceholder | Ayuda para ingresar un cupón | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.cart.couponApply | Botón para aplicar el cupón | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.cart.couponInvalid | Cupón no válido | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.cart.total | Total | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.cart.paymentPrompt | Indicación para elegir el medio de pago | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.cart.mpTitle | Título de la opción de pago con Mercado Pago | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.cart.mpText | Descripción de la opción de pago con Mercado Pago | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.cart.whatsappTitle | Ayuda por WhatsApp | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.cart.whatsappText | Texto del botón de WhatsApp | Textos de interfaz | text | No | {percent} |  | Ingresá el texto de «texto del botón de whatsapp». Variables: {percent} significa porcentaje de descuento por transferencia. |
| ui.cart.sslNote | Aviso de conexión segura | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.cart.sizeHelpTitle | Título de la ayuda para elegir el talle | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.cart.sizeHelpText | Texto de ayuda para elegir el talle | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.cart.sizeHelpButton | Botón para consultar los talles | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.cart.upsellText | Texto del producto recomendado | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.cart.upsellFreeShipping | Mensaje de envío gratis para el producto recomendado | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.cart.upsellAdd | Botón para agregar el producto recomendado | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.cart.emptyButton | Botón para volver al catálogo | Textos de interfaz | text | No | {name} |  | Texto con variables que el sitio reemplaza solo: {name}. Dejalo vacío para ocultar el elemento. |
| ui.cart.orderTitle | Título del pedido | Textos de interfaz | text | No | {name} |  | Texto con variables que el sitio reemplaza solo: {name}. Dejalo vacío para ocultar el elemento. |
| ui.cart.itemSingular | Ítem (singular) | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.cart.itemPlural | Ítems (plural) | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.cart.itemsCount | Cantidad de productos | Textos de interfaz | text | No | {count}, {unit} |  | Texto con variables que el sitio reemplaza solo: {count}, {unit}. Dejalo vacío para ocultar el elemento. |
| ui.cart.reachedStart | Texto inicial del aviso de envío gratis | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.cart.reachedMiddle | Texto central del aviso de envío gratis | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.cart.reachedBadge | Etiqueta que confirma el envío gratis | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.cart.reachedEnd | Texto final del aviso de envío gratis | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.cart.nearStart | Inicio del mensaje sobre cuánto falta para el envío gratis | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.cart.nearMiddle | Parte central del mensaje sobre cuánto falta para el envío gratis | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.cart.nearStrong | Texto destacado sobre cuánto falta para el envío gratis | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.cart.nearEnd | Cierre del mensaje sobre cuánto falta para el envío gratis | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.cart.orderCode | Código del pedido | Textos de interfaz | text | No | {name} |  | Texto con variables que el sitio reemplaza solo: {name}. Dejalo vacío para ocultar el elemento. |
| ui.cart.subtotal | Subtotal | Textos de interfaz | text | No | {count} |  | Texto con variables que el sitio reemplaza solo: {count}. Dejalo vacío para ocultar el elemento. |
| ui.cart.discountLabel | Etiqueta del descuento | Textos de interfaz | text | No | {coupon} |  | Texto con variables que el sitio reemplaza solo: {coupon}. Dejalo vacío para ocultar el elemento. |
| ui.cart.installmentsStart | Inicio de la información de cuotas | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.cart.installmentsStrong | Importe destacado de las cuotas | Textos de interfaz | text | No | {count} |  | Texto con variables que el sitio reemplaza solo: {count}. Dejalo vacío para ocultar el elemento. |
| ui.cart.installmentsEnd | Cierre de la información de cuotas | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.cart.installmentOf | Texto que precede al importe de cada cuota | Textos de interfaz | text | No | {amount} |  | Texto con variables que el sitio reemplaza solo: {amount}. Dejalo vacío para ocultar el elemento. |
| ui.cart.transferLine | Descripción del pago por transferencia | Textos de interfaz | text | No | {percent} |  | Texto con variables que el sitio reemplaza solo: {percent}. Dejalo vacío para ocultar el elemento. |
| ui.cart.shippingFree | Envío gratis | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.cart.x-group | Dato | Secciones | text | No |  |  |  |
| ui.catalog.breadcrumbHome | Inicio de la navegación | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.catalog.badgeStock | Etiqueta de disponibilidad | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.catalog.badgeExpress | Distintivo de envío exprés | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.catalog.badgeLove | Etiqueta de afecto | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.catalog.sortLabel | Etiqueta del orden de productos | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.catalog.sortPopular | Ordenar por popularidad | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.catalog.sortPriceAsc | Ordenar por precio de menor a mayor | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.catalog.sortPriceDesc | Ordenar por precio de mayor a menor | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.catalog.sortDiscount | Ordenar por descuento | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.catalog.clearAll | Borrar todos los filtros | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.catalog.similarResults | Resultados similares | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.catalog.clearSearch | Limpiar búsqueda | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.catalog.emptyTitle | Título que se muestra cuando el catálogo no tiene resultados | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.catalog.emptyDescription | Descripción que se muestra cuando no hay resultados en el catálogo | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.catalog.viewAll | Botón para ver todos los productos | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.catalog.sizeCtaTitle | Título de la consulta de talles | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.catalog.sizeCtaButton | Botón para consultar los talles | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.catalog.pillSearch | Etiqueta del término de búsqueda | Textos de interfaz | text | No | {query} |  | Texto con variables que el sitio reemplaza solo: {query}. Dejalo vacío para ocultar el elemento. |
| ui.catalog.pillSize | Etiqueta del filtro de talle | Textos de interfaz | text | No | {size} |  | Texto con variables que el sitio reemplaza solo: {size}. Dejalo vacío para ocultar el elemento. |
| ui.catalog.pillColor | Etiqueta del filtro de color | Textos de interfaz | text | No | {color} |  | Texto con variables que el sitio reemplaza solo: {color}. Dejalo vacío para ocultar el elemento. |
| ui.catalog.pillPrice | Etiqueta del filtro de precio | Textos de interfaz | text | No | {price} |  | Texto con variables que el sitio reemplaza solo: {price}. Dejalo vacío para ocultar el elemento. |
| ui.catalog.productCount | Cantidad de productos | Textos de interfaz | text | No | {count} |  | Texto con variables que el sitio reemplaza solo: {count}. Dejalo vacío para ocultar el elemento. |
| ui.catalog.headline | Título del catálogo | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.catalog.modelsAvailable | Cantidad de productos disponibles | Textos de interfaz | text | No | {count} |  | Texto con variables que el sitio reemplaza solo: {count}. Dejalo vacío para ocultar el elemento. |
| ui.catalog.pagination | Texto de navegación entre páginas | Textos de interfaz | text | No | {page}, {shown}, {total} |  | Texto con variables que el sitio reemplaza solo: {page}, {shown}, {total}. Dejalo vacío para ocultar el elemento. |
| ui.catalog.filterButton | Botón para abrir los filtros | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.catalog.activeCount | Cantidad de filtros activos | Textos de interfaz | text | No | {count} |  | Texto con variables que el sitio reemplaza solo: {count}. Dejalo vacío para ocultar el elemento. |
| ui.catalog.allCategoryLabel | Opción para ver todas las categorías | Textos de interfaz | text | No |  |  | Ingresá el texto de «opción para ver todas las categorías». |
| ui.catalog.x-group | Dato | Secciones | text | No |  |  |  |
| ui.footer.helpTitle | Título de ayuda | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.footer.helpSizeGuide | Enlace a guía de talles | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.footer.helpShipping | Enlace a envíos y cambios | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.footer.helpFaq | Enlace a preguntas frecuentes | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.footer.paymentTitle | Título de los medios de pago | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.footer.contactTitle | Título de contacto | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.footer.love | Frase de cierre | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.footer.installmentsLine | Texto sobre las cuotas sin interés | Textos de interfaz | text | No | {count} |  | Texto con variables que el sitio reemplaza solo: {count}. Dejalo vacío para ocultar el elemento. |
| ui.footer.transferLabel | Etiqueta del pago por transferencia | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.footer.transferValue | Importe con descuento por transferencia | Textos de interfaz | text | No | {percent} |  | Texto con variables que el sitio reemplaza solo: {percent}. Dejalo vacío para ocultar el elemento. |
| ui.footer.shippingNote | Nota de envíos | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.footer.whatsappLine | Línea de WhatsApp | Textos de interfaz | text | No | {phone} |  | Texto con variables que el sitio reemplaza solo: {phone}. Dejalo vacío para ocultar el elemento. |
| ui.footer.instagramLine | Línea de Instagram | Textos de interfaz | text | No | {handle} |  | Texto con variables que el sitio reemplaza solo: {handle}. Dejalo vacío para ocultar el elemento. |
| ui.footer.copyright | Texto de derechos reservados | Textos de interfaz | text | No | {year}, {name} |  | Texto de derechos reservados. Variables: {year} indica el año actual y {name} el nombre de la marca. |
| ui.footer.x-group | Dato | Secciones | text | No |  |  |  |
| ui.header.season | Etiqueta de temporada | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.header.whatsappLong | Mensaje completo de WhatsApp | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.header.whatsappShort | Mensaje breve de WhatsApp | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.header.sizeGuide | Guía de talles | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.header.cartLabel | Descripción accesible del carrito | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.header.searchPlaceholder | Ayuda del buscador | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.header.clearSearch | Limpiar búsqueda | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.header.searchTitle | Ayuda del botón buscar | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.header.whatsappMessage | Mensaje de WhatsApp | Textos de interfaz | text | No | {name} |  | Texto con variables que el sitio reemplaza solo: {name}. Dejalo vacío para ocultar el elemento. |
| ui.header.x-group | Dato | Secciones | text | No |  |  |  |
| ui.hero.cta | Botón de acción | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.hero.ctaNote | Nota debajo del botón principal | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.hero.benefitInstallmentsTitle | Beneficio de cuotas | Textos de interfaz | text | No | {installments} |  | Ingresá el texto de «beneficio de cuotas». Variables: {installments} significa cantidad de cuotas sin interés. |
| ui.hero.benefitInstallmentsText | Texto del beneficio de cuotas | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.hero.benefitShippingText | Texto del beneficio de envío | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.hero.benefitExchangeText | Texto del beneficio de cambio | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.hero.freeShippingBadge | Etiqueta de envío gratis | Textos de interfaz | text | No | {amount} |  | Texto con variables que el sitio reemplaza solo: {amount}. Dejalo vacío para ocultar el elemento. |
| ui.hero.benefitShippingTitle | Título del beneficio de envío | Textos de interfaz | text | No | {amount} |  | Texto con variables que el sitio reemplaza solo: {amount}. Dejalo vacío para ocultar el elemento. |
| ui.hero.benefitExchangeTitle | Título del beneficio de cambio | Textos de interfaz | text | No | {days} |  | Texto con variables que el sitio reemplaza solo: {days}. Dejalo vacío para ocultar el elemento. |
| ui.hero.x-group | Dato | Secciones | text | No |  |  |  |
| ui.mobileFilters.title | Título de los filtros móviles | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.mobileFilters.clear | Botón para limpiar los filtros | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.mobileFilters.apply | Aplicar los cambios | Textos de interfaz | text | No | {count} |  | Texto con variables que el sitio reemplaza solo: {count}. Dejalo vacío para ocultar el elemento. |
| ui.mobileFilters.x-group | Dato | Secciones | text | No |  |  |  |
| ui.orderSuccess.title | Título de la confirmación del pedido | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.orderSuccess.nextTitle | Título del siguiente paso | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.orderSuccess.nextTracking | Información sobre el seguimiento del pedido | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.orderSuccess.nextExchange | Mensaje sobre los cambios de talle | Textos de interfaz | text | No | {days} |  | Ingresá el texto de «mensaje sobre cambios». Variables: {days} significa cantidad de días para cambios. |
| ui.orderSuccess.whatsapp | Texto del botón de WhatsApp | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.orderSuccess.back | Volver | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.orderSuccess.registered | Confirmación del registro del pedido | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.orderSuccess.paymentMethod | Medio de pago | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.orderSuccess.x-group | Dato | Secciones | text | No |  |  |  |
| ui.productCard.removeFavorite | Quitar de favoritos | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.productCard.addFavorite | Agregar a favoritos | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.productCard.mercadoPago | Mercado Pago | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.productCard.chooseSize | Seleccionar el talle | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.productCard.addToCart | Agregar al carrito | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.productCard.moreColors | Más colores | Textos de interfaz | text | No | {count} |  | Texto con variables que el sitio reemplaza solo: {count}. Dejalo vacío para ocultar el elemento. |
| ui.productCard.installmentsStart | Inicio de la información de cuotas | Textos de interfaz | text | No | {count} |  | Texto con variables que el sitio reemplaza solo: {count}. Dejalo vacío para ocultar el elemento. |
| ui.productCard.noInterest | Sin interés | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.productCard.x-group | Dato | Secciones | text | No |  |  |  |
| ui.sizeGuide.title | Título de la guía de talles | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.sizeGuide.subtitle | Subtítulo de la guía de talles | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.sizeGuide.babyStage | Etapa del bebé | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.sizeGuide.kidsStage | Etapa infantil | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.sizeGuide.colSize | Columna de talle | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.sizeGuide.colAge | Columna de edad | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.sizeGuide.colHeight | Columna de altura | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.sizeGuide.colWeight | Columna de peso | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.sizeGuide.colLength | Columna de largo | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.sizeGuide.colArmhole | Columna de sisa | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.sizeGuide.colChest | Columna de pecho | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.sizeGuide.colWaist | Columna de cintura | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.sizeGuide.close | Cerrar | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.sizeGuide.cm | Medida en centímetros | Textos de interfaz | text | No | {value} |  | Texto con variables que el sitio reemplaza solo: {value}. Dejalo vacío para ocultar el elemento. |
| ui.sizeGuide.x-group | Dato | Secciones | text | No |  |  |  |
| ui.checkout.errors.name | Nombre | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.checkout.errors.emailRequired | Aviso de correo electrónico obligatorio | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.checkout.errors.emailInvalid | Aviso de correo electrónico no válido | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.checkout.errors.phone | Teléfono | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.checkout.errors.street | Calle | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.checkout.errors.zip | Código postal | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.checkout.errors.city | Ciudad | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.checkout.errors.mpNotConfigured | Mercado Pago no está configurado | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.checkout.errors.mpInvalidPreference | Aviso de preferencia de pago no válida | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.checkout.errors.mpUnexpected | Error inesperado de Mercado Pago | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.checkout.errors.paymentFailed | Pago no completado | Textos de interfaz | text | No | {status}, {details} |  | Texto con variables que el sitio reemplaza solo: {status}, {details}. Dejalo vacío para ocultar el elemento. |
| ui.checkout.errors.x-group | Dato | Secciones | text | No |  |  |  |
| ui.checkout.paymentWhatsapp | Pago por WhatsApp | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.checkout.banner | Aviso de seguridad de la compra | Textos de interfaz | text | No | {installments} |  | Ingresá el texto de «aviso del pago». Variables: {installments} significa cantidad de cuotas sin interés. |
| ui.checkout.backToCart | Volver al carrito | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.checkout.secureBadge | Etiqueta de compra segura | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.checkout.step1 | Paso 1 | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.checkout.step2 | Paso 2 | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.checkout.step3 | Paso 3 | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.checkout.contactTitle | Título de contacto | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.checkout.stepOfTwo | Texto que indica el paso actual y el total de pasos | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.checkout.emailLabel | Etiqueta del campo de correo electrónico | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.checkout.phoneLabel | Etiqueta del campo de teléfono | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.checkout.phoneHelp | Ayuda para ingresar el teléfono | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.checkout.nameLabel | Etiqueta del campo de nombre | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.checkout.deliveryPrompt | Indicación para elegir la entrega | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.checkout.standardTitle | Título del envío estándar | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.checkout.standardBadge | Distintivo del envío estándar | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.checkout.standardText | Descripción del envío estándar | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.checkout.expressTitle | Título del envío exprés | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.checkout.expressBadge | Distintivo del envío exprés | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.checkout.expressText | Descripción del envío exprés | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.checkout.free | Sin cargo | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.checkout.streetLabel | Etiqueta del campo de calle | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.checkout.apartmentLabel | Etiqueta del campo de piso o departamento | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.checkout.zipLabel | Etiqueta del código postal | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.checkout.cityLabel | Etiqueta del campo de ciudad | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.checkout.notesLabel | Etiqueta del campo de notas | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.checkout.paymentTitle | Título de los medios de pago | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.checkout.paymentBadge | Etiqueta de pago | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.checkout.mpTitle | Título de la opción de pago con Mercado Pago | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.checkout.mpRecommended | Opción de pago recomendada de Mercado Pago | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.checkout.mpText | Descripción de la opción de pago con Mercado Pago | Textos de interfaz | textarea | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.checkout.methodVisa | Tarjeta Visa | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.checkout.methodMastercard | Tarjeta Mastercard | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.checkout.methodAmex | Tarjeta American Express | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.checkout.methodNaranja | Tarjeta Naranja | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.checkout.methodDebit | Tarjeta de débito | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.checkout.methodCash | Pago en efectivo | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.checkout.methodBalance | Saldo de Mercado Pago | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.checkout.installmentsPrompt | Indicación para elegir las cuotas | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.checkout.installmentOne | Un pago | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.checkout.installmentThree | Descripción de las cuotas sin interés | Textos de interfaz | text | No | {installments} |  | Ingresá el texto de «texto de cuotas». Variables: {installments} significa cantidad de cuotas sin interés. |
| ui.checkout.installmentCft | Costo financiero total de las cuotas | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.checkout.generating | Estado de generación del pago | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.checkout.redirectNote | Aviso sobre la redirección | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.checkout.orCoordinate | Opción para coordinar el pago | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.checkout.whatsappTitle | Ayuda por WhatsApp | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.checkout.whatsappBadge | Etiqueta de WhatsApp | Textos de interfaz | text | No | {percent} |  | Ingresá el texto de «etiqueta de whatsapp». Variables: {percent} significa porcentaje de descuento por transferencia. |
| ui.checkout.sizeCheck | Confirmación del talle | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.checkout.whatsappConfirm | Confirmación por WhatsApp | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.checkout.summaryTitle | Título del resumen de compra | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.checkout.subtotal | Subtotal | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.checkout.discount | Descuento | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.checkout.shippingSelected | Envío seleccionado | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.checkout.total | Total | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.checkout.guaranteeTitle | Garantía de cambio | Textos de interfaz | text | No | {days} |  | Ingresá el texto de «garantía de cambio». Variables: {days} significa cantidad de días para cambios. |
| ui.checkout.guaranteeText | Descripción de la garantía | Textos de interfaz | textarea | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.checkout.trustExchange | Garantía de cambio | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.checkout.trustGift | Garantía de regalo | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.checkout.trustSupport | Garantía de asistencia | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.checkout.demoNotice | Aviso de demostración | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.checkout.demoTitle | Título del pago de demostración | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.checkout.demoDetails | Detalles del modo de demostración | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.checkout.demoCurrency | Moneda de demostración | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.checkout.demoModeLocal | Modo de demostración local | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.checkout.demoOpen | Abrir la demostración | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.checkout.demoSimulate | Simular el pago | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.checkout.demoBack | Volver desde la demostración | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.checkout.dedicationNote | Nota para la dedicatoria | Textos de interfaz | text | No | {text} |  | Texto con variables que el sitio reemplaza solo: {text}. Dejalo vacío para ocultar el elemento. |
| ui.checkout.whatsapp.itemLine | Texto con los datos del producto en el pedido | Textos de interfaz | text | No | {quantity}, {name}, {size}, {color}, {price} |  | Texto con variables que el sitio reemplaza solo: {quantity}, {name}, {size}, {color}, {price}. Dejalo vacío para ocultar el elemento. |
| ui.checkout.whatsapp.pickup | Retiro en el local | Textos de interfaz | text | No | {address} |  | Texto con variables que el sitio reemplaza solo: {address}. Dejalo vacío para ocultar el elemento. |
| ui.checkout.whatsapp.express | Exprés | Textos de interfaz | text | No | {address}, {price} |  | Texto con variables que el sitio reemplaza solo: {address}, {price}. Dejalo vacío para ocultar el elemento. |
| ui.checkout.whatsapp.standard | Estándar | Textos de interfaz | text | No | {address} |  | Texto con variables que el sitio reemplaza solo: {address}. Dejalo vacío para ocultar el elemento. |
| ui.checkout.whatsapp.notes | Notas para la entrega | Textos de interfaz | textarea | No | {notes} |  | Texto con variables que el sitio reemplaza solo: {notes}. Dejalo vacío para ocultar el elemento. |
| ui.checkout.whatsapp.message | Mensaje | Textos de interfaz | textarea | No | {heading}, {name}, {customer}, {phone}, {email}, {items}, {delivery}, {notes}, {total}, {percent}, {transferTotal}, {savings} |  | Texto con variables que el sitio reemplaza solo: {heading}, {name}, {customer}, {phone}, {email}, {items}, {delivery}, {notes}, {total}, {percent}, {transferTotal}, {savings}. Dejalo vacío para ocultar el elemento. |
| ui.checkout.whatsapp.x-group | Dato | Secciones | text | No |  |  |  |
| ui.checkout.pickupTitle | Título del retiro en el local | Textos de interfaz | text | No | {name} |  | Texto con variables que el sitio reemplaza solo: {name}. Dejalo vacío para ocultar el elemento. |
| ui.checkout.pickupHours | Horario de retiro | Textos de interfaz | text | No | {hours} |  | Texto con variables que el sitio reemplaza solo: {hours}. Dejalo vacío para ocultar el elemento. |
| ui.checkout.installmentAmount | Importe de cada cuota | Textos de interfaz | text | No | {count}, {amount} |  | Texto con variables que el sitio reemplaza solo: {count}, {amount}. Dejalo vacío para ocultar el elemento. |
| ui.checkout.payButton | Botón para pagar | Textos de interfaz | text | No | {amount} |  | Texto con variables que el sitio reemplaza solo: {amount}. Dejalo vacío para ocultar el elemento. |
| ui.checkout.transferStart | Texto inicial sobre el pago por transferencia | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.checkout.transferStrong | Texto destacado del pago por transferencia | Textos de interfaz | text | No | {percent}, {amount} |  | Texto con variables que el sitio reemplaza solo: {percent}, {amount}. Dejalo vacío para ocultar el elemento. |
| ui.checkout.transferEnd | Cierre de la información de transferencia | Textos de interfaz | textarea | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.checkout.savingsLine | Texto sobre el ahorro | Textos de interfaz | text | No | {amount} |  | Texto con variables que el sitio reemplaza solo: {amount}. Dejalo vacío para ocultar el elemento. |
| ui.checkout.itemsCount | Cantidad de productos | Textos de interfaz | text | No | {count} |  | Texto con variables que el sitio reemplaza solo: {count}. Dejalo vacío para ocultar el elemento. |
| ui.checkout.itemSizeColor | Talle y color del producto | Textos de interfaz | text | No | {size}, {color} |  | Texto con variables que el sitio reemplaza solo: {size}, {color}. Dejalo vacío para ocultar el elemento. |
| ui.checkout.itemQuantity | Cantidad de productos | Textos de interfaz | text | No | {quantity} |  | Texto con variables que el sitio reemplaza solo: {quantity}. Dejalo vacío para ocultar el elemento. |
| ui.checkout.totalTransfer | Total con descuento por transferencia | Textos de interfaz | text | No | {amount} |  | Texto con variables que el sitio reemplaza solo: {amount}. Dejalo vacío para ocultar el elemento. |
| ui.checkout.demoTextStart | Inicio del texto de demostración | Textos de interfaz | textarea | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.checkout.demoTextEnd | Cierre del texto de demostración | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.checkout.demoPrefId | Identificador de preferencia de demostración | Textos de interfaz | text | No | {id} |  | Texto con variables que el sitio reemplaza solo: {id}. Dejalo vacío para ocultar el elemento. |
| ui.checkout.demoMode | Modo de demostración | Textos de interfaz | text | No | {mode} |  | Texto con variables que el sitio reemplaza solo: {mode}. Dejalo vacío para ocultar el elemento. |
| ui.checkout.demoModeReal | Modo real | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.checkout.demoMethodLabel | Etiqueta del medio de pago de demostración | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.checkout.x-group | Dato | Secciones | text | No |  |  |  |
| ui.filters.activeTitle | Título de la sección de filtros activos | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.filters.activeEmpty | Aviso cuando no hay filtros | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.filters.clear | Botón para limpiar los filtros | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.filters.removeLabel | Descripción accesible del botón para eliminar | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.filters.categories | Categorías | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.filters.categoriesBadge | Etiqueta de la categoría | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.filters.sizesTitle | Título de la sección de talles | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.filters.sizeGuideLink | Enlace a la guía de talles | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.filters.babyStage | Etapa del bebé | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.filters.kidsStage | Etapa infantil | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.filters.colors | Colores | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.filters.price | Precio | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.filters.priceCurrency | Moneda del rango | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.filters.priceMin | Mínimo | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.filters.fabrics | Telas y comodidad | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.filters.ageNewborn | Filtro por edad para recién nacidos | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.filters.ageBabies | Filtro por edad para bebés | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.filters.ageKids | Filtro por edad para niños | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.filters.selectedCount | Filtros seleccionados | Textos de interfaz | text | No | {count} |  | Texto con variables que el sitio reemplaza solo: {count}. Dejalo vacío para ocultar el elemento. |
| ui.filters.priceUpTo | Límite máximo | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.filters.x-group | Dato | Secciones | text | No |  |  |  |
| ui.productDetail.breadcrumbLabel | Descripción accesible de la navegación | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.productDetail.breadcrumbHome | Inicio de la navegación | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.productDetail.badgeHypoallergenic | Sello hipoalergénico | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.productDetail.favoriteLabel | Etiqueta de favoritos | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.productDetail.zoomOut | Alejar la imagen | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.productDetail.zoomIn | Ampliar la imagen | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.productDetail.featureCottonTitle | Título de la característica del algodón | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.productDetail.featureCottonText | Descripción de la característica del algodón | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.productDetail.featureSeamsTitle | Título de la característica de las costuras | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.productDetail.featureSeamsText | Descripción de la característica de las costuras | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.productDetail.featureSnapsTitle | Título de la característica de los broches | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.productDetail.featureSnapsText | Descripción de la característica de los broches | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.productDetail.reviews | Opiniones de clientes | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.productDetail.colorLabel | Etiqueta del color | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.productDetail.sizeLabel | Etiqueta del talle | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.productDetail.sizeTable | Enlace a la tabla de talles | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.productDetail.inStock | Disponible | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.productDetail.weight1 | Peso máximo del talle de recién nacido | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.productDetail.weight2 | Peso máximo del talle de 0 a 3 meses | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.productDetail.weight3 | Peso máximo del talle de 3 a 6 meses | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.productDetail.weight4 | Peso máximo del talle de 6 a 9 meses | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.productDetail.weight5 | Peso máximo del talle de 9 a 12 meses | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.productDetail.weight6 | Peso máximo del talle de 12 a 18 meses | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.productDetail.available | Disponibilidad | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.productDetail.tipText | Descripción del consejo | Textos de interfaz | textarea | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.productDetail.decreaseLabel | Descripción accesible del botón para restar | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.productDetail.increaseLabel | Descripción accesible del botón para sumar | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.productDetail.askAvailability | Consultar disponibilidad | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.productDetail.careTitle | Título de la sección de cuidados de la prenda | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.productDetail.careWash | Instrucciones de lavado | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.productDetail.careSoap | Jabón | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.productDetail.careDry | Instrucciones de secado | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.productDetail.careIron | Instrucciones de planchado | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.productDetail.shippingTitle | Título de la sección de envíos | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.productDetail.shippingExpress | Envíos exprés | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.productDetail.exchangeTitle | Mensaje sobre los cambios de talle | Textos de interfaz | text | No | {days} |  | Ingresá el texto de «mensaje sobre cambios». Variables: {days} significa cantidad de días para cambios. |
| ui.productDetail.exchangeIntro | Introducción a los cambios de talle | Textos de interfaz | textarea | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.productDetail.exchangeFirst | Información sobre el primer cambio | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.productDetail.guideTitle | Título de la guía de talles | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.productDetail.guideSubtitle | Subtítulo de la guía de talles | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.productDetail.guideTip | Etiqueta del consejo | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.productDetail.colSize | Columna de talle | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.productDetail.colAge | Columna de edad | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.productDetail.colHeight | Columna de altura | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.productDetail.colWeight | Columna de peso | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.productDetail.colLength | Columna de largo | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.productDetail.colArmhole | Columna de sisa | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.productDetail.colMoment | Columna que describe el momento de uso | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.productDetail.measureTitle | Título de cómo medir | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.productDetail.measureText | Texto de cómo medir | Textos de interfaz | textarea | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.productDetail.helpTitle | Título de la sección de ayuda sobre talles | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.productDetail.helpButton | Botón de ayuda | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.productDetail.addedToast | Aviso de producto agregado | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.productDetail.viewAlt | Descripción alternativa de la imagen | Textos de interfaz | text | No | {number} |  | Texto con variables que el sitio reemplaza solo: {number}. Dejalo vacío para ocultar el elemento. |
| ui.productDetail.lineTitle | Título de la línea de productos | Textos de interfaz | text | No | {name}, {fabric} |  | Texto con variables que el sitio reemplaza solo: {name}, {fabric}. Dejalo vacío para ocultar el elemento. |
| ui.productDetail.savings | Importe que ahorrás | Textos de interfaz | text | No | {amount} |  | Texto con variables que el sitio reemplaza solo: {amount}. Dejalo vacío para ocultar el elemento. |
| ui.productDetail.transferText | Información sobre el pago por transferencia | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.productDetail.transferBadge | Etiqueta de pago por transferencia | Textos de interfaz | text | No | {percent} |  | Texto con variables que el sitio reemplaza solo: {percent}. Dejalo vacío para ocultar el elemento. |
| ui.productDetail.installments | Cuotas sin interés | Textos de interfaz | text | No | {count}, {amount} |  | Texto con variables que el sitio reemplaza solo: {count}, {amount}. Dejalo vacío para ocultar el elemento. |
| ui.productDetail.colorsCount | Cantidad de colores disponibles | Textos de interfaz | text | No | {count} |  | Texto con variables que el sitio reemplaza solo: {count}. Dejalo vacío para ocultar el elemento. |
| ui.productDetail.lastUnits | Últimas unidades | Textos de interfaz | text | No | {stock} |  | Texto con variables que el sitio reemplaza solo: {stock}. Dejalo vacío para ocultar el elemento. |
| ui.productDetail.tipTitle | Título del consejo | Textos de interfaz | text | No | {name} |  | Texto con variables que el sitio reemplaza solo: {name}. Dejalo vacío para ocultar el elemento. |
| ui.productDetail.addToOrder | Botón para agregar al pedido | Textos de interfaz | text | No | {price} |  | Texto con variables que el sitio reemplaza solo: {price}. Dejalo vacío para ocultar el elemento. |
| ui.productDetail.careComposition | Composición | Textos de interfaz | text | No | {fabric} |  | Texto con variables que el sitio reemplaza solo: {fabric}. Dejalo vacío para ocultar el elemento. |
| ui.productDetail.shippingFreeLabel | Etiqueta de envío gratis | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.productDetail.shippingFreeText | Descripción del envío gratis | Textos de interfaz | text | No | {amount} |  | Texto con variables que el sitio reemplaza solo: {amount}. Dejalo vacío para ocultar el elemento. |
| ui.productDetail.pickupLabel | Etiqueta de retiro | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.productDetail.pickupText | Información sobre el retiro | Textos de interfaz | text | No | {address}, {hours} |  | Texto con variables que el sitio reemplaza solo: {address}, {hours}. Dejalo vacío para ocultar el elemento. |
| ui.productDetail.exchangeStart | Texto inicial sobre los cambios | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.productDetail.exchangeStrong | Texto destacado sobre los cambios de talle | Textos de interfaz | text | No | {days} |  | Texto con variables que el sitio reemplaza solo: {days}. Dejalo vacío para ocultar el elemento. |
| ui.productDetail.exchangeEnd | Cierre del mensaje sobre los cambios | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.productDetail.guideTipText | Texto del consejo | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.productDetail.sizeHints | Ayudas para elegir el talle | Textos de interfaz | list | No |  |  | Agregá, quitá o reordená los elementos de «ayudas para elegir talle». |
| ui.productDetail.sizeHints[].sizeFragment | Talle al que corresponde la ayuda | Textos de interfaz | text | No |  |  | Ingresá el texto de «talle al que corresponde la ayuda». |
| ui.productDetail.sizeHints[].text | Ayuda para elegir el talle | Textos de interfaz | text | No |  |  | Ingresá el texto de «ayuda para elegir el talle». |
| ui.productDetail.sizeHints[].x-group | Dato | Secciones | text | No |  |  |  |
| ui.productDetail.x-group | Dato | Secciones | text | No |  |  |  |
| ui.whatsapp.greeting | Saludo | Textos de interfaz | text | No | {name}, {message} |  | Texto con variables que el sitio reemplaza solo: {name}, {message}. Dejalo vacío para ocultar el elemento. |
| ui.whatsapp.greetingOrder | Saludo con el número de pedido | Textos de interfaz | text | No | {name}, {message}, {order} |  | Texto con variables que el sitio reemplaza solo: {name}, {message}, {order}. Dejalo vacío para ocultar el elemento. |
| ui.whatsapp.productInterest | Interés en un producto | Textos de interfaz | textarea | No | {name}, {product}, {size}, {color} |  | Texto con variables que el sitio reemplaza solo: {name}, {product}, {size}, {color}. Dejalo vacío para ocultar el elemento. |
| ui.whatsapp.x-group | Dato | Secciones | text | No |  |  |  |
| ui.defaults.size | Talle | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.defaults.color | Color | Textos de interfaz | text | No |  |  | Texto de la interfaz. Dejalo vacío para ocultar el elemento. |
| ui.defaults.x-group | Dato | Secciones | text | No |  |  |  |
| ui.x-group | Dato | Secciones | text | No |  |  |  |
| $schema | Archivo del esquema | Secciones | text | No |  |  | Ruta al esquema que define esta configuración. |

## Catálogo

Esquema: `src/data/catalog.schema.json`

| Campo | Título | Grupo | Control | Opcional | Variables | Imagen | Descripción |
|---|---|---|---|---|---|---|---|
| $schema | Archivo del esquema | Comercial | text | No |  |  | Ruta al esquema que define esta configuración. |
| schemaVersion | Versión del esquema | Comercial | number | No |  |  | Versión del formato de configuración. |
| categories | Categorías | Comercial | list | No |  |  | Agregá, quitá o reordená los elementos de «categorías». |
| categories[].id | Identificador | Comercial | text | No |  |  | Ingresá el texto de «identificador». |
| categories[].label | Nombre para mostrar | Textos | text | No |  |  | Ingresá el texto de «nombre para mostrar». |
| categories[].emoji | Ícono de la categoría | Comercial | text | No |  |  | Un emoji |
| categories[].x-group | Dato | Secciones | text | No |  |  |  |
| products | Productos | Comercial | list | No |  |  | Agregá, quitá o reordená los elementos de «productos». |
| products[].id | Identificador | Comercial | text | No |  |  | Ingresá el texto de «identificador». |
| products[].name | Nombre del producto | Textos | text | No |  |  | Ingresá el texto de «nombre del producto». |
| products[].category | Categoría | Comercial | text | No |  |  | Ingresá el texto de «categoría». |
| products[].subcategory | Subcategoría | Comercial | text | No |  |  | Ingresá el texto de «subcategoría». |
| products[].price | Precio | Comercial | number | No |  |  | Ingresá el valor de «precio». |
| products[].compareAtPrice | Precio anterior | Comercial | number | Sí |  |  | Ingresá el valor de «precio anterior». |
| products[].sizes | Talles disponibles | Comercial | list | No |  |  | Agregá, quitá o reordená los elementos de «talles disponibles». |
| products[].sizes[] | Talle disponible | Comercial | text | No |  |  | Ingresá el texto de «talle disponible». |
| products[].colors | Colores disponibles | Comercial | list | No |  |  | Agregá, quitá o reordená los elementos de «colores disponibles». |
| products[].colors[].name | Nombre del producto | Comercial | text | No |  |  | Ingresá el texto de «nombre del producto». |
| products[].colors[].hex | Código del color | Comercial | color | No |  |  | Elegí el color para «código del color». |
| products[].colors[].colorFamily | Familia del color | Comercial | select | Sí |  |  | Elegí una opción para «familia del color». |
| products[].colors[].x-group | Dato | Secciones | text | No |  |  |  |
| products[].images | Imágenes del producto | Imágenes | list | No |  |  | Agregá, quitá o reordená los elementos de «imágenes del producto». |
| products[].images[] | Foto del producto | Imágenes | image | No |  | {"path":"/assets/products/{id}.jpg","minWidth":900,"ratios":["4:5","1:1"],"ratioTolerance":0.02} | Elegí una foto del producto. La variante WebP con el mismo nombre se genera mediante images:optimize. |
| products[].description | Descripción | Textos | textarea | No |  |  | Ingresá el texto de «descripción». |
| products[].shortDescription | Descripción breve del producto | Textos | textarea | No |  |  | Ingresá el texto de «descripción breve del producto». |
| products[].material | Material | Comercial | text | No |  |  | Ingresá el texto de «material». |
| products[].badge | Etiqueta destacada | Textos | text | Sí |  |  | Ingresá el texto de «etiqueta destacada». |
| products[].badgeType | Tipo de etiqueta | Comercial | select | Sí |  |  | Elegí una opción para «tipo de etiqueta». |
| products[].features | Características | Textos | list | No |  |  | Agregá, quitá o reordená los elementos de «características». |
| products[].features[] | Característica del producto | Textos | text | No |  |  | Ingresá el texto de «característica del producto». |
| products[].careInstructions | Cuidados | Textos | list | No |  |  | Agregá, quitá o reordená los elementos de «cuidados». |
| products[].careInstructions[] | Instrucción de cuidado | Textos | textarea | No |  |  | Ingresá el texto de «instrucción de cuidado». |
| products[].stockBySize | Stock por talle | Comercial | list | No |  |  | Indicá la cantidad disponible para cada talle. |
| products[].stockBySize.* | Cantidad disponible | Comercial | number | No |  |  | Ingresá la cantidad de unidades disponibles. |
| products[].featured | Destacar el producto | Comercial | boolean | Sí |  |  | Activá esta opción cuando corresponda. |
| products[].tags | Etiquetas de búsqueda | Comercial | list | No |  |  | Agregá, quitá o reordená los elementos de «etiquetas de búsqueda». |
| products[].tags[] | Etiqueta de búsqueda | Comercial | select | No |  |  | Elegí una opción para «etiqueta de búsqueda». |
| products[].isBundle | Es un conjunto | Comercial | boolean | Sí |  |  | Activá esta opción cuando corresponda. |
| products[].ageStagesOverride | Etapas de edad del producto | Comercial | list | Sí |  |  | Agregá, quitá o reordená los elementos de «etapas de edad del producto». |
| products[].ageStagesOverride[] | Etapa de edad | Comercial | select | No |  |  | Elegí una opción para «etapa de edad». |
| products[].x-group | Dato | Secciones | text | No |  |  |  |
| filters.fabrics | Materiales para filtrar | Comercial | list | No |  |  | Agregá, quitá o reordená los elementos de «materiales para filtrar». |
| filters.fabrics[] | Material para filtrar | Comercial | text | No |  |  | Ingresá el texto de «material para filtrar». |
| filters.babySizes | Talles de bebé | Comercial | list | No |  |  | Agregá, quitá o reordená los elementos de «talles de bebé». |
| filters.babySizes[] | Talle de bebé | Comercial | text | No |  |  | Ingresá el texto de «talle de bebé». |
| filters.kidsSizes | Talles de niños | Comercial | list | No |  |  | Agregá, quitá o reordená los elementos de «talles de niños». |
| filters.kidsSizes[] | Talle infantil | Comercial | text | No |  |  | Ingresá el texto de «talle infantil». |
| filters.colorSwatches | Colores para filtrar | Comercial | list | No |  |  | Agregá, quitá o reordená los elementos de «colores para filtrar». |
| filters.colorSwatches[].id | Identificador | Comercial | text | No |  |  | Ingresá el texto de «identificador». |
| filters.colorSwatches[].name | Nombre del producto | Textos | text | No |  |  | Ingresá el texto de «nombre del producto». |
| filters.colorSwatches[].hex | Código del color | Comercial | color | No |  |  | Elegí el color para «código del color». |
| filters.colorSwatches[].x-group | Dato | Secciones | text | No |  |  |  |
| filters.quickFilters | Filtros rápidos | Comercial | list | No |  |  | Agregá, quitá o reordená los elementos de «filtros rápidos». |
| filters.quickFilters[].id | Identificador | Comercial | text | No |  |  | Ingresá el texto de «identificador». |
| filters.quickFilters[].axis | Eje del filtro | Comercial | select | No |  |  | Elegí una opción para «eje del filtro». |
| filters.quickFilters[].value | Valor | Comercial | text | No |  |  | Ingresá el texto de «valor». |
| filters.quickFilters[].label | Nombre para mostrar | Comercial | text | No |  |  | Ingresá el texto de «nombre para mostrar». |
| filters.quickFilters[].emoji | Ícono de la categoría | Comercial | text | No |  |  | Un emoji |
| filters.quickFilters[].activeClass | Estilo del filtro activo | Comercial | text | No |  |  | Ingresá el texto de «estilo del filtro activo». |
| filters.quickFilters[].idleClass | Estilo del filtro inactivo | Comercial | text | No |  |  | Ingresá el texto de «estilo del filtro inactivo». |
| filters.quickFilters[].activeLabel | Rótulo del filtro seleccionado | Comercial | text | Sí |  |  | Ingresá el texto de «rótulo del filtro seleccionado». |
| filters.quickFilters[].x-group | Dato | Secciones | text | No |  |  |  |
| filters.stageSizes.recien-nacidos | Etapa de recién nacidos | Comercial | list | No |  |  | Agregá, quitá o reordená los elementos de «etapa de recién nacidos». |
| filters.stageSizes.recien-nacidos[] | Talle de recién nacido | Comercial | text | No |  |  | Ingresá el texto de «talle de recién nacido». |
| filters.stageSizes.bebes | Etapa de bebés | Comercial | list | No |  |  | Agregá, quitá o reordená los elementos de «etapa de bebés». |
| filters.stageSizes.bebes[] | Talle de bebé | Comercial | text | No |  |  | Ingresá el texto de «talle de bebé». |
| filters.stageSizes.ninos | Etapa de niños | Comercial | list | No |  |  | Agregá, quitá o reordená los elementos de «etapa de niños». |
| filters.stageSizes.ninos[] | Talle infantil | Comercial | text | No |  |  | Ingresá el texto de «talle infantil». |
| filters.stageSizes.x-group | Dato | Secciones | text | No |  |  |  |
| filters.x-group | Dato | Secciones | text | No |  |  |  |
| settings.crossSellCategory | Categoría de productos relacionados | Comercial | text | No |  |  | Ingresá el texto de «categoría de productos relacionados». |
| settings.babySizeAlias | Equivalencia de talle de bebé | Comercial | text | No |  |  | Ingresá el texto de «equivalencia de talle de bebé». |
| settings.singleSizeAlias | Equivalencia de talle único | Comercial | text | No |  |  | Ingresá el texto de «equivalencia de talle único». |
| settings.x-group | Dato | Secciones | text | No |  |  |  |
| x-group | Dato | Secciones | text | No |  |  |  |

## Guía de talles

Esquema: `src/data/size-guide.schema.json`

| Campo | Título | Grupo | Control | Opcional | Variables | Imagen | Descripción |
|---|---|---|---|---|---|---|---|
| $schema | Archivo del esquema | Comercial | text | No |  |  | Ruta al esquema que define esta configuración. |
| schemaVersion | Versión del esquema | Comercial | number | No |  |  | Versión del formato de configuración. |
| babySizes | Talles de bebé | Comercial | list | No |  |  | Agregá, quitá o reordená los elementos de «talles de bebé». |
| babySizes[].size | Talle | Comercial | text | No |  |  | Ingresá el texto de «talle». |
| babySizes[].suggestedAge | Edad sugerida | Comercial | text | No |  |  | Ingresá el texto de «edad sugerida». |
| babySizes[].heightCm | Altura en centímetros | Comercial | text | No |  |  | Ingresá el texto de «altura en centímetros». |
| babySizes[].weightKg | Peso en kilogramos | Comercial | text | No |  |  | Ingresá el texto de «peso en kilogramos». |
| babySizes[].totalLengthCm | Largo total en centímetros | Comercial | number | No |  |  | Ingresá el valor de «largo total en centímetros». |
| babySizes[].armholeWidthCm | Ancho de sisa en centímetros | Comercial | number | No |  |  | Ingresá el valor de «ancho de sisa en centímetros». |
| babySizes[].note | Nota | Textos | text | No |  |  | Ingresá el texto de «nota». |
| babySizes[].x-group | Dato | Secciones | text | No |  |  |  |
| kidsSizes | Talles de niños | Comercial | list | No |  |  | Agregá, quitá o reordená los elementos de «talles de niños». |
| kidsSizes[].size | Talle | Comercial | text | No |  |  | Ingresá el texto de «talle». |
| kidsSizes[].suggestedAge | Edad sugerida | Comercial | text | No |  |  | Ingresá el texto de «edad sugerida». |
| kidsSizes[].heightCm | Altura en centímetros | Comercial | text | No |  |  | Ingresá el texto de «altura en centímetros». |
| kidsSizes[].weightKg | Peso en kilogramos | Comercial | text | No |  |  | Ingresá el texto de «peso en kilogramos». |
| kidsSizes[].chestCm | Contorno de pecho en centímetros | Comercial | number | No |  |  | Ingresá el valor de «contorno de pecho en centímetros». |
| kidsSizes[].waistCm | Contorno de cintura en centímetros | Comercial | number | No |  |  | Ingresá el valor de «contorno de cintura en centímetros». |
| kidsSizes[].totalLengthCm | Largo total en centímetros | Comercial | number | No |  |  | Ingresá el valor de «largo total en centímetros». |
| kidsSizes[].note | Nota | Textos | text | No |  |  | Ingresá el texto de «nota». |
| kidsSizes[].x-group | Dato | Secciones | text | No |  |  |  |
| tips.mainTip | Consejo principal | Comercial | textarea | No |  |  | Ingresá el texto de «consejo principal». |
| tips.parentAdvice | Recomendación para las familias | Comercial | textarea | No |  |  | Ingresá el texto de «recomendación para las familias». |
| tips.measuringSteps | Pasos para tomar las medidas | Comercial | list | No |  |  | Agregá, quitá o reordená los elementos de «pasos para tomar las medidas». |
| tips.measuringSteps[] | Paso para tomar las medidas | Comercial | text | No |  |  | Ingresá el texto de «paso para tomar las medidas». |
| tips.x-group | Dato | Secciones | text | No |  |  |  |
| x-group | Dato | Secciones | text | No |  |  |  |


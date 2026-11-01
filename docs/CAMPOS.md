# Campos editables

Referencia generada desde los esquemas JSON. Los formularios deben leer los esquemas, no este documento.

## Marca

Esquema: `src/data/brand.schema.json`

| Campo | Título | Grupo | Control | Opcional | Variables | Imagen | Descripción |
|---|---|---|---|---|---|---|---|
| $schema | Archivo del esquema | Secciones | text | No |  |  | Ruta al esquema que define esta configuración. |
| schemaVersion | Versión del esquema | Secciones | number | No |  |  | Versión del formato de configuración. |
| name | Nombre de la marca | Marca | text | No |  |  | Ingresá el texto de «nombre de la marca». |
| shortName | Nombre corto de la marca | Marca | text | No |  |  | Ingresá el texto de «nombre corto de la marca». |
| tagline | Descripción breve de la marca | Marca | text | No |  |  | Ingresá el texto de «descripción breve de la marca». |
| slogan | Frase de marca | Marca | text | No |  |  | Ingresá el texto de «frase de marca». |
| seo.titleSuffix | Sufijo del título | Textos | text | No |  |  | Ingresá el texto de «sufijo del título». |
| seo.description | Descripción | Textos | textarea | No |  |  | Ingresá el texto de «descripción». |
| seo.socialImage | Imagen para compartir | Imágenes | image | No |  | {"path":"/assets/misc/og-image.jpg","minWidth":1200,"ratio":1.9047619047619047,"maxKB":200} | Elegí la imagen que se usará para «imagen para compartir». |
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
| demo.showPrototypeBanner | Mostrar el banner del prototipo | Secciones | boolean | No |  |  | Activá esta opción cuando corresponda. |
| logo.url | Dirección de la imagen | Imágenes | image | No |  | {"path":"/assets/logo/logo.png","maxKB":120} | Elegí la imagen que se usará para «dirección de la imagen». |
| logo.alt | Texto alternativo de la imagen | Secciones | text | No |  |  | Ingresá el texto de «texto alternativo de la imagen». |
| logo.faviconUrl | Ícono del sitio | Imágenes | image | No |  | {"path":"/assets/logo/favicon-32.png","minWidth":32,"ratio":1} | Elegí la imagen que se usará para «ícono del sitio». |
| logo.appleTouchIconUrl | Ícono para dispositivos Apple | Imágenes | image | No |  | {"path":"/assets/logo/apple-touch-icon.png","minWidth":180,"ratio":1} | Elegí la imagen que se usará para «ícono para dispositivos apple». |
| logo.iconBackground | Fondo de los íconos | Secciones | color | No |  |  | Elegí el color para «fondo de los íconos». |
| logo.iconCrop.left | Margen izquierdo del recorte | Secciones | number | No |  |  | Ingresá el valor de «margen izquierdo del recorte». |
| logo.iconCrop.top | Margen superior del recorte | Secciones | number | No |  |  | Ingresá el valor de «margen superior del recorte». |
| logo.iconCrop.width | Ancho del recorte | Secciones | number | No |  |  | Ingresá el valor de «ancho del recorte». |
| logo.iconCrop.height | Alto del recorte | Secciones | number | No |  |  | Ingresá el valor de «alto del recorte». |
| contact.whatsappNumberFormatted | Número de WhatsApp para mostrar | Contacto | whatsapp | No |  |  | Ingresá el texto de «número de whatsapp para mostrar». |
| contact.whatsappRaw | Número de WhatsApp para enlaces | Contacto | whatsapp | No |  |  | Ingresá el texto de «número de whatsapp para enlaces». |
| contact.whatsappAdvisorName | Nombre de quien atiende | Contacto | whatsapp | No |  |  | Ingresá el texto de «nombre de quien atiende». |
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
| hero.title | Título | Textos | text | No |  |  | Ingresá el texto de «título». |
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
| copy.footerDisclaimer | Aviso de demostración | Textos de interfaz | text | No |  |  | Ingresá el texto de «aviso de demostración». |
| copy.whatsappShippingMessage | Mensaje sobre envíos y cambios | Textos | whatsapp | No |  |  | Ingresá el texto de «mensaje sobre envíos y cambios». |
| copy.whatsappFaqMessage | Mensaje sobre preguntas frecuentes | Textos | whatsapp | No |  |  | Ingresá el texto de «mensaje sobre preguntas frecuentes». |
| copy.whatsappSizeMessage | Mensaje sobre talles | Textos | whatsapp | No |  |  | Ingresá el texto de «mensaje sobre talles». |
| copy.whatsappOrderConfirmation | Mensaje para confirmar el pedido | Textos | whatsapp | No |  |  | Ingresá el texto de «mensaje para confirmar el pedido». |
| copy.catalogTitle | Título del catálogo | Textos | text | No |  |  | Ingresá el texto de «título del catálogo». |
| copy.catalogCollectionTitle | Título de la colección | Textos | text | No |  |  | Ingresá el texto de «título de la colección». |
| copy.customerServiceLabel | Nombre de atención al cliente | Textos | text | No |  |  | Ingresá el texto de «nombre de atención al cliente». |
| copy.handmadeGuarantee | Garantía del producto | Textos | text | No |  |  | Ingresá el texto de «garantía del producto». |
| copy.crossSellTitle | Título de productos relacionados | Textos | text | No |  |  | Ingresá el texto de «título de productos relacionados». |
| copy.checkoutOrderHeading | Título del pedido | Textos | text | No |  |  | Ingresá el texto de «título del pedido». |
| copy.thankYouMessage | Mensaje de agradecimiento | Textos | text | No |  |  | Ingresá el texto de «mensaje de agradecimiento». |
| copy.orderPreparationMessage | Mensaje de preparación del pedido | Textos | text | No |  |  | Ingresá el texto de «mensaje de preparación del pedido». |
| copy.giftDedicationPlaceholder | Ayuda para escribir una dedicatoria | Textos | text | No |  |  | Ingresá el texto de «ayuda para escribir una dedicatoria». |
| copy.checkoutPlaceholders.name | Nombre del producto | Marca | text | No |  |  | Ingresá el texto de «nombre del producto». |
| copy.checkoutPlaceholders.email | Correo electrónico | Textos | text | No |  |  | Ingresá el texto de «correo electrónico». |
| copy.checkoutPlaceholders.phone | Ayuda para ingresar el teléfono | Textos | text | No |  |  | Ingresá el texto de «ayuda para ingresar el teléfono». |
| copy.checkoutPlaceholders.street | Calle | Textos | text | No |  |  | Ingresá el texto de «calle». |
| copy.checkoutPlaceholders.apartment | Piso o departamento | Textos | text | No |  |  | Ingresá el texto de «piso o departamento». |
| copy.checkoutPlaceholders.zip | Código postal | Textos | text | No |  |  | Ingresá el texto de «código postal». |
| copy.checkoutPlaceholders.city | Localidad | Textos | text | No |  |  | Ingresá el texto de «localidad». |
| copy.checkoutPlaceholders.notes | Indicaciones de entrega | Textos | text | No |  |  | Ingresá el texto de «indicaciones de entrega». |
| copy.catalogYear | Año de la colección | Textos | number | No |  |  | Ingresá el valor de «año de la colección». |
| copy.sizeHintFallback | Texto alternativo para el talle | Textos | text | No |  |  | Ingresá el texto de «texto alternativo para el talle». |
| ui.catalog.allCategoryLabel | Opción para ver todas las categorías | Textos de interfaz | text | No |  |  | Ingresá el texto de «opción para ver todas las categorías». |
| ui.footer.copyright | Texto de derechos reservados | Textos de interfaz | text | No | {year}, {shortName} |  | Ingresá el texto de «texto de derechos reservados». Variables: {year} significa año actual; {shortName} significa nombre corto de la marca. |
| ui.productDetail.sizeHints | Ayudas para elegir talle | Textos de interfaz | list | No |  |  | Agregá, quitá o reordená los elementos de «ayudas para elegir talle». |
| ui.productDetail.sizeHints[].sizeFragment | Talle al que corresponde la ayuda | Textos de interfaz | text | No |  |  | Ingresá el texto de «talle al que corresponde la ayuda». |
| ui.productDetail.sizeHints[].text | Ayuda para elegir el talle | Textos de interfaz | text | No |  |  | Ingresá el texto de «ayuda para elegir el talle». |
| ui.productDetail.exchangeTitle | Mensaje sobre cambios | Textos de interfaz | text | No | {days} |  | Ingresá el texto de «mensaje sobre cambios». Variables: {days} significa cantidad de días para cambios. |
| ui.cart.whatsappText | Texto del botón de WhatsApp | Textos de interfaz | whatsapp | No | {percent} |  | Ingresá el texto de «texto del botón de whatsapp». Variables: {percent} significa porcentaje de descuento por transferencia. |
| ui.cart.trustExchangeTitle | Mensaje sobre cambios | Textos de interfaz | text | No | {days} |  | Ingresá el texto de «mensaje sobre cambios». Variables: {days} significa cantidad de días para cambios. |
| ui.checkout.whatsappBadge | Etiqueta de WhatsApp | Textos de interfaz | whatsapp | No | {percent} |  | Ingresá el texto de «etiqueta de whatsapp». Variables: {percent} significa porcentaje de descuento por transferencia. |
| ui.checkout.guaranteeTitle | Garantía de cambio | Textos de interfaz | text | No | {days} |  | Ingresá el texto de «garantía de cambio». Variables: {days} significa cantidad de días para cambios. |
| ui.checkout.banner | Aviso del pago | Textos de interfaz | text | No | {installments} |  | Ingresá el texto de «aviso del pago». Variables: {installments} significa cantidad de cuotas sin interés. |
| ui.checkout.installmentThree | Texto de cuotas | Textos de interfaz | text | No | {installments} |  | Ingresá el texto de «texto de cuotas». Variables: {installments} significa cantidad de cuotas sin interés. |
| ui.orderSuccess.nextExchange | Mensaje sobre cambios | Textos de interfaz | text | No | {days} |  | Ingresá el texto de «mensaje sobre cambios». Variables: {days} significa cantidad de días para cambios. |
| ui.hero.benefitInstallmentsTitle | Beneficio de cuotas | Textos de interfaz | text | No | {installments} |  | Ingresá el texto de «beneficio de cuotas». Variables: {installments} significa cantidad de cuotas sin interés. |

## Catálogo

Esquema: `src/data/catalog.schema.json`

| Campo | Título | Grupo | Control | Opcional | Variables | Imagen | Descripción |
|---|---|---|---|---|---|---|---|
| $schema | Archivo del esquema | Secciones | text | No |  |  | Ruta al esquema que define esta configuración. |
| schemaVersion | Versión del esquema | Secciones | number | No |  |  | Versión del formato de configuración. |
| categories | Categorías | Secciones | list | No |  |  | Agregá, quitá o reordená los elementos de «categorías». |
| categories[].id | Identificador | Secciones | text | No |  |  | Ingresá el texto de «identificador». |
| categories[].label | Nombre para mostrar | Secciones | text | No |  |  | Ingresá el texto de «nombre para mostrar». |
| categories[].emoji | Ícono de la categoría | Secciones | icon | No |  |  | Elegí una opción para «ícono de la categoría». |
| products | Productos | Secciones | list | No |  |  | Agregá, quitá o reordená los elementos de «productos». |
| products[].id | Identificador | Secciones | text | No |  |  | Ingresá el texto de «identificador». |
| products[].name | Nombre del producto | Secciones | text | No |  |  | Ingresá el texto de «nombre del producto». |
| products[].category | Categoría | Secciones | text | No |  |  | Ingresá el texto de «categoría». |
| products[].subcategory | Subcategoría | Secciones | text | No |  |  | Ingresá el texto de «subcategoría». |
| products[].price | Precio | Secciones | number | No |  |  | Ingresá el valor de «precio». |
| products[].compareAtPrice | Precio anterior | Secciones | number | Sí |  |  | Ingresá el valor de «precio anterior». |
| products[].sizes | Talles disponibles | Secciones | list | No |  |  | Agregá, quitá o reordená los elementos de «talles disponibles». |
| products[].sizes[] | Talle disponible | Secciones | text | No |  |  | Ingresá el texto de «talle disponible». |
| products[].colors | Colores disponibles | Secciones | list | No |  |  | Agregá, quitá o reordená los elementos de «colores disponibles». |
| products[].colors[].name | Nombre del producto | Secciones | text | No |  |  | Ingresá el texto de «nombre del producto». |
| products[].colors[].hex | Código del color | Secciones | color | No |  |  | Elegí el color para «código del color». |
| products[].colors[].colorFamily | Familia del color | Secciones | select | Sí |  |  | Elegí una opción para «familia del color». |
| products[].images | Imágenes del producto | Imágenes | list | No |  |  | Agregá, quitá o reordená los elementos de «imágenes del producto». |
| products[].images[] | Foto del producto | Imágenes | image | No |  | {"path":"/assets/products/{id}.jpg","minWidth":900,"ratio":[0.8,1]} | Elegí una foto del producto. La variante WebP con el mismo nombre se genera mediante images:optimize. |
| products[].description | Descripción | Secciones | textarea | No |  |  | Ingresá el texto de «descripción». |
| products[].shortDescription | Descripción breve del producto | Secciones | textarea | No |  |  | Ingresá el texto de «descripción breve del producto». |
| products[].material | Material | Secciones | text | No |  |  | Ingresá el texto de «material». |
| products[].badge | Etiqueta destacada | Secciones | text | Sí |  |  | Ingresá el texto de «etiqueta destacada». |
| products[].badgeType | Tipo de etiqueta | Secciones | select | Sí |  |  | Elegí una opción para «tipo de etiqueta». |
| products[].features | Características | Secciones | list | No |  |  | Agregá, quitá o reordená los elementos de «características». |
| products[].features[] | Característica del producto | Secciones | text | No |  |  | Ingresá el texto de «característica del producto». |
| products[].careInstructions | Cuidados | Secciones | list | No |  |  | Agregá, quitá o reordená los elementos de «cuidados». |
| products[].careInstructions[] | Instrucción de cuidado | Secciones | textarea | No |  |  | Ingresá el texto de «instrucción de cuidado». |
| products[].stockBySize | Stock por talle | Secciones | list | No |  |  | Indicá la cantidad disponible para cada talle. |
| products[].stockBySize.* | Cantidad disponible | Secciones | number | No |  |  | Ingresá la cantidad de unidades disponibles. |
| products[].featured | Destacar el producto | Secciones | boolean | Sí |  |  | Activá esta opción cuando corresponda. |
| products[].tags | Etiquetas de búsqueda | Secciones | list | No |  |  | Agregá, quitá o reordená los elementos de «etiquetas de búsqueda». |
| products[].tags[] | Etiqueta de búsqueda | Secciones | select | No |  |  | Elegí una opción para «etiqueta de búsqueda». |
| products[].isBundle | Es un conjunto | Secciones | boolean | Sí |  |  | Activá esta opción cuando corresponda. |
| products[].ageStagesOverride | Etapas de edad del producto | Secciones | list | Sí |  |  | Agregá, quitá o reordená los elementos de «etapas de edad del producto». |
| products[].ageStagesOverride[] | Etapa de edad | Secciones | select | No |  |  | Elegí una opción para «etapa de edad». |
| filters.fabrics | Materiales para filtrar | Secciones | list | No |  |  | Agregá, quitá o reordená los elementos de «materiales para filtrar». |
| filters.fabrics[] | Material para filtrar | Secciones | text | No |  |  | Ingresá el texto de «material para filtrar». |
| filters.babySizes | Talles de bebé | Secciones | list | No |  |  | Agregá, quitá o reordená los elementos de «talles de bebé». |
| filters.babySizes[] | Talle de bebé | Secciones | text | No |  |  | Ingresá el texto de «talle de bebé». |
| filters.kidsSizes | Talles de niños | Secciones | list | No |  |  | Agregá, quitá o reordená los elementos de «talles de niños». |
| filters.kidsSizes[] | Talle infantil | Secciones | text | No |  |  | Ingresá el texto de «talle infantil». |
| filters.colorSwatches | Colores para filtrar | Secciones | list | No |  |  | Agregá, quitá o reordená los elementos de «colores para filtrar». |
| filters.colorSwatches[].id | Identificador | Secciones | text | No |  |  | Ingresá el texto de «identificador». |
| filters.colorSwatches[].name | Nombre del producto | Secciones | text | No |  |  | Ingresá el texto de «nombre del producto». |
| filters.colorSwatches[].hex | Código del color | Secciones | color | No |  |  | Elegí el color para «código del color». |
| filters.quickFilters | Filtros rápidos | Secciones | list | No |  |  | Agregá, quitá o reordená los elementos de «filtros rápidos». |
| filters.quickFilters[].id | Identificador | Secciones | text | No |  |  | Ingresá el texto de «identificador». |
| filters.quickFilters[].axis | Eje del filtro | Secciones | select | No |  |  | Elegí una opción para «eje del filtro». |
| filters.quickFilters[].value | Valor | Secciones | text | No |  |  | Ingresá el texto de «valor». |
| filters.quickFilters[].label | Nombre para mostrar | Secciones | text | No |  |  | Ingresá el texto de «nombre para mostrar». |
| filters.quickFilters[].emoji | Ícono de la categoría | Secciones | icon | No |  |  | Elegí una opción para «ícono de la categoría». |
| filters.quickFilters[].activeClass | Estilo del filtro activo | Secciones | text | No |  |  | Ingresá el texto de «estilo del filtro activo». |
| filters.quickFilters[].idleClass | Estilo del filtro inactivo | Secciones | text | No |  |  | Ingresá el texto de «estilo del filtro inactivo». |
| filters.quickFilters[].activeLabel | Rótulo del filtro seleccionado | Textos de interfaz | text | Sí |  |  | Ingresá el texto de «rótulo del filtro seleccionado». |
| filters.stageSizes.recien-nacidos | Etapa de recién nacidos | Secciones | list | No |  |  | Agregá, quitá o reordená los elementos de «etapa de recién nacidos». |
| filters.stageSizes.recien-nacidos[] | Talle de recién nacido | Secciones | text | No |  |  | Ingresá el texto de «talle de recién nacido». |
| filters.stageSizes.bebes | Etapa de bebés | Secciones | list | No |  |  | Agregá, quitá o reordená los elementos de «etapa de bebés». |
| filters.stageSizes.bebes[] | Talle de bebé | Secciones | text | No |  |  | Ingresá el texto de «talle de bebé». |
| filters.stageSizes.ninos | Etapa de niños | Secciones | list | No |  |  | Agregá, quitá o reordená los elementos de «etapa de niños». |
| filters.stageSizes.ninos[] | Talle infantil | Secciones | text | No |  |  | Ingresá el texto de «talle infantil». |
| settings.crossSellCategory | Categoría de productos relacionados | Secciones | text | No |  |  | Ingresá el texto de «categoría de productos relacionados». |
| settings.babySizeAlias | Equivalencia de talle de bebé | Secciones | text | No |  |  | Ingresá el texto de «equivalencia de talle de bebé». |
| settings.singleSizeAlias | Equivalencia de talle único | Secciones | text | No |  |  | Ingresá el texto de «equivalencia de talle único». |

## Guía de talles

Esquema: `src/data/size-guide.schema.json`

| Campo | Título | Grupo | Control | Opcional | Variables | Imagen | Descripción |
|---|---|---|---|---|---|---|---|
| $schema | Archivo del esquema | Secciones | text | No |  |  | Ruta al esquema que define esta configuración. |
| schemaVersion | Versión del esquema | Secciones | number | No |  |  | Versión del formato de configuración. |
| babySizes | Talles de bebé | Secciones | list | No |  |  | Agregá, quitá o reordená los elementos de «talles de bebé». |
| babySizes[].size | Talle | Secciones | text | No |  |  | Ingresá el texto de «talle». |
| babySizes[].suggestedAge | Edad sugerida | Secciones | text | No |  |  | Ingresá el texto de «edad sugerida». |
| babySizes[].heightCm | Altura en centímetros | Secciones | text | No |  |  | Ingresá el texto de «altura en centímetros». |
| babySizes[].weightKg | Peso en kilogramos | Secciones | text | No |  |  | Ingresá el texto de «peso en kilogramos». |
| babySizes[].totalLengthCm | Largo total en centímetros | Secciones | number | No |  |  | Ingresá el valor de «largo total en centímetros». |
| babySizes[].armholeWidthCm | Ancho de sisa en centímetros | Secciones | number | No |  |  | Ingresá el valor de «ancho de sisa en centímetros». |
| babySizes[].note | Nota | Textos | text | No |  |  | Ingresá el texto de «nota». |
| kidsSizes | Talles de niños | Secciones | list | No |  |  | Agregá, quitá o reordená los elementos de «talles de niños». |
| kidsSizes[].size | Talle | Secciones | text | No |  |  | Ingresá el texto de «talle». |
| kidsSizes[].suggestedAge | Edad sugerida | Secciones | text | No |  |  | Ingresá el texto de «edad sugerida». |
| kidsSizes[].heightCm | Altura en centímetros | Secciones | text | No |  |  | Ingresá el texto de «altura en centímetros». |
| kidsSizes[].weightKg | Peso en kilogramos | Secciones | text | No |  |  | Ingresá el texto de «peso en kilogramos». |
| kidsSizes[].chestCm | Contorno de pecho en centímetros | Secciones | number | No |  |  | Ingresá el valor de «contorno de pecho en centímetros». |
| kidsSizes[].waistCm | Contorno de cintura en centímetros | Secciones | number | No |  |  | Ingresá el valor de «contorno de cintura en centímetros». |
| kidsSizes[].totalLengthCm | Largo total en centímetros | Secciones | number | No |  |  | Ingresá el valor de «largo total en centímetros». |
| kidsSizes[].note | Nota | Textos | text | No |  |  | Ingresá el texto de «nota». |
| tips.mainTip | Consejo principal | Textos | textarea | No |  |  | Ingresá el texto de «consejo principal». |
| tips.parentAdvice | Recomendación para las familias | Textos | textarea | No |  |  | Ingresá el texto de «recomendación para las familias». |
| tips.measuringSteps | Pasos para tomar las medidas | Textos | list | No |  |  | Agregá, quitá o reordená los elementos de «pasos para tomar las medidas». |
| tips.measuringSteps[] | Paso para tomar las medidas | Secciones | text | No |  |  | Ingresá el texto de «paso para tomar las medidas». |


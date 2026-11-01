export type BrandConfig = {
  "$schema": string;
  "schemaVersion": number;
  "name": string;
  "shortName": string;
  "tagline": string;
  "slogan": string;
  "seo": {
  "titleSuffix": string;
  "description": string;
  "socialImage": string;
};
  "typography": {
  "headings": string;
  "body": string;
  "stylesheetUrl": string;
};
  "theme": {
  "primary": string;
  "primaryHover": string;
  "secondary": string;
  "secondarySoft": string;
  "background": string;
  "surface": string;
  "surfaceCheckout": string;
  "surfaceLilac": string;
  "surfacePink": string;
  "surfacePinkStrong": string;
  "surfaceBlue": string;
  "surfaceGreen": string;
  "surfacePurple": string;
  "surfaceWarm": string;
  "text": string;
  "textMuted": string;
  "accentBlue": string;
  "accentBlueDark": string;
  "payment": string;
  "paymentHover": string;
  "success": string;
  "whatsapp": string;
  "whatsappHover": string;
  "neutral": string;
  "blueTint": string;
  "productPastelBlue": string;
  "productCoral": string;
};
  "storage": {
  "cartKey": string;
};
  "demo": {
  "prefillCart": boolean;
  "prefillCheckout": boolean;
  "giftDedication": string;
  "coupon": string;
  "giftPackaging": boolean;
  "checkout": {
  "name": string;
  "email": string;
  "phone": string;
  "streetAddress": string;
  "apartment": string;
  "zipCode": string;
  "city": string;
  "deliveryNotes": string;
};
  "showPrototypeBanner": boolean;
};
  "logo": {
  "url": string;
  "alt": string;
  "faviconUrl": string;
  "appleTouchIconUrl": string;
  "iconBackground": string;
  "iconCrop": {
  "left": number;
  "top": number;
  "width": number;
  "height": number;
};
};
  "contact": {
  "whatsappNumberFormatted": string;
  "whatsappRaw": string;
  "whatsappAdvisorName": string;
  "instagramHandle": string;
  "instagramUrl": string;
  "showroomAddress": string;
  "showroomId": string;
  "showroomHours": string;
  "email": string;
};
  "commerce": {
  "currency": string;
  "currencySymbol": string;
  "coupons": ({
  "code": string;
  "type": "percent" | "fixed";
  "value": number;
})[];
  "freeShippingThreshold": number;
  "transferDiscountPercent": number;
  "installmentsWithoutInterest": number;
  "expressShippingCost": number;
  "standardShippingDays": string;
  "expressShippingDays": string;
  "exchangePeriodDays": number;
};
  "announcement": {
  "enabled": boolean;
  "text": string;
};
  "hero": {
  "badge": string;
  "title": string;
  "subtitle": string;
  "promoCreditCard": string;
  "promoTransfer": string;
  "bannerImageUrl": string;
  "bannerImageAlt": string;
  "trustPill": string;
};
  "copy": {
  "sizeAssistancePrompt": string;
  "giftPackagingTitle": string;
  "giftPackagingDescription": string;
  "footerAbout": string;
  "footerDisclaimer": string;
  "whatsappShippingMessage": string;
  "whatsappFaqMessage": string;
  "whatsappSizeMessage": string;
  "whatsappOrderConfirmation": string;
  "catalogTitle": string;
  "catalogCollectionTitle": string;
  "customerServiceLabel": string;
  "handmadeGuarantee": string;
  "crossSellTitle": string;
  "checkoutOrderHeading": string;
  "thankYouMessage": string;
  "orderPreparationMessage": string;
  "giftDedicationPlaceholder": string;
  "checkoutPlaceholders": {
  "name": string;
  "email": string;
  "phone": string;
  "street": string;
  "apartment": string;
  "zip": string;
  "city": string;
  "notes": string;
};
  "catalogYear": number;
  "sizeHintFallback": string;
};
  "ui": {
  "catalog": {
  "allCategoryLabel": string;
};
  "footer": {
  "copyright": string;
};
  "productDetail": {
  "sizeHints": ({
  "sizeFragment": string;
  "text": string;
})[];
  "exchangeTitle": string;
};
  "cart": {
  "whatsappText": string;
  "trustExchangeTitle": string;
};
  "checkout": {
  "whatsappBadge": string;
  "guaranteeTitle": string;
  "banner": string;
  "installmentThree": string;
};
  "orderSuccess": {
  "nextExchange": string;
};
  "hero": {
  "benefitInstallmentsTitle": string;
};
};
};

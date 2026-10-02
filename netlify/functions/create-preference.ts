import { BRAND_CONFIG } from '../../src/brand.config';
import { calculateCheckout, CheckoutInput, CheckoutInputError } from '../../src/lib/checkoutPricing';

interface CustomerPayload {
  name: string;
  email: string;
  phone?: string;
  address?: {
    street_name: string;
    street_number: string;
    zip_code: string;
    city?: string;
  };
  notes?: string;
}

interface RequestBody extends CheckoutInput {
  customer?: CustomerPayload;
}

// Handler compatible con Netlify Functions (v1 / v2)
export const handler = async (event: {
  httpMethod: string;
  body: string | null;
  headers: Record<string, string | undefined>;
}) => {
  // CORS Headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: 'OK' }),
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Método no permitido. Utilizar POST.' }),
    };
  }

  try {
    const body: RequestBody = event.body ? JSON.parse(event.body) : { items: [] };
    const pricing = calculateCheckout(body);
    const MP_ACCESS_TOKEN = process.env.MERCADO_PAGO_ACCESS_TOKEN;
    const appUrl = (process.env.APP_URL || process.env.URL || 'http://localhost:8888').replace(/\/+$/, '');

    if (!MP_ACCESS_TOKEN && process.env.CONTEXT === 'production') {
      return { statusCode: 503, headers, body: JSON.stringify({ error: 'mp_not_configured' }) };
    }

    const mpItems = [...pricing.items];
    if (pricing.shippingCost > 0) {
      mpItems.push({
        id: 'shipping-charge',
        title: `Costo de envío (${pricing.shippingMethod})`,
        description: `Envío ${BRAND_CONFIG.shortName}`,
        quantity: 1,
        currency_id: BRAND_CONFIG.commerce.currency,
        unit_price: pricing.shippingCost,
      });
    }

    const preferencePayload = {
      items: mpItems,
      payer: {
        name: body.customer?.name || 'Cliente Showroom',
        email: body.customer?.email || BRAND_CONFIG.contact.email,
        phone: {
          number: body.customer?.phone || BRAND_CONFIG.contact.whatsappRaw,
        },
        address: body.customer?.address
          ? {
              street_name: body.customer.address.street_name,
              street_number: Number(body.customer.address.street_number) || 0,
              zip_code: body.customer.address.zip_code,
            }
          : undefined,
      },
      back_urls: {
        success: `${appUrl}/?checkout=success`,
        pending: `${appUrl}/?checkout=pending`,
        failure: `${appUrl}/?checkout=failure`,
      },
      auto_return: 'approved',
      statement_descriptor: process.env.MP_STATEMENT_DESCRIPTOR || BRAND_CONFIG.name.toUpperCase(),
      external_reference: `PIP-${Date.now()}`,
      metadata: {
        store: BRAND_CONFIG.shortName,
        gift_order: Boolean(body.customer?.notes),
        notes: body.customer?.notes || '',
      },
    };

    if (!MP_ACCESS_TOKEN) {
      const demoId = `DEV-${Date.now()}`;
      const demoUrl = `https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=${demoId}`;
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ preferenceId: demoId, init_point: demoUrl, mode: 'development_demo' }),
      };
    }

    const mpResponse = await fetch('https://api.mercadopago.com/checkout/preferences', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${MP_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(preferencePayload),
    });
    const mpData = await mpResponse.json().catch(() => ({}));

    if (!mpResponse.ok) {
      return {
        statusCode: 502,
        headers,
        body: JSON.stringify({ error: 'mp_preference_failed', details: mpData }),
      };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        preferenceId: mpData.id,
        init_point: mpData.init_point,
        sandbox_init_point: mpData.sandbox_init_point || mpData.init_point,
        mode: 'mercadopago',
        pricing: {
          subtotal: pricing.subtotal,
          couponDiscount: pricing.couponDiscount,
          shippingCost: pricing.shippingCost,
          transferDiscount: pricing.transferDiscount,
          total: pricing.total,
        },
      }),
    };
  } catch (err: unknown) {
    if (err instanceof CheckoutInputError) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'invalid_checkout', details: err.message }) };
    }
    const errorMsg = err instanceof Error ? err.message : 'Error desconocido';
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Error procesando preferencia', details: errorMsg }),
    };
  }
};

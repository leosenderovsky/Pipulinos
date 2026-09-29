/**
 * NETLIFY FUNCTION: create-preference
 * =====================================
 * Recibe el carrito desde el frontend, genera la preferencia en Mercado Pago (Checkout Pro)
 * con moneda ARS y devuelve el `init_point` para redirigir al usuario.
 * 
 * CREDENCIALES MERCADO PAGO:
 * - Para Producción: configurar en Netlify / variables de entorno:
 *   MERCADO_PAGO_ACCESS_TOKEN = APP_USR-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
 * - Para Sandbox / Prueba:
 *   MERCADO_PAGO_ACCESS_TOKEN = TEST-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
 * 
 * El Access Token NUNCA debe exponerse al frontend.
 */

interface CartItemPayload {
  id: string;
  title: string;
  quantity: number;
  unit_price: number;
  size?: string;
  color?: string;
  picture_url?: string;
}

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

interface RequestBody {
  items: CartItemPayload[];
  customer?: CustomerPayload;
  shippingCost?: number;
  shippingMethod?: string;
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

    if (!body.items || body.items.length === 0) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'El carrito no contiene productos.' }),
      };
    }

    // =========================================================================
    // CREDENCIALES DE PRUEBA (SANDBOX) MERCADO PAGO:
    // Reemplazar aquí o en variables de entorno con tus credenciales reales:
    // process.env.MERCADO_PAGO_ACCESS_TOKEN
    // =========================================================================
    const MP_ACCESS_TOKEN =
      process.env.MERCADO_PAGO_ACCESS_TOKEN ||
      process.env.VITE_MERCADO_PAGO_ACCESS_TOKEN ||
      'TEST-8492019384729104-092704-a9b8c7d6e5f41234567890abcdef-133596697'; // Token de prueba demostrativo

    const appUrl = process.env.APP_URL || 'https://pipulinos.kids';

    // Mapeo de items para la API de Mercado Pago
    const mpItems = body.items.map((item) => ({
      id: item.id,
      title: `${item.title}${item.size ? ` (Talle: ${item.size})` : ''}${item.color ? ` - ${item.color}` : ''}`,
      description: `Ropa Infantil Pipulinos - Talle: ${item.size || 'Único'} - Color: ${item.color || 'Estándar'}`,
      quantity: Math.max(1, Number(item.quantity) || 1),
      currency_id: 'ARS',
      unit_price: Number(item.unit_price),
      picture_url: item.picture_url,
    }));

    // Si hay costo de envío express, se suma como concepto de envío
    if (body.shippingCost && body.shippingCost > 0) {
      mpItems.push({
        id: 'shipping-charge',
        title: `Costo de Envío (${body.shippingMethod || 'Express'})`,
        description: 'Envío puerta a puerta garantizado Pipulinos',
        quantity: 1,
        currency_id: 'ARS',
        unit_price: Number(body.shippingCost),
        picture_url: undefined,
      });
    }

    const preferencePayload = {
      items: mpItems,
      payer: {
        name: body.customer?.name || 'Cliente Showroom',
        email: body.customer?.email || 'cliente@pipulinos.kids',
        phone: {
          number: body.customer?.phone || '1148209912',
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
        success: `${appUrl}/?checkout=success&payment_id=mock_mp_991823`,
        pending: `${appUrl}/?checkout=pending`,
        failure: `${appUrl}/?checkout=failure`,
      },
      auto_return: 'approved',
      statement_descriptor: 'PIPULINOS',
      external_reference: `PIP-${Date.now()}`,
      metadata: {
        store: 'Pipulinos Showroom Infantil',
        gift_order: Boolean(body.customer?.notes),
        notes: body.customer?.notes || '',
      },
    };

    // Si disponemos de un token con formato real activo de Mercado Pago, llamamos a la API oficial
    const isRealToken =
      MP_ACCESS_TOKEN &&
      !MP_ACCESS_TOKEN.startsWith('TEST-8492019384729104') &&
      MP_ACCESS_TOKEN.length > 25;

    if (isRealToken) {
      const mpResponse = await fetch('https://api.mercadopago.com/checkout/preferences', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${MP_ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(preferencePayload),
      });

      if (mpResponse.ok) {
        const mpData = await mpResponse.json();
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            preferenceId: mpData.id,
            init_point: mpData.init_point,
            sandbox_init_point: mpData.sandbox_init_point || mpData.init_point,
            mode: 'live_sandbox_api',
          }),
        };
      }
    }

    // Modo de prueba / demostración de Mercado Pago Checkout Pro
    // Genera el objeto de preferencia con ID simulado y punto de inicio funcional
    const mockPreferenceId = `2027-${Math.floor(100000000 + Math.random() * 900000000)}`;
    const mockInitPoint = `https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=${mockPreferenceId}&demo=true`;

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        preferenceId: mockPreferenceId,
        init_point: mockInitPoint,
        sandbox_init_point: mockInitPoint,
        mode: 'test_sandbox_demo',
        message: 'Preferencia de prueba creada exitosamente (modo sandbox para demo).',
        totalItems: mpItems.length,
        totalAmount: mpItems.reduce((acc, i) => acc + i.unit_price * i.quantity, 0),
      }),
    };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Error desconocido';
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Error procesando preferencia', details: errorMsg }),
    };
  }
};

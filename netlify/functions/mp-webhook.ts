interface MercadoPagoNotification {
  type?: string;
  data?: { id?: string | number };
  id?: string | number;
}

export const handler = async (event: {
  httpMethod: string;
  body: string | null;
  queryStringParameters?: Record<string, string | undefined>;
}) => {
  const headers = { 'Content-Type': 'application/json' };

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Método no permitido.' }),
    };
  }

  const accessToken = process.env.MERCADO_PAGO_ACCESS_TOKEN;
  if (!accessToken) {
    return {
      statusCode: 503,
      headers,
      body: JSON.stringify({ error: 'mp_not_configured' }),
    };
  }

  try {
    const notification: MercadoPagoNotification = event.body ? JSON.parse(event.body) : {};
    if (notification.type && notification.type !== 'payment') {
      return { statusCode: 200, headers, body: JSON.stringify({ received: true, ignored: true }) };
    }

    const paymentId =
      notification.data?.id ??
      notification.id ??
      event.queryStringParameters?.['data.id'] ??
      event.queryStringParameters?.id;
    if (!paymentId) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Falta el identificador del pago.' }),
      };
    }

    const response = await fetch(`https://api.mercadopago.com/v1/payments/${encodeURIComponent(String(paymentId))}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const payment = await response.json().catch(() => ({}));
    if (!response.ok) {
      console.error('No se pudo verificar la notificación de Mercado Pago:', response.status, payment);
      return {
        statusCode: 502,
        headers,
        body: JSON.stringify({ error: 'mp_payment_lookup_failed' }),
      };
    }

    const result = {
      status: payment.status,
      external_reference: payment.external_reference,
    };
    console.info('Notificación de pago de Mercado Pago:', JSON.stringify(result));

    // TODO: guardar la orden o enviar un email una vez que el comercio defina ese flujo.
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ received: true, ...result }),
    };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Error desconocido';
    console.error('Error procesando notificación de Mercado Pago:', message);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'mp_webhook_failed' }),
    };
  }
};

interface HealthEvent {
  httpMethod: string;
}

export const getHealthPayload = () => {
  const accessToken = process.env.MERCADO_PAGO_ACCESS_TOKEN;
  const tokenMode = !accessToken
    ? null
    : accessToken.startsWith('TEST-')
      ? 'test'
      : accessToken.startsWith('APP_USR-')
        ? 'production'
        : 'unknown';

  return {
    ok: true,
    context: process.env.CONTEXT ?? null,
    runtime: {
      MERCADO_PAGO_ACCESS_TOKEN: Boolean(accessToken),
      tokenMode,
      APP_URL: Boolean(process.env.APP_URL),
      MP_DEMO_MODE: process.env.MP_DEMO_MODE === 'true' ? 'true' : 'false',
      MP_STATEMENT_DESCRIPTOR: Boolean(process.env.MP_STATEMENT_DESCRIPTOR),
      URL: Boolean(process.env.URL),
    },
  };
};

export const handler = async (event: HealthEvent) => {
  const headers = {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-store',
  };

  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Método no permitido.' }),
    };
  }

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify(getHealthPayload()),
  };
};

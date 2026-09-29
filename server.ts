import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;
  const isProduction = process.env.NODE_ENV === 'production';

  app.use(express.json());

  /**
   * ENDPOINT DE MERCADO PAGO CHECKOUT PRO
   * =======================================
   * Crea una preferencia de pago en Mercado Pago con moneda ARS.
   * En producción lee MERCADO_PAGO_ACCESS_TOKEN de las variables de entorno.
   * En modo de prueba/demo retorna la preferencia sandbox con init_point.
   */
  const handleCreatePreference = async (req: Request, res: Response) => {
    try {
      const { items, customer, shippingCost, shippingMethod } = req.body;

      if (!items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ error: 'El carrito no contiene productos.' });
      }

      // =====================================================================
      // CONFIGURACIÓN DE CREDENCIALES MERCADO PAGO:
      // Reemplazar con el Access Token de producción de la cuenta del cliente:
      // process.env.MERCADO_PAGO_ACCESS_TOKEN
      // =====================================================================
      const MP_ACCESS_TOKEN =
        process.env.MERCADO_PAGO_ACCESS_TOKEN ||
        'TEST-8492019384729104-092704-a9b8c7d6e5f41234567890abcdef-133596697';

      const appUrl = process.env.APP_URL || `http://localhost:${PORT}`;

      const mpItems = items.map((item: any) => ({
        id: String(item.id),
        title: `${item.title}${item.size ? ` (${item.size})` : ''}${item.color ? ` - ${item.color}` : ''}`,
        description: `Prenda Pipulinos Infantil - Talle: ${item.size || 'Único'}`,
        quantity: Math.max(1, Number(item.quantity) || 1),
        currency_id: 'ARS',
        unit_price: Number(item.unit_price) || 0,
        picture_url: item.picture_url,
      }));

      if (shippingCost && Number(shippingCost) > 0) {
        mpItems.push({
          id: 'shipping-charge',
          title: `Costo de Envío (${shippingMethod || 'Express'})`,
          description: 'Envío puerta a puerta Pipulinos',
          quantity: 1,
          currency_id: 'ARS',
          unit_price: Number(shippingCost),
          picture_url: undefined,
        });
      }

      const isRealToken =
        MP_ACCESS_TOKEN &&
        !MP_ACCESS_TOKEN.startsWith('TEST-8492019384729104') &&
        MP_ACCESS_TOKEN.length > 25;

      if (isRealToken) {
        const preferencePayload = {
          items: mpItems,
          payer: {
            name: customer?.name || 'Cliente Showroom',
            email: customer?.email || 'cliente@pipulinos.kids',
            phone: { number: customer?.phone || '1148209912' },
          },
          back_urls: {
            success: `${appUrl}/?status=approved`,
            pending: `${appUrl}/?status=pending`,
            failure: `${appUrl}/?status=failure`,
          },
          auto_return: 'approved',
          statement_descriptor: 'PIPULINOS',
          external_reference: `PIP-${Date.now()}`,
        };

        const mpRes = await fetch('https://api.mercadopago.com/checkout/preferences', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${MP_ACCESS_TOKEN}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(preferencePayload),
        });

        if (mpRes.ok) {
          const mpData = await mpRes.json();
          return res.json({
            preferenceId: mpData.id,
            init_point: mpData.init_point,
            sandbox_init_point: mpData.sandbox_init_point || mpData.init_point,
            mode: 'live_sandbox_api',
          });
        }
      }

      // Modo de prueba / demostración seguro para la demo
      const mockPrefId = `2027-${Math.floor(100000000 + Math.random() * 900000000)}`;
      const mockInitPoint = `https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=${mockPrefId}&demo=true`;

      return res.json({
        preferenceId: mockPrefId,
        init_point: mockInitPoint,
        sandbox_init_point: mockInitPoint,
        mode: 'test_sandbox_demo',
        totalItems: mpItems.length,
        totalAmount: mpItems.reduce((acc: number, i: any) => acc + i.unit_price * i.quantity, 0),
        message: 'Preferencia de prueba (sandbox) generada correctamente.',
      });
    } catch (error: any) {
      console.error('Error generando preferencia de Mercado Pago:', error);
      return res.status(500).json({ error: 'Error procesando preferencia', details: error.message });
    }
  };

  // Rutas disponibles tanto para llamada local /api como para compatibilidad /.netlify/functions
  app.post('/api/create-preference', handleCreatePreference);
  app.post('/.netlify/functions/create-preference', handleCreatePreference);

  // Health check
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', brand: 'PIPULINOS', timestamp: new Date().toISOString() });
  });

  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Pipulinos Server] Servidor activo en http://localhost:${PORT}`);
  });
}

startServer();

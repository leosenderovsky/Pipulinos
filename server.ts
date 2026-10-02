import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import { BRAND_CONFIG } from './src/brand.config';
import { calculateCheckout, CheckoutInputError } from './src/lib/checkoutPricing';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;
  const isProduction = process.env.NODE_ENV === 'production' || process.env.CONTEXT === 'production';

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
      const { customer } = req.body;
      const pricing = calculateCheckout(req.body);
      const MP_ACCESS_TOKEN = process.env.MERCADO_PAGO_ACCESS_TOKEN;
      const appUrl = (process.env.APP_URL || process.env.URL || `http://localhost:${PORT}`).replace(/\/+$/, '');

      if (!MP_ACCESS_TOKEN && isProduction) {
        return res.status(503).json({ error: 'mp_not_configured' });
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
          name: customer?.name || BRAND_CONFIG.shortName,
          email: customer?.email || BRAND_CONFIG.contact.email,
          phone: { number: customer?.phone || BRAND_CONFIG.contact.whatsappRaw },
        },
        back_urls: {
          success: `${appUrl}/?checkout=success`,
          pending: `${appUrl}/?checkout=pending`,
          failure: `${appUrl}/?checkout=failure`,
        },
        auto_return: 'approved',
        statement_descriptor: process.env.MP_STATEMENT_DESCRIPTOR || BRAND_CONFIG.name.toUpperCase(),
        external_reference: `PIP-${Date.now()}`,
        metadata: { store: BRAND_CONFIG.shortName },
      };

      if (!MP_ACCESS_TOKEN) {
        const demoId = `DEV-${Date.now()}`;
        const demoUrl = `https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=${demoId}`;
        return res.json({ preferenceId: demoId, init_point: demoUrl, mode: 'development_demo' });
      }

      const mpRes = await fetch('https://api.mercadopago.com/checkout/preferences', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${MP_ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(preferencePayload),
      });
      const mpData = await mpRes.json().catch(() => ({}));

      if (!mpRes.ok) {
        return res.status(502).json({ error: 'mp_preference_failed', details: mpData });
      }

      return res.json({
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
      });
    } catch (error: any) {
      console.error('Error generando preferencia de Mercado Pago:', error);
      if (error instanceof CheckoutInputError) {
        return res.status(400).json({ error: 'invalid_checkout', details: error.message });
      }
      return res.status(500).json({ error: 'Error procesando preferencia', details: error.message });
    }
  };

  // Rutas disponibles tanto para llamada local /api como para compatibilidad /.netlify/functions
  app.post('/api/create-preference', handleCreatePreference);
  app.post('/.netlify/functions/create-preference', handleCreatePreference);

  // Health check
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', brand: BRAND_CONFIG.name, timestamp: new Date().toISOString() });
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

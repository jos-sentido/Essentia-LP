/* ===== Essentia Country — relay serverless de captura de leads =====
   Framework §8: el lead llega enriquecido y se deposita EN PARALELO en:
     1) GHL (upsert contacto + custom fields)   2) Google Sheet (respaldo durable)   3) Meta CAPI (evento Lead)
   Zoho = 4º destino (se añade en Fase 2 — solo leads de LP van a Zoho).
   Todos los destinos son opcionales: si falta su env var, se omite sin romper.
   Variables de entorno (Vercel · Fase 2):
     GHL_TOKEN, GHL_LOCATION_ID           — PIT token REST (header Version: 2021-07-28)
     SHEET_WEBHOOK_URL                    — Apps Script Web App /exec
     META_PIXEL_ID, META_CAPI_TOKEN       — Conversions API
     ZOHO_WEBHOOK_URL                     — webhook del CRM del cliente (Zoho Flow → Create Lead). Inerte si vacía.
*/
const crypto = require('crypto');
const sha256 = (v) => v ? crypto.createHash('sha256').update(String(v).trim().toLowerCase()).digest('hex') : undefined;

// Reintento con backoff (400ms, 800ms, 1200ms). Solo lo usa el destino Zoho.
async function withRetry(fn, n = 3) {
  let last;
  for (let i = 0; i < n; i++) {
    try { return await fn(); } catch (e) { last = e; await new Promise((r) => setTimeout(r, 400 * (i + 1))); }
  }
  throw last;
}

/* ---- 4) Zoho CRM (vía webhook — Zoho Flow) ----
   NO tocamos la API de Zoho ni pasamos por GHL. PLP expone un webhook (Zoho Flow →
   Create Lead) y mapea los campos de su lado. Aquí solo mandamos un JSON plano y
   bien nombrado para que su mapeo sea directo. La URL vive en env (ZOHO_WEBHOOK_URL);
   si falta, retorna 'skip' y el destino queda inerte (no rompe nada). */
async function toZoho(lead) {
  const url = process.env.ZOHO_WEBHOOK_URL;
  if (!url) return 'skip';
  const body = {
    // contacto
    nombre: lead.nombre, email: lead.email, whatsapp: lead.whatsapp,
    // versión de LP (A/B)
    version_lp: lead.variante,
    // respuestas del form conversacional (llaves reales de Essentia)
    objetivo: lead.objetivo, producto_interes: lead.producto_interes,
    timing: lead.timing, monto: lead.monto,
    // atribución del anuncio (ad_id/adset_id/campaign_id/adgroup_id los inyecta la plataforma vía URL)
    ad_id: lead.ad_id, ad_name: lead.utm_content, adset_id: lead.adset_id,
    campaign: lead.utm_campaign, campaign_id: lead.campaign_id, adgroup_id: lead.adgroup_id,
    utm_source: lead.utm_source, fbclid: lead.fbclid, gclid: lead.gclid,
    // fecha de conversión (momento del submit) + origen
    fecha_conversion: lead.ts || lead.timestamp, landing_url: lead.landing_url
  };
  return withRetry(async () => {
    const r = await fetch(url, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    if (!r.ok) throw new Error('zoho ' + r.status);
    return 'ok';
  });
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ ok: false });

  let lead = req.body;
  if (typeof lead === 'string') { try { lead = JSON.parse(lead); } catch { lead = {}; } }
  lead = lead || {};

  const tasks = [];

  // --- 1) Google Sheet (respaldo) ---
  if (process.env.SHEET_WEBHOOK_URL) {
    tasks.push(fetch(process.env.SHEET_WEBHOOK_URL, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(lead)
    }).then(() => ['sheet', 'ok']).catch((e) => ['sheet', 'err:' + e.message]));
  }

  // --- 2) GHL upsert (idempotente por email/teléfono) ---
  if (process.env.GHL_TOKEN && process.env.GHL_LOCATION_ID) {
    tasks.push(fetch('https://services.leadconnectorhq.com/contacts/upsert', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + process.env.GHL_TOKEN,
        'Version': '2021-07-28', 'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        locationId: process.env.GHL_LOCATION_ID,
        name: lead.nombre, email: lead.email, phone: lead.whatsapp,
        source: 'LP Essentia · Var ' + (lead.variante || ''),
        customFields: [
          { key: 'objetivo', field_value: lead.objetivo },
          { key: 'producto_interes', field_value: lead.producto_interes },
          { key: 'timing', field_value: lead.timing },
          { key: 'variante', field_value: lead.variante },
          { key: 'utm_source', field_value: lead.utm_source },
          { key: 'utm_campaign', field_value: lead.utm_campaign },
          { key: 'landing_url', field_value: lead.landing_url }
        ].filter((f) => f.field_value)
      })
    }).then(() => ['ghl', 'ok']).catch((e) => ['ghl', 'err:' + e.message]));
  }

  // --- 3) Meta CAPI (evento Lead server-side, PII hasheada, dedup por event_id) ---
  if (process.env.META_PIXEL_ID && process.env.META_CAPI_TOKEN) {
    tasks.push(fetch('https://graph.facebook.com/v19.0/' + process.env.META_PIXEL_ID + '/events?access_token=' + process.env.META_CAPI_TOKEN, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        data: [{
          event_name: 'Lead', event_time: Math.floor(Date.now() / 1000),
          event_id: lead.event_id, action_source: 'website', event_source_url: lead.landing_url,
          user_data: {
            em: sha256(lead.email), ph: sha256(lead.whatsapp),
            fbp: lead.fbp || undefined, fbc: lead.fbc || undefined,
            client_user_agent: lead.user_agent
          }
        }]
      })
    }).then(() => ['capi', 'ok']).catch((e) => ['capi', 'err:' + e.message]));
  }

  // --- 4) Zoho CRM (webhook Zoho Flow) — self-gated por ZOHO_WEBHOOK_URL: inerte hasta cargarla ---
  tasks.push(toZoho(lead).then((r) => ['zoho', r]).catch((e) => ['zoho', 'err:' + e.message]));

  const results = await Promise.allSettled(tasks);
  const summary = results.map((r) => r.value || ['?', 'rejected']);
  console.log('[lead]', lead.email || '(sin email)', JSON.stringify(summary));

  // Siempre 200: para perder un lead tendrían que caerse todos los destinos a la vez.
  return res.status(200).json({ ok: true, destinos: summary });
};

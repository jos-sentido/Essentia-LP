/* ===== Essentia Country — relay serverless de captura de leads =====
   Framework §8: el lead llega enriquecido y se deposita EN PARALELO en:
     1) GHL (upsert contacto + custom fields)   2) Google Sheet (respaldo durable)   3) Meta CAPI (evento Lead)
   Zoho = 4º destino (se añade en Fase 2 — solo leads de LP van a Zoho).
   Todos los destinos son opcionales: si falta su env var, se omite sin romper.
   Variables de entorno (Vercel · Fase 2):
     GHL_TOKEN, GHL_LOCATION_ID           — PIT token REST (header Version: 2021-07-28)
     SHEET_WEBHOOK_URL                    — Apps Script Web App /exec
     META_PIXEL_ID, META_CAPI_TOKEN       — Conversions API
     ZOHO_WEBHOOK_URL                     — webhook Make compartido de PLP (→ Zoho, esquema fijo). Inerte si vacía.
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

/* ---- 4) Zoho CRM (vía webhook — Make compartido de PLP) ----
   PLP ya tiene un webhook en Make que empuja a Zoho con SU esquema fijo (lo alimentan
   también forms de WordPress de otras propiedades). NO imponemos nombres nuestros:
   nos adaptamos a SUS llaves exactas (name/mobile/interes/…). Es el MISMO webhook para
   los 4 desarrollos PLP; la URL vive en env (ZOHO_WEBHOOK_URL). Si falta → 'skip' (inerte).
   Payload de Essentia es PLANO (lead.nombre, lead.ts…), no anidado. */
async function toZoho(lead) {
  const url = process.env.ZOHO_WEBHOOK_URL;
  if (!url) return 'skip';

  // WhatsApp del form → llave 'mobile' con lada país (MX 10 díg → +52).
  const digits = (lead.whatsapp || '').replace(/\D/g, '');
  const celular = !digits ? undefined
    : digits.startsWith('52') ? '+' + digits
    : digits.length === 10 ? '+52' + digits : '+' + digits;

  // Fecha en AAAA-MM-DDTHH:mm:ss-06:00 (hora central de México, sin DST).
  const fechaMX = (iso) => {
    const d = new Date(iso || Date.now());
    const mx = new Date(d.getTime() - 6 * 3600 * 1000);
    const p = (n) => String(n).padStart(2, '0');
    return mx.getUTCFullYear() + '-' + p(mx.getUTCMonth() + 1) + '-' + p(mx.getUTCDate())
      + 'T' + p(mx.getUTCHours()) + ':' + p(mx.getUTCMinutes()) + ':' + p(mx.getUTCSeconds()) + '-06:00';
  };

  // Plataforma = canal de origen (Facebook / Instagram / Google), derivado del utm_source.
  const plataformaCanal = (() => {
    const s = (lead.utm_source || '').toLowerCase();
    if (/insta|^ig$/.test(s)) return 'Instagram';
    if (/face|fb|meta/.test(s)) return 'Facebook';
    if (/google|adwords/.test(s)) return 'Google';
    if (lead.gclid) return 'Google';
    if (lead.fbclid) return 'Facebook';
    return lead.utm_source || '';
  })();

  // Detalle de interés = respuestas del form (labels) separadas por " / ".
  const detalle = [lead.objetivo, lead.producto_interes, lead.timing, lead.presupuesto].filter(Boolean).join(' / ');

  const body = {
    // ---- llaves CONFIRMADAS por la config del webhook (WordPress → Make) ----
    name: lead.nombre,                     // 'name' alimenta Apellidos (Last Name, requerido) en Zoho; Nombre queda vacío
    email: lead.email,                     // → Email
    mobile: celular,                       // → Teléfono/Movil (la llave es 'mobile')
    interes: 'ESSENTIA COUNTRY',           // → Desarrollo de interés (debe coincidir con la opción del picklist en Zoho)
    medio: 'Online',
    medioContacto: 'Formulario',           // → Medio de contacto (texto fijo)
    formulario: 'LP Essentia ' + (lead.variante || ''), // → Formulario = nombre/versión del form (A/B)
    submedio: 'Landing Page',
    agenciaMarketing: 'Sentido',
    ruletaFuerzaVentas: 'Ambos',
    companiapropietaria: 'Península',      // → Compañía propietaria (llave real todo minúsculas)
    tipoLead: 'Compra UP',                 // → Tipo de lead
    platform: plataformaCanal,             // → Plataforma = canal desde utm_source
    pagina: 'Essentia Country',            // → Página de origen (llave 'pagina') = nombre de la página de FB
    creationDate: fechaMX(lead.ts || lead.timestamp),
    // ---- extras nuestros (se ignoran si el webhook no los mapea) ----
    detalleinteres: detalle,               // → Detalle de interés (llave minúsculas)
    objetivo: lead.objetivo, producto_interes: lead.producto_interes,
    timing: lead.timing, presupuesto: lead.presupuesto, version_lp: lead.variante,
    // ---- atribución de campaña (de los UTMs) ----
    campania: lead.utm_campaign,           // → Campaña
    anuncio: lead.utm_content || lead.ad_id, // → Anuncio (nombre del ad)
    conjuntoAnuncios: lead.utm_term || lead.adset_id, // → Conjunto de anuncios
    adSetId: lead.adset_id,
    utm_source: lead.utm_source
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

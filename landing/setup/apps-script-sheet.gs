/**
 * Essentia LP — Google Apps Script Web App (respaldo de leads)
 * Framework §8.3. Recibe el POST del relay (api/lead.js) y agrega una fila.
 *
 * CÓMO DESPLEGAR (una sola vez):
 * 1. Abre la hoja "Essentia LP - Leads (relay)":
 *    https://docs.google.com/spreadsheets/d/1Z-S9IxTepY8RodHV8Wg3j5-CpOzui7mNj9ERBbFhoHA/edit
 * 2. Menú: Extensiones → Apps Script.
 * 3. Borra el código de ejemplo y pega TODO este archivo.
 * 4. Implementar → Nueva implementación → tipo "Aplicación web".
 *      - Ejecutar como: Yo (tu cuenta)
 *      - Quién tiene acceso: Cualquier persona
 * 5. Copia la URL que termina en /exec  →  esa es SHEET_WEBHOOK_URL (env var en Vercel).
 *
 * Nota: si cambias el código, hay que crear una NUEVA implementación (o "Administrar
 * implementaciones" → editar → versión nueva) para que tome efecto.
 */

// Orden EXACTO de las columnas de la hoja (fila 1).
var COLUMNS = [
  'timestamp', 'variante', 'nombre', 'whatsapp', 'email',
  'objetivo', 'producto_interes', 'timing', 'monto',
  'utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term',
  'gclid', 'fbclid', 'fbp', 'fbc',
  'referrer', 'landing_url', 'user_agent', 'event_id'
];

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];

    // timestamp del servidor (si no viene en el payload)
    var row = COLUMNS.map(function (key) {
      if (key === 'timestamp') return data.ts || new Date().toISOString();
      return data[key] !== undefined && data[key] !== null ? data[key] : '';
    });

    sheet.appendRow(row);
    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Permite probar el despliegue abriendo la URL /exec en el navegador.
function doGet() {
  return ContentService
    .createTextOutput('Essentia LP relay endpoint OK')
    .setMimeType(ContentService.MimeType.TEXT);
}

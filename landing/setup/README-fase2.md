# Fase 2 — Conexión de captura + tracking (Essentia LP)

Objetivo: que los leads de la LP **lleguen a varios destinos en paralelo** y que la **conversión se mida** en Meta y Google. Resuelve el problema #1 del proyecto (pauta sin conversiones rastreadas).

## Arquitectura
```
Form LP → /api/lead (relay serverless) → en paralelo:
   ├─ Google Sheet   (respaldo durable · "no se pierde ningún lead")
   ├─ GHL            (contacto + custom fields)
   └─ Meta CAPI      (evento Lead server-side)
Navegador (tracking.js): Meta Pixel + Google Ads (conversión al enviar el form)
```

## Dónde va cada credencial (importante)

La LP es **estática** (sin build), así que el navegador no lee env vars. Por eso se dividen:

| Credencial | Es secreto | Dónde se pone | Quién |
|---|---|---|---|
| **Meta Pixel ID** | No (público) | `tracking.js` (en el código) | Sentido edita |
| **Google Ads ID + label de conversión** | No (público) | `tracking.js` | Sentido edita |
| **SHEET_WEBHOOK_URL** | Semi | Env var en Vercel | PLP/Jos genera, Jos pone |
| **META_CAPI_TOKEN** | **Sí** | Env var en Vercel | Jos pone |
| **GHL_TOKEN + GHL_LOCATION_ID** | **Sí** | Env var en Vercel | Jos pone |

> Los IDs públicos (Pixel, Google Ads) se pueden poner en el código sin riesgo: de todos modos viajan al navegador. Los **tokens secretos** SIEMPRE como env var en Vercel (nunca en el repo).

---

## Paso 1 — Respaldo en Google Sheet (lo más importante: que no se pierda ningún lead)

1. Hoja ya creada: **Essentia LP - Leads (relay)**
   https://docs.google.com/spreadsheets/d/1Z-S9IxTepY8RodHV8Wg3j5-CpOzui7mNj9ERBbFhoHA/edit
2. En esa hoja: **Extensiones → Apps Script**. Pega el contenido de `setup/apps-script-sheet.gs`.
3. **Implementar → Nueva implementación → Aplicación web**:
   - Ejecutar como: **Yo**
   - Quién tiene acceso: **Cualquier persona**
4. Copia la URL `…/exec` → es **`SHEET_WEBHOOK_URL`**.
5. Ponla como env var en Vercel (Paso 4).

## Paso 2 — Meta Pixel + Conversions API (CAPI)

1. En **Meta Business Suite → Administrador de eventos**: copia el **Pixel ID** (dataset).
2. Genera un **token de CAPI** (Configuración del dataset → Conversions API → Generar token de acceso).
3. **Pixel ID** → reemplaza `‹‹META_PIXEL_ID››` en `tracking.js`.
4. **Token CAPI** → env var `META_CAPI_TOKEN` en Vercel (+ `META_PIXEL_ID` también como env var para el relay).

## Paso 3 — Google Ads (conversión de sitio web)

1. En **Google Ads → Objetivos → Conversiones → Nueva conversión → Sitio web**.
2. Crea una acción de conversión (ej. "Lead LP") con etiqueta. Te da `AW-XXXXXXXXX` y un `label`.
3. Reemplaza `‹‹GOOGLE_ADS_ID››` y `‹‹CONV_LABEL››` en `tracking.js`.
   > IMPORTANTE: NO uses la conversión "alojada en Google" de los lead forms nativos — no sirve para web (no tiene label de gtag).

## Paso 4 — Variables de entorno en Vercel

Proyecto `essentia-lp` → Settings → Environment Variables. Agrega (Production):

```
SHEET_WEBHOOK_URL = https://script.google.com/macros/s/…/exec
META_PIXEL_ID     = (el mismo Pixel ID)
META_CAPI_TOKEN   = (token CAPI · SECRETO)
GHL_TOKEN         = (PIT token de la sub-cuenta GHL de Essentia · SECRETO)
GHL_LOCATION_ID   = (location id de Essentia)
```
Tras agregarlas, **redeploy** (un commit vacío o "Redeploy" en Vercel) para que tomen efecto.

## Paso 5 — GHL (cuando haya acceso)

- Sub-cuenta/location dedicada de Essentia. Acceso por **PIT token** (REST `services.leadconnectorhq.com`, header `Version: 2021-07-28`).
- Custom fields a crear: `objetivo`, `producto_interes`, `timing`, `monto`, `variante`, `utm_source`, `utm_campaign`, `fbclid`, `landing_url`.
- Si nos comparten el token + location, Sentido crea los custom fields por API.

## Paso 6 — Prueba de punta a punta

1. Abre la LP, llena el form con datos de prueba.
2. Verifica: (a) fila nueva en la Google Sheet, (b) evento "Lead" en Meta (Probador de eventos), (c) conversión en Google Ads (puede tardar), (d) contacto en GHL.
3. La hoja es la "caja transparente": si el lead está ahí, no se perdió.

---

## Lo que necesitamos de PLP/Jos para terminar Fase 2
- [ ] Desplegar el Apps Script y pasar la `SHEET_WEBHOOK_URL`
- [ ] **Pixel ID** + **token CAPI** (Meta Business de Essentia)
- [ ] **Google Ads ID** + **label** de la conversión de sitio web
- [ ] **GHL**: PIT token + location id de la sub-cuenta de Essentia
- [ ] Acceso para poner las env vars en Vercel (o que Jos las ponga)

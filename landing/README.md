# Essentia Country — Landing Page

Landing Page de conversión A/B para **Essentia Country** (Peninsula Lifestyle Properties), preventa de departamentos en Country Club, Guadalajara.

Parte del sistema PLP × Sentido (framework `plp-lp`). El LP es el motor de conversión (Pilar 3): tráfico de Meta + Google → form propio → relay serverless → GHL + Google Sheet + Meta CAPI.

## Estructura

```
landing/                 ← Root Directory en Vercel
├── index.html           página única A/B (variante por ?v=a | ?v=b)
├── styles.css           paleta de marca (taupe/olivo/negro) · Cinzel + Josefin Sans
├── app.js               variantes A/B, form conversacional multi-paso, reveal
├── tracking.js          Meta Pixel + Google Ads gtag + captura de UTMs (placeholders Fase 2)
├── api/lead.js          relay serverless → GHL + Sheet + Meta CAPI (en paralelo)
└── assets/img/          fotos reales (drone + gym) en WebP + logos
```

## Variantes A/B

- **A (lifestyle, tráfico Meta/IG):** `https://<dominio>/` o `?v=a`
- **B (inversión/ROI, tráfico Google):** `https://<dominio>/?v=b`

## Vercel

- **Root Directory:** `landing/`
- **Deployment Protection:** desactivado (si devuelve 401).
- Las funciones de `landing/api/` se despliegan como serverless automáticamente.

## Pendientes Fase 2 (env vars en Vercel)

| Variable | Para |
|---|---|
| `META_PIXEL_ID`, `META_CAPI_TOKEN` | Pixel + Conversions API |
| `GOOGLE_ADS_ID`, `CONV_LABEL` | Conversión Google Ads (en `tracking.js`) |
| `GHL_TOKEN`, `GHL_LOCATION_ID` | Upsert de contactos a GHL |
| `SHEET_WEBHOOK_URL` | Respaldo en Google Sheet (Apps Script) |

## Placeholders de contenido (pendientes con PLP)

`‹‹AVANCE_OBRA››` · `‹‹FECHA_ENTREGA››` · `‹‹CREDITO››` · `‹‹TRACK_RECORD››`

---
🤖 Generado con [Claude Code](https://claude.com/claude-code) · Sentido Branding & Advertising

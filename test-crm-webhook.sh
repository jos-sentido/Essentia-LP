#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# test-crm-webhook.sh — Prueba directa del webhook Make compartido de PLP (→ Zoho CRM).
#
# Valida el mapeo del webhook SIN pasar por la LP ni el relay desplegado. Manda
# EXACTAMENTE las mismas llaves que toZoho() en landing/api/lead.js (esquema fijo
# de PLP), así lo que caiga aquí cae idéntico con los leads reales.
#
# NOTA: el webhook es la producción de PLP (Zoho compartido por los 4 desarrollos).
# Cada corrida crea un lead real → marcado "PRUEBA CRM ESSENTIA - borrar" para que
# PLP lo elimine. Corre esto solo con el cliente al tanto.
#
# Uso:
#   ./test-crm-webhook.sh 'https://hook.us1.make.com/xxxxxxxxxxxxxxxxxxxxxxxxx'
#
# Loop de segundos: correr → PLP revisa qué cayó en cada campo de Zoho → ajustar → correr.
# ─────────────────────────────────────────────────────────────────────────────
set -euo pipefail
URL="${1:-}"
[ -z "$URL" ] && { echo "Uso: $0 <URL_DEL_WEBHOOK>"; exit 1; }

curl -sS -X POST "$URL" \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "PRUEBA CRM ESSENTIA - borrar",
    "email": "prueba+crm@sentido.mx",
    "mobile": "+523331234567",
    "interes": "ESSENTIA COUNTRY",
    "medio": "Online",
    "medioContacto": "Formulario",
    "formulario": "LP Essentia A",
    "submedio": "Landing Page",
    "agenciaMarketing": "Sentido",
    "ruletaFuerzaVentas": "Ambos",
    "companiapropietaria": "Península",
    "tipoLead": "Compra UP",
    "platform": "Facebook",
    "pagina": "Essentia Country",
    "creationDate": "2026-08-24T12:00:00-06:00",
    "detalleinteres": "Invertir / 2 recámaras / 3-6 meses / 6-8 MDP",
    "objetivo": "Invertir",
    "producto_interes": "2 recámaras",
    "timing": "3-6 meses",
    "presupuesto": "6-8 MDP",
    "version_lp": "A",
    "campania": "essentia-prueba",
    "anuncio": "creativo-prueba",
    "conjuntoAnuncios": "adset-prueba",
    "adSetId": "TEST_ADSET_123",
    "utm_source": "meta"
  }'
echo
echo "→ Revisa en Zoho que aparezca el Lead \"PRUEBA CRM ESSENTIA - borrar\" y qué campo recibió cada valor."

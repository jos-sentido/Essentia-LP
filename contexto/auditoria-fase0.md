# Auditoría Fase 0 — Essentia Country

> Estado del arranque (Fase 0) al **22 jun 2026**. Qué está listo, qué falta y qué bloquea la Fase 1.
> Fuente de verdad: este documento resume el estado de `/contexto/`. Actualizar al cerrar cada pendiente.

---

## 1 · Semáforo general

| Documento de `/contexto/` | Estado | Completitud |
|---|---|---|
| `brief-desarrollo.md` | 🟢 Casi completo | ~85% |
| `analisis-campanas.md` | 🟢 Completo | ~95% |
| `analisis-redes.md` | 🟢 Completo | ~95% |
| `scraping-web.md` | 🟢 Completo | ~90% |
| `insights-oportunidades.md` | 🟢 Completo | ~90% |
| `identidad-grafica.md` | 🟢 Completo | ~90% |
| `auditoria-fase0.md` (este) | 🟢 Vivo | — |

**Veredicto:** Fase 0 está **~85% lista**. El contexto tiene base sólida y trazable para empezar a diseñar la LP y el calendario. Quedan **3 bloqueadores duros** (obra, créditos, validación PLP) antes de producir Fase 1.

---

## 2 · Lo que YA tenemos (avances confirmados)

### 2.1 Producto — CONFIRMADO y trazable
- ✅ **4 tipologías con m² exactos** (brochure oficial): 1 rec 83.81 m² → 3 rec 152.62 m²
- ✅ **Precios oficiales** (lista maestra PLP, fila 23): 1R $6.4 / 2R $7.3 / 3R $10.2 MDP; hasta $13.1 MDP
- ✅ **Condiciones de pago:** 30% enganche · 18 MSI · 30% contra entrega
- ✅ **8 amenidades oficiales:** Bar, Spa, Alberca, Jardines, Gimnasio, Área de camastros, Elevadores alta velocidad, Seguridad 24h
- ✅ **Ubicación + cercanías** (brochure): Country Club, Zona Financiera, Hilton, Midtown, Punto Sao Paulo, etc.
- ✅ **Uso mixto** identificado (residencial + corporativo)
- ✅ **Aviso de privacidad** existe y es accesible

### 2.2 Desarrollador — CONFIRMADO
- ✅ **Portafolio PLP:** Amancay (Nuevo Vallarta), Distrito Chapultepec (GDL), Ocean One (Playa Diamante) + ~30 desarrollos más en la lista maestra
- ✅ PLP = firma con escala nacional (costa + ciudad) → base sólida para track record

### 2.3 Medios — CONFIRMADO con datos reales
- ✅ **Meta Ads:** 214 leads / MX$679 CPL / MX$145K (Jan–Jun 2026); IG 76% vs FB 24%
- ✅ **Google Ads:** MX$10.8K / 3,394 clics / CTR 5.58% / **0 conversiones (tracking roto)**
- ✅ **Orgánico:** FB + IG analizados (Ene–May), pilares y mejores formatos identificados
- ✅ **Social Listening:** ~7 leads orgánicos + comentarios negativos documentados

### 2.4 Activos visuales — CONFIRMADO
- ✅ **29 fotos drone** del edificio (mar 2025) — torre ~20+ pisos, estructura completa
- ✅ **9 fotos del gym** (Technogym, vistas panorámicas)
- ✅ **~7 videos drone 4K** (en ZIP)
- ✅ **74 imágenes IA** generadas (mar–jun 2026)
- ✅ **Brochure oficial PDF** (17 pp.)

### 2.5b Identidad gráfica — CONFIRMADO
- ✅ **Manual de identidad** oficial (logo, paleta, tipografía, patrón)
- ✅ **Logos** en color/negro/blanco (PDF, PNG, JPG) en `insumos/brand-assets/`
- ✅ **Paleta:** Negro `#000000` · Taupe `#574545` (Pantone 438C) · Olivo `#7A7157` (Pantone 7497C)
- ✅ **Tipografías:** Oriya MN (serif, títulos) + Quick (sans, apoyo) — requieren equivalentes web para LP
- ✅ **Personalidad:** lujo discreto, terroso, atemporal, minimalista

### 2.5 Competencia y mercado — CONFIRMADO
- ✅ **Set competitivo de zona** mapeado: Vianto 1331 (PLP, 42 pisos Sordo Madaleno, $4.78M), Tesea (ultra-lujo $14.5M), The District ($14M), Heredit, etc.
- ✅ **Posicionamiento de Essentia:** hueco "smart luxury" — Country Club consolidado + ticket accesible
- ✅ **Datos de mercado:** $/m² zona, plusvalía 8–15%, renta ~$250/m²/mes → ROI ~3.9% bruto + plusvalía
- ✅ **6 áreas de oportunidad** definidas (ver scraping-web.md §6)
- ⚠️ Alerta: Vianto es del mismo desarrollador (PLP) → diferenciar mensaje para evitar canibalización

---

## 3 · Lo que FALTA (pendientes)

### 3.1 🔴 Bloqueadores duros (sin esto NO arranca Fase 1)

| # | Pendiente | Por qué bloquea | Responsable |
|---|---|---|---|
| 1 | **% de avance de obra actual (jun 2026) y fecha de entrega** | Riesgo reputacional activo; no se puede prometer entrega sin dato real | PLP |
| 2 | **Esquemas de crédito hipotecario / financiamiento bancario** | La Variante B (inversión) lo necesita; condiciones de pago ≠ crédito | PLP |
| 3 | **Validación de `/contexto/` por PLP/Jos** | Regla dura del framework: no Fase 1 sin contexto validado | Jos + PLP |
| 4 | **Pactar reglas duras de comunicación (§4.5 framework)** | Qué se puede decir de entrega, avance, plusvalía con números | Jos + PLP |

### 3.2 🟡 Pendientes importantes (no bloquean, pero suman mucho)

| # | Pendiente | Para qué sirve | Responsable |
|---|---|---|---|
| 5 | **Aclaración compradores 2024** | Gestionar reputación y comunidad | PLP |
| 6 | **Track record detallado de PLP** (entregados, años, unidades) | Variante B + confianza | PLP / scraping peninsula.mx |
| 7 | **Acceso a Meta Business Suite** | Auditar audiencias, frecuencia, remarketing | PLP |
| 8 | **Acceso al Google Sheet de leads** (1p6XuQ...) | Calcular CPL real y calidad de lead | PLP |
| 9 | **Roles de Varabyeu (arquitectura) y Highestate (ventas)** | Claridad de actores y posibles créditos | PLP |
| 10 | **Demografía precisa de leads** (sexo/edad exactos) | Segmentación de pauta | Meta Business Suite |
| 11b | **Manual de identidad extendido + vectoriales editables (.ai/.svg) + licencia de fuentes** | Solo tenemos manual básico 2022 (PDF/PNG); para LP necesitamos vectoriales y fuentes web | PLP |

### 3.3 🟢 Pendientes técnicos (los resolvemos nosotros en Fase 2)

| # | Pendiente | Cuándo |
|---|---|---|
| 11 | Configurar tracking de conversiones (Pixel + CAPI + gtag) | Fase 2 (implementación LP) |
| 12 | Scraping de reputación de Heredit y competidores en Country Club | Esta semana (Chrome MCP) |
| 13 | Extraer videos drone de los ZIP cuando se necesiten | Al producir contenido |
| 14 | Descargar/archivar aviso de privacidad como respaldo | Cuando se monte la LP |

---

## 4 · Cambios de diagnóstico desde el arranque

Tres cosas cambiaron respecto al análisis inicial (solo con reportes):

1. **Meta Ads SÍ funciona** — al inicio no había datos; ahora sabemos que es el canal principal (214 leads, 93% de la inversión). El problema de Google (0 conversiones) no es el problema de todo el sistema.

2. **El avance de obra es un ACTIVO, no un hueco** — teníamos el riesgo reputacional de "no entregan", pero las fotos drone muestran un edificio altísimo y estructurado, y el gym terminado. El contenido existe; nunca se usó. Esto **da vuelta** al argumento negativo.

3. **Essentia no es el más caro** — Heredit (el competidor citado negativamente) arranca 60% más caro. Essentia tiene un precio de entrada competitivo en la mejor zona. Ángulo de posicionamiento defendible.

---

## 5 · Próximos pasos recomendados (orden sugerido)

1. **Enviar a PLP la lista corta de bloqueadores** (§3.1) — obra, créditos, validación
2. **Scraping de competencia** (Heredit + Country Club) — lo podemos hacer ya, sin depender de PLP
3. **Sesión de reglas de comunicación** (§4.5) con Jos + PLP
4. Con §3.1 cerrado → **validar `/contexto/`** → desbloquear Fase 1 (LP + copy + calendario)

---

## 6 · Estado Fase 1 (Producción)

> Decisión del 22 jun 2026: avanzar a Fase 1 con los datos disponibles, usando **placeholders marcados** para lo pendiente de PLP. Calendario de redes pospuesto por indicación de Jos.

| Entregable Fase 1 | Estado |
|---|---|
| **Copy LP A/B** (`contenido-oficial/copy-lp/copy-lp-essentia.md`) | 🟢 Producido (con placeholders) |
| **Build LP** (`/landing/`, skill ui-ux-pro-max) | 🟢 Construida y PUBLICADA |
| **Deploy Vercel** | 🟢 En vivo · https://essentia-lp-sigma.vercel.app |
| Calendario de redes | ⏸️ Pospuesto (indicación de Jos) |

**LP en vivo (jun 22, 2026):**
- Repo: github.com/jos-sentido/Essentia-LP (push vía SSH)
- Variante A (lifestyle): https://essentia-lp-sigma.vercel.app/
- Variante B (inversión): https://essentia-lp-sigma.vercel.app/?v=b
- Stack: HTML/CSS/JS estático + serverless `api/lead.js`. Servido desde raíz del repo (sin Root Directory).
- Pendiente Fase 2: env vars de tracking (Pixel/Google Ads) y relay (GHL/Sheet/CAPI); llenar placeholders de contenido.

Placeholders activos en el copy: `‹‹FECHA_ENTREGA››`, `‹‹AVANCE_OBRA››`, `‹‹CREDITO››`, `‹‹TRACK_RECORD››`, `‹‹TESTIMONIAL››`, `‹‹% VENDIDO››`, `‹‹AMENIDADES_EXTRA››`.

---

*Última actualización: 22 jun 2026 — copy LP A/B producido; Fase 1 en marcha.*

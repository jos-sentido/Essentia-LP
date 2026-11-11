# Framework Sentido × Peninsula Lifestyle Properties (PLP)

## Playbook operativo para analizar, construir, publicar y medir el marketing de cada desarrollo

**Estado:** documento base v4 · compartido entre todos los proyectos de Claude Code de PLP (uno por desarrollo)
**Referencia comercial:** Propuesta *Paquete Integral — Marketing Digital* (PLP) · `propuesta_paquete_integral_PLP.pdf`
**Cliente:** Peninsula Lifestyle Properties — Desarrollos Inmobiliarios
**Última actualización:** junio 2026 · v4 incorpora los aprendizajes de la 1ª implementación real (ver §15)

---

## 0 · Cómo usar este documento

Este MD es **la base compartida** que se copia tal cual en cada proyecto de Claude Code (uno por desarrollo de PLP). No cambia entre desarrollos — los insumos, el contexto, el código y los assets sí.

Su objetivo es ser el **framework de ejecución** de cada proyecto, en 4 fases:

1. **Arranque** — analizar lo que ya existe y **construir el contexto oficial** del desarrollo.
2. **Producción** — del contexto salen el copy/LP y el calendario de redes.
3. **Implementación** — publicar (GitHub → Vercel), vincular GHL, tracking y envío a Zoho.
4. **Continuidad** — medir, optimizar y generar el contenido mes a mes.

**Estructura de cada proyecto de Claude Code (1 por desarrollo):**

```
/plp-[nombre-desarrollo]/
├── framework-plp-lp.md          ← este documento (compartido, no cambia)
│
├── insumos/                     ← ENTRADA: material crudo que comparte PLP/Jos
│   ├── capacitacion.pdf          ← capacitación de ventas del desarrollo
│   ├── reportes-meta-ads/        ← resultados de campañas Meta actuales
│   ├── reportes-google-ads/      ← resultados de Google Ads actuales
│   ├── reportes-trafico-web/     ← Analytics / tráfico del sitio
│   ├── reportes-redes/           ← rendimiento de publicaciones orgánicas
│   ├── calendarios-previos/      ← calendarios de contenido y anuncios ya trabajados
│   ├── renders/  planos/  walkthroughs/
│   ├── brand-assets/
│   └── datos-comerciales/        ← precios, tipologías, condiciones, esquemas
│
├── contexto/                    ← SE GENERA en la fase de arranque (salida del análisis)
│   ├── brief-desarrollo.md       ← ficha oficial y verificada del desarrollo
│   ├── scraping-web.md           ← competencia + zona + KW
│   ├── analisis-campanas.md      ← qué se corrió y qué resultó (Meta/Google/web)
│   ├── analisis-redes.md         ← rendimiento orgánico + calendarios previos
│   └── insights-oportunidades.md ← síntesis: qué mejorar y por qué
│
├── contenido-oficial/           ← derivado del contexto
│   ├── copy-lp/                  ← copy curado para los LPs
│   ├── calendario-redes/         ← nuevo calendario de contenido (orgánico + pauta)
│   └── creativos/
│
├── landing/                     ← código del LP → GitHub → Vercel (Root Directory en Vercel)
│   ├── variante-a/  variante-b/  shared/
│   └── api/                      ← relay serverless (lead.js) — captura blindada (§8.1)
│
└── reportes/                    ← medición mes a mes vía MCP
```

> **Regla de oro del contexto:** todo lo que se escriba en `/contexto/` debe ser **real, oficial y trazable** a un insumo. Nada inventado. Si un dato no está en los insumos, se marca como **pendiente de confirmar con PLP**.

---

## 1 · El sistema vendido a PLP (los 4 pilares)

> **Un sistema integral que conecta captación, conversión y seguimiento en una sola estrategia.**
> Cuatro pilares diseñados para trabajar en conjunto. **Aplica por cada desarrollo inmobiliario.**

| # | Pilar | Qué hace | Valor individual |
|---|---|---|---|
| **01** | **Redes Sociales + Meta Ads** | 15 posts + 6 Reels/mes, guiones, edición, gestión de comunidad y campañas de captación (Lead Forms). | $7,000 + IVA / mes |
| **02** | **Google Ads** | Campañas de alta intención (ROI/Inversión, Marca, Competencia, Geográfica) conectadas a los LPs del Pilar 3. | $4,000 + IVA / mes |
| **03** | **Landing Pages + CRM (GHL)** | LPs de alta conversión, form pre-calificador, lead scoring, tracking y automatización al CRM del cliente. | $2,800 + IVA / mes |
| **04** | **Remarketing Estratégico** | Campañas de refuerzo de marca dirigidas a leads ya generados para acelerar el cierre. | $2,500 + IVA / mes |

**Paquete integral:** **$14,500 MXN + IVA / mes por desarrollo** (vs. $16,300 individual — ahorro $1,800/mes).
**Pauta recomendada (no incluida):** Google mín. $10,000 · Meta captación mín. $10,000 · Remarketing $5,000.

### 1.1 El objetivo del sistema

Convertir pauta (Meta + Google) en **leads calificados y atribuibles** que aterrizan en el CRM del cliente (Zoho) listos para el equipo comercial de PLP — con tracking limpio de punta a punta para optimizar sobre datos propios.

### 1.2 Cómo encaja cada pilar en este framework

- **Pilar 01 (Redes + Meta):** genera tráfico y leads. Sus **forms nativos de Meta (Lead Ads)** se vinculan en GHL pero **no** se mandan a Zoho (PLP ya los tiene nativos). Alimentan remarketing. El **calendario de contenido** (sección 7) es parte de este pilar.
- **Pilar 02 (Google Ads):** tráfico de alta intención que aterriza **1:1 en los Landing Pages** del Pilar 3.
- **Pilar 03 (LP + GHL):** el corazón operativo de este framework (secciones 5–10).
- **Pilar 04 (Remarketing):** refuerzo de marca sobre quienes ya interactuaron (sección 11).

### 1.3 Principios no negociables

- **El sistema se contrata completo por desarrollo.**
- **GHL no opera la venta** — es un destino de datos (contacto + custom fields). La captura, el enriquecimiento y el tracking viven en la **LP + el relay serverless**; la operación comercial vive en **Zoho**.
- **La conversión se mide sobre el lead de LP capturado** (al enviar el form, vía Pixel + CAPI + Google Ads), no sobre su comportamiento en Zoho.
- **Todo lo nuevo se construye sobre el contexto oficial** (Fase 0) — no sobre supuestos.

---

## 2 · Stack y arquitectura de los proyectos de Claude Code

| Herramienta | Rol en el proyecto |
|---|---|
| **Claude Code** | Analizar insumos, construir el contexto, generar copy/calendarios, construir y optimizar LPs, armar reportes. |
| **GitHub** | Repositorio del LP por desarrollo. Versiones de variantes A/B. |
| **Vercel** | Hosting del LP **+ función serverless** (relay de captura `api/lead`). Cada push despliega. Root Directory = `landing/`. |
| **GHL (MCP o PIT token REST)** | **Destino** de leads vía API (upsert contacto + custom fields) y **hub de activos**. No es el front de captura. Puede no estar como MCP → PIT token por REST. |
| **Google Sheet + Apps Script** | Respaldo durable y auditable de cada lead (1 fila con todo el tracking). Destino del relay. |
| **Meta (MCP)** | Lectura de cuenta publicitaria, campañas, CPL, audiencias de remarketing, eventos CAPI, **reportes de desempeño**. |
| **Chrome (MCP)** | QA del LP publicado, validación de tracking en vivo, scraping de competencia. |
| **Zapier** *(fallback)* | Puente alterno a Zoho (GHL→Zapier→Zoho) si no se usa el relay directo. |

### 2.1 Pipeline de publicación

```
[Claude Code] ─build─► [GitHub] ─push─► [Vercel · LP en vivo]
                                            │  form propio (form.js, conversacional)
                                            ▼
                                POST /api/lead  (función serverless · relay)
                                    ├──► GHL  (upsert contacto + custom fields · idempotente · 3 reintentos)
                                    ├──► Google Sheet  (respaldo durable · Apps Script)
                                    └──► Meta CAPI  (Lead server-side · dedup por event_id)
   Navegador (tracking.js): Meta Pixel (PageView+Lead) · Google Ads gtag (conversión) ── mismo event_id ──┘
   Red de seguridad: el front reintenta; si falla, encola en localStorage y reintenta al recargar.
   Zoho (cuando aplique) = 4º destino del mismo relay. Solo los leads de LP van a Zoho.
```

### 2.2 Las dos fuentes de lead (no confundir)

| Fuente | Dónde vive | ¿Va a Zoho? | Uso |
|---|---|---|---|
| **Leads de Landing Page** | LP (form propio) → relay → GHL + Sheet + CAPI | **Sí** (Zoho = destino del relay, pendiente) | Conversión + entrega a PLP |
| **Forms nativos de Meta (Lead Ads)** | Meta / GHL (vinculados) | **No** (PLP ya los tiene) | Audiencias de **remarketing** |

### 2.3 Credenciales, entorno y repositorio

- **Acceso de plataformas para Claude Code = MCP cuando exista.** Meta, Vercel, GitHub y Chrome se usan vía MCP. **El GHL del desarrollo puede NO estar como MCP** (los MCP disponibles pueden ser de otras cuentas) → plan B comprobado: operar GHL con **PIT token vía REST** (`services.leadconnectorhq.com`, header `Version: 2021-07-28`).
- **Secretos del proyecto (no solo el PIT token).** El relay serverless necesita 4 variables, configuradas como **env vars en Vercel (Production)** y en `.env.local` para dev (nunca commiteadas):
  `GHL_PIT_TOKEN` · `GHL_LOCATION_ID` · `SHEET_WEBHOOK_URL` (Apps Script `/exec`) · `META_CAPI_TOKEN`.
  Las env vars nuevas **requieren un redeploy** para tomar efecto (un commit vacío sirve). Ver `.env.example`.
- **Lo demás no es secreto** y vive en el browser/commiteado: **Pixel ID de Meta** e **ID de conversión de Google Ads** se envían al browser de todas formas.
- **Repositorio privado.** El repo en GitHub es **privado**, así que `insumos/`, `contexto/` y `reportes/` sí se versionan. Solo `.env*` queda fuera (`.gitignore`).
- **Repo privado ≠ sitio privado.** Vercel publica el LP en una **URL pública**. **Root Directory = `landing/`** (solo se despliega el LP) y **desactivar Deployment Protection** si devuelve 401.
- **PII:** la PII se hashea **server-side en el relay** (SHA-256) antes de Meta CAPI. No acumular datos de contacto de leads (nombre/teléfono/email) en archivos del repo — viven en GHL/Sheet/Zoho bajo el aviso de privacidad.

---

## 3 · Las 4 fases del proyecto

```
FASE 0 · ARRANQUE          FASE 1 · PRODUCCIÓN       FASE 2 · IMPLEMENTACIÓN     FASE 3 · CONTINUIDAD
insumos → análisis →       contexto → copy LP +      GitHub → Vercel + GHL +     reportes + optimización
/contexto/ oficial         LPs A/B + calendario      relay+tracking+Zoho         + contenido mes a mes
   (sección 4)                (secciones 5–7)            (secciones 8–10)            (sección 12)
```

Cada fase consume el output de la anterior. **No se produce nada (Fase 1) sin contexto validado (Fase 0).** El arranque es lo que permite que todo lo demás esté alineado con lo real y, además, mejorado respecto a lo que ya se hizo.

---

## 4 · Fase de arranque: del insumo al contexto oficial

El propósito de esta fase es **entender lo que ya se ha hecho, extraer la información real y oficial del desarrollo, y consolidarla** en `/contexto/`. Ese contexto es la materia prima de todo lo demás: LP, calendario de redes, Google Ads, remarketing y reportes.

### 4.1 Insumos que se cargan (`/insumos/`)

Lo que Jos/PLP comparte al iniciar el proyecto:

- **Capacitación de ventas** del desarrollo (PDF).
- **Reportes de campañas actuales:** Meta Ads (resultados, CPL, creativos), Google Ads (keywords, CPC, conversiones), tráfico web (Analytics).
- **Reportes de redes:** rendimiento de publicaciones orgánicas (alcance, engagement, mejores formatos).
- **Calendarios previos:** parrillas de contenido orgánico y de anuncios ya trabajadas.
- **Producto:** renders, planos, walkthroughs, brand assets.
- **Datos comerciales:** precios, tipologías, condiciones, esquemas de pago/crédito, fechas.

> Si algún insumo falta, no se detiene el arranque: se construye el contexto con lo disponible y se marca lo faltante como **pendiente con PLP**.

### 4.2 Metodología de análisis y extracción

El análisis sigue 6 pasos. El objetivo doble es **(a) entender** lo hecho y **(b) detectar cómo mejorarlo**.

1. **Inventario de insumos** — listar qué se compartió, su fecha y qué falta.
2. **Extracción de hechos del producto** — de capacitación + datos comerciales: ubicación, tipologías, precios, condiciones, amenidades, diferenciadores, fechas. Cada dato con su fuente.
3. **Análisis de desempeño actual** — de reportes Meta/Google/web/redes: qué corrió, cuánto se invirtió, CPL/CPC/CTR/conversión, mejores y peores creativos/audiencias/keywords/horarios. *Qué funcionó y qué no.*
4. **Análisis de competencia y zona** — scraping (Chrome MCP): top 5 competidores, precios, claims, plusvalía/demanda de la zona, KW research, reputación.
5. **Síntesis de oportunidades** — cruzar producto + desempeño + competencia para detectar ángulos no explotados, mensajes a mejorar e hipótesis medibles.
6. **Consolidación y validación** — escribir los documentos de `/contexto/` (trazables) y validarlos con Jos/PLP antes de producir.

### 4.3 Documentos de contexto que se generan (`/contexto/`)

Salida de la fase de arranque. Plantilla mínima de cada uno:

**`brief-desarrollo.md`** — ficha oficial y verificada
```
- Identidad: nombre, tagline, ubicación exacta, etapa (preventa/obra/entregado)
- Tipologías (tabla): modelo · m² · recámaras · baños · precio desde · condiciones
- Amenidades
- Diferenciadores reales (vs. competencia)
- Esquemas de pago / crédito disponibles
- Fechas: inicio de obra, entrega estimada
- Público objetivo (habitar / invertir / mixto)
- Desarrollador (PLP): track record, entregas, unidades
- Legal: aviso de privacidad
- Fuente de cada dato + pendientes por confirmar
```

**`scraping-web.md`** — competencia y zona
```
- Top 5 competencia: nombre · precio · tipologías · claims · fortalezas/debilidades
- Zona: plusvalía histórica, demanda, ocupación, puntos clave
- KW research (alimenta Google Ads — Pilar 2)
- Reviews/reputación de PLP y competencia
- Oportunidad de posicionamiento
```

**`analisis-campanas.md`** — desempeño de pauta actual
```
- Meta Ads: campañas corridas, inversión, CPL, mejores/peores creativos y audiencias
- Google Ads: keywords, CPC, conversiones, search terms a negar
- Tráfico web: fuentes, páginas de entrada, conversión
- Conclusiones: qué replicar, qué cortar, qué probar
```

**`analisis-redes.md`** — desempeño orgánico
```
- Rendimiento orgánico: mejores formatos, temas y horarios, engagement
- Calendarios previos: cadencia y pilares de contenido usados
- Publicaciones que se pautaron y su resultado
- Conclusiones para el nuevo calendario (sección 7)
```

**`insights-oportunidades.md`** — síntesis accionable
```
- Lectura cruzada: data + competencia + producto
- Ángulos para el LP (alimenta variantes A/B — sección 6)
- Ángulos para contenido de redes (alimenta calendario — sección 7)
- Hipótesis de mejora medibles (qué esperamos mover y cómo se mide)
```

### 4.4 Instrucciones de activación (secuencia de arranque)

Para cada nuevo desarrollo, en su proyecto de Claude Code:

1. Crear la estructura de carpetas (sección 0) y cargar todo en `/insumos/`.
2. Pedir a Claude Code: **"Haz el inventario de insumos y dime qué falta."**
3. Ejecutar el análisis (4.2) y generar `brief-desarrollo.md` y `scraping-web.md`.
4. Generar `analisis-campanas.md` y `analisis-redes.md` desde los reportes (apoyo de Meta MCP donde aplique).
5. Generar `insights-oportunidades.md` (síntesis).
6. **Pactar y documentar las reglas duras de comunicación** del desarrollo (§4.5).
7. **Validar `/contexto/` con Jos/PLP.** Corregir lo que no sea oficial.
8. Solo con el contexto validado → pasar a Fase 1 (producción).

### 4.5 Reglas duras de comunicación (pactar antes de producir)

Estas reglas **no se infieren del insumo: se pactan con PLP y se fijan antes de escribir copy** (y se guardan como memoria del proyecto). Definen, **por desarrollo**:

- **Vocabulario obligatorio** (cómo nombrar la zona/el producto) y **qué NO se dice**.
- **Encuadre de claims** (cómo se comunica trayectoria, plazos, plusvalía — sin que se malinterprete).
- **Qué se omite** en comunicación (p. ej. desglose de tipologías/tarifas = uso interno).
- **Identidad aplicada:** colores y **sustitución de tipografías oficiales** por equivalentes con licencia web cuando no estén disponibles.
- **Objetivo único de conversión** del desarrollo (normalmente: completar el form).

> Son reglas *por desarrollo* — no hay lista universal. El framework solo obliga a **capturarlas explícitamente** en Fase 0. (Aprendizaje: si no se pactan antes, el copy se rehace.)

---

## 5 · Rol de los Landing Pages en el sistema

### 5.1 Qué es y qué no es un LP aquí

**ES:** la puerta del funnel de pauta, alineada **1:1 con el anuncio**; un activo **dedicado por desarrollo** publicado en Vercel; una pieza **viva** que se A/B testea; un **pre-filtro** que califica antes del formulario.

**NO ES:** un brochure ni el sitio corporativo de PLP; un sitio estático; un destino para los Lead Forms nativos de Meta (esos viven en Meta).

### 5.2 Por qué un LP dedicado por desarrollo

- **Pixel y atribución limpios** = mejor optimización de Meta/Google.
- **Mensajería sin compromisos** sobre la marca corporativa.
- **Velocidad de iteración** (redeploy en Vercel sin tocar nada más).

### 5.3 KPIs por LP

| KPI | Benchmark inicial | Régimen óptimo (día 180+) | Fuente |
|---|---|---|---|
| Conversion rate (visita → lead) | 3–5% | 6–10% | Vercel + Sheet/relay |
| CPL Meta | $1,200–1,800 MXN | $700–1,200 MXN | Meta MCP |
| CPL Google | $1,500–2,400 MXN | $900–1,600 MXN | Google Ads |
| Calidad (lead → cita) | 15–25% | 35–50% | Zoho (PLP) |
| Latencia de entrega a destinos | <30 seg | <10 seg | relay |

> **Citas agendadas** y **cierre** ocurren downstream en Zoho y solo son medibles con datos que comparta PLP.

---

## 6 · Metodología de producción de LPs

### 6.1 Inputs (vienen del contexto, no de cero)

El copy y los ángulos del LP salen de `brief-desarrollo.md` + `insights-oportunidades.md` + `scraping-web.md`. Los assets, de `/insumos/` (renders, planos, brand). Esto garantiza que el LP esté **alineado con lo real y mejorado** respecto a lo ya hecho.

### 6.2 Metodología de diseño y copy de conversión 2026 (obligatoria)

**Diseño — skill `ui-ux-pro-max`:** invocarlo siempre que se diseñe o refactorice UI de la LP. Aporta estilos, paletas, pairings tipográficos y 99 guías de UX priorizadas. Traducción mínima: contraste AA, targets táctiles, **mobile-first con CTA sticky**, scroll-reveal con `prefers-reduced-motion`, iconos SVG (no emojis), jerarquía editorial y estética premium.

**Copy y estructura de conversión (estándar):**
- **Un solo objetivo de conversión:** completar el form. Sin WhatsApp ni lead magnet inventado.
- **Message match:** el headline = la promesa del anuncio (coherencia ad → LP).
- **Escasez honesta:** solo claims reales y trazables (p. ej. "% vendido · últimas unidades"), nunca inventados.
- **De-risk (manejo de objeciones):** atacar la objeción #1 del comprador de preventa (avance de obra/entregas, escrituración, trayectoria del desarrollador). Es el bloque más fuerte para el inversionista (variante B).
- **Form conversacional multi-paso** (una pregunta a la vez) → más completado + pre-calificación + el prospecto se siente escuchado.
- **Social proof / autoridad** + **fotos reales de alta calidad** (no stock).
- **Mobile-first** con CTA sticky; arriba del pliegue: promesa + escasez + CTA.

**Diferenciación por intención de la fuente:**
- **Variante A = lifestyle / emocional** → tráfico **Meta/IG**.
- **Variante B = inversión / ROI / racional** → tráfico **Google** (alta intención).

Copy y estructura cambian según la fuente y la intención.

### 6.3 Estructura A/B base — templates rellenables

Dos variantes corriendo en simultáneo desde el lanzamiento. Ganador con mínimo 200 conversiones por variante o 4 semanas. Ambas usan un **form propio conversacional multi-paso** (no el de GHL — ver §8.4).

#### **Variante A — Promesa emocional + Ubicación / Lifestyle**
> Hipótesis: decide por **estilo de vida + zona** antes que por número.
```
[01] HERO            render aspiracional · H1 emocional · sub (ubicación+tipología+ticket)
                     CTA primario "Agenda tu visita" · CTA sec "Recibir brochure"
[02] UBICACIÓN       mapa + 5 puntos clave · 3 stats de zona
[03] AMENIDADES      grid de renders + frase aspiracional por amenidad
[04] TIPOLOGÍAS      cards: render + planta + m² + recámaras + "desde" + CTA
[05] DESARROLLADOR   track record PLP + 2–3 testimoniales
[06] FORM (propio)      nombre, WhatsApp, email + timing + esquema + intención + privacidad
[07] FOOTER          legal PLP + aviso + sello de marca
```

#### **Variante B — Inversión + ROI (argumento financiero)**
> Hipótesis: decide por **números, plusvalía y comparativo**.
```
[01] HERO            render + dato ("+18% plusvalía") · H1 racional · sub (ticket+ROI+horizonte)
                     CTA primario "Calcular mi inversión" · CTA sec "Hablar con asesor"
[02] CASO INVERSIÓN  3 stats + comparativo vs. CETES / otro desarrollo
[03] CALCULADORA     inputs (unidad+esquema) → enganche+mensualidad+valor a 5 años
[04] TIPOLOGÍAS      cards: planta + m² + precio + renta esperada + ROI
[05] CONFIANZA PLP   track record cuantitativo + esquemas de crédito
[06] FORM (propio)      campos de A + "monto a invertir" (rango) + privacidad
[07] FOOTER          igual que A
```

### 6.4 Bloques mínimos (no negociables)

- CTA primario above-the-fold · repetida ≥3 veces.
- **Form propio (conversacional) sticky o repetido** ≥2 veces.
- Pixel Meta + conversión de Google Ads antes de publicar en Vercel.
- Aviso de privacidad en footer.
- **Mobile-first** (>70% del tráfico).
- Core Web Vitals en verde · LCP < 2.5s · primer pliegue < 1MB (WebP/AVIF).

### 6.5 Criterios de copy y UX

- Headline en lenguaje del comprador, no del desarrollador.
- Sin claims insostenibles.
- CTA en verbo activo, no "Más información".
- Form de 4–6 campos máximo; cualificadores antes que contacto.

### 6.6 Lo que NO va

- ❌ Marca corporativa antes del producto · ❌ servicios de Sentido · ❌ footer de "navegación" · ❌ CTAs compitiendo · ❌ carrousel en el hero · ❌ **form de GHL embebido por iframe** (rompe marca y tracking — ver §8.4).

---

## 7 · Calendario de contenido de redes (Pilar 1)

Parte de la gestión de redes. El proyecto también **produce el calendario mensual** del desarrollo, derivado del contexto — y marca qué piezas son candidatas a pauta.

### 7.1 De dónde sale

`analisis-redes.md` (qué funcionó) + `insights-oportunidades.md` (ángulos) + `brief-desarrollo.md` (producto). Se mejora la cadencia y los temas vs. lo ya trabajado.

### 7.2 Volumen mensual (según el pilar vendido)

- **15 publicaciones** (Facebook + Instagram), incluyendo carruseles y estáticas.
- **6 Reels** con guion (lifestyle, avances de obra, diferenciadores).
- **Adaptación a Historias** de todo el contenido.

### 7.3 Pilares de contenido (ajustar por desarrollo)

Lifestyle / aspiracional · Avances de obra · Diferenciadores · Plusvalía e inversión · Testimoniales / social proof · Ubicación y zona.

### 7.4 Formato del calendario (`/contenido-oficial/calendario-redes/`)

```
fecha · formato (post/carrusel/reel/historia) · pilar · copy · asset · guion (si reel)
       · ¿se pauta? (no / Meta captación / remarketing) · objetivo
```

> Las piezas marcadas **"Meta captación"** se usan como creativos del Pilar 1; las marcadas **"remarketing"** alimentan el Pilar 4. Los Lead Forms de esas campañas son nativos de Meta (no van a Zoho).

---

## 8 · Captura de leads: form propio + relay serverless

> **Ajuste vs. la teoría (aprendido en la 1ª implementación):** el framework asumía "form de GHL embebido + workflows de GHL". En la práctica no era viable ni óptimo (ver §8.4). El punto de captura es un **form propio en la LP** + un **relay serverless** que reparte el lead a varios destinos **en paralelo**. GHL deja de ser el front de captura y pasa a ser **un destino más**. GHL sigue **sin operar la venta** — eso vive en **Zoho**.

### 8.1 Patrón de captura blindada (relay + red de seguridad)

Objetivo: **no perder ningún lead** y capturar **toda la data + tracking**, sin depender de un webhook frágil del navegador.

1. **Front resiliente** (`form.js`): al enviar reintenta; si falla, **encola en `localStorage`** y reintenta al recargar. Genera un **`event_id` único por envío** (compartido con Pixel y CAPI).
2. **Relay** (`api/lead.js`, función serverless en Vercel): recibe el lead **ya enriquecido** y lo deposita **en paralelo** en:
   - **GHL** — upsert de contacto + custom fields (idempotente por email/teléfono, 3 reintentos).
   - **Google Sheet** — respaldo durable (Apps Script Web App), una fila por lead con TODO el tracking.
   - **Meta CAPI** — evento `Lead` server-side (PII hasheada, dedup por `event_id`).
3. **Garantía:** para perder un lead tendrían que caerse a la vez Vercel + Google + GHL — y aun así queda en el navegador. La hoja es la "caja transparente" auditable.

**Datos que viajan:** respuestas de pre-calificación (`objetivo`/`timing`/`producto_interes`/`esquema`) + contacto (nombre/whatsapp/email) + tracking completo (`utm_*`, `fbclid`, `gclid`, `fbp`, `fbc`, variante A/B, referrer, landing_url, user_agent, timestamp, `event_id`).

> El **enriquecimiento** (UTMs, variante, fbp/fbc/gclid) y el **disparo de conversión** ocurren en la **LP + el relay**, no en un workflow de GHL. GHL recibe el contacto ya enriquecido.

### 8.2 GHL como destino (no como front de captura)

- **Una sub-cuenta / location por desarrollo.** Sin workspaces de asesores, calendarios ni brokers. Acceso solo Sentido; PLP opera en **Zoho**.
- **Hub de activos:** vincular redes, Meta Ads, Google Ads y los Lead Forms nativos de Meta.
- **Acceso programático:** el GHL del desarrollo **puede no estar como MCP** → plan B = **PIT token vía REST** (`services.leadconnectorhq.com`, header `Version: 2021-07-28`).
- **Qué permite la API de GHL:** crear **custom fields**, **upsert de contactos** (idempotente → reintentar no duplica), oportunidades, pipelines. **No** crea surveys/forms (por eso el form es propio — §8.4).
- **Custom fields a crear por API** (`POST /locations/{{ghl_location_id}}/customFields`, tipo `SINGLE_OPTIONS`/`TEXT`):
  - **Pre-calificación:** `objetivo` · `timing` · `producto_interes` · `esquema` · `variante` (A/B).
  - **Tracking:** `utm_source` · `utm_campaign` · `fbclid` · `landing_url` (+ `gclid` ya es estándar de GHL).
  - Si un campo difiere entre A y B (p. ej. `objetivo`), se maneja como campo compartido (unión de valores) y `variante` desambigua.

### 8.3 Google Sheet de respaldo (Apps Script)

- Hoja con todas las columnas del lead + tracking, y un **Apps Script Web App** (`doPost` → `appendRow`) desplegado como App web "Cualquiera". La URL `/exec` va en `SHEET_WEBHOOK_URL`.
- Es el respaldo **durable y auditable** del relay. **Recomendado para todos los desarrollos.**

### 8.4 Por qué NO el form/survey nativo de GHL (decisión validada)

- GHL **no crea surveys/forms por API** (armado 100% manual en el builder).
- El único embed es por **iframe (cross-origin)** → el CSS de marca de la LP no entra → se ve la caja default de GHL.
- Para verlo on-brand habría que montarlo en un **funnel de GHL aparte** (otro dominio), fuera de la LP.
- Los object-fields renderizan **dropdown**, no tarjetas-tap (peor conversión).

→ Se mantiene **form propio en la LP** + relay por API.

### 8.5 Pipeline en GHL y entrega a Zoho

- Pipeline mínimo **opcional** para organización (`Lead capturado → Enriquecido → Enviado a Zoho → Archivado`). **La conversión ya no se dispara aquí** — se dispara en la LP/relay (§9).
- **Zoho** se agrega como **4º destino del relay** (mismo patrón que GHL/Sheet/CAPI) o vía workflow **GHL→Zapier→Zoho**. **Solo los leads de LP van a Zoho** (detalle en §10).
- **Forms nativos de Meta:** vinculados en GHL para visibilidad y remarketing, **no pasan por el relay ni van a Zoho**.

### 8.6 Gotchas técnicos (para no tropezar de nuevo)

- **Vercel:** Root Directory = `landing/`; **Deployment Protection** puede venir ON (devuelve 401) → desactivar; env vars nuevas **requieren redeploy** (un commit vacío sirve).
- **GHL API:** no crea surveys; sí crea custom fields y hace upsert idempotente; PIT token con header `Version`.
- **Apps Script Web App:** `getActiveSpreadsheet()` funciona solo si el script está **ligado** a la hoja (Extensiones→Apps Script desde la hoja); deploy "Ejecutar como: Yo · Acceso: Cualquiera"; `curl -L` degrada el POST en el redirect 302 → validar mirando la fila, no el HTTP.
- **Fotos HEIC/volteadas:** convertir con PIL `ImageOps.exif_transpose` y guardar **sin EXIF** (`sips -r` no basta; el browser doble-rota si queda el tag).
- **Screenshots headless ≠ viewport real:** medir overflow con `scrollWidth` vs `clientWidth`, no a ojo.
- **Responsive móvil:** el sticky-CTA puede encimar el hero (svh vs vh) → `padding-bottom` extra en el hero móvil + `overflow-x:hidden` de seguridad.
- **Chrome MCP:** se cuelga con Meta Ads Manager → esa parte se opera a mano / guiando al usuario.

---

## 9 · Estrategia de tracking (en la LP + el relay, no en GHL)

El tracking **no vive en GHL** — vive en la **LP (browser) + el relay (server)**, que es más exacto y controlable. La conversión se mide sobre el **lead de LP capturado** (form submit), no sobre Zoho.

| Capa | Qué dispara | Dónde |
|---|---|---|
| Browser (`tracking.js`) | Meta Pixel `PageView` + `Lead` (con `eventID`) · Google Ads `gtag` conversión | LP |
| Server (relay) | Meta CAPI `Lead` (PII hasheada SHA-256 + ip/ua/fbp/fbc) | `api/lead.js` |

**Google Ads:**
- Crear una conversión **tipo Sitio web** y dispararla con `gtag('event','conversion', {send_to:'{{google_ads_id}}/<label>'})` al completar el form.
- **Gotcha:** la conversión "Alojada en Google" de los **lead forms nativos no sirve para web** (no tiene label de gtag). No usarla para el LP.

**Meta (Pixel + CAPI + dedup):**
- Browser: `fbq` `PageView` + `Lead` con `eventID`.
- Server: desde el relay, `Lead` a `graph.facebook.com/v21.0/{{pixel_meta}}/events` con `user_data` hasheado, **mismo `event_id`** → **deduplica**.
- **Automatic Advanced Matching** ON en Events Manager.
- **Validar dedup** en Events Manager → Probar eventos (Navegador + Servidor = "Deduplicado"); truco: passthrough de `?test_event_code=` para que el CAPI también aparezca.

**Por qué importa:** el browser-only pierde 20–40% (bloqueadores, iOS) → CPL inestable. Pixel + CAPI + dedup ≈ se mide casi el 100% sin doble conteo → **CPL real y comparable**.

**UTM consistentes:**
```
utm_source=meta|google|tiktok|direct · utm_medium=paid|organic|crm
utm_campaign=[desarrollo]-[mes] · utm_content=[variante]-[creativo] · utm_term=[kw/audiencia]
```

---

## 10 · Entrega de leads a Zoho (CRM de PLP)

> **Zoho opera la venta.** Recibe los leads de **Landing Page** como **un destino más del relay** (mismo patrón que GHL/Sheet/CAPI) o vía **GHL→Zapier→Zoho**. **Solo los leads de LP van a Zoho** (los Lead Forms nativos de Meta no — PLP ya los tiene).

```
[LP · Vercel] ─POST /api/lead─► [relay] ──► GHL · Google Sheet · Meta CAPI
                                       └──► Zoho (4º destino · cuando aplique)
                                            — sin retorno a GHL/relay —
```

**Payload estándar (al destino Zoho):**
```json
{
  "lead_id": "GHL-XXXXX",
  "desarrollo": "[nombre-desarrollo]",
  "fuente": { "utm_source":"meta","utm_medium":"paid","utm_campaign":"[desarrollo]-junio",
              "utm_content":"variante-A-creativo-03","fbp":"...","fbc":"...","gclid":"..." },
  "datos_contacto": { "nombre":"...","whatsapp":"...","email":"..." },
  "form_data": { "tipologia_interes":"2 rec","timing":"0-3m","intencion":"invertir",
                 "esquema":"credito","presupuesto_max":4500000,"lead_score":0 },
  "metadata": { "fecha_captacion":"ISO-8601","url_captacion":"https://...vercel.app","variante_lp":"A" }
}
```

**Acuerdos con PLP:** el destino responde 2xx (sin ack, el relay reintenta) · operación post-entrega es de PLP · sin retorno de eventos · el puente alterno es **Zapier**.

> Estado: la entrega a Zoho queda **pendiente por decisión del cliente**; el patrón ya está definido para activarla sin rediseñar (agregar Zoho como 4º destino del relay).

### 10.1 Runbook de prueba y activación (Zoho vía webhook Make compartido de PLP)

> **Caso real PLP (confirmado 2026-07, Amancay E2E).** PLP ya tiene **un webhook en Make** que empuja a Zoho con un **esquema fijo** (lo alimentan también forms de WordPress de otras propiedades). Es el **mismo webhook para los 4 desarrollos** PLP. Por eso aquí **NO** aplica "el cliente mapea nuestros nombres": **nosotros nos adaptamos a SUS llaves exactas**. Detalle completo en el playbook `contexto/playbook-salida-crm.md` (de otro desarrollo PLP).

La integración es **aditiva y apagada por defecto**: `toZoho()` en `landing/api/lead.js` se auto-gatea con `ZOHO_WEBHOOK_URL`; si la variable no existe, retorna `skip` y no toca GHL/Sheet/CAPI.

**Lo único que cambia por desarrollo (Essentia):**
- `interes` = `"ESSENTIA COUNTRY"` (debe coincidir con la opción del picklist *Desarrollo de interés* en Zoho — confirmar en la 1ª prueba).
- `pagina` = `"Essentia Country"` (nombre de la página de Facebook).
- `formulario` = `"LP Essentia " + variante` (versionable A/B).
- `ZOHO_WEBHOOK_URL` = **el mismo** webhook Make compartido, en env var de Vercel.
- Fijos (iguales a todos los PLP): `medio` "Online" · `medioContacto` "Formulario" · `submedio` "Landing Page" · `agenciaMarketing` "Sentido" · `ruletaFuerzaVentas` "Ambos" · `companiapropietaria` "Península" · `tipoLead` "Compra UP" · `platform` (canal automático desde `utm_source`) · `creationDate` (hora MX -06:00).

**Prueba 1 — validar el mapeo (NO depende de nuestro deploy).**
- `./test-crm-webhook.sh '<URL_WEBHOOK_MAKE>'` (raíz del repo). Manda las **mismas llaves** que `toZoho()`.
- Crea un lead real en el Zoho compartido, marcado **"PRUEBA CRM ESSENTIA - borrar"** → PLP confirma qué valor cayó en cada campo y lo elimina. Si algo no cae bien, se ajusta y **se re-corre** (loop de segundos).
- **Cuidado (gotcha de Make):** manda payloads **limpios** (una llave por campo). NO mandes variantes de escritura de la misma llave — confunde a Make. Si un campo llega vacío pese a la llave correcta, el escenario de Make puede necesitar *"Redetermine data structure"* con un lead que traiga todos los campos.

**Prueba 2 — E2E real (nuestro deploy).**
- Cargar `ZOHO_WEBHOOK_URL` en **Vercel (Production)** → **redeploy**.
- Submit real desde la LP en vivo → el lead cae en Zoho **junto con** GHL/Sheet/CAPI (el relay responde `{ ok, destinos: [... ['zoho','ok']] }`).
- **Mismos campos en ambas pruebas** → el mapeo validado en la Prueba 1 aplica idéntico a leads reales.
- **`ad_id`/`adSetId` llegan vacíos** hasta configurar parámetros de URL a nivel plataforma (setup aparte del CRM): Meta `ad_id={{ad.id}}&adset_id={{adset.id}}&campaign_id={{campaign.id}}&utm_content={{ad.name}}` · Google `ad_id={creative}&campaign_id={campaignid}&adgroup_id={adgroupid}`.

**Esquema fijo que recibe el webhook** (llaves confirmadas = `toZoho()` = `test-crm-webhook.sh`):

| Llave webhook | Valor | Campo en Zoho |
|---|---|---|
| `name` | nombre COMPLETO | **Apellidos** (Last Name, requerido) |
| `email` · `mobile` | email · WhatsApp `+52` | Email · Teléfono |
| `interes` | "ESSENTIA COUNTRY" | Desarrollo de interés |
| `medio` · `medioContacto` · `submedio` | "Online" · "Formulario" · "Landing Page" | Medio · Medio de contacto · Submedio |
| `formulario` | "LP Essentia A/B" | Formulario |
| `agenciaMarketing` · `ruletaFuerzaVentas` | "Sentido" · "Ambos" | Agencia MKT · Ruleta |
| `companiapropietaria` · `tipoLead` | "Península" · "Compra UP" | Compañía propietaria · Tipo de lead |
| `platform` · `pagina` | canal (de `utm_source`) · "Essentia Country" | Plataforma · Página de origen |
| `creationDate` | `AAAA-MM-DDTHH:mm:ss-06:00` | Fecha de creación |
| `detalleinteres` | respuestas del form por " / " (`objetivo` / `producto_interes` / `timing` / `presupuesto`) | Detalle de interés |
| `campania` · `anuncio` · `conjuntoAnuncios` · `adSetId` | UTMs / ids del anuncio | Campaña · Anuncio · Conjunto · (id) |

---

## 11 · Remarketing Estratégico (Pilar 4)

> **Alcance:** refuerzo de **marca / Top of Mind** para personas que **interactuaron con o enviaron los Lead Forms nativos de Meta** del desarrollo (y, secundariamente, visitantes de LP). **No** es remarketing de venta directa.

**Audiencia (prioridad):** 1) enviaron el Lead Form nativo de Meta · 2) interactuaron sin completar · 3) visitantes de LP (pixel) · 4) leads en seguimiento.

**Contenido (refuerzo, no venta):** testimoniales/social proof · avances de obra · renders lifestyle · diferenciales vs. competencia · plusvalía y escasez.

**Técnica:** audiencias desde Meta (forms nativos) + pixel del LP · segmentación exclusiva a leads ya generados · frecuencia controlada · creativos estratégicos · monitoreo y reporte mensual (Meta MCP).

---

## 12 · Medición, reporting y continuidad mes a mes

Cada proyecto construye **reportes propios** vía MCP, sin depender de un dashboard externo.

### 12.1 Qué se mide y con qué fuente

| KPI | Fuente / MCP | Pilar |
|---|---|---|
| CPL (costo por lead) | Meta MCP · Google Ads | 1 y 2 |
| Tasa de conversión de landing | Vercel + Sheet/relay | 3 |
| CTR y frecuencia de remarketing | Meta MCP | 4 |
| Volumen y scoring de leads | GHL + Google Sheet | 3 |
| A/B: variante A vs. B | GHL + Vercel | 3 |
| Citas agendadas / cierre | Zoho (datos de PLP) | cliente |
| Salud del LP (CWV, deploy) | Vercel + Chrome MCP | 3 |

### 12.2 Reportes por desarrollo (`/reportes/`)

- **Reporte mensual:** CPL por canal, conversion del LP, leads enviados a Zoho, comparativo A/B, CTR/frecuencia de remarketing, rendimiento del calendario de redes.
- **Funnel:** impresión → clic → visita LP → lead (GHL) → enviado a Zoho.
- **QA de tracking:** Chrome MCP valida que pixel/CAPI disparan en vivo.

### 12.3 Continuidad mes a mes

El ciclo mensual reusa el contexto y lo mantiene vivo:

```
1. Leer reportes del mes (Meta/Google/GHL/Vercel)  →  actualizar /contexto/analisis-*.md
2. Optimizar pauta y LP según lo aprendido (A/B, creativos, keywords)
3. Generar el nuevo calendario de redes del mes (sección 7)
4. Refrescar creativos de remarketing
5. Documentar aprendizajes transferibles a otros desarrollos de PLP
```

Así el proyecto sirve para **arrancar, implementar y dar continuidad** — no solo para el setup inicial.

---

## 13 · Plan de A/B y optimización

**Orden de impacto:** 1) headline del hero · 2) imagen del hero · 3) CTA primario · 4) orden de secciones · 5) campos del form · 6) color/contraste del CTA · 7) densidad de copy.

**Ganador:** ≥200 conversiones por variante O 4 semanas (lo que llegue primero) · significancia ≥95% · si no hay ganador claro → variante C con hipótesis nueva.

**Documentación:** cada test cerrado en `/reportes/aprendizajes-ab.md` (hipótesis · ganadora · lift en CR/CPL/calidad · conclusión transferible).

---

## 14 · Checklist por desarrollo

### Fase 0 — Arranque (contexto)
- [ ] Insumos cargados en `/insumos/` + inventario hecho
- [ ] `brief-desarrollo.md` generado y verificado
- [ ] `scraping-web.md` generado (competencia + zona + KW)
- [ ] `analisis-campanas.md` (Meta/Google/web) generado
- [ ] `analisis-redes.md` (orgánico + calendarios previos) generado
- [ ] `insights-oportunidades.md` generado
- [ ] **Reglas duras de comunicación** pactadas y documentadas (§4.5)
- [ ] `/contexto/` validado con Jos/PLP

### Fase 1 — Producción
- [ ] Copy oficial de LP en `/contenido-oficial/copy-lp/`
- [ ] Diseño con skill `ui-ux-pro-max` + principios de conversión 2026 (§6.2)
- [ ] Variante A (lifestyle/Meta) y B (inversión/Google) con **form propio conversacional**
- [ ] Calendario de redes del mes generado (15 posts + 6 Reels con guion)

### Fase 2 — Implementación
- [ ] Repo en GitHub + deploy en Vercel (Root `landing/`, Deployment Protection OFF) · CWV en verde (mobile+desktop)
- [ ] GHL: location + **custom fields por API** (pre-calificación + tracking) con PIT token
- [ ] **Relay `api/lead.js`** + **Google Sheet + Apps Script** + anti-pérdida (retries/localStorage)
- [ ] Tracking: Google Ads conversión **Sitio web** (no lead-form) + Meta Pixel + **CAPI dedup `event_id`** + Advanced Matching · validado en Test Events
- [ ] Env vars en Vercel (`GHL_PIT_TOKEN`, `GHL_LOCATION_ID`, `SHEET_WEBHOOK_URL`, `META_CAPI_TOKEN`) + redeploy
- [ ] Captura verificada E2E (`meta/sheet/ghl: ok`)
- [ ] **Aviso de privacidad** publicado (requerido antes de pauta con datos personales)
- [ ] (Cuando aplique) Zoho como 4º destino del relay
- [ ] Audiencias de remarketing creadas (forms Meta + pixel LP)

### Fase 3 — Continuidad
- [ ] `/reportes/` inicializado + reporte base armado vía MCP
- [ ] UTMs configurados en todas las campañas
- [ ] Ciclo mensual (12.3) calendarizado

---

## 15 · Notas finales

- **Este documento es vivo.** Cada aprendizaje transferible se actualiza acá (no solo en el proyecto del desarrollo).
- **El contexto es la base de todo.** Sin Fase 0 validada, no se produce nada.
- **La propuesta comercial completa** vive en `propuesta_paquete_integral_PLP.pdf` — este MD es su traducción operativa.
- **Frontera del sistema:** Sentido analiza, construye, publica, **captura (form propio + relay)**, **trackea (LP + relay)** y **entrega (relay → GHL/Sheet/CAPI; Zoho como destino pendiente)**. PLP opera la venta en Zoho. La conversión se mide sobre el **lead de LP capturado**, no sobre su comportamiento en Zoho.
- **Esta versión (v4) incorpora los aprendizajes de la 1ª implementación real:** captura blindada con relay serverless + Google Sheet, descarte del form/survey nativo de GHL, tracking en LP+relay con dedup por `event_id`, metodología de diseño con `ui-ux-pro-max` + copy de conversión 2026, y el paso de pactar reglas duras de comunicación en Fase 0.

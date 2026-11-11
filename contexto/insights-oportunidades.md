# insights-oportunidades.md — Essentia Country
> Síntesis accionable: lectura cruzada de datos + oportunidades de mejora.
> Basado en: 5 meses de reportes (Ene–May 2026), calendarios y Social Listening.
> Extracción: 22 jun 2026.
> **Este documento alimenta la Fase 1 — no actuar sin validación de PLP.**

---

## 1 · Problema #1 — Tracking completamente roto

**Impacto: CRÍTICO. Bloquea toda optimización.**

$8,774 USD gastados en Google Ads en 5 meses → **0 conversiones registradas**.

Esto no significa que no haya leads — el Google Sheet de leads (`1p6XuQVaLetdyxV6g9vbzQPWv0RmejsA8zr6TF2hLlvQ`) existe y probablemente tiene registros. Significa que el sistema de tracking nunca estuvo correctamente conectado entre:
- Google Ads → LP → Google Ads conversion tag

**Consecuencias actuales:**
- Google Ads no puede optimizar con datos reales de conversión
- No sabemos el CPL real de Google Ads
- No hay atribución confiable de qué keyword genera leads de calidad
- No hay comparativo posible entre variantes de LP (no hay A/B documentado)

**Acción inmediata (Fase 2):**
- Configurar conversión de tipo "Sitio web" en Google Ads (no Lead Form)
- Instalar gtag de conversión en la LP (al submit del form)
- Configurar Meta Pixel + CAPI + dedup por `event_id`
- Validar en Google Ads → Conversiones que el tag dispara
- Acceder al Google Sheet y auditar los leads históricos para calcular CPL real

---

## 2 · Problema #2 — Riesgo reputacional activo

**Impacto: ALTO. Puede limitar lo que se puede comunicar en copy/LP.**

Los reportes de Social Listening documentan comentarios que apuntan a un patrón:

| Mes | Comentario | Tipo |
|---|---|---|
| Mar-2026 | "Soy comprador desde 2024. No hay información clara de entrega ni comunicación formal." | Comprador insatisfecho |
| Mar-2026 | "Llevan sin poder terminar esa torre como 3 años" | Crítica de avance de obra |
| Abr-2026 | "Entregarán antes del 2035 como Heredit?" | Comparación con proyecto fallido |
| May-2026 | "Y aquí entregan en 20357" | Sarcasmo sobre retrasos |
| May-2026 | "Muy grotesco para zona country" | Crítica de diseño |

**Esto implica:**
1. Hay compradores reales (desde 2024) que no están recibiendo comunicación de avance
2. La reputación de entrega del proyecto está siendo cuestionada públicamente
3. El comentario sobre "3 años sin terminar la torre" — si es sobre Essentia — es una señal de alerta muy seria
4. El término de comparación ("Heredit") sugiere que existe un patrón conocido en el mercado local de proyectos que no entregan

**Acción antes de producir copy:**
- Reunión con PLP para entender el estado real del proyecto: % de avance de obra, fecha estimada de entrega, qué se puede comunicar públicamente
- Definir si hay compradores tempranos y qué les está comunicando PLP
- Definir la política de comunicación de avance de obra (¿se publica? ¿con qué frecuencia?)
- Resolver la "regla dura de comunicación" sobre fechas y avance (§4.5 del framework)

> **Si la entrega está en riesgo real, el sistema de marketing debe saberlo** — no para ocultarlo, sino para no prometer lo que no se puede cumplir, y para diseñar el copy de forma que no se use en contra.

---

## 3 · Actualización — Meta Ads SÍ funciona (datos del reporte detallado)

**Impacto: POSITIVO — pero con riesgo de saturación.**

El reporte detallado de Ads (Jan–Jun 2026) confirma que Meta Ads está activo y generando leads:
- **214 leads** a **MX$679 CPL** — razonable para real estate premium
- **Instagram: 76%** de los leads (163) vs Facebook 24% (51)
- **Gasto: MX$145K** vs Google MX$10.8K — Meta es ~93% de la inversión en pauta
- **Problema activo:** una sola creatividad en 5+ meses → fatiga de audiencia (CPL sube a MX$2,133 en períodos de saturación)
- **Presupuesto Google:** solo MX$100/día — insuficiente para optimización algorítmica

**Acciones:**
- Renovar creativos de Meta (mínimo 3 variantes activas)
- Subir presupuesto Google a mínimo MX$333/día ($10K/mes)
- Configurar tracking de conversiones en LP (sin esto Google no puede optimizar)

---

## 4 · Oportunidades identificadas

### 4.1 Keywords de alta intención sin escalar

`Essentia Country departamentos` tiene CTR de 13–25% (vs. 4–7% promedio de la cuenta). Es la keyword con mejor señal de intención y está en presupuesto muy limitado. Escalar esta keyword con un anuncio y LP de aterrizaje específico puede mejorar el CPL significativamente.

**Hipótesis medible:** "Si escalamos presupuesto en keywords de marca 2x, mantenemos o mejoramos el CTR y reducimos el CPC promedio de la cuenta."

### 4.2 Reels como formato dominante

Los Reels son consistentemente el formato con mayor alcance e interacción en IG (131 alcance promedio en enero vs. 88 de posts). El contenido de tipo testimonial/walkthrough ("Llegué sin expectativas…") genera el engagement más auténtico.

**Hipótesis medible:** "Un Reel de recorrido real del proyecto (30-60 seg, sin edición pesada) tendrá más de 200 reproducciones y 3% de engagement en IG."

### 4.3 Pilares ausentes que más importan en preventa

Los dos contenidos más poderosos en preventa de inmuebles son los que menos aparecen:
1. **Avances de obra** — **TENEMOS FOTOS REALES** (29 fotos drone + 9 fotos gym, mar 2025) que jamás se han usado en orgánico. La torre ya tiene ~20+ pisos con estructura completa visible desde el drone. Gym terminado y equipado con Technogym.
2. **Testimoniales reales** — solo 1 contenido testimonial real en 5 meses

> **Cambio de diagnóstico:** No es que no exista el contenido de avance de obra — existe y es poderoso. El problema es que **no se está usando**. Las fotos drone del 24 mar 2025 nunca se publicaron en redes (o se publicaron muy poco). El nuevo calendario debe explotarlas.

**Hipótesis medible:** "Posts de avance de obra con foto drone real → engagement 2x vs. renders generados con IA, y reducción de comentarios negativos en el siguiente periodo."

### 4.6 Diferenciador visual único disponible: el gym y las vistas

Tenemos 9 fotos profesionales del gym con equipo Technogym en un piso alto con vista panorámica a Guadalajara. Esto demuestra:
1. El edificio ya existe y el gym está terminado y equipado
2. Las vistas son reales (no renders)
3. El gym está a una altura significativa sobre Country Club

Este contenido, combinado con las fotos drone del exterior, destruye el argumento de "llevan 3 años sin terminar" — visualmente el avance es evidente.

**Hipótesis medible:** "Reel del gym + vistas panorámicas → 2x alcance vs. promedio, alta tasa de guardados y solicitudes de info."

### 4.4 Landing Page sin optimización documentada

No hay evidencia de que `essentiacountry.mx` haya tenido A/B testing, ni de que el form esté optimizado. La LP actual (si existe) recibe tráfico de Google Ads ($8,774 invertidos) sin conversión medible.

**Hipótesis medible:** "Una LP nueva con form conversacional multi-paso alcanzará 3–5% de conversion rate (visita → lead) desde el lanzamiento."

### 4.5 Zona Country Club — posicionamiento no explotado en pauta

El copy actual comunica Country Club correctamente en redes. En Google Ads, la keyword `departamentos en country club guadalajara` tiene muy poco volumen y poco presupuesto asignado. Esta keyword es de altísima especificidad y calidad — los buscadores de esa keyword ya quieren estar en Country Club, no en otra zona.

**Hipótesis medible:** "Una campaña dedicada a keywords de zona (Country Club + Guadalajara) con LP específica reduce el CPC y mejora el lead quality score."

---

## 5 · Ángulos para el LP (variantes A/B)

Basado en el análisis cruzado de copy orgánico + performance + competencia:

### Variante A — Lifestyle (tráfico Meta)
- Headline: "Vive en la zona más codiciada de Guadalajara"
- Ángulo: Country Club como identidad, no solo como ubicación
- Promesa: calidad de vida + espacios que se disfrutan desde el día 1
- Sub: "Departamentos de 1 a 3 recámaras en preventa · desde $6.4 MDP"
- CTA: "Agenda tu visita" / "Ver el proyecto"
- Manejo de objeción: avance de obra visible + desarrollador con nombre real

### Variante B — Inversión (tráfico Google Search)
- Headline: "Invierte en Country Club: la zona de mayor demanda en Guadalajara"
- Ángulo: plusvalía histórica + ROI futuro + entrada en preventa
- Promesa: decisión financiera inteligente + respaldo del desarrollador
- Sub: "Preventa desde $6.4 MDP · Departamentos de 1 a 3 recámaras"
- CTA: "Calcular mi inversión" / "Hablar con asesor"
- Manejo de objeción: track record de PLP + avance de obra documentado

---

## 6 · Ángulos para el calendario de redes (Julio en adelante)

| Pilar nuevo | Justificación | Formato sugerido |
|---|---|---|
| **Avance de obra mensual** | Contra-programa comentarios negativos; genera credibilidad | Reel de obra / foto con texto |
| **Testimonial real de visitante** | "Llegué sin expectativas..." fue el más auténtico | Reel interview / carrusel de experiencia |
| **Amenidad del mes** | Profundizar en cada amenidad (una por mes) | Carrusel render + descripción |
| **Plusvalía con dato real** | Fundamentar el claim con número verificable | Carrusel infográfico |
| **Comparativo alquiler vs. compra** | Ángulo de decisión para indeciso | Post estático / carrusel |

---

## 7 · Hipótesis de mejora medibles (resumen)

| # | Hipótesis | Cómo se mide |
|---|---|---|
| 1 | Tracking correcto → CPL real de Google < $3,000 MXN | Google Ads → conversiones post-implementación |
| 2 | LP con form conversacional → CR 3–5% desde lanzamiento | Vercel + Google Sheet relay |
| 3 | Escalar keywords de marca 2x → CTR mantiene >12% | Google Ads → KW report |
| 4 | Reel de walkthrough → >200 reproducciones, >3% engagement | Meta Business Suite |
| 5 | Post de avance de obra → reducción comentarios negativos | Social Listening mensual |
| 6 | Carrusel de amenidades → guardados >5 | IG insights |

---

## 8 · Lo que se necesita de PLP antes de Fase 1

> Lista de bloqueo — sin estos datos no se produce copy ni LP:

1. **Fecha estimada de entrega y % de avance de obra actual** — crítico
2. **Tipologías completas: m², precio por modelo, condiciones de pago**
3. **Política de comunicación de entrega** — qué se puede decir y qué no
4. **Track record de PLP** — proyectos entregados, unidades totales
5. **Amenidades oficiales con renders y nombres**
6. **Acceso a Meta Business Suite** (o reporte de campañas)
7. **Acceso al Google Sheet de leads** (para auditar volumen histórico)
8. **Aviso de privacidad** (requerido para pauta)
9. **Aclaración del estado de compradores de 2024** — qué está pasando y cómo se comunicará

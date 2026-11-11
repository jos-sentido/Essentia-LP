# Estrategia Essentia — sprint de perfilamiento · 15–31 oct 2026

> **Documento INTERNO de Sentido.** Contiene táctica de optimización (formulario,
> reglas de valor, evento de optimización, segmentación) = know-how de agencia.
> **No se publica en /reportesads, no se comparte tal cual con el cliente.** De aquí
> sale el *compromiso al cliente* (§6), que es la versión presentable.
>
> Fuente de datos: cuentas Meta (MCP) + CRM Zoho (leído 14 oct 2026) + brief oficial.
> Cortes base: `/reportesads/corte-meta-2026-10-14-7d` y `-14d`.

---

## 0 · Por qué este documento (contexto)

Reunión con el cliente: **los resultados van mal y hay riesgo de perder la cuenta.**
El problema que el cliente ve es simple: *gastamos y no hay clientes perfilados.*
Este plan ataca eso en 2.5 semanas, con cambios **medibles** y una **línea base**
contra la cual comparar en el corte de mediados de noviembre. No promete lo que no
se puede cumplir en el horizonte; sí deja montada la maquinaria para que el
perfilamiento suba y, por primera vez, se pueda **medir Google**.

---

## 1 · Diagnóstico con evidencia — dónde se rompe la cadena

La cadena del lead perfilado es: **mensaje → clic → formulario/LP → lead → contacto
efectivo → perfilado → cita → trato.** Medimos cada eslabón y encontramos **tres
fugas** (dos nuestras, una del cliente) y un **punto ciego**.

### Línea base (la foto de hoy)

**Histórico por canal (jun–13 oct, CRM Zoho, solo pauta Sentido · Online):**

| Canal / producto | Leads | Contactación | Perfilado | Citas concretadas | CPL |
|---|---|---|---|---|---|
| **Meta — formulario** (redes) | 101 | **51.5 %** | **5.9 %** (6) | **2** | ~$766–1,062 |
| **Meta — Landing Page** (web) | nuevo (desde 25 sep) | — | 0 aún (muy reciente) | 0 | ~$754 |
| **Google — sitio oficial** | 84 | **76.2 %** | **4.8 %** (4) | 0 | sin medir (0 conv) |

**Corte 14 días (30 sep–13 oct):** inversión Meta $11,886 · 15 leads · CPL $792.
CRM: 27 prospectos, **Meta perfiló 0 de 13**, el único perfilado (1) fue de Google.
Contactación del periodo se desplomó a **37 %** (pico de volumen de la reactivación).
**74 % de los leads siguen abiertos** (juicio de calidad aún prematuro).

### Los hallazgos

**H1 · La calidad es baja de forma sistémica, no por azar.** Ambos canales de pauta
perfilan **~5 %**, por debajo del **9.2 %** que promedia el desarrollo con todas sus
fuentes (incluye referidos/orgánico/walk-in). **El lead pagado rinde peor en calidad
que el promedio del proyecto.** Eso apunta a la fuente: a quién atraemos y cómo lo
calificamos, no a la operación de ventas.

**H2 · El cuello de botella inmediato es la contactación — y es mixta.** El form
contacta al 51 %, Google al 76 %, y este periodo cayó a 37 % por el pico de volumen.
Parte es del cliente (velocidad y capacidad de primer contacto), parte es nuestra
(teléfonos malos del form, volumen de golpe sin escalonar). **No se puede perfilar a
quien no se contesta.**

**H3 · El mensaje vende accesibilidad, no autoselección.** Todos los anuncios activos
abren con el **plan de pagos ("30 % + $50 mil/mes")** y CTA suave ("Learn More" /
"Ver detalles"). "$50 mil al mes" **ancla en la mensualidad**, no en el enganche real
(~**$1.9 MDP** sobre un depa de **$6.4 MDP**). Resultado: atraemos a quien ve "$50k
suena alcanzable" y no a quien tiene el perfil de compra. Además el precio aparece
como **"$6.2 mdp"** cuando el oficial es **$6.4 MDP** (y el body a veces dice $6.4):
baja el umbral de filtro y es inconsistencia de claim.

**H4 · El formulario no está calificando (nuestra puerta, abierta de par en par).**
El rediseño del form de Essentia quedó **pendiente desde septiembre**. Hoy el lead
entra sin preguntas sólidas de presupuesto/enganche/plazo → Meta optimiza a *volumen
de formularios llenados*, no a *leads que compran*. Es el eslabón que más control
tenemos y el que está peor.

**Punto ciego · Google no se mide.** $23k+ históricos en Google al **sitio oficial
sin etiqueta de conversión** = 0 conversiones medibles, sin atribución por keyword,
sin optimización. El cliente no ha instrumentado el sitio y no lo va a hacer pronto.

### Lo que el diagnóstico NO dice

El form, cuando funciona, es el único que **concreta citas** (2 vs 0 de Google):
no hay que matarlo, hay que **subirle la calidad de entrada**. Y los leads de este
corte son tan recientes que su perfilado real se verá hasta el próximo corte: hoy
optimizamos la **fuente**, no juzgamos el **resultado** todavía.

---

## 2 · La tesis — 3 palancas nuestras + 1 compartida

> **Para que Essentia perfile más no necesitamos más volumen: necesitamos mejor
> entrada y poder medir.** El perfilamiento final depende de la contactación que
> integre el cliente, pero **un lead de mayor calidad perfila más fácil y más
> rápido** — que es exactamente lo que el cliente nos está pidiendo.

| # | Palanca | Dueño | Qué mueve |
|---|---|---|---|
| **A** | **Medición: Google → Landing Pages** | Sentido | Hace a Google medible y optimizable sin esperar al cliente |
| **B** | **Calidad en la fuente: formulario v2 + optimización técnica** | Sentido | Sube el perfilado del form y da un indicador de calidad desde el día 1 |
| **C** | **Mensaje de autoselección + creativo** | Sentido | Atrae perfil de compra, no de "mensualidad accesible" |
| **D** | **Contactación** | Cliente (+ apoyo Sentido) | Convierte el lead de calidad en perfilado real |

---

## 3 · Plan por palanca (acciones concretas, 15–31 oct)

### A · Google a las Landing Pages — por fin medible *(tu idea, y es la correcta)*

Hoy Google manda tráfico al **sitio oficial sin medición**. Lo redirigimos a **las
LP de Essentia** (cliente.essentiacountry.mx / inversionista.essentiacountry.mx), que
**ya miden** con el mismo pixel + CAPI + relay a Zoho que usa la campaña de Meta LP.
**Así Google se vuelve medible y atribuible sin tocar el sitio oficial** — se destraba
el punto ciego de 5 meses sin depender del cliente.

- [ ] Crear **campañas de búsqueda nuevas → LP** (no al sitio oficial). Conversión =
      evento **Lead** de la LP (el mismo que ya dispara).
- [ ] Estructura por intención premium: grupo **marca** ("Essentia Country
      departamentos", CTR histórico 13–25 %) + grupo **zona** ("departamentos country
      club guadalajara", "preventa country club"). Negativas: "baratos", "económicos",
      "renta", "700 mil".
- [ ] Puja: arrancar **Maximizar conversiones**; pasar a **tCPA** cuando acumule
      conversiones medidas.
- [ ] Mantener viva la campaña actual al sitio solo si el cliente por fin instrumenta
      el tag; si no, **pausar y mover presupuesto** a las campañas a LP.
- **Mide:** CPL real de Google (primera vez), % de perfilado de Google-a-LP vs
      Google-a-sitio, y cuál keyword trae calidad.

### B · Formulario v2 — de "más volumen" a calificación *(tu idea de menos preguntas pero sólidas)*

El form es la palanca #1 bajo nuestro control. Los formularios **no se editan**: se
**duplica**, se edita la copia y se cambia en los anuncios (crea anuncio nuevo →
agrupar con el cambio de creativo, reinicia aprendizaje). **Primero cotejar el form
actual por Chrome** para confirmar qué tiene hoy.

**Config (ataca "no contesta" y "no perfila" directo):**
- [ ] Tipo: **Mayor intención** (con pantalla de revisión antes de enviar).
- [ ] **Entrega de formulario flexible: APAGADA** (si está "optimizada", Meta quita
      preguntas por persona y anula la calificación).
- [ ] **Verificación de teléfono (código): ENCENDIDA** — sube contactabilidad, ataca
      de raíz el motivo de pérdida "sin comunicación" (el mayor de Meta este periodo).

**Intro (último filtro antes de dar datos):**
> *Preventa en Country Club, Guadalajara. Departamentos de 1 a 3 recámaras **desde
> $6.4 MDP**. Plan: 30 % de enganche, mensualidades durante la obra y crédito
> hipotecario a la entrega. Déjanos tus datos y un asesor te comparte disponibilidad
> y precios.*

**Preguntas de calificación (3–4 sólidas, listas para pegar):**
1. **Presupuesto de inversión:** Menos de $6.4 MDP · $6.4–$7.3 MDP · $7.3–$10 MDP ·
   Más de $10 MDP. *(arranca en el ticket real; la opción baja existe para medir y
   descartar, no para excluir en silencio)*
2. **Enganche disponible:** Cuento con ~30 % (~$1.9 MDP) · Entre 10–30 % · Menos del
   10 % / por definir. *(el enganche es el filtro real de compra — ataca "no perfila")*
3. **¿Cuándo buscas comprar?** 0–3 meses · 3–6 · 6–12 · Solo explorando.
4. *(opcional)* **Uso:** Para vivir · Segunda residencia · Inversión/renta.
   *(no descarta; alimenta el mensaje comercial de ventas)*

**Lógica condicional:** presupuesto "menos de $6.4" o enganche "menos del 10 %" →
pantalla final **sin promesa de llamada inmediata** (se registra igual, pero baja de
prioridad para ventas; no se quema capacidad de contacto en no-compradores).

**Pantalla final:** "Un asesor te contactará con disponibilidad y precios" + enlace a
la LP oficial. Sin WhatsApp compitiendo si aplica regla de conversión única.

**Lo que esto desbloquea:** desde el **día 1** tenemos un **indicador de calidad que
no depende de ventas**: *% de leads en rango ≥ $6.4 MDP y con enganche ≥ 30 %*. Ese
es el número que comparamos esta misma quincena, sin esperar a que el CRM perfile.

**Optimización técnica (campañas):**
- [ ] Campaña de form: optimizar a **leads de conversión** (lead quality) cuando la
      integración permita devolver calidad; mientras, mantener el form de mayor
      intención como filtro.
- [ ] Campaña LP: hoy optimiza al evento **Lead** (volumen). Evaluar un evento más
      profundo (lead calificado) para que Meta busque al que califica, no al que llena.
- [ ] **No tocar la segmentación** del evergreen reactivado el 8 oct hasta cumplir
      7–10 días de aprendizaje; agrupar TODOS los cambios (form + creativo) en un solo
      día para no reiniciar dos veces.
- [ ] Reglas de valor: revisar/ajustar para priorizar el público objetivo (interno).

### C · Mensaje y creativo — autoseleccionar intención

- [ ] **Cambiar el hook:** de "$50 mil al mes / accesibilidad" a **autoselección**:
      abrir con *"Preventa en Country Club desde $6.4 MDP"*, enganche 30 %, crédito
      hipotecario (preaprobado filtra). El plan de pagos pasa a **argumento
      secundario de tranquilidad**, no al titular.
- [ ] **Unificar precio a $6.4 MDP** en todos los anuncios (hoy flota $6.2/$6.4).
- [ ] **CTA más firme:** "Solicita disponibilidad y precios" / "Agenda tu visita" en
      lugar de "Learn More" / "Ver detalles".
- [ ] **Separar ángulos por LP:** inversionista (plusvalía/zona/ROI → LP Inversión) y
      habitar (calidad de vida/diseño → LP Clientes). Hoy el copy mezcla.
- [ ] **Diversificar creativo** (hoy los 10 leads de forma cuelgan de **un solo reel**
      = punto único de falla y riesgo de fatiga, el mismo que ya nos pasó):
  - **Avance de obra real** (drone mar-2025, 29 fotos + video) y **gym/vistas reales**
    (9 fotos Technogym): además de refrescar, **desarman la objeción reputacional**
    ("llevan 3 años sin terminar", comparación con Heredit) que hoy frena la decisión.
  - **Interior del depa muestra** y amenidad (alberca) — rindieron en la auditoría
    base y están sub-invertidos.

> Para la **propuesta angular de piezas listas a producir** (hook unificado
> texto+voz, storytelling, titular, CTA por ángulo), correr `/analisis-ads-flow` con
> estos hallazgos — este documento define la dirección, esa skill produce las piezas.

### D · Contactación — compromiso compartido con el cliente

Es del cliente, pero no lo soltamos: **lo apoyamos y lo medimos.**
- [ ] Nuestro aporte: verificación de teléfono en el form (menos números falsos) y
      **escalonar el volumen** (no soltar 10 leads de golpe sin capacidad de
      atenderlos — fue lo que hundió la contactación a 37 %).
- [ ] Pedir al cliente: **SLA de primer contacto** (ej. < 30 min en horario),
      **WhatsApp primero**, y ventana horaria de llamadas. Entregamos el lead al
      instante (relay→Zoho ya es inmediato).

---

## 4 · Separar Meta-form, Meta-LP y Google — cada uno mide distinto

| Producto | Qué es | Cómo se mide la calidad | Rol en la estrategia |
|---|---|---|---|
| **Meta — formulario** | Lead nativo FB/IG | `a.Submedio = Redes sociales`, por anuncio | El que concreta citas; subirle calidad con el form v2 |
| **Meta — Landing Page** | Tráfico a LP propia | `a.Submedio = Landing Page`, pixel+CAPI | Loop cerrado y medible; ángulo por perfil (cliente/inversión) |
| **Google — a LP (nuevo)** | Búsqueda → LP | Mismo pixel/relay que Meta LP | Vuelve medible a Google; intención premium |

**No se mezclan en un solo CPL/CP-Perfilado.** Cada uno reporta su embudo. El form y
la LP de Meta se separan siempre (son productos distintos con mecánica distinta), tal
como lo pediste.

---

## 5 · Plan de medición y comparación (contra qué comparamos)

**Línea base congelada (hoy, 14 oct):** la tabla de §1 + corte 14d. Se guarda tal cual.

**Durante el sprint (semanal):**
- % de leads **en rango ≥ $6.4 MDP** y **enganche ≥ 30 %** (del form v2) — indicador
  de calidad que no espera a ventas.
- Contactación efectiva por canal (meta: recuperar ≥ 50 %, el histórico del form).
- Google: que las campañas a LP **registren conversiones** (binario: medible sí/no) y
  su primer CPL real.

**Corte de comparación (mediados de nov, misma metodología que estos cortes):**
- Perfilados y **tasa de perfilado por canal** (form vs LP vs Google) vs la base ~5 %.
- **CP-Perfilado** por canal (primer número de Meta de la etapa).
- Contactación vs 37 % de esta quincena.
- Citas agendadas/concretadas.

**Hipótesis medibles del sprint:**
1. El form v2 sube el **% de leads en rango** y, en el corte de nov, la **tasa de
   perfilado del form por encima del 5.9 % base**.
2. La verificación de teléfono sube la **contactación del form** hacia ≥ 50 %.
3. Google a LP produce **conversiones medibles** y un CPL real por primera vez.
4. El mensaje de autoselección (precio real + enganche) **baja el "no perfilado"** sin
   desplomar el volumen útil.

---

## 6 · Compromiso al cliente (versión presentable — sin táctica interna)

> Esto es lo que se lleva a la mesa. Sin configuración de ad set, sin nombres de
> campos, sin know-how. Qué hacemos, qué pedimos, a qué nos comprometemos a medir.

**Diagnóstico honesto, en una frase:** generamos leads a buen costo, pero una parte se
pierde antes de perfilar — por cómo entra el lead y por qué tan rápido se le contacta.
Vamos a atacar las dos cosas y, por primera vez, a **medir Google**.

**Lo que hace Sentido (15–31 oct):**
1. Un **formulario de calificación** (presupuesto, enganche, plazo) para que entren
   leads con perfil real de compra, no solo curiosos.
2. **Mensaje y creativo** que hablan al comprador que sí califica (precio y condiciones
   reales por delante), con **avance de obra y gym reales** que responden a las dudas
   de entrega.
3. **Google medible por fin:** llevamos el tráfico de búsqueda a nuestras landing
   pages (que sí miden), para saber qué keyword trae clientes de calidad.
4. **Reporte quincenal** con el número que importa: costo por lead **perfilado** y tasa
   de perfilado por canal.

**Lo que necesitamos de PLP:**
1. **Velocidad de primer contacto** (idealmente < 30 min en horario) y **WhatsApp
   primero** — es el factor que más mueve el perfilado y hoy es el cuello de botella.
2. Seguir empujando la **conexión de medición del sitio oficial** (ya no nos bloquea,
   pero suma).

**A qué nos comprometemos a medir (comparación a mediados de nov vs hoy):**
- Subir el **% de leads en rango de compra** desde el formulario.
- Recuperar la **contactación** hacia ≥ 50 %.
- Entregar, por primera vez, **CP-Perfilado por canal** (Meta form, Meta LP, Google).

---

## 7 · Riesgos y dependencias

- **Horizonte corto:** el perfilado real tarda en madurar; a Oct 31 veremos sobre todo
  **indicadores líder** (% en rango, contactación, Google medible). El veredicto de
  perfilado cae en el corte de nov. Hay que decirlo así al cliente, no sobreprometer.
- **Contactación es del cliente:** si no mejora la velocidad de contacto, el lead de
  calidad igual no perfila. Por eso es compromiso compartido y explícito.
- **Reputación:** los comentarios de retraso/entrega pueden frenar la decisión aunque
  el lead sea bueno. El contenido de obra real es parte de la respuesta.
- **Aprendizaje de Meta:** agrupar form + creativo + cambios en un solo día; no tocar
  segmentación hasta cerrar 7–10 días post-reactivación (8 oct).
- **Pendiente de confirmar por Chrome:** el formulario actual (para el "quitar X /
  dejar Y / agregar Z" exacto) y el estado de las campañas de Google.

---

### Siguientes pasos inmediatos
1. Cotejar el form actual (Chrome) y dejar el **form v2 duplicado y listo**.
2. Armar las **campañas de Google → LP** con keywords marca + zona.
3. Correr **`/analisis-ads-flow`** para las piezas de creativo por ángulo.
4. Cerrar con PLP el **SLA de contactación** (el compromiso de su lado).
5. Congelar la **línea base** y agendar el **corte de comparación** a mediados de nov.

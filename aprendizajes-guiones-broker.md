# Playbook · Guiones para broker + landing de revisión

> Aprendizajes del proyecto Essentia Country (jul 2026): guiones de video para asesor frente a cámara, presentados al cliente en una landing interactiva de revisión interna. Se iteró en ~20 rondas de feedback del cliente hasta cerrar 4 piezas.
> Uso: replicar este proceso en cualquier desarrollo inmobiliario (o cliente similar) mejor y más rápido.
> Referencia viva: https://essentia-lp-sigma.vercel.app/guiones · repo `Essentia-LP/guiones.html`
>
> **Lo que más costó rondas (léelo primero):** (1) el tono — el cliente premium rechaza TODO coloquialismo, ver §2 "Tono formal y NSE"; (2) mezclar inversionista y comprador en una pieza — no funciona, una audiencia por pieza (§2 "Lenguaje de inversionista vs comprador"); (3) claims que no controlamos — nada de afirmar oferta/plusvalía/exclusividad sin dato (§2 "Claims"); (4) repetición estructural — varias escenas diciendo lo mismo (§2 "Estructura").

---

## 1 · El proceso que funcionó (en orden)

1. **Datos antes que creatividad.** Leer el análisis de campañas ANTES de proponer públicos. La segmentación no se inventa: sale de lo que la pauta ya demostró (canal dominante, demografía de leads, fatiga creativa, ausencia de segmentación actual). Si la campaña corre con 1 solo ad set y 1 creatividad, ese diagnóstico ES el argumento de venta de los guiones.
2. **Proponer la segmentación y validarla con el cliente antes de escribir.** Públicos tipo: cliente final (lifestyle), inversionista, remarketing/objeciones, proximidad geolocalizada. Preguntar formato y destino de publicación antes de producir.
3. **Escribir V1 completa y publicarla el mismo día.** El cliente revisa mejor sobre algo terminado que sobre un esquema.
4. **Iterar con el feedback en ciclos cortos** (ver §4): cada ronda se comenta ANTES de aplicarse, se aplica con matices, y se publica de inmediato en la misma URL.
5. **Auditoría de ritmo al final** (ver §3): pasa dos veces — primero palabras/segundo, luego palabras por escena. Hacerla desde la V1 ahorra una ronda entera.
6. **Pieza de "noticia" aparte.** Si el cliente lanza algo nuevo (cambio de esquema de pago, nueva etapa, amenidad terminada), NO meterlo a los guiones existentes: merece pieza transversal propia con variante de hook por temperatura. Y actualizar los rótulos de las demás piezas para que no queden desactualizadas.

---

## 2 · Aprendizajes de guion (los que nos costaron iteraciones)

### Hooks
- **≤10 palabras, una sola respiración.** Si el broker necesita tomar aire a la mitad, es largo.
- **Se entra por los ojos, nunca de espaldas.** El primer frame ya es el rostro/gesto/rótulo — la toma "bonita" de contexto va DESPUÉS del hook, como reveal.
- **Lifestyle = 3 segundos; inversionista = hasta 5** (entra por dato, no por emoción). Pero corto siempre gana.
- **Pregunta abierta > afirmación con claim.** Abre loop sin afirmar nada prometible; la respuesta es el cuerpo del guión. Ojo: la pregunta no debe repetir una idea que ya se dirá enseguida (ej. hook que nombra la zona y luego la escena 2 que la vuelve a nombrar — redundante).
- **Patrón de interrupción / gap de curiosidad.** Para producto diferenciado, el hook que provoca ("¿un depa de lujo por 50 mil al mes?" / "estos depas tienen algo que no te esperarías") supera al hook descriptivo. La escena siguiente resuelve el gap.
- **Cuando un hook se siente plano, brainstormea 3–5 ángulos y preséntaselos al cliente** agrupados por enfoque (contraste con lo actual, dos-en-uno, curiosidad de inversión, comodidad). El cliente elige mucho más rápido sobre opciones que sobre un ping-pong de una en una.
- **Hook por temperatura, cuerpo compartido.** Una misma pieza puede servir a frío y remarketing cambiando solo la primera frase (se graban ambas el mismo día): frío = pregunta que reta la expectativa; remarketing = nombrar la objeción («si esto era lo que te detenía…»).

### Ritmo (la regla de oro de producción)
- **~2.5 palabras/segundo** es la dicción natural de un asesor a cámara. Arriba de 3 p/s se atropella.
- **Máx ~15–18 palabras por escena.** Aunque "quepan" al hablar, un bloque largo se lee denso y carga al broker con más de una idea por toma. Si hay dos ideas: **dividir la escena, no comprimir el texto**.
- **Ningún plano dura más de 2"** en piezas lifestyle. "Suave no retiene": nada de dolly-in lentos, cortes secos al beat.
- Duraciones que funcionaron: 35–53" por pieza (lifestyle la más corta, la de narrativa emocional la más larga).

### Estructura del guión (el error que no se ve escena por escena)
- **La repetición casi siempre es estructural, no de palabras.** El síntoma que reporta el cliente ("se siente repetitivo") suele venir de varias escenas que dicen LO MISMO con otras palabras (ej. 3 tomas de dron seguidas = "zona buena / consolidada / demandada"). Revisar el guión LEÍDO DE CORRIDO (solo la columna de audio), no escena por escena.
- **Cada escena debe aportar un valor DISTINTO en un argumento que escala.** Patrón que funcionó para inversionista: provocación → puente → ubicación → producto → precio → mecanismo → renta → perfil → CTA. Si dos escenas comparten la misma idea, se fusionan o una cambia de tema.
- **Técnica: enunciar y desarrollar (framework).** Para el inversionista funcionó "el valor se define por dos factores: la ubicación y el inmueble" → escena 2 desarrolla ubicación, escena 3 desarrolla el inmueble. Da orden analítico y elimina la repetición.
- **Chequeo de palabras repetidas entre escenas contiguas** (nombre de zona, "zona", "demanda", "invertir"): que cada término clave aparezca idealmente una sola vez; variar sinónimos ("de la ciudad" / "de Guadalajara").

### Qué va en voz y qué va en rótulo
- **La voz vende emoción; los rótulos venden specs.** Metros cuadrados, precios, esquemas de pago, % → SIEMPRE en texto en pantalla, no en audio. Nadie retiene números mientras scrollea. Excepción táctica: la mensualidad más atractiva SÍ puede ir en voz como gancho ("desde 50 mil al mes"), con el esquema completo en el rótulo.
- **El precio nunca en voz** — frena el cierre. Rótulo: "Preventa · Desde $X".
- **Rótulos cortos y en formato de flujo.** Un rótulo largo no se lee en ~6" verticales. El esquema de pago completo quedó como flecha temporal: "Desde $6.4 MDP · 30% enganche → 18 × $50 mil → Entrega: saldo con crédito hipotecario". Si son 3–4 datos, revelarlos por pasos en el gráfico animado, no todos de golpe.
- **Subtítulos contrastantes integrados en el video, obligatorios** (gran parte del consumo es sin audio). La pieza debe funcionar en mute — probar el storyboard "sin audio" es un buen QA. Ojo con el término "quemados" frente al cliente: es jerga de edición y suena a defecto — decir "integrados/contrastantes".

### Claims y verdad (donde una IA externa te puede quemar)
- **Regla de oro: todo claim trazable a un insumo.** Si no está en contexto validado → placeholder `[por validar]` + nota visible en el documento.
- **Las IAs de plataforma (Meta AI, etc.) alucinan datos con total confianza:** nos inventó nombres de proyectos del desarrollador y cifras de $/m² que al investigarlas resultaron falsas o al revés de la realidad. Su feedback de ESTRUCTURA y RITMO es valioso; sus DATOS jamás se copian sin verificar contra insumos o levantamiento propio (portales, con fuente y fecha).
- **Nunca prometer rendimientos** ("plusvalía asegurada", "te protege") — riesgo de bloqueo del anuncio en Meta y riesgo legal. Preferir preguntas y hechos.
- **Nunca afirmar equivalencias falsas** (ej. "pagas lo mismo que tu renta" cuando la mensualidad es 2–3×). La sustitución emocional válida es de *destino* del dinero ("cada pago se queda en algo tuyo"), no de *monto*.
- **Por defecto: no comparar con NADA** — ni zonas, ni desarrollos, ni "antes vs ahora". El cliente premium lo percibe como denigrar al vecino o como claim de mercado no verificable. (Meta AI nos empujó a comparar con Providencia; el cliente lo rechazó de tajo.) Si el cliente PIDE una comparación, solo hacia arriba (aspiracional) y con formato "las dos ganan". Preguntar antes de asumir.
- **Ningún claim absoluto sobre oferta/terrenos/exclusividad sin dato.** "Ya no hay terrenos" es falso; "poca oferta nueva" también (había desarrollos nuevos). La tesis defendible fue **consolidación + alta demanda**. Para exclusividad, suavizar ("un privilegio de muy pocos") en vez del absoluto ("el único"), y dejar nota para endurecer SI el cliente confirma el dato.
- **No asignar UN valor único cuando no lo es.** "Vivir aquí es ganar tiempo" fue rechazado: afirma que el tiempo ES el valor. Mejor listar/proyectar beneficios sin declarar cuál es "el" valor.
- **Espacio vacío ≠ beneficio; proyectar la experiencia sin inventar comercios.** Locales comerciales sin negocios confirmados no venden; el valor llega con los comercios activos, que no podemos prometer. Solución: modo "imagina bajar por algo que te falta o disfrutar de algo rico, sin salir al tráfico" — proyección honesta, sin nombrar giros específicos ni afirmar que ya operan.
- **Precisión de posesivos.** "Tus comercios" implica que el residente los posee (falso). Correcto: "comercios en tu mismo edificio".
- **Nombres concretos > zonas vagas** en manejo de objeciones ("mismo desarrollador de [proyecto real]" vale más que "proyectos en tres ciudades") — pero solo nombres reales del portafolio, con estatus confirmado, porque la audiencia escéptica googlea. Si el cliente prohíbe nombrar proyectos, usar la trayectoria genérica ("años de experiencia y múltiples proyectos entregados").

### Lenguaje de inversionista vs comprador (una audiencia por pieza)
- **No intentes servir a inversionista y comprador en la misma pieza** — se diluye y no le habla bien a ninguno. Fue el diagnóstico del cliente: enfocar cada guión en UNA audiencia. Si un producto tiene doble atractivo, hacer dos piezas o mandar al otro público a su guión dedicado.
- **El inversionista habla otro idioma que el comprador.** Inversionista: "momento de entrada", "el mejor precio del proyecto", "eficiencia de la inversión", "plusvalía", "menos capital durante la obra". Comprador: "hacerlo tuyo", "tu hogar", "estilo de vida", "comodidad". Errores que el cliente marcó: hablarle de "ser propietario en Country Club" a un inversionista (es mensaje de comprador); usar "aligera" el pago (suena a falta de dinero); presentar el precio como cifra seca ("6.4 millones por una recámara") en vez de como oportunidad de entrada.

### Tono formal y NSE (el cliente premium es muy sensible aquí)
- **Cero coloquialismos.** El cliente rechazó, uno por uno: "fíjate", "te subes a", "y ojo", "date una vuelta", "puro", "ahorita", "suena increíble", "le rentas al médico/ejecutivo". Reformular a registro formal-elegante. Regla práctica: si sonaría casual en una llamada de ventas premium, fuera.
- **Palabras que delatan NSE bajo** — evitarlas: "vivienda" (usar el producto real: "depas y locales comerciales"), "accesible/barato" (usar "hacerlo tuyo"), "aligera el pago". El producto de lujo no se describe con lenguaje de interés social.
- **Aspiracional > descriptivo:** "una de las zonas más exclusivas", "un privilegio de pocos", "espacios de lujo, luz natural y vistas impresionantes" — mejor que enumeraciones planas.
- **Sin anglicismos** en boca del broker ("sin pitch" → "sin presión") — **ni en el documento**: en un entregable cliente todo va en español, incluidas las indicaciones de producción (gancho/cámara en mano/estabilizador/revelación/gráficos animados, no hook/handheld/gimbal/reveal/motion graphics). Nombres propios de plataforma (Reel, Meta) sí se conservan.
- **Indicaciones de producción concretas, sin comentarios de opinión** ("nada de dolly suave — suave no retiene" ✗ → "cortes rápidos de un segundo, sincronizados con la música" ✓). La justificación estratégica vive en el bloque de insight, no en la celda de video.
- **Cuidar dobles sentidos** ("se queda callada" podía leerse como disgusto → se cambió a "la cara de asombro").
- **Los atributos incómodos se convierten en ventaja, no se esconden:** estar sobre avenida (y no en el corazón de la colonia) = accesibilidad: "sales directo a la ciudad sin atravesar la colonia". Preguntar al cliente qué zonas/temas NO quiere mencionar antes de escribir.
- **No subestimar al público:** a quien renta en zona premium no le digas que su edificio no tiene alberca — sí la tiene. El giro es patrimonio ("con tu nombre en las escrituras"), no amenidades.

### CTAs y destinos
- **CTA genérico por audiencia, sin amarrar a un destino específico** (landing, calculadora, etc.): los reels deben servir igual para lead forms nativos de Meta que para campañas a landing. El destino se decide en la pauta, no en el guión.
- CTA alineado a la motivación: comprador → "agenda tu cita" / "descubre tu depa"; inversionista → "solicita cotización" / "descubre cuánto podría crecer tu inversión" (quiere números, no visita emocional).
- **CTA corto gana.** El cliente terminó prefiriendo "Agenda tu cita" a secas sobre compuestos ("descubre tu depa mientras está disponible — agenda tu visita"). En reel pautado el botón de Meta ya carga el destino; el CTA hablado/rótulo puede ser mínimo.
- **Reductores de fricción valen oro** ("sin presión", "sin compromiso") pero son **promesas operativas**: anotar que el equipo comercial debe honrarlas, o no usarlas. Ojo: el cliente puede pedir NO limitar la cita ("15 minutos" fue vetado porque acota la visita) — preguntar.
- **Urgencia realista, no ambigua.** "Antes que nadie" es ambiguo/falso; mejor "mientras está disponible". Y solo usar "solo quedan X" si el cliente autoriza el dato de inventario.

### Producción
- **Locaciones compartidas = 1 jornada de rodaje** para todas las piezas (planear la lista de locaciones por guión desde el documento).
- **Prueba física > acting** para audiencias escépticas: golpear el marco, abrir la llave — "el concreto no se finge". Abrir cajones y sentarse en sillones parece actuado.
- **Cero stock en piezas geolocalizadas:** el vecino detecta una calle ajena en 1 segundo. El reconocimiento del entorno ES la mecánica.
- Un estilo por pieza a propósito (pulido / autoridad / crudo-una-toma / vecinal / gráfico): la variedad también combate la fatiga creativa.
- Variantes útiles de entrega: recorte del hook (10–15") como anuncio, master 16:9 solo si algún canal lo pide.

---

## 3 · QA antes de entregar (checklist)

- [ ] Hook ≤10 palabras, primer frame visual definido, y que NO repita una idea de la escena siguiente.
- [ ] Ninguna escena >18 palabras ni >3 p/s; ningún plano >2".
- [ ] **Leer solo la columna de audio de corrido**: ¿dos escenas dicen lo mismo? ¿un término clave (zona, demanda, invertir) se repite entre escenas contiguas? → fusionar o revariar.
- [ ] Una sola audiencia por pieza; el lenguaje corresponde (inversionista vs comprador).
- [ ] Tono formal — cero coloquialismos, cero palabras de NSE bajo ("vivienda", "accesible", "aligera"), cero anglicismos (tampoco en las indicaciones de producción).
- [ ] Números/specs en rótulos (cortos, en flujo), no en voz. Precio nunca en voz (salvo la mensualidad-gancho).
- [ ] Cada claim trazable; ningún absoluto de oferta/exclusividad/plusvalía sin dato; sin comparaciones (salvo que el cliente las pida).
- [ ] Cero promesas de rendimiento ni equivalencias de monto; posesivos precisos ("comercios en tu edificio", no "tus comercios").
- [ ] CTA sin destino amarrado; promesas operativas anotadas.
- [ ] Nombres propios (proyectos, marcas, instituciones) verificados o marcados para VoBo.
- [ ] La pieza se entiende en mute (rótulos cuentan la historia).
- [ ] Lista de "pendientes con el cliente" concentrada y visible.

---

## 4 · El ciclo de feedback que funcionó

1. El cliente corre los guiones por su herramienta (ej. Meta AI) o su propio criterio y comparte el análisis crudo.
2. **Analizar contra el contexto propio ANTES de aplicar**: separar (a) feedback de estructura/ritmo → casi siempre se adopta; (b) datos/nombres → se verifican SIEMPRE (aquí aparecen las alucinaciones); (c) líneas creativas → se adaptan al lenguaje y sensibilidades ya acordadas.
3. **Comentar el análisis con el cliente antes de tocar el documento** (qué se adopta, qué se corrige y por qué, con 1–3 decisiones puntuales para él).
4. Aplicar, publicar en la misma URL y avisar con el link.
5. Documentar en el propio guión lo que quedó pendiente de validación — el documento es también la minuta.

---

## 5 · El formato de entrega: landing de revisión interna

**Por qué landing y no PDF/doc:** misma URL siempre (las iteraciones no generan versiones sueltas), interactiva, con la identidad del cliente (se siente producto, no borrador), compartible internamente con un link, y con deep links por guión (`#g2`) para discutir una pieza específica.

### Estructura de la página
1. **Hero**: título de la propuesta + "preparado por [logo] para [cliente] · fecha" + chip "Documento de revisión interna".
2. **Selector de guiones** (tarjetas = tabs): número, nombre del público, resumen de 1 línea (temperatura + ángulo). Todas las tarjetas en un renglón en desktop.
3. **Ficha por guión** (se muestra una a la vez):
   - Datos: Público · Temperatura · Canal y formato · Llamado a la acción (genérico).
   - "Por qué este mensaje" (insight estratégico en 3–4 líneas).
   - **Hook destacado** en bloque propio (con contexto de ejecución; si hay variantes por audiencia, ambas aquí).
   - **Tabla de escenas**: Tiempo | Video (plano, movimiento, locación en chip + rótulos en pantalla) | Audio (palabras textuales del broker + acotaciones en cursiva).
   - CTA en pantalla + botón del anuncio + notas de pauta (frecuencia, prioridad).
   - **Nota de producción/validación** al pie de cada guión (lo pendiente vive junto a la pieza, no en un anexo).
4. **Footer** con crédito de agencia.

### Decisiones de UX que valieron la pena
- **Un guión a la vez** (tabs con indicador "· viendo ahora", default el 01) en vez de scroll infinito — pedido explícito del cliente y mejora real de lectura.
- **Deep links** (`#g1…#gN`) vía `history.replaceState` — compartir un guión específico.
- **Navegación al pie**: ← anterior / ↑ volver al selector / siguiente → (con el nombre de la pieza destino) — sin regresar hasta arriba entre guiones.
- **Móvil: selector como menú desplegable** (botón con el guión activo + lista compacta sin descripciones) — 5 tarjetas apiladas empujan el contenido demasiado abajo.
- **Leyenda de uso adaptativa** (desktop: "haz clic en la tarjeta…"; móvil: "toca el menú…").

### Decisiones técnicas
- **HTML autocontenido** (CSS/JS inline) en el repo/Vercel que ya existe del cliente → ruta nueva (`/guiones` vía cleanUrls), deploy con `git push`, sin proyecto nuevo.
- `noindex,nofollow` — es material interno con URL pública no enlazada.
- Reusar la identidad ya construida (paleta, tipografías, fotos reales del proyecto como portadas de cada guión).
- **QA responsive**: auditar `scrollWidth` vs viewport con JS para cazar desbordes laterales (nuestro culpable: un chip `white-space:nowrap` en el nav) + `overflow-x:hidden` de seguridad; grids con columnas fijas por breakpoint para evitar tarjetas huérfanas (nunca `auto-fit` si el número de items es fijo). Ajustar leyendas por breakpoint (móvil: "toca el menú"; desktop: "haz clic en la tarjeta").
- Verificar SIEMPRE el deploy en vivo antes de avisar al cliente. **Cuidado con la caché de borde de Vercel:** el primer `curl` tras el push puede devolver la versión vieja — verificar con query cache-buster (`?v=$RANDOM`) y, si sigue viejo, reintentar unos segundos.
- **Eliminar / renumerar / pivotar un guión:** si el cliente pide quitar una pieza, renumerar TODO en conjunto — tarjetas del selector, `id`/`href`, títulos, comentarios, el regex del JS (`/^#g[1-N]$/`), el conteo del encabezado y del hero. Si REEMPLAZA una pieza por otro concepto, rehacer ficha + insight + hook + tarjeta juntos (no solo el audio), y marcar si la nueva pieza necesita producción distinta (ej. no hay banco de imágenes → grabación en sitio).

---

## 6 · Arranque rápido en un proyecto nuevo

1. Leer análisis de campañas + insumos del desarrollo (precios, esquema, amenidades, riesgos reputacionales, qué NO se puede decir). **Cargar antes las reglas de comunicación del cliente si ya existen** (tono, términos vetados, qué zonas/temas no mencionar, estado real de amenidades/obra).
2. Proponer 3–5 públicos con datos + preguntar: formato/duración, dónde publicar la revisión, zonas/temas vetados, y si se permite comparar con algo.
3. Clonar la estructura de `guiones.html` (selector + fichas + navegación + dropdown móvil) y cambiar identidad/assets.
4. Escribir V1 aplicando §2 y pasando el checklist §3 ANTES de publicar (ahorra 2–3 rondas). En especial: una audiencia por pieza, tono formal, cero claims sin dato, leer el audio de corrido para cazar repetición.
5. Publicar, mandar link, iterar con el ciclo §4.
6. Si aparece una "noticia" del cliente a mitad del proyecto → pieza transversal nueva + actualizar rótulos del resto.
7. Al cerrar, **destilar las reglas específicas de ESE cliente** (tono, vetos, estado de producto) en un doc de reglas propio — se vuelven el filtro por defecto de todas sus piezas futuras (parrilla, LP, pauta), no solo los guiones.

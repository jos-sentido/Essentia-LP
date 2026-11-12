# Proyecto PLP — essentia

Este es un proyecto de marketing para un desarrollo de **Peninsula Lifestyle Properties (PLP)**.

## Fuente de verdad

Toda la metodología vive en **`framework-plp-lp.md`**. Léelo antes de actuar. No dupliques ni reinterpretes su contenido — síguelo.

## Tu primer paso al abrir este proyecto: Fase 0 (Arranque)

Si `/contexto/` aún no está generado y validado:

1. Haz el **inventario de `/insumos/`** y dime qué falta (ver framework §4.1).
2. Ejecuta la **metodología de análisis** de §4.2 y genera los 5 documentos de `/contexto/` (§4.3):
   `brief-desarrollo.md`, `scraping-web.md`, `analisis-campanas.md`, `analisis-redes.md`, `insights-oportunidades.md`.
3. **Para aquí.** No produzcas copy, LP ni calendario hasta que yo valide `/contexto/`.

## Reglas duras

- **Regla de oro del contexto:** todo en `/contexto/` debe ser real, oficial y trazable a un insumo. Nada inventado — lo que no esté, márcalo como *pendiente con PLP*.
- **No produzcas nada de Fase 1 sin `/contexto/` validado.**
- **GHL no opera la venta** — es un destino de datos (contacto + custom fields). La captura, el enriquecimiento y el tracking viven en la **LP + el relay serverless** (form propio, no form de GHL); la entrega a Zoho es un destino del relay. La operación comercial vive en Zoho (lado PLP).
- **Dos fuentes de lead:** los de Landing Page sí van a Zoho (son la conversión); los de los Lead Forms nativos de Meta **no** van a Zoho.
- **Conversión** = lead de LP capturado (form submit, vía Pixel + CAPI + Google Ads), no su comportamiento en Zoho.
- **Cada medio se optimiza por sí mismo.** Meta y Google tienen su presupuesto asignado y cada uno debe generar leads en buen volumen y bien perfilados. No se elige ganador ("Google perfila mejor que Meta" no es conclusión ni recomendación) ni se propone pasar presupuesto de un medio a otro por esa comparación. Cada medio se lee contra sí mismo y sale con su propio diagnóstico, hipótesis y siguiente acción; el acumulado del desarrollo es solo contexto. El cruce de medios sí sirve para llevar aprendizajes de uno al otro (ej.: un gancho que funciona en el formulario de Meta se prueba en Google como término de búsqueda o texto de anuncio), como recomendación, sin dejar de optimizar cada medio por su cuenta. (Regla completa: `sentido-core/CLAUDE.md` → *Pauta PLP*.)

## Fases (detalle en el framework)

`Fase 0 Arranque` → `Fase 1 Producción` → `Fase 2 Implementación` → `Fase 3 Continuidad`

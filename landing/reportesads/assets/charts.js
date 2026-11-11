/* ===========================================================
   Amancay — Reportes de pauta · micro-librería de gráficas
   SVG a mano, sin dependencias. Se re-renderiza al ancho real
   del contenedor (texto siempre nítido, sin escalar el viewBox).

   Reglas de dibujo aplicadas:
   · marcas delgadas, extremos redondeados 4px anclados a la base
   · líneas 2px, marcadores >=8px, separación de 2px entre barras contiguas
   · grid/ejes en hairline sólida y recesiva (nunca punteada)
   · una sola escala por gráfica (nunca doble eje)
   · etiquetas directas selectivas (extremos), el resto en tooltip
   · color por entidad, nunca por rango
   =========================================================== */
(function (global) {
  'use strict';

  var nf = new Intl.NumberFormat('es-MX');
  var mf = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 });
  var mf2 = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', minimumFractionDigits: 2, maximumFractionDigits: 2 });

  var fmt = {
    num: function (v) { return v == null ? '—' : nf.format(v); },
    mxn: function (v) { return v == null ? '—' : mf.format(v); },
    mxn2: function (v) { return v == null ? '—' : mf2.format(v); },
    pct: function (v) { return v == null ? '—' : nf.format(v) + ' %'; }
  };

  var NS = 'http://www.w3.org/2000/svg';
  function el(name, attrs) {
    var n = document.createElementNS(NS, name);
    for (var k in attrs) if (attrs[k] != null) n.setAttribute(k, attrs[k]);
    return n;
  }
  /* Escala: se elige el PASO redondo y el tope sale de multiplicarlo por el
     número de divisiones. Así el tope queda pegado al dato (58 leads -> 60, no
     100) y todas las marcas del eje caen en números legibles. */
  function niceStep(x) {
    if (!x) return 1;
    var mag = Math.pow(10, Math.floor(Math.log10(x)));
    var r = x / mag;
    var step = r <= 1 ? 1 : r <= 1.5 ? 1.5 : r <= 2 ? 2 : r <= 2.5 ? 2.5
             : r <= 3 ? 3 : r <= 4 ? 4 : r <= 5 ? 5 : r <= 6 ? 6 : r <= 8 ? 8 : 10;
    return step * mag;
  }
  function niceMax(v, n) {
    if (!v) return 1;
    n = n || 4;
    return niceStep(v / n) * n;
  }
  function ticks(max, n) {
    var out = [], i;
    for (i = 0; i <= n; i++) out.push(max * i / n);
    return out;
  }

  /* ---------- Tooltip compartido por figura ---------- */
  function Tip(figure) {
    var node = document.createElement('div');
    node.className = 'tip';
    node.setAttribute('role', 'status');
    figure.appendChild(node);
    return {
      show: function (html, x, y) {
        node.innerHTML = html;
        var w = figure.getBoundingClientRect().width;
        var half = node.offsetWidth / 2;
        var cx = Math.max(half + 4, Math.min(w - half - 4, x));
        node.style.left = cx + 'px';
        node.style.top = y + 'px';
        node.classList.add('is-on');
        figure.classList.add('is-hovering');
      },
      hide: function () {
        node.classList.remove('is-on');
        figure.classList.remove('is-hovering');
        figure.querySelectorAll('.mark.is-active').forEach(function (m) { m.classList.remove('is-active'); });
      }
    };
  }

  function rows(pairs) {
    return pairs.filter(function (p) { return p[1] != null; })
      .map(function (p) { return '<div class="tip__row"><span>' + p[0] + '</span><b>' + p[1] + '</b></div>'; }).join('');
  }

  /* ---------- Auto-render responsivo ---------- */
  function responsive(figure, draw) {
    var host = figure.querySelector('[data-plot]') || figure;
    var last = 0;
    function run() {
      var w = Math.round(host.getBoundingClientRect().width);
      if (!w || w === last) return;
      last = w;
      host.innerHTML = '';
      draw(host, w);
    }
    run();
    if (global.ResizeObserver) new ResizeObserver(run).observe(host);
    /* respaldo: si el observer no corre (pestaña en segundo plano, pane oculto),
       el resize de ventana vuelve a medir igual */
    var t;
    global.addEventListener('resize', function () { clearTimeout(t); t = setTimeout(run, 120); });
  }

  /* ===========================================================
     Barras verticales — una serie, categorías en el eje X
     opts: {data:[{label,value,tip:[[k,v]],dim:bool}], color, fmt,
            height, labelEvery, labelExtremes}
     =========================================================== */
  function barChart(figure, opts) {
    var data = opts.data, color = opts.color || 'var(--series-1)';
    var f = opts.fmt || fmt.num;
    var tip = Tip(figure);

    responsive(figure, function (host, W) {
      var H = opts.height || 190;
      var padL = 46, padR = 8, padT = 16, padB = 30;
      var iw = W - padL - padR, ih = H - padT - padB;
      var max = niceMax(Math.max.apply(null, data.map(function (d) { return d.value || 0; })));
      var slot = iw / data.length;
      var bw = Math.max(6, Math.min(46, slot - 8)); /* deja >=2px reales entre barras */
      var svg = el('svg', { viewBox: '0 0 ' + W + ' ' + H, role: 'img', 'aria-label': opts.aria || '' });
      /* etiquetas del eje X: se adelgazan solas para que nunca se encimen */
      var every = opts.labelEvery || Math.max(1, Math.ceil(46 / slot));

      ticks(max, 4).forEach(function (t) {
        var y = padT + ih - (t / max) * ih;
        svg.appendChild(el('line', { x1: padL, x2: W - padR, y1: y, y2: y, class: 'grid-line' }));
        var tx = el('text', { x: padL - 8, y: y + 4, class: 'axis-label', 'text-anchor': 'end' });
        tx.textContent = opts.tickFmt ? opts.tickFmt(t) : fmt.num(Math.round(t));
        svg.appendChild(tx);
      });

      data.forEach(function (d, i) {
        var cx = padL + slot * i + slot / 2;
        var v = d.value || 0;
        var h = max ? (v / max) * ih : 0;
        var y = padT + ih - h;
        var g = el('g', { class: 'mark' });
        if (h > 0) {
          /* extremo superior redondeado 4px, base anclada al eje */
          var r = Math.min(4, h);
          var p = 'M' + (cx - bw / 2) + ' ' + (padT + ih) +
                  ' V' + (y + r) + ' Q' + (cx - bw / 2) + ' ' + y + ' ' + (cx - bw / 2 + r) + ' ' + y +
                  ' H' + (cx + bw / 2 - r) + ' Q' + (cx + bw / 2) + ' ' + y + ' ' + (cx + bw / 2) + ' ' + (y + r) +
                  ' V' + (padT + ih) + ' Z';
          g.appendChild(el('path', { d: p, fill: d.dim ? 'var(--grid)' : color }));
        } else {
          var z = el('text', { x: cx, y: padT + ih - 5, class: 'axis-label', 'text-anchor': 'middle' });
          z.textContent = '0'; g.appendChild(z);
        }
        var hit = el('rect', { x: cx - slot / 2, y: padT, width: slot, height: ih, fill: 'transparent' });
        g.appendChild(hit);
        g.addEventListener('pointerenter', function () {
          g.classList.add('is-active');
          tip.show('<div class="tip__ttl">' + d.label + '</div>' + rows(d.tip || [[opts.name || 'Valor', f(v)]]), cx, y);
        });
        g.addEventListener('pointerleave', tip.hide);
        svg.appendChild(g);

        if (i % every === 0 || i === data.length - 1) {
          var lb = el('text', { x: cx, y: H - 10, class: 'axis-label', 'text-anchor': 'middle' });
          lb.textContent = d.short || d.label;
          svg.appendChild(lb);
        }
      });
      host.appendChild(svg);
    });
    figure.addEventListener('pointerleave', tip.hide);
  }

  /* ===========================================================
     Línea — una serie, con marcadores y crosshair
     =========================================================== */
  function lineChart(figure, opts) {
    var data = opts.data, color = opts.color || 'var(--series-2)';
    var f = opts.fmt || fmt.num;
    var tip = Tip(figure);

    responsive(figure, function (host, W) {
      var H = opts.height || 190;
      var padL = 46, padR = 8, padT = 16, padB = 30;
      var iw = W - padL - padR, ih = H - padT - padB;
      var vals = data.map(function (d) { return d.value; }).filter(function (v) { return v != null; });
      var max = niceMax(Math.max.apply(null, vals));
      var slot = iw / data.length;
      var svg = el('svg', { viewBox: '0 0 ' + W + ' ' + H, role: 'img', 'aria-label': opts.aria || '' });

      ticks(max, 4).forEach(function (t) {
        var y = padT + ih - (t / max) * ih;
        svg.appendChild(el('line', { x1: padL, x2: W - padR, y1: y, y2: y, class: 'grid-line' }));
        var tx = el('text', { x: padL - 8, y: y + 4, class: 'axis-label', 'text-anchor': 'end' });
        tx.textContent = opts.tickFmt ? opts.tickFmt(t) : fmt.num(Math.round(t));
        svg.appendChild(tx);
      });

      var every = opts.labelEvery || Math.max(1, Math.ceil(46 / slot));
      var pts = data.map(function (d, i) {
        return { x: padL + slot * i + slot / 2, y: d.value == null ? null : padT + ih - (d.value / max) * ih, d: d };
      });

      /* segmentos: se corta donde no hay dato (no se inventa continuidad) */
      var run = [], segs = [];
      pts.forEach(function (p) {
        if (p.y == null) { if (run.length) segs.push(run); run = []; } else run.push(p);
      });
      if (run.length) segs.push(run);
      segs.forEach(function (s) {
        if (s.length < 2) return;
        svg.appendChild(el('path', {
          d: 'M' + s.map(function (p) { return p.x + ' ' + p.y; }).join(' L'),
          fill: 'none', stroke: color, 'stroke-width': 2, 'stroke-linecap': 'round', 'stroke-linejoin': 'round'
        }));
      });

      pts.forEach(function (p, i) {
        var g = el('g', { class: 'mark' });
        if (p.y != null) {
          g.appendChild(el('circle', { cx: p.x, cy: p.y, r: 5, fill: color, stroke: 'var(--surface-1)', 'stroke-width': 2 }));
        }
        g.appendChild(el('rect', { x: p.x - slot / 2, y: padT, width: slot, height: ih, fill: 'transparent' }));
        g.addEventListener('pointerenter', function () {
          g.classList.add('is-active');
          tip.show('<div class="tip__ttl">' + p.d.label + '</div>' +
            rows(p.d.tip || [[opts.name || 'Valor', p.d.value == null ? 'sin dato' : f(p.d.value)]]),
            p.x, p.y == null ? padT + ih / 2 : p.y);
        });
        g.addEventListener('pointerleave', tip.hide);
        svg.appendChild(g);
        if (i % every === 0 || i === pts.length - 1) {
          var lb = el('text', { x: p.x, y: H - 10, class: 'axis-label', 'text-anchor': 'middle' });
          lb.textContent = p.d.short || p.d.label;
          svg.appendChild(lb);
        }
      });

      /* etiqueta directa selectiva: solo el mejor y el peor punto */
      var withVal = pts.filter(function (p) { return p.y != null; });
      if (withVal.length && opts.labelExtremes !== false) {
        var lo = withVal.reduce(function (a, b) { return b.d.value < a.d.value ? b : a; });
        var hi = withVal.reduce(function (a, b) { return b.d.value > a.d.value ? b : a; });
        [lo, hi].forEach(function (p) {
          var t = el('text', { x: p.x, y: p.y - 12, class: 'val-label', 'text-anchor': 'middle' });
          t.textContent = f(p.d.value);
          svg.appendChild(t);
        });
      }
      host.appendChild(svg);
    });
    figure.addEventListener('pointerleave', tip.hide);
  }

  /* ===========================================================
     Barras horizontales — una serie, categorías con nombre largo
     =========================================================== */
  function hBarChart(figure, opts) {
    var data = opts.data, color = opts.color || 'var(--series-1)';
    var f = opts.fmt || fmt.num;
    var tip = Tip(figure);

    responsive(figure, function (host, W) {
      var narrow = W < 460;
      var padL = narrow ? 6 : Math.min(180, Math.round(W * 0.32));
      var padR = 62, padT = 6, padB = 4;
      var rowH = narrow ? 46 : 32, gap = 2;
      var H = padT + padB + data.length * rowH;
      var iw = W - padL - padR;
      var max = niceMax(Math.max.apply(null, data.map(function (d) { return d.value || 0; })));
      var svg = el('svg', { viewBox: '0 0 ' + W + ' ' + H, role: 'img', 'aria-label': opts.aria || '' });

      data.forEach(function (d, i) {
        var top = padT + i * rowH;
        var bh = Math.min(narrow ? 12 : 16, rowH - gap - (narrow ? 18 : 8));
        var y = top + (narrow ? 20 : (rowH - bh) / 2);
        var w = max ? (d.value / max) * iw : 0;
        var g = el('g', { class: 'mark' });

        var lb = el('text', {
          x: narrow ? padL : padL - 12, y: narrow ? top + 13 : y + bh / 2 + 4,
          class: 'axis-label', 'text-anchor': narrow ? 'start' : 'end'
        });
        lb.textContent = d.label;
        if (d.flag) lb.setAttribute('font-weight', '600');
        g.appendChild(lb);

        if (w > 0) {
          var r = Math.min(4, w);
          var p = 'M' + padL + ' ' + y + ' H' + (padL + w - r) +
                  ' Q' + (padL + w) + ' ' + y + ' ' + (padL + w) + ' ' + (y + r) +
                  ' V' + (y + bh - r) + ' Q' + (padL + w) + ' ' + (y + bh) + ' ' + (padL + w - r) + ' ' + (y + bh) +
                  ' H' + padL + ' Z';
          g.appendChild(el('path', { d: p, fill: d.color || color }));
        }
        var vt = el('text', { x: padL + w + 9, y: y + bh / 2 + 4, class: 'val-label' });
        vt.textContent = f(d.value);
        g.appendChild(vt);

        g.appendChild(el('rect', { x: 0, y: top, width: W, height: rowH, fill: 'transparent' }));
        g.addEventListener('pointerenter', function () {
          g.classList.add('is-active');
          tip.show('<div class="tip__ttl">' + d.label + '</div>' + rows(d.tip || [[opts.name || 'Valor', f(d.value)]]),
            Math.min(padL + w, W - 20), y);
        });
        g.addEventListener('pointerleave', tip.hide);
        svg.appendChild(g);
      });
      host.appendChild(svg);
    });
    figure.addEventListener('pointerleave', tip.hide);
  }

  /* ===========================================================
     Barras horizontales agrupadas — dos series por categoría
     series: [{key,name,color}]  groups:[{label, values:{key:v}, tip:{key:[[k,v]]}}]
     =========================================================== */
  function groupedHBar(figure, opts) {
    var groups = opts.groups, series = opts.series;
    var f = opts.fmt || fmt.num;
    var tip = Tip(figure);

    responsive(figure, function (host, W) {
      var narrow = W < 460;
      var padL = narrow ? 6 : 86, padR = 62, padT = 6, padB = 6;
      var barH = 14, gap = 2;
      var groupH = series.length * barH + (series.length - 1) * gap + (narrow ? 40 : 20);
      var H = padT + padB + groups.length * groupH;
      var iw = W - padL - padR;
      var all = [];
      groups.forEach(function (g) { series.forEach(function (s) { all.push(g.values[s.key] || 0); }); });
      var max = niceMax(Math.max.apply(null, all));
      var svg = el('svg', { viewBox: '0 0 ' + W + ' ' + H, role: 'img', 'aria-label': opts.aria || '' });

      groups.forEach(function (grp, gi) {
        var top = padT + gi * groupH + (narrow ? 18 : 3);
        var lb = el('text', {
          x: narrow ? padL : padL - 12,
          y: narrow ? top - 6 : top + (series.length * barH + gap) / 2 + 4,
          class: 'axis-label', 'text-anchor': narrow ? 'start' : 'end'
        });
        lb.textContent = grp.label;
        svg.appendChild(lb);

        series.forEach(function (s, si) {
          var v = grp.values[s.key] || 0;
          var y = top + si * (barH + gap);
          var w = max ? (v / max) * iw : 0;
          var g = el('g', { class: 'mark' });
          if (w > 0) {
            var r = Math.min(4, w);
            var p = 'M' + padL + ' ' + y + ' H' + (padL + w - r) +
                    ' Q' + (padL + w) + ' ' + y + ' ' + (padL + w) + ' ' + (y + r) +
                    ' V' + (y + barH - r) + ' Q' + (padL + w) + ' ' + (y + barH) + ' ' + (padL + w - r) + ' ' + (y + barH) +
                    ' H' + padL + ' Z';
            g.appendChild(el('path', { d: p, fill: s.color }));
          }
          var vt = el('text', { x: padL + w + 9, y: y + barH - 2, class: 'val-label' });
          vt.textContent = f(v);
          g.appendChild(vt);
          g.appendChild(el('rect', { x: 0, y: y - 1, width: W, height: barH + 2, fill: 'transparent' }));
          g.addEventListener('pointerenter', function () {
            g.classList.add('is-active');
            tip.show('<div class="tip__ttl">' + grp.label + ' · ' + s.name + '</div>' +
              rows((grp.tip && grp.tip[s.key]) || [[opts.name || 'Valor', f(v)]]),
              Math.min(padL + w, W - 20), y);
          });
          g.addEventListener('pointerleave', tip.hide);
          svg.appendChild(g);
        });
      });
      host.appendChild(svg);
    });
    figure.addEventListener('pointerleave', tip.hide);
  }

  /* ===========================================================
     Barra de composición 100% — reparto de gasto (una sola fila)
     =========================================================== */
  function shareBar(figure, opts) {
    var data = opts.data;
    var total = data.reduce(function (a, d) { return a + d.value; }, 0);
    var tip = Tip(figure);
    responsive(figure, function (host, W) {
      var H = 46, bh = 26, gap = 2;
      var svg = el('svg', { viewBox: '0 0 ' + W + ' ' + H, role: 'img', 'aria-label': opts.aria || '' });
      var x = 0;
      data.forEach(function (d) {
        var w = Math.max(0, (d.value / total) * W - gap);
        var g = el('g', { class: 'mark' });
        g.appendChild(el('rect', { x: x, y: 4, width: w, height: bh, rx: 3, fill: d.color }));
        if (w > 46) {
          var t = el('text', { x: x + w / 2, y: 4 + bh + 15, class: 'axis-label', 'text-anchor': 'middle' });
          t.textContent = Math.round(d.value / total * 100) + ' %';
          g.appendChild(t);
        }
        var xx = x, ww = w;
        g.addEventListener('pointerenter', function () {
          g.classList.add('is-active');
          tip.show('<div class="tip__ttl">' + d.label + '</div>' +
            rows([['Inversión', fmt.mxn(d.value)], ['Del total', (d.value / total * 100).toFixed(1) + ' %']]),
            xx + ww / 2, 4);
        });
        g.addEventListener('pointerleave', tip.hide);
        svg.appendChild(g);
        x += w + gap;
      });
      host.appendChild(svg);
    });
    figure.addEventListener('pointerleave', tip.hide);
  }

  /* ===========================================================
     Dispersión — relación entre dos medidas, una sola serie
     (el color no codifica nada: identidad va en la etiqueta)
     =========================================================== */
  function scatterChart(figure, opts) {
    var data = opts.data, color = opts.color || 'var(--series-1)';
    var fx = opts.fmtX || fmt.num, fy = opts.fmtY || fmt.num;
    var tip = Tip(figure);

    responsive(figure, function (host, W) {
      var H = opts.height || 300;
      var padL = 52, padR = 16, padT = 16, padB = 42;
      var iw = W - padL - padR, ih = H - padT - padB;
      var maxX = niceMax(Math.max.apply(null, data.map(function (d) { return d.x; })));
      var maxY = niceMax(Math.max.apply(null, data.map(function (d) { return d.y; })));
      var svg = el('svg', { viewBox: '0 0 ' + W + ' ' + H, role: 'img', 'aria-label': opts.aria || '' });

      ticks(maxY, 4).forEach(function (t) {
        var y = padT + ih - (t / maxY) * ih;
        svg.appendChild(el('line', { x1: padL, x2: W - padR, y1: y, y2: y, class: 'grid-line' }));
        var tx = el('text', { x: padL - 8, y: y + 4, class: 'axis-label', 'text-anchor': 'end' });
        tx.textContent = opts.tickY ? opts.tickY(t) : fmt.num(Math.round(t));
        svg.appendChild(tx);
      });
      ticks(maxX, 4).forEach(function (t) {
        var x = padL + (t / maxX) * iw;
        var tx = el('text', { x: x, y: H - 22, class: 'axis-label', 'text-anchor': 'middle' });
        tx.textContent = opts.tickX ? opts.tickX(t) : fmt.num(Math.round(t));
        svg.appendChild(tx);
      });
      if (opts.labelX) {
        var lx = el('text', { x: padL + iw / 2, y: H - 4, class: 'axis-label', 'text-anchor': 'middle' });
        lx.textContent = opts.labelX; svg.appendChild(lx);
      }

      data.forEach(function (d) {
        var cx = padL + (d.x / maxX) * iw;
        var cy = padT + ih - (d.y / maxY) * ih;
        var g = el('g', { class: 'mark' });
        /* anillo de 2px del color de la superficie para que dos puntos que se
           encimen sigan leyéndose como dos */
        g.appendChild(el('circle', {
          cx: cx, cy: cy, r: 6,
          fill: d.highlight ? 'var(--bad)' : color,
          stroke: 'var(--surface-1)', 'stroke-width': 2
        }));
        if (d.note) {
          var t = el('text', {
            x: cx, y: cy - 13, class: 'val-label',
            'text-anchor': cx > padL + iw * 0.72 ? 'end' : 'middle'
          });
          t.textContent = d.note;
          g.appendChild(t);
        }
        g.appendChild(el('circle', { cx: cx, cy: cy, r: 16, fill: 'transparent' }));
        g.addEventListener('pointerenter', function () {
          g.classList.add('is-active');
          tip.show('<div class="tip__ttl">' + d.label + '</div>' + rows(d.tip || []), cx, cy);
        });
        g.addEventListener('pointerleave', tip.hide);
        svg.appendChild(g);
      });
      host.appendChild(svg);
    });
    figure.addEventListener('pointerleave', tip.hide);
  }

  /* ---------- Tabla ordenable ---------- */
  function sortableTable(table) {
    var tbody = table.tBodies[0];
    table.querySelectorAll('th.sortable').forEach(function (th, idx) {
      var col = Array.prototype.indexOf.call(th.parentNode.children, th);
      th.setAttribute('tabindex', '0');
      th.setAttribute('role', 'columnheader');
      function go() {
        var dir = th.getAttribute('aria-sort') === 'descending' ? 'ascending' : 'descending';
        table.querySelectorAll('th').forEach(function (o) { o.removeAttribute('aria-sort'); });
        th.setAttribute('aria-sort', dir);
        var rows = Array.prototype.slice.call(tbody.rows);
        rows.sort(function (a, b) {
          var ac = a.cells[col], bc = b.cells[col];
          /* «sin dato» nunca gana un orden: siempre al final, suba o baje */
          var an0 = ac.dataset.empty === '1', bn0 = bc.dataset.empty === '1';
          if (an0 !== bn0) return an0 ? 1 : -1;
          if (an0 && bn0) return 0;
          var av = ac.dataset.v, bv = bc.dataset.v;
          var an = parseFloat(av), bn = parseFloat(bv);
          var r = (!isNaN(an) && !isNaN(bn)) ? an - bn
            : String(av == null ? ac.textContent : av)
                .localeCompare(String(bv == null ? bc.textContent : bv), 'es');
          return dir === 'ascending' ? r : -r;
        });
        rows.forEach(function (r) { tbody.appendChild(r); });
      }
      th.addEventListener('click', go);
      th.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); } });
    });
  }

  global.Viz = {
    fmt: fmt, barChart: barChart, lineChart: lineChart, hBarChart: hBarChart,
    groupedHBar: groupedHBar, shareBar: shareBar, scatterChart: scatterChart,
    sortableTable: sortableTable
  };
})(window);

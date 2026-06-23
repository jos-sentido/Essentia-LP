/* ===== Essentia Country LP — interacción ===== */
(function () {
  'use strict';
  document.documentElement.classList.add('js');

  // Red de seguridad: oculta cualquier elemento con placeholder sin llenar (‹‹...››)
  document.querySelectorAll('body *').forEach(function (el) {
    if (el.children.length === 0 && /‹‹.*?››/.test(el.textContent)) {
      el.style.display = 'none';
    }
  });

  // ---- A/B variant (por ruta /a · /b o por ?v=a|b) ----
  var qv = (new URLSearchParams(location.search).get('v') || '').toLowerCase();
  var path = location.pathname.toLowerCase().replace(/\/+$/, '');
  var isB = qv === 'b' || path === '/b' || path.endsWith('/b');
  var variant = isB ? 'b' : 'a';
  document.body.dataset.variant = variant;

  // Mostrar/ocultar bloques data-ab
  document.querySelectorAll('[data-ab]').forEach(function (el) {
    el.hidden = el.getAttribute('data-ab') !== variant;
  });

  // ---- Nav y sticky CTA: aparecen al hacer scroll ----
  var nav = document.getElementById('nav');
  var onScroll = function () {
    var y = window.scrollY;
    nav.classList.toggle('is-stuck', y > 40);
    // sticky CTA solo después de pasar el hero (evita encimarse en móvil)
    document.body.classList.toggle('past-hero', y > window.innerHeight * 0.7);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  onScroll();

  // ---- Reveal on scroll ----
  var reveals = document.querySelectorAll('.section .wrap > *, .amen__card, .typo__card');
  reveals.forEach(function (el) { el.setAttribute('data-reveal', ''); });
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  // ---- Calculadora de inversión (Variante B) ----
  (function () {
    var tabs = document.getElementById('calc-tabs');
    if (!tabs) return;
    var UNITS = [
      { name: '1 recámara', m2: 83.81, price: 6.4 },
      { name: '2 recámaras', m2: 85.23, price: 7.3 },
      { name: '2 recámaras · amplio', m2: 130.89, price: 7.3 },
      { name: '3 recámaras', m2: 152.62, price: 10.2 }
    ];
    var RENTA_M2 = 250, PLUSV = 0.10, ENG = 0.30, MSI_PCT = 0.40, MSI_N = 18, ENTREGA = 0.30;
    var $ = function (id) { return document.getElementById(id); };
    function pesos(v) { return '$' + Math.round(v).toLocaleString('es-MX'); }
    function mdp(v) { return '$' + (Math.round(v * 100) / 100).toString() + ' MDP'; }
    function setUnit(i) {
      var u = UNITS[i], P = u.price; // MDP
      $('calc-precio').textContent = mdp(P);
      $('calc-enganche').textContent = mdp(P * ENG);
      $('calc-msi').textContent = pesos(P * MSI_PCT / MSI_N * 1e6) + '/mes';
      $('calc-entrega').textContent = mdp(P * ENTREGA);
      $('calc-renta').textContent = pesos(u.m2 * RENTA_M2) + '/mes';
      $('calc-valor').textContent = mdp(P * Math.pow(1 + PLUSV, 5));
      tabs.querySelectorAll('.calc__tab').forEach(function (t, k) {
        t.classList.toggle('is-sel', k === i);
      });
    }
    tabs.addEventListener('click', function (e) {
      var t = e.target.closest('.calc__tab');
      if (t) setUnit(parseInt(t.dataset.unit, 10));
    });
    setUnit(0);
  })();

  // ---- Formulario multi-paso ----
  var form = document.getElementById('lead-form');
  if (!form) return;
  var data = {};
  var steps = Array.prototype.slice.call(form.querySelectorAll('.step'))
    .filter(function (s) { return !s.dataset.only || s.dataset.only === variant; });
  var idx = 0;
  var bar = document.getElementById('bar');
  var backBtn = document.getElementById('back');
  var nextBtn = document.getElementById('next');
  var submitBtn = document.getElementById('submit');
  var errEl = document.getElementById('err');

  function render() {
    form.querySelectorAll('.step').forEach(function (s) { s.classList.remove('is-active'); });
    steps[idx].classList.add('is-active');
    bar.style.width = Math.round(((idx + 1) / steps.length) * 100) + '%';
    backBtn.hidden = idx === 0;
    var last = idx === steps.length - 1;
    nextBtn.hidden = last;
    submitBtn.hidden = !last;
    errEl.hidden = true;
  }

  // Selección de opciones (auto-avanza)
  form.querySelectorAll('.opts').forEach(function (group) {
    group.addEventListener('click', function (e) {
      var btn = e.target.closest('.opt');
      if (!btn) return;
      group.querySelectorAll('.opt').forEach(function (o) { o.classList.remove('is-sel'); });
      btn.classList.add('is-sel');
      data[group.dataset.field] = btn.dataset.value;
      setTimeout(function () { if (idx < steps.length - 1) { idx++; render(); } }, 240);
    });
  });

  nextBtn.addEventListener('click', function () {
    var group = steps[idx].querySelector('.opts');
    if (group && !data[group.dataset.field]) { showErr('Elige una opción para continuar.'); return; }
    if (idx < steps.length - 1) { idx++; render(); }
  });
  backBtn.addEventListener('click', function () { if (idx > 0) { idx--; render(); } });

  function showErr(msg) { errEl.textContent = msg; errEl.hidden = false; }

  // Pre-selecciona la tipología al dar clic en "Solicitar información" de una card
  document.querySelectorAll('[data-cta="typo"][data-tipo]').forEach(function (a) {
    a.addEventListener('click', function () {
      var tipo = a.getAttribute('data-tipo');
      data.producto_interes = tipo;
      var group = form.querySelector('.opts[data-field="producto_interes"]');
      if (group) {
        group.querySelectorAll('.opt').forEach(function (o) {
          o.classList.toggle('is-sel', o.dataset.value === tipo);
        });
      }
    });
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var nombre = form.nombre.value.trim();
    var whatsapp = form.whatsapp.value.trim();
    var email = form.email.value.trim();
    if (!nombre || !whatsapp || !email) { showErr('Completa tus datos de contacto.'); return; }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) { showErr('Revisa tu email.'); return; }
    if (!form.priv.checked) { showErr('Acepta el aviso de privacidad.'); return; }

    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviando…';

    var payload = Object.assign({}, data, {
      nombre: nombre, whatsapp: whatsapp, email: email,
      variante: variant.toUpperCase()
    });
    // Enriquecer con tracking (definido en tracking.js)
    if (window.EssentiaTracking) {
      Object.assign(payload, window.EssentiaTracking.context());
      window.EssentiaTracking.fireLead(payload);
    }

    // Enviar al relay serverless
    fetch('/api/lead', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }).catch(function () { /* el relay reintenta; fallback localStorage en Fase 2 */ })
      .finally(function () {
        document.getElementById('done').hidden = false;
        form.querySelectorAll('.step,.cform__nav,.cform__micro,.cform__progress')
          .forEach(function (el) { el.style.display = 'none'; });
      });
  });

  render();
})();

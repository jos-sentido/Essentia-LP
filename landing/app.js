/* ===== Essentia Country LP — interacción ===== */
(function () {
  'use strict';
  document.documentElement.classList.add('js');

  // ---- A/B variant ----
  var params = new URLSearchParams(location.search);
  var variant = (params.get('v') || 'a').toLowerCase() === 'b' ? 'b' : 'a';
  document.body.dataset.variant = variant;

  // Mostrar/ocultar bloques data-ab
  document.querySelectorAll('[data-ab]').forEach(function (el) {
    el.hidden = el.getAttribute('data-ab') !== variant;
  });

  // ---- Nav stuck ----
  var nav = document.getElementById('nav');
  var onScroll = function () {
    if (window.scrollY > 40) nav.classList.add('is-stuck');
    else nav.classList.remove('is-stuck');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
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

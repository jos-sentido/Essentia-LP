/* ===== Essentia Country — tracking (LP + relay) =====
   Resuelve el problema #1 del proyecto: tracking de conversión roto.
   PLACEHOLDERS a completar en Fase 2 (implementación):
     META_PIXEL_ID   → ‹‹META_PIXEL_ID››
     GOOGLE_ADS_ID   → ‹‹GOOGLE_ADS_ID››   (formato AW-XXXXXXXXX)
     CONV_LABEL      → ‹‹CONV_LABEL››       (label de la conversión "Sitio web")
   Mientras estén como placeholder, los disparos quedan en modo "dry-run" (solo console). */
(function () {
  'use strict';
  var META_PIXEL_ID = '‹‹META_PIXEL_ID››';
  var GOOGLE_ADS_ID = '‹‹GOOGLE_ADS_ID››';
  var CONV_LABEL    = '‹‹CONV_LABEL››';
  var ready = META_PIXEL_ID.indexOf('‹‹') === -1; // true sólo cuando se reemplacen

  // --- Captura de tracking de la URL/cookies ---
  function getParam(n){ return new URLSearchParams(location.search).get(n) || ''; }
  function getCookie(n){ var m=document.cookie.match('(^|;)\\s*'+n+'\\s*=\\s*([^;]+)'); return m?m.pop():''; }
  function uuid(){ return 'e_'+Date.now().toString(36)+Math.random().toString(36).slice(2,10); }
  var eventId = uuid();

  function context(){
    return {
      event_id: eventId,
      utm_source: getParam('utm_source'), utm_medium: getParam('utm_medium'),
      utm_campaign: getParam('utm_campaign'), utm_content: getParam('utm_content'),
      utm_term: getParam('utm_term'),
      gclid: getParam('gclid'), fbclid: getParam('fbclid'),
      fbp: getCookie('_fbp'), fbc: getCookie('_fbc'),
      referrer: document.referrer, landing_url: location.href,
      user_agent: navigator.userAgent, ts: new Date().toISOString()
    };
  }

  // --- Meta Pixel (PageView) ---
  if (ready) {
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
      n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}
      (window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
    window.fbq('init', META_PIXEL_ID);
    window.fbq('track', 'PageView');

    // --- Google Ads gtag ---
    var g=document.createElement('script');g.async=true;
    g.src='https://www.googletagmanager.com/gtag/js?id='+GOOGLE_ADS_ID;
    document.head.appendChild(g);
    window.dataLayer=window.dataLayer||[];
    window.gtag=function(){window.dataLayer.push(arguments);};
    window.gtag('js', new Date());
    window.gtag('config', GOOGLE_ADS_ID);
  } else {
    console.info('[Essentia tracking] DRY-RUN — completar IDs de Pixel/Google Ads en Fase 2.');
  }

  // --- Disparo de conversión Lead (form submit) ---
  function fireLead(payload){
    if (!ready) { console.info('[Essentia tracking] Lead (dry-run):', payload.event_id); return; }
    try { window.fbq('track','Lead',{content_name:'LP '+payload.variante},{eventID:payload.event_id}); } catch(e){}
    try { window.gtag('event','conversion',{send_to:GOOGLE_ADS_ID+'/'+CONV_LABEL}); } catch(e){}
  }

  window.EssentiaTracking = { context: context, fireLead: fireLead, eventId: eventId };
})();

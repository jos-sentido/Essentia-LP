/* ===== Essentia Country — tracking (LP + relay) =====
   Resuelve el problema #1 del proyecto: tracking de conversión roto.
   IDs PÚBLICOS (van en el código; de todos modos viajan al navegador):
     META_PIXEL_ID  → activo
     GOOGLE_ADS_ID  → AW-18180488039 (activo)
     CONV_LABEL     → ‹‹CONV_LABEL››     (label de la conversión "Sitio web")
   Pixel y Google Ads se disparan de forma INDEPENDIENTE: si uno aún es placeholder,
   el otro igual funciona. El token CAPI (secreto) vive en el relay (env var). */
(function () {
  'use strict';
  var META_PIXEL_ID = '1342927834480411';
  var GOOGLE_ADS_ID = 'AW-18180488039';
  var CONV_LABEL    = 'uTldCL7TvsQcEOf2kN1D';
  var metaReady = META_PIXEL_ID.indexOf('‹‹') === -1;
  var adsReady  = GOOGLE_ADS_ID.indexOf('‹‹') === -1 && CONV_LABEL.indexOf('‹‹') === -1;

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
  if (metaReady) {
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
      n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}
      (window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
    window.fbq('init', META_PIXEL_ID);
    window.fbq('track', 'PageView');
  }

  // --- Google Ads gtag ---
  if (adsReady) {
    var g=document.createElement('script');g.async=true;
    g.src='https://www.googletagmanager.com/gtag/js?id='+GOOGLE_ADS_ID;
    document.head.appendChild(g);
    window.dataLayer=window.dataLayer||[];
    window.gtag=function(){window.dataLayer.push(arguments);};
    window.gtag('js', new Date());
    window.gtag('config', GOOGLE_ADS_ID);
  }

  if (!metaReady && !adsReady) {
    console.info('[Essentia tracking] DRY-RUN — sin IDs configurados.');
  }

  // --- Disparo de conversión Lead (form submit) ---
  function fireLead(payload){
    if (metaReady) {
      try { window.fbq('track','Lead',{content_name:'LP '+payload.variante},{eventID:payload.event_id}); } catch(e){}
    }
    if (adsReady) {
      try { window.gtag('event','conversion',{send_to:GOOGLE_ADS_ID+'/'+CONV_LABEL}); } catch(e){}
    }
    if (!metaReady && !adsReady) { console.info('[Essentia tracking] Lead (dry-run):', payload.event_id); }
  }

  window.EssentiaTracking = { context: context, fireLead: fireLead, eventId: eventId };
})();

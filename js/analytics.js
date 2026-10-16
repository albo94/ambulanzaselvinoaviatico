/* ============================================================
   ANALYTICS E CONSENSO
   ------------------------------------------------------------
   Google Analytics 4 con Consent Mode v2: finche' il visitatore
   non accetta, GA non viene nemmeno caricato e nessun cookie
   viene scritto. La scelta si ricorda in localStorage.

   Perche' il consenso serve davvero: GA scrive cookie di
   profilazione, e in Italia vanno preceduti da consenso libero,
   informato e revocabile. Senza banner il sito sarebbe
   semplicemente non conforme. Non e' una cautela in piu': e'
   la condizione perche' GA si possa usare.

   ⚠️ Questo file NON va incluso nelle pagine nascoste:
   - sciesopoli/  non deve caricare NULLA dal resto del sito
   - checklist/   e' uno strumento interno, non va tracciato
   - quiz60.html  stessa logica
   ============================================================ */
(function () {
  'use strict';

  /* ---------- configurazione ---------- */

  /* ID di misurazione GA4, formato G-XXXXXXXXXX.
     Vuoto = analytics spento: niente banner, niente cookie, niente script.
     Si prende da Google Analytics > Amministrazione > Flussi di dati. */
  var ID_GA = 'G-831DHLZPVE';

  /* dove si ricorda la scelta, e per quanto */
  var CHIAVE = 'amb-consenso';
  var MESI_VALIDITA = 6;   // dopo, si richiede: il consenso non e' per sempre

  /* ---------- niente ID, niente di niente ---------- */
  if (!ID_GA) return;

  /* ---------- memoria della scelta ---------- */

  function leggi() {
    try {
      var v = JSON.parse(localStorage.getItem(CHIAVE) || 'null');
      if (!v || !v.quando) return null;
      var mesi = (Date.now() - v.quando) / (1000 * 60 * 60 * 24 * 30);
      return mesi > MESI_VALIDITA ? null : v.scelta;
    } catch (e) { return null; }   // navigazione privata, cookie bloccati
  }

  function ricorda(scelta) {
    try { localStorage.setItem(CHIAVE, JSON.stringify({ scelta: scelta, quando: Date.now() })); }
    catch (e) { /* se non si puo' salvare, pazienza: si richiedera' */ }
  }

  /* ---------- Consent Mode v2 ----------
     Si dichiara il default PRIMA di caricare GA: cosi' anche se
     qualcosa va storto, il punto di partenza e' "negato". */

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;

  gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
    wait_for_update: 500
  });

  var caricato = false;
  function caricaGA() {
    if (caricato) return;
    caricato = true;
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(ID_GA);
    document.head.appendChild(s);
    gtag('js', new Date());
    /* IP anonimizzato: a noi servono i numeri, non le persone */
    gtag('config', ID_GA, { anonymize_ip: true });
  }

  /* Rifiutare dopo aver accettato deve togliere anche i cookie gia' scritti:
     altrimenti la revoca non revoca niente. Si cancellano provando i domini
     plausibili, perche' GA li scrive sul dominio padre. */
  function pulisciCookie() {
    var nomi = document.cookie.split(';')
      .map(function (c) { return c.split('=')[0].trim(); })
      .filter(function (n) { return n.indexOf('_ga') === 0 || n === '_gid' || n === '_gat'; });
    if (!nomi.length) return;

    var pezzi = location.hostname.split('.');
    var domini = [null];                       // senza attributo domain
    for (var i = 0; i < pezzi.length - 1; i++) {
      domini.push('.' + pezzi.slice(i).join('.'));
    }
    nomi.forEach(function (nome) {
      domini.forEach(function (d) {
        document.cookie = nome + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/' +
                          (d ? '; domain=' + d : '');
      });
    });
  }

  function rifiuta() {
    gtag('consent', 'update', {
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      analytics_storage: 'denied'
    });
    pulisciCookie();
  }

  function accetta() {
    gtag('consent', 'update', {
      ad_storage: 'denied',           // non facciamo pubblicita': resta negato
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      analytics_storage: 'granted'
    });
    caricaGA();
  }

  /* ---------- banner ---------- */

  function chiudi(el) { if (el && el.parentNode) el.parentNode.removeChild(el); }

  function mostraBanner() {
    var b = document.createElement('div');
    b.className = 'consenso';
    b.setAttribute('role', 'dialog');
    b.setAttribute('aria-live', 'polite');
    b.setAttribute('aria-label', 'Informativa sui cookie');
    b.innerHTML =
      '<div class="consenso-testo">' +
        '<strong>Cookie di statistica</strong>' +
        '<p>Vorremmo capire quante persone visitano il sito e quali pagine leggono, ' +
        'per renderlo più utile. Lo facciamo con Google Analytics, che usa cookie. ' +
        'Non raccogliamo dati sanitari e non facciamo pubblicità. ' +
        'Puoi rifiutare: il sito funziona esattamente allo stesso modo.</p>' +
      '</div>' +
      '<div class="consenso-bottoni">' +
        '<button type="button" class="btn-consenso btn-consenso--no" data-c="no">Rifiuta</button>' +
        '<button type="button" class="btn-consenso btn-consenso--si" data-c="si">Accetta</button>' +
      '</div>';
    document.body.appendChild(b);

    b.addEventListener('click', function (e) {
      var t = e.target.closest('[data-c]');
      if (!t) return;
      var si = t.dataset.c === 'si';
      ricorda(si ? 'si' : 'no');
      if (si) { accetta(); } else { rifiuta(); }
      chiudi(b);
    });
  }

  /* ---------- avvio ---------- */

  var scelta = leggi();
  if (scelta === 'si') {
    accetta();
  } else if (scelta === null) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', mostraBanner);
    } else {
      mostraBanner();
    }
  } else {
    pulisciCookie();   /* residui di un consenso precedente, o di prima del banner */
  }
  /* dopo un rifiuto non si richiede piu' fino alla scadenza */

  /* Per cambiare idea: un link con href="#cookie" in qualunque pagina
     cancella la scelta e fa ricomparire il banner. Serve perche' il
     consenso dev'essere revocabile come e' stato dato. */
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href="#cookie"]');
    if (!a) return;
    e.preventDefault();
    try { localStorage.removeItem(CHIAVE); } catch (err) {}
    if (!document.querySelector('.consenso')) mostraBanner();
  });
})();

/* ============================================================
   Dashboard statistiche – Ambulanza Selvino-Aviatico

   Renderer condiviso fra:
     - numeri.html          (pagina pubblica, dati aggregati)
     - web app Apps Script  (dashboard riservata, aggiunge mezzi e volontari)

   Nessuna dipendenza: grafici disegnati in SVG a mano, come il resto
   del sito (niente librerie né framework).

   I dati arrivano da dati/statistiche.json, rigenerato ogni notte
   dallo script "Gestione Missioni 118 - automazioni".
   ============================================================ */

var AMB_DASH = (function () {
  'use strict';

  var NS = 'http://www.w3.org/2000/svg';
  var MESI = ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu',
              'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic'];
  var COLORI = ['#E8601C', '#1a5f7a', '#1A8B3C', '#6b46c1', '#b45309', '#475569'];

  /* ── utilità ────────────────────────────────────────────── */

  function n(v) { return (v || 0).toLocaleString('it-IT'); }

  /**
   * In italiano una parola di una o due lettere non si lascia a fine riga.
   * La si incolla alla successiva con uno spazio unificatore: il testo va a
   * capo dove ha senso invece che dopo "e", "di", "il".
   */
  function testo(t) {
    var parti = String(t).split(/\s+/);
    var out = parti[0] || '';
    for (var i = 1; i < parti.length; i++) {
      var prec = parti[i - 1].replace(/[^0-9A-Za-zÀ-ÿ']/g, '');
      out += (prec.length && prec.length <= 2 ? '\u00A0' : ' ') + parti[i];
    }
    return out;
  }

  /** Larghezza utile del contenitore: i grafici disegnano a misura. */
  function largo(host) {
    var w = host.clientWidth || (host.parentNode && host.parentNode.clientWidth) || 840;
    return Math.max(300, Math.min(900, Math.round(w)));
  }

  function el(tag, attrs, testo) {
    var e = document.createElementNS(NS, tag);
    for (var k in attrs) if (attrs[k] !== null && attrs[k] !== undefined) {
      e.setAttribute(k, attrs[k]);
    }
    if (testo !== undefined) e.textContent = testo;
    return e;
  }

  function html(tag, cls, testo) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (testo !== undefined) e.textContent = testo;
    return e;
  }

  function tela(host, w, h, etichetta) {
    var s = el('svg', {
      viewBox: '0 0 ' + w + ' ' + h,
      preserveAspectRatio: 'xMidYMid meet',
      role: 'img',
      'aria-label': etichetta || ''
    });
    s.classList.add('dash-svg');
    host.appendChild(s);
    return s;
  }

  /** Passo "tondo" per la scala: 1, 2, 5 × potenza di 10. */
  function passo(max, righe) {
    var grezzo = max / righe;
    var mag = Math.pow(10, Math.floor(Math.log(grezzo) / Math.LN10));
    var norm = grezzo / mag;
    var m = norm <= 1 ? 1 : norm <= 2 ? 2 : norm <= 5 ? 5 : 10;
    return m * mag;
  }

  /**
   * Margine sinistro abbastanza largo per l'etichetta piu' lunga dell'asse:
   * con un margine fisso "20.000" veniva tagliato su telefono.
   */
  function margineAsse(max, formato, minimo) {
    var p = passo(max || 1, 4), cima = Math.ceil((max || 1) / p) * p;
    var t = formato ? formato(cima) : n(Math.round(cima));
    return Math.max(minimo, Math.round(String(t).length * 7 + 14));
  }

  function scalaY(g, max, x0, x1, y0, y1, formato) {
    var righe = 4;
    var p = passo(max || 1, righe);
    var cima = Math.ceil((max || 1) / p) * p;
    for (var v = 0; v <= cima + 0.0001; v += p) {
      var y = y1 - (v / cima) * (y1 - y0);
      g.appendChild(el('line', {
        x1: x0, x2: x1, y1: y, y2: y,
        stroke: v === 0 ? '#c9d2da' : '#eceff2', 'stroke-width': 1
      }));
      g.appendChild(el('text', {
        x: x0 - 8, y: y + 4, 'text-anchor': 'end', class: 'dash-tick'
      }, formato ? formato(v) : n(Math.round(v))));
    }
    return cima;
  }

  function legenda(host, serie) {
    if (serie.length < 2) return;
    var l = html('div', 'dash-legenda');
    serie.forEach(function (s, i) {
      var v = html('span', 'dash-legenda-voce');
      var p = html('i');
      p.style.background = s.colore || COLORI[i % COLORI.length];
      v.appendChild(p);
      v.appendChild(document.createTextNode(s.nome));
      l.appendChild(v);
    });
    host.appendChild(l);
  }

  /* ── grafico a colonne (una o più serie affiancate) ─────── */

  function colonne(host, o) {
    host.innerHTML = '';
    legenda(host, o.serie);
    var W = largo(host), stretto = W < 520;
    var H = o.altezza || (stretto ? 260 : 320);
    var max = 0;
    o.serie.forEach(function (se) {
      se.valori.forEach(function (v) { if (v > max) max = v; });
    });
    var ml = margineAsse(max, o.formatoAsse, stretto ? 40 : 54), mr = 14, mt = 14, mb = 34;
    var s = tela(host, W, H, o.etichetta);
    var x0 = ml, x1 = W - mr, y0 = mt, y1 = H - mb;

    var cima = scalaY(s, max, x0, x1, y0, y1, o.formatoAsse);

    var nCat = o.etichette.length;
    var larghCat = (x1 - x0) / nCat;
    // su schermo stretto le etichette si sovrappongono: ne mostro una sì e una no
    var saltaEtichette = stretto && nCat > 6 ? 2 : 1;
    var pad = larghCat * 0.18;
    var larghBarra = (larghCat - pad * 2) / o.serie.length;

    o.etichette.forEach(function (etichetta, i) {
      var cx = x0 + larghCat * i;
      if (i % saltaEtichette === 0) {
        s.appendChild(el('text', {
          x: cx + larghCat / 2, y: y1 + 20, 'text-anchor': 'middle', class: 'dash-tick'
        }, etichetta));
      }

      o.serie.forEach(function (se, j) {
        var v = se.valori[i] || 0;
        var h = cima ? (v / cima) * (y1 - y0) : 0;
        var bx = cx + pad + larghBarra * j;
        var r = el('rect', {
          x: bx, y: y1 - h, width: Math.max(larghBarra - 2, 1), height: Math.max(h, 0),
          rx: 3, fill: se.colore || COLORI[j % COLORI.length],
          opacity: se.tenue ? 0.45 : 1
        });
        r.appendChild(el('title', {}, se.nome + ' · ' + etichetta + ': ' + n(v)));
        s.appendChild(r);
      });
    });
    return s;
  }

  /* ── grafico a linee ────────────────────────────────────── */

  function linee(host, o) {
    host.innerHTML = '';
    legenda(host, o.serie);
    var W = largo(host), stretto = W < 520;
    var H = o.altezza || (stretto ? 260 : 320);
    var max = 0;
    o.serie.forEach(function (se) {
      se.valori.forEach(function (v) { if (v !== null && v > max) max = v; });
    });
    var ml = margineAsse(max, o.formatoAsse, stretto ? 40 : 54), mr = 14, mt = 14, mb = 34;
    var s = tela(host, W, H, o.etichetta);
    var x0 = ml, x1 = W - mr, y0 = mt, y1 = H - mb;

    var cima = scalaY(s, max, x0, x1, y0, y1, o.formatoAsse);

    var nCat = o.etichette.length;
    var passoX = nCat > 1 ? (x1 - x0) / (nCat - 1) : 0;
    var salta = stretto && nCat > 6 ? 2 : 1;

    o.etichette.forEach(function (etichetta, i) {
      if (i % salta) return;
      s.appendChild(el('text', {
        x: x0 + passoX * i, y: y1 + 20, 'text-anchor': 'middle', class: 'dash-tick'
      }, etichetta));
    });

    o.serie.forEach(function (se, j) {
      var colore = se.colore || COLORI[j % COLORI.length];
      var punti = [];
      se.valori.forEach(function (v, i) {
        if (v === null || v === undefined) return;
        punti.push([x0 + passoX * i, y1 - (cima ? (v / cima) * (y1 - y0) : 0), i]);
      });
      if (!punti.length) return;
      s.appendChild(el('polyline', {
        points: punti.map(function (p) { return p[0] + ',' + p[1]; }).join(' '),
        fill: 'none', stroke: colore, 'stroke-width': 2.5,
        'stroke-linejoin': 'round', 'stroke-linecap': 'round'
      }));
      punti.forEach(function (p) {
        // p[2] = indice del mese: con valori mancanti non coincide con la posizione in `punti`
        var i = p[2];
        var c = el('circle', { cx: p[0], cy: p[1], r: 4, fill: '#fff',
                               stroke: colore, 'stroke-width': 2.5 });
        c.appendChild(el('title', {}, se.nome + ' · ' + o.etichette[i] + ': ' +
          (o.formatoAsse ? o.formatoAsse(se.valori[i]) : n(se.valori[i]))));
        s.appendChild(c);
      });
    });
    return s;
  }

  /* ── barre orizzontali ──────────────────────────────────── */

  function barre(host, o) {
    host.innerHTML = '';
    var voci = o.voci.slice(0, o.limite || 12);
    var W = largo(host), riga = 30, mt = 10, mb = 8;
    var H = mt + mb + riga * voci.length;
    // l'etichetta non può prendersi mezzo grafico su telefono
    var ml = Math.min(o.larghezzaEtichette || 150, Math.round(W * 0.38));
    // spazio a destra per il testo piu' lungo in fondo alle barre: con un margine
    // fisso "19.296 h · il minimo" usciva dal grafico su telefono
    var mr = W < 520 ? 48 : 60;
    voci.forEach(function (v) {
      var t = v.testo || (o.formato ? o.formato(v.valore) : n(v.valore));
      mr = Math.max(mr, Math.round(String(t).length * 6.8 + 14));
    });
    var maxCar = Math.max(6, Math.floor((ml - 12) / 6.6));
    var s = tela(host, W, H, o.etichetta);
    var max = 0;
    voci.forEach(function (v) { if (v.valore > max) max = v.valore; });

    voci.forEach(function (v, i) {
      var y = mt + riga * i;
      var nome = v.nome.length > maxCar ? v.nome.slice(0, maxCar - 1) + '…' : v.nome;
      var et = el('text', {
        x: ml - 10, y: y + riga / 2 + 4, 'text-anchor': 'end', class: 'dash-tick-forte'
      }, nome);
      if (nome !== v.nome) et.appendChild(el('title', {}, v.nome));
      s.appendChild(et);
      var w = max ? (v.valore / max) * (W - ml - mr) : 0;
      var r = el('rect', {
        x: ml, y: y + 5, width: Math.max(w, 1), height: riga - 12, rx: 3,
        fill: v.colore || o.colore || COLORI[0]
      });
      r.appendChild(el('title', {}, v.nome + ': ' + n(v.valore)));
      s.appendChild(r);
      s.appendChild(el('text', {
        x: ml + w + 8, y: y + riga / 2 + 4, class: 'dash-tick-forte'
      }, v.testo || (o.formato ? o.formato(v.valore) : n(v.valore))));
    });
    return s;
  }

  /* ── ciambella ──────────────────────────────────────────── */

  function ciambella(host, o) {
    host.innerHTML = '';
    var W = largo(host), stretto = W < 560;
    var R = stretto ? Math.min(100, W / 3.4) : 125, r = R * 0.59;
    var cx = stretto ? W / 2 : 190;
    var cy = stretto ? R + 16 : 170;
    var legX = stretto ? 20 : 400;
    var legY = stretto ? cy + R + 32 : 46;
    var H = stretto ? (cy + R + 32 + o.voci.length * 26) : 340;
    var s = tela(host, W, H, o.etichetta);
    var tot = o.voci.reduce(function (a, v) { return a + v.valore; }, 0);
    if (!tot) return s;

    var ang = -Math.PI / 2;
    o.voci.forEach(function (v, i) {
      var fetta = (v.valore / tot) * Math.PI * 2;
      var a1 = ang, a2 = ang + fetta;
      ang = a2;
      var grande = fetta > Math.PI ? 1 : 0;
      var d = [
        'M', cx + R * Math.cos(a1), cy + R * Math.sin(a1),
        'A', R, R, 0, grande, 1, cx + R * Math.cos(a2), cy + R * Math.sin(a2),
        'L', cx + r * Math.cos(a2), cy + r * Math.sin(a2),
        'A', r, r, 0, grande, 0, cx + r * Math.cos(a1), cy + r * Math.sin(a1),
        'Z'
      ].join(' ');
      var p = el('path', { d: d, fill: COLORI[i % COLORI.length], stroke: '#fff', 'stroke-width': 2 });
      p.appendChild(el('title', {}, v.nome + ': ' + n(v.valore) +
        ' (' + Math.round(v.valore / tot * 100) + '%)'));
      s.appendChild(p);

      var y = legY + i * 26;
      s.appendChild(el('rect', { x: legX, y: y - 11, width: 13, height: 13, rx: 3,
                                 fill: COLORI[i % COLORI.length] }));
      s.appendChild(el('text', { x: legX + 22, y: y, class: 'dash-tick-forte' }, v.nome));
      s.appendChild(el('text', { x: W - 20, y: y, class: 'dash-tick', 'text-anchor': 'end' },
        n(v.valore) + '  ·  ' + Math.round(v.valore / tot * 100) + '%'));
    });

    s.appendChild(el('text', { x: cx, y: cy - 4, 'text-anchor': 'middle', class: 'dash-donut-num' },
      n(tot)));
    s.appendChild(el('text', { x: cx, y: cy + 18, 'text-anchor': 'middle', class: 'dash-tick' },
      o.sottotitolo || ''));
    return s;
  }

  /* ── blocchi di pagina ──────────────────────────────────── */

  function scheda(titolo, sottotitolo) {
    var c = html('section', 'dash-card');
    var h = html('div', 'dash-card-head');
    h.appendChild(html('h3', null, testo(titolo)));
    if (sottotitolo) h.appendChild(html('p', null, testo(sottotitolo)));
    c.appendChild(h);
    var corpo = html('div', 'dash-card-body');
    c.appendChild(corpo);
    c.corpo = corpo;
    return c;
  }

  function kpi(voci) {
    var g = html('div', 'dash-kpi-grid');
    voci.forEach(function (v) {
      var c = html('div', 'dash-kpi');
      c.appendChild(html('span', 'dash-kpi-label', testo(v.label)));
      c.appendChild(html('span', 'dash-kpi-num', v.valore));
      if (v.nota) {
        var nn = html('span', 'dash-kpi-nota' + (v.segno ? ' ' + v.segno : ''), v.nota);
        c.appendChild(nn);
      }
      g.appendChild(c);
    });
    return g;
  }

  /* ── tabella ordinabile e filtrabile ────────────────────── */

  /**
   * @param colonne  [{ testo, chiave, numerica }]
   * @param dati     array di oggetti
   * @param opzioni  { filtroTesto: 'chiave', gruppi: [{valore, testo}], ordine: 'chiave' }
   */
  function tabellaOrdinabile(colonne, dati, opzioni) {
    opzioni = opzioni || {};
    var wrap = html('div', 'dash-tab-blocco');
    var stato = { chiave: opzioni.ordine || colonne[0].chiave, crescente: false,
                  testo: '', gruppo: '' };

    // barra degli strumenti
    var barra = html('div', 'dash-toolbar');
    if (opzioni.filtroTesto) {
      var cerca = document.createElement('input');
      cerca.type = 'search';
      cerca.className = 'dash-cerca';
      cerca.placeholder = 'Cerca nome…';
      cerca.setAttribute('aria-label', 'Cerca per nome');
      cerca.addEventListener('input', function () {
        stato.testo = this.value.trim().toLowerCase();
        disegna();
      });
      barra.appendChild(cerca);
    }
    if (opzioni.gruppi && opzioni.gruppi.length > 1) {
      var sel = document.createElement('select');
      sel.className = 'dash-filtro';
      sel.setAttribute('aria-label', 'Filtra per tipo');
      var tutti = document.createElement('option');
      tutti.value = ''; tutti.textContent = 'Tutti i tipi';
      sel.appendChild(tutti);
      opzioni.gruppi.forEach(function (g) {
        var o = document.createElement('option');
        o.value = g.valore; o.textContent = g.testo;
        sel.appendChild(o);
      });
      sel.addEventListener('change', function () { stato.gruppo = this.value; disegna(); });
      barra.appendChild(sel);
    }
    var conteggio = html('span', 'dash-conteggio');
    barra.appendChild(conteggio);
    wrap.appendChild(barra);

    // tabella
    var scroll = html('div', 'dash-tabella-wrap');
    var t = html('table', 'dash-tabella');
    var thead = html('thead'), trh = html('tr');
    colonne.forEach(function (c) {
      var th = html('th', 'dash-ord');
      th.tabIndex = 0;
      th.setAttribute('role', 'button');
      th.appendChild(document.createTextNode(c.testo));
      th.appendChild(html('span', 'dash-freccia'));
      function ordina() {
        if (stato.chiave === c.chiave) stato.crescente = !stato.crescente;
        else { stato.chiave = c.chiave; stato.crescente = !c.numerica; }
        disegna();
      }
      th.addEventListener('click', ordina);
      th.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); ordina(); }
      });
      th._col = c;
      trh.appendChild(th);
    });
    thead.appendChild(trh); t.appendChild(thead);
    var tb = html('tbody'); t.appendChild(tb);
    scroll.appendChild(t); wrap.appendChild(scroll);

    function disegna() {
      var righe = dati.filter(function (r) {
        if (stato.gruppo && r._gruppo !== stato.gruppo) return false;
        if (stato.testo && opzioni.filtroTesto) {
          return String(r[opzioni.filtroTesto]).toLowerCase().indexOf(stato.testo) >= 0;
        }
        return true;
      });
      var col = null;
      colonne.forEach(function (c) { if (c.chiave === stato.chiave) col = c; });
      righe.sort(function (a, b) {
        var x = a[stato.chiave], y = b[stato.chiave];
        var d = col && col.numerica ? (x - y) : String(x).localeCompare(String(y), 'it');
        return stato.crescente ? d : -d;
      });

      tb.innerHTML = '';
      righe.forEach(function (r) {
        var tr = html('tr');
        colonne.forEach(function (c) {
          var v = r[c.chiave];
          tr.appendChild(html('td', c.numerica ? null : 'dash-td-nome',
                              c.numerica ? n(v) : String(v)));
        });
        tb.appendChild(tr);
      });
      if (!righe.length) {
        var tr = html('tr');
        var td = html('td', 'dash-vuoto', 'Nessun risultato.');
        td.colSpan = colonne.length;
        tr.appendChild(td); tb.appendChild(tr);
      }
      conteggio.textContent = righe.length + (righe.length === 1 ? ' persona' : ' persone');
      Array.prototype.forEach.call(thead.querySelectorAll('th'), function (th) {
        var attiva = th._col.chiave === stato.chiave;
        th.classList.toggle('attiva', attiva);
        th.setAttribute('aria-sort', attiva ? (stato.crescente ? 'ascending' : 'descending') : 'none');
        th.querySelector('.dash-freccia').textContent = attiva ? (stato.crescente ? '▲' : '▼') : '';
      });
    }

    disegna();
    return wrap;
  }

  /**
   * Striscia con data e ora dell'ultimo aggiornamento.
   * Se i dati sono fermi da piu' di 36 ore diventa ambra: l'aggiornamento
   * notturno gira alle 2, quindi oltre quella soglia una notte e' saltata.
   */
  /**
   * Quando il giro notturno avrebbe dovuto girare l'ultima volta.
   * Gira alle 2; si lascia un'ora e mezza di margine prima di dire che ha
   * saltato, cosi' chi apre la pagina alle 2:20 non vede un falso allarme.
   */
  function ultimoGiroPrevisto() {
    var t = new Date();
    var oggi = new Date(t.getFullYear(), t.getMonth(), t.getDate(), 2, 0, 0);
    if (t.getHours() < 3 || (t.getHours() === 3 && t.getMinutes() < 30)) {
      oggi.setDate(oggi.getDate() - 1);
    }
    return oggi;
  }

  function quandoTesto(d) {
    return d.toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' }) +
           ' alle ' + d.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' });
  }

  /**
   * La striscia dello stato. Le due pagine hanno orologi diversi e vanno dette
   * in modo diverso:
   *   - pubblica: legge un file riscritto ogni notte, il suo orario E' la salute
   *     dell'automazione
   *   - riservata: e' calcolata al momento in cui la apri, quindi il suo orario
   *     dice solo che ora e'. La salute la dice `pubblicato`, l'ultima volta che
   *     il giro notturno e' arrivato in fondo
   */
  function strisciaAggiornamento(dati) {
    var d = new Date(dati.aggiornato);
    var box = html('div', 'dash-stato');

    if (isNaN(d.getTime())) {
      box.classList.add('vecchio');
      box.appendChild(html('span', 'dash-stato-testo', 'Data di aggiornamento non disponibile.'));
      return box;
    }

    var etichetta = html('span', 'dash-stato-testo');
    var riferimento = d;

    if (dati.tempoReale) {
      etichetta.appendChild(html('strong', null, 'Calcolato adesso: '));
      etichetta.appendChild(document.createTextNode(quandoTesto(d)));
      box.appendChild(etichetta);
      // qui l'orario non e' un segnale: questa pagina rifa' i conti ogni volta
      riferimento = dati.pubblicato ? new Date(dati.pubblicato) : null;
      if (riferimento && !isNaN(riferimento.getTime())) {
        box.appendChild(html('span', 'dash-stato-nota',
          'ultimo giro notturno ' + quandoTesto(riferimento)));
      }
    } else {
      etichetta.appendChild(html('strong', null, 'Ultimo aggiornamento: '));
      etichetta.appendChild(document.createTextNode(quandoTesto(d)));
      box.appendChild(etichetta);
    }

    // Saltata una notte = qualcosa non gira. La soglia non e' "36 ore fa" ma
    // "prima dell'ultimo giro previsto": cosi' una notte persa si vede subito
    // invece che il giorno dopo ancora.
    var atteso = ultimoGiroPrevisto();
    if (!riferimento || isNaN(riferimento.getTime())) {
      box.classList.add('vecchio');
      box.appendChild(html('span', 'dash-stato-avviso',
        'il giro notturno non risulta mai arrivato in fondo'));
      return box;
    }
    if (riferimento < atteso) {
      box.classList.add('vecchio');
      var notti = Math.max(1, Math.round((atteso - riferimento) / 86400000));
      box.appendChild(html('span', 'dash-stato-avviso',
        notti === 1 ? 'ha saltato la notte scorsa: qualcosa non gira'
                    : ('ha saltato ' + notti + ' notti: qualcosa non gira')));
    } else {
      box.classList.add('fresco');
      box.appendChild(html('span', 'dash-stato-ok', 'aggiornato'));
    }
    return box;
  }

  /* ── composizione: parte comune (pubblica) ──────────────── */

  function montaComune(root, d) {
    var annoCorr = d.annoCorrente;
    var ultimo = d.missioni[d.missioni.length - 1];
    var oreUlt = d.oreMesi.length ? d.oreMesi[d.oreMesi.length - 1] : null;
    var kmUlt = d.km[d.km.length - 1];

    // KPI
    var voci = [
      { label: 'Missioni 118 nel ' + annoCorr, valore: n(ultimo.totale),
        nota: 'al ' + (d.confronto ? d.confronto.giorno + ' ' + MESI[d.confronto.finoAMese - 1].toLowerCase() : 'oggi') }
    ];
    if (d.confronto) {
      var dm = d.confronto.missioni.corr - d.confronto.missioni.prec;
      var pm = d.confronto.missioni.prec
        ? Math.round(dm / d.confronto.missioni.prec * 1000) / 10 : 0;
      voci.push({ label: 'Rispetto allo stesso periodo ' + (annoCorr - 1),
                  valore: (dm >= 0 ? '+' : '−') + Math.abs(dm),
                  nota: (dm >= 0 ? '+' : '−') + Math.abs(pm) + '%',
                  segno: dm >= 0 ? 'su' : 'giu' });
    }
    var emerg = null;
    (d.oreEmergenza || []).forEach(function (e) { if (e.anno === annoCorr) emerg = e; });
    if (oreUlt || emerg) {
      var oreExtra = oreUlt ? oreUlt.totale : 0;
      var oreEm = emerg ? emerg.ore : 0;
      voci.push({ label: 'Ore di volontariato ' + annoCorr, valore: n(oreEm + oreExtra),
                  nota: emerg
                    ? (n(oreEm) + ' di turno + ' + n(oreExtra) + ' di attività, già svolte')
                    : 'attività fuori emergenza' });
    }
    if (oreUlt && oreUlt.totale) {
      voci.push({ label: "Di cui oltre l'emergenza", valore: n(oreUlt.totale),
                  nota: 'manifestazioni, presidi, formazione' });
    }
    if (kmUlt && kmUlt.km) {
      voci.push({ label: 'Km percorsi in convenzione', valore: n(kmUlt.km),
                  nota: 'anno ' + annoCorr });
    }
    root.appendChild(kpi(voci));

    // missioni per anno
    var c1 = scheda('Missioni per anno',
      'Interventi di emergenza-urgenza. L\'anno in corso è parziale.');
    root.appendChild(c1);
    colonne(c1.corpo, {
      etichette: d.missioni.map(function (m) { return String(m.anno); }),
      serie: [{ nome: 'Missioni 118',
                valori: d.missioni.map(function (m) { return m.totale; }),
                colore: COLORI[0] }],
      etichetta: 'Missioni per anno'
    });

    // stagionalità
    var ultimi = d.missioni.slice(-3);
    var c2 = scheda('Come si distribuiscono nell\'anno',
      'Luglio e agosto valgono da soli circa un terzo degli interventi: è il periodo turistico dell\'Altopiano.');
    root.appendChild(c2);
    colonne(c2.corpo, {
      etichette: MESI,
      serie: ultimi.map(function (m, i) {
        return { nome: String(m.anno), valori: m.mesi,
                 colore: COLORI[ultimi.length - 1 - i],
                 tenue: i < ultimi.length - 1 };
      }),
      etichetta: 'Missioni per mese'
    });

    // comuni
    var idx = d.anni.indexOf(annoCorr);
    var vociCom = d.comuni.map(function (r) {
      return { nome: r.comune, valore: r.valori[idx] || 0 };
    }).filter(function (v) { return v.valore > 0; });
    var top = vociCom.slice(0, 6);
    var resto = vociCom.slice(6).reduce(function (a, v) { return a + v.valore; }, 0);
    if (resto) top.push({ nome: 'Altri comuni', valore: resto });
    var c3 = scheda('Dove interveniamo', 'Comuni serviti nel ' + annoCorr + '.');
    root.appendChild(c3);
    ciambella(c3.corpo, { voci: top, sottotitolo: 'interventi ' + annoCorr,
                          etichetta: 'Interventi per comune' });

    // quota altopiano
    var c4 = scheda('Quanto usciamo dall\'Altopiano',
      'Quota di interventi in Selvino e Aviatico sul totale: il resto sono uscite a supporto dei comuni vicini.');
    root.appendChild(c4);
    linee(c4.corpo, {
      etichette: d.altopiano.map(function (a) { return String(a.anno); }),
      serie: [{ nome: 'Selvino + Aviatico',
                valori: d.altopiano.map(function (a) {
                  return a.quota === null ? null : Math.round(a.quota * 1000) / 10;
                }), colore: COLORI[1] }],
      formatoAsse: function (v) { return Math.round(v) + '%'; },
      etichetta: 'Quota Altopiano'
    });

    // Le ore di turno sono un ordine di grandezza sopra le altre: nello stesso
    // grafico le attività si riducono a un trattino. Due schede, due scale.
    if (d.tipologie.length) {
      var ultimoIdx = d.anniExtra.length - 1;
      var vociExtra = d.tipologie.map(function (t) {
        return { nome: t.tipo, valore: t.valori[ultimoIdx] || 0 };
      }).filter(function (v) { return v.valore > 0; });
      var totExtra = vociExtra.reduce(function (a, v) { return a + v.valore; }, 0);

      var c5 = scheda("Le ore oltre l'emergenza",
        n(totExtra) + ' ore nel ' + annoCorr + ' che non hanno a che fare con le chiamate ' +
        'del 118: assistenza alle manifestazioni, trasporti programmati, presidio del ' +
        'territorio con controlli gratuiti, formazione nelle scuole e alla cittadinanza, ' +
        "e il lavoro amministrativo che tiene in piedi l'associazione.");
      root.appendChild(c5);
      barre(c5.corpo, {
        voci: vociExtra,
        colore: COLORI[2],
        formato: function (v) { return n(v) + ' h'; },
        larghezzaEtichette: 175,
        etichetta: 'Ore per tipo di attività'
      });
    }

    if (emerg && emerg.ore) {
      // Il metro giusto per le ore di turno non sono le altre attività, ma la
      // copertura da garantire: un equipaggio di tre persone, 24 ore al giorno.
      //
      // Il periodo è quello dei turni GIÀ FATTI, non l'anno intero: sul
      // tabellone i mesi avanti sono compilati a metà, e i volontari si segnano
      // con mesi di anticipo mentre i dipendenti entrano sotto data. Mettere
      // mezzo anno di turni contro il fabbisogno di dodici mesi faceva sembrare
      // scoperto un periodo che scoperto non è.
      var interoAnno = new Date(annoCorr, 1, 29).getMonth() === 1 ? 366 : 365;
      var giorni = emerg.giorni || interoAnno;
      var parziale = giorni < interoAnno;
      var fabbisogno = 24 * 3 * giorni;
      var oreTutte = emerg.oreTutti || emerg.ore;
      var oreDip = Math.max(oreTutte - emerg.ore, 0);
      // Le percentuali dividono le ore davvero coperte, e fanno 100: dire
      // "72% + 54%" costringeva a chiedersi rispetto a cosa. Il confronto con
      // il minimo H24 resta, ma in una frase, dove si può spiegare.
      var coperte = emerg.ore + oreDip;
      var pctVol = coperte ? Math.round(emerg.ore / coperte * 100) : 0;
      var pctDip = coperte ? 100 - pctVol : 0;
      var sulMinimo = fabbisogno ? Math.round(coperte / fabbisogno * 100) : 0;

      var periodo = parziale
        ? 'Nei primi ' + giorni + ' giorni del ' + annoCorr + ', garantire'
        : 'Nel ' + annoCorr + ', garantire';

      var c6 = scheda('Le ore di turno e la copertura H24',
        periodo + ' l\'ambulanza 24 ore su 24 con un equipaggio di tre persone ha ' +
        'voluto dire ' + n(fabbisogno) + ' ore di turno. Ne sono state coperte ' +
        n(coperte) + ', il ' + sulMinimo + '% del minimo: su un turno c\'è spesso ' +
        'più gente di tre. Le percentuali qui sotto dividono quelle ' + n(coperte) +
        ' ore fra chi le ha fatte. Sono ore davvero svolte: i turni futuri già ' +
        'prenotati a tabellone non sono contati.');
      root.appendChild(c6);
      barre(c6.corpo, {
        voci: [
          { nome: 'Serve per l\'H24', valore: fabbisogno, colore: '#c8d2de',
            testo: n(fabbisogno) + ' h · il minimo' },
          { nome: 'Coperte dai volontari', valore: emerg.ore, colore: COLORI[0],
            testo: n(emerg.ore) + ' h · ' + pctVol + '%' },
          { nome: 'Coperte dai dipendenti', valore: oreDip, colore: COLORI[1],
            testo: n(oreDip) + ' h · ' + pctDip + '%' }
        ],
        larghezzaEtichette: 195,
        etichetta: 'Copertura H24'
      });
    }
  }

  /* ── composizione: parte riservata ──────────────────────── */

  // L'elenco dei tipi di personale NON sta qui: arriva nel payload come
  // d.tipiPersonale, generato da 05_tipi.gs nell'Apps Script. È la stessa
  // tabella che genera il menu a tendina del foglio, così non ci sono due
  // liste da tenere allineate. Qui restano solo i valori di ripiego, usati
  // se il payload è più vecchio del codice.
  var TIPI_RIPIEGO = [
    { chiave: 'dipendente', etichetta: 'Dipendenti', colore: COLORI[1] },
    { chiave: 'volontario', etichetta: 'Volontari',  colore: COLORI[0] }
  ];

  function tipoChiave(t) {
    return String(t || '').trim().toLowerCase().replace(/\s+/g, ' ');
  }

  /** Titolo leggibile di un gruppo; se non è in elenco usa il valore del foglio. */
  function etichettaGruppo(chiave, elenco, esempio) {
    for (var i = 0; i < elenco.length; i++) {
      if (elenco[i].chiave === chiave) return elenco[i].etichetta;
    }
    if (esempio) return esempio;
    return chiave ? chiave.charAt(0).toUpperCase() + chiave.slice(1) : 'Senza tipo';
  }

  /* ── tempi di partenza (solo riservata) ─────────────────── */

  /** 3.4 minuti -> "3:24". */
  function mmss(min) {
    if (min === null || min === undefined) return '–';
    var s = Math.round(min * 60);
    return Math.floor(s / 60) + ':' + ('0' + (s % 60)).slice(-2);
  }

  /** Nota del confronto primi/ultimi mesi: scendere è un miglioramento. */
  function notaConfronto(c, fascia) {
    if (!c || !c[fascia].prima.n || !c[fascia].dopo.n) return {};
    var da = c[fascia].prima.mediana, a = c[fascia].dopo.mediana;
    var diff = a - da;
    var periodo = function (m) { return MESI[m[0] - 1] + (m.length > 1 ? '–' + MESI[m[m.length - 1] - 1] : ''); };
    // sotto le 20 partenze per periodo la differenza puo' essere solo caso:
    // la si scrive, ma senza il colore che la fa sembrare un risultato
    var pochi = Math.min(c[fascia].prima.n, c[fascia].dopo.n) < 20;
    return {
      nota: periodo(c.primi) + ' ' + mmss(da) + ' → ' + periodo(c.ultimi) + ' ' + mmss(a) +
            (Math.abs(diff) >= 1 / 60 ? ' (' + (diff < 0 ? '−' : '+') + mmss(Math.abs(diff)) + ')' : '') +
            (pochi ? ' · pochi dati' : ''),
      // per un tempo, scendere è la buona notizia: verde se cala, rosso se cresce
      segno: pochi ? null : diff < 0 ? 'su' : diff > 0 ? 'giu' : null
    };
  }

  /**
   * Boxplot orizzontali su un asse comune.
   * @param o { voci: [{ nome, colore, s: {n, min, q1, mediana, q3, max, fuori: []} }],
   *            formato, etichetta }
   */
  function scatole(host, o) {
    host.innerHTML = '';
    var voci = o.voci.filter(function (v) { return v.s && v.s.n; });
    if (!voci.length) return null;
    var fmt = o.formato || n;
    var W = largo(host), stretto = W < 520;
    var ml = stretto ? 96 : 110, mr = 18, mt = 10, riga = stretto ? 92 : 84, mb = 30;
    var H = mt + riga * voci.length + mb;
    var s = tela(host, W, H, o.etichetta);
    var x0 = ml, x1 = W - mr, y1 = mt + riga * voci.length;

    var max = 0;
    voci.forEach(function (v) {
      max = Math.max(max, v.s.max, (v.s.fuori || []).reduce(function (a, x) { return Math.max(a, x); }, 0));
    });
    var p = passo(max || 1, stretto ? 4 : 8), cima = Math.ceil((max || 1) / p) * p;
    var X = function (v) { return x0 + (v / cima) * (x1 - x0); };

    for (var t = 0; t <= cima + 0.0001; t += p) {
      s.appendChild(el('line', { x1: X(t), x2: X(t), y1: mt, y2: y1,
                                 stroke: t === 0 ? '#c9d2da' : '#eceff2', 'stroke-width': 1 }));
      s.appendChild(el('text', { x: X(t), y: y1 + 20, 'text-anchor': 'middle', class: 'dash-tick' }, fmt(t)));
    }

    voci.forEach(function (v, i) {
      var st = v.s, colore = v.colore || COLORI[i % COLORI.length];
      var cy = mt + riga * i + riga * 0.42, alto = 26;
      s.appendChild(el('text', { x: ml - 12, y: cy - 2, 'text-anchor': 'end', class: 'dash-tick-forte' }, v.nome));
      s.appendChild(el('text', { x: ml - 12, y: cy + 15, 'text-anchor': 'end', class: 'dash-tick' },
        n(st.n) + ' partenze'));

      // baffi
      s.appendChild(el('line', { x1: X(st.min), x2: X(st.q1), y1: cy, y2: cy, stroke: colore, 'stroke-width': 1.5 }));
      s.appendChild(el('line', { x1: X(st.q3), x2: X(st.max), y1: cy, y2: cy, stroke: colore, 'stroke-width': 1.5 }));
      [st.min, st.max].forEach(function (x) {
        s.appendChild(el('line', { x1: X(x), x2: X(x), y1: cy - alto / 4, y2: cy + alto / 4,
                                   stroke: colore, 'stroke-width': 1.5 }));
      });
      // scatola Q1–Q3 e mediana
      var box = el('rect', { x: X(st.q1), y: cy - alto / 2, width: Math.max(X(st.q3) - X(st.q1), 1),
                             height: alto, rx: 3, fill: colore, 'fill-opacity': 0.18,
                             stroke: colore, 'stroke-width': 1.5 });
      box.appendChild(el('title', {}, v.nome + ' – metà centrale delle partenze: da ' +
        fmt(st.q1) + ' a ' + fmt(st.q3) + ', mediana ' + fmt(st.mediana)));
      s.appendChild(box);
      s.appendChild(el('line', { x1: X(st.mediana), x2: X(st.mediana), y1: cy - alto / 2, y2: cy + alto / 2,
                                 stroke: colore, 'stroke-width': 3.5 }));
      // valori anomali
      (st.fuori || []).forEach(function (x) {
        var c = el('circle', { cx: X(x), cy: cy, r: 3.5, fill: '#fff', stroke: colore, 'stroke-width': 1.5 });
        c.appendChild(el('title', {}, v.nome + ' – partenza anomala: ' + fmt(x)));
        s.appendChild(c);
      });
      // i numeri in una riga di testo sotto la scatola: scritti sopra l'asse si
      // accavallano appena il grafico si stringe
      s.appendChild(el('text', { x: stretto ? 8 : x0, y: cy + alto / 2 + 20, class: 'dash-tick' },
        'mediana ' + fmt(st.mediana) + ' · metà centrale ' + fmt(st.q1) + '–' + fmt(st.q3)));
    });
    return s;
  }

  function montaTempi(root, tp, anno) {
    var notte = tp.notte || [20, 6];
    var c = scheda('Tempo di partenza – ' + anno,
      'Minuti dall\'attivazione della centrale alla partenza del mezzo, missioni 118. ' +
      'Notte = dalle ' + notte[0] + ' alle ' + notte[1] + '. Mediana: metà delle partenze è ' +
      'più rapida di così. 9 su 10: il tempo entro cui parte il 90% delle missioni. ' +
      'Il dato si registra da febbraio-marzo ' + anno + '.');
    root.appendChild(c);

    var cg = notaConfronto(tp.confronto, 'giorno');
    var cn = notaConfronto(tp.confronto, 'notte');
    c.corpo.appendChild(kpi([
      { label: 'Di giorno, mediana', valore: mmss(tp.anno.giorno.mediana),
        nota: cg.nota || (tp.anno.giorno.n + ' partenze'), segno: cg.segno },
      { label: 'Di notte, mediana', valore: mmss(tp.anno.notte.mediana),
        nota: cn.nota || (tp.anno.notte.n + ' partenze'), segno: cn.segno },
      { label: '9 su 10 partono entro', valore: mmss(tp.anno.giorno.p90),
        nota: 'di giorno · di notte ' + mmss(tp.anno.notte.p90) }
    ]));

    // mesi dal primo con dati all'ultimo: i mesi vuoti prima dell'avvio non si disegnano
    var primo = tp.mesi[0].mese, ultimo = tp.mesi[tp.mesi.length - 1].mese;
    var perMese = {};
    tp.mesi.forEach(function (m) { perMese[m.mese] = m; });
    var etichette = [], serie = { gm: [], nm: [] };
    for (var m = primo; m <= ultimo; m++) {
      etichette.push(MESI[m - 1]);
      var x = perMese[m];
      serie.gm.push(x && x.giorno.n ? x.giorno.mediana : null);
      serie.nm.push(x && x.notte.n ? x.notte.mediana : null);
    }
    var grafico = html('div');
    c.corpo.appendChild(grafico);
    linee(grafico, {
      etichette: etichette,
      serie: [
        { nome: 'Giorno – mediana', valori: serie.gm, colore: COLORI[0] },
        { nome: 'Notte – mediana',  valori: serie.nm, colore: COLORI[1] }
      ],
      formatoAsse: function (v) { return v === null || v === undefined ? '–' : mmss(v); },
      etichetta: 'Tempo di partenza mediano per mese, giorno e notte'
    });

    if (tp.anno.giorno.q1 !== undefined) {
      c.corpo.appendChild(html('h4', 'dash-sottotitolo', 'Come si distribuiscono le partenze'));
      c.corpo.appendChild(html('p', 'dash-spiega', testo(
        'La scatola contiene la metà centrale delle partenze (dal primo al terzo quartile), ' +
        'la riga spessa è la mediana. I baffi arrivano alla partenza più lenta ancora "normale" ' +
        '(entro 1,5 volte la scatola); i cerchietti sono i casi fuori scala.')));
      var box = html('div');
      c.corpo.appendChild(box);
      scatole(box, {
        voci: [
          { nome: 'Giorno', s: tp.anno.giorno, colore: COLORI[0] },
          { nome: 'Notte',  s: tp.anno.notte,  colore: COLORI[1] }
        ],
        formato: mmss,
        etichetta: 'Boxplot dei tempi di partenza ' + anno + ', giorno e notte'
      });
    }

    // tabella mese per mese, con quante partenze ci sono dietro ogni mediana
    var scroll = html('div', 'dash-tabella-wrap');
    var t = html('table', 'dash-tabella');
    var th = html('thead');
    var r1 = html('tr');
    ['Mese', 'Giorno: n.', 'mediana', '9 su 10', 'Notte: n.', 'mediana', '9 su 10']
      .forEach(function (h, i) { r1.appendChild(html('th', i ? null : 'dash-td-nome', h)); });
    th.appendChild(r1); t.appendChild(th);
    var tb = html('tbody');
    tp.mesi.forEach(function (m) {
      var tr = html('tr');
      tr.appendChild(html('td', 'dash-td-nome', MESI[m.mese - 1]));
      [m.giorno, m.notte].forEach(function (f) {
        tr.appendChild(html('td', null, n(f.n)));
        tr.appendChild(html('td', null, mmss(f.mediana)));
        tr.appendChild(html('td', null, mmss(f.p90)));
      });
      tb.appendChild(tr);
    });
    t.appendChild(tb); scroll.appendChild(t); c.corpo.appendChild(scroll);

    var avvisi = 'Con meno di 5 partenze in un mese la mediana notturna oscilla molto: ' +
                 'per il confronto contano più i periodi di tre mesi riportati sopra.';
    if (tp.scartate) {
      avvisi += ' Escluse ' + tp.scartate + (tp.scartate === 1 ? ' riga' : ' righe') +
                ' con orari incoerenti (partenza prima dell\'attivazione o dopo più di un\'ora).';
    }
    c.corpo.appendChild(html('p', 'dash-avviso-riga', testo(avvisi)));
  }

  /* ── tabella semplice (non ordinabile) ───────────────────── */

  /**
   * @param intestazioni  ['Anno', 'Uscite', ...]: la prima colonna è testo, le altre numeri
   * @param righe         array di array di stringhe già formattate
   * @param opzioni       { evidenzia: indice della riga da mettere in grassetto }
   */
  function tabellaSemplice(intestazioni, righe, opzioni) {
    opzioni = opzioni || {};
    var scroll = html('div', 'dash-tabella-wrap');
    var t = html('table', 'dash-tabella');
    var tr = html('tr');
    intestazioni.forEach(function (h, i) { tr.appendChild(html('th', i ? null : 'dash-td-nome', h)); });
    var th = html('thead'); th.appendChild(tr); t.appendChild(th);
    var tb = html('tbody');
    righe.forEach(function (r, k) {
      var riga = html('tr', k === opzioni.evidenzia ? 'dash-riga-forte' : null);
      r.forEach(function (v, i) { riga.appendChild(html('td', i ? null : 'dash-td-nome', v)); });
      tb.appendChild(riga);
    });
    t.appendChild(tb); scroll.appendChild(t);
    return scroll;
  }

  /** Variazione percentuale "+4,2%" / "−3,1%", '–' se non calcolabile. */
  function varPct(corr, prec) {
    if (!prec) return '–';
    var p = Math.round((corr - prec) / prec * 1000) / 10;
    return (p >= 0 ? '+' : '−') + Math.abs(p).toLocaleString('it-IT') + '%';
  }

  /** Un decimale con la virgola, '–' se manca. */
  function dec(v) {
    return v === null || v === undefined ? '–' : (Math.round(v * 10) / 10).toLocaleString('it-IT');
  }

  /* ── mezzi e km (solo riservata) ────────────────────────── */

  /**
   * Somma le righe di kmStorico per anno e mese.
   * @return { anno: { mesi: [12 × {km, uscite, interrotte, kmManu}], mezzi: {nome: km} } }
   */
  function aggregaKm(righe) {
    var out = {};
    righe.forEach(function (r) {
      var a = out[r.anno];
      if (!a) {
        a = out[r.anno] = { mesi: [], mezzi: {} };
        for (var i = 0; i < 12; i++) a.mesi.push({ km: 0, uscite: 0, interrotte: 0, kmManu: 0 });
      }
      var m = a.mesi[r.mese - 1];
      m.km += r.km;
      m.uscite += r.interventi + r.interrotte;
      m.interrotte += r.interrotte;
      m.kmManu += r.kmManu;
      a.mezzi[r.mezzo] = (a.mezzi[r.mezzo] || 0) + r.km;
    });
    return out;
  }

  /** Somma di un campo sui mesi da gennaio a `fino` (compreso). */
  function somma(anno, campo, fino) {
    var t = 0;
    for (var i = 0; i < (fino || 12); i++) t += anno.mesi[i][campo];
    return t;
  }

  /**
   * Nome corto e uguale per tutti gli anni: i RIEPILOGO scrivono
   * "VW CRAFTER VOLSEL_106.01C1", il tab 118 "Mezzo 7 – VW Crafter 007".
   * Diventano "Crafter 106" e "Crafter 007".
   */
  function nomeMezzo(nome) {
    var s = String(nome || '');
    var tipo = /crafter/i.test(s) ? 'Crafter' : /t5/i.test(s) ? 'T5' : /ducato/i.test(s) ? 'Ducato' : '';
    var cod = /VOLSEL_(\d{3})/i.exec(s) || /(\d{3})\s*$/.exec(s);
    // T5 e Ducato sono uno solo per tipo: se il nome non ha un codice basta il tipo
    return tipo ? (cod ? tipo + ' ' + cod[1] : tipo) : s;
  }

  function kmPerUscita(km, uscite) {
    return uscite ? km / uscite : null;
  }

  function montaKm(root, d) {
    var annoCorr = d.annoCorrente;
    if (!d.kmStorico || !d.kmStorico.length) {
      root.appendChild(html('p', 'dash-avviso-riga',
        testo('I dati dei mezzi arrivano col prossimo aggiornamento della dashboard.')));
      return;
    }
    var agg = aggregaKm(d.kmStorico);
    var anni = Object.keys(agg).map(Number).sort();
    var corr = agg[annoCorr], prec = agg[annoCorr - 1];
    // si confronta fino al mese in corso: quello dopo non è ancora successo
    var fino = d.confronto ? d.confronto.finoAMese : 12;
    var alGiorno = d.confronto ? d.confronto.giorno + ' ' + MESI[fino - 1].toLowerCase() : '';

    // ── KPI a parità di periodo
    if (corr) {
      var kmC = somma(corr, 'km', fino), usC = somma(corr, 'uscite', fino), manC = somma(corr, 'kmManu', fino);
      var voci = [{ label: 'Km in convenzione ' + annoCorr, valore: n(kmC),
                    nota: alGiorno ? 'al ' + alGiorno : '' }];
      if (prec) {
        // dell'anno prima si prende il mese in corso solo per i giorni gia' passati
        // quest'anno: altrimenti settembre intero contro 26 giorni di settembre
        var quota = d.confronto ? d.confronto.giorno / new Date(annoCorr, fino, 0).getDate() : 1;
        var finora = function (campo) {
          return Math.round(somma(prec, campo, fino - 1) + prec.mesi[fino - 1][campo] * quota);
        };
        var kmP = finora('km'), usP = finora('uscite'), manP = finora('kmManu');
        voci.push({ label: 'Rispetto allo stesso periodo ' + (annoCorr - 1),
                    valore: (kmC >= kmP ? '+' : '−') + n(Math.abs(kmC - kmP)),
                    nota: varPct(kmC, kmP) + ' · ' + n(kmP) + ' km nel ' + (annoCorr - 1) });
        voci.push({ label: 'Km medi per uscita', valore: dec(kmPerUscita(kmC, usC)),
                    nota: n(usC) + ' uscite · nel ' + (annoCorr - 1) + ' ' + dec(kmPerUscita(kmP, usP)) });
        voci.push({ label: 'Km di manutenzione', valore: n(manC),
                    nota: 'stesso periodo ' + (annoCorr - 1) + ': ' + n(manP) });
      }
      root.appendChild(kpi(voci));
    }

    // ── andamento cumulato: dove si trova quest'anno rispetto agli altri
    var c1 = scheda('Km in convenzione cumulati da gennaio',
      'Ogni linea è un anno: più è ripida, più si è viaggiato in quel periodo. ' +
      'L\'anno in corso si ferma al mese attuale, ancora parziale.');
    root.appendChild(c1);
    linee(c1.corpo, {
      etichette: MESI,
      serie: anni.map(function (a, k) {
        var tot = 0, valori = [];
        for (var i = 0; i < 12; i++) {
          tot += agg[a].mesi[i].km;
          valori.push(a === annoCorr && i >= fino ? null : tot);
        }
        // l'anno in corso sempre arancio, gli altri a scalare negli altri colori
        return { nome: String(a), valori: valori,
                 colore: a === annoCorr ? COLORI[0]
                                        : COLORI[(anni.length - 1 - k) % (COLORI.length - 1) + 1] };
      }),
      formatoAsse: function (v) { return v === null || v === undefined ? '–' : n(Math.round(v)); },
      etichetta: 'Km cumulati per anno'
    });

    if (corr && prec) {
      // ── mese per mese: quest'anno contro l'anno prima
      var c2 = scheda('Km per mese – ' + annoCorr + ' e ' + (annoCorr - 1),
        'Il mese in corso è parziale. D\'estate i km crescono con le missioni: è il picco ' +
        'turistico dell\'Altopiano.');
      root.appendChild(c2);
      colonne(c2.corpo, {
        etichette: MESI,
        serie: [
          { nome: String(annoCorr - 1), valori: prec.mesi.map(function (m) { return m.km; }),
            colore: COLORI[1], tenue: true },
          { nome: String(annoCorr), valori: corr.mesi.map(function (m, i) { return i < fino ? m.km : 0; }),
            colore: COLORI[0] }
        ],
        etichetta: 'Km per mese, anno in corso e precedente'
      });

      // ── distanza media: dice se si esce più lontano, non solo più spesso
      var c3 = scheda('Km medi per uscita, mese per mese',
        'Quanto è lontano in media ogni intervento, andata e ritorno. Sale quando si esce più ' +
        'spesso fuori dall\'Altopiano o si va verso ospedali più distanti.');
      root.appendChild(c3);
      linee(c3.corpo, {
        etichette: MESI,
        serie: [annoCorr - 1, annoCorr].map(function (a, k) {
          return { nome: String(a), colore: k ? COLORI[0] : COLORI[1],
                   valori: agg[a].mesi.map(function (m, i) {
                     return a === annoCorr && i >= fino ? null : kmPerUscita(m.km, m.uscite);
                   }) };
        }),
        formatoAsse: dec,
        etichetta: 'Km medi per uscita per mese'
      });
    }

    // ── anno per anno
    var c4 = scheda('Anno per anno',
      'Uscite = interventi H24 più interrotte. Fino al ' + (annoCorr - 1) + ' i numeri vengono dai ' +
      'RIEPILOGO compilati a mano; dal ' + annoCorr + ' sono calcolati dal tab 118 riga per riga.');
    root.appendChild(c4);
    var righe = anni.map(function (a) {
      var x = agg[a], km = somma(x, 'km'), us = somma(x, 'uscite');
      // il mezzo che ha fatto piu' km quell'anno: puo' cambiare da un anno all'altro
      var princ = Object.keys(x.mezzi).sort(function (p, q) { return x.mezzi[q] - x.mezzi[p]; })[0];
      return [String(a) + (a === annoCorr ? ' (in corso)' : ''), n(us), n(somma(x, 'interrotte')),
              n(km), dec(kmPerUscita(km, us)), n(somma(x, 'kmManu')),
              princ ? nomeMezzo(princ) : '–',
              princ && km ? Math.round(x.mezzi[princ] / km * 100) + '%' : '–'];
    });
    c4.corpo.appendChild(tabellaSemplice(
      ['Anno', 'Uscite', 'Interrotte', 'Km convenzione', 'Km/uscita', 'Km manutenzione',
       'Mezzo principale', 'Sua quota di km'],
      righe, { evidenzia: anni.indexOf(annoCorr) }));

    // ── per singolo mezzo, anno in corso
    var mezzi = {};
    d.kmStorico.forEach(function (r) {
      if (r.anno !== annoCorr) return;
      var m = mezzi[r.mezzo] || (mezzi[r.mezzo] = { mesi: [], uscite: 0, interrotte: 0, km: 0, kmManu: 0 });
      m.mesi[r.mese - 1] = (m.mesi[r.mese - 1] || 0) + r.km;
      m.uscite += r.interventi + r.interrotte;
      m.interrotte += r.interrotte;
      m.km += r.km;
      m.kmManu += r.kmManu;
    });
    var nomi = Object.keys(mezzi).sort(function (a, b) { return mezzi[b].km - mezzi[a].km; });
    if (!nomi.length) return;
    var c5 = scheda('Per mezzo – ' + annoCorr,
      'Km in convenzione mese per mese e totali dell\'anno. I km di manutenzione sono ' +
      'gli spostamenti verso officina e carrozzeria, fuori dalla convenzione.');
    root.appendChild(c5);
    var g5 = html('div');
    c5.corpo.appendChild(g5);
    colonne(g5, {
      etichette: MESI,
      serie: nomi.filter(function (m) { return mezzi[m].km > 0; }).map(function (m, i) {
        var v = [];
        for (var k = 0; k < 12; k++) v.push(mezzi[m].mesi[k] || 0);
        return { nome: m, valori: v, colore: COLORI[i % COLORI.length] };
      }),
      etichetta: 'Km per mezzo per mese'
    });
    c5.corpo.appendChild(tabellaSemplice(
      ['Mezzo', 'Uscite', 'Interrotte', 'Km convenzione', 'Km/uscita', 'Km manutenzione'],
      nomi.map(function (m) {
        var x = mezzi[m];
        return [m, n(x.uscite), n(x.interrotte), n(x.km), dec(kmPerUscita(x.km, x.uscite)), n(x.kmManu)];
      })));
  }

  /* ── schede della pagina riservata ──────────────────────── */

  var SCHEDA_SALVATA = 'amb-dash-scheda';

  function montaSchede(root, d) {
    var schede = [
      { id: 'panoramica', titolo: 'Panoramica', disegna: function (p) { montaComune(p, d); } },
      { id: 'tempi', titolo: 'Tempi di partenza', disegna: function (p) {
          if (d.tempiPartenza) montaTempi(p, d.tempiPartenza, d.annoCorrente);
          else p.appendChild(html('p', 'dash-avviso-riga',
            testo('I tempi di partenza arrivano col prossimo aggiornamento della dashboard.')));
        } },
      { id: 'km', titolo: 'Mezzi e km', disegna: function (p) { montaKm(p, d); } },
      { id: 'persone', titolo: 'Persone', disegna: function (p) { montaPersone(p, d); } }
    ];

    // la scheda aperta resta quella anche se la pagina si ridisegna o si riapre
    var attiva = root._scheda;
    if (!attiva) {
      try { attiva = window.localStorage.getItem(SCHEDA_SALVATA); } catch (e) { attiva = null; }
    }
    if (!schede.some(function (s) { return s.id === attiva; })) attiva = schede[0].id;

    var barra = html('div', 'dash-schede');
    barra.setAttribute('role', 'tablist');
    barra.setAttribute('aria-label', 'Sezioni della dashboard');
    root.appendChild(barra);

    schede.forEach(function (s) {
      var b = html('button', 'dash-scheda-btn', s.titolo);
      b.type = 'button';
      b.id = 'dash-tab-' + s.id;
      b.setAttribute('role', 'tab');
      b.setAttribute('aria-controls', 'dash-pannello-' + s.id);
      var p = html('div', 'dash-pannello');
      p.id = 'dash-pannello-' + s.id;
      p.setAttribute('role', 'tabpanel');
      p.setAttribute('aria-labelledby', b.id);
      s.bottone = b;
      s.pannello = p;
      barra.appendChild(b);
      root.appendChild(p);
      b.addEventListener('click', function () { mostra(s.id, true); });
    });

    // tastiera: frecce sinistra/destra fra le schede
    barra.addEventListener('keydown', function (e) {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      var i = schede.map(function (s) { return s.id; }).indexOf(root._scheda);
      i = (i + (e.key === 'ArrowRight' ? 1 : schede.length - 1)) % schede.length;
      mostra(schede[i].id, true);
      schede[i].bottone.focus();
    });

    // Il pannello si disegna la prima volta che diventa visibile: i grafici
    // prendono la larghezza del contenitore, che da nascosto vale zero.
    function mostra(id, scelta) {
      root._scheda = id;
      if (scelta) {
        try { window.localStorage.setItem(SCHEDA_SALVATA, id); } catch (e) { /* va bene anche senza */ }
      }
      schede.forEach(function (s) {
        var on = s.id === id;
        s.bottone.classList.toggle('attivo', on);
        s.bottone.setAttribute('aria-selected', on ? 'true' : 'false');
        s.bottone.tabIndex = on ? 0 : -1;
        s.pannello.hidden = !on;
        if (on && !s.disegnata) { s.disegnata = true; s.disegna(s.pannello); }
      });
    }
    mostra(attiva, false);
  }

  function montaPersone(root, d) {
    if (!d.volontari || !d.volontari.length) return;

    var elenco = (d.tipiPersonale && d.tipiPersonale.length) ? d.tipiPersonale : TIPI_RIPIEGO;
    d.volontari.forEach(function (v) {
      v._gruppo = v.gruppo !== undefined ? v.gruppo : tipoChiave(v.tipo);
      // chi ha una data di assunzione: la colonna Tipo la dice, così si capisce
      // perché una persona segnata Dipendente in anagrafica sta fra i volontari
      v._ruoli = v.ruoli || v.tipo || '';
      if (v.dal) v._ruoli = (v._ruoli ? v._ruoli + ' ' : '') + 'dal ' + v.dal;
    });
    var attivi = d.volontari.filter(function (v) { return v.tot > 0 || (v.oreTot || v.ore) > 0; });

    // un grafico per tipo, nell'ordine dell'elenco; i tipi non previsti in coda
    var esclusi = {};
    elenco.forEach(function (g) { if (g.escludi) esclusi[g.chiave] = true; });
    var presenti = elenco.filter(function (g) { return !g.escludi; })
                         .map(function (g) { return g.chiave; });
    attivi.forEach(function (v) {
      if (!esclusi[v._gruppo] && presenti.indexOf(v._gruppo) < 0) presenti.push(v._gruppo);
    });

    // I due modi di leggere lo stesso elenco: quante volte è uscito qualcuno
    // e quanto tempo ci ha messo. Sono numeri diversi — chi fa presidi e
    // manifestazioni ha poche uscite e tante ore — quindi si sceglie.
    // Il primo dell'elenco è quello mostrato all'apertura: le ore, perché
    // danno il peso vero di chi fa presidi e manifestazioni.
    var MISURE = [
      { chiave: 'oreTot', etichetta: 'Ore di attività',
        unita: function (v) { return n(v) + ' h'; },
        nota: 'Barra = ore di turno coperte più quelle di tutte le altre ' +
              'attività, amministrazione e formazione comprese.' },
      { chiave: 'tot', etichetta: 'Interventi e attività',
        unita: function (v) { return n(v); },
        nota: 'Barra = interventi 118 + attività registrate.' }
    ];
    var misuraAttiva = MISURE[0];

    var barraMisure = html('div', 'dash-switch');
    barraMisure.setAttribute('role', 'group');
    barraMisure.setAttribute('aria-label', 'Cosa mostrare nei grafici per tipo');
    var contenitoreGruppi = html('div');

    MISURE.forEach(function (m) {
      var b = html('button', 'dash-switch-btn', m.etichetta);
      b.type = 'button';
      b.addEventListener('click', function () {
        if (misuraAttiva === m) return;
        misuraAttiva = m;
        Array.prototype.forEach.call(barraMisure.children, function (x) {
          var att = x === b;
          x.classList.toggle('attivo', att);
          x.setAttribute('aria-pressed', att ? 'true' : 'false');
        });
        disegnaGruppi();
      });
      b.setAttribute('aria-pressed', m === misuraAttiva ? 'true' : 'false');
      if (m === misuraAttiva) b.classList.add('attivo');
      barraMisure.appendChild(b);
    });
    root.appendChild(barraMisure);
    root.appendChild(contenitoreGruppi);

    function disegnaGruppi() {
      contenitoreGruppi.innerHTML = '';
      var mis = misuraAttiva;
      presenti.forEach(function (chiave) {
        var membri = attivi.filter(function (v) { return v._gruppo === chiave; })
                           .filter(function (v) { return (v[mis.chiave] || 0) > 0; })
                           .sort(function (a, b) { return b[mis.chiave] - a[mis.chiave]; });
        if (!membri.length) return;
        var g = null;
        elenco.forEach(function (x) { if (x.chiave === chiave) g = x; });
        var colore = g ? g.colore : COLORI[4];
        var titolo = etichettaGruppo(chiave, elenco, membri[0].tipo);
        var LIM = 20;
        var nota = membri.length +
                   (membri.length === 1 ? ' persona nel ' : ' persone nel ') +
                   d.annoCorrente + '. ' + mis.nota;
        if (membri.length > LIM) {
          nota += ' Nel grafico i primi ' + LIM +
                  ': l\'elenco completo è nella tabella qui sotto.';
        }
        var c2 = scheda(titolo + ' – ' + d.annoCorrente, nota);
        contenitoreGruppi.appendChild(c2);
        barre(c2.corpo, {
          voci: membri.map(function (v) {
            return { nome: v.nickname, valore: v[mis.chiave] || 0 };
          }),
          colore: colore, limite: LIM, larghezzaEtichette: 140,
          formato: mis.unita,
          etichetta: mis.etichetta + ' – ' + titolo
        });
      });
    }
    disegnaGruppi();

    // Chi ha cambiato ruolo ha una matricola per ruolo: l'Apps Script unisce
    // le righe in una persona sola, qui si segnala solo chi ha piu' ruoli.
    var listaDoppi = attivi.filter(function (v) {
      return v.matricola && v.matricola.indexOf('·') >= 0;
    }).map(function (v) {
      var det = v.matricola;
      if (v.ruoli && v.ruoli.indexOf('+') >= 0) det += ' – ' + v.ruoli;
      return v.nickname + ' (' + det + ')';
    });

    var cT = scheda('Tutte le persone – ' + d.annoCorrente,
      'Clicca un\'intestazione per ordinare, usa i filtri per restringere. ' +
      'Fonte: tab MATRICOLE, ricalcolato ogni notte. Dato interno, non pubblicato.');
    root.appendChild(cT);

    if (listaDoppi.length) {
      cT.corpo.appendChild(html('p', 'dash-avviso-riga', testo(
        'Con più di un ruolo in associazione, e quindi più di una matricola: ' +
        listaDoppi.join(', ') + '. In questo elenco compaiono una volta sola.')));
    }

    var perFiltro = presenti.slice();
    attivi.forEach(function (v) {
      if (perFiltro.indexOf(v._gruppo) < 0) perFiltro.push(v._gruppo);
    });
    var gruppiPresenti = [];
    perFiltro.forEach(function (k) {
      var uno = null;
      attivi.forEach(function (v) { if (v._gruppo === k && !uno) uno = v; });
      if (uno) gruppiPresenti.push({ valore: k, testo: etichettaGruppo(k, elenco, uno.tipo) });
    });

    cT.corpo.appendChild(tabellaOrdinabile([
      { testo: 'Nome',        chiave: 'nickname' },
      { testo: 'Matricola',   chiave: 'matricola' },
      { testo: 'Tipo',        chiave: '_ruoli' },
      { testo: 'Totale',      chiave: 'tot',    numerica: true },
      { testo: 'Rossi',       chiave: 'rossi',  numerica: true },
      { testo: 'Gialli',      chiave: 'gialli', numerica: true },
      { testo: 'Verdi',       chiave: 'verdi',  numerica: true },
      { testo: 'Progr.',      chiave: 'prog',   numerica: true },
      { testo: 'Manif.',      chiave: 'manif',  numerica: true },
      { testo: 'Manut.',      chiave: 'manut',  numerica: true },
      { testo: 'Presidio',    chiave: 'presid', numerica: true },
      { testo: 'Ore turno',   chiave: 'ore118', numerica: true },
      { testo: 'Ore attività', chiave: 'ore',   numerica: true },
      { testo: 'Ore totali',  chiave: 'oreTot', numerica: true }
    ], attivi, { filtroTesto: 'nickname', gruppi: gruppiPresenti, ordine: 'tot' }));
  }

  /* ── API ────────────────────────────────────────────────── */

  return {
    colori: COLORI,
    formatta: n,
    monta: function (root, dati, opzioni) {
      opzioni = opzioni || {};
      // i grafici sono disegnati alla larghezza del contenitore: se cambia
      // (rotazione del telefono, finestra ridimensionata) vanno rifatti
      var self = this;
      if (!root._ridisegna) {
        var ultima = 0, attesa = null;
        root._ridisegna = function () {
          clearTimeout(attesa);
          attesa = setTimeout(function () {
            var w = root.clientWidth;
            if (Math.abs(w - ultima) < 40) return;
            ultima = w;
            self.monta(root, root._dati, root._opzioni);
          }, 250);
        };
        window.addEventListener('resize', root._ridisegna);
        window.addEventListener('orientationchange', root._ridisegna);
      }
      root._dati = dati;
      root._opzioni = opzioni;
      root.innerHTML = '';
      root.appendChild(strisciaAggiornamento(dati));
      if (opzioni.riservato) montaSchede(root, dati);
      else montaComune(root, dati);
      var p = html('p', 'dash-aggiornato');
      p.textContent = testo('I dati si aggiornano da soli ogni notte verso le 2. ' +
        'Se la data qui sopra è vecchia, l\'aggiornamento automatico si è fermato.');
      root.appendChild(p);
    },
    carica: function (url, root, opzioni) {
      var self = this;
      fetch(url, { cache: 'no-cache' })
        .then(function (r) {
          if (!r.ok) throw new Error('HTTP ' + r.status);
          return r.json();
        })
        .then(function (d) { self.monta(root, d, opzioni); })
        .catch(function (e) {
          root.innerHTML = '';
          var p = html('p', 'dash-errore',
            'Non è stato possibile caricare i dati in questo momento. Riprova più tardi.');
          root.appendChild(p);
          if (window.console) console.error('dashboard:', e);
        });
    }
  };
})();

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
    var ml = stretto ? 40 : 54, mr = 14, mt = 14, mb = 34;
    var s = tela(host, W, H, o.etichetta);
    var x0 = ml, x1 = W - mr, y0 = mt, y1 = H - mb;

    var max = 0;
    o.serie.forEach(function (se) {
      se.valori.forEach(function (v) { if (v > max) max = v; });
    });
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
    var ml = stretto ? 40 : 54, mr = 14, mt = 14, mb = 34;
    var s = tela(host, W, H, o.etichetta);
    var x0 = ml, x1 = W - mr, y0 = mt, y1 = H - mb;

    var max = 0;
    o.serie.forEach(function (se) {
      se.valori.forEach(function (v) { if (v !== null && v > max) max = v; });
    });
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
        punti.push([x0 + passoX * i, y1 - (cima ? (v / cima) * (y1 - y0) : 0)]);
      });
      if (!punti.length) return;
      s.appendChild(el('polyline', {
        points: punti.map(function (p) { return p[0] + ',' + p[1]; }).join(' '),
        fill: 'none', stroke: colore, 'stroke-width': 2.5,
        'stroke-linejoin': 'round', 'stroke-linecap': 'round'
      }));
      punti.forEach(function (p, i) {
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
    var mr = W < 520 ? 48 : 60;
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
      }, o.formato ? o.formato(v.valore) : n(v.valore)));
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
  function strisciaAggiornamento(dati) {
    var d = new Date(dati.aggiornato);
    var box = html('div', 'dash-stato');

    if (isNaN(d.getTime())) {
      box.classList.add('vecchio');
      box.appendChild(html('span', 'dash-stato-testo', 'Data di aggiornamento non disponibile.'));
      return box;
    }

    var ore = (Date.now() - d.getTime()) / 3600000;
    var quando = d.toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' }) +
                 ' alle ' + d.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' });

    var etichetta = html('span', 'dash-stato-testo');
    etichetta.appendChild(html('strong', null, 'Ultimo aggiornamento: '));
    etichetta.appendChild(document.createTextNode(quando));
    box.appendChild(etichetta);

    if (ore > 36) {
      box.classList.add('vecchio');
      var giorni = Math.floor(ore / 24);
      box.appendChild(html('span', 'dash-stato-avviso',
        giorni >= 1
          ? ('fermi da ' + giorni + (giorni === 1 ? ' giorno' : ' giorni') + ': qualcosa non gira')
          : 'più vecchi del previsto: qualcosa non gira'));
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
                    ? (n(oreEm) + ' di turno + ' + n(oreExtra) + ' di attività')
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
      // copertura da garantire: un equipaggio di tre persone, 24 ore al giorno,
      // tutti i giorni dell'anno.
      var giorni = new Date(annoCorr, 1, 29).getMonth() === 1 ? 366 : 365;
      var fabbisogno = 24 * 3 * giorni;
      var oreTutte = emerg.oreTutti || emerg.ore;
      var oreDip = Math.max(oreTutte - emerg.ore, 0);
      var quota = function (v) {
        return n(v) + ' h · ' + Math.round(v / fabbisogno * 100) + '%';
      };

      var c6 = scheda('Le ore di turno e la copertura H24',
        'Garantire l\'ambulanza 24 ore su 24 con un equipaggio di tre persone vuol dire ' +
        n(fabbisogno) + ' ore in un anno di ' + giorni + ' giorni. Ecco da chi arrivano. ' +
        'Il totale supera il 100% quando su un turno c\'è più gente del minimo.');
      root.appendChild(c6);
      barre(c6.corpo, {
        voci: [
          { nome: 'Serve per l\'H24', valore: fabbisogno, colore: '#c8d2de' },
          { nome: 'Coperte dai volontari', valore: emerg.ore, colore: COLORI[0] },
          { nome: 'Coperte dai dipendenti', valore: oreDip, colore: COLORI[1] }
        ],
        formato: quota,
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

  function montaRiservata(root, d) {
    if (d.mezzi && d.mezzi.length) {
      var perMezzo = {};
      d.mezzi.forEach(function (r) {
        if (!perMezzo[r.mezzo]) {
          perMezzo[r.mezzo] = [];
          for (var i = 0; i < 12; i++) perMezzo[r.mezzo][i] = 0;
        }
        perMezzo[r.mezzo][r.mese - 1] = r.km;
      });
      var c = scheda('Km in convenzione per mezzo – ' + d.annoCorrente,
        'Dato interno: proviene dal tab RIEPILOGO, rigenerato a ogni salvataggio del programma.');
      root.appendChild(c);
      colonne(c.corpo, {
        etichette: MESI,
        serie: Object.keys(perMezzo).map(function (m, i) {
          return { nome: m, valori: perMezzo[m], colore: COLORI[i % COLORI.length] };
        }),
        etichetta: 'Km per mezzo'
      });
    }

    if (!d.volontari || !d.volontari.length) return;

    var elenco = (d.tipiPersonale && d.tipiPersonale.length) ? d.tipiPersonale : TIPI_RIPIEGO;
    d.volontari.forEach(function (v) {
      v._gruppo = v.gruppo !== undefined ? v.gruppo : tipoChiave(v.tipo);
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
    var MISURE = [
      { chiave: 'tot', etichetta: 'Interventi e attività',
        unita: function (v) { return n(v); },
        nota: 'Barra = interventi 118 + attività registrate.' },
      { chiave: 'oreTot', etichetta: 'Ore di attività',
        unita: function (v) { return n(v) + ' h'; },
        nota: 'Barra = ore di turno coperte più quelle di tutte le altre ' +
              'attività, amministrazione e formazione comprese.' }
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
      { testo: 'Tipo',        chiave: 'ruoli' },
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
      montaComune(root, dati);
      if (opzioni.riservato) montaRiservata(root, dati);
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

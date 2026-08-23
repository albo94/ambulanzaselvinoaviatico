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
    var W = 840, H = o.altezza || 320;
    var ml = 54, mr = 14, mt = 14, mb = 34;
    var s = tela(host, W, H, o.etichetta);
    var x0 = ml, x1 = W - mr, y0 = mt, y1 = H - mb;

    var max = 0;
    o.serie.forEach(function (se) {
      se.valori.forEach(function (v) { if (v > max) max = v; });
    });
    var cima = scalaY(s, max, x0, x1, y0, y1, o.formatoAsse);

    var nCat = o.etichette.length;
    var larghCat = (x1 - x0) / nCat;
    var pad = larghCat * 0.18;
    var larghBarra = (larghCat - pad * 2) / o.serie.length;

    o.etichette.forEach(function (etichetta, i) {
      var cx = x0 + larghCat * i;
      s.appendChild(el('text', {
        x: cx + larghCat / 2, y: y1 + 20, 'text-anchor': 'middle', class: 'dash-tick'
      }, etichetta));

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
    var W = 840, H = o.altezza || 320;
    var ml = 54, mr = 14, mt = 14, mb = 34;
    var s = tela(host, W, H, o.etichetta);
    var x0 = ml, x1 = W - mr, y0 = mt, y1 = H - mb;

    var max = 0;
    o.serie.forEach(function (se) {
      se.valori.forEach(function (v) { if (v !== null && v > max) max = v; });
    });
    var cima = scalaY(s, max, x0, x1, y0, y1, o.formatoAsse);

    var nCat = o.etichette.length;
    var passoX = nCat > 1 ? (x1 - x0) / (nCat - 1) : 0;

    o.etichette.forEach(function (etichetta, i) {
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
    var W = 840, riga = 30, mt = 10, mb = 8;
    var H = mt + mb + riga * voci.length;
    var ml = o.larghezzaEtichette || 150, mr = 60;
    var s = tela(host, W, H, o.etichetta);
    var max = 0;
    voci.forEach(function (v) { if (v.valore > max) max = v.valore; });

    voci.forEach(function (v, i) {
      var y = mt + riga * i;
      s.appendChild(el('text', {
        x: ml - 10, y: y + riga / 2 + 4, 'text-anchor': 'end', class: 'dash-tick-forte'
      }, v.nome));
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
    var W = 840, H = 340, cx = 190, cy = H / 2, R = 125, r = 74;
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

      var y = 46 + i * 26;
      s.appendChild(el('rect', { x: 400, y: y - 11, width: 13, height: 13, rx: 3,
                                 fill: COLORI[i % COLORI.length] }));
      s.appendChild(el('text', { x: 422, y: y, class: 'dash-tick-forte' }, v.nome));
      s.appendChild(el('text', { x: 700, y: y, class: 'dash-tick', 'text-anchor': 'end' },
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
    h.appendChild(html('h3', null, titolo));
    if (sottotitolo) h.appendChild(html('p', null, sottotitolo));
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
      c.appendChild(html('span', 'dash-kpi-label', v.label));
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
    if (oreUlt) {
      voci.push({ label: 'Ore di volontariato ' + annoCorr, valore: n(oreUlt.totale),
                  nota: 'attività fuori emergenza' });
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

    // ore volontariato
    if (d.tipologie.length) {
      var ultimoIdx = d.anniExtra.length - 1;
      var c5 = scheda('Le ore di volontariato oltre l\'emergenza',
        'Manifestazioni, trasporti programmati, presidio del territorio, formazione e amministrazione. ' +
        'Ore-volontario: ogni ora è contata per ciascun volontario presente.');
      root.appendChild(c5);
      barre(c5.corpo, {
        voci: d.tipologie.map(function (t) {
          return { nome: t.tipo, valore: t.valori[ultimoIdx] || 0 };
        }).filter(function (v) { return v.valore > 0; }),
        colore: COLORI[2],
        formato: function (v) { return n(v) + ' h'; },
        larghezzaEtichette: 175,
        etichetta: 'Ore per tipologia'
      });
    }
  }

  /* ── composizione: parte riservata ──────────────────────── */

  // I gruppi seguono la colonna TIPO del tab MATRICOLE. L'ordine qui e'
  // l'ordine in cui compaiono i grafici.
  var GRUPPI = [
    { chiave: 'dipendente',      titolo: 'Dipendenti',      colore: COLORI[1] },
    { chiave: 'servizio civile', titolo: 'Servizio civile', colore: COLORI[2] },
    { chiave: 'volontario',      titolo: 'Volontari',       colore: COLORI[0] },
    { chiave: 'nuovo',           titolo: 'Nuovi',           colore: COLORI[3] },
    { chiave: '',                titolo: 'Senza tipo',      colore: COLORI[5] }
  ];

  function normTipo(t) {
    t = String(t || '').trim().toLowerCase();
    if (!t) return '';
    if (t.indexOf('dipend') === 0) return 'dipendente';
    if (t.indexOf('civil') >= 0 || t === 'sc') return 'servizio civile';
    if (t.indexOf('volont') === 0) return 'volontario';
    if (t.indexOf('nuov') === 0) return 'nuovo';
    return t;
  }

  function etichettaGruppo(chiave) {
    for (var i = 0; i < GRUPPI.length; i++) {
      if (GRUPPI[i].chiave === chiave) return GRUPPI[i].titolo;
    }
    return chiave.charAt(0).toUpperCase() + chiave.slice(1);
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

    d.volontari.forEach(function (v) { v._gruppo = normTipo(v.tipo); });
    var attivi = d.volontari.filter(function (v) { return v.tot > 0 || v.ore > 0; });

    // un grafico per tipo, nell'ordine di GRUPPI; i tipi non previsti in coda
    var presenti = GRUPPI.map(function (g) { return g.chiave; });
    attivi.forEach(function (v) {
      if (presenti.indexOf(v._gruppo) < 0) presenti.push(v._gruppo);
    });

    presenti.forEach(function (chiave) {
      var membri = attivi.filter(function (v) { return v._gruppo === chiave; })
                         .sort(function (a, b) { return b.tot - a.tot; });
      if (!membri.length) return;
      var g = null;
      GRUPPI.forEach(function (x) { if (x.chiave === chiave) g = x; });
      var colore = g ? g.colore : COLORI[4];
      var titolo = etichettaGruppo(chiave);
      var LIM = 20;
      var nota = membri.length + (membri.length === 1 ? ' persona con attività nel ' : ' persone con attività nel ') +
                 d.annoCorrente + '. Barra = interventi 118 + attività registrate.';
      if (membri.length > LIM) nota += ' Nel grafico i primi ' + LIM + ': l\'elenco completo è nella tabella qui sotto.';
      var c2 = scheda(titolo + ' – ' + d.annoCorrente, nota);
      root.appendChild(c2);
      barre(c2.corpo, {
        voci: membri.map(function (v) { return { nome: v.nickname, valore: v.tot }; }),
        colore: colore, limite: LIM, larghezzaEtichette: 140,
        etichetta: 'Attività ' + titolo
      });
    });

    // segnala i nickname doppi: le statistiche sono calcolate per nickname,
    // quindi due matricole con lo stesso nickname mostrano gli stessi numeri
    var visti = {}, doppi = {};
    d.volontari.forEach(function (v) {
      if (visti[v.nickname]) doppi[v.nickname] = true;
      visti[v.nickname] = true;
    });
    var listaDoppi = Object.keys(doppi);

    var cT = scheda('Tutte le persone – ' + d.annoCorrente,
      'Clicca un\'intestazione per ordinare, usa i filtri per restringere. ' +
      'Fonte: tab MATRICOLE, ricalcolato ogni notte. Dato interno, non pubblicato.');
    root.appendChild(cT);

    if (listaDoppi.length) {
      var avv = html('p', 'dash-avviso-riga',
        'Attenzione: ' + listaDoppi.join(', ') +
        (listaDoppi.length === 1 ? ' compare' : ' compaiono') +
        ' due volte nel tab MATRICOLE con matricole diverse. Le statistiche sono ' +
        'calcolate per nickname, quindi le righe doppie riportano gli stessi numeri.');
      cT.corpo.appendChild(avv);
    }

    var gruppiPresenti = [];
    presenti.forEach(function (k) {
      if (attivi.some(function (v) { return v._gruppo === k; })) {
        gruppiPresenti.push({ valore: k, testo: etichettaGruppo(k) });
      }
    });

    cT.corpo.appendChild(tabellaOrdinabile([
      { testo: 'Nome',        chiave: 'nickname' },
      { testo: 'Tipo',        chiave: 'tipo' },
      { testo: 'Totale',      chiave: 'tot',    numerica: true },
      { testo: 'Rossi',       chiave: 'rossi',  numerica: true },
      { testo: 'Gialli',      chiave: 'gialli', numerica: true },
      { testo: 'Verdi',       chiave: 'verdi',  numerica: true },
      { testo: 'Progr.',      chiave: 'prog',   numerica: true },
      { testo: 'Manif.',      chiave: 'manif',  numerica: true },
      { testo: 'Manut.',      chiave: 'manut',  numerica: true },
      { testo: 'Presidio',    chiave: 'presid', numerica: true },
      { testo: 'Ore attività', chiave: 'ore',   numerica: true }
    ], attivi, { filtroTesto: 'nickname', gruppi: gruppiPresenti, ordine: 'tot' }));
  }

  /* ── API ────────────────────────────────────────────────── */

  return {
    colori: COLORI,
    formatta: n,
    monta: function (root, dati, opzioni) {
      opzioni = opzioni || {};
      root.innerHTML = '';
      montaComune(root, dati);
      if (opzioni.riservato) montaRiservata(root, dati);
      var p = html('p', 'dash-aggiornato');
      var data = new Date(dati.aggiornato);
      p.textContent = 'Dati aggiornati al ' +
        data.toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' }) +
        '. Aggiornamento automatico ogni notte.';
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

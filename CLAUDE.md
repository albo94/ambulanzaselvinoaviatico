# Ambulanza Selvino-Aviatico – Sito Web

Sito statico HTML/CSS/JS pubblicato su **GitHub Pages** all'indirizzo:
`https://www.ambulanzaselvinoaviatico.com`
Repository: `https://github.com/albo94/ambulanzaselvinoaviatico`

## Struttura file

```
/
├── index.html          – Home page
├── associazione.html   – Storia, valori, consiglio direttivo, carosello, gallery
├── servizi.html        – Pagina servizi con sezioni e tab sticky
├── contatti.html       – Mappa, indirizzi, orari
├── volontario.html     – Come diventare volontario, donazioni, contributi pubblici
├── numeri.html         – Dashboard statistiche pubblica (vedi sezione dedicata)
├── sciesopoli/         – Pagina nascosta: modulo di manleva visitatori (vedi *Pagine nascoste*)
├── checklist/          – Pagina nascosta: check list dei mezzi, uso interno (vedi *Pagine nascoste*)
├── sitemap.xml
├── robots.txt
├── llms.txt            – Fatti essenziali per i motori generativi (vedi *SEO*)
├── google0a9c787ee85afe3d.html – Verifica Search Console: NON rimuovere (vedi *Analytics*)
├── 404.html            – Pagina "non trovata" (vedi *SEO > Indirizzi vecchi e 404*)
├── cosa-facciamo.html, diventa-volontario.html, who-we-are.html, news.html
│                       – Reindirizzamenti dai vecchi indirizzi Wix: NON rimuovere
├── css/style.css       – Unico foglio di stile (tutto il sito)
├── css/dashboard.css   – Stili della dashboard statistiche
├── js/main.js          – Hamburger, stats counter, carousel, scroll reveal
├── js/dashboard.js     – Renderer dei grafici (SVG a mano, nessuna libreria)
├── js/analytics.js     – GA4 + banner cookie con Consent Mode v2 (vedi *Analytics*)
├── dati/statistiche.json – Dati della dashboard, rigenerati ogni notte (non modificare)
├── CNAME               – Dominio custom per GitHub Pages (non rimuovere)
├── images/             – Immagini usate dal sito (vedi struttura sottocartelle)
├── docs/               – PDF scaricabili (contributi pubblici, volontariato in vacanza)
└── _materiali/         – Materiale grezzo da archiviare/pubblicare (export Instagram,
                          PDF originali…). **Ignorato da git**: non finisce online,
                          serve solo in locale come deposito
```

## Struttura immagini (images/)

Le immagini sono raggruppate per **sezione del sito**. Alla radice di `images/`
restano solo i file globali o della home.

```
images/
├── logo.png                     – Favicon, header, footer (tutte le pagine)
├── hero-principale.jpg          – Hero home page (background inline)
├── news-team.jpg                – Card news "Volontariato" (index.html)
│
├── associazione/                – Foto di associazione.html (storia, organi, attività)
│   ├── corteo.jpg               – Hero pagina + OG image associazione.html
│   ├── consiglio-direttivo.jpg  – Sezione Consiglio Direttivo + OG image volontario.html
│   ├── consiglio-2.jpg          – (disponibile, non usata attivamente)
│   ├── consiglio5.jpg           – (disponibile, non usata attivamente)
│   ├── consiglio-vecchio.jpg    – Foto storica consiglio (disponibile)
│   ├── storica-sede.jpg         – Foto storica sede (disponibile)
│   ├── servizio-civile-1..2.jpg – Sezione servizio civile
│   └── manifestazioni-1..4.jpg  – Carosello manifestazioni
│
├── eventi/
│   └── inaugurazione/           – Carosello "Inaugurazione 26 Aprile 2026" (#main-carousel)
│       ├── evento-taglio-nastro.jpg  – anche card news "Evento" in index.html
│       ├── evento-benedizione.jpg
│       ├── presidente.jpg
│       └── mg-6071/6108/6129.jpg
│
├── servizi/                     – Foto di servizi.html, una cartella per sezione
│   ├── emergenza/               – ambulanza3.jpg (hero pagina + OG image), ambulanza4.jpg, elicottero.jpg
│   ├── trasporto/               – trasporti-programmati.jpg
│   ├── manifestazioni/          – manifestazioni6.jpg (sp-wide), manifestazioni-2.jpg, manifestazioni5.jpg
│   ├── territorio/              – territorio1,2,3,6,7.jpg + guardia-medica.jpg (usate);
│   │                              territorio4-5.jpg di riserva
│   └── formazione/
│       ├── formazione1.jpg      – card news "Formazione" in index.html
│       ├── formazione4/2/6.jpg  – blocco "Formazione alla Comunità"
│       ├── formazione3/5/7.jpg  – di riserva, non usate
│       ├── formazione-soccorritori-1..2.jpg – blocco "Formazione ai Soccorritori"
│       ├── scuole/              – formazione-scuole.jpg (sp-wide), -2.jpg, -3.jpg
│       └── aziende/             – formazione-aziende.jpg
│
└── team/                        – Foto dei volontari
    ├── gruppo11.jpg             – Sezione "La Nostra Associazione" (index.html)
    ├── team2.jpg + vol8/12/15.jpg – Photo strip home page (4 foto)
    ├── gruppo.jpg, gruppo2-7, gruppo10-12.jpg – Carosello squadra
    ├── team-rosso.jpg, team-gruppo.jpg, arena-verona.jpg – Carosello squadra
    └── vol1-16.jpg              – Pool volontari (usate: vol8, vol11, vol12, vol15)
```

**Nota:** i nomi dei file non devono contenere spazi (usare trattini) — su GitHub Pages
i percorsi sono **case-sensitive**, a differenza di Windows: attenzione a maiuscole e
minuscole quando si aggiunge o si rinomina un file.

**Nota:** Per aggiungere foto al carosello "La Nostra Squadra" (associazione.html) basta mettere il file in `images/team/` e aggiungere una riga `<div class="carousel-slide"><img src="..."></div>` nel div `id="gallery-carousel"`.

## Dati associazione

- **Nome**: Associazione Ambulanza Selvino-Aviatico
- **CF**: 95052440161
- **Sede operativa**: Via Monte Alben 19, Selvino (BG) 24020
- **Sede legale**: Via SS. Patroni 8, Selvino (BG) 24020
- **Tel**: 035-764626
- **Email**: info@ambulanzaselvinoaviatico.com
- **PEC**: ambulanzaselvino@pec.it
- **Presidente**: Alberto Grigis – 346-1099244
- **IBAN**: IT67 O032 9601 6010 0006 7726 941
- **ANPAS Lombardia** dal 1995
- **Fondata**: 1993 (radici 1964 AVIS, prima ambulanza 1968)
  - ⚠️ **Non attribuire all'associazione i "oltre 55 anni"**: l'associazione è del **1993**.
    Sono i **volontari** a garantire il servizio da oltre 55 anni, prima nella sezione **AVIS**
    (1964) e poi nell'associazione ambulanza (prima ambulanza 1968). Frasi come «l'Associazione
    è presente da oltre 55 anni» o «Associazione di Volontariato dal 1968» sono sbagliate:
    il soggetto dei 55 anni / del 1968 è il **soccorso**, non l'ente.
  - **Formula adottata sul sito** (27/09/2026): «**servizio ambulanza dal 1968**», che mette
    il servizio come soggetto senza dover riscrivere la frase ogni volta. Usata nel footer di
    tutte le pagine, nelle meta description, in OG/Twitter e nel JSON-LD. Prima c'era
    «soccorso (volontario) dal 1968», che lasciava il soggetto implicito e scivolava
    sull'ente: se serve una variante nuova, il soggetto deve restare il **servizio**.
  - Restano corrette le frasi in cui il soggetto è esplicito e giusto: «i nostri volontari
    … servono da oltre 55 anni», «il soccorso volontario è garantito da oltre 55 anni»,
    e le date in timeline (1964 AVIS, 10 ottobre 1968 prima ambulanza, 1993 associazione).
- **Volontari**: ~70 attivi
- **Ambulanze operative**: 3
- **Interventi/anno**: ~450–500
- **Convenz. AREU H24** dal 2021
- **Trasporti programmati**: Sig.ra Antonia Rondi – tel. 333 413 4299

## Palette colori (CSS custom properties)

| Variabile         | Valore    | Uso                            |
|-------------------|-----------|--------------------------------|
| `--orange`        | `#E8601C` | Arancione ANPAS – accento principale |
| `--orange-dark`   | `#c04d14` | Hover arancione                |
| `--green`         | `#1A8B3C` | Icona disponibilità            |
| `--dark`          | `#1a1a1a` | Testo scuro                    |
| `--gray`          | `#f5f5f5` | Sfondi sezioni alternate       |
| `--white`         | `#ffffff` |                                |
| `--text`          | `#333333` | Corpo testo                    |
| `--text-light`    | `#666666` | Sottotitoli, label             |

Footer background: `#1e2a35` (blu-grigio caldo, non `--dark-2`).

## Font

- **Titillium Web** (Google Fonts) – titoli, bottoni, label uppercase
- **Open Sans** (Google Fonts) – corpo testo

## Componenti principali

### Header
Sticky, bianco, logo + testo "Ambulanza / Selvino · Aviatico", nav, social icons, CTA buttons.
Mobile: hamburger + mobile-nav overlay fullscreen.
Nav links: Home | Associazione | Servizi | Contatti (+ Diventa Volontario / Dona Adesso).

### Join Banner
Sfondo **arancione** (`var(--orange)`). Usare `btn-white` (non `btn-orange`) per il pulsante principale, e `btn-white-outline` per quello secondario.

### Carosello (carousel)
Il sito ha **due caroselli** in `associazione.html`, entrambi gestiti dallo stesso JS tramite `querySelectorAll('.carousel')`:
1. **`#main-carousel`** – "Inaugurazione 26 Aprile 2026" (6 foto in `images/eventi/inaugurazione/`: taglio-nastro, benedizione, presidente, mg-6071/6108/6129)
2. **`#gallery-carousel`** – "La Nostra Squadra" (16 foto, tutte in `images/team/`: gruppo, gruppo2-7, gruppo10-12, team-rosso, team-gruppo, vol8/11/12, arena-verona)
- JS in `main.js` (sezione 6 – CAROUSEL)
- CSS in `style.css` (sezione CAROUSEL)
- Auto-play 4.5s, pausa su hover, swipe touch, dot indicators, prev/next buttons
- `object-fit: contain` + sfondo `#111` per foto verticali da telefono

### Sezione Consiglio Direttivo
In `associazione.html`, tra "Chi Siamo" e "Timeline". Foto: `images/associazione/consiglio-direttivo.jpg`.

### Pagina Servizi (servizi.html)
Tab sticky sotto l'header con 5 sezioni:
1. **#emergenza** – Emergenza 112, griglia 3 foto (`ambulanza3`, `ambulanza4`, `elicottero`)
2. **#trasporto** – Trasporto Sanitario, foto singola `trasporti-programmati.jpg`, contatto Antonia Rondi 333 413 4299
3. **#manifestazioni** – Assistenza Manifestazioni, griglia 3 foto: `manifestazioni6` (sp-wide top), `manifestazioni-2` (basso sx), `manifestazioni5` (basso dx con 2 volontari)
4. **#presidio** – Presidio del Territorio (pressione, glicemia, DAE), griglia 6 foto
5. **#formazione** – 4 sub-blocchi con layout `servizio-grid` separati da `.formazione-divider`:
   - **Scuole**: griglia 3 foto in `formazione/scuole/` (`formazione-scuole.jpg` come sp-wide, `-2`, `-3`)
   - **Soccorritori**: 2 foto affiancate senza sp-wide (`formazione-soccorritori-1`, `formazione-soccorritori-2`)
   - **Comunità**: griglia 3 foto (`formazione4.jpg` sp-wide, `formazione2.jpg`, `formazione6.jpg`)
   - **Aziende**: foto `aziende/formazione-aziende.jpg`

### Home (index.html) – contenuti rivisti il 16/10/2026
- **Storia con le date**: 1968 prima ambulanza, messa in strada dalla sezione AVIS
  Selvino Aviatico (con link), 1993 associazione, 2021 convenzione AREU. Il soggetto del
  1968 resta il soccorso, non l'ente (vedi *Dati associazione*).
- **L'Altipiano raccontato con i numeri**, non con gli aggettivi: circa mille metri, il 44%
  delle missioni fuori dall'Altipiano, 66 comuni raggiunti. Niente elisoccorso: non è in
  carico all'associazione, lo manda AREU.
- **Contatore interventi** fra `<!-- CONTATORE:INIZIO -->` e `<!-- CONTATORE:FINE -->`, riscritto
  di notte dall'automazione (vedi *SEO > GEO/AIO*): non va corretto a mano.

### News (index.html)
3 card news:
- **Evento**: `images/eventi/inaugurazione/evento-taglio-nastro.jpg` – «Inaugurata la nuova
  ambulanza – 26 aprile 2026», scritta come cronaca con il link alle foto. Fino al 16/10/2026
  era ancora l'invito («Siete tutti invitati!», senza anno) sei mesi dopo l'evento: una news
  con una data va riletta quando la data passa.
- **Formazione**: `images/servizi/formazione/formazione1.jpg` – Formiamo i soccorritori
- **Volontariato**: `images/news-team.jpg` – Entra a far parte della squadra

### Contatti (contatti.html)
Blocchi contatto: Sede Operativa, Sede Legale, Email, Disponibilità, Presidente (Alberto Grigis 346-1099244), **Trasporti Programmati (Sig.ra Antonia Rondi 333-413 4299)**, Social.

## PDF (cartella docs/)

- `contributi-pubblici-2020.pdf` … `contributi-pubblici-2025.pdf`
- `volontariato-vacanza.pdf`

## Pagina "I nostri numeri" (numeri.html)

Dashboard con le statistiche reali del servizio, generate dal registro delle missioni.

- **Dati**: `dati/statistiche.json`. **Non va modificato a mano**: lo riscrive ogni notte
  lo script Apps Script "Gestione Missioni 118 - automazioni" (progetto separato, sorgenti
  in `G:\Drive condivisi\MISSIONI 118\AMB_programma missioni\apps-script`) tramite le
  API di GitHub. Ogni notte in cui i dati cambiano arriva un commit automatico su `main`.
  Chiavi del payload pubblico: `aggiornato`, `annoCorrente`, `anni`, `missioni`, `comuni`,
  `altopiano`, `km`, `anniExtra`, `oreMesi`, `tipologie`, `oreEmergenza`, `confronto`.
- **Grafici**: `js/dashboard.js`, SVG disegnato a mano — nessuna libreria, in linea con la
  regola "solo vanilla" del sito. Espone `AMB_DASH.carica(url, contenitore, opzioni)`.
- **Stili**: `css/dashboard.css`, usa le variabili di `style.css` con fallback propri.
- Lo **stesso** CSS e JS sono caricati anche dalla dashboard interna riservata (web app
  Apps Script), che li prende da questo dominio: se rinomini o sposti quei due file,
  la dashboard interna smette di disegnare i grafici. In `numeri.html` sono richiamati con
  un `?v=<data>` di cache busting (oggi `?v=20261016a`): quando si modifica uno dei due file
  va alzato **anche** nella web app, altrimenti una delle due dashboard resta sul file vecchio.
  ⚠️ È già successo (27/09/2026): la scheda Ossigeno era stata scritta, committata e pushata,
  ma con il `?v=` fermo al giorno prima il file servito restava quello vecchio — **senza alcun
  errore**, né a video né in console. Il sintomo è una funzione che "non c'è" pur essendo nel
  sorgente. Regola pratica: chi tocca `dashboard.js` o `dashboard.css` alza il `?v=` nello
  stesso commit, in **entrambi** i posti.
  ⚠️ **È successo di nuovo**: il 30/09/2026 `dashboard.js` ha preso i tempi di partenza per
  composizione dell'equipaggio con il `?v=` fermo al 27/09, sistemato solo il 16/10
  (`20261016a`, web app riservata alla versione 32). Il secondo posto è fuori da questo
  repository, ed è per questo che si dimentica: `dashboard.html` del progetto missioni,
  poi `clasp --user ambulanza push --force`, `create-version` e `update-deployment`
  sul deployment della web app (`AKfycbwOYoEz…`, non quello @HEAD).
- **Un solo file JS, due payload diversi.** `dashboard.js` disegna sia la pagina pubblica sia
  la dashboard riservata, ma la parte "composizione" (un grafico per tipo di personale +
  tabella persone) si accende solo se nel payload c'è `volontari`. Nel JSON pubblico
  `volontari` e `tipiPersonale` **non ci sono di proposito**: stanno solo nel payload che
  la web app autenticata passa a `AMB_DASH`.
- **La riservata è a schede** (`montaSchede()`): *Panoramica* (la stessa pagina pubblica),
  *Tempi di partenza* (`tempiPartenza`), *Mezzi e km* (`kmStorico`), *Persone*
  (`volontari`), *Ossigeno* (`ossigeno`, dal 27/09/2026: uscite con ossigeno per anno e tipo,
  esiste solo dagli anni in cui la colonna OSSIGENO c'è, cioè dal 2024). Ogni pannello si disegna la prima volta che viene aperto, perché i grafici
  prendono la larghezza del contenitore e da nascosto vale zero; l'ultima scheda aperta si
  ricorda in `localStorage` (`amb-dash-scheda`). La pubblica non ha schede: con
  `opzioni.riservato` falso `monta()` chiama solo `montaComune()`.
- **Tipi di personale** (dipendenti, volontari, TS…): l'elenco **non** sta in `dashboard.js`.
  Arriva nel payload riservato come `tipiPersonale`, generato da `05_tipi.gs` nell'Apps
  Script, che è anche quello che genera il menu a tendina del foglio. In `dashboard.js` c'è
  solo un ripiego minimo (`TIPI_RIPIEGO`, dipendenti + volontari) per payload più vecchi del
  codice: non aggiungere liste di tipi qui.
- La pagina è raggiungibile dal menu del **footer** di tutte le pagine (non dal menu
  principale) ed è in `sitemap.xml`.
- Sulla pagina finiscono **solo dati aggregati**: niente nomi di volontari, niente dati
  per persona. Il sito è statico e pubblico, qualsiasi "area riservata" lato browser
  sarebbe aggirabile — i dati per volontario stanno solo nella web app autenticata.

## Pagine nascoste (fuori dal menu)

Due pagine del sito **non** sono raggiungibili dalla navigazione, **non** stanno in
`sitemap.xml` e portano `<meta name="robots" content="noindex, nofollow, noarchive">`.
Ci si arriva solo con un link diretto o un QR code.

> **Attenzione a `robots.txt`:** non vanno messe in `Disallow`. Se il crawler non può
> scaricare la pagina non legge nemmeno il `noindex`, e l'URL può finire in SERP senza
> contenuto. La regola giusta è quella attuale: crawling libero + `noindex` nella pagina.

C'era anche `quiz60.html`, il quiz del 60° AVIS: **rimosso il 22/10/2026** perché non si
usa più. Chi apre un vecchio link o QR code finisce sulla `404.html`. Resta nella storia
di git se mai servisse.

### `sciesopoli/index.html` — modulo di manleva dei visitatori di Sciesopoli
Modulo digitale che sostituisce il cartaceo del Comune di Selvino per l'accesso al
complesso tutelato "Sciesopoli" (via Cardo 26). Cinque passi, firma su `<canvas>`,
da 2 firme (adulto) a 5 (minore con due genitori).

- **Nessun riferimento all'associazione.** La pagina non ha logo, non nomina l'ente e
  **non carica un solo file dal resto del sito**: niente CSS, niente font, niente immagini
  (favicon inclusa, disegnata inline in SVG). Una sola richiesta HTTP, la pagina stessa.
  Va tenuta così: serve perché il modulo è del **Comune**, e perché la pagina possa essere
  servita da un dominio breve neutro senza modifiche.
- **Configurazione** in cima allo `<script>`, cinque costanti: `ENDPOINT` (web app Apps
  Script; vuoto = non invia niente), **`MODO_PROVA`** (fascia "modulo di prova" in cima),
  `VERSIONE_TESTO`, `PROPRIETA`, `SCADENZA`.
- **`MODO_PROVA` è indipendente da `ENDPOINT`.** Con entrambi attivi i moduli vengono
  salvati davvero ma contrassegnati come prova: codice `PROVA-…`, cartella `Moduli-prova/`,
  riga `PROVA` nel registro, fascia rossa sul PDF, contatore separato. Serve a mostrare il
  giro completo al Comune senza sporcare l'archivio vero; `eliminaProve()` nel backend
  cancella tutto in blocco il giorno dell'apertura al pubblico.
- **Il testo è una proposta, non ancora approvata** (`2026-09-proposta-v2`). Rispetto al
  cartaceo del Comune: Proprietà aggiornata a SciesopoliLab, esonero e rinuncia limitati
  con la salvezza di dolo e colpa grave (art. 1229 c.c.), casella di approvazione specifica
  ex artt. 1341-1342 c.c., base giuridica portata dal consenso all'interesse pubblico
  (art. 6.1.e). Quando il Comune approva, la versione diventa `comune-v2`.
- **`VERSIONE_TESTO` sta in due posti** — nella pagina e nello script lato server — e il
  server rifiuta gli invii con versione diversa: si alzano **insieme**, lo stesso giorno,
  ogni volta che cambia il testo legale.
- **Il PDF lo compone il server**, dal proprio modello: dal browser arrivano solo dati e
  firme. Altrimenti basterebbe modificare la pagina per archiviare un testo diverso.
- **Due lingue, un solo testo che fa fede.** Selettore IT/EN in alto; la lingua di partenza
  la sceglie `navigator.language`. Le stringhe stanno in `TESTI` (un oggetto per lingua) e
  vengono applicate da `applicaLingua()` tramite la tabella `MAPPA` (selettore CSS -> chiave;
  "!" davanti alla chiave significa innerHTML). L'inglese e' **una traduzione di cortesia**:
  lo dice il testo stesso, e il **PDF archiviato e' sempre in italiano**, con una nota in calce
  quando il visitatore ha letto l'inglese. La lingua scelta finisce nel registro.
- Niente `localStorage`: i dati restano in memoria, si perdono chiudendo la pagina.
- ⚠️ **Trappola del riquadro firma.** Finché un passo è nascosto il suo `<canvas>` misura
  **1×1**: un PNG preso in quel momento è bianco, mentre il controllo sulla firma passa lo
  stesso perché guarda i tratti registrati, non i pixel. Per questo `mostra()` ridimensiona
  le tavolette **in modo sincrono** appena il passo diventa visibile (non in un `setTimeout`),
  e `png()` rifà la tela se la trova ancora degenere. Non togliere né l'uno né l'altro:
  il sintomo sarebbe una firma vuota nell'archivio, senza alcun errore a video.
- ⚠️ **Il testo legale sta in due posti**: nella pagina (quello che il visitatore legge) e
  nel backend (quello che finisce nel PDF archiviato). Il controllo su `VERSIONE_TESTO`
  confronta **stringhe, non contenuti**: se si cambia il testo solo da una parte e si alza la
  versione in entrambe, il controllo non se ne accorge e si archivia un atto diverso da quello
  sottoscritto. Quando si tocca il testo, si toccano **tutti e due i file**.
- **Materiale non pubblicato**, in `_materiali/sciesopoli/` (ignorata da git):
  `MANLEVA SCIESOPOLI 2026.pdf` (modulo originale del Comune),
  `PIANO modulo digitale manleva.md` (piano di lavoro completo, fasi 0-6) e
  `sciesopoli-manleva.gs` (backend Apps Script: PDF, Drive, registro, cancellazione
  automatica alla scadenza) e **`ATTIVAZIONE.md`** (come accendere il salvataggio in 15
  minuti, come si passa in funzione, e il dominio breve con il Worker Cloudflare già
  scritto). Il `.gs` sta lì di proposito: quello che finisce nel repo finisce su
  GitHub Pages.

**Non è ancora in funzione.** Prima servono, dal Comune: il testo aggiornato con la
Proprietà corretta (il modulo cita ancora *Schiavo & C. S.p.a.*, ma da luglio 2026 il
proprietario è **SciesopoliLab Impresa Sociale**), la nomina a responsabile ex art. 28
GDPR se l'archivio lo tiene l'ODV, e l'accettazione della firma elettronica semplice.
Dettagli e clausole da far rivedere a un legale: §2 del piano.

### `checklist/index.html` — check list dei mezzi (uso interno)

Sostituisce la compilazione a mano della check list settimanale. Si sceglie il mezzo e la
lista si adatta; alla fine il PDF finisce **nella cartella d'archivio che si usa già**, con
lo stesso nome di oggi (`AAAA_MM_GG Mezzo.pdf`), e una riga va in un registro dedicato.

- **Tre mezzi**, dati estratti dagli Excel reali in
  `DOC per CONTROLLI/CHECKLIST e CONTROLLI AMBULANZA`:
  Crafter 006 (GG107BB) 151 controlli, Crafter 007 (HA765XA) 151, Ducato (FH827CZ) 147.
  I dati sono **incorporati nella pagina** come JSON (`<script id=dati-checklist>`): la
  pagina non dipende da Drive per funzionare. Se cambiano gli Excel vanno rigenerati con
  `parse_check.py` e `parse_doc.py` in `_materiali/checklist/`.
- **Si compila a due livelli**, nell'ordine in cui si gira il mezzo (prima carburante,
  documenti e vano guida, poi zaini, gavoni, vano sanitario). Il **gruppo** è il contenitore
  che si apre — `BORSA PORTA PARAMETRI`, `LATO SINISTRO` — e dentro ci sono le **zone** da
  spuntare (`CENTRALE`, `LATO`, `MEDICAZIONE`). Nei dati la gerarchia sta in `gruppi`
  (`{nome, zone[]}`) e ogni voce porta `gruppo` + `zona`.
  - I gruppi **senza** sottozone (`DAE` sul Ducato, i tre blocchi di testa) restano a un
    livello solo: incartarli in un secondo accordion vuoto sarebbe un tocco in più per niente.
  - Aprire un gruppo apre subito la prima zona da fare; finita l'ultima zona di un gruppo si
    salta al gruppo dopo. L'avanzamento conta le **zone**, non i gruppi: 27 sul Crafter 006.
  - ⚠️ Le regole CSS sulla freccia vanno sul **figlio diretto** (`.gruppo.aperto >
    .gruppo-testa .freccia`): da discendenti ruotavano anche le frecce delle zone annidate,
    che sembravano tutte aperte pur essendo chiuse.
  - Ogni zona ha «Tutto presente»: 27 tocchi invece di 149, ma **non si può inviare finché
    ogni zona non è stata guardata** — e non c'è un «tutto presente» a livello di gruppo,
    che sarebbe un timbro.
  - ⚠️ **Le voci con il `+` non vanno divise** (114 su ~365, es. `Garze Sterili 2M + 2P + 10
    Non`, qta 14). Sembrano elenchi di pezzi separati, ma la quantità non ha un significato
    unico: a volte è la somma dei pezzi (`2+2+10 = 14`), a volte il numero di gruppi
    (`Autoprotezione + 2 Ghiaccio + Metallina + Traversa` ha qta 16 e quattro pezzi), a volte
    è implicita nel testo (`Maschere Ambu AD # 3-4-5 + siringa` = 3 maschere + 1 siringa = 4).
    In più il `+` non è sempre un separatore: in `Canule Mayo Guedel # 40+50+60` elenca le
    misure. Dividendo automaticamente, **50 voci su 114 prenderebbero quantità sbagliate** —
    e su una check list di ambulanza una quantità sbagliata è peggio di una riga da leggere.
    Decisione del 27/09/2026: **restano come sul cartaceo**, una riga e una quantità. Se un
    giorno servisse il dettaglio, si dividono negli **Excel dei mezzi**, dove chi sa cosa c'è
    nelle borse può assegnare la quantità vera a ogni pezzo, e si rigenera con `parse_check.py`.
- **Le sezioni di testa** (`Controllo carburante`, `Controllo documenti`, `Controllo vano
  guida`) non stanno negli Excel dei mezzi: vengono dal file **`CONTROLLI OGNI CHECK LIST
  tutti i mezzi`**, un foglio per mezzo, e si rigenerano con
  `_materiali/checklist/aggiorna_documenti.py`.
  - **La sorgente è il file `.xlsx`**, non più un Google Sheet: il 27/09/2026 il foglio Google
    è stato cestinato e sostituito dall'Excel in
    `DOC per CONTROLLI/CHECKLIST e CONTROLLI AMBULANZA/CHECK LIST CRAFTER 007/`.
    Si legge e si scrive in locale, niente da scaricare e niente da condividere.
  - ⚠️ Di quel file girano **più copie** nelle cartelle degli altri mezzi, e al 27/09/2026 erano
    disallineate fra loro (assicurazione e tagliando del 007 con tre date diverse). Fa fede
    quella nella cartella **CRAFTER 007**, che è la più recente; le altre sono avanzi.
  - ⚠️ Il file contiene un'immagine (`DANNI E SEGNALAZIONI MEZZO`) e sei ancoraggi:
    **openpyxl in scrittura li perde**. Per correggere una cella conviene sostituire la
    stringa dentro `xl/sharedStrings.xml` riscrivendo lo zip voce per voce, così tutto il
    resto resta identico. Nota utile: Excel deduplica le stringhe uguali, quindi una sola
    sostituzione sistema la stessa voce su più schede.
  - `DATA` e `FIRMA` (campi del cartaceo) sono nella lista `FUORI` dello script e non devono
    rientrare.
  - **`Tariffario programmate` c'è solo sul Ducato** (rimesso il 02/10/2026, era stato tolto
    il 27/09 per errore), **solo** come articolo su `LATO SINISTRO / MENSOLA`. Nel foglio
    `CONTROLLI OGNI CHECK LIST` sta anche fra i documenti, ma spuntarlo due volte non serve:
    `aggiorna_documenti.py` lo salta con la lista `SOLO_ARTICOLO`. Sui due Crafter non c'è, ed è giusto così: non c'è già nelle sorgenti
    (né nelle loro schede di `CONTROLLI OGNI CHECK LIST` né nei loro Excel), quindi non serve
    nessun filtro. Non rimetterlo in `FUORI`, che varrebbe per tutti e tre i mezzi.
  - **Voci che sul mezzo ci sono ma nelle sorgenti no** (09/10/2026, Ducato): `Batteria scorta DAE`
    in `DAE`, `Scheda manifestazioni` su `LATO SINISTRO / MENSOLA` (tolta dai documenti,
    come il tariffario) e `Registro di bordo` in `Controllo vano guida`, prima della pulizia.
    Stanno nei dizionari `AGGIUNTE` di `parse_check.py` (articoli, regola 6) e di
    `aggiorna_documenti.py` (controlli), e in `SOLO_ARTICOLO_MEZZO`, che a differenza di
    `SOLO_ARTICOLO` vale per un mezzo solo: sui Crafter la scheda manifestazioni resta fra i
    documenti. Non sono state scritte negli Excel perché nel file del Ducato DAE e mensola
    non hanno righe libere: inserirne vorrebbe dire spostare celle unite e il disegno della
    cartacea. **La cartacea quindi non le ha.** Se un giorno si aggiornano gli Excel, gli
    script se ne accorgono («c'è già nell'Excel») e la voce va tolta da `AGGIUNTE`.
  - `Controllo carburante` nel foglio è un'intestazione con la sua casella accanto, senza voci
    sotto: qui diventa una sezione con un controllo solo.
- **Scadenze collegate al GESTIONALE SCADENZE.** Assicurazione, revisione e tagliando hanno la
  data scritta dentro il testo della voce *e* nel foglio `GESTIONALE SCADENZE`, che è quello
  che si guarda quando si rinnova. Due elenchi a mano divergono in silenzio: al 27/09/2026
  **quattro voci su nove non tornavano**, col tagliando del Crafter 007 sfasato di oltre un anno.
  - `_materiali/checklist/scadenze.py` confronta i due e segnala le differenze; con `--scrivi`
    riscrive le date nella pagina e incorpora `scadenze` nei dati del mezzo. Il gestionale fa fede.
  - ⚠️ **Le date nella pagina sono una copia, e invecchiano.** Il 28/10/2026 i tagliandi di
    Crafter 006 e Ducato erano stati rinnovati nel gestionale (30/10 e 28/10/2027), ma la
    check list mostrava ancora 30/10/2026: nessuno aveva lanciato `scadenze.py`, e niente lo
    lancia da solo. Da quel giorno la pagina le **legge vive**: la risposta all'azione
    `difetti` porta anche `scadenze` (`scadenzeAttuali_()` nel backend, stessa ricerca per
    targa + tipo delle correzioni) e `aggiornaScadenze()` le sostituisce alla copia, nei dati
    e, se la lista è già a video, anche nella riga. Se il backend non le manda resta la copia
    incorporata: per questo `scadenze.py --scrivi` serve ancora, ma come ripiego e non più
    come unico canale. Richiede il backend dalla **versione 14** (in produzione dal
    28/10/2026, verificata sui tre mezzi): con una versione precedente la risposta non ha
    `scadenze` e la pagina, senza errori, usa la copia.
  - ⚠️ **Ordine degli script**: `aggiorna_documenti.py` rilegge le date dal foglio
    `CONTROLLI OGNI CHECK LIST`, quindi va lanciato **prima** di `scadenze.py`, altrimenti
    riporta indietro le date già allineate. Al 27/09/2026 quel foglio ha ancora 31/10/2026
    per i tagliandi di 006 e Ducato — **corretto a 30/10 nell'.xlsx il 27/09/2026**, backup
    accanto al file. Prima di quel fix ogni rigenerazione reintroduceva il refuso e
    `scadenze.py` doveva ricorreggerlo.
  - La pagina usa quelle date per mettere un cartellino **«scaduta»** (rosso) o **«fra N giorni»**
    (ambra, sotto i 30) accanto alla voce: una revisione scaduta si deve vedere *prima* di
    uscire, non a cose fatte. Senza `scadenze` nei dati non compare niente e la pagina funziona
    lo stesso.
  - Il foglio è condiviso in lettura col service account
    `pianificatore-turni@xenon-shard-300518.iam.gserviceaccount.com` (dal 27/09/2026).
    ⚠️ L'ID sta in cima allo script: se non risponde, lo script lo ricerca **per nome** fra i
    fogli condivisi e stampa quello giusto. Serve perché un ID trascritto a mano si sbaglia
    facilmente — `I` maiuscola e `l` minuscola sono identiche in quasi tutti i caratteri, ed è
    successo davvero: un carattere su 44 e la risposta era 404, indistinguibile da un foglio
    non condiviso.
- **Correzione della scadenza dalla check list** (dal 27/09/2026). Accanto ad assicurazione,
  revisione e tagliando c'è «la data non è questa»: si apre un campo data già compilato con
  il valore del gestionale. Se il volontario lo cambia, al riepilogo compare un riquadro con
  `vecchia → nuova` e una **spunta di conferma**; senza spunta il salvataggio si ferma e lo
  dice (il backend scarterebbe la correzione in silenzio, che è peggio).
  - Il backend scrive nel gestionale come **seriale**, non come testo: il foglio è in locale
    `en_US`, e `02/09/2027` scritto come stringa ci finisce come **9 febbraio**.
  - La riga si cerca per **targa + tipo**: i nomi dei mezzi nel gestionale sono scritti a mano
    e cambiano grafia, la targa no.
  - La notifica Telegram non ha un chat id fisso: legge il foglio `CODICI` del gestionale e
    manda ai chat del **Responsabile** di quella riga, come fa già `sendPerResponsible_()`
    del progetto `gestionale`. Se cambiate gruppo, cambia da solo.
  - `BOT_TOKEN` sta nelle **Script Properties** del progetto Check list mezzi, mai nel repo:
    questo repository è pubblico su GitHub.
  - Le correzioni girano **dopo** il salvataggio e dentro un `try`: una check list compilata
    non si butta via perché una data non quadra. In `MODO_PROVA` non vengono applicate.
  - **Il nickname non è autenticato, ed è una scelta** (27/09/2026). La pagina è pubblica e
    chi compila sceglie il nome da un elenco, senza login: tecnicamente chiunque abbia il
    link può cambiare una scadenza a nome di chiunque. Si è deciso di non mettere un login
    perché **la notifica Telegram è il rilevatore**: ogni modifica arriva subito al gruppo
    *Dipendenti dall'ambulanza*, che è anche l'insieme delle persone che quelle date le
    modificano davvero. Una modifica non autorizzata sarebbe vista da 17 persone nel momento
    in cui avviene.
    I limiti stanno quindi **a valle e non a monte**: solo i 3 tipi di scadenza e i 3 mezzi
    noti, mai cancellazioni, data entro un intervallo plausibile, e ogni modifica annunciata
    **con il valore precedente** e con la nota che il nome è dichiarato — così si torna
    indietro senza dover ricostruire niente.
    ⚠️ Il ragionamento regge finché la notifica funziona: se un domani si toglie l'invio
    Telegram, o si cambia il responsabile di quelle righe in `CODICI` senza un chat valido,
    resta la scrittura pubblica **senza più nessuno che se ne accorga**. Se si tocca la
    notifica, va rimesso un controllo a monte (il pulsante di conferma su Telegram).
  - Il registro ha una colonna `scadenze_corrette` con `tipo: vecchia -> nuova`.
- **Progetti e fogli collegati alla check list** (ID utili, nessuno è segreto: i token stanno
  nelle Script Properties, mai qui — questo repository è pubblico):

  | Cosa | Dove |
  |---|---|
  | GESTIONALE SCADENZE | `1b4XeICCnSha6WKbQubAJuHChbQBFta85tIhyYZuvnfo`, scheda `GENERALE` |
  | CONTROLLI OGNI CHECK LIST | `1q2Jc3qKEdr5vkhgEwXWSX19g77zCqnDZm1ZAeIR8rgQ`, una scheda per mezzo |
  | Progetto `gestionale` (bot `@gestionaleselvinobot`) | `1i8Zk55u393zuUWSWgjhhUZ1YcnbevI2B_qF8zVZsZfZzyg6EI00xGWVY` |
  | Sorgenti del gestionale, clonate in locale | `G:\Drive condivisi\BOT TELEGRAM\GESTIONALE\AMB_gestionale` |
  | Progetto `Gestione Missioni 118 - automazioni` | `16FKmeZkrO92fNdM86oV0sR93AYmTLBvqXM5I2o82S1TyqvDdOQggSofU` |
  | Sorgenti missioni, clonate in locale | `G:\Drive condivisi\MISSIONI 118\AMB_programma missioni` |

  La dashboard riservata è `dashboard.html` **dentro il progetto missioni**: è lì che vive il
  secondo `?v=`, e la scheda Ossigeno si accende da `dashboard.js` (`montaSchede()`), non
  dall'HTML — cercare "ossigeno" nell'HTML non trova niente ed è normale.
  ⚠️ La web app gira su una **versione fissata** (la 32 al 16/10/2026), non su HEAD: dopo un
  `clasp push` la riservata non cambia finché non si ridistribuisce. Per sapere cosa sta
  davvero servendo si confronta con
  `script.googleapis.com/v1/projects/<id>/content?versionNumber=<n>`.
  ⚠️ Il token di clasp scade in un'ora, ma `.clasprc.json` contiene `refresh_token`,
  `client_id` e `client_secret`: si rinnova da soli contro `oauth2.googleapis.com/token`,
  senza rifare il login.

  ⚠️ Attenzione a trascrivere gli ID **da uno screenshot**: `I` maiuscola e `l` minuscola sono
  identiche in quasi tutti i caratteri, e un carattere sbagliato su 44 dà **404**, che è
  indistinguibile da un foglio non condiviso. Ci si perde un'ora. `scadenze.py` per questo
  cerca per nome quando l'ID non risponde.
  ⚠️ Il service account legge il GESTIONALE (come *Editor*, gli serve per scrivere le
  correzioni) e il Riepilogo del bot 118, ma **non** CONTROLLI OGNI CHECK LIST: quello va
  scaricato in `.xlsx` a mano prima di lanciare `aggiorna_documenti.py`.
- **clasp**: le credenziali dell'associazione stanno nel profilo **`ambulanza`**, non in
  `default`. Si usa con `clasp --user ambulanza <comando>`.
  ⚠️ Non rimetterle in `default`: il 16/10/2026 erano state sovrascritte da un `clasp login`
  fatto con un Gmail personale per un altro progetto, e il push è fallito con *«The caller
  does not have permission»*, che non fa capire che il problema è l'account. Un profilo
  dedicato regge a un login distratto. Per sapere con chi si è loggati:
  `clasp --user ambulanza show-authorized-user`.
  ⚠️ **Il login scade per policy di Google Workspace**: il 23/10/2026 il rinnovo del token
  rispondeva `invalid_grant` / `invalid_rapt` (*reauth related error*). Non è un
  problema di permessi: l'account dell'associazione chiede di riautenticarsi ogni tanto, e
  va rifatto a mano `clasp --user ambulanza login`. Finché non si rifà, niente push
  né lettura delle esecuzioni; e `show-authorized-user` resta appeso invece di dare errore.
  `clasp run` però **non** funziona: vuole l'API di Apps Script
  abilitata, una distribuzione *API executable* e credenziali GCP dedicate. Per eseguire una
  funzione a mano (`setup()`, `ricalcolaOreTurnisti()`) si apre l'editor e si preme Run.
  - Al 27/09/2026 **4 voci su 9 non tornavano**, e non sono state allineate d'ufficio: il
    tagliando del 007 dice 02/09/2027 nella check list (aggiornata quel giorno) e 20/12/2026
    nel gestionale. Quando le due fonti divergono di più di qualche giorno, decide una persona:
    `--scrivi` dà ragione al gestionale sempre, e su una data di documento non è detto sia giusto.
- **Chi compila si sceglie da un elenco di nickname**, non si scrive a mano: i nickname sono
  quelli del tab `Ore Turnisti` del foglio **Riepilogo** del bot 118 (stessa grafia del
  tabellone, così il registro è confrontabile con i turni). L'elenco è **incorporato nella
  pagina** (`<script id=dati-turnisti>`) e si rigenera con
  `_materiali/checklist/genera_turnisti.py`, che legge il foglio con il service account di
  `AMB_bot ambulanza 118/strumenti/credentials.json`.
  - **Ordinati per ore fatte, non alfabeticamente**: chi gira di più sta in cima e di norma
    non deve nemmeno cercare. Criterio: ore dell'anno in corso, poi `TOTALE`, poi alfabetico.
    Il `TOTALE` come secondo criterio serve a gennaio, quando le ore dell'anno sono quasi
    tutte a zero e da solo l'anno in corso non ordinerebbe niente. **Non riordinare l'elenco
    nella pagina**: il JS lo usa nell'ordine in cui lo trova.
  - Chi ha tipologia `Usciti` **non compare** (89 righe su 175 al 27/09/2026). Tutti gli
    altri sì, comprese le tipologie `TS`, `Vacanza` e `Amministrazione`: chi guida un mezzo
    deve poter compilare, ed escludere qualcuno per tipologia lo bloccherebbe in garage.
  - ⚠️ **I refusi vanno corretti nel generatore, non nella pagina**: la pagina si riscrive a
    ogni rigenerazione. I nickname si battono a mano nelle celle del tabellone, quindi
    `Ore Turnisti` raccoglie anche gli errori: `WIlly` con due maiuscole era diventato una
    riga a sé, con 7 ore sottratte a `Willy`. Il generatore riunisce le grafie che
    differiscono solo per **maiuscole, accenti o spazi**, somma le ore e tiene la forma del
    tab **Personale** (l'anagrafica del bot, quella con i chat ID); chi in Personale non c'è
    — 7 persone al 27/09/2026, es. `Bau`, `Testa`, `Fiore` — tiene la grafia con più ore
    alle spalle. Per i refusi che **non** sono di sole maiuscole (lettere invertite, nomi
    diversi) l'automatismo non basta: si aggiungono al dizionario `CORREZIONI` in cima allo
    script. Lo script stampa sempre le grafie che ha riunito, così si accorge da solo dei
    doppioni nuovi.
  - Il refuso resta comunque **nella cella del tabellone**: finché sta lì, il foglio del bot
    continua a tenere le ore divise fra le due grafie e a ogni notte ricrea la riga doppia.
    Il generatore la nasconde al sito, non la cura alla fonte.
  - ⚠️ **Nella pagina finiscono solo i nickname, mai le ore.** L'elenco sta in un file
    pubblico su GitHub e la pagina è raggiungibile da chiunque abbia il link: l'ordine porta
    con sé quel tanto che serve a rendere veloce il menu, i numeri di ciascuno no. Vale la
    stessa logica dei dati aggregati di `numeri.html`.
- **Nessun campo km.** Toglierlo dalla pagina ha voluto dire toglierlo anche da `COLONNE`,
  dal PDF e dalla riga di registro nel backend. ⚠️ In `setup()` le larghezze delle colonne
  del registro ora si ricavano da `COLONNE.indexOf(...)`: erano indici fissi (9 e 10) che
  contavano anche i km e dopo la rimozione avrebbero allargato le colonne sbagliate.
- **Bombole: pressione obbligatoria, ognuna dove sta davvero** (27/09, rivisto il 29/09/2026).
  Le cinque bombole di cui si rileva la pressione stavano in tre posti diversi a seconda del
  mezzo (`LIVELLI BOMBOLE` su 006 e Ducato, dentro `PENSILE SOPRA PORTA SCORREVOLE` sul 007).
  Ora ognuna sta dove sta fisicamente, come sulla cartacea: sui **Crafter** 1 nello zaino
  (`ZAINO RIANIMAZIONE / INTERNO GRANDE`) e 4 in `VANO SANITARIO`; sul **Ducato** 1 nello
  zaino (`ZAINO ADULTO / GRANDE`), 2 da 2 L sotto il lato destro (`LATO DESTRO / SOTTO`)
  e 2 da 7 L in `VANO SANITARIO`. Ognuna ha un campo **atm**: senza il numero la zona non risulta fatta e
  non si prosegue. Una spunta da sola non dice se la bombola va cambiata.
  - Sulla cartacea la bombola dello zaino compare **due volte**: come presenza nello zaino
    (`Bombola O2`) e come pressione nel blocco dei livelli (`Bombola 2l Zaino atm`). Qui la
    riga della pressione **prende il posto** di quella di presenza, nella stessa posizione:
    stessa logica del vano sanitario, dove il conteggio è stato tolto perché la pressione
    lo rende implicito.
  - ⚠️ **Non confondere le due famiglie di righe.** Quelle da compilare finiscono con
    «atm» (`Bombola 2l Vano atm`); quelle con la pressione **nominale fra parentesi**
    (`Bombola O2 2l (50 atm)`) sono controlli di presenza e restano dove sono. La prima
    versione del filtro prendeva anche le seconde e sul Ducato usciva con 8 bombole invece
    di 5. Il filtro giusto è «inizia per bombola **e** finisce con atm».
  - Le righe di solo conteggio che erano in `VANO SANITARIO` (2×7L, 2×2L) sono state tolte:
    se di ogni bombola si scrive la pressione, la presenza è implicita.
  - ⚠️ **Le etichette «Vano» della cartacea non vogliono dire «vano sanitario».**
    `Bombola 2l Vano atm` indica il vano del mezzo in generale. Sul Ducato il vano sanitario
    contiene solo le due da 7 L: le due righe «2 L Vano» sono le bombole **sotto il lato
    destro**, e lo dicono i conti (5 bombole in presenza, 5 righe di pressione). Il 27/09 erano
    finite nel vano sanitario per errore; aggiungere altri campi sotto il lato destro avrebbe
    fatto scrivere due volte la pressione delle stesse due bombole. La regola in
    `regole()` è generica: una riga di presenza fuori dal vano sanitario, con N bombole
    da X litri, viene sostituita da N righe di pressione da X litri. Se i conti non tornano
    la lascia com'è e lo stampa.
  - ⚠️ **Queste regole stanno in `parse_check.py` (funzione `regole()`), non nella
    pagina.** Fino al 29/09/2026 bombole, ECG e `DAE` erano stati sistemati a mano nei dati
    della pagina e lo script non ne sapeva niente: il primo `--scrivi` li avrebbe cancellati
    in silenzio. Chi cambia la struttura della check list cambia `regole()` e rigenera;
    il confronto senza `--scrivi` deve mostrare **solo** la modifica voluta. Il confronto
    ora guarda anche `atm` ed `ecg`, non solo gruppo, zona, quantità e articolo.
  - ⚠️ Il confronto **non vede l'ordine dei gruppi**: va controllato a parte. Il 27/09 lo
    spostamento delle bombole aveva fatto risalire `VANO SANITARIO` a metà elenco (sul
    Ducato al quarto posto, prima dei lati), perché i gruppi si costruiscono dalla prima voce
    che compare. Ora le bombole si accodano alla zona di arrivo e l'ordine resta quello
    dell'Excel, cioè il giro del mezzo, con il vano sanitario in fondo.
  - ⚠️ L'avanzamento **conta le atmosfere**, non solo le spunte. Sono allineati di
    proposito: prima il contatore diceva 26/26 e il modulo non faceva comunque proseguire.
- **ECG Cardioline: carica del telefono e tacche della batteria** (27/09/2026), tutti e due
  obbligatori come le atmosfere. Un ECG si controlla acceso: la spunta non dice se reggera'
  la prossima uscita. Telefono 0-100%%, batteria 1/2/3 a pulsanti (piu' veloci di un menu
  sul telefono). Marcate le voci che contengono "Cardioline": **solo i due Crafter**, il
  Ducato non ne ha una (ha `Cellulare GAMES`, che e' un'altra cosa).
  Le misure obbligatorie passano tutte da `misureOk()`: chi ne aggiunge una nuova tocca
  quella, non i tre punti che la usano (validazione, avanzamento, evidenziazione).
- **`ZAINO DAE` si chiama `DAE`** (27/09/2026), su tutti e tre i mezzi.
- **I danni si segnano quando si vedono.** Dal passo dei controlli c'è «Hai visto un danno?
  Segnalalo subito», che porta al passo 3 e ci si torna con «Torna ai controlli»: altrimenti
  per annotare un graffio bisognerebbe prima chiudere tutte le zone.
- **I difetti restano aperti fra una check list e l'altra** (27/09/2026). Scelto il mezzo, la
  pagina chiede al backend i difetti ancora aperti e li disegna già sul mezzo, col bordo
  tratteggiato, insieme a **da quando e da chi** erano stati segnalati. Su ognuno si dice
  «C’è ancora» o «Risolto».
  - Stanno nella scheda **`Difetti`** del registro, non in un documento a parte. Nessuna riga
    viene mai cancellata: lo storico serve a sapere **da quanto** un difetto c'era, che è
    l'informazione che manca oggi (con i soli PDF bisogna aprirli uno per uno).
  - **Un difetto si chiude solo se qualcuno lo marca risolto**, mai per silenzio: chi compila
    in fretta e non tocca niente lascia tutto aperto. Meglio un difetto di troppo che uno
    sparito senza che nessuno l'abbia riparato.
  - I difetti storici **non si trascinano** (la posizione è un dato del passato) e toccandoli
    non si cancellano: si marcano risolti.
  - L'elenco si chiede con una **POST** e non con una GET: è la strada che il browser
    percorre già verso Apps Script, senza sorprese di CORS sul redirect.
  - ⚠️ **Un caricamento fallito non deve essere silenzioso** (dal 23/10/2026). Quel giorno
    la check list del Ducato è partita senza i 7 difetti aperti dal 02/10 (confermati il 9
    e il 16/10), e chi compilava li ha segnalati di nuovo come nuovi: 14 aperti, metà
    doppioni. Il registro era a posto e il backend rispondeva (20 richieste su 20 nello
    stesso pomeriggio): la richiesta è fallita una volta, per rete o per una delle pagine
    d'errore che Apps Script ogni tanto restituisce al posto del JSON, e la pagina andava
    avanti come se il mezzo non avesse difetti. La variabile `difettiCaricati` esisteva
    ma nessuno la leggeva. Ora:
    - **3 tentativi** da soli, con una pausa crescente;
    - le risposte arrivate dopo un **cambio di mezzo si scartano** (`seqDifetti`): prima,
      toccando un mezzo e poi un altro, i difetti del primo potevano finire sul secondo;
    - se non si riesce, il passo 3 mostra un **avviso rosso con «Riprova»**, e per
      passare al riepilogo bisogna premere Avanti **due volte**: si può proseguire (la
      check list non si blocca per un elenco di difetti), ma sapendolo;
    - mentre carica, lo stesso riquadro dice «Sto caricando…».
    Lo stato sta in `statoDifetti` (`"carico"`, `"ok"`, `"errore"`).
  - **Notifica Telegram** all'apertura e alla chiusura, una sola per check list con dentro
    tutto, al responsabile `Mezzi` (ripiego su `Dipendenti`). Vale lo stesso ragionamento
    delle scadenze: il nickname non è autenticato, la notifica è il rilevatore.
    Dal 20/10/2026 (versione 11) la notifica dei difetti **non** ha più la riga «Il nome è
    quello scelto nel modulo, non verificato»: l'unica differenza fra la 10 e la 11. Resta
    invece nella notifica delle **scadenze corrette**, dove chi legge deve sapere che una data
    di documento è stata cambiata da un nome dichiarato.
  - In `MODO_PROVA` i difetti **non** vengono scritti e non parte nessuna notifica: per
    questo il giro completo si prova con un endpoint finto in locale, non in produzione.
  - **Annullare un difetto** (segnato per errore, o senza nota) non è chiuderlo: la riga
    resta, con stato `annullato` e il motivo in `chiuso_da`, e non parte nessuna
    notifica perché non è una riparazione. Lo fa `annullaDifetti_(ids, motivo)` nel backend.
    Non ha un'azione web di proposito: la pagina è pubblica. Si lancia dall'editor, oppure
    come è stato fatto il 29/09/2026 con un ramo `doPost` **monouso** limitato agli id da
    annullare, distribuito, chiamato una volta e tolto subito (versioni 9 e 10).
    Il registro è condiviso col service account (letto con successo il 09/10/2026, schede
    comprese): i difetti si possono leggere da fuori con l'API Sheets, senza passare dal
    backend. Se possa anche scriverci dipende dal permesso dato in condivisione; in ogni
    caso un annullamento va fatto come sopra, cambiando lo stato e mai cancellando righe.
  - Il 29/09/2026 sono stati annullati i 14 difetti delle prime check list vere
    (12 sul Crafter 006, 2 sul 007): erano tutti **senza nota** e un pallino con scritto
    «Graffio» non dice a nessuno dove guardare. Le prossime check list li risegnalano con
    la nota. I PDF di quel giorno restano com'erano.
  - Il 23/10/2026 sono stati annullati **3 doppioni sul Ducato** (versioni 12 e 13), nati
    dal caricamento fallito di quel giorno: le segnalazioni di Alessandro dello specchietto
    sx, del cerchio anteriore dx e dell'ammaccatura sul portellone in alto a dx, già aperte
    da Marta il 02/10. Si è tenuta la riga più vecchia, che porta la data giusta.
    **Lasciate aperte di proposito** due coppie non sicure, finché non le guarda chi conosce
    il mezzo: «Copri cerchio pos dx» / «graffio carrozzeria e cerchio parte dx dietro»
    (la seconda aggiunge la carrozzeria) e «Portellone lat dx» / «graffio portellone
    dietro parte dx» (laterale o posteriore?). Meglio un difetto di troppo che uno perso.
- ⚠️ **Quando si aggiunge o si sposta un passo, si controllano TUTTE le chiamate a
  `mostra()`**, non solo quelle nella navigazione. Inserendo i danni erano
  rimaste indietro le due dentro `salva()`: la check list si salvava davvero
  ma la schermata di conferma non
  compariva, e restava il riepilogo con il pulsante «Salva». Il bug è stato in produzione
  qualche ora prima che uscisse in un collaudo.
- **Danni e segnalazioni** (passo 3, dal 27/09/2026). Ricalca il riquadro *DANNI E
  SEGNALAZIONI MEZZO* del cartaceo: stessi cinque codici (graffio, ammaccatura, rottura,
  malfunzionamento, altro) e le stesse quattro viste del mezzo.
  - Si sceglie il tipo **una volta** e poi si tocca il disegno dove serve: per più danni
    dello stesso genere basta un tocco a testa. Il segno si **trascina** per aggiustare un
    tocco impreciso (sul telefono è l'unico modo per correggere senza rifare) e si toglie
    con un tocco singolo.
  - ⚠️ Il click che segue un trascinamento va **ignorato**, altrimenti sotto il segno
    appena spostato ne nasce un altro: serve la sentinella `trascinato`.
  - Le posizioni sono in **percentuale** dell'immagine, non in pixel: così valgono su
    qualunque schermo e si ridisegnano identiche nel PDF, che usa una copia ridotta.
  - L'immagine viene dal file `CONTROLLI OGNI CHECK LIST` (`xl/media/image1.png`), ripulita
    della fascia del titolo e del riquadro della legenda, che nella pagina sono pulsanti.
    Sta in `checklist/mezzo-danni.png` per lo schermo e incorporata in base64 nel backend
    per il PDF (Apps Script non scarica immagini da internet).
  - Il passo si può saltare: se non c'è niente da segnalare si va avanti.
  - **La nota è obbligatoria su ogni danno nuovo** (dal 29/09/2026, almeno 3 caratteri):
    dove si trova e cos'è. Senza, non si esce dal passo, né con «Avanti» né con «Torna
    ai controlli»: i campi vuoti diventano rossi e il cursore va sul primo. I difetti già
    in archivio non chiedono nota: si confermano o si chiudono. Il controllo sta **solo
    nella pagina**, il backend non rifiuta i danni senza nota: una pagina rimasta in cache
    non deve far perdere una check list già compilata.
  - Nel registro c'è la colonna `danni`.
- Le **mancanze** vanno in testa al PDF con la zona dove si trovano, perché è la parte che
  serve leggere subito; l'esito completo delle 151 voci viene dopo.
- **Il registro è un documento a sé** (`REGISTRO CHECK LIST MEZZI`, creato dal backend nella
  cartella CHECKLIST): non tocca `SCADENZARIO MEZZI` né gli altri fogli esistenti. Serve a
  rispondere a «quando è stata rilevata l'ultima volta questa mancanza» senza aprire i PDF
  uno per uno.
- Se si ricompila lo stesso giorno il file **non viene sovrascritto**: prende ` (2)`.
- **Progetto Apps Script** (creato il 27/09/2026 con l'account dell'associazione):

  | Cosa | Valore |
  |---|---|
  | Script ID | `1ndJKi07VYTGEjM5agjVB8ZWzCBNT6uwgvYS7jhzQZI5zKvBNpFXm-ihI` |
  | Deployment "produzione" | `AKfycbzr7TY0vMt0ubZVdbI3nUbpI1KdaBigWT5m-3F95oBc6N3DLcG4cp41VLKOLB_GLCkZ` |
  | Radice clasp | `_materiali/checklist/gas/` (fuori dal repo) |
  | Registro | `11ncNhZGP6Z-7q2CxY1mOvTNrpxuPpLXzCCigO1FD4u0` (creato da `setup()` il 27/09/2026) |

  **In produzione dal 27/09/2026**: `ENDPOINT` collegato e `MODO_PROVA` a `false`.
  Le check list di prova fatte prima restano in `_PROVE check list/`: `eliminaProve()` le
  cancella in blocco, registro compreso.
  ⚠️ Per provare la web app da riga di comando **non** usare `curl -X POST`: Apps Script
  risponde 302 e con `-X` forzato curl rispedisce il POST senza `Content-Length` (411).
  Basta `--data-binary`, che implica POST e sul redirect passa a GET come fa il browser.

  Deploy: da `_materiali/checklist/gas`, con il profilo dell'associazione:
  `clasp --user ambulanza push --force`, poi `clasp --user ambulanza create-version "..."`
  e `clasp --user ambulanza update-deployment --versionNumber N <id produzione>`.
  ⚠️ **Mai `create-deployment`**: crea un URL nuovo, e la pagina continuerebbe a
  chiamare quello vecchio, fermo alla versione precedente. Al 28/10/2026 la produzione è
  sulla **versione 14**: rispetto alla 13 (stesso codice della 11, 20/10/2026, *difetti
  senza nota sul nome*) aggiunge le scadenze vive nella risposta `difetti`. La 12 era il
  ramo monouso del 23/10. Per sapere cosa gira davvero si confronta il codice locale con
  `script.googleapis.com/v1/projects/<id>/content?versionNumber=<n>`.
  ⚠️ Il registro delle **esecuzioni** (chi ha chiamato il backend e quando) da qui non si
  legge: il token di clasp non ha lo scope `script.processes`. Si guarda dall'editor,
  menu *Esecuzioni*.
  ⚠️ `clasp create-script` **sovrascrive `appsscript.json`** con il suo default, che ha
  `timeZone: America/New_York`: ogni timestamp del registro sarebbe sfasato. Dopo una
  ricreazione va rimesso `Europe/Rome` insieme a `oauthScopes` e al blocco `webapp`.
  ⚠️ `clasp push` da solo salta `appsscript.json`: serve `--force`.
- `ENDPOINT`, `MODO_PROVA` e `VERSIONE` in cima allo script, come in `sciesopoli/`.
  `VERSIONE` sta **sia nella pagina sia nel backend** e va alzata in entrambi quando cambia
  il payload (a `2026-09-v2` con i nickname e la rimozione dei km). Qui non c'è il controllo
  rigido di `sciesopoli/`: la versione viene solo annotata in registro, quindi disallinearla
  non dà errore, rende solo illeggibile lo storico.
- **Il registro si scrive per nome di colonna, non per posizione** (dal 27/09/2026).
  Prima la riga era un array nell'ordine di `COLONNE`: bastava aggiungere un dato al modulo
  per spostare di una casella tutti i valori delle check list già archiviate, e il foglio
  riscriveva l'intestazione **solo se vuoto**. Ora `perIntestazione_()` legge l'intestazione
  vera del foglio, dispone i valori secondo quella e **aggiunge in coda** le colonne nuove
  che non ci sono ancora, senza toccare le righe vecchie. Aggiungere un campo al modulo non
  richiede più di svuotare o rifare il registro.
  Con `MODO_PROVA` le check list finiscono in `_PROVE check list/` e in registro con stato
  `PROVA`; `eliminaProve()` le cancella in blocco.
- Backend e script in `_materiali/checklist/` (fuori dal repo pubblicato):
  `parse_check.py` (corpo della check list dagli Excel dei mezzi),
  `aggiorna_documenti.py` (sezioni carburante/documenti/vano guida),
  `scadenze.py` (confronto col GESTIONALE SCADENZE), `genera_turnisti.py` (nickname).
  Gli ultimi tre leggono i Google Sheet con il service account di
  `AMB_bot ambulanza 118/strumenti/credentials.json`: i fogli vanno condivisi con
  `pianificatore-turni@xenon-shard-300518.iam.gserviceaccount.com` in **sola lettura**.
  `parse_check.py` e `scadenze.py` senza argomenti **confrontano e basta**: modificano la
  pagina solo con `--scrivi`. Conviene sempre guardare prima cosa cambierebbe.
  ⚠️ `parse_check.py` tocca solo `gruppi` e `voci`: `documenti`, `targa` e `scadenze`
  arrivano dagli altri due script e non vanno sovrascritte da qui.

## SEO

- Canonical, geo meta, Open Graph, Twitter Card su tutte le pagine
- Le `og:image` / `twitter:image` usano **URL assoluti** (`https://www.ambulanzaselvinoaviatico.com/...`):
  se si sposta o rinomina un'immagine vanno aggiornati anche lì, altrimenti l'anteprima
  social si rompe in silenzio (il sito continua a funzionare). Immagini OG attuali:
  `hero-principale.jpg` (index, contatti), `associazione/corteo.jpg` (associazione),
  `servizi/emergenza/ambulanza3.jpg` (servizi), `associazione/consiglio-direttivo.jpg`
  (volontario), `logo.png` (numeri)
- JSON-LD: Organization + EmergencyService + WebSite (index), LocalBusiness (contatti),
  5 × Service (servizi). `associazione`, `volontario` e `numeri` non ne hanno ancora.
  L'`Organization` ha `@id` stabile, `sameAs` (Facebook, Instagram), `memberOf` ANPAS,
  `areaServed`, `geo`, `openingHoursSpecification`, `vatID`/`taxID` (CF 95052440161).
  I `Service` puntano all'organizzazione con `"provider": {"@id": ".../#organization"}`:
  l'`@id` va tenuto identico, è quello che lega le entità fra pagine diverse.
- ⚠️ **Il telefono nei dati strutturati va controllato cifra per cifra.** Fino al 16/10/2026
  entrambi i blocchi JSON-LD dichiaravano `+390357646426`, con **una cifra in più**
  (corretto: `+39035764626`). Nel testo visibile il numero era giusto in tutte e 18 le
  occorrenze, quindi l'errore non si vedeva: ma i dati strutturati sono la prima cosa che
  legge un motore, e un assistente avrebbe dettato un numero inesistente.
- **GEO / AIO (motori generativi)**: `robots.txt` non blocca nessun crawler AI, ed è
  voluto — farsi leggere è il presupposto per essere citati. C'è un `llms.txt` in radice
  con i fatti essenziali, i servizi, i recapiti e la nota che **per le emergenze si chiama
  il 112**, non la sede.
  - **`numeri.html` ha un riquadro di testo con le cifre chiave** (dal 16/10/2026), fra i
    marcatori `<!-- NUMERI:INIZIO -->` e `<!-- NUMERI:FINE -->`, **sopra** i grafici.
    Esiste perché la dashboard la disegna JavaScript e i crawler di ChatGPT, Claude,
    Perplexity e Common Crawl leggono l'HTML grezzo: senza, la sola pagina con numeri
    verificabili era l'unica che nessun motore poteva citare (142 parole, e il contenitore
    diceva solo «Caricamento dei dati…»).
    - Lo riscrive ogni notte `pubblicaSintesiNumeri()` in `30_dashboard.js` del progetto
      missioni, chiamata da `pubblicaDashboard()` subito dopo il PUT del JSON. A mano si
      rigenera con `_materiali/numeri/genera_sintesi.py` (`--scrivi` per applicare).
      ⚠️ Il formato è scritto **due volte**, nello script Apps Script e in quello Python:
      se si cambia di là va cambiato anche di qua.
    - Senza i marcatori la funzione **non tocca il file** e lo logga: meglio un riquadro
      vecchio che una pagina rotta in produzione. E gira dentro un `try`: un problema qui
      non deve far fallire la pubblicazione del JSON, che è la cosa importante.
    - È testo normale, visibile anche nel browser: non è contenuto nascosto per i motori,
      che sarebbe cloaking e verrebbe penalizzato.
    - **Anche il contatore della home** è scritto dall'automazione, fra
      `<!-- CONTATORE:INIZIO -->` e `<!-- CONTATORE:FINE -->` in `index.html`, da
      `pubblicaContatoreHome()`. Usa l'**ultimo anno completo**, non quello in corso: in
      home un parziale sembrerebbe un calo. ⚠️ Prima diceva «450+ Interventi/anno», scritto
      a mano: le missioni vere del 2025 erano **519**, quindi il sito si sottostimava di una
      settantina di interventi l'anno. L'etichetta porta l'anno (`Interventi nel 2025`)
      perché senza, un numero secco si legge come media perenne e invecchia peggio.
    - Gli stili `.dash-sintesi` stanno in **`style.css`**, non in `dashboard.css`:
      quest'ultimo è caricato anche dalla riservata, che il riquadro non ha, e toccarlo
      obbligherebbe ad alzare il `?v=` in due posti per niente.
    - Dentro vanno **solo aggregati**. Nel riquadro: missioni dell'anno a oggi contro lo
      stesso periodo dell'anno prima, totale dell'anno precedente, quota di interventi
      sull'Altipiano, ore di turno. **Niente tabella delle missioni per anno**: c'era, ed
      è stata tolta il 16/10/2026 su richiesta perché ripeteva il grafico subito sotto.
      Va tolta da tutti e due i generatori, `30_dashboard.js` e `genera_sintesi.py`:
      togliendola solo dalla pagina, la notte dopo tornerebbe. Fuori anche l'elenco dei
      66 comuni con i conteggi, km, tipologie e ore mensili — aggregati anche quelli, ma
      dettaglio operativo che non aiuta a farsi citare.
  - **FAQ in `servizi.html`** (`#faq`, dal 16/10/2026): sei domande vere con `FAQPage`.
    Sono `<details>` nativi, quindi si aprono senza JavaScript e **il testo resta
    nell'HTML anche da chiusi** — è quello che leggono motori e lettori di schermo.
    - ⚠️ Lo schema `FAQPage` è **generato dal markup visibile**, non scritto a parte: una
      sola fonte, così il testo in pagina e quello strutturato non possono divergere. Se si
      aggiunge una domanda, va rigenerato anche lo schema.
    - Sui **corsi non vanno scritte durate fisse**. Le fonti AREU non concordano: la pagina
      dell'offerta formativa e il Regolamento 34 rev. 2023 danno l'SSE a **78 ore**, pagine
      più vecchie dicono 120 (era il vecchio standard). Il percorso è TS → SSE e lo
      stabilisce AREU, non l'Associazione: la FAQ rimanda a
      `areu.lombardia.it/web/home/offerta-formativa`. Il BLSD per operatori laici (progetti
      PAD) è invece confermato da AREU a **cinque ore**.
    - La FAQ dice esplicitamente che in emergenza **si chiama il 112** e che il fisso della
      sede non è un numero di emergenza né è presidiato di continuo. Vale anche in
      `llms.txt`: è l'informazione che non deve essere sbagliata.
  - `lastmod` in `sitemap.xml` va tenuto allineato: era fermo ad aprile mentre le pagine
    erano di settembre. Per `numeri.html` vale la data di `dati/statistiche.json`, non
    quella del file HTML, perché è il dato a cambiare. Si ricava da
    `git log -1 --format=%ad --date=short -- <file>`, ma va letto: conta l'ultimo
    commit che ha cambiato il **contenuto**. Il 16/10/2026 tutte e sei le pagine hanno preso
    lo script di analytics e il link «Cookie» nel footer: per `associazione` e
    `volontario` è stato l'unico cambio, e il loro `lastmod` resta al 27/09; home,
    servizi e contatti sono cambiate davvero (storia, FAQ, dati strutturati) e sono al 16/10.
    Un `lastmod` che si muove a ogni ritocco tecnico insegna a Google a ignorarlo.
    ⚠️ **Nessuno lo aggiorna in automatico.** L'automazione notturna riscrive il riquadro
    di `numeri.html` e il contatore della home, ma non tocca `sitemap.xml`: il `lastmod`
    di `numeri.html` resta alla data dell'ultimo ritocco a mano. Non è grave (una data
    vecchia fa solo ripassare meno spesso), ma se si vuole esatto va aggiunto alla funzione
    `pubblicaSintesiNumeri()` del progetto missioni.
- `sitemap.xml` (6 pagine pubbliche, nessuna nascosta) e `robots.txt` con la riga
  `Sitemap:`. Nella Search Console la sitemap risulta letta con 6 pagine (14/10/2026).
  C'è anche una seconda voce, `http://www.../sitemap.xml` di tipo *Indice Sitemap*,
  inviata il 12/01/2021: è quella di Wix, non letta dal 2024. **Dalla proprietà del dominio
  non si può rimuovere**: il menu ⋮ offre solo *See page indexing*, perché la sitemap è
  stata inviata da un'altra proprietà (quella con prefisso `http://www.`, dei tempi di
  Wix), e si toglie solo da lì. Si lascia: non fa danni, ha 0 pagine, e ora che `http://`
  rimanda a `https://` Google smette di considerarla da solo.
- Google Search Console: vedi *Analytics e consenso* (verificata con file HTML e TXT DNS).
- **Indirizzi vecchi e 404** (mail di Search Console del 22/10/2026, *«New reasons prevent
  pages from being indexed»*, motivi: *Alternate page with proper canonical tag* e
  *Not found (404)*).
  - **I 404 sono gli indirizzi del vecchio sito Wix** rimasti nell'indice di Google, non
    link rotti del sito attuale (verificato: i link interni delle sei pagine sono tutti
    validi). Elenco ricavato dall'archivio di Wayback Machine
    (`web.archive.org/cdx/search/cdx?url=ambulanzaselvinoaviatico.com/*`), perché il report
    di Search Console richiede il login.
  - Quelli **con un equivalente oggi** hanno una pagina di reindirizzamento in radice:
    `/cosa-facciamo` → servizi, `/diventa-volontario` → volontario, `/who-we-are` →
    associazione, `/news` → home. `/associazione` funzionava già da solo, perché GitHub
    Pages serve `/x` da `x.html`. GitHub Pages **non fa redirect lato server**: le pagine
    usano `meta refresh` a 0 secondi, che Google tratta come redirect permanente, più il
    `canonical` sulla destinazione. **Niente `noindex`**: insieme al canonical darebbe due
    segnali opposti. Non stanno in `sitemap.xml` e non caricano analytics. ⚠️ **Non vanno
    rimosse**: sembrano file inutili, ma sono loro che chiudono i 404.
  - Quelli **senza equivalente** restano 404, ed è la risposta giusta: `/account`,
    `/account/my-account`, `/profile`, `/blog-frontend-adapter-public` sono pagine di
    sistema di Wix, e `/_files/ugd/65a176_...pdf` era un PDF ospitato da Wix (un indirizzo
    `.pdf` non si può reindirizzare con una pagina HTML: GitHub Pages lo servirebbe come
    PDF). Google li toglie dall'indice da solo. Per chi ci arriva c'è **`404.html`**, che
    GitHub Pages serve con stato 404 per qualunque indirizzo inesistente.
  - ⚠️ `404.html` usa **solo percorsi assoluti** (`/css/style.css`, `/images/logo.png`):
    viene servita a qualunque profondità (`/account/my-account`), e un percorso relativo
    diventerebbe `/account/css/style.css`, cioè una pagina senza stile.
  - **«Alternate page with proper canonical tag» non è un errore**: è Google che trova
    doppioni e conferma di aver scelto la pagina canonica giusta. I canonical delle sei
    pagine sono tutti corretti (ognuna punta a se stessa). I doppioni erano due:
    1. **`/index.html`**, che GitHub Pages serve sempre come copia di `/`. Lo segnalavano
       a Google **24 link interni** (`href="index.html"` in logo, menu, menu mobile e
       footer di ogni pagina): dal 22/10/2026 sono `href="/"`. ⚠️ Non reintrodurre
       `index.html` nei link: `/index.html` resta raggiungibile, ma nessuno lo indica più.
    2. **Le versioni `http://`**: chiuse il 22/10/2026 forzando HTTPS (vedi *DNS e
       hosting*), ora rispondono 301.
  - Dopo una correzione, in Search Console → *Pagine* → clic sul motivo → **Convalida
    correzione**: Google ricontrolla gli URL nei giorni successivi e manda una mail
    con l'esito. **Convalida avviata il 22/10/2026** per entrambi i motivi. Se compaiono nuovi 404, l'elenco esatto si esporta da lì (pulsante
    *Esporta*), ed è più completo di Wayback Machine.


## Analytics e consenso

- **`js/analytics.js`**: Google Analytics 4 con **Consent Mode v2**. Caricato solo dalle sei
  pagine pubbliche, **mai** da `checklist/` e `sciesopoli/` — quest'ultima per regola non
  deve caricare nulla dal resto del sito, la prima è uno strumento interno.
- **Attivo dal 16/10/2026** con `ID_GA = 'G-831DHLZPVE'`. L'ID di misurazione **non è un
  segreto**: sta nel sorgente di ogni pagina di qualunque sito che usa GA, serve solo a dire
  a Google a quale proprietà attribuire i dati. Diverso da `BOT_TOKEN` o dal service
  account, che restano fuori dal repo.
- ⚠️ **`ID_GA` vuoto = tutto spento**: niente banner, niente `dataLayer`, niente cookie,
  nessuna richiesta a Google. È il modo per disattivare l'analytics senza rimuovere codice.
- **Senza consenso GA non viene nemmeno scaricato.** Il default di Consent Mode è `denied`
  per tutto e viene dichiarato *prima* di caricare lo script: se qualcosa va storto, il
  punto di partenza resta "negato". `ad_storage` resta negato anche dopo l'accettazione —
  l'associazione non fa pubblicità, le servono solo le visite.
- ⚠️ **Rifiutare cancella anche i cookie già scritti** (`pulisciCookie()`): senza, chi
  accetta e poi cambia idea se li ritrova addosso e la revoca non revoca niente. Trovato in
  collaudo il 16/10/2026: il rifiuto non caricava GA ma lasciava i `_ga` di un consenso
  precedente. I cookie si cancellano provando il dominio corrente **e** quelli padre, perché
  GA li scrive sul dominio padre.
- La scelta sta in `localStorage` (`amb-consenso`) e **scade dopo 6 mesi**: il consenso non è
  per sempre. Un link `href="#cookie"` in qualunque pagina la azzera e riapre il banner —
  c'è nel footer di tutte e sei. I due pulsanti hanno lo stesso peso visivo di proposito: un
  «rifiuta» sbiadito accanto a un «accetta» acceso non è una scelta libera.
- **Search Console: verificata in due modi** dal 16/10/2026, ed è voluto — se un metodo
  decade, la proprietà resta verificata con l'altro.
  1. **File HTML**, per la proprietà con prefisso URL: `google0a9c787ee85afe3d.html` in
     radice (53 byte, una riga).
  2. **Record TXT**, per la proprietà del dominio: `google-site-verification=TDEr8xL6JJ3GF…`
     sull'host `@`, aggiunto nel pannello DNS di Squarespace.

  ⚠️ **Nessuno dei due va rimosso**, nemmeno dopo l'esito positivo: Google ricontrolla e,
  se spariscono, la proprietà torna non verificata e si perde lo storico delle ricerche. Il
  file in radice sembra un residuo da ripulire e non lo è.
  ⚠️ **Sull'host `@` convivono tre record TXT**: verifica Google, SPF (`v=spf1
  include:_spf.google.com ~all`) e — su `google._domainkey` — il DKIM. Più TXT sullo stesso
  host sono legittimi: chi ne aggiunge uno **aggiunge**, non sostituisce. Sovrascrivere
  l'SPF o il DKIM significa rompere la posta dell'associazione, ed è l'errore tipico di
  questa procedura. Nel pannello Squarespace si usa **ADD RECORD**, mai *ADD PRESET*, che
  riscrive gruppi interi di record (A, CNAME www e MX compresi).
  La nota precedente in questo file («verificato via TXT DNS») era superata: prima del
  16/10/2026 sul dominio c'era solo il TXT dell'SPF.

## DNS e hosting

- **Hosting**: GitHub Pages (branch `main`, repo `albo94/ambulanzaselvinoaviatico`)
- **Dominio**: registrato su Squarespace Domains
- **DNS**: A records → 185.199.108–111.153, CNAME www → albo94.github.io
- Nameservers: Squarespace (migrato da Wix)
- **HTTPS forzato dal 22/10/2026** (*Enforce HTTPS* in repository → Settings → Pages).
  Verificato: `http://www…`, `http://…` e `https://…` senza www rispondono tutti **301**
  verso `https://www.ambulanzaselvinoaviatico.com/`, pagina per pagina, e il certificato
  è valido. Fino a quel giorno `http://` rispondeva 200 con la pagina: ogni pagina esisteva
  in due copie e chi arrivava da un vecchio link navigava in chiaro.
  ⚠️ Non togliere la spunta. Se si rimuove e si rimette il dominio custom, GitHub la
  disattiva da solo e va rimessa a mano.
  Il riquadro giallo *«DNS Check in Progress»* sotto il dominio, comparso subito dopo,
  è un ricontrollo che GitHub rilancia quando si toccano le impostazioni: con il DNS
  corretto torna verde da solo e non va toccato niente.

## Regole di sviluppo

- Non usare framework JS o CSS — solo vanilla HTML/CSS/JS
- Non usare `btn-orange` dentro `.join-banner` (sfondo arancione) — usare `btn-white`
- Non aggiungere filtri CSS alle immagini del footer (causa quadrato bianco)
- Font Awesome 6 Free — verificare che le icone esistano prima di usarle (`fa-hand-holding-heart` non `fa-hands-holding-heart`)
- Le sezioni del sito alternano sfondo bianco (`--white`) e grigio chiaro (`--gray`)
- Commit e push su `main` per pubblicare — GitHub Pages si aggiorna in ~1 min
- File con spazi nel nome vanno rinominati con trattini per uso web
- GitHub Pages è **case-sensitive** sui percorsi, Windows no: un `Foto.JPG` referenziato
  come `foto.jpg` funziona in locale e si rompe online
- Le immagini stanno nella sottocartella della sezione che le usa (vedi *Struttura immagini*),
  non nella radice di `images/`
- Le pagine nascoste (`sciesopoli/`, `checklist/`) non vanno aggiunte a `sitemap.xml`
  né linkate dal menu; `sciesopoli/` non deve caricare nulla dal resto del sito
- Date: **1993** è l'associazione, **1968/oltre 55 anni** sono il servizio dei volontari
  (vedi *Dati associazione*) — vale anche in `<title>`, meta description, OG/Twitter e JSON-LD.
  La formula da riusare è «servizio ambulanza dal 1968»; il footer la ripete identica in tutte
  le pagine, quindi va cambiata ovunque o da nessuna parte
- `.servizio-photo-single img` usa `object-position: center 15%` per mostrare i volti

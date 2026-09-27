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
├── quiz60.html         – Pagina nascosta: quiz del 60° AVIS (vedi *Pagine nascoste*)
├── sciesopoli/         – Pagina nascosta: modulo di manleva visitatori (vedi *Pagine nascoste*)
├── checklist/          – Pagina nascosta: check list dei mezzi, uso interno (vedi *Pagine nascoste*)
├── sitemap.xml
├── robots.txt
├── css/style.css       – Unico foglio di stile (tutto il sito)
├── css/dashboard.css   – Stili della dashboard statistiche
├── js/main.js          – Hamburger, stats counter, carousel, scroll reveal
├── js/dashboard.js     – Renderer dei grafici (SVG a mano, nessuna libreria)
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

### News (index.html)
3 card news:
- **Evento**: `images/eventi/inaugurazione/evento-taglio-nastro.jpg` – Inaugurazione nuova ambulanza
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
  un `?v=<data>` di cache busting (oggi `?v=20260926c`): quando si modifica uno dei due file
  va alzato **anche** nella web app, altrimenti una delle due dashboard resta sul file vecchio.
- **Un solo file JS, due payload diversi.** `dashboard.js` disegna sia la pagina pubblica sia
  la dashboard riservata, ma la parte "composizione" (un grafico per tipo di personale +
  tabella persone) si accende solo se nel payload c'è `volontari`. Nel JSON pubblico
  `volontari` e `tipiPersonale` **non ci sono di proposito**: stanno solo nel payload che
  la web app autenticata passa a `AMB_DASH`.
- **La riservata è a schede** (`montaSchede()`): *Panoramica* (la stessa pagina pubblica),
  *Tempi di partenza* (`tempiPartenza`), *Mezzi e km* (`kmStorico`), *Persone*
  (`volontari`). Ogni pannello si disegna la prima volta che viene aperto, perché i grafici
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

Tre pagine del sito **non** sono raggiungibili dalla navigazione, **non** stanno in
`sitemap.xml` e portano `<meta name="robots" content="noindex, nofollow, noarchive">`.
Ci si arriva solo con un link diretto o un QR code.

> **Attenzione a `robots.txt`:** non vanno messe in `Disallow`. Se il crawler non può
> scaricare la pagina non legge nemmeno il `noindex`, e l'URL può finire in SERP senza
> contenuto. La regola giusta è quella attuale: crawling libero + `noindex` nella pagina.

### `quiz60.html` — quiz del 60° AVIS
Pagina singola autosufficiente, font Google, `ENDPOINT` vuoto (i tentativi non vengono
inviati). Il commento nel codice cita `apps-script-salvataggio.gs`, che **non esiste nel
repo**: se serve salvare i tentativi va scritto.

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
  - I gruppi **senza** sottozone (`LIVELLI BOMBOLE`, i tre blocchi di testa) restano a un
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
  - ⚠️ Di quel file girano **più copie .xlsx** nelle cartelle dei mezzi e al 27/09/2026 erano
    tutte disallineate fra loro e col Google Sheet vivo (assicurazione e tagliando del 007
    con tre date diverse). Fa fede il **Google Sheet**: va riscaricato in .xlsx ogni volta,
    il `.gsheet` su Drive è solo una scorciatoia e in locale non si legge.
  - `DATA`, `FIRMA` (campi del cartaceo) e `Tariffario programmate` sono nella lista `FUORI`
    dello script e non devono rientrare. Il tariffario era anche un **articolo fisico** sulla
    mensola del Ducato: tolto anche da lì.
  - `Controllo carburante` nel foglio è un'intestazione con la sua casella accanto, senza voci
    sotto: qui diventa una sezione con un controllo solo.
- **Scadenze collegate al GESTIONALE SCADENZE.** Assicurazione, revisione e tagliando hanno la
  data scritta dentro il testo della voce *e* nel foglio `GESTIONALE SCADENZE`, che è quello
  che si guarda quando si rinnova. Due elenchi a mano divergono in silenzio: al 27/09/2026
  **quattro voci su nove non tornavano**, col tagliando del Crafter 007 sfasato di oltre un anno.
  - `_materiali/checklist/scadenze.py` confronta i due e segnala le differenze; con `--scrivi`
    riscrive le date nella pagina e incorpora `scadenze` nei dati del mezzo. Il gestionale fa fede.
  - ⚠️ **Ordine degli script**: `aggiorna_documenti.py` rilegge le date dal foglio
    `CONTROLLI OGNI CHECK LIST`, quindi va lanciato **prima** di `scadenze.py`, altrimenti
    riporta indietro le date già allineate. Al 27/09/2026 quel foglio ha ancora 31/10/2026
    per i tagliandi di 006 e Ducato, dove il gestionale (e la realtà) dicono 30/10: finché
    non lo si corregge lì, ogni rigenerazione reintroduce il refuso e `scadenze.py` lo
    ricorregge.
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
  - ⚠️ **Il nickname non è autenticato.** La pagina è pubblica e chi compila sceglie il nome
    da un elenco, senza login: chiunque abbia il link può cambiare una scadenza a nome di
    chiunque. I paracadute sono a valle, non a monte — solo i 3 tipi di scadenza e i 3 mezzi
    noti, mai cancellazioni, data entro un intervallo plausibile, e ogni modifica annunciata
    su Telegram **con il valore precedente** e con la nota che il nome è dichiarato. Un cambio
    sbagliato resta visibile e si torna indietro; non è impedito.
  - Il registro ha una colonna `scadenze_corrette` con `tipo: vecchia -> nuova`.
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

  Deploy: `cd _materiali/checklist/gas && clasp push --force && clasp create-deployment`.
  ⚠️ `clasp create-script` **sovrascrive `appsscript.json`** con il suo default, che ha
  `timeZone: America/New_York`: ogni timestamp del registro sarebbe sfasato. Dopo una
  ricreazione va rimesso `Europe/Rome` insieme a `oauthScopes` e al blocco `webapp`.
  ⚠️ `clasp push` da solo salta `appsscript.json`: serve `--force`.
- `ENDPOINT`, `MODO_PROVA` e `VERSIONE` in cima allo script, come in `sciesopoli/`.
  `VERSIONE` sta **sia nella pagina sia nel backend** e va alzata in entrambi quando cambia
  il payload (a `2026-09-v2` con i nickname e la rimozione dei km). Qui non c'è il controllo
  rigido di `sciesopoli/`: la versione viene solo annotata in registro, quindi disallinearla
  non dà errore, rende solo illeggibile lo storico.
- ⚠️ Il registro riscrive l'intestazione **solo se il foglio è vuoto** (`getLastRow() === 0`).
  Se esiste già un `REGISTRO CHECK LIST MEZZI` compilato con le vecchie 13 colonne (con i km),
  le righe nuove da 12 valori finiscono disallineate: va svuotato o rifatto.
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
- JSON-LD: Organization + EmergencyService + WebSite (index), LocalBusiness (contatti)
- `sitemap.xml` e `robots.txt` presenti
- Google Search Console: verificato via TXT DNS

## DNS e hosting

- **Hosting**: GitHub Pages (branch `main`, repo `albo94/ambulanzaselvinoaviatico`)
- **Dominio**: registrato su Squarespace Domains
- **DNS**: A records → 185.199.108–111.153, CNAME www → albo94.github.io
- Nameservers: Squarespace (migrato da Wix)

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
- Le pagine nascoste (`quiz60.html`, `sciesopoli/`, `checklist/`) non vanno aggiunte a `sitemap.xml`
  né linkate dal menu; `sciesopoli/` non deve caricare nulla dal resto del sito
- Date: **1993** è l'associazione, **1968/oltre 55 anni** sono il servizio dei volontari
  (vedi *Dati associazione*) — vale anche in `<title>`, meta description, OG/Twitter e JSON-LD.
  La formula da riusare è «servizio ambulanza dal 1968»; il footer la ripete identica in tutte
  le pagine, quindi va cambiata ovunque o da nessuna parte
- `.servizio-photo-single img` usa `object-position: center 15%` per mostrare i volti

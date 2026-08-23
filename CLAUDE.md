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
├── sitemap.xml
├── robots.txt
├── css/style.css       – Unico foglio di stile (tutto il sito)
├── css/dashboard.css   – Stili della dashboard statistiche
├── js/main.js          – Hamburger, stats counter, carousel, scroll reveal
├── js/dashboard.js     – Renderer dei grafici (SVG a mano, nessuna libreria)
├── dati/statistiche.json – Dati della dashboard, rigenerati ogni notte (non modificare)
├── images/             – Immagini usate dal sito (vedi struttura sottocartelle)
└── docs/               – PDF scaricabili (contributi pubblici, volontariato in vacanza)
```

## Struttura immagini (images/)

```
images/
├── hero-principale.jpg          – Hero home page
├── logo.png                     – Favicon, header, footer
├── consiglio-direttivo.jpg      – Sezione Consiglio Direttivo (associazione.html)
├── consiglio-2.jpg              – Carosello squadra (associazione.html)
├── consiglio5.jpg               – Per uso futuro in associazione
├── consiglio-vecchio.jpg        – Foto storica consiglio
├── storica-sede.jpg             – Foto storica sede
├── corteo.jpg                   – Hero page associazione.html
├── evento-taglio-nastro.jpg     – Carosello inaugurazione 2026 + news home
├── evento-benedizione.jpg       – Carosello inaugurazione 2026
├── presidente.jpg               – Carosello inaugurazione 2026
├── mg-6071/6108/6129.jpg        – Carosello inaugurazione 2026
├── manifestazioni-1..4.jpg      – Carosello manifestazioni (associazione.html)
├── servizio-civile-1..2.jpg     – Sezione servizio civile (associazione.html)
├── news-team.jpg                – Card news volontariato (index.html)
├── team-gruppo.jpg              – (disponibile, non usata attivamente)
├── team-rosso.jpg               – Carosello squadra + OG image volontario.html
├── arena-verona.jpg             – Carosello squadra (associazione.html)
├── servizi/
│   ├── emergenza/               – ambulanza3.jpg, ambulanza4.jpg, elicottero.jpg
│   ├── trasporto/               – trasporti-programmati.jpg
│   ├── manifestazioni/          – manifestazioni5.jpg, manifestazioni6.jpg, manifestazioni-2.jpg
│   ├── territorio/              – territorio1-7.jpg, guardia-medica.jpg
│   └── formazione/              – formazione1-7.jpg, formazione-soccorritori-1..2.jpg
│       ├── scuole/              – formazione-scuole.jpg, formazione-scuole-2.jpg, formazione-scuole-3.jpg
│       ├── soccorritori/        – (vuota, usa file nella cartella padre)
│       ├── comunita/            – (vuota, usa formazione1-7 nella cartella padre)
│       └── aziende/             – formazione-aziende.jpg
├── team/                        – gruppo.jpg, gruppo2-12.jpg, vol1-16.jpg
│   ├── gruppo11.jpg             – Sezione "La Nostra Associazione" (index.html)
│   └── vol8,11,12,15.jpg        – Photo strip home page (4 foto volontari di gruppo)
├── eventi/inaugurazione/        – (cartella per foto eventi futuri)
└── gallery/                     – (cartella per gallery futura)
```

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
1. **`#main-carousel`** – "Inaugurazione 26 Aprile 2026" (evento-taglio-nastro, benedizione, presidente, mg-6071/6108/6129 + slot per foto future)
2. **`#gallery-carousel`** – "La Nostra Squadra" (16 foto: gruppo2-12, vol8/11/12/15, team-rosso, team-gruppo, arena-verona)
- JS in `main.js` (sezione 6 – CAROUSEL)
- CSS in `style.css` (sezione CAROUSEL)
- Auto-play 4.5s, pausa su hover, swipe touch, dot indicators, prev/next buttons
- `object-fit: contain` + sfondo `#111` per foto verticali da telefono

### Sezione Consiglio Direttivo
In `associazione.html`, tra "Chi Siamo" e "Timeline". Foto: `images/consiglio-direttivo.jpg`.

### Pagina Servizi (servizi.html)
Tab sticky sotto l'header con 5 sezioni:
1. **#emergenza** – Emergenza 112, griglia 3 foto (`ambulanza3`, `ambulanza4`, `elicottero`)
2. **#trasporto** – Trasporto Sanitario, foto singola `trasporti-programmati.jpg`, contatto Antonia Rondi 333 413 4299
3. **#manifestazioni** – Assistenza Manifestazioni, griglia 3 foto: `manifestazioni6` (sp-wide top), `manifestazioni-2` (basso sx), `manifestazioni5` (basso dx con 2 volontari)
4. **#presidio** – Presidio del Territorio (pressione, glicemia, DAE), griglia 6 foto
5. **#formazione** – 4 sub-blocchi con layout `servizio-grid` separati da `.formazione-divider`:
   - **Scuole**: foto `formazione3.jpg` + griglia 3 foto scuole
   - **Soccorritori**: 2 foto affiancate senza sp-wide (`formazione-soccorritori-1`, `formazione-soccorritori-2`)
   - **Comunità**: griglia 3 foto (formazione5/6/7 o simili)
   - **Aziende**: foto `aziende/formazione-aziende.jpg`

### News (index.html)
3 card news:
- **Evento**: `images/evento-taglio-nastro.jpg` – Inaugurazione nuova ambulanza
- **Formazione**: `images/servizi/formazione/formazione1.jpg` – Formiamo i soccorritori
- **Volontariato**: `images/news-team.jpg` – Entra a far parte della squadra

### Contatti (contatti.html)
Blocchi contatto: Sede Operativa, Sede Legale, Email, Disponibilità, Presidente (Alberto Grigis 346-1099244), **Trasporti Programmati (Sig.ra Antonia Rondi 333-413 4299)**, Social.

## PDF (cartella docs/)

- `contributi-pubblici-2020.pdf` … `contributi-pubblici-2024.pdf`
- `volontariato-vacanza.pdf`

## Pagina "I nostri numeri" (numeri.html)

Dashboard con le statistiche reali del servizio, generate dal registro delle missioni.

- **Dati**: `dati/statistiche.json`. **Non va modificato a mano**: lo riscrive ogni notte
  lo script Apps Script "Gestione Missioni 118 - automazioni" (progetto separato, sorgenti
  in `G:\Drive condivisi\MISSIONI 118\AMB_programma missioni\apps-script`) tramite le
  API di GitHub. Ogni notte in cui i dati cambiano arriva un commit automatico su `main`.
- **Grafici**: `js/dashboard.js`, SVG disegnato a mano — nessuna libreria, in linea con la
  regola "solo vanilla" del sito. Espone `AMB_DASH.carica(url, contenitore, opzioni)`.
- **Stili**: `css/dashboard.css`, usa le variabili di `style.css` con fallback propri.
- Lo **stesso** CSS e JS sono caricati anche dalla dashboard interna riservata (web app
  Apps Script), che li prende da questo dominio: se rinomini o sposti quei due file,
  la dashboard interna smette di disegnare i grafici.
- La pagina è raggiungibile dal menu del **footer** di tutte le pagine (non dal menu
  principale) ed è in `sitemap.xml`.
- Sulla pagina finiscono **solo dati aggregati**: niente nomi di volontari, niente dati
  per persona. Il sito è statico e pubblico, qualsiasi "area riservata" lato browser
  sarebbe aggirabile — i dati per volontario stanno solo nella web app autenticata.

## SEO

- Canonical, geo meta, Open Graph, Twitter Card su tutte le pagine
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
- File con spazi nel nome (es. `storica sede.jpg`) vanno rinominati con trattini per uso web
- `.servizio-photo-single img` usa `object-position: center 15%` per mostrare i volti

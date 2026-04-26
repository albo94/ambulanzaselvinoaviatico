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
├── sitemap.xml
├── robots.txt
├── css/style.css       – Unico foglio di stile (tutto il sito)
├── js/main.js          – Hamburger, stats counter, carousel, scroll reveal
├── images/             – Immagini usate dal sito (vedi struttura sottocartelle)
└── docs/               – PDF scaricabili (contributi pubblici, volontariato in vacanza)
```

## Struttura immagini (images/)

```
images/
├── hero-principale.jpg          – Hero home page
├── logo.png                     – Favicon, header, footer
├── consiglio-direttivo.jpg      – Sezione Consiglio Direttivo (associazione.html)
├── consiglio-2.jpg              – Gallery associazione
├── consiglio5.jpg               – Per uso futuro in associazione
├── consiglio vecchio.jpg        – Foto storica consiglio
├── storica sede.jpg             – Foto storica sede
├── corteo.jpg                   – Usata in associazione.html e servizi
├── evento-taglio-nastro.jpg     – Carosello inaugurazione 2026
├── evento-benedizione.jpg       – Carosello inaugurazione 2026
├── presidente.jpg               – Carosello + gallery
├── mg-6071/6108/6129.jpg        – Carosello inaugurazione 2026
├── manifestazioni-1..4.jpg      – Carosello manifestazioni (associazione.html)
├── servizio-civile-1..2.jpg     – Sezione servizio civile (associazione.html)
├── news-team.jpg                – Sezione news (index.html)
├── team-gruppo.jpg              – Sezione "La Nostra Associazione" (index.html)
├── team-rosso.jpg               – OG image volontario.html
├── servizi/
│   ├── emergenza/               – ambulanza.jpg, ambulanza1-4.jpg, elicottero.jpg
│   ├── trasporto/               – trasporti-programmati.jpg
│   ├── manifestazioni/          – manifestazioni5.jpg, manifestazioni6.jpg, arena-verona.jpg
│   ├── territorio/              – territorio1-7.jpg, guardia-medica.jpg
│   └── formazione/              – formazione1-7.jpg
├── team/                        – gruppo.jpg, gruppo2-12.jpg, vol1-16.jpg
├── eventi/inaugurazione/        – (cartella per foto eventi futuri)
└── gallery/                     – (cartella per gallery futura)
```

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
Presente in `associazione.html` – sezione "Inaugurazione 26 Aprile 2026".
- JS in `main.js` (sezione 6 – CAROUSEL)
- CSS in `style.css` (sezione CAROUSEL)
- Auto-play 4.5s, pausa su hover, swipe touch, dot indicators, prev/next buttons
- `object-fit: contain` + sfondo `#111` per foto verticali da telefono

### Sezione Consiglio Direttivo
In `associazione.html`, tra "Chi Siamo" e "Timeline". Foto: `images/consiglio-direttivo.jpg`.

### Pagina Servizi (servizi.html)
Tab sticky sotto l'header con 5 sezioni:
1. **#emergenza** – Emergenza 112, foto in `images/servizi/emergenza/`
2. **#trasporto** – Trasporto Sanitario, foto singola `trasporti-programmati.jpg`, contatto Antonia Rondi 333 413 4299
3. **#manifestazioni** – Assistenza Manifestazioni, griglia 4 foto
4. **#presidio** – Presidio del Territorio (pressione, glicemia, DAE), griglia 6 foto
5. **#formazione** – Formazione (Scuole, Soccorritori, Comunità, Aziende), card con foto reali

## PDF (cartella docs/)

- `contributi-pubblici-2020.pdf` … `contributi-pubblici-2024.pdf`
- `volontariato-vacanza.pdf`

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

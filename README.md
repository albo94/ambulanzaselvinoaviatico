# Sito Ambulanza Selvino-Aviatico

Sito statico dell'**Associazione Ambulanza Selvino-Aviatico** (Servizio Volontari
dell'Altipiano Selvino Aviatico – ODV).

🔗 **https://www.ambulanzaselvinoaviatico.com**

HTML, CSS e JavaScript scritti a mano: nessun framework, nessun passo di build,
nessuna dipendenza da installare. Si apre un file, si modifica, si pubblica.

> Per lavorarci davvero — convenzioni, struttura delle immagini, componenti, regole —
> leggi **[CLAUDE.md](CLAUDE.md)**: è la guida operativa di dettaglio. Questo README
> serve solo a orientarsi.

## Come si pubblica

Il sito sta su **GitHub Pages**, branch `main`. Pubblicare significa fare commit e push:

```bash
git add -A && git commit -m "Descrizione della modifica" && git push
```

Online dopo circa un minuto. Non c'è staging: quello che va su `main` è già pubblico.

## Come si guarda in locale

Aprire i file col doppio clic funziona male (i percorsi assoluti e `fetch` non vanno).
Meglio un server locale:

```bash
python -m http.server 8777
```

Poi `http://localhost:8777`.

## Le pagine

| Pagina | Cosa contiene |
|---|---|
| `index.html` | Home: hero, servizi, numeri, news |
| `associazione.html` | Storia, valori, consiglio direttivo, timeline, caroselli |
| `servizi.html` | I cinque servizi, con tab sticky |
| `contatti.html` | Mappa, indirizzi, orari, riferimenti |
| `volontario.html` | Diventare volontario, donazioni, contributi pubblici |
| `numeri.html` | Dashboard statistiche, aggiornata ogni notte |

Più due **pagine nascoste**, fuori dal menu e fuori da `sitemap.xml`:
`quiz60.html` (quiz del 60° AVIS) e `sciesopoli/` (modulo di manleva per i visitatori
di Sciesopoli). Vedi la sezione *Pagine nascoste* in CLAUDE.md.

## Le cartelle

```
css/        style.css (tutto il sito) + dashboard.css
js/         main.js (menu, caroselli, contatori) + dashboard.js (grafici SVG)
images/     una sottocartella per sezione — vedi CLAUDE.md
docs/       PDF scaricabili (contributi pubblici, volontariato in vacanza)
dati/       statistiche.json — NON si modifica a mano
sciesopoli/ modulo di manleva (pagina nascosta)
_materiali/ deposito locale, ignorato da git: non finisce online
```

## Due cose da non fare

**Non modificare `dati/statistiche.json` a mano.** Lo riscrive ogni notte uno script
Apps Script che legge il registro delle missioni e fa commit da solo. Una modifica
manuale viene sovrascritta, e nel frattempo rompe la dashboard.

**Non spostare né rinominare `css/dashboard.css` e `js/dashboard.js`.** Li carica
*anche* la dashboard interna riservata, che li prende da questo dominio: se cambiano
percorso, quella smette di disegnare i grafici.

## Prima di fare push

- I percorsi su GitHub Pages sono **case-sensitive**, su Windows no: `Foto.JPG`
  richiamato come `foto.jpg` funziona in locale e si rompe online
- Niente spazi nei nomi dei file (usare i trattini)
- Se sposti un'immagine, controlla anche le `og:image` — sono **URL assoluti** e si
  rompono in silenzio, senza che il sito dia segno di niente
- Le date: **1993** è l'associazione, **1968 / oltre 55 anni** sono il servizio dei
  volontari (prima nell'AVIS). Non attribuire all'ente l'anzianità del servizio

## Contatti

Associazione Ambulanza Selvino-Aviatico — Via Monte Alben 19, Selvino (BG)
Tel. 035 764626 — info@ambulanzaselvinoaviatico.com

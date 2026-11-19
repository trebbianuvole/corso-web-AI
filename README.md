# Costruire siti web con l'AI

Sito del corso ENGIM di uso dell'AI e vibe coding. Si usa in aula al posto delle slide: dodici capitoli, uno per pagina. Dopo il corso resta come materiale di consultazione, con le schede, il glossario e le fonti.

Il sito è fatto con [Astro](https://astro.build) ed è completamente statico. Vercel lo ricostruisce e lo pubblica a ogni push su `main` e crea un'anteprima per ogni pull request.

## Comandi

Serve Node.js 22.23.4 o successivo.

```bash
npm install          # installa Astro (una volta sola)
npm run dev          # sito in locale su http://localhost:4321, si aggiorna da solo
npm run build        # genera il sito finale nella cartella dist/
npm run preview      # apre in locale il sito di dist/
npm run indirizzi    # registra gli indirizzi delle slide nuove o spostate
```

## Struttura

```
src/
  pages/                      le pagine: home, un capitolo per indirizzo, vecchi indirizzi lezione-N
  pages/schede/               le schede di consultazione: /schede/<nome>/, e l'indice /schede/
  pages/fonti/                «Per saperne di più»: le fonti, generate dalle slide
  layouts/Pagina.astro        <head> comune a tutte le pagine
  layouts/Capitolo.astro      barra in alto, slide in ordine, approfondimenti, script
  layouts/Scheda.astro        pagina di una scheda: titolo, data, schede precedente e successiva
  components/slide/           Slide, Apertura, Approfondimento
  components/                 Card, Grid, Steps e Passo, Defs e Def, SieteQui;
                              Voce (glossario), RimandoSlide, Checklist e Punto, Copiabile (schede)
  capitoli/capitolo-N/        i dodici capitoli
    capitolo.ts               titolo, sezioni e ordine delle slide
    copertina-N.astro         la copertina
    <sezione>/<slide>.astro   una slide per file, una cartella per sezione
  lib/numerazione.mjs         numerazione delle slide e rimandi
  lib/capitoli.ts             carica capitoli e slide
  lib/consultazione.ts        titoli delle slide, voci del glossario e fonti, letti dal sorgente
  lib/schede.ts               l'elenco di tutte le schede
  indirizzi.json              registro degli indirizzi pubblicati
public/assets/
  css/style.css               stile unico per tutto il sito (con lo stile di stampa delle schede)
  js/deck.js                  navigazione a slide (frecce, F per schermo intero)
  js/approfondimenti.js       le finestre degli approfondimenti (capitoli che ne hanno)
  js/rete-minuscola.js        demo "una rete minuscola che impara" (1.1.a5)
  js/next-word.js             gioco "indovina la parola successiva" (capitolo 1)
  js/timeline.js              serpentina "Dal 2017 a oggi" (capitolo 1)
  js/layers.js                demo "HTML, CSS, JavaScript" e pulsanti Copia (capitoli e schede)
  js/glossario.js             la ricerca nel glossario
  js/home.js                  animazione del titolo in home
docs/scaletta-corso.md        la scaletta completa del corso
```

## Aggiungere o spostare una slide

1. Create il file nella cartella della sezione, per esempio `src/capitoli/capitolo-2/stack/nuova-slide.astro`:

   ```astro
   ---
   import Slide from "../../../components/slide/Slide.astro";
   ---
   <Slide {...Astro.props} kicker="2.4 Lo stack" titolo="Il titolo" lead="Una frase di introduzione.">
     <p>Il contenuto, in HTML.</p>
   </Slide>
   ```

2. Aggiungete il nome del file (senza `.astro`) nell'elenco `slide` della sezione, in `capitolo.ts`, nel punto giusto. Per spostare una slide basta spostare la riga.
3. Eseguite `npm run indirizzi` e fate il commit anche di `src/indirizzi.json`.

Numero e indirizzo di ogni slide si ricavano dalla posizione: la terza slide della sezione 2.4 è la 2.4.3, all'indirizzo `capitolo-2/#2-4-3`. I nomi dei file devono essere unici in tutto il corso.

## Indirizzi

Gli indirizzi pubblicati non si rompono mai. `src/indirizzi.json` ricorda a quale slide apparteneva ogni indirizzo: se una slide cambia posto o capitolo, il vecchio indirizzo rimanda da solo a quello nuovo. Valgono anche i vecchi indirizzi `#storia`, `#s12`, `capitolo-1/#progetto`, `lezione-1/` e simili. Se il registro non conosce un indirizzo, la build si ferma e chiede di eseguire `npm run indirizzi`.

## Le pagine di consultazione

Stanno in `/schede/` (indice in `/schede/`) e in `/fonti/`:

- **Schede operative S.1–S.15:** glossario, comandi, modelli di prompt e di CLAUDE.md, schema Keystatic, template, checklist e rubrica.
- **Schede aggiornabili U.1–U.6:** modelli, prodotti, privacy, strumenti, costi. Mostrano «Aggiornato al…»: quando cambiano i dati, si aggiorna anche la data (`aggiornato="AAAA-MM-GG"`).
- **Fonti:** tutti i link esterni scritti nelle slide, capitolo per capitolo.

### Aggiungere o aggiornare una scheda

1. Una riga in `src/lib/schede.ts` (sigla, nome, titolo, riga breve, tipo): da lì vengono la home, l'indice e la navigazione tra le schede.
2. Il file `src/pages/schede/<nome>.astro`, con il layout `Scheda`:

   ```astro
   <Scheda sigla="S.16" descrizione="Una frase per i motori di ricerca.">
     …
     <p class="footnote scheda-fonti">Nel corso: <RimandoSlide slide="nome-della-slide" />.</p>
   </Scheda>
   ```

   `RimandoSlide` scrive numero e titolo della slide e il link giusto: se la slide si sposta, il link la segue; se sparisce, la build si ferma. Per le checklist ci sono `Checklist` e `Punto` (caselle vere, usabili da tastiera); per i testi da copiare `Copiabile`, con `script={["layers.js"]}`.

### Il glossario si scrive nelle slide

La scheda S.1 si genera dal sorgente delle slide, non si scrive a mano:

- ogni `<Def termine="…">` diventa una voce; se non è un termine da glossario (un comando, un esempio), si aggiunge `glossario={false}`;
- un termine spiegato nel testo o in una `Card` si segna con `<Voce termine="Token">definizione breve</Voce>`, nel file della slide che lo spiega. Nella slide non si vede niente.

Lo stesso termine in più slide diventa una voce sola, con un link per ogni slide; la definizione è quella della prima slide nell'ordine del corso.

### Le fonti si scrivono nelle slide

La pagina `/fonti/` raccoglie da sola i link esterni (`https://…`) di ogni slide. Basta scrivere la fonte nella `.footnote` della slide, come sempre.

## Comandi in aula

- `→` / `←`, `PagGiù` / `PagSu`, `Spazio`: slide successiva o precedente
- `↑` / `↓`: scorrimento normale dentro una slide lunga
- `Home` / `Fine`: prima e ultima slide
- `F`: schermo intero

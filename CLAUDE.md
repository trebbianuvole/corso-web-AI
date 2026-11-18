# CLAUDE.md: sito del corso «Costruire siti web con l'AI»

Regole permanenti per lavorare su questo repository. La scaletta completa del corso è in `docs/scaletta-corso.md`, il riferimento per tutti i contenuti. Quando una decisione cambia, aggiornate sia questo file sia la scaletta.

## Il progetto

- **Cos'è.** Il sito del corso ENGIM «Costruire siti web con l'AI», un corso sull'AI e sul vibe coding. In aula sostituisce le slide: ogni pagina è un capitolo, ogni slide è una `<section class="slide">` a tutto schermo. Dopo il corso diventa materiale di consultazione.
- **Chi lo usa.** Il docente in aula, poi gli studenti. Le classi sono eterogenee: spesso ragazzi giovani con poca preparazione, a volte aziende specializzate. I testi devono essere chiari per tutti, senza diventare banali.
- **Pubblicazione.** Vercel fa la build di Astro e pubblica a ogni push su `main`; crea un'anteprima per ogni pull request.
- **Lingua.** Tutto in italiano: contenuti, commenti nel codice, messaggi di commit.

## Com'è fatto il sito

Astro con output completamente statico: nessun adattatore, nessun server. Unica dipendenza: `astro`. JavaScript scritto a mano, senza librerie esterne; l'unica risorsa esterna sono i Google Fonts.

### Comandi
- `npm run dev`: sito in locale su http://localhost:4321
- `npm run build`: sito finale in `dist/`; si ferma se un nome di slide manca, è ripetuto o se ci sono indirizzi non registrati
- `npm run preview`: apre in locale il contenuto di `dist/`
- `npm run indirizzi`: registra in `src/indirizzi.json` gli id delle slide nuove o spostate

### Cartelle
```
src/pages/index.astro             home; l'elenco dei capitoli viene dai dati dei capitoli
src/pages/[capitolo]/index.astro  una pagina per capitolo (getStaticPaths)
src/pages/lezione-N/              vecchi indirizzi, rimandano a capitolo-N conservando il #
src/layouts/Pagina.astro          <head> comune (titolo, descrizione, font, style.css)
src/layouts/Capitolo.astro        barra in alto generata dalle sezioni, slide, approfondimenti, hint, script, rimandi
src/layouts/Scheda.astro          pagina di consultazione, con «Aggiornato al…» per le schede aggiornabili
src/components/slide/Slide.astro  slide normale (con etichetta e pulsante dell'approfondimento)
src/components/slide/Apertura.astro  apertura di sezione (X.Y.0)
src/components/slide/Approfondimento.astro  la finestra di un approfondimento
src/components/                   Card, Grid, Steps + Passo, Defs + Def, SieteQui (la mappa del corso)
src/capitoli/capitolo-N/capitolo.ts   dati del capitolo e ordine di sezioni e slide
src/capitoli/capitolo-N/copertina-N.astro
src/capitoli/capitolo-N/<chiave-sezione>/<nome-slide>.astro   una slide per file
src/capitoli/capitolo-N/<chiave-sezione>/<chiave-approfondimento>/<nome-slide>.astro   slide di un approfondimento
src/pages/schede/<nome>.astro     schede di consultazione: /schede/<nome>/
src/lib/numerazione.mjs           numerazione e rimandi (JS puro, usato anche da scripts/)
src/lib/capitoli.ts               carica capitoli e slide per le pagine
src/indirizzi.json                registro degli id pubblicati
public/assets/css/style.css       un solo foglio di stile, variabili in :root
public/assets/js/                 deck.js (navigazione), approfondimenti.js, next-word.js, timeline.js, layers.js, rete-minuscola.js, home.js
docs/scaletta-corso.md            la scaletta del corso
```

### Slide
- **Ordine.** L'ordine delle slide è l'elenco `slide` di ogni sezione in `capitolo.ts`. Per aggiungere una slide: si crea il file e si aggiunge il nome all'elenco. Per spostarla: si sposta la riga, e il file nella cartella della sezione nuova. I nomi dei file sono unici in tutto il corso.
- **Numero e id generati.** Dipendono dalla posizione:
  - copertina `X.0`, id `X-0`;
  - apertura `X.Y.0`, id `X-Y-0`;
  - slide `X.Y.Z`, id `X-Y-Z`.

  Il layout passa a ogni slide `id`, `numero` e `sezione` (il `data-chapter` che la collega al pulsante nella barra in alto). Per questo ogni file di slide comincia con `<Slide {...Astro.props} …>` o `<Apertura {...Astro.props} …>`.
- **Il componente `Slide`.**
  - Props: `kicker` (numero e nome della sezione, es. `2.4 Lo stack`), `titolo` (l'`<h2>`), `titoloStile`, `lead`, `split` (due colonne: a sinistra kicker, titolo, lead e lo slot `intro`), `classe` (classi della `<section>`, es. `compact`), `interno` (classi di `.slide-inner`) e `tipo` (l'etichetta accanto al kicker: `concetto`, `esempio`, `demo`, `attivita`, `compito`, `con-ai`, `checklist`).
  - Il prop `approfondimenti` lo passa il layout: non si scrive a mano.
  - Il contenuto va nello slot ed è HTML normale.
  - kicker, titolo e lead accettano HTML semplice.
- **Fonti e note** vanno nella `.footnote`, con i link che si aprono in una nuova scheda.
- **Graffe.** In un file `.astro` le `{ }` sono espressioni: nel testo e nei blocchi di codice si scrivono `&#123;` e `&#125;`.
- **Componenti CSS già pronti** (in `style.css`):
  - griglie e schede: `.grid` con `g2`/`g3`/`g4` (componente `Grid`), `.card` con le varianti `peach`, `sky`, `good`, `bad` (componente `Card`), `.tag`;
  - confronti ed elenchi: `.versus`, `.compare` (tabelle), `.defs` (`Defs`), `.steps` (`Steps`), `.spectrum`, `.milestones`, `.pila`, `.chips`;
  - conversazioni e codice: `.bubble` (chat), `.term` (terminale), i blocchi di codice;
  - impaginazione: `.slide-inner.split`;
  - la mappa del corso: componente `SieteQui` (`<SieteQui capitolo={N} />` sulle copertine dal capitolo 2 in poi).

  Prima di inventare uno stile nuovo, riusate questi.

### Indirizzi
- Gli indirizzi pubblicati non devono mai rompersi.
- `src/indirizzi.json` registra, pagina per pagina, a quale slide apparteneva ogni id pubblicato, compresi i vecchi `#storia`, `#s12`, `#gioco-slide`, `capitolo-1/#progetto` e `capitolo-2/#prompt`.
- Se una slide cambia id o capitolo, il layout genera un rimando automatico (uno script prima di `deck.js`).
- Dopo aver aggiunto o spostato slide, eseguite `npm run indirizzi` e fate il commit del registro: la build di Vercel si ferma se trova id non registrati.
- Se una slide registrata viene eliminata, la build si ferma. Nel registro va indicata la slide che la sostituisce: non si cancellano voci dal registro.

### CSS e JavaScript
- Gli script sono file classici in `public/assets/js/`, caricati con `<script is:inline src="../assets/js/…">`. Gli script in più di un capitolo si elencano in `script` dentro `capitolo.ts`.
- `deck.js` gestisce la navigazione:
  - frecce, PagGiù/PagSu, Spazio, Home/Fine;
  - F per lo schermo intero;
  - contatore, barra di avanzamento, pulsanti delle sezioni.
- `astro.config.mjs` imposta `compressHTML: false`. Dalla versione 7 Astro, per default, toglie spazi tra gli elementi in linea e unisce le parole.

## Gli approfondimenti

Nella scaletta sono numerati `X.Y.a1`, `X.Y.a2`…; ogni gruppo indica la slide da cui si apre.

### Come si aggiunge un approfondimento
- In `capitolo.ts`, nella sezione, si aggiunge un gruppo all'elenco `approfondimenti`: `chiave` (es. `reti-neurali`, unica nel capitolo), `titolo` («Le reti neurali da vicino»), `pulsante` (completa «Approfondisci: …»), `da` (il nome della slide da cui si apre, nella stessa sezione) e `slide` (i nomi dei file, in ordine).
- I file vanno in `src/capitoli/capitolo-N/<chiave-sezione>/<chiave-approfondimento>/` e cominciano con `<Slide {...Astro.props} …>`, come le altre slide. Il kicker è `X.Y <titolo dell'approfondimento>`.
- Numeri e id sono generati: dentro una sezione la numerazione prosegue da un gruppo all'altro (`1.1.a1`… id `1-1-a1`). Valgono le stesse regole del registro: `npm run indirizzi` e commit di `src/indirizzi.json`.
- Il layout disegna da solo il pulsante sulla slide di partenza e la finestra (`Approfondimento.astro`); `approfondimenti.js` si carica solo nei capitoli che ne hanno.
- Il tema blu e rosa è la classe `.tema-approf`, che ridefinisce le variabili di `:root`: i componenti si usano come nelle slide normali, senza colori scritti a mano.
- Uno script che lavora dentro un approfondimento si ferma quando la finestra si chiude (vedi `rete-minuscola.js`). `deck.js` conta solo le slide dentro `main`.

### Comportamento

- Sulla slide collegata compare un **pulsante blu-viola** (es. «Approfondisci: le reti neurali»).
- Al clic, **la pagina corrente si stringe in una barra verticale a sinistra**, con il numero della sezione corrente e, in piccolo, il titolo della slide.
- Il resto dello schermo è occupato dalle **slide dell'approfondimento**, con un tema **sul blu e sul rosa** al posto di arancione e beige: stessi caratteri, stessi componenti, colori diversi.
- La navigazione dentro l'approfondimento funziona come nelle slide normali (frecce, contatore proprio).
- Si torna alla lezione **esattamente dalla slide di partenza**: cliccando la barra laterale, con Esc o con il pulsante «Torna alla lezione».
- **Indirizzo proprio** per ogni approfondimento, da poter linkare e ricaricare (es. `capitolo-1/#1-1-a3`).
- **Accessibilità:** focus spostato all'apertura e restituito alla chiusura, ARIA corretta, rispetto di `prefers-reduced-motion`.
- **Telefono:** sotto i 720 px la barra laterale diventa una striscia in alto.
- **Dove stanno:** fanno parte della pagina del capitolo (statici, nessun caricamento dal server), organizzati in componenti e file separati come le altre slide.

## Etichette e schede aggiornabili

- **Etichette per tipo di contenuto:** concetto, esempio, demo, attività, compito, «Con l'AI», checklist. Si mettono con il prop `tipo` di `Slide`; sono discrete e coerenti con lo stile.
- **Schede aggiornabili:** pagine con i contenuti che invecchiano (modelli, prodotti, prezzi, strumenti), con il layout `Scheda.astro` e il prop `aggiornato="AAAA-MM-GG"`, che mostra «Aggiornato al GG mese AAAA». Stanno in `src/pages/schede/`: U.2 `/schede/modelli-claude/`, U.4 `/schede/privacy-servizi/`, U.5 `/schede/strumenti-design/`. Le slide le richiamano con un link senza ripeterne i dati. Quando si aggiorna una scheda si aggiorna anche la data.

## Regole sui contenuti

- **È un corso sull'AI e sul vibe coding.** Ogni argomento tecnico c'è per dirigere e verificare l'AI. Non aggiungete sviluppo generico che la scaletta non prevede. Le slide [Con l'AI] sono importanti: cosa chiedere a Claude, cosa sbaglia l'AI, come si verifica.
- **La scaletta è la guida.** Se sembra che manchi qualcosa o che qualcosa non funzioni, proponetelo al docente. Non cambiate la struttura da soli.
- **Stile dei testi:**
  - frasi brevi, parole comuni, ogni termine tecnico spiegato la prima volta che compare;
  - ci si rivolge alla classe con il «voi»;
  - poco testo per slide: si legge in aula, non è una pagina di libro;
  - niente punti esclamativi enfatici;
  - termini inglesi solo se sono quelli che gli studenti incontreranno davvero.
- **Esempi ricorrenti:**
  - la trattoria «Da Rina» per il sito: Astro + Keystatic + GitHub + Vercel;
  - PrenotaAula per la webapp: si aggiunge Supabase.
- **Fatti e fonti:**
  - quello che può essere cambiato dopo la vostra data di taglio (versioni, prezzi, leggi, funzioni dei prodotti, procedure di installazione) va verificato con una ricerca sul web prima di scriverlo, soprattutto le voci [Verificare];
  - le fonti vanno nella `.footnote` con link;
  - non inventate date, numeri o citazioni;
  - riformulate con parole vostre.
- **Immagini e disegni:**
  - preferite SVG e CSS fatti a mano;
  - niente personaggi, loghi o opere protette ridisegnati;
  - niente foto di persone reali scaricate dal web.
- **Accessibilità:**
  - contrasto sufficiente, anche nel tema blu e rosa;
  - testi alternativi;
  - tutto usabile da tastiera;
  - nessuno scorrimento orizzontale sul telefono.

## Metodo di lavoro

1. **Un ramo per ogni blocco di lavoro.** Niente push diretti su `main`: il docente controlla l'anteprima di Vercel e unisce lui la pull request.
2. **Plan mode all'inizio di ogni blocco:** elenco delle slide, componenti nuovi, fatti da verificare. Aspettate l'approvazione prima di scrivere.
3. **Commit piccoli,** con messaggi chiari in italiano.
4. **Controlli prima di dichiarare finito un blocco:**
   - `npm run build` senza errori;
   - la pagina si apre senza errori in console;
   - si naviga con la tastiera; contatore e pulsanti delle sezioni sono giusti;
   - va bene su computer e telefono, senza scorrimento orizzontale;
   - i link interni e i rimandi funzionano;
   - i fatti sono verificati e hanno la fonte.

   Quando potete, guardate le pagine in un browser (Playwright).

## Quando chiedere al docente

Prima di:
- cambiare la struttura della scaletta o l'aspetto delle slide normali;
- togliere contenuti esistenti;
- aggiungere dipendenze oltre ad Astro e alle sue integrazioni ufficiali;
- rinunciare a qualcosa che la scaletta prevede.

Per tutto il resto decidete voi e scrivete le scelte nella descrizione della pull request.

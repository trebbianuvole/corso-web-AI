# Costruire siti web con l'AI

Sito del corso ENGIM di uso dell'AI e vibe coding. Si usa in aula al posto delle slide.

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
  layouts/Pagina.astro        <head> comune a tutte le pagine
  layouts/Capitolo.astro      barra in alto, slide in ordine, script
  components/slide/           Slide (slide normale) e Apertura (apertura di sezione)
  components/                 Card, Grid, Steps e Passo, Defs e Def
  capitoli/capitolo-N/
    capitolo.ts               titolo, sezioni e ordine delle slide
    copertina-N.astro         la copertina
    <sezione>/<slide>.astro   una slide per file, una cartella per sezione
  lib/                        numerazione delle slide e rimandi
  indirizzi.json              registro degli indirizzi pubblicati
public/assets/
  css/style.css               stile unico per tutto il sito
  js/deck.js                  navigazione a slide (frecce, F per schermo intero)
  js/approfondimenti.js       le finestre degli approfondimenti (capitoli che ne hanno)
  js/rete-minuscola.js        demo "una rete minuscola che impara" (1.1.a5)
  js/next-word.js             gioco "indovina la parola successiva" (capitolo 1)
  js/timeline.js              serpentina "Dal 2017 a oggi" (capitolo 1)
  js/layers.js                demo "HTML, CSS, JavaScript" (capitolo 2) e pulsanti Copia (capitolo 3)
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

## Comandi in aula

- `→` / `←`, `PagGiù` / `PagSu`, `Spazio`: slide successiva o precedente
- `↑` / `↓`: scorrimento normale dentro una slide lunga
- `Home` / `Fine`: prima e ultima slide
- `F`: schermo intero

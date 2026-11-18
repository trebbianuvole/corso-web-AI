# Noema Lab

Sito di Noema Lab, con i corsi sull'intelligenza artificiale. Il primo è il corso ENGIM «Costruire siti web con l'AI», sull'uso dell'AI e sul vibe coding: si usa in aula al posto delle slide. I corsi sono riservati: si entra con nome utente e password.

Il sito è fatto con [Astro](https://astro.build) ed è statico. L'unico pezzo che gira sul server è `middleware.ts`, che controlla l'accesso ai corsi. Vercel lo ricostruisce e lo pubblica a ogni push su `main` e crea un'anteprima per ogni pull request.

## Comandi

Serve Node.js 22.23.4 o successivo.

```bash
npm install          # installa Astro (una volta sola)
npm run dev          # sito in locale su http://localhost:4321, si aggiorna da solo
npm run build        # genera il sito finale nella cartella dist/
npm run preview      # apre in locale il sito di dist/
npm run indirizzi    # registra gli indirizzi delle slide nuove o spostate
npm test             # test dell'accesso ai corsi
npm run prova-accesso  # prova l'accesso in locale su http://localhost:4322 (dopo npm run build)
```

## Struttura

```
src/
  pages/                      le pagine: home dei corsi, pagina del corso (sviluppo-web-ai/), un capitolo
                              per indirizzo, accedi/, gestione/utenti/, vecchi indirizzi lezione-N
  layouts/Pagina.astro        <head> comune a tutte le pagine
  layouts/Capitolo.astro      barra in alto, slide in ordine, script
  components/slide/           Slide (slide normale) e Apertura (apertura di sezione)
  components/                 Card, Grid, Steps e Passo, Defs e Def
  capitoli/capitolo-N/
    capitolo.ts               titolo, sezioni e ordine delle slide
    copertina-N.astro         la copertina
    <sezione>/<slide>.astro   una slide per file, una cartella per sezione
  lib/                        numerazione delle slide e rimandi; corsi.mjs (i corsi); accesso.mjs (utenti, password, sessioni)
  indirizzi.json              registro degli indirizzi pubblicati
public/assets/
  css/style.css               stile unico per tutto il sito
  js/deck.js                  navigazione a slide (frecce, F per schermo intero)
  js/approfondimenti.js       le finestre degli approfondimenti (capitoli che ne hanno)
  js/rete-minuscola.js        demo "una rete minuscola che impara" (1.1.a5)
  js/next-word.js             gioco "indovina la parola successiva" (capitolo 1)
  js/timeline.js              serpentina "Dal 2017 a oggi" (capitolo 1)
  js/layers.js                demo "HTML, CSS, JavaScript" (capitolo 2) e pulsanti Copia (capitolo 3)
  js/home.js                  animazione del titolo (home e pagina del corso)
  js/accedi.js, sessione.js   pagina di accesso; chi è entrato
  js/utenti.js                genera password e righe degli utenti (gestione)
middleware.ts                 controllo dell'accesso, gira su Vercel prima di ogni pagina
test/                         test dell'accesso
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

## Accesso ai corsi

Le pagine dei corsi sono riservate. Restano pubbliche solo la home e la pagina di accesso. Gli account stanno in due variabili d'ambiente del progetto su Vercel (**Settings › Environment Variables**), impostate per Production e Preview:

- `UTENTI`, di tipo **Config**: una riga per utente, con nome, corsi e impronta della password;
- `SEGRETO_SESSIONI`, di tipo **Secret**: una stringa casuale che firma le sessioni.

Le password non sono salvate da nessuna parte: nell'elenco c'è solo la loro impronta. Dopo ogni modifica alle variabili serve un nuovo deploy (**Deployments**, menu **⋯**, **Redeploy**).

### Primo avvio

1. Aprite `/gestione/utenti/`: finché `UTENTI` è vuota è aperta a tutti.
2. In fondo alla pagina, in «Primo avvio», generate il segreto e copiatelo in `SEGRETO_SESSIONI`.
3. Create il vostro account con «Tutti i corsi» e copiate la riga in `UTENTI`.
4. Rifate il deploy e accedete.

### Studenti e docenti

- **Nuovi utenti:** in `/gestione/utenti/` incollate i nomi di una classe; la pagina inventa le password, vi dà la tabella da consegnare e le righe da aggiungere in fondo a `UTENTI`.
- **Nuova password:** generate una riga con lo stesso nome e sostituite quella vecchia.
- **Togliere un utente:** cancellate la sua riga.
- **Account passe-partout:** spuntate «Tutti i corsi»: vede tutti i corsi e la pagina di gestione.

### Provare in locale

Con `npm run dev` l'accesso non c'è: il middleware gira solo su Vercel. Per provarlo, create un file `.env.local` (non va nel repository) con `UTENTI` e `SEGRETO_SESSIONI`, poi:

```bash
npm run build
npm run prova-accesso
```

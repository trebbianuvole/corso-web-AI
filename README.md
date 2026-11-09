# Costruire siti web con l'AI

Sito del corso ENGIM di uso dell'AI e vibe coding. Si usa in aula al posto delle slide.

## Struttura

```
index.html            home con l'elenco delle lezioni
lezione-1/index.html  lezione 1, una sezione per slide
lezione-2/index.html  lezione 2
assets/css/style.css  stile unico per tutto il sito
assets/js/deck.js     navigazione a slide (frecce, F per schermo intero)
assets/js/next-word.js gioco "indovina la parola successiva"
assets/js/home.js     animazione del titolo in home
assets/js/layers.js   demo "HTML, CSS, JavaScript" e pulsanti Copia (lezione 2)
```

Sito statico: nessuna build. Vercel pubblica direttamente il contenuto del repo.
In locale basta aprire `index.html` nel browser.

## Comandi in aula

- `→` / `←`, `PagGiù` / `PagSu`, `Spazio`: slide successiva o precedente
- `↑` / `↓`: scorrimento normale dentro una slide lunga
- `F`: schermo intero

// Capitolo 9: dati, ordine delle sezioni e delle slide.
// Ogni nome in «slide» è un file .astro in questa cartella (o in una sottocartella).
// Numero e id di ogni slide si ricavano dalla posizione in questo elenco.
import type { Capitolo } from "../../lib/numerazione.mjs";

const capitolo: Capitolo = {
  slug: "capitolo-9",
  numero: 9,
  titolo: "Capitolo 9: farsi trovare",
  descrizione: "Capitolo 9 del corso di uso dell'AI e vibe coding: come funziona la ricerca, la SEO di base, la ricerca con l'AI e i suoi crawler, condividere e misurare.",
  home: {
    titolo: "Farsi trovare",
    desc: "Dai motori di ricerca alle risposte delle AI, e come misurare.",
  },
  script: [],
  copertina: "copertina-9",
  sezioni: [
    {
      chiave: "ricerca",
      num: "9.1",
      nome: "Ricerca",
      slide: ["apertura-ricerca", "scansione-indice-classifica", "cosa-conta-ricerca"],
    },
    {
      chiave: "seo",
      num: "9.2",
      nome: "SEO",
      slide: [
        "apertura-seo",
        "title-description",
        "titoli-testi-indirizzi",
        "sitemap-robots",
        "search-console-scheda",
        "claude-revisore-seo",
      ],
    },
    {
      chiave: "ricerca-ai",
      num: "9.3",
      nome: "Ricerca con l'AI",
      slide: [
        "apertura-ricerca-ai",
        "risposte-al-posto-link",
        "farsi-citare",
        "crawler-ai",
        "cosa-non-fare-ricerca",
      ],
    },
    {
      chiave: "misurare",
      num: "9.4",
      nome: "Misurare",
      slide: [
        "apertura-misurare",
        "anteprime-social",
        "sito-ottenere",
        "statistiche-privacy",
        "sito-si-trova",
      ],
    },
  ],
};

export default capitolo;

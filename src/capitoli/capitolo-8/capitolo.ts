// Capitolo 8: dati, ordine delle sezioni e delle slide.
// Ogni nome in «slide» è un file .astro in questa cartella (o in una sottocartella).
// Numero e id di ogni slide si ricavano dalla posizione in questo elenco.
import type { Capitolo } from "../../lib/numerazione.mjs";

const capitolo: Capitolo = {
  slug: "capitolo-8",
  numero: 8,
  titolo: "Capitolo 8: contenuti e CMS",
  descrizione: "Capitolo 8 del corso di uso dell'AI e vibe coding: contenuti e codice, i CMS, come funziona Keystatic, implementarlo con Claude Code, scrivere per il web, immagini e media.",
  home: {
    titolo: "Contenuti e CMS",
    desc: "Il cliente cambia i contenuti da solo: Keystatic, scrivere per il web, immagini.",
  },
  script: [],
  copertina: "copertina-8",
  sezioni: [
    {
      chiave: "contenuti",
      num: "8.1",
      nome: "Contenuti",
      slide: [
        "apertura-contenuti",
        "cambiare-prezzo",
        "dove-contenuti",
        "chi-fa-cosa",
      ],
    },
    {
      chiave: "cms",
      num: "8.2",
      nome: "CMS",
      slide: [
        "apertura-cms",
        "quattro-famiglie-cms",
        "pro-contro-cms",
        "perche-keystatic",
        "cms-ai",
      ],
      approfondimenti: [
        {
          chiave: "altri-cms",
          titolo: "Altri CMS da vicino",
          pulsante: "headless e WordPress",
          da: "quattro-famiglie-cms",
          slide: ["headless-vicino", "wordpress-oggi"],
        },
      ],
    },
    {
      chiave: "keystatic",
      num: "8.3",
      nome: "Keystatic",
      slide: [
        "apertura-keystatic",
        "pannello-keystatic",
        "schema-keystatic",
        "campi-keystatic",
        "dove-finiscono",
        "locale-github",
        "salvataggio-online",
      ],
      approfondimenti: [
        {
          chiave: "formati-cloud",
          titolo: "Formati e Keystatic Cloud",
          pulsante: "Markdoc e Keystatic Cloud",
          da: "dove-finiscono",
          slide: ["markdoc-markdown", "keystatic-cloud"],
        },
      ],
    },
    {
      chiave: "keystatic-claude",
      num: "8.4",
      nome: "Con Claude Code",
      slide: [
        "apertura-keystatic-claude",
        "piano-keystatic",
        "installare-keystatic",
        "schema-trattoria",
        "leggere-contenuti",
        "online-github",
        "prova-cliente",
        "ai-sbaglia-keystatic",
        "cms-vostro-sito",
      ],
    },
    {
      chiave: "scrivere",
      num: "8.5",
      nome: "Scrivere",
      slide: [
        "apertura-scrivere",
        "legge-salti",
        "titoli-inviti",
        "tono-claude-md",
        "ai-scrive-voi",
      ],
    },
    {
      chiave: "immagini",
      num: "8.6",
      nome: "Immagini",
      slide: [
        "apertura-immagini",
        "formati-peso",
        "dove-trovarle",
        "foto-persone",
        "media-generati",
        "diritti-generate",
      ],
      approfondimenti: [
        {
          chiave: "marchi",
          titolo: "Icone, loghi e marchi",
          pulsante: "icone, loghi e marchi",
          da: "dove-trovarle",
          slide: ["icone-loghi-marchi"],
        },
      ],
    },
  ],
};

export default capitolo;

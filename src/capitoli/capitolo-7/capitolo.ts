// Capitolo 7: dati, ordine delle sezioni e delle slide.
// Ogni nome in «slide» è un file .astro in questa cartella (o in una sottocartella).
// Numero e id di ogni slide si ricavano dalla posizione in questo elenco.
import type { Capitolo } from "../../lib/numerazione.mjs";

const capitolo: Capitolo = {
  slug: "capitolo-7",
  numero: 7,
  titolo: "Capitolo 7: design e interfacce",
  descrizione: "Capitolo 7 del corso di uso dell'AI e vibe coding: UX e UI, gli stati dell'interfaccia, il design system, il design con l'AI, il responsive e l'accessibilità.",
  home: {
    titolo: "Design e interfacce",
    desc: "UX e UI, stati, design system, design con l'AI, responsive, accessibilità.",
  },
  script: [],
  copertina: "copertina-7",
  sezioni: [
    {
      chiave: "ux-ui",
      num: "7.1",
      nome: "UX e UI",
      slide: [
        "apertura-ux-ui",
        "ux-ui-diversi",
        "gerarchia",
        "spazio",
        "caratteri",
        "colore",
        "coerenza",
        "smontare-sito",
      ],
    },
    {
      chiave: "stati",
      num: "7.2",
      nome: "Stati",
      slide: [
        "apertura-stati",
        "sei-stati",
        "riscontro-clic",
        "caso-felice",
      ],
    },
    {
      chiave: "design-system",
      num: "7.3",
      nome: "Design system",
      slide: [
        "apertura-design-system",
        "cos-e-design-system",
        "variabili-css",
        "design-system-componenti",
        "design-system-claude-md",
      ],
      approfondimenti: [
        {
          chiave: "librerie-token",
          titolo: "Librerie e design token",
          pulsante: "librerie e design token",
          da: "cos-e-design-system",
          slide: ["librerie-componenti", "design-token"],
        },
      ],
    },
    {
      chiave: "design-ai",
      num: "7.4",
      nome: "Design con l'AI",
      slide: [
        "apertura-design-ai",
        "siti-si-somigliano",
        "dare-identita",
        "schizzo-codice",
        "claude-guarda",
        "strumenti-design-ai",
        "mostrare-cliente",
      ],
    },
    {
      chiave: "responsive",
      num: "7.5",
      nome: "Responsive",
      slide: [
        "apertura-responsive",
        "prima-telefono",
        "pagina-si-adatta",
        "tanti-schermi",
      ],
    },
    {
      chiave: "accessibilita",
      num: "7.6",
      nome: "Accessibilità",
      slide: [
        "apertura-accessibilita",
        "sito-per-tutti",
        "basi-accessibilita",
        "come-si-prova",
        "claude-accessibilita",
        "legge-accessibilita",
        "tre-controlli",
      ],
    },
  ],
};

export default capitolo;

// Capitolo 1: dati, ordine delle sezioni e delle slide.
// Ogni nome in «slide» è un file .astro in questa cartella (o in una sottocartella).
// Numero e id di ogni slide si ricavano dalla posizione in questo elenco.
import type { Capitolo } from "../../lib/numerazione.mjs";

const capitolo: Capitolo = {
  slug: "capitolo-1",
  numero: 1,
  titolo: "Capitolo 1: capire l'AI e orientarsi negli strumenti",
  descrizione: "Capitolo 1 del corso di uso dell'AI e vibe coding: storia, come funziona un LLM, il mercato e Claude.",
  home: {
    titolo: "Capire l'AI e orientarsi negli strumenti",
    desc: "Storia, come funziona un LLM, il mercato, Claude.",
  },
  script: ["next-word.js", "timeline.js", "rete-minuscola.js"],
  copertina: "copertina-1",
  sezioni: [
    {
      chiave: "storia",
      num: "1.1",
      nome: "Storia",
      slide: [
        "apertura-storia",
        "cinque-ere",
        "regole-esempi-filtro-antispam",
        "reti-neurali-motore-deep",
        "matrioske",
        "perche-proprio-adesso",
      ],
      approfondimenti: [
        {
          chiave: "reti-neurali",
          titolo: "Le reti neurali da vicino",
          pulsante: "le reti neurali",
          da: "reti-neurali-motore-deep",
          slide: [
            "neurone-artificiale",
            "soglia-curva",
            "strati-astratti",
            "come-impara",
            "rete-minuscola-impara",
            "studiare-memoria",
            "quanto-grandi",
            "parole-numeri",
          ],
        },
      ],
    },
    {
      chiave: "llm",
      num: "1.2",
      nome: "LLM",
      slide: [
        "apertura-llm",
        "indovina-pezzo-successivo",
        "token-mattoncini-testo",
        "contesto-memoria-lavoro",
        "indovina-parola-successiva",
        "modello-inventa",
        "invenzioni-dove",
        "invenzioni-difendersi",
        "multimodalita-solo-testo",
      ],
    },
    {
      chiave: "mercato",
      num: "1.3",
      nome: "Mercato",
      slide: [
        "apertura-mercato",
        "chi-costruisce-modelli",
        "strumenti-creare-siti-app",
        "modello-applicazione",
        "scegliere-modello",
        "classifiche-limiti",
        "matematica-lezione",
      ],
    },
    {
      chiave: "claude",
      num: "1.4",
      nome: "Claude",
      slide: [
        "apertura-claude",
        "dove-usa",
        "modelli-scegliere-taglia-giusta",
        "parole-conoscere",
        "nato-questo-sito",
      ],
    },
  ],
};

export default capitolo;

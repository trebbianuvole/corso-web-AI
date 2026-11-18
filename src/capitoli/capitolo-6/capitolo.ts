// Capitolo 6: dati, ordine delle sezioni e delle slide.
// Ogni nome in «slide» è un file .astro in questa cartella (o in una sottocartella).
// Numero e id di ogni slide si ricavano dalla posizione in questo elenco.
import type { Capitolo } from "../../lib/numerazione.mjs";

const capitolo: Capitolo = {
  slug: "capitolo-6",
  numero: 6,
  titolo: "Capitolo 6: costruire con l'AI",
  descrizione: "Capitolo 6 del corso di uso dell'AI e vibe coding: il banco di lavoro, il CLAUDE.md, la prima sessione con Claude Code, i componenti di Astro, una funzionalità alla volta, la pubblicazione e cosa fare quando qualcosa si rompe.",
  home: {
    titolo: "Costruire con l'AI",
    desc: "Dal CLAUDE.md a un sito in Astro online, una funzionalità alla volta.",
  },
  script: [],
  copertina: "copertina-6",
  sezioni: [
    {
      chiave: "banco",
      num: "6.1",
      nome: "Banco",
      slide: [
        "apertura-banco",
        "cosa-serve-banco",
        "node-npm",
        "vs-code-dieci-minuti",
        "installare-claude-code",
        "creare-progetto-astro",
        "funziona-tutto",
      ],
    },
    {
      chiave: "claude-md",
      num: "6.2",
      nome: "CLAUDE.md",
      slide: [
        "apertura-claude-md",
        "documento-claude-md",
        "claude-md-commentato",
        "cosa-non-ci-va",
        "claude-md-cresce",
      ],
      approfondimenti: [
        {
          chiave: "claude-md-strumenti",
          titolo: "CLAUDE.md: strumenti in più",
          pulsante: "/init, skill e documentazione",
          da: "documento-claude-md",
          slide: ["init-claude-md", "skill-documentazione"],
        },
      ],
    },
    {
      chiave: "sessione",
      num: "6.3",
      nome: "Prima sessione",
      slide: [
        "apertura-sessione",
        "plan-mode-pratica",
        "primo-prompt",
        "guardare-risultato",
        "passo-commit",
        "permessi-claude-code",
        "sessioni-lunghe",
      ],
    },
    {
      chiave: "componenti",
      num: "6.4",
      nome: "Componenti",
      slide: [
        "apertura-componenti",
        "cos-e-componente",
        "componenti-astro",
        "props-componenti",
        "layout-astro",
        "scomporre-pagina",
        "componenti-non-pagine",
      ],
      approfondimenti: [
        {
          chiave: "componenti-interattivi",
          titolo: "Componenti interattivi",
          pulsante: "isole e altri framework",
          da: "componenti-astro",
          slide: ["isole-interattive", "react-vue-svelte"],
        },
      ],
    },
    {
      chiave: "funzionalita",
      num: "6.5",
      nome: "Funzionalità",
      slide: [
        "apertura-funzionalita",
        "scomporre-funzionalita",
        "prompt-criteri",
        "prima-versione-migliorie",
        "iterare-senza-rompere",
        "quattro-livelli-codice",
        "demo-refactoring",
        "funzionalita-completa",
      ],
    },
    {
      chiave: "pubblicare",
      num: "6.6",
      nome: "Pubblicare",
      slide: [
        "apertura-pubblicare",
        "github-vercel",
        "anteprima-ramo",
        "dominio-sito",
      ],
      approfondimenti: [
        {
          chiave: "alternative-hosting",
          titolo: "Le alternative a Vercel",
          pulsante: "le alternative a Vercel",
          da: "github-vercel",
          slide: ["netlify-pages"],
        },
      ],
    },
    {
      chiave: "rotture",
      num: "6.7",
      nome: "Quando si rompe",
      slide: [
        "apertura-rotture",
        "dove-guardare",
        "leggere-errore",
        "spiegarlo-claude",
        "agente-gira-tondo",
        "uscire-ciclo",
        "versione-vecchia",
        "errori-classici",
        "mvp-online",
      ],
    },
  ],
};

export default capitolo;

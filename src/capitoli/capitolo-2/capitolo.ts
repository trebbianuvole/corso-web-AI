// Capitolo 2: dati, ordine delle sezioni e delle slide.
// Ogni nome in «slide» è un file .astro in questa cartella (o in una sottocartella).
// Numero e id di ogni slide si ricavano dalla posizione in questo elenco.
import type { Capitolo } from "../../lib/numerazione.mjs";

const capitolo: Capitolo = {
  slug: "capitolo-2",
  numero: 2,
  titolo: "Capitolo 2: progettare e capire il web",
  descrizione: "Capitolo 2 del corso di uso dell'AI e vibe coding: organizzare un progetto, POC e MVP, com'è fatto un sito, lo stack, API e server MCP.",
  home: {
    titolo: "Progettare e capire il web",
    desc: "Organizzare un progetto, POC e MVP, com'è fatto un sito, lo stack, API e server MCP.",
  },
  script: ["layers.js"],
  copertina: "copertina-2",
  sezioni: [
    {
      chiave: "piano",
      num: "2.1",
      nome: "Piano",
      slide: [
        "apertura-piano",
        "sito-ricetta",
        "piano-fa-mano-prima",
        "differenza-fa-brief",
        "prima-accendere-fornelli",
        "pensate-vostro-sito",
      ],
    },
    {
      chiave: "progetto",
      num: "2.2",
      nome: "Progetto",
      slide: [
        "apertura-progetto",
        "prima-tutto-puo-fare",
        "mvp-versione-piu-piccola",
        "mvp-trattoria-rina",
        "poc-prototipo-mvp",
        "target-decide-scelte-tecniche",
        "sito-webapp-app",
        "architettura-dove-sta-ogni",
        "quanto-costa-cambiare-idea",
        "domande-tutti-dimenticano",
        "tutto-iscritto-file",
      ],
    },
    {
      chiave: "web",
      num: "2.3",
      nome: "Web",
      slide: [
        "apertura-web",
        "succede-quando-aprite-sito",
        "client-server-chi-chiede",
        "anatomia-indirizzo",
        "dominio-hosting-insegna-locale",
        "html-css-javascript-tre",
        "accendete-strati-volta",
        "frontend-backend-database",
        "statico-dinamico",
        "cms-sito-pannello-controllo",
        "sito-tanti-schermi",
        "ogni-sito-puo-aprire",
        "parole-conoscere-web",
      ],
    },
    {
      chiave: "stack",
      num: "2.4",
      nome: "Stack",
      slide: [
        "apertura-stack",
        "linguaggi-librerie-framework-servizi",
        "pila-strumenti-strato-strato",
        "linguaggi-piu-diffusi-dove",
        "frontend-mano-framework",
        "cucina-dispensa",
        "oltre-web",
        "attrezzi-comuni-tutti",
        "tre-progetti-tre-stack",
        "sceglie-stack",
      ],
    },
    {
      chiave: "mcp",
      num: "2.5",
      nome: "API e MCP",
      slide: [
        "apertura-mcp",
        "al-ristorante",
        "api-menu",
        "api-ovunque",
        "ogni-menu-scritto-lingua",
        "mcp-modo-comune-servire",
        "ordine-passo-passo",
        "claude-chiamano-connettori",
        "cameriere-ha-chiavi-cucina",
      ],
    },
  ],
};

export default capitolo;

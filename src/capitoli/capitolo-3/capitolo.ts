// Capitolo 3: dati, ordine delle sezioni e delle slide.
// Ogni nome in «slide» è un file .astro in questa cartella (o in una sottocartella).
// Numero e id di ogni slide si ricavano dalla posizione in questo elenco.
import type { Capitolo } from "../../lib/numerazione.mjs";

const capitolo: Capitolo = {
  slug: "capitolo-3",
  numero: 3,
  titolo: "Capitolo 3: parlare con l'AI e farla lavorare",
  descrizione: "Capitolo 3 del corso di uso dell'AI e vibe coding: prompt e contesto, agenti e skill, MCP e connettori, vibe coding e Claude Code.",
  home: {
    titolo: "Parlare con l'AI e farla lavorare",
    desc: "Prompt e contesto, agenti e skill, MCP e connettori, vibe coding e Claude Code.",
  },
  script: ["layers.js"],
  copertina: "copertina-3",
  sezioni: [
    {
      chiave: "prompt",
      num: "3.1",
      nome: "Prompt",
      slide: [
        "apertura-prompt",
        "claude-sa-solo-quello",
        "sei-ingredienti-buon-prompt",
        "prompt-smontato",
        "cinque-mosse-funzionano",
        "segnala-problema",
        "primo-risultato-bozza",
        "sbagli-fanno-tutti",
        "modello-copiare",
        "serve-contesto",
        "scrivere-bene-pensare-bene",
      ],
    },
    {
      chiave: "agenti",
      num: "3.2",
      nome: "Agenti",
      slide: [
        "apertura-agenti",
        "chatbot-agente",
        "agente-com-e-fatto",
        "workflow-agente",
        "agenti-ovunque",
        "agenti-claude",
        "chi-lavora-sa",
        "skill-subagent-mcp-serve",
        "affidare-lavoro-senza-perdere",
      ],
    },
    {
      chiave: "mcp",
      num: "3.3",
      nome: "MCP",
      slide: [
        "apertura-mcp",
        "cameriere",
        "ogni-menu-scritto-lingua",
        "mcp-modo-comune-servire",
        "ordine-passo-passo",
        "claude-chiamano-connettori",
        "cameriere-ha-chiavi-cucina",
      ],
    },
    {
      chiave: "code",
      num: "3.4",
      nome: "Claude Code",
      slide: [
        "apertura-code",
        "dove-viene-parola",
        "spettro-interruttore",
        "quando-quando-cautela",
        "ciclo-lavoro",
        "claude-code-agente-dentro",
        "chat-claude-code",
        "come-lavora",
        "strumenti-conoscere",
        "dal-piano-sito-online",
        "regole-vibe-coder-giudizio",
        "scrivete-documento-vostro-progetto",
      ],
    },
  ],
};

export default capitolo;

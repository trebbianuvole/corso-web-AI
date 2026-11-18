// Capitolo 4: dati, ordine delle sezioni e delle slide.
// Ogni nome in «slide» è un file .astro in questa cartella (o in una sottocartella).
// Numero e id di ogni slide si ricavano dalla posizione in questo elenco.
import type { Capitolo } from "../../lib/numerazione.mjs";

const capitolo: Capitolo = {
  slug: "capitolo-4",
  numero: 4,
  titolo: "Capitolo 4: Git e GitHub",
  descrizione: "Capitolo 4 del corso di uso dell'AI e vibe coding: il terminale, Git, i rami, GitHub, il lavoro in squadra e Git come rete di sicurezza per gli agenti.",
  home: {
    titolo: "Git e GitHub",
    desc: "La storia del progetto, il lavoro in squadra, la rete di sicurezza per gli agenti.",
  },
  script: [],
  copertina: "copertina-4",
  sezioni: [
    {
      chiave: "perche",
      num: "4.1",
      nome: "Perché",
      slide: [
        "apertura-perche",
        "versione-giusta",
        "cosa-risolvono-git",
        "git-non-github",
        "agente-serve-ancora",
      ],
    },
    {
      chiave: "terminale",
      num: "4.2",
      nome: "Terminale",
      slide: [
        "apertura-terminale",
        "cos-e-terminale",
        "tre-comandi-orientarsi",
        "terminale-paura",
        "primo-giro-terminale",
      ],
    },
    {
      chiave: "git",
      num: "4.3",
      nome: "Git",
      slide: [
        "apertura-git",
        "repository-cartella",
        "commit-fotografia",
        "tre-posti-git",
        "guardare-storia",
        "messaggi-servono",
        "cosa-non-salvare",
        "tornare-indietro-git",
        "git-non-backup",
        "primo-repository",
      ],
      approfondimenti: [
        {
          chiave: "comandi-cura",
          titolo: "I comandi da maneggiare con cura",
          pulsante: "i comandi da maneggiare con cura",
          da: "tornare-indietro-git",
          slide: ["reset-hard", "push-force", "ritrovare-commit-perso"],
        },
      ],
    },
    {
      chiave: "rami",
      num: "4.4",
      nome: "Rami",
      slide: [
        "apertura-rami",
        "main-branch",
        "creare-cambiare-ramo",
        "merge-rami",
        "conflitti-stessa-riga",
        "risolvere-conflitto",
        "conflitto-apposta",
      ],
    },
    {
      chiave: "github",
      num: "4.5",
      nome: "GitHub",
      slide: [
        "apertura-github",
        "casa-online",
        "account-repository",
        "pubblico-privato",
        "computer-github",
        "issue-github",
        "pull-request",
        "code-review",
      ],
      approfondimenti: [
        {
          chiave: "accessi-github",
          titolo: "Accessi e strumenti di GitHub",
          pulsante: "accessi e strumenti di GitHub",
          da: "computer-github",
          slide: ["token-chiavi-ssh", "projects-bacheca", "pages-siti-statici"],
        },
      ],
    },
    {
      chiave: "squadra",
      num: "4.6",
      nome: "In squadra",
      slide: [
        "apertura-squadra",
        "stesso-giro",
        "progetto-prenotaula",
        "anna-issue-12",
        "merge-sito-aggiorna",
        "release-tag",
        "qualcosa-va-storto",
      ],
      approfondimenti: [
        {
          chiave: "automazioni-github",
          titolo: "Automazioni su GitHub",
          pulsante: "le automazioni su GitHub",
          da: "merge-sito-aggiorna",
          slide: ["github-actions", "proteggere-main"],
        },
      ],
    },
    {
      chiave: "git-ai",
      num: "4.7",
      nome: "Git e AI",
      slide: [
        "apertura-git-ai",
        "rete-sicurezza-agente",
        "checkpoint-commit",
        "ramo-esperimento",
        "leggere-diff",
        "claude-commit-pr",
        "non-nel-repository",
      ],
      approfondimenti: [
        {
          chiave: "agenti-paralleli",
          titolo: "Più agenti in parallelo",
          pulsante: "più agenti in parallelo",
          da: "ramo-esperimento",
          slide: ["cartella-per-agente", "dividere-lavoro-agenti"],
        },
      ],
    },
    {
      chiave: "fila",
      num: "4.8",
      nome: "Tirare le fila",
      slide: [
        "apertura-fila",
        "sito-su-github",
        "regole-oro-squadra",
        "parole-git",
        "progetto-su-github",
      ],
    },
  ],
};

export default capitolo;

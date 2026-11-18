// Capitolo 5: dati, ordine delle sezioni e delle slide.
// Ogni nome in «slide» è un file .astro in questa cartella (o in una sottocartella).
// Numero e id di ogni slide si ricavano dalla posizione in questo elenco.
import type { Capitolo } from "../../lib/numerazione.mjs";

const capitolo: Capitolo = {
  slug: "capitolo-5",
  numero: 5,
  titolo: "Capitolo 5: usare l'AI con giudizio",
  descrizione: "Capitolo 5 del corso di uso dell'AI e vibe coding: dove vanno i dati, i dati degli altri, la sicurezza con gli agenti, l'uso consapevole, responsabilità e diritti, le regole.",
  home: {
    titolo: "Usare l'AI con giudizio",
    desc: "Dati, sicurezza con gli agenti, responsabilità, diritti e regole.",
  },
  script: [],
  copertina: "copertina-5",
  sezioni: [
    {
      chiave: "dati",
      num: "5.1",
      nome: "Dati",
      slide: [
        "apertura-dati",
        "viaggio-messaggio",
        "addestramento-dipende",
        "account-personale-lavoro",
        "memoria-cronologia-connettori",
        "aprite-impostazioni",
      ],
    },
    {
      chiave: "altrui",
      num: "5.2",
      nome: "Dati altrui",
      slide: [
        "apertura-altrui",
        "dato-personale",
        "dati-piu-attenzione",
        "incollare-consegnare",
        "regole-pratiche-dati",
        "progetti-web-dati",
        "dati-non-devono-uscire",
        "si-puo-incollare",
      ],
      approfondimenti: [
        {
          chiave: "modelli-locali",
          titolo: "Modelli aperti e locali",
          pulsante: "modelli aperti e locali",
          da: "dati-non-devono-uscire",
          slide: ["pesi-aperti-chiusi", "hugging-face-catalogo", "modello-sul-computer"],
        },
      ],
    },
    {
      chiave: "sicurezza",
      num: "5.3",
      nome: "Sicurezza",
      slide: [
        "apertura-sicurezza",
        "agente-nome-vostro",
        "istruzioni-nascoste",
        "caso-luglio-2026",
        "agente-compromesso",
        "difese-agenti",
        "librerie-inesistenti",
        "chi-attacca-usa-ai",
      ],
      approfondimenti: [
        {
          chiave: "caso-hugging-face",
          titolo: "Il caso Hugging Face da vicino",
          pulsante: "il caso Hugging Face",
          da: "caso-luglio-2026",
          slide: ["cronologia-caso", "modello-che-bara", "filtri-fermano-difesa", "leggere-fonti-caso"],
        },
      ],
    },
    {
      chiave: "consapevole",
      num: "5.4",
      nome: "Uso consapevole",
      slide: [
        "apertura-consapevole",
        "sicuro-non-giusto",
        "non-so-controllarlo",
        "dichiarare-uso",
        "ai-come-amico",
        "persone-reali",
        "pregiudizi-dati",
      ],
      approfondimenti: [
        {
          chiave: "impronta-ai",
          titolo: "L'impronta dell'AI",
          pulsante: "l'impronta dell'AI",
          da: "sicuro-non-giusto",
          slide: ["energia-acqua-chip", "cosa-fare-impronta"],
        },
      ],
    },
    {
      chiave: "diritti",
      num: "5.5",
      nome: "Diritti",
      slide: [
        "apertura-diritti",
        "chi-risponde",
        "di-chi-e",
        "addestrare-opere-altri",
        "lavoro-cambia",
      ],
    },
    {
      chiave: "domande",
      num: "5.6",
      nome: "Domande",
      slide: [
        "apertura-domande",
        "quattro-domande",
        "tribunale-ai",
      ],
      approfondimenti: [
        {
          chiave: "capire-imitare",
          titolo: "Capire o imitare",
          pulsante: "capire o imitare",
          da: "quattro-domande",
          slide: ["test-turing", "stanza-cinese", "pappagalli-emergenti"],
        },
        {
          chiave: "rischi-allineamento",
          titolo: "Rischi e allineamento",
          pulsante: "rischi e allineamento",
          da: "quattro-domande",
          slide: ["allineare-modello", "preoccupati-no"],
        },
        {
          chiave: "esperienze-modello",
          titolo: "Un modello può avere esperienze?",
          pulsante: "un modello può avere esperienze?",
          da: "quattro-domande",
          slide: ["domanda-esperienze", "posizioni-campo"],
        },
      ],
    },
    {
      chiave: "regole",
      num: "5.7",
      nome: "Regole",
      slide: [
        "apertura-regole",
        "cosa-devo-fare",
        "gdpr-cinque-idee",
        "ai-act-pagina",
        "legge-132-2025",
        "patto-aula",
        "parole-regole",
      ],
      approfondimenti: [
        {
          chiave: "norme-vicino",
          titolo: "Le norme da vicino",
          pulsante: "le norme da vicino",
          da: "gdpr-cinque-idee",
          slide: ["gdpr-basi-diritti", "ai-act-rischi-scadenze", "legge-132-cosa-prevede"],
        },
      ],
    },
  ],
};

export default capitolo;

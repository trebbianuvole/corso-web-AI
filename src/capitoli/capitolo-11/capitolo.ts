// Capitolo 11: dati, ordine delle sezioni e delle slide.
// Ogni nome in «slide» è un file .astro in questa cartella (o in una sottocartella).
// Numero e id di ogni slide si ricavano dalla posizione in questo elenco.
import type { Capitolo } from "../../lib/numerazione.mjs";

const capitolo: Capitolo = {
  slug: "capitolo-11",
  numero: 11,
  titolo: "Capitolo 11: verificare, test e qualità",
  descrizione: "Capitolo 11 del corso di uso dell'AI e vibe coding: verificare è il lavoro vero, test con l'AI, la sicurezza del codice generato, privacy e prestazioni, cosa succede dopo il lancio e la checklist prima di pubblicare.",
  home: {
    titolo: "Verificare: test e qualità",
    desc: "Test, sicurezza, privacy e velocità, prima e dopo il lancio.",
  },
  script: [],
  copertina: "copertina-11",
  sezioni: [
    {
      chiave: "verificare",
      num: "11.1",
      nome: "Verificare",
      slide: ["apertura-verificare", "lavoro-vero-verificare", "tre-livelli-test", "controlla-tutto-non-test"],
    },
    {
      chiave: "test-ai",
      num: "11.2",
      nome: "Test con l'AI",
      slide: [
        "apertura-test-ai",
        "test-dai-criteri",
        "claude-scrive-test",
        "claude-prova-browser",
        "secondo-agente-rilegge",
        "prove-con-persone",
      ],
      approfondimenti: [
        {
          chiave: "test-automatici",
          titolo: "Test automatici da vicino",
          pulsante: "Playwright e i test a ogni push",
          da: "claude-scrive-test",
          slide: ["playwright-da-vicino", "test-ogni-push"],
        },
      ],
    },
    {
      chiave: "sicurezza",
      num: "11.3",
      nome: "Sicurezza",
      slide: [
        "apertura-sicurezza-codice",
        "pensare-come-attacca",
        "errori-sicurezza-ai",
        "iniezioni",
        "aggiornare-dipendenze",
        "revisione-sicurezza",
      ],
      approfondimenti: [
        {
          chiave: "owasp",
          titolo: "La OWASP Top 10",
          pulsante: "la OWASP Top 10",
          da: "pensare-come-attacca",
          slide: ["owasp-top-10"],
        },
      ],
    },
    {
      chiave: "privacy",
      num: "11.4",
      nome: "Privacy e velocità",
      slide: ["apertura-privacy-velocita", "cookie-informativa", "servizi-esterni-dati", "velocita-lighthouse"],
    },
    {
      chiave: "dopo-lancio",
      num: "11.5",
      nome: "Dopo il lancio",
      slide: ["apertura-dopo-lancio", "pubblicare-non-finire", "log-produzione", "dal-log-correzione"],
    },
    {
      chiave: "prima-lancio",
      num: "11.6",
      nome: "Prima del lancio",
      slide: ["apertura-prima-lancio", "checklist-pubblicazione", "revisione-incrociata"],
    },
  ],
};

export default capitolo;

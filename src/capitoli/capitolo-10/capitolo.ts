// Capitolo 10: dati, ordine delle sezioni e delle slide.
// Ogni nome in «slide» è un file .astro in questa cartella (o in una sottocartella).
// Numero e id di ogni slide si ricavano dalla posizione in questo elenco.
import type { Capitolo } from "../../lib/numerazione.mjs";

const capitolo: Capitolo = {
  slug: "capitolo-10",
  numero: 10,
  titolo: "Capitolo 10: sviluppare una webapp con l'AI",
  descrizione: "Capitolo 10 del corso di uso dell'AI e vibe coding: dal sito alla webapp con PrenotaAula, i dati, le quattro operazioni, accesso e permessi, i casi limite, le chiavi, un modello AI dentro l'app e i costi.",
  home: {
    titolo: "Sviluppare una webapp",
    desc: "Dati, accessi, chiavi e un modello AI dentro PrenotaAula.",
  },
  script: [],
  copertina: "copertina-10",
  sezioni: [
    {
      chiave: "webapp",
      num: "10.1",
      nome: "Webapp",
      slide: ["apertura-webapp", "cosa-cambia-webapp", "quando-non-serve", "dove-ai-rischia"],
    },
    {
      chiave: "dati",
      num: "10.2",
      nome: "Dati",
      slide: [
        "apertura-progettare-dati",
        "cose-dell-app",
        "tabelle-righe-colonne",
        "chiavi-relazioni",
        "vincoli-dati",
        "schema-claude-md",
        "supabase-passi",
        "backup-dati",
      ],
    },
    {
      chiave: "crud",
      num: "10.3",
      nome: "CRUD",
      slide: ["apertura-crud", "crud-operazioni", "pulsante-database", "attivita-crud"],
    },
    {
      chiave: "accesso",
      num: "10.4",
      nome: "Accesso",
      slide: [
        "apertura-accesso",
        "autenticazione-autorizzazione",
        "ruoli-prenotaula",
        "non-inventare-accesso",
        "permessi-righe",
        "controllo-nel-browser",
      ],
      approfondimenti: [
        {
          chiave: "google",
          titolo: "«Accedi con Google»",
          pulsante: "«Accedi con Google»",
          da: "non-inventare-accesso",
          slide: ["accedi-google"],
        },
      ],
    },
    {
      chiave: "errori",
      num: "10.5",
      nome: "Casi limite",
      slide: ["apertura-errori", "casi-limite-app", "errori-per-persone", "casi-limite-prima"],
    },
    {
      chiave: "chiavi",
      num: "10.6",
      nome: "Chiavi",
      slide: ["apertura-chiavi", "chiavi-pubbliche-segrete", "env-vercel", "backend-senza-server"],
      approfondimenti: [
        {
          chiave: "pagamenti",
          titolo: "I pagamenti online",
          pulsante: "i pagamenti online",
          da: "backend-senza-server",
          slide: ["pagamenti-online"],
        },
      ],
    },
    {
      chiave: "modello",
      num: "10.7",
      nome: "Modello AI",
      slide: [
        "apertura-modello",
        "assistente-cosa-fare",
        "api-come-funziona",
        "strumenti-al-modello",
        "costi-limiti-modello",
        "rischi-assistente",
        "attivita-assistente",
      ],
      approfondimenti: [
        {
          chiave: "risposte",
          titolo: "Risposte strutturate e scelta del modello",
          pulsante: "JSON e scelta del modello",
          da: "strumenti-al-modello",
          slide: ["risposte-strutturate", "modello-per-app"],
        },
      ],
    },
    {
      chiave: "costi",
      num: "10.8",
      nome: "Costi",
      slide: ["apertura-costi", "mappa-costi", "funzione-con-dati"],
    },
  ],
};

export default capitolo;

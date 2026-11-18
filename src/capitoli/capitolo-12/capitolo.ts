// Capitolo 12: dati, ordine delle sezioni e delle slide.
// Ogni nome in «slide» è un file .astro in questa cartella (o in una sottocartella).
// Numero e id di ogni slide si ricavano dalla posizione in questo elenco.
import type { Capitolo } from "../../lib/numerazione.mjs";

const capitolo: Capitolo = {
  slug: "capitolo-12",
  numero: 12,
  titolo: "Capitolo 12: gestire e consegnare il prodotto",
  descrizione: "Capitolo 12 del corso di uso dell'AI e vibe coding: il debito tecnico, la consegna professionale al cliente, lavorare con gli agenti nel tempo, i mestieri del web con l'AI e la chiusura del corso.",
  home: {
    titolo: "Gestire e consegnare",
    desc: "Debito tecnico, consegna al cliente, agenti nel tempo, e la fine del corso.",
  },
  script: [],
  copertina: "copertina-12",
  sezioni: [
    {
      chiave: "debito",
      num: "12.1",
      nome: "Debito tecnico",
      slide: ["apertura-debito", "scorciatoie-oggi", "vibe-coding-debito", "ripagare-debito"],
    },
    {
      chiave: "consegna",
      num: "12.2",
      nome: "Consegna",
      slide: [
        "apertura-consegna",
        "chiavi-del-cliente",
        "cliente-aggiorna",
        "backup-ripristino",
        "documentare-progetto",
        "passaggio-altro-agente",
        "checklist-consegna",
      ],
    },
    {
      chiave: "agenti-tempo",
      num: "12.3",
      nome: "Agenti nel tempo",
      slide: [
        "apertura-agenti-tempo",
        "agenti-background-github",
        "agenti-parallelo",
        "attivita-programmate",
        "restare-al-comando",
      ],
    },
    {
      chiave: "mestieri",
      num: "12.4",
      nome: "Mestieri",
      slide: ["apertura-mestieri", "mestieri-cosa-cambia", "competenze-contano", "continuare-imparare"],
    },
    {
      chiave: "chiusura",
      num: "12.5",
      nome: "Chiusura",
      slide: [
        "apertura-chiusura",
        "portfolio-progetto",
        "presentare-progetto",
        "rubrica-valutazione",
        "presentazioni-finali",
        "retrospettiva",
        "dibattito-conclusivo",
        "fine-corso",
      ],
    },
  ],
};

export default capitolo;

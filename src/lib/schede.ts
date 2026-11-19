// Elenco unico delle pagine di consultazione. Lo usano la home, l'indice
// /schede/ e il layout Scheda.astro (titolo, descrizione, precedente e successiva).
// Per aggiungere una scheda: una riga qui e il file in src/pages/schede/<nome>.astro.

export type TipoScheda = "operativa" | "aggiornabile";

export interface InfoScheda {
  sigla: string;
  /** nome del file e dell'indirizzo: /schede/<nome>/ */
  nome: string;
  titolo: string;
  /** una riga per la home e l'indice */
  breve: string;
  tipo: TipoScheda;
}

export const schede: InfoScheda[] = [
  { sigla: "S.1", nome: "glossario", tipo: "operativa", titolo: "Glossario", breve: "Tutte le parole del corso, con il rimando alla slide che le spiega." },
  { sigla: "S.2", nome: "terminale", tipo: "operativa", titolo: "Comandi del terminale", breve: "I pochi comandi per orientarsi, su Mac, Linux e Windows." },
  { sigla: "S.3", nome: "git", tipo: "operativa", titolo: "Comandi di Git e problemi tipici", breve: "Il giro di tutti i giorni, i rami e cosa fare quando qualcosa va storto." },
  { sigla: "S.4", nome: "prompt", tipo: "operativa", titolo: "Modelli di prompt", breve: "I sei ingredienti e i prompt pronti per i momenti del progetto." },
  { sigla: "S.5", nome: "claude-md", tipo: "operativa", titolo: "CLAUDE.md di partenza", breve: "Due modelli da copiare: il sito con Astro e Keystatic, la webapp con Supabase." },
  { sigla: "S.6", nome: "schema-keystatic", tipo: "operativa", titolo: "Schema Keystatic di partenza", breve: "La configurazione del CMS della trattoria, commentata." },
  { sigla: "S.7", nome: "template-progetto", tipo: "operativa", titolo: "Template: brief, storie utente e criteri, requisiti", breve: "I documenti da compilare prima di chiedere codice all'AI." },
  { sigla: "S.8", nome: "si-puo-incollare", tipo: "operativa", titolo: "Checklist dei dati: «si può incollare?»", breve: "Le domande da farsi prima di dare un dato a un'AI." },
  { sigla: "S.9", nome: "checklist-sicurezza", tipo: "operativa", titolo: "Checklist di sicurezza", breve: "Agenti, chiavi, repository e codice generato." },
  { sigla: "S.10", nome: "checklist-accessibilita", tipo: "operativa", titolo: "Checklist di accessibilità", breve: "I controlli da fare su ogni pagina, a mano e con l'AI." },
  { sigla: "S.11", nome: "checklist-seo", tipo: "operativa", titolo: "Checklist SEO", breve: "Farsi trovare da Google e dalle risposte dell'AI." },
  { sigla: "S.12", nome: "checklist-test", tipo: "operativa", titolo: "Checklist di test", breve: "Dai criteri di accettazione ai test che girano a ogni push." },
  { sigla: "S.13", nome: "checklist-pubblicazione", tipo: "operativa", titolo: "Checklist di pubblicazione", breve: "Cosa controllare prima di mettere online." },
  { sigla: "S.14", nome: "checklist-consegna", tipo: "operativa", titolo: "Checklist di consegna", breve: "Cosa lasciare al cliente quando il lavoro è finito." },
  { sigla: "S.15", nome: "rubrica", tipo: "operativa", titolo: "Rubrica di valutazione", breve: "Gli otto criteri con cui si valuta il progetto finale." },
  { sigla: "U.1", nome: "laboratori-modelli", tipo: "aggiornabile", titolo: "I laboratori e i loro modelli", breve: "Chi costruisce i modelli più usati e con quali prodotti." },
  { sigla: "U.2", nome: "modelli-claude", tipo: "aggiornabile", titolo: "I modelli di Claude", breve: "Le taglie di oggi e come scegliere." },
  { sigla: "U.3", nome: "prodotti-claude", tipo: "aggiornabile", titolo: "I prodotti e gli agenti di Claude", breve: "App, Claude Code, Cowork e gli agenti in background." },
  { sigla: "U.4", nome: "privacy-servizi", tipo: "aggiornabile", titolo: "Le impostazioni sulla privacy", breve: "Dove si spegne l'uso dei dati per l'addestramento." },
  { sigla: "U.5", nome: "strumenti-design", tipo: "aggiornabile", titolo: "Strumenti di design e media con l'AI", breve: "Interfacce, immagini, video e voci con l'AI." },
  { sigla: "U.6", nome: "costi-piani", tipo: "aggiornabile", titolo: "Costi e piani gratuiti", breve: "Quanto costano i servizi dello stack e fin dove arrivano gratis." },
];

export function scheda(sigla: string): InfoScheda {
  const s = schede.find(x => x.sigla === sigla);
  if (!s) throw new Error(`La scheda «${sigla}» non è in src/lib/schede.ts.`);
  return s;
}

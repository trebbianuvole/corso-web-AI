// I corsi di Noema Lab e gli indirizzi che appartengono a ciascuno.
// È JavaScript puro perché lo usano sia le pagine di Astro sia il
// middleware dell'accesso (middleware.ts), che gira su Vercel.

/**
 * @typedef {{
 *   slug: string,
 *   titolo: string,
 *   descrizione: string,
 *   percorsi: RegExp[]
 * }} Corso
 *   slug: indirizzo della pagina del corso (/slug/) e nome usato nell'elenco
 *         degli utenti per dare l'accesso;
 *   percorsi: gli indirizzi del sito che fanno parte del corso.
 */

/** @type {Corso[]} */
export const corsi = [
  {
    slug: "sviluppo-web-ai",
    titolo: "Corso ENGIM: sviluppo web con l'AI",
    descrizione: "Uso dell'intelligenza artificiale e vibe coding: dodici capitoli per progettare e pubblicare un sito, capendo cosa succede dietro le quinte.",
    percorsi: [
      /^\/sviluppo-web-ai(\/|$)/,
      /^\/capitolo-\d+(\/|$)/,
      /^\/lezione-\d+(\/|$)/,
      /^\/schede(\/|$)/,
    ],
  },
];

/**
 * Il corso a cui appartiene un indirizzo, oppure undefined.
 * @param {string} percorso  es. "/capitolo-1/"
 */
export function corsoDi(percorso) {
  return corsi.find(c => c.percorsi.some(r => r.test(percorso)));
}

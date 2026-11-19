// I quiz di fine capitolo: un file src/capitoli/capitolo-N/quiz.ts per capitolo.
// Venti domande a risposta multipla con cinque opzioni. Punteggio: +5 per ogni
// risposta giusta, −1 per ogni sbagliata, 0 per ogni domanda lasciata vuota;
// il massimo è 100, la valutazione è in centesimi.
// La build si ferma se un quiz non rispetta le regole (vedi controlla()).
import { capitoli } from "./capitoli";
import { infoSlide, type InfoSlide } from "./consultazione";
import type { Capitolo } from "./numerazione.mjs";

export interface Domanda {
  /** il testo della domanda; HTML semplice: <code>, <em>, <strong>, <br> */
  domanda: string;
  /** cinque opzioni, nell'ordine in cui compaiono (A–E); stesso HTML semplice */
  opzioni: [string, string, string, string, string];
  /** la posizione dell'opzione giusta: 0 = A, 1 = B … 4 = E */
  giusta: 0 | 1 | 2 | 3 | 4;
  /** perché è giusta e qual era la trappola: una-tre frasi */
  spiegazione: string;
  /** la slide da ripassare: nome del file senza .astro, dello stesso capitolo */
  slide: string;
}

export interface DomandaPronta extends Domanda {
  /** numero, titolo e indirizzo della slide da ripassare */
  rimando: InfoSlide;
}

export const NUMERO_DOMANDE = 20;
export const NUMERO_OPZIONI = 5;
export const PUNTI = { giusta: 5, sbagliata: -1, vuota: 0 } as const;

const file = import.meta.glob<{ default: Domanda[] }>("../capitoli/*/quiz.ts", { eager: true });

// slug del capitolo → domande
const grezzi = new Map<string, Domanda[]>();
for (const [percorso, modulo] of Object.entries(file)) {
  grezzi.set(percorso.split("/").at(-2)!, modulo.default);
}

function pieno(s: unknown): s is string {
  return typeof s === "string" && s.trim() !== "";
}

/** Controlla un quiz e aggiunge a ogni domanda il rimando alla slide. */
function controlla(cap: Capitolo, domande: Domanda[]): DomandaPronta[] {
  const dove = `src/capitoli/${cap.slug}/quiz.ts`;
  if (!Array.isArray(domande) || domande.length !== NUMERO_DOMANDE) {
    throw new Error(`${dove}: le domande devono essere ${NUMERO_DOMANDE}, sono ${Array.isArray(domande) ? domande.length : "assenti"}.`);
  }
  return domande.map((d, i) => {
    const n = `${dove}, domanda ${i + 1}`;
    if (!pieno(d.domanda)) throw new Error(`${n}: manca il testo della domanda.`);
    if (!Array.isArray(d.opzioni) || d.opzioni.length !== NUMERO_OPZIONI || !d.opzioni.every(pieno)) {
      throw new Error(`${n}: servono ${NUMERO_OPZIONI} opzioni, tutte con un testo.`);
    }
    const uniche = new Set(d.opzioni.map(o => o.trim().toLowerCase()));
    if (uniche.size !== NUMERO_OPZIONI) throw new Error(`${n}: due opzioni sono uguali.`);
    if (!Number.isInteger(d.giusta) || d.giusta < 0 || d.giusta >= NUMERO_OPZIONI) {
      throw new Error(`${n}: «giusta» deve essere un numero da 0 (A) a ${NUMERO_OPZIONI - 1} (E).`);
    }
    if (!pieno(d.spiegazione)) throw new Error(`${n}: manca la spiegazione.`);
    let rimando: InfoSlide;
    try {
      rimando = infoSlide(d.slide);
    } catch {
      throw new Error(`${n}: la slide «${d.slide}» non è elencata in nessun capitolo.ts.`);
    }
    if (rimando.capitolo !== cap.slug) {
      throw new Error(`${n}: la slide «${d.slide}» è del ${rimando.capitolo}, non del ${cap.slug}.`);
    }
    return { ...d, rimando };
  });
}

const pronti = new Map<string, DomandaPronta[]>();
for (const [slug, domande] of grezzi) {
  const cap = capitoli.find(c => c.slug === slug);
  if (!cap) throw new Error(`src/capitoli/${slug}/quiz.ts: non esiste un capitolo «${slug}».`);
  pronti.set(slug, controlla(cap, domande));
}

/** Il quiz di un capitolo, oppure undefined se il capitolo non ce l'ha. */
export function quizDel(cap: Capitolo): DomandaPronta[] | undefined {
  return pronti.get(cap.slug);
}

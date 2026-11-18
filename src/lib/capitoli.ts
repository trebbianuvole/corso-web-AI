// Carica i capitoli e le loro slide per le pagine di Astro.
import type { AstroComponentFactory } from "astro/runtime/server/index.js";
import { mappaSlide, numera, rimandi, nonRegistrati, type Capitolo } from "./numerazione.mjs";
import registro from "../indirizzi.json";

// I dati di ogni capitolo: src/capitoli/capitolo-N/capitolo.ts
const dati = import.meta.glob<{ default: Capitolo }>("../capitoli/*/capitolo.ts", { eager: true });
// Le slide: un file .astro per slide, in qualunque sottocartella del capitolo
const file = import.meta.glob<{ default: AstroComponentFactory }>("../capitoli/**/*.astro", { eager: true });

export const capitoli: Capitolo[] = Object.values(dati)
  .map(m => m.default)
  .sort((a, b) => a.numero - b.numero);

// nome della slide (nome del file senza estensione) → componente
const componenti = new Map<string, { Componente: AstroComponentFactory; percorso: string }>();
for (const [percorso, modulo] of Object.entries(file)) {
  const nome = percorso.split("/").pop()!.replace(/\.astro$/, "");
  if (componenti.has(nome)) {
    throw new Error(`Due file di slide si chiamano «${nome}»: ${componenti.get(nome)!.percorso} e ${percorso}. I nomi devono essere unici in tutto il corso.`);
  }
  componenti.set(nome, { Componente: modulo.default, percorso });
}

const mappa = mappaSlide(capitoli);

// In build, ogni id pubblicato deve stare nel registro degli indirizzi
const mancanti = nonRegistrati(registro, mappa);
if (mancanti.length) {
  const elenco = mancanti.map(p => `${p.capitolo}/#${p.id} (${p.nome})`).join(", ");
  const msg = `Indirizzi non registrati: ${elenco}. Eseguite «npm run indirizzi» e fate il commit di src/indirizzi.json.`;
  if (import.meta.env.PROD) throw new Error(msg);
  console.warn(msg);
}

export function slideDel(cap: Capitolo) {
  return numera(cap).map(p => {
    const c = componenti.get(p.nome);
    if (!c) throw new Error(`Il capitolo ${cap.numero} elenca la slide «${p.nome}», ma non esiste nessun file ${p.nome}.astro in src/capitoli/.`);
    return { ...p, Componente: c.Componente };
  });
}

export function rimandiDel(cap: Capitolo) {
  return rimandi(cap.slug, registro, mappa);
}

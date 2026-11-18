// Impronta dei file in public/, da aggiungere agli indirizzi di CSS e JS:
// "assets/js/deck.js" → "assets/js/deck.js?v=3f2a91c0".
// Quando il file cambia, cambia l'indirizzo: così nessun browser può usare
// una copia vecchia rimasta in memoria (Vercel le manda con una cache lunga).
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { join } from "node:path";

const cache = new Map<string, string>();

export function conVersione(percorso: string): string {
  let impronta = cache.get(percorso);
  if (!impronta) {
    const contenuto = readFileSync(join(process.cwd(), "public", percorso));
    impronta = createHash("sha256").update(contenuto).digest("hex").slice(0, 10);
    cache.set(percorso, impronta);
  }
  return `${percorso}?v=${impronta}`;
}

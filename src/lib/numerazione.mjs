// Numerazione delle slide e indirizzi storici.
// È JavaScript puro (senza Astro) perché lo usano sia le pagine
// sia lo script `npm run indirizzi`.

/**
 * @typedef {{ chiave: string, num: string, nome: string, slide: string[] }} Sezione
 * @typedef {{
 *   slug: string, numero: number, titolo: string, descrizione: string,
 *   home: { titolo: string, desc: string },
 *   script: string[], copertina: string, sezioni: Sezione[]
 * }} Capitolo
 * @typedef {{ nome: string, numero: string, id: string, sezione: string, capitolo: string }} Posto
 */

/**
 * Elenco ordinato delle slide di un capitolo, con numero e id
 * ricavati dalla posizione: copertina 2.0 → "2-0",
 * apertura 2.4.0 → "2-4-0", slide 2.4.3 → "2-4-3".
 * @param {Capitolo} cap
 * @returns {Posto[]}
 */
export function numera(cap) {
  const posti = [{ nome: cap.copertina, numero: `${cap.numero}.0`, sezione: "intro" }];
  for (const sez of cap.sezioni) {
    sez.slide.forEach((nome, i) => {
      posti.push({ nome, numero: `${sez.num}.${i}`, sezione: sez.chiave });
    });
  }
  return posti.map(p => ({ ...p, id: p.numero.replace(/\./g, "-"), capitolo: cap.slug }));
}

/**
 * Tutte le slide del corso, indicizzate per nome.
 * Un nome ripetuto blocca la build: i nomi devono essere unici in tutto il corso.
 * @param {Capitolo[]} capitoli
 * @returns {Map<string, Posto>}
 */
export function mappaSlide(capitoli) {
  const mappa = new Map();
  for (const cap of capitoli) {
    for (const p of numera(cap)) {
      if (mappa.has(p.nome)) {
        const altro = mappa.get(p.nome);
        throw new Error(`La slide «${p.nome}» compare due volte (${altro.capitolo} ${altro.numero} e ${p.capitolo} ${p.numero}). Ogni slide va elencata una volta sola.`);
      }
      mappa.set(p.nome, p);
    }
  }
  return mappa;
}

/**
 * Rimandi dagli indirizzi pubblicati in passato a quelli attuali, per una pagina.
 * Il registro (src/indirizzi.json) dice, pagina per pagina, a quale slide
 * apparteneva ogni id pubblicato. Se quella slide oggi ha un altro id, o sta
 * in un altro capitolo, nasce un rimando.
 * @param {string} pagina  es. "capitolo-1"
 * @param {Record<string, Record<string, string>>} registro
 * @param {Map<string, Posto>} mappa
 * @returns {Record<string, string>}  id storico → "#id" oppure "../capitolo-N/#id"
 */
export function rimandi(pagina, registro, mappa) {
  const voci = registro[pagina] || {};
  const attuali = new Set([...mappa.values()].filter(p => p.capitolo === pagina).map(p => p.id));
  /** @type {Record<string, string>} */
  const out = {};
  for (const [vecchio, nome] of Object.entries(voci)) {
    const p = mappa.get(nome);
    if (!p) {
      throw new Error(`L'indirizzo pubblicato ${pagina}/#${vecchio} puntava alla slide «${nome}», che non esiste più. Indicate in src/indirizzi.json una slide che la sostituisca.`);
    }
    if (p.capitolo === pagina && p.id === vecchio) continue; // è ancora l'id vero
    if (p.capitolo === pagina && attuali.has(vecchio)) continue; // ora l'id è di un'altra slide
    out[vecchio] = p.capitolo === pagina ? `#${p.id}` : `../${p.capitolo}/#${p.id}`;
  }
  return out;
}

/**
 * Id attuali che il registro non conosce ancora (o attribuisce a un'altra slide).
 * @param {Record<string, Record<string, string>>} registro
 * @param {Map<string, Posto>} mappa
 */
export function nonRegistrati(registro, mappa) {
  return [...mappa.values()].filter(p => registro[p.capitolo]?.[p.id] !== p.nome);
}

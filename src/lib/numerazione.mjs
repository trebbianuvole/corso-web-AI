// Numerazione delle slide e indirizzi storici.
// È JavaScript puro (senza Astro) perché lo usano sia le pagine
// sia lo script `npm run indirizzi`.

/**
 * Un approfondimento: un gruppo di slide che si apre da una slide della sezione.
 * @typedef {{
 *   chiave: string,
 *   titolo: string,
 *   pulsante: string,
 *   da: string,
 *   slide: string[]
 * }} Approfondimento
 *   chiave: nome della finestra, unico nel capitolo (es. "reti-neurali");
 *   titolo: es. "Le reti neurali da vicino";
 *   pulsante: completa «Approfondisci: …» (es. "le reti neurali");
 *   da: nome della slide da cui si apre, nella stessa sezione.
 * @typedef {{ chiave: string, num: string, nome: string, slide: string[], approfondimenti?: Approfondimento[] }} Sezione
 * @typedef {{
 *   slug: string, numero: number, titolo: string, descrizione: string,
 *   home: { titolo: string, desc: string },
 *   script: string[], copertina: string, sezioni: Sezione[]
 * }} Capitolo
 * @typedef {{ nome: string, numero: string, id: string, sezione: string, capitolo: string, gruppo?: string }} Posto
 * @typedef {Approfondimento & { num: string, sezione: string, idDa: string, posti: Posto[] }} Gruppo
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
 * Gli approfondimenti di un capitolo, con le slide numerate.
 * Dentro una sezione la numerazione prosegue da un gruppo all'altro:
 * 1.1.a1 … 1.1.a8, e un secondo gruppo della 1.1 comincia da 1.1.a9.
 * Id: "1-1-a1".
 * @param {Capitolo} cap
 * @returns {Gruppo[]}
 */
export function approfondimenti(cap) {
  /** @type {Gruppo[]} */
  const gruppi = [];
  const chiavi = new Set();
  for (const sez of cap.sezioni) {
    let n = 0;
    for (const g of sez.approfondimenti || []) {
      if (chiavi.has(g.chiave)) {
        throw new Error(`Nel ${cap.slug} due approfondimenti si chiamano «${g.chiave}».`);
      }
      chiavi.add(g.chiave);
      const pos = sez.slide.indexOf(g.da);
      if (pos < 0) {
        throw new Error(`L'approfondimento «${g.chiave}» si apre da «${g.da}», che non è una slide della sezione ${sez.num}.`);
      }
      const posti = g.slide.map(nome => {
        const numero = `${sez.num}.a${++n}`;
        return { nome, numero, id: numero.replace(/\./g, "-"), sezione: sez.chiave, capitolo: cap.slug, gruppo: g.chiave };
      });
      gruppi.push({ ...g, num: sez.num, sezione: sez.chiave, idDa: `${sez.num}.${pos}`.replace(/\./g, "-"), posti });
    }
  }
  return gruppi;
}

/**
 * Tutte le slide del corso, approfondimenti compresi, indicizzate per nome.
 * Un nome ripetuto blocca la build: i nomi devono essere unici in tutto il corso.
 * @param {Capitolo[]} capitoli
 * @returns {Map<string, Posto>}
 */
export function mappaSlide(capitoli) {
  const mappa = new Map();
  for (const cap of capitoli) {
    const tutte = [...numera(cap), ...approfondimenti(cap).flatMap(g => g.posti)];
    for (const p of tutte) {
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

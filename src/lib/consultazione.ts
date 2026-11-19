// Dati per le pagine di consultazione, ricavati dal sorgente delle slide:
// - il titolo di ogni slide, per i rimandi dalle schede (RimandoSlide);
// - le voci del glossario: i <Def> (salvo glossario={false}) e i <Voce>;
// - le fonti: i link esterni scritti nelle slide.
// Numero e id vengono da numerazione.mjs: se una slide si sposta, i link la seguono.
import { mappaSlide, type Posto } from "./numerazione.mjs";
import { capitoli } from "./capitoli";

// Il sorgente di ogni slide, come testo
const sorgenti = import.meta.glob<string>("../capitoli/**/*.astro", { query: "?raw", import: "default", eager: true });

const sorgentePer = new Map<string, string>();
for (const [percorso, testo] of Object.entries(sorgenti)) {
  sorgentePer.set(percorso.split("/").pop()!.replace(/\.astro$/, ""), testo);
}

const mappa: Map<string, Posto> = mappaSlide(capitoli);

/** Toglie i tag HTML e riduce gli spazi: per testi di link e ordinamenti. */
export function soloTesto(html: string) {
  return html
    .replace(/<[^>]+>/g, "")
    .replace(/&#123;/g, "{").replace(/&#125;/g, "}")
    .replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}

export interface InfoSlide extends Posto {
  titolo: string;
  /** indirizzo relativo alla radice del sito, es. "capitolo-1/#1-4-2" */
  indirizzo: string;
  numeroCapitolo: number;
}

function titoloDi(nome: string, sorgente: string) {
  const m = sorgente.match(/<(?:Slide|Apertura)\b[\s\S]*?\stitolo="([^"]*)"/);
  return m ? soloTesto(m[1]) : nome;
}

/** Tutte le slide del corso, in ordine, con titolo e indirizzo. */
export const tutteLeSlide: InfoSlide[] = [...mappa.values()].map(p => ({
  ...p,
  titolo: titoloDi(p.nome, sorgentePer.get(p.nome) ?? ""),
  indirizzo: `${p.capitolo}/#${p.id}`,
  numeroCapitolo: Number(p.capitolo.replace("capitolo-", "")),
}));

const perNome = new Map(tutteLeSlide.map(s => [s.nome, s]));

/** Una slide dal nome del file; la build si ferma se non esiste. */
export function infoSlide(nome: string): InfoSlide {
  const s = perNome.get(nome);
  if (!s) throw new Error(`Un rimando cita la slide «${nome}», che non è elencata in nessun capitolo.ts.`);
  return s;
}

/** Ordine del corso: capitolo, poi posizione nella mappa (principale, poi approfondimenti). */
const ordine = new Map(tutteLeSlide.map((s, i) => [s.nome, s.numeroCapitolo * 10000 + i]));

// ---------------------------------------------------------------- glossario

export interface VoceGlossario {
  termine: string;
  /** HTML della definizione, dalla prima slide in ordine di corso */
  definizione: string;
  slide: InfoSlide[];
  /** prima lettera, per l'indice */
  lettera: string;
}

const confronto = new Intl.Collator("it", { sensitivity: "base", numeric: true });

/** Il termine senza i segni iniziali: «.env» si ordina sotto la E, «/clear» sotto la C. */
function chiaveOrdine(termine: string) {
  return soloTesto(termine).replace(/^[^\p{L}\p{N}]+/u, "");
}

function lettera(termine: string) {
  const t = chiaveOrdine(termine);
  const c = t.charAt(0).normalize("NFD").replace(/\p{M}/gu, "").toUpperCase();
  return /[A-Z]/.test(c) ? c : "#";
}

function voci(): VoceGlossario[] {
  const trovate = new Map<string, VoceGlossario>();
  const nomi = [...sorgentePer.keys()].filter(n => perNome.has(n)).sort((a, b) => ordine.get(a)! - ordine.get(b)!);
  for (const nome of nomi) {
    const sorgente = sorgentePer.get(nome)!;
    const coppie: [string, string][] = [];
    for (const m of sorgente.matchAll(/<Def\s([^>]*)>([\s\S]*?)<\/Def>/g)) {
      if (/glossario=\{false\}/.test(m[1])) continue;
      const t = m[1].match(/termine="([^"]*)"/);
      if (t) coppie.push([t[1], m[2]]);
    }
    for (const m of sorgente.matchAll(/<Voce\s+termine="([^"]*)"\s*>([\s\S]*?)<\/Voce>/g)) {
      coppie.push([m[1], m[2]]);
    }
    for (const [termine, definizione] of coppie) {
      const chiave = soloTesto(termine).toLowerCase();
      const slide = perNome.get(nome)!;
      const gia = trovate.get(chiave);
      if (gia) {
        if (!gia.slide.includes(slide)) gia.slide.push(slide);
      } else {
        trovate.set(chiave, { termine, definizione: definizione.trim(), slide: [slide], lettera: lettera(termine) });
      }
    }
  }
  return [...trovate.values()].sort((a, b) => confronto.compare(chiaveOrdine(a.termine), chiaveOrdine(b.termine)));
}

export const glossario = voci();

// ---------------------------------------------------------------- fonti

export interface Fonte {
  url: string;
  testo: string;
  sito: string;
}

export interface SlideConFonti {
  slide: InfoSlide;
  fonti: Fonte[];
}

function fontiDi(sorgente: string): Fonte[] {
  const viste = new Set<string>();
  const fonti: Fonte[] = [];
  for (const m of sorgente.matchAll(/<a\s[^>]*href="(https?:\/\/[^"]+)"[^>]*>([\s\S]*?)<\/a>/g)) {
    const url = m[1].replace(/&amp;/g, "&");
    if (viste.has(url)) continue;
    viste.add(url);
    fonti.push({ url, testo: soloTesto(m[2]) || url, sito: new URL(url).hostname.replace(/^www\./, "") });
  }
  return fonti;
}

/** Le fonti capitolo per capitolo, sezione per sezione, nell'ordine del corso. */
export const fontiPerCapitolo = capitoli.map(cap => {
  const sezioni = cap.sezioni.map(sez => {
    const slide = tutteLeSlide
      .filter(s => s.capitolo === cap.slug && s.sezione === sez.chiave)
      .map(s => ({ slide: s, fonti: fontiDi(sorgentePer.get(s.nome) ?? "") }))
      .filter(x => x.fonti.length > 0);
    return { num: sez.num, nome: sez.nome, slide };
  }).filter(s => s.slide.length > 0);
  return { numero: cap.numero, titolo: cap.titolo, slug: cap.slug, sezioni };
});

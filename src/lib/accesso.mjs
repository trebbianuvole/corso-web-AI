// Accesso ai corsi: elenco degli utenti, password, sessioni.
//
// È la logica del middleware di Vercel (middleware.ts): gira prima che Vercel
// mandi una pagina e decide se mandarla o rimandare alla pagina di accesso.
// È JavaScript puro con la crittografia standard del web (Web Crypto), così
// funziona uguale su Vercel, nei test (npm test) e nel server di prova
// (npm run prova-accesso).
//
// Le due variabili d'ambiente, impostate su Vercel:
//   UTENTI            una riga per utente: «nome corsi impronta»
//                     (corsi separati da virgole, * = tutti i corsi e la gestione)
//   SEGRETO_SESSIONI  stringa casuale lunga, firma i cookie delle sessioni

import { corsoDi } from "./corsi.mjs";

export const COOKIE_SESSIONE = "noema_sessione";
/** cookie leggibile dalle pagine, solo per mostrare chi è entrato */
export const COOKIE_CHI = "noema_chi";
/** durata di una sessione, in secondi: 30 giorni */
export const DURATA_SESSIONE = 30 * 24 * 60 * 60;
/** ripetizioni di PBKDF2-HMAC-SHA256: il valore raccomandato da OWASP */
export const ITERAZIONI = 600_000;
/** pausa dopo una password sbagliata, in millisecondi */
const PAUSA_ERRORE = 600;

const RE_NOME = /^[a-z0-9._-]{1,64}$/;
const RE_CORSO = /^(\*|[a-z0-9-]{1,64})$/;
const RE_IMPRONTA = /^pbkdf2-sha256\$(\d{4,8})\$([A-Za-z0-9_-]{16,64})\$([A-Za-z0-9_-]{43})$/;
// Usata quando il nome non esiste: il calcolo dura come per un nome vero,
// così dai tempi di risposta non si capisce quali nomi esistono.
const IMPRONTA_FINTA = `pbkdf2-sha256$${ITERAZIONI}$${"A".repeat(22)}$${"A".repeat(43)}`;

const testo = new TextEncoder();

/**
 * @typedef {{ nome: string, corsi: string[], impronta: string }} Utente
 * @typedef {{ utenti: Map<string, Utente>, segreto: string, errore: string }} Configurazione
 */

// ---------- Base64url ----------

/** @param {Uint8Array} byte */
export function inBase64url(byte) {
  let s = "";
  for (const b of byte) s += String.fromCharCode(b);
  return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

/** @param {string} t */
export function daBase64url(t) {
  const s = atob(t.replace(/-/g, "+").replace(/_/g, "/") + "===".slice((t.length + 3) % 4));
  return Uint8Array.from(s, c => c.charCodeAt(0));
}

// ---------- Password e impronte ----------

/**
 * @param {string} password
 * @param {Uint8Array} sale
 * @param {number} iterazioni
 */
async function pbkdf2(password, sale, iterazioni) {
  const chiave = await crypto.subtle.importKey("raw", testo.encode(password), "PBKDF2", false, ["deriveBits"]);
  const bit = await crypto.subtle.deriveBits({ name: "PBKDF2", hash: "SHA-256", salt: sale, iterations: iterazioni }, chiave, 256);
  return new Uint8Array(bit);
}

/**
 * L'impronta di una password, con un sale casuale:
 * «pbkdf2-sha256$600000$<sale>$<impronta>».
 * La pagina /gestione/utenti/ fa lo stesso calcolo nel browser.
 * @param {string} password
 */
export async function creaImpronta(password, iterazioni = ITERAZIONI) {
  const sale = crypto.getRandomValues(new Uint8Array(16));
  const impronta = await pbkdf2(password, sale, iterazioni);
  return `pbkdf2-sha256$${iterazioni}$${inBase64url(sale)}$${inBase64url(impronta)}`;
}

/** Confronto che dura sempre uguale, qualunque sia il primo byte diverso. */
function uguali(/** @type {Uint8Array} */ a, /** @type {Uint8Array} */ b) {
  if (a.length !== b.length) return false;
  let diversi = 0;
  for (let i = 0; i < a.length; i++) diversi |= a[i] ^ b[i];
  return diversi === 0;
}

/**
 * @param {string} password
 * @param {string} impronta
 */
export async function verificaPassword(password, impronta) {
  const m = RE_IMPRONTA.exec(impronta);
  if (!m || !password) return false;
  const calcolata = await pbkdf2(password, daBase64url(m[2]), Number(m[1]));
  return uguali(calcolata, daBase64url(m[3]));
}

// ---------- Elenco degli utenti ----------

/**
 * Legge la variabile UTENTI. Righe vuote e righe che cominciano con # sono
 * ignorate; le righe non valide vengono scartate. Le righe si possono
 * separare anche con «;». Se un nome compare due volte vale l'ultima riga.
 * @param {string} elenco
 */
export function leggiUtenti(elenco = "") {
  /** @type {Map<string, Utente>} */
  const utenti = new Map();
  /** @type {number[]} */
  const scartate = [];
  elenco.split(/\r?\n|;/).forEach((grezza, i) => {
    const riga = grezza.trim();
    if (!riga || riga.startsWith("#")) return;
    const parti = riga.split(/\s+/);
    const nome = (parti[0] || "").toLowerCase();
    const corsi = (parti[1] || "").split(",").filter(Boolean);
    if (parti.length !== 3 || !RE_NOME.test(nome) || !corsi.length || !corsi.every(c => RE_CORSO.test(c)) || !RE_IMPRONTA.test(parti[2])) {
      scartate.push(i + 1);
      return;
    }
    utenti.set(nome, { nome, corsi, impronta: parti[2] });
  });
  return { utenti, scartate };
}

let ultimoElenco = { testo: /** @type {string | null} */ (null), utenti: /** @type {Map<string, Utente>} */ (new Map()) };

/** @param {string} elenco */
function utentiDa(elenco) {
  if (ultimoElenco.testo !== elenco) {
    const { utenti, scartate } = leggiUtenti(elenco);
    if (scartate.length) console.warn(`UTENTI: ignorate le righe ${scartate.join(", ")}, perché non sono nel formato «nome corsi impronta».`);
    ultimoElenco = { testo: elenco, utenti };
  }
  return ultimoElenco.utenti;
}

/**
 * @param {Record<string, string | undefined>} env
 * @returns {Configurazione}
 */
export function leggiConfigurazione(env) {
  const utenti = utentiDa(env.UTENTI || "");
  const segreto = (env.SEGRETO_SESSIONI || "").trim();
  let errore = "";
  if (!utenti.size) errore = "la variabile UTENTI è vuota o non ha righe valide";
  else if (segreto.length < 32) errore = "la variabile SEGRETO_SESSIONI manca o ha meno di 32 caratteri";
  return { utenti, segreto, errore };
}

/** @param {Utente} utente */
export const amministratore = utente => utente.corsi.includes("*");

/** @param {Utente} utente @param {string} corso */
export const vedeCorso = (utente, corso) => amministratore(utente) || utente.corsi.includes(corso);

// ---------- Sessioni ----------

/** @param {string} segreto */
function chiaveFirma(segreto) {
  return crypto.subtle.importKey("raw", testo.encode(segreto), { name: "HMAC", hash: "SHA-256" }, false, ["sign", "verify"]);
}

// La firma comprende l'impronta della password: se la password cambia,
// o l'utente sparisce dall'elenco, la sessione smette di valere.
/** @param {Utente} utente @param {number} scadenza */
const daFirmare = (utente, scadenza) => testo.encode(`${utente.nome}\n${scadenza}\n${utente.impronta}`);

/**
 * Il valore del cookie di sessione: «nome~scadenza~firma».
 * @param {Utente} utente
 * @param {string} segreto
 */
export async function creaSessione(utente, segreto, adesso = Date.now()) {
  const scadenza = Math.floor(adesso / 1000) + DURATA_SESSIONE;
  const firma = await crypto.subtle.sign("HMAC", await chiaveFirma(segreto), daFirmare(utente, scadenza));
  return `${utente.nome}~${scadenza}~${inBase64url(new Uint8Array(firma))}`;
}

/**
 * L'utente della sessione, oppure null se il cookie manca, è scaduto o non è valido.
 * @param {string} valore
 * @param {Configurazione} config
 * @returns {Promise<Utente | null>}
 */
export async function leggiSessione(valore, config, adesso = Date.now()) {
  const parti = (valore || "").split("~");
  if (parti.length !== 3) return null;
  const [nome, s, f] = parti;
  const scadenza = Number(s);
  if (!Number.isInteger(scadenza) || scadenza * 1000 <= adesso) return null;
  const utente = config.utenti.get(nome);
  if (!utente) return null;
  let firma;
  try { firma = daBase64url(f); } catch { return null; }
  const valida = await crypto.subtle.verify("HMAC", await chiaveFirma(config.segreto), firma, daFirmare(utente, scadenza));
  return valida ? utente : null;
}

// ---------- Indirizzi ----------

/**
 * Il percorso della richiesta, decodificato e senza «..», per non farsi
 * ingannare da indirizzi scritti in modo strano (/capitol%6F-1/, /accedi/../capitolo-1/).
 * @param {URL} url
 */
export function percorsoDi(url) {
  let p = url.pathname;
  try { p = decodeURIComponent(p); } catch { /* resta com'è */ }
  try { p = new URL(p.replace(/^[/\\]+/, "/"), "https://x.invalid").pathname; } catch { /* resta com'è */ }
  return p;
}

const PUBBLICI = [/^\/$/, /^\/index\.html$/, /^\/assets\//, /^\/_astro\//, /^\/favicon\.(svg|ico)$/, /^\/robots\.txt$/];

/**
 * Che tipo di pagina è.
 * @param {string} percorso
 * @returns {{ tipo: "pubblico" | "accedi" | "esci" | "gestione" | "riservato" } | { tipo: "corso", corso: string }}
 */
export function classifica(percorso) {
  if (PUBBLICI.some(r => r.test(percorso))) return { tipo: "pubblico" };
  if (/^\/accedi(\/|$)/.test(percorso)) return { tipo: "accedi" };
  if (/^\/esci(\/|$)/.test(percorso)) return { tipo: "esci" };
  if (/^\/gestione(\/|$)/.test(percorso)) return { tipo: "gestione" };
  const corso = corsoDi(percorso);
  if (corso) return { tipo: "corso", corso: corso.slug };
  // Tutto il resto, comprese le pagine che non esistono: serve l'accesso.
  return { tipo: "riservato" };
}

/**
 * Dove andare dopo l'accesso: solo indirizzi di questo sito.
 * @param {string} da
 */
export function destinazioneSicura(da) {
  if (typeof da !== "string" || !da.startsWith("/") || da.length > 2000) return "";
  if (/^\/[/\\]/.test(da) || /[\u0000-\u001f\u007f\\]/.test(da)) return "";
  let url;
  try { url = new URL(da, "https://x.invalid"); } catch { return ""; }
  if (url.origin !== "https://x.invalid") return "";
  if (/^\/(accedi|esci)(\/|$)/.test(url.pathname)) return "";
  return da;
}

/** @param {Utente} utente */
function paginaIniziale(utente) {
  return !amministratore(utente) && utente.corsi.length === 1 ? `/${utente.corsi[0]}/` : "/";
}

// ---------- Risposte ----------

/**
 * @param {string} nome @param {string} valore @param {number} durata
 */
function cookie(nome, valore, durata, soloServer = true) {
  return `${nome}=${valore}; Path=/; Max-Age=${durata}; Secure; SameSite=Lax${soloServer ? "; HttpOnly" : ""}`;
}

/**
 * @param {Request} richiesta @param {string} nome
 */
function leggiCookie(richiesta, nome) {
  for (const parte of (richiesta.headers.get("cookie") || "").split(";")) {
    const i = parte.indexOf("=");
    if (i > 0 && parte.slice(0, i).trim() === nome) return parte.slice(i + 1).trim();
  }
  return "";
}

/**
 * @param {string} indirizzo @param {string[]} cookies
 */
function vaiA(indirizzo, cookies = []) {
  const intestazioni = new Headers({ Location: indirizzo, "Cache-Control": "no-store" });
  for (const c of cookies) intestazioni.append("Set-Cookie", c);
  return new Response(null, { status: 303, headers: intestazioni });
}

const pausa = (/** @type {number} */ ms) => new Promise(r => setTimeout(r, ms));

/**
 * Il modulo della pagina /accedi/ arriva qui.
 * @param {Request} richiesta @param {URL} url @param {Configurazione} config @param {number} adesso
 */
async function accedi(richiesta, url, config, adesso) {
  // Solo moduli inviati da questo sito
  const origine = richiesta.headers.get("origin");
  if (origine) {
    let host = "";
    try { host = new URL(origine).host; } catch { /* host resta vuoto */ }
    if (host !== url.host && host !== richiesta.headers.get("host")) return vaiA("/accedi/?errore=richiesta");
  }
  if (config.errore) {
    console.error(`Accesso non configurato: ${config.errore}.`);
    return vaiA("/accedi/?errore=configurazione");
  }
  let dati;
  try { dati = await richiesta.formData(); } catch { return vaiA("/accedi/?errore=richiesta"); }
  const nome = String(dati.get("nome") || "").trim().toLowerCase();
  const password = String(dati.get("password") || "");
  const da = destinazioneSicura(String(dati.get("da") || ""));

  const utente = config.utenti.get(nome);
  const giusta = await verificaPassword(password, utente ? utente.impronta : IMPRONTA_FINTA);
  if (!utente || !giusta) {
    await pausa(PAUSA_ERRORE);
    return vaiA(`/accedi/?errore=credenziali${da ? `&da=${encodeURIComponent(da)}` : ""}`);
  }
  const sessione = await creaSessione(utente, config.segreto, adesso);
  const chi = encodeURIComponent(`${utente.nome}${amministratore(utente) ? "|admin" : ""}`);
  return vaiA(da || paginaIniziale(utente), [
    cookie(COOKIE_SESSIONE, sessione, DURATA_SESSIONE),
    cookie(COOKIE_CHI, chi, DURATA_SESSIONE, false),
  ]);
}

function esci() {
  return vaiA("/accedi/?uscito=1", [cookie(COOKIE_SESSIONE, "", 0), cookie(COOKIE_CHI, "", 0, false)]);
}

/**
 * Il middleware: undefined lascia passare la richiesta (Vercel manda la
 * pagina), una Response la sostituisce (di solito un rimando a /accedi/).
 * @param {Request} richiesta
 * @param {Record<string, string | undefined>} env  le variabili d'ambiente
 * @returns {Promise<Response | undefined>}
 */
export async function gestisci(richiesta, env = {}, adesso = Date.now()) {
  const url = new URL(richiesta.url);
  const zona = classifica(percorsoDi(url));

  if (zona.tipo === "pubblico") return;
  if (zona.tipo === "esci") return esci();

  const config = leggiConfigurazione(env);
  if (zona.tipo === "accedi") {
    return richiesta.method === "POST" ? accedi(richiesta, url, config, adesso) : undefined;
  }
  // Primo avvio: finché non c'è nessun utente, la pagina che genera
  // le righe dell'elenco è aperta (lavora solo nel browser e non mostra dati).
  if (zona.tipo === "gestione" && !config.utenti.size) return;

  if (config.errore) {
    console.error(`Accesso non configurato: ${config.errore}.`);
    return vaiA("/accedi/?errore=configurazione");
  }
  const utente = await leggiSessione(leggiCookie(richiesta, COOKIE_SESSIONE), config, adesso);
  const da = encodeURIComponent(url.pathname + url.search);
  if (!utente) return vaiA(`/accedi/?da=${da}`);

  const permesso =
    zona.tipo === "gestione" ? amministratore(utente) :
    zona.tipo === "corso" ? vedeCorso(utente, zona.corso) :
    true;
  if (!permesso) return vaiA(`/accedi/?errore=permesso&da=${da}`);
}

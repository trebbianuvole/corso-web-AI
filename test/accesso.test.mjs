// Test dell'accesso ai corsi (src/lib/accesso.mjs): npm test
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  gestisci, leggiUtenti, creaImpronta, verificaPassword, creaSessione,
  leggiConfigurazione, destinazioneSicura, classifica, percorsoDi,
  COOKIE_SESSIONE, COOKIE_CHI, DURATA_SESSIONE,
} from "../src/lib/accesso.mjs";

// Poche iterazioni: i test devono essere veloci (sul sito sono 600.000)
const IT = 1000;
const SEGRETO = "un-segreto-di-prova-lungo-almeno-trentadue-caratteri";
const SITO = "https://noema.example";

const impronte = {
  admin: await creaImpronta("pass-admin", IT),
  mario: await creaImpronta("pass-mario", IT),
  lucia: await creaImpronta("pass-lucia", IT),
};
const UTENTI = [
  "# Account di prova",
  `admin * ${impronte.admin}`,
  `mario.rossi sviluppo-web-ai ${impronte.mario}`,
  `lucia altro-corso ${impronte.lucia}`,
].join("\n");
const ENV = { UTENTI, SEGRETO_SESSIONI: SEGRETO };

function richiesta(percorso, { metodo = "GET", cookie, corpo, origine } = {}) {
  const headers = new Headers({ host: "noema.example" });
  if (cookie) headers.set("cookie", cookie);
  if (origine) headers.set("origin", origine);
  if (corpo) headers.set("content-type", "application/x-www-form-urlencoded");
  return new Request(SITO + percorso, { method: metodo, headers, body: corpo ? new URLSearchParams(corpo).toString() : undefined });
}

async function accedi(nome, password, da = "", env = ENV) {
  return gestisci(richiesta("/accedi/", { metodo: "POST", corpo: { nome, password, da }, origine: SITO }), env);
}

/** il cookie di sessione da una risposta di accesso riuscito */
function sessioneDa(risposta) {
  const c = risposta.headers.getSetCookie().find(c => c.startsWith(`${COOKIE_SESSIONE}=`));
  return c.split(";")[0];
}

test("elenco degli utenti: commenti, righe non valide, «;» e nomi ripetuti", async () => {
  const altra = await creaImpronta("nuova", IT);
  const { utenti, scartate } = leggiUtenti([
    "# commento",
    "",
    `Admin * ${impronte.admin}`,
    "riga sbagliata",
    `mario.rossi sviluppo-web-ai,altro ${impronte.mario}; anna sviluppo-web-ai ${impronte.lucia}`,
    `mario.rossi sviluppo-web-ai ${altra}`,
    `nome con spazi * ${impronte.admin}`,
    `ok Corso-Maiuscolo ${impronte.admin}`,
  ].join("\n"));
  assert.deepEqual([...utenti.keys()], ["admin", "mario.rossi", "anna"]);
  assert.equal(utenti.get("mario.rossi").impronta, altra, "vale l'ultima riga");
  assert.deepEqual(utenti.get("mario.rossi").corsi, ["sviluppo-web-ai"]);
  assert.deepEqual(scartate, [4, 8, 9]);
});

test("impronte: la password giusta passa, quella sbagliata no", async () => {
  assert.equal(await verificaPassword("pass-mario", impronte.mario), true);
  assert.equal(await verificaPassword("pass-Mario", impronte.mario), false);
  assert.equal(await verificaPassword("", impronte.mario), false);
  assert.equal(await verificaPassword("pass-mario", "pbkdf2-sha256$1000$rotta"), false);
  assert.notEqual(await creaImpronta("x", IT), await creaImpronta("x", IT), "il sale cambia ogni volta");
});

test("configurazione mancante o incompleta", () => {
  assert.match(leggiConfigurazione({}).errore, /UTENTI/);
  assert.match(leggiConfigurazione({ UTENTI }).errore, /SEGRETO_SESSIONI/);
  assert.match(leggiConfigurazione({ UTENTI, SEGRETO_SESSIONI: "corto" }).errore, /SEGRETO_SESSIONI/);
  assert.equal(leggiConfigurazione(ENV).errore, "");
});

test("classificazione degli indirizzi", () => {
  const tipo = p => classifica(p).tipo;
  assert.equal(tipo("/"), "pubblico");
  assert.equal(tipo("/assets/css/style.css"), "pubblico");
  assert.equal(tipo("/accedi/"), "accedi");
  assert.equal(tipo("/esci/"), "esci");
  assert.equal(tipo("/gestione/utenti/"), "gestione");
  assert.deepEqual(classifica("/capitolo-12/"), { tipo: "corso", corso: "sviluppo-web-ai" });
  assert.deepEqual(classifica("/sviluppo-web-ai"), { tipo: "corso", corso: "sviluppo-web-ai" });
  assert.deepEqual(classifica("/lezione-1/"), { tipo: "corso", corso: "sviluppo-web-ai" });
  assert.deepEqual(classifica("/schede/modelli-claude/"), { tipo: "corso", corso: "sviluppo-web-ai" });
  assert.equal(tipo("/pagina-che-non-esiste"), "riservato");
  assert.equal(tipo("/capitolone/"), "riservato");
});

test("indirizzi scritti in modo strano vengono riconosciuti", () => {
  const p = s => percorsoDi(new URL(SITO + s));
  assert.equal(p("/capitol%6F-1/"), "/capitolo-1/");
  assert.equal(p("/accedi/../capitolo-1/"), "/capitolo-1/");
  assert.equal(p("/accedi/%2E%2E/capitolo-1/"), "/capitolo-1/");
  assert.equal(p("/accedi%2F..%2Fcapitolo-1/"), "/capitolo-1/");
  assert.equal(p("//capitolo-1/"), "/capitolo-1/");
});

test("destinazioni dopo l'accesso: solo pagine di questo sito", () => {
  assert.equal(destinazioneSicura("/capitolo-1/#1-1-a3"), "/capitolo-1/#1-1-a3");
  assert.equal(destinazioneSicura("//esempio.com/"), "");
  assert.equal(destinazioneSicura("/\\esempio.com/"), "");
  assert.equal(destinazioneSicura("https://esempio.com/"), "");
  assert.equal(destinazioneSicura("javascript:alert(1)"), "");
  assert.equal(destinazioneSicura("/accedi/"), "");
  assert.equal(destinazioneSicura("/esci"), "");
});

test("pagine pubbliche e pagina di accesso passano", async () => {
  assert.equal(await gestisci(richiesta("/"), ENV), undefined);
  assert.equal(await gestisci(richiesta("/accedi/"), ENV), undefined);
  assert.equal(await gestisci(richiesta("/accedi/?errore=credenziali"), {}), undefined);
});

test("senza accesso si finisce su /accedi/, ricordando la pagina", async () => {
  const r = await gestisci(richiesta("/capitolo-1/?x=1"), ENV);
  assert.equal(r.status, 303);
  assert.equal(r.headers.get("location"), "/accedi/?da=%2Fcapitolo-1%2F%3Fx%3D1");
  assert.equal((await gestisci(richiesta("/sviluppo-web-ai/"), ENV)).status, 303);
  assert.equal((await gestisci(richiesta("/capitol%6F-1/"), ENV)).status, 303);
  assert.equal((await gestisci(richiesta("/qualsiasi-altra/"), ENV)).status, 303);
});

test("variabili mancanti: non entra nessuno", async () => {
  const r = await gestisci(richiesta("/capitolo-1/"), {});
  assert.equal(r.headers.get("location"), "/accedi/?errore=configurazione");
  const r2 = await accedi("admin", "pass-admin", "", { UTENTI });
  assert.equal(r2.headers.get("location"), "/accedi/?errore=configurazione");
  assert.equal(r2.headers.getSetCookie().length, 0);
});

test("primo avvio: senza utenti la pagina di gestione è aperta, poi no", async () => {
  assert.equal(await gestisci(richiesta("/gestione/utenti/"), {}), undefined);
  assert.equal(await gestisci(richiesta("/gestione/utenti/"), { SEGRETO_SESSIONI: SEGRETO }), undefined);
  assert.equal((await gestisci(richiesta("/gestione/utenti/"), ENV)).status, 303);
});

test("password sbagliata o nome inesistente: niente sessione", async () => {
  for (const [nome, password] of [["mario.rossi", "sbagliata"], ["nessuno", "pass-mario"], ["mario.rossi", ""]]) {
    const r = await accedi(nome, password, "/capitolo-1/#1-1-3");
    assert.equal(r.headers.get("location"), "/accedi/?errore=credenziali&da=%2Fcapitolo-1%2F%231-1-3");
    assert.equal(r.headers.getSetCookie().length, 0);
  }
});

test("accesso riuscito: cookie e ritorno alla slide di partenza", async () => {
  const r = await accedi("Mario.Rossi ", "pass-mario", "/capitolo-1/#1-1-a3");
  assert.equal(r.status, 303);
  assert.equal(r.headers.get("location"), "/capitolo-1/#1-1-a3");
  const [sessione, chi] = r.headers.getSetCookie();
  assert.match(sessione, new RegExp(`^${COOKIE_SESSIONE}=mario\\.rossi~\\d+~[\\w-]+; Path=/; Max-Age=${DURATA_SESSIONE}; Secure; SameSite=Lax; HttpOnly$`));
  assert.match(chi, new RegExp(`^${COOKIE_CHI}=mario\\.rossi; .*SameSite=Lax$`));
});

test("dopo l'accesso, senza destinazione: la pagina del corso o la home", async () => {
  assert.equal((await accedi("mario.rossi", "pass-mario")).headers.get("location"), "/sviluppo-web-ai/");
  assert.equal((await accedi("admin", "pass-admin")).headers.get("location"), "/");
  assert.equal((await accedi("admin", "pass-admin", "//esempio.com")).headers.get("location"), "/");
});

test("con la sessione si vedono i propri corsi, e solo quelli", async () => {
  const mario = sessioneDa(await accedi("mario.rossi", "pass-mario"));
  const lucia = sessioneDa(await accedi("lucia", "pass-lucia"));
  const admin = sessioneDa(await accedi("admin", "pass-admin"));

  assert.equal(await gestisci(richiesta("/capitolo-3/", { cookie: mario }), ENV), undefined);
  assert.equal(await gestisci(richiesta("/schede/modelli-claude/", { cookie: `altro=1; ${mario}` }), ENV), undefined);
  assert.equal(await gestisci(richiesta("/pagina-che-non-esiste", { cookie: mario }), ENV), undefined);

  const negato = await gestisci(richiesta("/capitolo-3/", { cookie: lucia }), ENV);
  assert.equal(negato.headers.get("location"), "/accedi/?errore=permesso&da=%2Fcapitolo-3%2F");
  assert.equal((await gestisci(richiesta("/capitol%6F-3/", { cookie: lucia }), ENV)).status, 303);

  assert.equal((await gestisci(richiesta("/gestione/utenti/", { cookie: mario }), ENV)).status, 303);
  assert.equal(await gestisci(richiesta("/gestione/utenti/", { cookie: admin }), ENV), undefined);
  assert.equal(await gestisci(richiesta("/capitolo-3/", { cookie: admin }), ENV), undefined);
});

test("sessioni false, scadute o di utenti cambiati non valgono", async () => {
  const mario = sessioneDa(await accedi("mario.rossi", "pass-mario"));
  const valore = mario.split("=")[1];
  const [nome, scadenza, firma] = valore.split("~");
  const prova = async (cookie, env = ENV) => (await gestisci(richiesta("/capitolo-1/", { cookie }), env))?.status;

  assert.equal(await prova(`${COOKIE_SESSIONE}=admin~${scadenza}~${firma}`), 303, "nome cambiato");
  assert.equal(await prova(`${COOKIE_SESSIONE}=${nome}~${Number(scadenza) + 999}~${firma}`), 303, "scadenza cambiata");
  assert.equal(await prova(`${COOKIE_SESSIONE}=${nome}~${scadenza}~AAAA${firma.slice(4)}`), 303, "firma cambiata");
  assert.equal(await prova(`${COOKIE_SESSIONE}=spazzatura`), 303);

  const utente = leggiConfigurazione(ENV).utenti.get("mario.rossi");
  const vecchia = await creaSessione(utente, SEGRETO, Date.now() - (DURATA_SESSIONE + 10) * 1000);
  assert.equal(await prova(`${COOKIE_SESSIONE}=${vecchia}`), 303, "scaduta");

  const nuovaPassword = await creaImpronta("altra", IT);
  assert.equal(await prova(mario, { ...ENV, UTENTI: UTENTI.replace(impronte.mario, nuovaPassword) }), 303, "password cambiata");
  assert.equal(await prova(mario, { ...ENV, UTENTI: UTENTI.split("\n").filter(r => !r.startsWith("mario")).join("\n") }), 303, "utente tolto");
  assert.equal(await prova(mario, { ...ENV, SEGRETO_SESSIONI: SEGRETO + "-nuovo" }), 303, "segreto cambiato");
  assert.equal(await prova(mario), undefined, "la sessione originale vale ancora");
});

test("modulo inviato da un altro sito: rifiutato", async () => {
  const r = await gestisci(richiesta("/accedi/", { metodo: "POST", corpo: { nome: "admin", password: "pass-admin" }, origine: "https://altro.example" }), ENV);
  assert.equal(r.headers.get("location"), "/accedi/?errore=richiesta");
  assert.equal(r.headers.getSetCookie().length, 0);
});

test("uscire cancella i cookie", async () => {
  for (const metodo of ["GET", "POST"]) {
    const r = await gestisci(richiesta("/esci/", { metodo }), ENV);
    assert.equal(r.headers.get("location"), "/accedi/?uscito=1");
    const cookies = r.headers.getSetCookie();
    assert.equal(cookies.length, 2);
    assert.ok(cookies.every(c => c.includes("Max-Age=0")));
  }
});

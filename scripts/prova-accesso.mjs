// Prova in locale l'accesso ai corsi, come su Vercel:
// serve il sito già costruito (dist/) e passa ogni richiesta dal middleware.
//
//   npm run build
//   npm run prova-accesso        → http://localhost:4322
//
// Le variabili UTENTI e SEGRETO_SESSIONI si leggono da .env.local
// (che non va nel repository), per esempio:
//   UTENTI="admin * pbkdf2-sha256$600000$…"
//   SEGRETO_SESSIONI="una-stringa-casuale-di-almeno-32-caratteri"
// Le righe di UTENTI si generano dalla pagina /gestione/utenti/.
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { join, extname, normalize } from "node:path";
import { gestisci } from "../src/lib/accesso.mjs";

const DIST = join(process.cwd(), "dist");
const PORTA = Number(process.env.PORTA) || 4322;
const TIPI = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".txt": "text/plain; charset=utf-8",
};

/** Il file di dist/ per un indirizzo, oppure null */
async function fileDi(percorso) {
  let p = join(DIST, normalize(decodeURIComponent(percorso)).replace(/^([/\\])+/, ""));
  if (!p.startsWith(DIST)) return null;
  try {
    if ((await stat(p)).isDirectory()) p = join(p, "index.html");
    return { contenuto: await readFile(p), tipo: TIPI[extname(p)] || "application/octet-stream" };
  } catch {
    return null;
  }
}

function leggiCorpo(req) {
  return new Promise((ok, ko) => {
    const pezzi = [];
    req.on("data", p => pezzi.push(p));
    req.on("end", () => ok(Buffer.concat(pezzi)));
    req.on("error", ko);
  });
}

createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);

    // Come il matcher di middleware.ts: tutto tranne /assets/
    if (!url.pathname.startsWith("/assets/")) {
      const intestazioni = new Headers();
      for (const [k, v] of Object.entries(req.headers)) if (v !== undefined) intestazioni.set(k, Array.isArray(v) ? v.join(", ") : v);
      const corpo = req.method === "GET" || req.method === "HEAD" ? undefined : await leggiCorpo(req);
      const risposta = await gestisci(new Request(url, { method: req.method, headers: intestazioni, body: corpo }), process.env);
      if (risposta) {
        const h = Object.fromEntries(risposta.headers);
        delete h["set-cookie"];
        const cookies = risposta.headers.getSetCookie();
        if (cookies.length) h["set-cookie"] = cookies;
        res.writeHead(risposta.status, h);
        res.end(Buffer.from(await risposta.arrayBuffer()));
        return;
      }
    }

    const file = await fileDi(url.pathname);
    if (!file) {
      res.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
      res.end("Pagina non trovata");
      return;
    }
    res.writeHead(200, { "content-type": file.tipo, "cache-control": "no-cache" });
    res.end(req.method === "HEAD" ? undefined : file.contenuto);
  } catch (e) {
    console.error(e);
    res.writeHead(500);
    res.end("Errore del server di prova");
  }
}).listen(PORTA, () => {
  console.log(`Sito con l'accesso: http://localhost:${PORTA}`);
  if (!process.env.UTENTI) console.log("UTENTI è vuota: i corsi sono chiusi; la pagina /gestione/utenti/ è aperta per creare il primo account.");
});

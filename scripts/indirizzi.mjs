// npm run indirizzi
// Aggiunge a src/indirizzi.json gli id attuali delle slide, così
// restano validi anche quando una slide cambia posto o capitolo.
// Da eseguire dopo aver aggiunto o spostato slide, prima del commit.
import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import { mappaSlide, nonRegistrati } from "../src/lib/numerazione.mjs";

const radice = new URL("../src/", import.meta.url);
const fileRegistro = new URL("indirizzi.json", radice);
const registro = JSON.parse(readFileSync(fileRegistro, "utf8"));

const capitoli = [];
for (const dir of readdirSync(new URL("capitoli/", radice))) {
  const f = new URL(`capitoli/${dir}/capitolo.ts`, radice);
  if (existsSync(f)) capitoli.push((await import(f.href)).default);
}

const mappa = mappaSlide(capitoli);
const nuovi = nonRegistrati(registro, mappa);
for (const p of nuovi) {
  (registro[p.capitolo] ??= {})[p.id] = p.nome;
}
writeFileSync(fileRegistro, JSON.stringify(registro, null, 2) + "\n");
console.log(nuovi.length ? `Registrati ${nuovi.length} indirizzi.` : "Nessun indirizzo nuovo.");

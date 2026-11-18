// Configurazione di Astro per il sito del corso.
// Il sito è completamente statico: nessun adattatore, nessun server.
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://corso-web-ai.vercel.app",
  output: "static",
  // Dalla versione 7 Astro applica di default le regole JSX sugli spazi
  // e può unire parole separate da elementi in linea: li lasciamo come sono.
  compressHTML: false,
  build: {
    // capitolo-1/index.html, come prima della migrazione
    format: "directory",
  },
  // Niente barra degli strumenti di sviluppo sopra le slide
  devToolbar: { enabled: false },
});

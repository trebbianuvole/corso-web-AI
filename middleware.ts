// Routing Middleware di Vercel: gira prima che Vercel mandi una pagina.
// Il sito resta statico; questo file decide solo se la pagina richiesta
// si può mandare o se bisogna passare dalla pagina di accesso.
// La logica sta in src/lib/accesso.mjs; qui c'è solo l'aggancio a Vercel.
// In locale (npm run dev) non gira: per provarlo, npm run prova-accesso.
import { gestisci } from "./src/lib/accesso.mjs";

export const config = {
  // Tutto tranne CSS, JavaScript e immagini in /assets/
  matcher: ["/((?!assets/).*)"],
};

export default function middleware(richiesta: Request) {
  return gestisci(richiesta, process.env);
}

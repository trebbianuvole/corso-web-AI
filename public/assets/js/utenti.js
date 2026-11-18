/* Gestione utenti: inventa le password, ne calcola l'impronta e prepara
   le righe per la variabile UTENTI di Vercel. Tutto nel browser.
   L'impronta è la stessa di src/lib/accesso.mjs (creaImpronta):
   PBKDF2-HMAC-SHA256, 600.000 ripetizioni, sale casuale di 16 byte,
   scritta come «pbkdf2-sha256$600000$<sale>$<impronta>» in base64url. */
(function () {
  const ITERAZIONI = 600000;
  // Niente lettere e cifre che si confondono (0 e o, 1 e l e i)
  const ALFABETO = "abcdefghjkmnpqrstuvwxyz23456789";

  const modulo = document.querySelector("[data-genera]");
  if (!modulo) return;
  const stato = modulo.querySelector("[data-stato]");
  const risultato = document.querySelector("[data-risultato]");
  const tabella = document.querySelector("[data-tabella]");
  const righe = document.querySelector("[data-righe]");

  function inBase64url(byte) {
    let s = "";
    byte.forEach(b => { s += String.fromCharCode(b); });
    return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  }

  async function impronta(password) {
    const sale = crypto.getRandomValues(new Uint8Array(16));
    const chiave = await crypto.subtle.importKey("raw", new TextEncoder().encode(password), "PBKDF2", false, ["deriveBits"]);
    const bit = await crypto.subtle.deriveBits({ name: "PBKDF2", hash: "SHA-256", salt: sale, iterations: ITERAZIONI }, chiave, 256);
    return "pbkdf2-sha256$" + ITERAZIONI + "$" + inBase64url(sale) + "$" + inBase64url(new Uint8Array(bit));
  }

  // Un intero casuale in [0, n), senza preferenze per nessun valore
  function casuale(n) {
    const limite = Math.floor(256 / n) * n;
    const b = new Uint8Array(1);
    do { crypto.getRandomValues(b); } while (b[0] >= limite);
    return b[0] % n;
  }

  // Tre gruppi di tre caratteri: «k7m-pq4-xz9», circa 44 bit di casualità
  function nuovaPassword() {
    const gruppi = [];
    for (let g = 0; g < 3; g++) {
      let s = "";
      for (let i = 0; i < 3; i++) s += ALFABETO[casuale(ALFABETO.length)];
      gruppi.push(s);
    }
    return gruppi.join("-");
  }

  // «Mario De Rossi» → «mario.de.rossi»; «D'Àmbrosio» → «dambrosio»
  function nomeUtente(testo) {
    return testo
      .normalize("NFD").replace(/[̀-ͯ]/g, "")
      .toLowerCase()
      .replace(/['’`]/g, "")
      .trim()
      .replace(/\s+/g, ".")
      .replace(/[^a-z0-9._-]/g, "")
      .replace(/\.{2,}/g, ".")
      .replace(/^[.-]+|[.-]+$/g, "")
      .slice(0, 64);
  }

  function leggiElenco(testo) {
    const usati = new Set();
    const utenti = [];
    const errori = [];
    testo.split(/\r?\n/).forEach((riga, i) => {
      if (!riga.trim()) return;
      const sbarra = riga.indexOf("|");
      const grezzo = sbarra < 0 ? riga : riga.slice(0, sbarra);
      const scelta = sbarra < 0 ? "" : riga.slice(sbarra + 1).trim();
      let nome = nomeUtente(grezzo);
      if (!nome) { errori.push("riga " + (i + 1) + ": manca il nome"); return; }
      if (scelta && scelta.length < 8) { errori.push("riga " + (i + 1) + ": la password scelta ha meno di 8 caratteri"); return; }
      // Nomi uguali nello stesso elenco: mario.rossi, mario.rossi2…
      let n = 2;
      const base = nome;
      while (usati.has(nome)) nome = base + n++;
      usati.add(nome);
      utenti.push({ nome: nome, password: scelta || nuovaPassword() });
    });
    return { utenti: utenti, errori: errori };
  }

  async function copia(pulsante, testo) {
    const prima = pulsante.textContent;
    try {
      await navigator.clipboard.writeText(testo);
      pulsante.textContent = "Copiato";
    } catch (e) {
      pulsante.textContent = "Selezionate a mano";
    }
    setTimeout(() => { pulsante.textContent = prima; }, 1800);
  }

  let ultimo = { tabella: "", righe: "" };

  modulo.addEventListener("submit", async ev => {
    ev.preventDefault();
    const scelti = [...modulo.querySelectorAll("input[name=corso]:checked")].map(c => c.value);
    const corsi = scelti.includes("*") ? "*" : scelti.join(",");
    if (!corsi) { stato.textContent = "Scegliete almeno un corso."; return; }

    const { utenti, errori } = leggiElenco(modulo.querySelector("#elenco").value);
    if (errori.length) { stato.textContent = "Da correggere: " + errori.join("; ") + "."; return; }
    if (!utenti.length) { stato.textContent = "Scrivete almeno un nome."; return; }

    const pulsante = modulo.querySelector("button[type=submit]");
    pulsante.disabled = true;
    const linee = [];
    const nota = modulo.querySelector("#nota").value.trim();
    if (nota) linee.push("# " + nota);
    for (let i = 0; i < utenti.length; i++) {
      stato.textContent = "Calcolo le impronte: " + (i + 1) + " di " + utenti.length + "…";
      linee.push(utenti[i].nome + " " + corsi + " " + await impronta(utenti[i].password));
    }
    pulsante.disabled = false;
    stato.textContent = utenti.length === 1 ? "Fatto: un utente." : "Fatto: " + utenti.length + " utenti.";

    tabella.textContent = "";
    utenti.forEach(u => {
      const tr = document.createElement("tr");
      [["Nome utente", u.nome], ["Password", u.password]].forEach(([etichetta, valore]) => {
        const td = document.createElement("td");
        td.dataset.label = etichetta;
        td.textContent = valore;
        td.className = "mono";
        tr.appendChild(td);
      });
      tabella.appendChild(tr);
    });
    righe.textContent = linee.join("\n");
    ultimo = {
      tabella: "Nome utente\tPassword\n" + utenti.map(u => u.nome + "\t" + u.password).join("\n"),
      righe: linee.join("\n"),
    };
    risultato.hidden = false;
    risultato.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  document.querySelector("[data-copia-tabella]").addEventListener("click", e => copia(e.currentTarget, ultimo.tabella));
  document.querySelector("[data-copia-righe]").addEventListener("click", e => copia(e.currentTarget, ultimo.righe));

  // Il segreto delle sessioni: 32 byte casuali
  const segreto = document.querySelector("[data-segreto]");
  const valore = document.querySelector("[data-segreto-valore]");
  document.querySelector("[data-genera-segreto]").addEventListener("click", () => {
    valore.textContent = inBase64url(crypto.getRandomValues(new Uint8Array(32)));
    segreto.hidden = false;
  });
  document.querySelector("[data-copia-segreto]").addEventListener("click", e => copia(e.currentTarget, valore.textContent));
})();

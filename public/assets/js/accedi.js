/* Pagina di accesso: messaggi (?errore=…, ?uscito=1), pagina di destinazione
   (?da=… più l'eventuale #slide), «Mostra la password». */
(function () {
  const parametri = new URLSearchParams(location.search);
  const modulo = document.querySelector("[data-modulo]");
  const avviso = document.querySelector("[data-messaggio]");

  // Dove tornare dopo l'accesso. Il # della slide il browser non lo manda
  // al server: lo riprendiamo dall'indirizzo di questa pagina.
  let da = parametri.get("da") || "";
  if (location.hash) da = da.split("#")[0] + location.hash;
  if (modulo) modulo.elements.namedItem("da").value = da;

  const MESSAGGI = {
    credenziali: "Nome utente o password non corretti. Riprovate.",
    permesso: "Questo account non dà accesso alla pagina che avete chiesto. Entrate con un altro account.",
    richiesta: "La richiesta non è valida. Ricaricate la pagina e riprovate.",
    configurazione: "L'accesso non è ancora configurato su questo sito. Se lo gestite voi, create il primo account dalla pagina <a href=\"../gestione/utenti/\">Gestione utenti</a>.",
  };
  const errore = parametri.get("errore");
  if (avviso && (errore || parametri.has("uscito"))) {
    if (errore) {
      avviso.innerHTML = MESSAGGI[errore] || MESSAGGI.richiesta;
    } else {
      avviso.textContent = "Siete usciti.";
      avviso.classList.add("ok");
      avviso.setAttribute("role", "status");
    }
    avviso.hidden = false;
  }

  if (modulo) {
    const nome = modulo.elements.namedItem("nome");
    const password = modulo.elements.namedItem("password");
    (errore === "credenziali" ? password : nome).focus();

    const mostra = modulo.querySelector("[data-mostra]");
    mostra.addEventListener("change", () => { password.type = mostra.checked ? "text" : "password"; });

    const pulsante = modulo.querySelector("button[type=submit]");
    modulo.addEventListener("submit", () => {
      pulsante.disabled = true;
      pulsante.textContent = "Controllo…";
    });
    // Tornando indietro con il browser, il pulsante deve essere di nuovo attivo
    window.addEventListener("pageshow", () => {
      pulsante.disabled = false;
      pulsante.textContent = "Entra";
    });
  }
})();

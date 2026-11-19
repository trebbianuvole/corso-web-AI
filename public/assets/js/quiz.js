/* Quiz di fine capitolo (/capitolo-N/quiz/).
   Una domanda alla volta: si può saltare, tornare indietro, cambiare risposta
   o lasciarla in bianco fino alla consegna. Poi punteggio e correzione.
   Punti per giusta, sbagliata e vuota: in data-punti (src/lib/quiz.ts).
   Le risposte restano nel browser (localStorage) finché non si rifà il quiz;
   se le domande cambiano (data-versione), quelle salvate non valgono più. */
(function () {
  const radice = document.getElementById("quiz");
  if (!radice) return;

  const LETTERE = "ABCDE";
  const PUNTI = JSON.parse(radice.dataset.punti);
  const chiave = "noema-quiz:" + radice.dataset.quiz;
  const versione = radice.dataset.versione;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const domande = Array.from(radice.querySelectorAll(".quiz-domanda"));
  const N = domande.length;
  const mappa = radice.querySelector(".quiz-mappa");
  const numeri = Array.from(mappa.querySelectorAll("button"));
  const comandi = radice.querySelector(".quiz-comandi");
  const btnPrima = comandi.querySelector("[data-prima]");
  const btnDopo = comandi.querySelector("[data-dopo]");
  const btnBianco = comandi.querySelector("[data-bianco]");
  const btnConsegna = comandi.querySelector("[data-consegna]");
  const statoEl = comandi.querySelector("[data-stato]");
  const esito = radice.querySelector(".quiz-esito");
  const dialogo = radice.querySelector(".quiz-conferma");

  const opzioniDi = i => Array.from(domande[i].querySelectorAll("input[type=radio]"));

  // ---------------------------------------------------------------- stato

  let stato = { risposte: new Array(N).fill(null), corrente: 0, consegnato: false };

  function carica() {
    try {
      const s = JSON.parse(localStorage.getItem(chiave) || "null");
      if (!s || s.versione !== versione || !Array.isArray(s.risposte) || s.risposte.length !== N) return;
      stato = {
        risposte: s.risposte.map(r => (Number.isInteger(r) && r >= 0 && r < LETTERE.length ? r : null)),
        corrente: Math.min(Math.max(0, Number(s.corrente) || 0), N - 1),
        consegnato: s.consegnato === true,
      };
    } catch (e) { /* niente salvataggio: si parte da zero */ }
  }

  function salva() {
    try {
      localStorage.setItem(chiave, JSON.stringify({ versione, risposte: stato.risposte, corrente: stato.corrente, consegnato: stato.consegnato }));
    } catch (e) { /* il quiz funziona lo stesso, solo non si ricorda */ }
  }

  // Le soluzioni sono in base64 (vedi src/layouts/Quiz.astro): si leggono alla consegna
  let soluzioni = null;
  function leggiSoluzioni() {
    if (!soluzioni) {
      const byte = Uint8Array.from(atob(radice.dataset.soluzioni), c => c.charCodeAt(0));
      soluzioni = JSON.parse(new TextDecoder().decode(byte));
    }
    return soluzioni;
  }

  // ---------------------------------------------------------------- calcoli

  function conti() {
    const sol = leggiSoluzioni();
    let giuste = 0, sbagliate = 0, vuote = 0;
    stato.risposte.forEach((r, i) => {
      if (r === null) vuote++;
      else if (r === sol[i].giusta) giuste++;
      else sbagliate++;
    });
    const punteggio = giuste * PUNTI.giusta + sbagliate * PUNTI.sbagliata + vuote * PUNTI.vuota;
    return { giuste, sbagliate, vuote, punteggio };
  }

  // −3 con il segno meno tipografico; con piu = true anche +5
  function numero(n, piu) {
    if (n < 0) return "−" + Math.abs(n);
    return (piu && n > 0 ? "+" : "") + n;
  }

  const date = () => stato.risposte.filter(r => r !== null).length;
  const vuoteElenco = () => stato.risposte.map((r, i) => (r === null ? i + 1 : 0)).filter(Boolean);

  // [3, 9, 17] → «la 3, la 9 e la 17»
  function elencoItaliano(numeri) {
    const la = numeri.map(n => "la " + n);
    return la.length === 1 ? la[0] : la.slice(0, -1).join(", ") + " e " + la[la.length - 1];
  }

  // ---------------------------------------------------------------- disegno

  function aggiornaMappa() {
    const sol = stato.consegnato ? leggiSoluzioni() : null;
    numeri.forEach((b, i) => {
      const r = stato.risposte[i];
      let come;
      b.classList.remove("risposta", "giusta", "sbagliata", "vuota");
      if (sol) {
        come = r === null ? "senza risposta" : r === sol[i].giusta ? "giusta" : "sbagliata";
        b.classList.add(r === null ? "vuota" : r === sol[i].giusta ? "giusta" : "sbagliata");
      } else {
        come = r === null ? "senza risposta" : "con risposta";
        if (r !== null) b.classList.add("risposta");
      }
      b.setAttribute("aria-label", `Domanda ${i + 1}, ${come}`);
      if (i === stato.corrente) b.setAttribute("aria-current", "step");
      else b.removeAttribute("aria-current");
    });
  }

  function aggiornaComandi() {
    btnPrima.disabled = stato.corrente === 0;
    btnDopo.disabled = stato.corrente === N - 1;
    btnBianco.hidden = btnConsegna.hidden = stato.consegnato;
    btnBianco.disabled = stato.risposte[stato.corrente] === null;
    if (stato.consegnato) {
      const c = conti();
      statoEl.textContent = `Correzione: ${c.giuste} giuste, ${c.sbagliate} sbagliate, ${c.vuote} senza risposta`;
    } else {
      statoEl.textContent = `Risposte date: ${date()} su ${N}`;
    }
  }

  function segnaScelta(i) {
    domande[i].querySelectorAll(".quiz-opzione").forEach((l, j) => {
      l.classList.toggle("scelta", stato.risposte[i] === j);
    });
  }

  function vai(i, focus) {
    stato.corrente = Math.min(Math.max(0, i), N - 1);
    domande.forEach((d, j) => { d.hidden = j !== stato.corrente; });
    aggiornaMappa();
    aggiornaComandi();
    salva();
    const d = domande[stato.corrente];
    if (focus) {
      d.querySelector("legend").focus({ preventScroll: true });
      // Sul telefono la domanda può essere più alta dello schermo
      if (d.getBoundingClientRect().top < 0) d.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    }
  }

  // La correzione: risposta giusta, risposta data, spiegazione, slide da ripassare
  function correggi() {
    const sol = leggiSoluzioni();
    domande.forEach((d, i) => {
      const s = sol[i];
      const r = stato.risposte[i];
      opzioniDi(i).forEach(inp => { inp.disabled = true; });
      d.querySelectorAll(".quiz-opzione").forEach((l, j) => {
        l.classList.toggle("giusta", j === s.giusta);
        l.classList.toggle("sbagliata", j === r && r !== s.giusta);
        l.querySelector(".quiz-segno")?.remove();
        let segno = "";
        if (j === s.giusta) segno = r === j ? "✓ La vostra risposta: giusta" : "✓ Risposta giusta";
        else if (j === r) segno = "✗ La vostra risposta";
        if (segno) {
          const span = document.createElement("span");
          span.className = "quiz-segno";
          span.textContent = segno;
          l.appendChild(span);
        }
      });

      let titolo;
      if (r === null) titolo = `Senza risposta: ${numero(PUNTI.vuota, true)}. La risposta giusta è la ${LETTERE[s.giusta]}.`;
      else if (r === s.giusta) titolo = `Giusta: ${numero(PUNTI.giusta, true)}.`;
      else titolo = `Sbagliata: ${numero(PUNTI.sbagliata, true)}. Avete risposto ${LETTERE[r]}, la risposta giusta è la ${LETTERE[s.giusta]}.`;

      const box = d.querySelector(".quiz-correzione");
      box.className = "quiz-correzione " + (r === null ? "vuota" : r === s.giusta ? "ok" : "ko");
      box.innerHTML = "";
      const p1 = document.createElement("p");
      const forte = document.createElement("strong");
      forte.textContent = titolo;
      p1.appendChild(forte);
      const p2 = document.createElement("p");
      p2.innerHTML = s.spiegazione; // testo nostro, da src/capitoli/*/quiz.ts
      const p3 = document.createElement("p");
      p3.className = "quiz-ripasso";
      p3.append("Ripassate: ");
      const a = document.createElement("a");
      a.href = s.slide.indirizzo;
      a.target = "_blank";
      a.rel = "noopener";
      a.textContent = `${s.slide.numero} ${s.slide.titolo}`;
      p3.appendChild(a);
      box.append(p1, p2, p3);
      box.hidden = false;
    });

    const c = conti();
    esito.querySelector("[data-punteggio]").textContent = numero(c.punteggio);
    esito.querySelector("[data-giuste]").textContent = c.giuste;
    esito.querySelector("[data-sbagliate]").textContent = c.sbagliate;
    esito.querySelector("[data-vuote]").textContent = c.vuote;
    esito.querySelector("[data-punti-giuste]").textContent = numero(c.giuste * PUNTI.giusta, true);
    esito.querySelector("[data-punti-sbagliate]").textContent = numero(c.sbagliate * PUNTI.sbagliata, true);
    esito.hidden = false;
    radice.classList.add("consegnato");
  }

  function azzera() {
    stato = { risposte: new Array(N).fill(null), corrente: 0, consegnato: false };
    domande.forEach((d, i) => {
      opzioniDi(i).forEach(inp => { inp.disabled = false; inp.checked = false; });
      d.querySelectorAll(".quiz-opzione").forEach(l => {
        l.classList.remove("scelta", "giusta", "sbagliata");
        l.querySelector(".quiz-segno")?.remove();
      });
      const box = d.querySelector(".quiz-correzione");
      box.hidden = true;
      box.innerHTML = "";
    });
    esito.hidden = true;
    radice.classList.remove("consegnato");
  }

  // ---------------------------------------------------------------- conferme

  let suConferma = null;
  let tornaA = null;
  function chiedi({ titolo, testo, annulla, conferma }, azione) {
    dialogo.querySelector("[data-titolo]").textContent = titolo;
    dialogo.querySelector("[data-testo]").textContent = testo;
    dialogo.querySelector("[data-annulla]").textContent = annulla;
    dialogo.querySelector("[data-conferma]").textContent = conferma;
    suConferma = azione;
    tornaA = document.activeElement;
    dialogo.showModal();
  }
  dialogo.querySelector("[data-annulla]").addEventListener("click", () => dialogo.close());
  dialogo.querySelector("[data-conferma]").addEventListener("click", () => {
    const azione = suConferma;
    suConferma = null;
    tornaA = null;
    dialogo.close();
    if (azione) azione();
  });
  dialogo.addEventListener("close", () => {
    suConferma = null;
    if (tornaA && document.contains(tornaA)) tornaA.focus();
    tornaA = null;
  });
  // Un clic sullo sfondo chiude la finestra, come Esc. Il bordo interno della
  // finestra è ancora la finestra: conta solo un clic fuori dal suo riquadro.
  dialogo.addEventListener("click", e => {
    if (e.target !== dialogo) return;
    const r = dialogo.getBoundingClientRect();
    if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) dialogo.close();
  });

  // ---------------------------------------------------------------- eventi

  domande.forEach((d, i) => {
    d.addEventListener("change", e => {
      if (stato.consegnato || !e.target.matches("input[type=radio]")) return;
      stato.risposte[i] = Number(e.target.value);
      segnaScelta(i);
      aggiornaMappa();
      aggiornaComandi();
      salva();
    });
  });

  numeri.forEach((b, i) => b.addEventListener("click", () => vai(i, true)));
  btnPrima.addEventListener("click", () => vai(stato.corrente - 1, true));
  btnDopo.addEventListener("click", () => vai(stato.corrente + 1, true));

  btnBianco.addEventListener("click", () => {
    const i = stato.corrente;
    stato.risposte[i] = null;
    opzioniDi(i).forEach(inp => { inp.checked = false; });
    segnaScelta(i);
    aggiornaMappa();
    aggiornaComandi();
    salva();
    domande[i].querySelector("legend").focus({ preventScroll: true });
  });

  btnConsegna.addEventListener("click", () => {
    const vuote = vuoteElenco();
    let testo;
    if (vuote.length === 0) testo = "Avete risposto a tutte le domande.";
    else if (vuote.length === 1) testo = `Avete lasciato una domanda senza risposta (${elencoItaliano(vuote)}): vale 0 punti.`;
    else testo = `Avete lasciato ${vuote.length} domande senza risposta (${elencoItaliano(vuote)}): valgono 0 punti.`;
    testo += " Dopo la consegna le risposte non si possono più cambiare.";
    chiedi({ titolo: "Consegnare il quiz?", testo, annulla: "Torna alle domande", conferma: "Consegna" }, () => {
      stato.consegnato = true;
      correggi();
      vai(0, false);
      esito.focus({ preventScroll: true });
      esito.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    });
  });

  esito.querySelector("[data-rifai]").addEventListener("click", () => {
    chiedi({
      titolo: "Rifare il quiz?",
      testo: "Le risposte e il punteggio di adesso si cancellano.",
      annulla: "Annulla",
      conferma: "Rifai il quiz",
    }, () => {
      azzera();
      vai(0, false);
      radice.querySelector(".kicker").scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
      domande[0].querySelector("legend").focus({ preventScroll: true });
    });
  });

  // ← → cambiano domanda, salvo quando il focus è su un'opzione o su un campo:
  // lì le frecce fanno il loro lavoro (nei radio scelgono l'opzione)
  document.addEventListener("keydown", e => {
    if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey || dialogo.open) return;
    const el = document.activeElement;
    if (el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.tagName === "SELECT" || el.isContentEditable)) return;
    if (e.key === "ArrowRight" && stato.corrente < N - 1) { e.preventDefault(); vai(stato.corrente + 1, true); }
    else if (e.key === "ArrowLeft" && stato.corrente > 0) { e.preventDefault(); vai(stato.corrente - 1, true); }
  });

  // ---------------------------------------------------------------- avvio

  carica();
  stato.risposte.forEach((r, i) => {
    opzioniDi(i).forEach((inp, j) => { inp.checked = r === j; });
    segnaScelta(i);
  });
  // Un indirizzo come #domanda-5 apre quella domanda
  function dallIndirizzo() {
    const m = /^#domanda-(\d+)$/.exec(location.hash);
    return m ? Math.min(Math.max(1, Number(m[1])), N) - 1 : null;
  }
  window.addEventListener("hashchange", () => {
    const i = dallIndirizzo();
    if (i !== null) vai(i, true);
  });
  const iniziale = dallIndirizzo();
  if (iniziale !== null) stato.corrente = iniziale;

  mappa.hidden = false;
  comandi.hidden = false;
  radice.classList.add("attivo");
  if (stato.consegnato) correggi();
  vai(stato.corrente, false);
})();

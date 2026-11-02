/* Gioco "Indovina la parola successiva".
   Le probabilità sono illustrative: costruite a mano per mostrare
   come ragiona un LLM, non estratte da un modello reale. */
(function () {
  const root = document.getElementById("gioco");
  if (!root) return;

  const ROUNDS = [
    {
      label: "Un fatto",
      context: "La capitale d'Italia è",
      cands: [["Roma", .93], ["una", .025], ["la", .015], ["Milano", .01], ["Torino", .006], ["Firenze", .004]],
      lesson: "Quando la risposta è un fatto molto noto, una parola si prende quasi tutta la probabilità. Il modello sembra «sapere»: in realtà ha visto questa frase completata così milioni di volte."
    },
    {
      label: "Colazione",
      context: "Stamattina a colazione ho bevuto un",
      cands: [["caffè", .48], ["cappuccino", .22], ["tè", .11], ["succo", .06], ["bicchiere", .05], ["po'", .04]],
      lesson: "Qui molte risposte sono plausibili e nessuna è «quella giusta». Per questo la stessa domanda, fatta due volte, può dare risposte diverse."
    },
    {
      label: "Torino",
      context: "Torino è famosa per la",
      cands: [["Mole", .34], ["sua", .14], ["Juventus", .12], ["cioccolata", .07], ["Sindone", .06], ["FIAT", .05]],
      lesson: "Le probabilità riflettono ciò che si trova scritto nei testi su cui il modello è stato addestrato: luoghi comuni compresi."
    },
    {
      label: "Codice",
      context: "<h1>Benvenuti nel mio",
      code: true,
      cands: [["sito", .58], ["blog", .15], ["portfolio", .09], ["negozio", .04], ["mondo", .04], ["profilo", .03]],
      lesson: "Per un LLM il codice è testo come un altro. Sa scrivere HTML perché ne ha letto moltissimo: è la base del vibe coding."
    },
    {
      label: "Favola",
      context: "C'era una volta un",
      cands: [["re", .36], ["piccolo", .16], ["ragazzo", .09], ["vecchio", .08], ["drago", .05], ["mago", .04]],
      lesson: "Alza la temperatura e fai scegliere il modello più volte: escono parole meno probabili. È così che si regola la «creatività»."
    },
    {
      label: "Trappola",
      context: "Il premio Nobel per la matematica del 2019 è stato vinto da",
      cands: [["Karen", .21], ["un", .16], ["il", .14], ["nessuno", .06], ["John", .05], ["Andrew", .04]],
      lesson: "Il Nobel per la matematica non esiste. Nel 2019 Karen Uhlenbeck ha vinto il premio Abel, e il modello mescola le due cose. Completa la frase in modo plausibile anche quando la domanda è sbagliata: questa è un'allucinazione."
    }
  ];

  const $ = sel => root.querySelector(sel);
  const roundsEl = $(".ng-rounds");
  const ctxEl = $(".ng-context");
  const input = $(".ng-form input");
  const form = $(".ng-form");
  const guessesEl = $(".ng-guesses");
  const barsEl = $(".ng-bars");
  const revealBtn = $("[data-reveal]");
  const sampleBtn = $("[data-sample]");
  const resetBtn = $("[data-reset]");
  const tempInput = $(".ng-temp input");
  const tempOut = $(".ng-temp output");
  const lessonEl = $(".ng-lesson");

  let r = 0, revealed = false, guesses = [], tally = [], picked = -1;

  const norm = s => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9']/g, "");
  const fmtPct = p => (p * 100 >= 10 ? Math.round(p * 100) : (p * 100).toFixed(1).replace(".", ",")) + "%";

  function probs() {
    const T = parseFloat(tempInput.value);
    const raw = ROUNDS[r].cands.map(([, p]) => Math.pow(p, 1 / T));
    const sum = raw.reduce((a, b) => a + b, 0);
    return raw.map(x => x / sum);
  }

  function renderRounds() {
    roundsEl.innerHTML = "";
    ROUNDS.forEach((rd, i) => {
      const b = document.createElement("button");
      b.type = "button";
      b.textContent = (i + 1) + ". " + rd.label;
      b.setAttribute("aria-pressed", i === r ? "true" : "false");
      b.addEventListener("click", () => load(i));
      roundsEl.appendChild(b);
    });
  }

  function renderContext(word) {
    const rd = ROUNDS[r];
    ctxEl.classList.toggle("is-code", !!rd.code);
    ctxEl.textContent = rd.context + " ";
    const blank = document.createElement("span");
    blank.className = "ng-blank " + (word ? "filled" : "waiting");
    blank.textContent = word || "?";
    ctxEl.appendChild(blank);
  }

  function hits() {
    const words = ROUNDS[r].cands.map(c => norm(c[0]));
    return guesses.map(g => words.indexOf(norm(g)));
  }

  function renderGuesses() {
    guessesEl.innerHTML = "";
    if (!guesses.length) {
      const p = document.createElement("span");
      p.className = "ng-empty";
      p.textContent = "Nessuna parola ancora. Scrivetene qualcuna.";
      guessesEl.appendChild(p);
      return;
    }
    const h = hits();
    guesses.forEach((g, i) => {
      const chip = document.createElement("span");
      chip.className = "ng-guess" + (revealed ? (h[i] >= 0 ? " hit" : " miss") : "");
      chip.textContent = g;
      const x = document.createElement("button");
      x.type = "button";
      x.setAttribute("aria-label", "Togli " + g);
      x.textContent = "×";
      x.addEventListener("click", () => { guesses.splice(i, 1); renderGuesses(); renderBars(); });
      chip.appendChild(x);
      guessesEl.appendChild(chip);
    });
  }

  function renderBars() {
    barsEl.innerHTML = "";
    if (!revealed) {
      const d = document.createElement("div");
      d.className = "ng-hidden";
      d.textContent = "Le probabilità del modello sono nascoste. Prima fate le vostre ipotesi.";
      barsEl.appendChild(d);
      return;
    }
    const ps = probs();
    const hitIdx = new Set(hits().filter(i => i >= 0));
    const head = document.createElement("div");
    head.className = "ng-bars-head";
    head.innerHTML = "<span>Parola</span><span>Probabilità</span><span>%</span><span>Scelte</span>";
    barsEl.appendChild(head);
    ROUNDS[r].cands.forEach(([w], i) => {
      const row = document.createElement("div");
      row.className = "ng-row" + (i === 0 ? " top" : "") + (hitIdx.has(i) ? " hit" : "") + (i === picked ? " picked" : "");
      row.innerHTML =
        '<span class="w"></span><span class="track"><span class="fill"></span></span>' +
        '<span class="pct"></span><span class="tally"></span>';
      row.querySelector(".w").textContent = w;
      row.querySelector(".pct").textContent = fmtPct(ps[i]);
      row.querySelector(".tally").textContent = tally[i] ? "×" + tally[i] : "";
      barsEl.appendChild(row);
      const fill = row.querySelector(".fill");
      requestAnimationFrame(() => requestAnimationFrame(() => { fill.style.width = (ps[i] * 100) + "%"; }));
    });
  }

  function load(i) {
    r = i; revealed = false; guesses = []; picked = -1;
    tally = ROUNDS[r].cands.map(() => 0);
    lessonEl.hidden = true;
    lessonEl.textContent = ROUNDS[r].lesson;
    sampleBtn.disabled = true;
    revealBtn.disabled = false;
    renderRounds(); renderContext(); renderGuesses(); renderBars();
  }

  form.addEventListener("submit", e => {
    e.preventDefault();
    const v = input.value.trim().split(/\s+/)[0];
    if (v && !guesses.some(g => norm(g) === norm(v))) { guesses.push(v); renderGuesses(); renderBars(); }
    input.value = "";
  });

  revealBtn.addEventListener("click", () => {
    revealed = true;
    revealBtn.disabled = true;
    sampleBtn.disabled = false;
    lessonEl.hidden = false;
    renderGuesses(); renderBars();
  });

  sampleBtn.addEventListener("click", () => {
    const ps = probs();
    let x = Math.random(), i = 0;
    while (i < ps.length - 1 && x > ps[i]) { x -= ps[i]; i++; }
    picked = i;
    tally[i]++;
    renderContext(ROUNDS[r].cands[i][0]);
    renderBars();
  });

  resetBtn.addEventListener("click", () => load(r));

  tempInput.addEventListener("input", () => {
    tempOut.textContent = parseFloat(tempInput.value).toFixed(1).replace(".", ",");
    if (revealed) {
      const ps = probs();
      barsEl.querySelectorAll(".ng-row").forEach((row, i) => {
        row.querySelector(".fill").style.width = (ps[i] * 100) + "%";
        row.querySelector(".pct").textContent = fmtPct(ps[i]);
      });
    }
  });

  load(0);
})();

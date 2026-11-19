/* Demo 1.2.a3: scegliere il pezzo successivo con la temperatura.
   Le probabilità di partenza sono un esempio scritto a mano.
   Con la temperatura T ogni probabilità diventa p^(1/T), poi si
   rinormalizza: T bassa esalta la parola più probabile, T alta
   avvicina tutte le probabilità. Nessuna animazione continua:
   non serve fermare niente quando la finestra si chiude. */
(function () {
  const root = document.querySelector("[data-temperatura]");
  if (!root) return;

  const PAROLE = [
    ["pasta", 0.60],
    ["riso", 0.20],
    ["minestra", 0.12],
    ["lasagne", 0.06],
    ["sassi", 0.02],
  ];

  const $ = sel => root.querySelector(sel);
  const cursore = $("input[type=range]");
  const valore = $("[data-valore]");
  const scelta = $("[data-scelta]");
  const barre = $("[data-barre]");
  const totale = $("[data-totale]");
  let uscite = PAROLE.map(() => 0);
  let ultima = -1;

  function probabilita() {
    const T = parseFloat(cursore.value);
    const pesi = PAROLE.map(([, p]) => Math.pow(p, 1 / T));
    const somma = pesi.reduce((a, b) => a + b, 0);
    return pesi.map(x => x / somma);
  }

  function pesca(p) {
    let r = Math.random();
    for (let i = 0; i < p.length; i++) {
      r -= p[i];
      if (r < 0) return i;
    }
    return p.length - 1;
  }

  function percento(x) {
    const v = x * 100;
    return (v < 1 && v > 0 ? v.toFixed(1) : Math.round(v)).toString().replace(".", ",") + "%";
  }

  function disegna() {
    const p = probabilita();
    const max = Math.max(...p);
    barre.innerHTML = "";
    PAROLE.forEach(([parola], i) => {
      const riga = document.createElement("div");
      riga.className = "ng-row" + (p[i] === max ? " top" : "") + (i === ultima ? " picked" : "");
      riga.innerHTML =
        '<span class="w"></span><span class="track"><span class="fill"></span></span>' +
        '<span class="pct"></span><span class="tally"></span>';
      riga.querySelector(".w").textContent = parola;
      riga.querySelector(".fill").style.width = (p[i] * 100) + "%";
      riga.querySelector(".pct").textContent = percento(p[i]);
      riga.querySelector(".tally").textContent = uscite[i] || "";
      barre.appendChild(riga);
    });
    const n = uscite.reduce((a, b) => a + b, 0);
    totale.textContent = n
      ? "Scelte fatte: " + n + ". Parole diverse uscite: " + uscite.filter(x => x > 0).length + " su " + PAROLE.length + "."
      : "Ancora nessuna scelta.";
  }

  function scegli(volte) {
    const p = probabilita();
    for (let k = 0; k < volte; k++) {
      ultima = pesca(p);
      uscite[ultima]++;
    }
    scelta.textContent = PAROLE[ultima][0];
    scelta.classList.remove("filled");
    void scelta.offsetWidth;            // fa ripartire l'animazione
    scelta.classList.add("filled");
    disegna();
  }

  cursore.addEventListener("input", () => {
    valore.textContent = parseFloat(cursore.value).toFixed(1).replace(".", ",");
    disegna();
  });
  $("[data-una]").addEventListener("click", () => scegli(1));
  $("[data-venti]").addEventListener("click", () => scegli(20));
  $("[data-azzera]").addEventListener("click", () => {
    uscite = PAROLE.map(() => 0);
    ultima = -1;
    scelta.textContent = "…";
    scelta.classList.remove("filled");
    disegna();
  });

  disegna();
})();

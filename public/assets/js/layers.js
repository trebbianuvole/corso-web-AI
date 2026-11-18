/* Demo "HTML, CSS, JavaScript": si accendono e spengono gli strati
   di una piccola pagina per vedere cosa fa ciascun linguaggio. */
(function () {
  const root = document.querySelector("[data-layers]");
  if (!root) return;

  const stage = root.querySelector(".layers-stage");
  const btn = root.querySelector(".demo-site button");
  const msg = root.querySelector(".demo-msg");
  const note = root.querySelector(".layers-note");
  const boxes = root.querySelectorAll("input[data-layer]");

  function set(layer, on) {
    stage.dataset[layer] = on ? "on" : "off";
    root.querySelector('.code[data-for="' + layer + '"]')?.classList.toggle("is-off", !on);
    if (layer === "js" && !on) { msg.hidden = true; btn.textContent = "Prenota un tavolo"; }
    note.textContent = "";
  }

  boxes.forEach(b => {
    set(b.dataset.layer, b.checked);
    b.addEventListener("change", () => set(b.dataset.layer, b.checked));
  });

  btn.addEventListener("click", () => {
    if (stage.dataset.js !== "on") {
      note.textContent = "Il pulsante c'è, ma senza JavaScript non fa niente.";
      return;
    }
    msg.hidden = false;
    btn.textContent = "Richiesta inviata";
  });
})();

/* Pulsanti "Copia" per i modelli di prompt */
(function () {
  document.querySelectorAll("[data-copy]").forEach(b => {
    b.addEventListener("click", async () => {
      const src = document.querySelector(b.dataset.copy);
      if (!src) return;
      try {
        await navigator.clipboard.writeText(src.innerText);
        b.textContent = "Copiato";
      } catch (e) {
        b.textContent = "Selezionalo a mano";
      }
      setTimeout(() => { b.textContent = "Copia"; }, 1800);
    });
  });
})();

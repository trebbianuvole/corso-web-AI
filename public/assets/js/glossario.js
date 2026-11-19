/* Glossario (scheda S.1): filtro di ricerca.
   Senza JavaScript il campo resta nascosto e si vedono tutte le voci. */
(function () {
  const box = document.querySelector("[data-cerca]");
  if (!box) return;
  const campo = box.querySelector("input");
  const esito = box.querySelector("#cerca-esito");
  const voci = [...document.querySelectorAll("[data-voce]")];
  const sezioni = [...document.querySelectorAll("[data-lettera]")];
  const vuoto = document.querySelector("[data-vuoto]");
  box.hidden = false;

  // Toglie maiuscole e accenti: «perche» trova «perché»
  const piano = s => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  const testi = voci.map(v => piano(v.dataset.voce + " " + v.textContent));

  function filtra() {
    const q = piano(campo.value.trim());
    let n = 0;
    voci.forEach((v, i) => {
      // Prima il termine, poi la definizione
      const si = !q || piano(v.dataset.voce).includes(q) || testi[i].includes(q);
      v.hidden = !si;
      if (si) n++;
    });
    sezioni.forEach(s => { s.hidden = !s.querySelector("[data-voce]:not([hidden])"); });
    vuoto.hidden = n > 0;
    esito.textContent = q ? (n === 1 ? "1 voce" : n + " voci") : "";
  }
  campo.addEventListener("input", filtra);
})();

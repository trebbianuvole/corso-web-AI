/* Il titolo grande si "genera" un token alla volta, mostrando sotto
   le alternative che il modello aveva scartato.
   I passi stanno nell'attributo data-passi del titolo, in JSON:
   [["token scelto", ["token scelto", "alternativa", "alternativa"]], …] */
(function () {
  const title = document.getElementById("gen-title");
  const cands = document.getElementById("gen-candidates");
  if (!title || !cands || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  let steps;
  try { steps = JSON.parse(title.dataset.passi || "[]"); } catch (e) { return; }
  if (!steps.length) return;

  title.textContent = "";
  const spans = steps.map(([t]) => {
    const s = document.createElement("span");
    s.className = "t chip pending";
    s.textContent = t;
    title.appendChild(s);
    return s;
  });
  const cursor = document.createElement("span");
  cursor.className = "cursor";
  title.appendChild(cursor);

  let i = 0;
  function next() {
    if (i >= steps.length) {
      cands.innerHTML = "";
      setTimeout(() => {
        spans.forEach(s => s.classList.remove("chip"));
        cursor.remove();
      }, 500);
      return;
    }
    cands.innerHTML = "";
    steps[i][1].forEach((c, k) => {
      const e = document.createElement("span");
      e.textContent = c.trim();
      if (k === 0) e.className = "best";
      cands.appendChild(e);
    });
    spans[i].classList.remove("pending");
    title.insertBefore(cursor, spans[i + 1] || null);
    i++;
    setTimeout(next, 420);
  }
  setTimeout(next, 350);
})();

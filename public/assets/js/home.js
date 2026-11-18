/* Il titolo della home si "genera" un token alla volta,
   mostrando sotto le alternative che il modello aveva scartato. */
(function () {
  const title = document.getElementById("gen-title");
  const cands = document.getElementById("gen-candidates");
  if (!title || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const steps = [
    ["Costruire", ["Costruire", "Creare", "Imparare"]],
    [" siti", [" siti", " app", " pagine"]],
    [" web", [" web", " veri", " belli"]],
    [" con", [" con", " grazie", " usando"]],
    [" l'", [" l'", " Claude", " un"]],
    ["AI", ["AI", "aiuto", "intelligenza"]]
  ];

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

/* Serpentina "Dal 2017 a oggi" (capitolo 1, sezione 1.1).
   Il pulsante apre una finestra sopra la slide. Le tappe si dispongono
   a serpentina (una riga verso destra, la successiva verso sinistra)
   e una linea arancione le unisce, curvando ai bordi. */
(function () {
  const RADIUS = 22;   // raggio delle curve ai bordi
  const OUTSIDE = 18;  // quanto la curva esce dalla griglia delle tappe

  function columnsFor(width) {
    if (width >= 900) return 4;
    if (width >= 640) return 3;
    if (width >= 460) return 2;
    return 1;
  }

  function layout(snake) {
    const list = snake.querySelector(".snake-list");
    const items = Array.from(list.children);
    const cols = columnsFor(snake.clientWidth);
    snake.classList.toggle("one", cols === 1);
    list.style.gridTemplateColumns = "repeat(" + cols + ", minmax(0, 1fr))";

    items.forEach((li, i) => {
      const row = Math.floor(i / cols);
      const pos = i % cols;
      li.style.gridRow = String(row + 1);
      li.style.gridColumn = String((row % 2 === 0 ? pos : cols - 1 - pos) + 1);
      li.style.setProperty("--i", i);
    });

    draw(snake, items, cols);
  }

  function draw(snake, items, cols) {
    const svg = snake.querySelector(".snake-path");
    const path = svg.querySelector("path");
    const box = snake.getBoundingClientRect();
    const grid = snake.querySelector(".snake-list").getBoundingClientRect();
    if (!box.width) return;

    const pts = items.map(li => {
      const r = li.querySelector(".dot").getBoundingClientRect();
      return { x: r.left + r.width / 2 - box.left, y: r.top + r.height / 2 - box.top };
    });
    const left = grid.left - box.left - OUTSIDE;
    const right = grid.right - box.left + OUTSIDE;

    let d = "M " + pts[0].x + " " + pts[0].y;
    for (let i = 1; i < pts.length; i++) {
      const a = pts[i - 1], b = pts[i];
      const row = Math.floor((i - 1) / cols);
      if (cols === 1 || row === Math.floor(i / cols)) { d += " L " + b.x + " " + b.y; continue; }
      if (row % 2 === 0) {
        // fine di una riga verso destra: curva sul bordo destro
        d += " L " + (right - RADIUS) + " " + a.y +
             " A " + RADIUS + " " + RADIUS + " 0 0 1 " + right + " " + (a.y + RADIUS) +
             " L " + right + " " + (b.y - RADIUS) +
             " A " + RADIUS + " " + RADIUS + " 0 0 1 " + (right - RADIUS) + " " + b.y;
      } else {
        // fine di una riga verso sinistra: curva sul bordo sinistro
        d += " L " + (left + RADIUS) + " " + a.y +
             " A " + RADIUS + " " + RADIUS + " 0 0 0 " + left + " " + (a.y + RADIUS) +
             " L " + left + " " + (b.y - RADIUS) +
             " A " + RADIUS + " " + RADIUS + " 0 0 0 " + (left + RADIUS) + " " + b.y;
      }
      d += " L " + b.x + " " + b.y;
    }

    svg.setAttribute("viewBox", "0 0 " + box.width + " " + box.height);
    path.setAttribute("d", d);
    const len = path.getTotalLength();
    path.style.strokeDasharray = len;
    if (!snake.classList.contains("play")) path.style.strokeDashoffset = len;
  }

  function play(snake) {
    snake.classList.remove("play");
    void snake.offsetWidth; // riparte l'animazione a ogni apertura
    snake.classList.add("play");
    snake.querySelector(".snake-path path").style.strokeDashoffset = "0";
  }

  document.querySelectorAll("[data-dialog]").forEach(btn => {
    const dlg = document.getElementById(btn.dataset.dialog);
    if (!dlg || typeof dlg.showModal !== "function") return;
    const snake = dlg.querySelector(".snake");

    btn.addEventListener("click", () => {
      dlg.showModal();
      if (!snake) return;
      snake.classList.remove("play");
      layout(snake);
      requestAnimationFrame(() => play(snake));
    });

    dlg.querySelector("[data-close]")?.addEventListener("click", () => dlg.close());
    // un clic fuori dalla finestra la chiude
    dlg.addEventListener("click", e => { if (e.target === dlg) dlg.close(); });

    if (snake && "ResizeObserver" in window) {
      new ResizeObserver(() => { if (dlg.open) layout(snake); }).observe(snake);
    }
  });
})();

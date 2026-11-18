/* Demo 1.1.a5: una rete minuscola che impara a separare punti blu e rosa.
   Rete: 2 ingressi (x, y) → 8 neuroni nascosti (tanh) → 1 uscita (sigmoide).
   In tutto 33 pesi. Un «giro» passa una volta tutti i punti, in ordine
   casuale, e dopo ogni punto sposta un po' i pesi (discesa del gradiente). */
(function () {
  const root = document.querySelector("[data-rete]");
  if (!root) return;

  const canvas = root.querySelector("canvas");
  const ctx = canvas.getContext("2d");
  const $ = sel => root.querySelector(sel);
  const elGiri = $("[data-giri]");
  const elGiusti = $("[data-giusti]");
  const elNota = $("[data-nota]");
  const btnAvvia = $("[data-avvia]");
  const finestra = root.closest("dialog");

  const NASCOSTI = 8;
  const PASSO = 0.08;          // lunghezza del passo
  const N_PUNTI = 120;
  const BLU = [61, 102, 214];  // #3d66d6
  const ROSA = [214, 64, 127]; // #d6407f

  let forma = "nuvole";
  let punti = [];
  let w1, b1, w2, b2;          // pesi
  let giri = 0;
  let inCorsa = false;
  let idFrame = 0;

  const NOTE = {
    nuvole: "Due gruppi ben separati: basta una linea dritta. La rete la trova in pochi giri.",
    cerchio: "Una linea dritta non basta: la rete deve piegare il confine fino a chiuderlo. Servono più giri.",
    angoli: "Il caso più difficile: i colori si alternano negli angoli. Se la rete si blocca, provate Ricomincia: partirà da altri pesi.",
  };

  function caso(a, b) { return a + Math.random() * (b - a); }
  function gauss() { return Math.sqrt(-2 * Math.log(1 - Math.random())) * Math.cos(2 * Math.PI * Math.random()); }

  function nuoviPunti() {
    punti = [];
    for (let i = 0; i < N_PUNTI; i++) {
      let x, y, c;
      if (forma === "nuvole") {
        c = i % 2;
        const cx = c ? 0.45 : -0.45, cy = c ? -0.35 : 0.35;
        x = cx + gauss() * 0.22; y = cy + gauss() * 0.22;
      } else if (forma === "cerchio") {
        const r = i % 2 ? caso(0, 0.45) : caso(0.65, 0.95);
        const a = caso(0, 2 * Math.PI);
        x = r * Math.cos(a); y = r * Math.sin(a);
        c = r < 0.55 ? 1 : 0;
      } else {
        x = caso(-0.95, 0.95); y = caso(-0.95, 0.95);
        if (Math.abs(x) < 0.08) x += x < 0 ? -0.1 : 0.1;
        if (Math.abs(y) < 0.08) y += y < 0 ? -0.1 : 0.1;
        c = x * y > 0 ? 1 : 0;
      }
      punti.push({ x: Math.max(-0.98, Math.min(0.98, x)), y: Math.max(-0.98, Math.min(0.98, y)), c });
    }
  }

  function nuoviPesi() {
    w1 = []; b1 = []; w2 = [];
    for (let j = 0; j < NASCOSTI; j++) {
      w1.push([gauss(), gauss()]);
      b1.push(gauss() * 0.5);
      w2.push(gauss() * 0.5);
    }
    b2 = 0;
    giri = 0;
  }

  // Risposta della rete: probabilità che il punto sia rosa (0…1)
  function avanti(x, y, h) {
    let s = b2;
    for (let j = 0; j < NASCOSTI; j++) {
      h[j] = Math.tanh(w1[j][0] * x + w1[j][1] * y + b1[j]);
      s += w2[j] * h[j];
    }
    return 1 / (1 + Math.exp(-s));
  }

  const h = new Array(NASCOSTI);
  function unGiro() {
    const ordine = punti.slice().sort(() => Math.random() - 0.5);
    for (const p of ordine) {
      const out = avanti(p.x, p.y, h);
      const d = out - p.c; // errore all'uscita
      for (let j = 0; j < NASCOSTI; j++) {
        const dh = d * w2[j] * (1 - h[j] * h[j]);
        w2[j] -= PASSO * d * h[j];
        w1[j][0] -= PASSO * dh * p.x;
        w1[j][1] -= PASSO * dh * p.y;
        b1[j] -= PASSO * dh;
      }
      b2 -= PASSO * d;
    }
    giri++;
  }

  function giusti() {
    let n = 0;
    for (const p of punti) if ((avanti(p.x, p.y, h) >= 0.5 ? 1 : 0) === p.c) n++;
    return n;
  }

  // Dalle coordinate della rete (-1…1) ai pixel del canvas
  const L = canvas.width;
  const px = v => (v + 1) / 2 * L;
  const py = v => (1 - (v + 1) / 2) * L;

  const CELLA = 8;
  const sfondo = ctx.createImageData(L, L);
  function disegna() {
    // Le due zone: blu dove la rete dice «blu», rosa dove dice «rosa»,
    // più chiare dove è incerta
    const d = sfondo.data;
    for (let cy = 0; cy < L; cy += CELLA) {
      for (let cx = 0; cx < L; cx += CELLA) {
        const x = (cx + CELLA / 2) / L * 2 - 1;
        const y = 1 - (cy + CELLA / 2) / L * 2;
        const o = avanti(x, y, h);
        const col = o >= 0.5 ? ROSA : BLU;
        const forza = 0.12 + Math.abs(o - 0.5) * 0.5; // 0.12 … 0.37
        const r = Math.round(255 + (col[0] - 255) * forza);
        const g = Math.round(255 + (col[1] - 255) * forza);
        const b = Math.round(255 + (col[2] - 255) * forza);
        for (let yy = cy; yy < cy + CELLA; yy++) {
          for (let xx = cx; xx < cx + CELLA; xx++) {
            const i = (yy * L + xx) * 4;
            d[i] = r; d[i + 1] = g; d[i + 2] = b; d[i + 3] = 255;
          }
        }
      }
    }
    ctx.putImageData(sfondo, 0, 0);

    // I punti: blu tondi, rosa quadrati; anello scuro se sono nella zona sbagliata
    for (const p of punti) {
      const x = px(p.x), y = py(p.y);
      const sbagliato = (avanti(p.x, p.y, h) >= 0.5 ? 1 : 0) !== p.c;
      ctx.fillStyle = "rgb(" + (p.c ? ROSA : BLU).join(",") + ")";
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 2;
      ctx.beginPath();
      if (p.c) ctx.rect(x - 6, y - 6, 12, 12);
      else ctx.arc(x, y, 6.5, 0, 2 * Math.PI);
      ctx.fill();
      ctx.stroke();
      if (sbagliato) {
        ctx.strokeStyle = "#1a2040";
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.arc(x, y, 12, 0, 2 * Math.PI);
        ctx.stroke();
      }
    }

    elGiri.textContent = giri;
    elGiusti.textContent = giusti() + " su " + punti.length;
  }

  function annuncia() {
    elNota.textContent = NOTE[forma] + (giri ? " Dopo " + giri + " giri: " + elGiusti.textContent + " punti nella zona giusta." : "");
  }

  function ferma() {
    inCorsa = false;
    cancelAnimationFrame(idFrame);
    btnAvvia.textContent = "Avvia";
    annuncia();
  }

  // Circa 8 giri al secondo: abbastanza lenti da vedere il confine muoversi
  const MS_PER_GIRO = 120;
  let ultimo = 0;
  function ciclo(t) {
    // Si ferma da sola se l'approfondimento viene chiuso
    if (!inCorsa || (finestra && !finestra.open)) { ferma(); return; }
    if (t - ultimo < MS_PER_GIRO) { idFrame = requestAnimationFrame(ciclo); return; }
    ultimo = t;
    unGiro();
    disegna();
    if (giusti() === punti.length && giri > 20) { ferma(); return; }
    idFrame = requestAnimationFrame(ciclo);
  }

  btnAvvia.addEventListener("click", () => {
    if (inCorsa) { ferma(); return; }
    inCorsa = true;
    btnAvvia.textContent = "Ferma";
    idFrame = requestAnimationFrame(ciclo);
  });
  $("[data-giro]").addEventListener("click", () => { if (inCorsa) ferma(); unGiro(); disegna(); annuncia(); });
  $("[data-punti]").addEventListener("click", () => { if (inCorsa) ferma(); nuoviPunti(); nuoviPesi(); disegna(); annuncia(); });
  $("[data-ricomincia]").addEventListener("click", () => { if (inCorsa) ferma(); nuoviPesi(); disegna(); annuncia(); });
  root.querySelectorAll('input[name="rm-forma"]').forEach(r => r.addEventListener("change", () => {
    if (inCorsa) ferma();
    forma = r.value;
    nuoviPunti(); nuoviPesi(); disegna(); annuncia();
  }));

  nuoviPunti();
  nuoviPesi();
  disegna();
  elNota.textContent = NOTE[forma];
})();

/* Navigazione "a presentazione" per le pagine dei capitoli.
   Frecce ← → / PagSu PagGiù / Spazio: slide precedente e successiva.
   F: schermo intero. Le frecce ↑ ↓ scorrono normalmente la pagina. */
(function () {
  // Solo le slide della lezione: quelle degli approfondimenti
  // hanno la loro navigazione (approfondimenti.js).
  const slides = Array.from(document.querySelectorAll("main .slide"));
  if (!slides.length) return;

  slides.forEach((s, i) => { if (!s.id) s.id = "s" + (i + 1); });

  const counter = document.querySelector(".counter");
  const progress = document.querySelector(".progress");
  const chapterBtns = Array.from(document.querySelectorAll(".chapters button[data-chapter]"));
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let current = 0;

  function currentIndex() {
    const mid = window.innerHeight * 0.35;
    let idx = 0;
    for (let i = 0; i < slides.length; i++) {
      if (slides[i].getBoundingClientRect().top <= mid) idx = i;
    }
    return idx;
  }

  function update() {
    current = currentIndex();
    if (counter) counter.textContent = (current + 1) + " / " + slides.length;
    if (progress) progress.style.width = ((current + 1) / slides.length * 100) + "%";
    const ch = slides[current].dataset.chapter;
    chapterBtns.forEach(b => b.setAttribute("aria-current", b.dataset.chapter === ch ? "true" : "false"));
  }

  // Durante lo scorrimento animato la posizione è a metà strada: se si
  // preme di nuovo una freccia, si parte dalla slide di destinazione.
  let target = null;
  let timer = 0;
  function base() {
    return target !== null ? target : currentIndex();
  }

  function go(i) {
    i = Math.max(0, Math.min(slides.length - 1, i));
    target = reduce ? null : i;
    clearTimeout(timer);
    timer = setTimeout(() => { target = null; }, 900);
    slides[i].scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    history.replaceState(null, "", "#" + slides[i].id);
  }
  window.addEventListener("scrollend", () => { target = null; });

  function typing(el) {
    if (!el) return false;
    const tag = el.tagName;
    return tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || el.isContentEditable;
  }

  document.addEventListener("keydown", e => {
    if (e.altKey || e.ctrlKey || e.metaKey || typing(document.activeElement)) return;
    if (document.querySelector("dialog[open]")) return; // una finestra aperta ha la precedenza
    const k = e.key;
    if (k === "ArrowRight" || k === "PageDown" || (k === " " && !e.shiftKey)) { e.preventDefault(); go(base() + 1); }
    else if (k === "ArrowLeft" || k === "PageUp" || (k === " " && e.shiftKey)) { e.preventDefault(); go(base() - 1); }
    else if (k === "Home") { e.preventDefault(); go(0); }
    else if (k === "End") { e.preventDefault(); go(slides.length - 1); }
    else if (k === "f" || k === "F") { toggleFull(); }
  });

  function toggleFull() {
    if (!document.fullscreenElement) document.documentElement.requestFullscreen?.();
    else document.exitFullscreen?.();
  }
  document.querySelector("[data-fullscreen]")?.addEventListener("click", toggleFull);

  chapterBtns.forEach(b => b.addEventListener("click", () => {
    const i = slides.findIndex(s => s.dataset.chapter === b.dataset.chapter);
    if (i >= 0) go(i);
  }));

  let ticking = false;
  window.addEventListener("scroll", () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => { update(); ticking = false; });
  }, { passive: true });
  window.addEventListener("resize", update);
  update();

  // Suggerimento iniziale, sparisce da solo
  const hint = document.querySelector(".hint");
  if (hint) setTimeout(() => hint.classList.add("gone"), 5000);
})();

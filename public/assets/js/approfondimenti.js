/* Gli approfondimenti: finestre a tutto schermo con slide proprie.
   - Il pulsante «Approfondisci: …» apre la finestra dalla prima slide.
   - Dentro: frecce, PagSu/PagGiù, Spazio, Home/Fine, F; contatore proprio.
   - Esc, la barra a sinistra o «Torna alla lezione» chiudono e riportano
     alla slide di partenza, con il focus sul pulsante che l'aveva aperta.
   - Ogni slide ha il suo indirizzo (es. #1-1-a3): aprendolo, anche dopo
     un ricaricamento, si apre l'approfondimento su quella slide. */
(function () {
  const finestre = Array.from(document.querySelectorAll("dialog.approf"));
  if (!finestre.length) return;

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const diChi = new Map(); // id di una slide → la sua finestra
  let aperta = null;

  finestre.forEach(d => {
    d.querySelectorAll(".slide").forEach(s => diChi.set(s.id, d));

    // Nella barra a sinistra: il titolo della slide di partenza
    const da = document.getElementById(d.dataset.da);
    const h2 = da && da.querySelector("h2");
    const tit = h2 ? h2.textContent.trim() : "";
    d.querySelector(".rail-tit").textContent = tit;
    d.querySelector(".approf-rail").setAttribute("aria-label",
      "Torna alla lezione" + (tit ? ": " + tit : ""));

    d.querySelectorAll("[data-chiudi]").forEach(b => b.addEventListener("click", () => d.close()));
    d.addEventListener("close", () => chiusa(d));

    let ticking = false;
    contenitore(d).addEventListener("scroll", () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => { aggiorna(d); ticking = false; });
    }, { passive: true });
  });

  function contenitore(d) { return d.querySelector(".approf-slides"); }
  function slideDi(d) { return Array.from(d.querySelectorAll(".slide")); }

  function indice(d) {
    const box = contenitore(d);
    const soglia = box.getBoundingClientRect().top + box.clientHeight * 0.35;
    const slides = slideDi(d);
    let idx = 0;
    for (let i = 0; i < slides.length; i++) {
      if (slides[i].getBoundingClientRect().top <= soglia) idx = i;
    }
    return idx;
  }

  function aggiorna(d) {
    const slides = slideDi(d);
    const i = indice(d);
    d.querySelector(".approf-counter").textContent = (i + 1) + " / " + slides.length;
    d.querySelector(".approf-progress").style.width = ((i + 1) / slides.length * 100) + "%";
  }

  // Come in deck.js: durante lo scorrimento animato si parte dalla destinazione
  let destinazione = null;
  let timer = 0;
  function base(d) {
    return destinazione !== null ? destinazione : indice(d);
  }

  function vai(d, i, morbido) {
    const slides = slideDi(d);
    i = Math.max(0, Math.min(slides.length - 1, i));
    const animato = morbido && !reduce;
    destinazione = animato ? i : null;
    clearTimeout(timer);
    timer = setTimeout(() => { destinazione = null; }, 900);
    contenitore(d).scrollTo({ top: slides[i].offsetTop, behavior: animato ? "smooth" : "auto" });
    history.replaceState(null, "", "#" + slides[i].id);
    aggiorna(d);
  }

  function apri(d, idSlide) {
    if (aperta && aperta !== d) { aperta.dataset.cambio = "1"; aperta.close(); }
    if (!d.open) {
      d.classList.toggle("entra", !reduce);
      d.showModal();
      aperta = d;
      d.querySelector(".approf-titolo").focus({ preventScroll: true });
    }
    const slides = slideDi(d);
    const i = Math.max(0, slides.findIndex(s => s.id === idSlide));
    vai(d, i, false);
  }

  function chiusa(d) {
    if (aperta === d) aperta = null;
    // Chiusa per aprire un altro approfondimento: non si tocca niente
    if (d.dataset.cambio) { delete d.dataset.cambio; return; }
    // Chiusa da un link verso un'altra slide della lezione: si va lì
    const verso = d.dataset.verso && document.getElementById(d.dataset.verso);
    delete d.dataset.verso;
    if (verso) {
      history.replaceState(null, "", "#" + verso.id);
      window.scrollTo({ top: verso.getBoundingClientRect().top + window.scrollY, behavior: "instant" });
      return;
    }
    // Altrimenti si torna alla slide di partenza, senza animazioni
    const da = document.getElementById(d.dataset.da);
    if (!da) return;
    history.replaceState(null, "", "#" + da.id);
    window.scrollTo({ top: da.getBoundingClientRect().top + window.scrollY, behavior: "instant" });
    const btn = da.querySelector('[data-apri="' + d.dataset.approf + '"]');
    if (btn) btn.focus({ preventScroll: true });
  }

  function scrivendo(el) {
    if (!el) return false;
    const tag = el.tagName;
    return tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || el.isContentEditable;
  }

  function tasti(d, e) {
    if (e.altKey || e.ctrlKey || e.metaKey || scrivendo(document.activeElement)) return;
    // Spazio su un pulsante lo preme: non lo rubiamo
    const suPulsante = document.activeElement && document.activeElement.tagName === "BUTTON";
    const k = e.key;
    if (k === "ArrowRight" || k === "PageDown" || (k === " " && !e.shiftKey && !suPulsante)) { e.preventDefault(); vai(d, base(d) + 1, true); }
    else if (k === "ArrowLeft" || k === "PageUp" || (k === " " && e.shiftKey && !suPulsante)) { e.preventDefault(); vai(d, base(d) - 1, true); }
    else if (k === "Home") { e.preventDefault(); vai(d, 0, true); }
    else if (k === "End") { e.preventDefault(); vai(d, slideDi(d).length - 1, true); }
    else if (k === "f" || k === "F") {
      if (!document.fullscreenElement) document.documentElement.requestFullscreen?.();
      else document.exitFullscreen?.();
    }
  }

  // I tasti valgono per la finestra aperta, ovunque sia il focus:
  // aprendo da un link (#1-1-a3) il focus può restare sulla pagina.
  document.addEventListener("keydown", e => { if (aperta) tasti(aperta, e); });

  // I pulsanti blu-viola sulle slide della lezione
  document.querySelectorAll("[data-apri]").forEach(b => b.addEventListener("click", () => {
    const d = document.getElementById("approf-" + b.dataset.apri);
    if (d) apri(d, null);
  }));

  // Gli indirizzi: #1-1-a3 apre l'approfondimento su quella slide
  function dallIndirizzo() {
    const id = decodeURIComponent(location.hash.slice(1));
    const d = diChi.get(id);
    if (d) apri(d, id);
    else if (aperta) {
      // Un link verso una slide della lezione: si chiude e si va lì
      if (document.getElementById(id)) aperta.dataset.verso = id;
      aperta.close();
    }
  }
  window.addEventListener("hashchange", dallIndirizzo);
  dallIndirizzo();
})();

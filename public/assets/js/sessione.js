/* Mostra chi è entrato, leggendo il cookie noema_chi che il middleware
   scrive all'accesso («nome» oppure «nome|admin»). Serve solo a mostrare:
   i permessi veri li controlla il middleware sul server. */
(function () {
  const voce = document.cookie.split("; ").find(c => c.startsWith("noema_chi="));
  if (!voce) return;
  let valore = "";
  try { valore = decodeURIComponent(voce.slice("noema_chi=".length)); } catch (e) { return; }
  const [nome, ruolo] = valore.split("|");
  if (!nome) return;
  document.querySelectorAll("[data-utente]").forEach(e => {
    const b = e.querySelector("b");
    if (b) b.textContent = nome;
    e.hidden = false;
  });
  if (ruolo === "admin") document.querySelectorAll("[data-solo-admin]").forEach(e => { e.hidden = false; });
})();

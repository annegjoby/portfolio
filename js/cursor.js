// Egen musepeker, inspirert av garri.design:
// en liten prikk som følger musen, vokser over lenker og blir en sirkel med tekst over prosjekter.
// Kun på enheter med mus og bred skjerm. Ellers beholdes vanlig peker.
// Pekeren er tre lag (se css/style.css) som sammen gjør at alt under pekeren byttes til to farger.
const fine = window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 801px)");

if (fine.matches) {
  const makeLayer = (name) => {
    const layer = document.createElement("div");
    layer.className = `cursor cursor--${name}`;
    layer.setAttribute("aria-hidden", "true");
    layer.innerHTML = '<div class="cursor__dot"><span class="cursor__message"></span></div>';
    document.body.append(layer);
    return layer;
  };

  const layers = [makeLayer("filter"), makeLayer("multiply"), makeLayer("lighten")];
  const message = layers[0].querySelector(".cursor__message");
  const toggle = (name, on) => layers.forEach((l) => l.classList.toggle(name, on));

  document.documentElement.classList.add("has-cursor");

  let x = 0;
  let y = 0;
  let frame = 0;

  // Setter utseendet ut fra hva som ligger under pekeren akkurat nå
  function render() {
    frame = 0;
    layers.forEach((l) => { l.style.transform = `translate(${x}px, ${y}px)`; });

    const el = document.elementFromPoint(x, y);
    const hit = el?.closest("[data-cursor], a[href], button");
    const label = el?.closest("[data-cursor]")?.dataset.cursor;

    toggle("cursor_hover", !!hit);
    toggle("cursor_message", !!label);
    toggle("cursor_solid", !!el?.closest(".intro-photo"));
    message.textContent = label || "";
  }

  const schedule = () => { frame ||= requestAnimationFrame(render); };

  document.addEventListener("pointermove", (e) => {
    x = e.clientX;
    y = e.clientY;
    toggle("cursor_active", true);
    schedule();
  });

  // Innholdet kan endre seg under en stillestående peker (menyvalg, scrolling, tilbakeknapp)
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("popstate", schedule);
  document.addEventListener("click", () => requestAnimationFrame(schedule));

  const release = () => toggle("cursor_down", false);
  const hide = () => { release(); toggle("cursor_active", false); };

  document.addEventListener("pointerdown", () => toggle("cursor_down", true));
  document.addEventListener("pointerup", release);
  document.addEventListener("pointercancel", release);
  document.addEventListener("dragstart", release);

  // Når siden mister fokus (mailto, ny fane) kommer ikke alltid pointerup
  window.addEventListener("blur", hide);
  document.addEventListener("visibilitychange", hide);
  document.documentElement.addEventListener("pointerleave", hide);
  document.documentElement.addEventListener("mouseleave", hide);
}

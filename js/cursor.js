// Egen musepeker, inspirert av garri.design:
// en liten prikk som følger musen, vokser over lenker og blir en sirkel med tekst over prosjekter.
// Kun på enheter med mus og bred skjerm. Ellers beholdes vanlig peker.
const fine = window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 801px)");

if (fine.matches) {
  const cursor = document.createElement("div");
  cursor.className = "cursor";
  cursor.setAttribute("aria-hidden", "true");
  cursor.innerHTML = '<div class="cursor__dot"><span class="cursor__message"></span></div>';
  document.body.append(cursor);

  const message = cursor.querySelector(".cursor__message");
  document.documentElement.classList.add("has-cursor");

  let x = 0;
  let y = 0;
  let frame = 0;

  // Setter utseendet ut fra hva som ligger under pekeren akkurat nå
  function render() {
    frame = 0;
    cursor.style.transform = `translate(${x}px, ${y}px)`;

    const el = document.elementFromPoint(x, y);
    const hit = el?.closest("[data-cursor], a[href], button");
    const label = el?.closest("[data-cursor]")?.dataset.cursor;

    cursor.classList.toggle("cursor_hover", !!hit);
    cursor.classList.toggle("cursor_message", !!label);
    message.textContent = label || "";
  }

  const schedule = () => { frame ||= requestAnimationFrame(render); };

  document.addEventListener("pointermove", (e) => {
    x = e.clientX;
    y = e.clientY;
    cursor.classList.add("cursor_active");
    schedule();
  });

  // Innholdet kan endre seg under en stillestående peker (menyvalg, scrolling, tilbakeknapp)
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("popstate", schedule);
  document.addEventListener("click", () => requestAnimationFrame(schedule));

  const release = () => cursor.classList.remove("cursor_down");
  const hide = () => { release(); cursor.classList.remove("cursor_active"); };

  document.addEventListener("pointerdown", () => cursor.classList.add("cursor_down"));
  document.addEventListener("pointerup", release);
  document.addEventListener("pointercancel", release);
  document.addEventListener("dragstart", release);

  // Når siden mister fokus (mailto, ny fane) kommer ikke alltid pointerup
  window.addEventListener("blur", hide);
  document.addEventListener("visibilitychange", hide);
  document.documentElement.addEventListener("pointerleave", hide);
  document.documentElement.addEventListener("mouseleave", hide);
}

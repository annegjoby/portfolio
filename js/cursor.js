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

  document.addEventListener("pointermove", (e) => {
    cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    cursor.classList.add("cursor_active");

    const target = e.target.closest("[data-cursor], a, button");
    const label = e.target.closest("[data-cursor]")?.dataset.cursor;

    cursor.classList.toggle("cursor_hover", !!target);
    cursor.classList.toggle("cursor_message", !!label);
    message.textContent = label || "";
  });

  document.documentElement.addEventListener("pointerleave", () => cursor.classList.remove("cursor_active"));
  document.addEventListener("pointerdown", () => cursor.classList.add("cursor_down"));
  document.addEventListener("pointerup", () => cursor.classList.remove("cursor_down"));
}

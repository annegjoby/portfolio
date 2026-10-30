// Prosjektkort fra projects.js
const list = document.getElementById("project-list");

projects.forEach((p) => {
  const card = document.createElement("article");
  card.className = "card";
  card.dataset.cursor = "Se";

  const title = document.createElement("h3");
  title.textContent = p.title;

  const desc = document.createElement("p");
  desc.textContent = p.description;

  const links = document.createElement("p");
  p.links.forEach((l, i) => {
    if (i > 0) links.append(" · ");
    const a = document.createElement("a");
    a.href = l.url;
    a.textContent = l.label;
    links.append(a);
  });

  card.append(title, desc, links);
  list.append(card);
});

// Bytt innhold basert på menyvalg.
// Desktop: høyre side viser alltid en side (starter med prosjekter).
// Mobil: uten valgt side vises bare presentasjonen ("hjem").
const panels = document.querySelectorAll(".panel");
const navLinks = document.querySelectorAll(".site-nav a");
const mobile = window.matchMedia("(max-width: 800px)");
const defaultPanel = "prosjekter";
const introText = document.querySelector(".intro-text");

const isPanel = (id) => !!document.getElementById(id)?.classList.contains("panel");

function show(id) {
  if (!isPanel(id)) id = mobile.matches ? null : defaultPanel;
  panels.forEach((p) => { p.hidden = p.id !== id; });
  navLinks.forEach((a) => {
    if (id && a.hash === `#${id}`) a.setAttribute("aria-current", "page");
    else a.removeAttribute("aria-current");
  });
  document.body.dataset.view = id ? "panel" : "home";
  document.body.dataset.page = id || "";

  // På Om meg er presentasjonsteksten ikke lenger en lenke til siden
  if (id === "om") introText.removeAttribute("data-cursor");
  else introText.dataset.cursor = "Om meg";
}

document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    e.preventDefault();
    const id = a.hash.slice(1);
    history.pushState(null, "", isPanel(id) ? a.hash : location.pathname);
    show(id);
    window.scrollTo(0, 0);
  });
});

window.addEventListener("popstate", () => show(location.hash.slice(1)));

// Navnet er "hjem" på mobil. På desktop er det vanlig tekst, ikke en lenke.
const logo = document.querySelector(".logo");
function syncLogo() {
  if (mobile.matches) logo.setAttribute("href", "#hjem");
  else logo.removeAttribute("href");
}

mobile.addEventListener("change", () => { show(location.hash.slice(1)); syncLogo(); });
show(location.hash.slice(1));
syncLogo();


// Prosjektkort fra projects.js
const list = document.getElementById("project-list");

projects.forEach((p) => {
  const card = document.createElement("article");
  card.className = "card";

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

const isPanel = (id) => !!document.getElementById(id)?.classList.contains("panel");

function show(id) {
  if (!isPanel(id)) id = mobile.matches ? null : defaultPanel;
  panels.forEach((p) => { p.hidden = p.id !== id; });
  navLinks.forEach((a) => {
    if (id && a.hash === `#${id}`) a.setAttribute("aria-current", "page");
    else a.removeAttribute("aria-current");
  });
  document.body.dataset.view = id ? "panel" : "home";
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
mobile.addEventListener("change", () => show(location.hash.slice(1)));
show(location.hash.slice(1));

document.getElementById("year").textContent = new Date().getFullYear();

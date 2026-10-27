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

// Bytt innhold på høyre side basert på menyvalg
const panels = document.querySelectorAll(".panel");
const navLinks = document.querySelectorAll(".site-nav a");
const defaultPanel = "prosjekter";

function show(id) {
  if (!document.getElementById(id)?.classList.contains("panel")) id = defaultPanel;
  panels.forEach((p) => { p.hidden = p.id !== id; });
  navLinks.forEach((a) => {
    if (a.hash === `#${id}`) a.setAttribute("aria-current", "page");
    else a.removeAttribute("aria-current");
  });
}

document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    e.preventDefault();
    history.pushState(null, "", a.hash);
    show(a.hash.slice(1));
    window.scrollTo(0, 0);
  });
});

window.addEventListener("popstate", () => show(location.hash.slice(1)));
show(location.hash.slice(1));

document.getElementById("year").textContent = new Date().getFullYear();

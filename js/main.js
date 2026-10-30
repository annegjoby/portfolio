// Prosjektkort fra projects.js. Hvert kort lenker til prosjektsiden (#prosjekter/<slug>).
const list = document.getElementById("project-list");

projects.forEach((p) => {
  const card = document.createElement("article");
  card.className = "card";
  card.dataset.cursor = "Se";

  const title = document.createElement("h3");
  title.textContent = p.title;

  const desc = document.createElement("p");
  desc.textContent = p.description;

  const link = document.createElement("p");
  const a = document.createElement("a");
  a.href = `#prosjekter/${p.slug}`;
  a.textContent = "Les casen";
  link.append(a);

  card.append(title, desc, link);
  list.append(card);
});

// Prosjektside: tittel, fakta, tekst og bilder for ett prosjekt
const detail = document.getElementById("project-detail");

function renderProject(p) {
  const back = document.createElement("a");
  back.className = "back";
  back.href = "#prosjekter";
  back.textContent = "← Prosjekter";

  const title = document.createElement("h3");
  title.className = "detail-title";
  title.textContent = p.title;

  const lead = document.createElement("p");
  lead.className = "detail-lead";
  lead.textContent = p.description;

  const facts = document.createElement("p");
  facts.className = "detail-facts";
  facts.textContent = [p.year, p.role].filter(Boolean).join(" · ");

  const body = (p.body || []).map((text) => {
    const para = document.createElement("p");
    para.textContent = text;
    return para;
  });

  const images = (p.images || []).map((src) => {
    const img = document.createElement("img");
    img.src = src;
    img.alt = "";
    img.loading = "lazy";
    return img;
  });

  detail.replaceChildren(back, title, lead, facts, ...body, ...images);
}

// Hva adressen betyr:
//   #prosjekter          liste over prosjekter
//   #prosjekter/<slug>   ett prosjekt
//   #om, #kontakt        egne sider på desktop, deler av den lange siden på mobil
//   (tom)                desktop: prosjekter. Mobil: toppen av den lange siden.
// På mobil er hjem én lang side: presentasjon, bilde, prosjekter, CV og kontakt.
const panels = document.querySelectorAll(".panel");
const navLinks = document.querySelectorAll(".site-nav a");
const mobile = window.matchMedia("(max-width: 800px)");
const introText = document.querySelector(".intro-text");

function parse(hash) {
  const [base, slug] = hash.split("/");
  const project = projects.find((p) => p.slug === slug);
  if (base === "prosjekter" && project) return { view: "prosjekt", project };
  if (base === "prosjekter" && !slug) return { view: "prosjekter" };
  if (base === "om" || base === "kontakt") return { view: base };
  return { view: null };
}

function show(hash) {
  const { view, project } = parse(hash);

  // Hvilke paneler som vises
  let visible;
  if (mobile.matches) {
    visible = view === "prosjekt" ? ["prosjekt"] : ["prosjekter", "om", "kontakt"];
  } else {
    visible = [view || "prosjekter"];
  }
  if (project) renderProject(project);
  panels.forEach((p) => { p.hidden = !visible.includes(p.id); });

  // Valgt menypunkt (på mobil er alt på samme side, så ingen er valgt)
  const current = view === "prosjekt" ? "prosjekter" : view;
  navLinks.forEach((a) => {
    const selected = !mobile.matches && a.hash.slice(1) === (current || "prosjekter");
    if (selected) a.setAttribute("aria-current", "page");
    else a.removeAttribute("aria-current");
  });

  document.body.dataset.view = mobile.matches && view !== "prosjekt" ? "home" : "panel";
  document.body.dataset.page = mobile.matches ? "" : visible[0];

  // På Om meg er presentasjonsteksten ikke lenger en lenke til siden
  if (!mobile.matches && visible[0] !== "om") introText.dataset.cursor = "Om meg";
  else introText.removeAttribute("data-cursor");
}

// Etter et valg: på mobil scroller vi til riktig del av den lange siden, ellers til toppen
function reveal(hash) {
  const { view } = parse(hash);
  const section = mobile.matches && ["prosjekter", "om", "kontakt"].includes(view);
  if (section) document.getElementById(view).scrollIntoView();
  else window.scrollTo(0, 0);
}

document.addEventListener("click", (e) => {
  const a = e.target.closest('a[href^="#"]');
  if (!a) return;
  e.preventDefault();
  const hash = a.hash.slice(1);
  history.pushState(null, "", parse(hash).view ? a.hash : location.pathname);
  show(hash);
  reveal(hash);
});

window.addEventListener("popstate", () => {
  show(location.hash.slice(1));
  reveal(location.hash.slice(1));
});

// Navnet er "hjem" (toppen på mobil, prosjekter på desktop).
// Presentasjonsteksten lenker til Om meg på desktop, men er vanlig tekst på mobil.
const introLink = document.querySelector(".intro-link");

function syncLinks() {
  if (mobile.matches) introLink.removeAttribute("href");
  else introLink.setAttribute("href", "#om");
}

mobile.addEventListener("change", () => { show(location.hash.slice(1)); syncLinks(); });
show(location.hash.slice(1));
syncLinks();
if (location.hash) reveal(location.hash.slice(1));

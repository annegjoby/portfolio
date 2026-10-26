// Prosjektkort fra projects.js
const list = document.getElementById("project-list");

projects.forEach((p) => {
  const card = document.createElement("article");
  card.className = "card";

  const title = document.createElement("h3");
  title.textContent = p.title;

  const desc = document.createElement("p");
  desc.textContent = p.description;

  const tags = document.createElement("ul");
  tags.className = "tags";
  p.tags.forEach((t) => {
    const li = document.createElement("li");
    li.textContent = t;
    tags.append(li);
  });

  const links = document.createElement("p");
  p.links.forEach((l, i) => {
    if (i > 0) links.append(" · ");
    const a = document.createElement("a");
    a.href = l.url;
    a.textContent = l.label;
    links.append(a);
  });

  card.append(title, desc, tags, links);
  list.append(card);
});

// Mobilmeny
const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".site-nav");

toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", open);
});

nav.addEventListener("click", () => {
  nav.classList.remove("open");
  toggle.setAttribute("aria-expanded", "false");
});

// Marker aktiv seksjon i menyen
const links = document.querySelectorAll(".site-nav a");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        links.forEach((a) => a.classList.toggle("active", a.hash === `#${e.target.id}`));
      }
    });
  },
  { rootMargin: "-40% 0px -55% 0px" }
);
document.querySelectorAll("main section").forEach((s) => observer.observe(s));

document.getElementById("year").textContent = new Date().getFullYear();

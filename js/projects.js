// Legg til nye prosjekter her – ett objekt per prosjekt.
// slug: brukes i adressen (#prosjekter/<slug>) og må være unik, uten mellomrom og æøå.
// body: avsnitt som vises på prosjektsiden. images: valgfri liste med bildestier (f.eks. "assets/prosjekt-1/bilde.jpg").
const projects = [
  {
    slug: "prosjekt-1",
    title: "Prosjekt 1",
    description: "Kort beskrivelse av problemet, din rolle og resultatet.",
    year: "2024",
    role: "UX-designer",
    body: [
      "Her kommer en lengre beskrivelse av prosjektet: hva problemet var, hvordan du jobbet med det og hva resultatet ble.",
    ],
    images: [],
  },
  {
    slug: "prosjekt-2",
    title: "Prosjekt 2",
    description: "Kort beskrivelse av problemet, din rolle og resultatet.",
    year: "2023",
    role: "UX-designer",
    body: [
      "Her kommer en lengre beskrivelse av prosjektet: hva problemet var, hvordan du jobbet med det og hva resultatet ble.",
    ],
    images: [],
  },
];

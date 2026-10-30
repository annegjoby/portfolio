# Portefølje

Enkel CV- og porteføljeside i ren HTML, CSS og JavaScript.

- Rediger tekst i `index.html`
- Legg til prosjekter i `js/projects.js`
- Test lokalt: `python3 -m http.server` og åpne http://localhost:8000

## Husk å oppdatere når presentasjonsteksten endres

Presentasjonsteksten øverst på siden (`<h1>` i `index.html`) står også på tre andre steder.
Endrer du den, må du oppdatere dem alle, ellers viser delte lenker og søkeresultater gammel tekst:

1. `<meta name="description">` i `<head>` i `index.html`
2. `<meta property="og:description">` i `<head>` i `index.html`
3. Delingsbildet `assets/og.jpg`:
   - åpne `tools/delingsbilde.html` i nettleseren (gjennom en lokal server, se over)
   - lim inn den nye teksten, trykk «Last ned og.jpg»
   - legg den nedlastede filen i `assets/` og erstatt den gamle

Skifter du portrettet (`assets/anne.jpg`) bør delingsbildet lages på nytt også.
Tittelen i fanen og i forhåndsvisningen er bare navnet (`<title>` og `og:title`).

LinkedIn, Slack og andre husker gamle forhåndsvisninger en stund. Bruk for eksempel
LinkedIns Post Inspector for å hente en ny.

## Ikoner

`assets/favicon.svg`, `assets/favicon-32.png` og `assets/apple-touch-icon.png`:
smørgul bakgrunn med en burgunder prikk (som musepekeren).

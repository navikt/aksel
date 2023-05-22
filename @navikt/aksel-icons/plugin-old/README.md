![](/src/app/assets/gh-cover.png)

# Aksel Icons plugin

Denne pluginen gir deg mulighet til å se gjennom alle ikonene i Aksel sin ikonpakke fra npm, så du slipper å hente nye oppdateringer fra Figma Community. Pluginen er et sideprosjekt, så om noe ser feil ut, er det nok sikkert det.

Referer til [den offisielle nettsiden](https://aksel.nav.no/ikoner) for å se alle ikonene.
Har du ønsker om nye ikoner, eller ønsker å bidra med å lage nye, lag et issue på [GitHub-repoet for designsystemet](https://github.com/navikt/aksel).
_Lenke til pluginen kommer så fort den blir godkjent av Figma._

## Manglende funksjonalitet

- [ ] Kunne søke på navn
- [ ] Kunne filtrere på kategori
- [ ] Velge mellom fill og stroke versjon
- [ ] Velge farge
- [ ] Velge størrelse
- [x] Vise de nyeste ikonene i en egen kategori først
- [x] _Style pluginen så den ser litt bedre ut_

## Quickstart (I tilfelle jeg glemmer det på et tidspunkt)

- Run `yarn` to install dependencies.
- Run `yarn build:watch` to start webpack in watch mode.
- Open `Figma` -> `Plugins` -> `Development` -> `Import plugin from manifest...` and choose `manifest.json` file from this repo.

⭐ To change the UI of your plugin (the react code), start editing [App.tsx](./src/app/components/App.tsx).  
⭐ To interact with the Figma API edit [controller.ts](./src/plugin/controller.ts).  
⭐ Read more on the [Figma API Overview](https://www.figma.com/plugin-docs/api/api-overview/).

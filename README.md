<h1 align="center">
  <img src="https://raw.githubusercontent.com/navikt/aksel/main/aksel.nav.no/website/public/favicon.svg" width="96" alt="Aksel logo" />
  <br /><br />Aksel
</h1>

<div align="center">
  <p>NAV designsystem - React-komponenter, CSS, tokens, ikoner og dokumentasjon</p>
  <p>
    <a href="https://www.npmjs.com/package/@navikt/ds-react"><img alt="npm" src="https://img.shields.io/npm/v/@navikt/ds-react?label=Version" /></a>&nbsp;
  </p>
  <p>
    <a href="https://aksel.nav.no">aksel.nav.no</a> &nbsp;·&nbsp;
    <a href="https://aksel.nav.no/komponenter">Komponenter</a> &nbsp;·&nbsp;
    <a href="https://aksel.nav.no/storybook/">Storybook</a> &nbsp;·&nbsp;
    <a href="https://github.com/navikt/aksel/issues">Issues</a>
  </p>
</div>

---

## Dokumentasjon

For å komme i gang, se [Aksel dokumentasjonen](https://aksel.nav.no/grunnleggende/introduksjon/kom-i-gang-med-kodepakkene)

## Kommandoer

| Kommando         | Beskrivelse                                |
| ---------------- | ------------------------------------------ |
| `yarn boot`      | Bygger alle pakker (topologisk rekkefølge) |
| `yarn dev`       | Starter dokumentasjonssiden                |
| `yarn storybook` | Starter Storybook                          |
| `yarn test`      | Kjører alle tester                         |
| `yarn lint`      | Kjører ESLint, Stylelint og Biome          |
| `yarn clean`     | Fjerner genererte filer                    |
| `yarn changeset` | Oppretter en ny versjon.                   |

## Repo-struktur

```
@navikt/
├── core/react      # @navikt/ds-react
├── core/css        # @navikt/ds-css
├── core/tokens     # @navikt/ds-tokens
├── core/tailwind   # @navikt/ds-tailwind
├── aksel-icons     # @navikt/aksel-icons
├── aksel-stylelint # @navikt/aksel-stylelint
└── aksel           # @navikt/aksel

aksel.nav.no/
├── website         # Next.js-app (dokumentasjonsside)
├── website/sanity  # Sanity CMS
└── playroom        # aksel.nav.no/sandbox
```

## Bidra

Se [CONTRIBUTING.md](https://github.com/navikt/aksel/blob/main/CONTRIBUTING.md) for mer informasjon.

## Lisens

[MIT](https://github.com/navikt/aksel/blob/main/LICENSE)

## Kontakt

Løsningen forvaltes av team Aksel i Nav. Ta kontakt på Slack [#aksel-designsystemet](https://nav-it.slack.com/archives/C7NE7A8UF).

## Contributors

<a href="https://github.com/navikt/aksel/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=navikt/aksel" alt="Contributors" />
</a>

## Thanks

<a href="https://www.chromatic.com/"><img src="https://user-images.githubusercontent.com/321738/84662277-e3db4f80-af1b-11ea-88f5-91d67a5e59f6.png" width="153" height="30" alt="Chromatic" /></a>

Thanks to [Chromatic](https://www.chromatic.com/) for providing the visual testing platform that helps us review UI changes and catch visual regressions.

---

Dette repoet bruker GitHub Copilot til å generere kode.

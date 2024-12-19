<h1 align="center">
    <img src="/aksel.nav.no/website/public/favicon.svg" style="width:13rem"/>
    <br/><br/>Aksel
</h1>

<div align="center">
    <p>
        Navs designsystem + Aksel.nav.no
    </p>
    <div align="center">
      <a href="https://aksel.nav.no/storybook/">
          <img src="https://shields.io/badge/storybook-white?logo=storybook&style=flat"" />
      </a>
      <a href="https://github.com/navikt/aksel/pulls">
          <img src="https://img.shields.io/badge/PRs-welcome-green.svg?color=%23262626"" />
      </a>
        <a href="https://www.npmjs.com/package/@navikt/ds-css"><img alt="npm" src="https://img.shields.io/npm/v/@navikt/ds-css?label=version"></a>
    </div>
    <br/>
    <a href="https://aksel.nav.no">Nettside</a> | <a href="https://github.com/navikt/aksel/issues">Issues</a>
<br/>
</div>

## Innhold

```sh
@navikt/
├── core/react      # @navikt/ds-react, kjernekomponenter
├── core/css        # @navikt/ds-css, css kjernekomponenter
├── core/tokens     # @navikt/ds-tokens, tokens
├── core/tailwind   # @navikt/ds-tailwind, tailwind-config
├── aksel-icons     # @navikt/aksel-icons, ikonpakke
├── aksel-stylelint # @navikt/aksel-stylelint, stylelint-config
└── aksel           # @navikt/aksel, kommandolinje-verktøy

aksel.nav.no/
├── website # NEXT.JS app (v13)
├── website/sanity # Sanity CMS-app (v3)
└── playroom # aksel.nav.no/sandbox

```

## Commands

Installer dependencies og bygg workspace

```sh
yarn && yarn boot
```

### Tilgang til Github Package Registry

Siden vi bruker avhengigheter som ligger i GPR, så må man sette opp tilgang til GPR med en PAT (personal access token) som har `read:packages`. Du kan [opprette PAT her](https://github.com/settings/tokens).

I din `.bashrc` eller `.zshrc`, sett følgende miljøvariabel:

`export NPM_AUTH_TOKEN=<din PAT med read:packages>`

### Shortcuts

| Command                   | Script                                                                                                 |
| ------------------------- | ------------------------------------------------------------------------------------------------------ |
| `yarn boot`               | Bygger alle pakker                                                                                     |
| `yarn storybook`          | Starter storybook                                                                                      |
| `yarn dev`                | Starter aksel-nettsiden [(Mer info)](https://github.com/navikt/aksel/blob/main/aksel.nav.no/README.md) |
| `yarn example:shadow-dom` | Starter demo-app med shadow-dom                                                                        |
| `yarn lint`               | Linter react and css workspaces                                                                        |
| `yarn test`               | Kjører tester                                                                                          |
| `yarn clean`              | Fjerner genererte filer                                                                                |
| `yarn changeset`          | Ny versjon-entry [(how-to)](https://github.com/navikt/aksel/blob/main/.changeset/README.md)            |

## Bidra

Vi tar gjerne i mot PR-er! [CONTRIBUTING.md](https://github.com/navikt/aksel/blob/main/CONTRIBUTING.md)

## Lisenser

[MIT](https://github.com/navikt/aksel/blob/main/LICENSE)

## Codeowners

Løsningen forvaltes av team Aksel

[Slack](https://nav-it.slack.com/archives/C7NE7A8UF)

## Contributors

<a href="https://github.com/navikt/aksel/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=navikt/aksel" />
</a>

## Thanks

<a href="https://www.chromatic.com/"><img src="https://user-images.githubusercontent.com/321738/84662277-e3db4f80-af1b-11ea-88f5-91d67a5e59f6.png" width="153" height="30" alt="Chromatic" /></a>

Thanks to [Chromatic](https://www.chromatic.com/) for providing the visual testing platform that helps us review UI changes and catch visual regressions.


## Kode generert av GitHub Copilot

Dette repoet bruker GitHub Copilot til å generere kode.

<h1 align="center">
    <img src="https://user-images.githubusercontent.com/26967723/164701858-e8237611-1285-4c68-b9e3-e047499b94cf.svg" />
    <br/>Aksel
</h1>

<div align="center">
    <p>
        NAVs designsystem + Aksel.nav.no
    </p>
    <div align="center">
      <a href="https://aksel.nav.no/storybook/">
          <img src="https://shields.io/badge/storybook-white?logo=storybook&style=flat"" />
      </a>
      <a href="https://github.com/navikt/aksel/pulls">
          <img src="https://img.shields.io/badge/PRs-welcome-green.svg?color=%23262626"" />
      </a>
    </div>
    <div><a href="https://www.npmjs.com/package/@navikt/ds-css"><img alt="npm" src="https://img.shields.io/npm/v/@navikt/ds-css?label=version"></a></div>
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
├── internal/react  # @navikt/ds-react-internal, komponenter interne flater
├── internal/css    # @navikt/ds-css-internal, css interne flater
├── aksel-icons     # @navikt/aksel-icons, ikonpakke
└── aksel           # @navikt/aksel, kommandolinje-verktøy

aksel.nav.no/
├── website # NEXT.JS app (v13)
└── website/sanity # Sanity CMS-app (v3)

```

## Commands

Installer dependencies og bygg workspace

```sh
yarn && yarn boot
```

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

[MIT](https://github.com/navikt/aksel/blob/main/LICENCE)

## Codeowners

Løsningen forvaltes av team Aksel

[Slack](https://nav-it.slack.com/archives/C7NE7A8UF)

## Contributors

<a href="https://github.com/navikt/aksel/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=navikt/aksel" />
</a>

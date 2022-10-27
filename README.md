<h1 align="center">
    <img src="https://user-images.githubusercontent.com/26967723/164701858-e8237611-1285-4c68-b9e3-e047499b94cf.svg" />
    <br/>Aksel
</h1>

<div align="center">
    <p>
        NAVs designsystem og felleskomponenter
    </p>
    <div align="center">
      <a href="https://master--5f801fb2aea7820022de2936.chromatic.com/">
          <img src="https://shields.io/badge/storybook-white?logo=storybook&style=flat"" />
      </a>
      <a href="https://github.com/navikt/Designsystemet/pulls">
          <img src="https://img.shields.io/badge/PRs-welcome-green.svg?color=%23262626"" />
      </a>
      <a href="https://github.com/navikt/Designsystemet/actions/workflows/ci.yml">
          <img src="https://github.com/navikt/Designsystemet/actions/workflows/ci.yml/badge.svg "" />
      </a>
    </div>
    <div><a href="https://www.npmjs.com/package/@navikt/ds-css"><img alt="npm" src="https://img.shields.io/npm/v/@navikt/ds-css?label=%40navikt%2Fds-*"></a></div>
    <br/>
    <a href="https://aksel.nav.no">Nettside</a> | <a href="https://github.com/navikt/Designsystemet/issues">Issues</a>
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
├── icons           # @navikt/ds-icons, ikonpakke
└── codemod         # @navikt/ds-codemod, migrerings-scripts
```

## Commands

Installer dependencies og bygg workspace

```sh
yarn && yarn boot
```

| Command          | Script                                                                                                 |
| ---------------- | ------------------------------------------------------------------------------------------------------ |
| `yarn changeset` | Ny versjon-entry [(how-to)](https://github.com/navikt/Designsystemet/blob/master/.changeset/README.md) |
| `yarn lint`      | Lints react and css workspaces                                                                         |
| `yarn test`      | Runs tests                                                                                             |
| `yarn clean`     | Fjerner genererte filer                                                                                |
| `yarn docgen`    | Generer ts-docs                                                                                        |

## Dokumentasjon

[Dokumentasjon forvaltes i navikt/aksel-website](https://github.com/navikt/aksel-website)

[Migreringer](https://aksel.nav.no/designsystem/side/migrering#beta-til-v1)

## Bidra

Vi tar gjerne i mot PR-er [CONTRIBUTING.md](https://github.com/navikt/Designsystemet/blob/master/CONTRIBUTING.md)

## Lisenser

[MIT](https://github.com/navikt/Designsystemet/blob/master/LICENCE)

## Contributors

<a href="https://github.com/navikt/Designsystemet/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=navikt/Designsystemet" />
</a>

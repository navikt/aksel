# Aksel command line interface

CLI tool for managing CSS-imports and more when consuming Aksel-packages.

[Documentation](https://aksel.nav.no/preview/grunnleggende/kode/kommandolinje)

```bash
run:
npx @navikt/aksel

commands:
css-imports: Generate css-imports for all components from Aksel
codemod: Codemods for version-migrations related to Aksel
```

## Codemods

```bash
To get started:
npx @navikt/aksel codemod --help
```

### v1 -> v2

[Documentation](https://aksel.nav.no/grunnleggende/kode/migrering#h76f47744d112)

v2-css: Patches changed css-variables
v2-js: Patches changed js-variables
v2-sass: Patches changed sass-variables
v2-less: Patches changed less-variables

### beta -> v1

[Documentation](https://aksel.nav.no/grunnleggende/kode/migrering#h50d54a5af8c1)

v1-preset: Runs all codemods for beta -> v1
v1-pagination: Fixes breaking API-changes for <Pagination /> component
v1-tabs: Fixes breaking API-changes for <Tabs /> component
v1-chat: Fixes breaking API-changes for <SpeechBubble /> (now <Chat/>) component

## License

[MIT](https://github.com/navikt/aksel/blob/main/LICENCE)

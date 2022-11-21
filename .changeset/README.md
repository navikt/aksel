# Changesets

For versjonering bruker vi løsningen [Changesets](https://github.com/changesets/changesets) for [versjonering](https://semver.org/) og publisering av pakker.

## Howto

- For å lage en ny versjons-entry: `yarn changeset`
- Velg pakkene som skal versjoneres med `arrowkeys` + `Space`

`🦋 Which packages would you like to include?`

Trykk `Space` for å velge pakkene som skal versjoneres, for så trykke `Enter` for å gå videre.

`🦋 Which packages should have a major bump?`

Trykk `Enter` for å gå videre _*eller*_ velg pakkene som skal marjor-bumpes med `arrowkeys` + `Space`

`🦋 Which packages should have a minor bump?`

Trykk `Enter` for å gå videre _*eller*_ velg pakkene som skal marjor-bumpes med `arrowkeys` + `Space`

Hvis du ikke velger major eller minor, så blir pakkene få en patch-bump

- Commit og push.

## Fixed versjonering

Alle base-pakkene våre har `fixed versjonering`. Dette tilsier at en bump på en av disse vil bumpe alle til samme versjon

```sh
  "@navikt/ds-react",
  "@navikt/ds-css",
  "@navikt/ds-icons",
  "@navikt/ds-tokens",
  "@navikt/ds-tailwind",
  "@navikt/ds-css-internal",
  "@navikt/ds-react-internal",
  "@navikt/ds-codemod"
```

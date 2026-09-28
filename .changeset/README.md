# Changesets

Vi bruker [Changesets](https://github.com/changesets/changesets) for [versjonering](https://semver.org/) og publisering av pakker.

## Lage ny versjon

1. `yarn changeset`
2. Svar på spørsmålene som kommer opp:

`🦋 Which packages would you like to include?`

Trykk `Space` for å velge pakkene som skal versjoneres, trykk så `Enter` for å gå videre.

`🦋 Which packages should have a major bump?`

Trykk `Enter` for å gå videre _eller_ velg pakkene som skal marjor-bumpes med `arrowkeys` + `Space`.

`🦋 Which packages should have a minor bump?`

Trykk `Enter` for å gå videre _eller_ velg pakkene som skal minor-bumpes med `arrowkeys` + `Space`.

Hvis du ikke velger major eller minor, så vil pakkene få en patch-bump.

`Please enter a summary for this change`

Skriv inn en kort beskrivelse av endringen på formatet `<Komponent>: <gitmoji?> <Beskrivelse>`, f.eks. "Button: ✨ Add feature xyz".

3. Commit og push.

## Fixed versjonering

Alle base-pakkene våre har `fixed versjonering`. Dette betyr at en bump på en av disse vil bumpe alle til samme versjon

```sh
  "@navikt/ds-react",
  "@navikt/ds-css",
  "@navikt/ds-tokens",
  "@navikt/ds-tailwind",
  "@navikt/aksel-icons",
  "@navikt/aksel",
  "@navikt/aksel-stylelint"
```

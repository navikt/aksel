# Aksel icons - Bidrag

## Foreslå nye ikoner

Om du ikke finner et ikonet du leter etter kan du [åpne et issue på github](https://github.com/navikt/aksel/issues/new?labels=nytt+✨%2Cikoner+🖼%2Cforespørsel+🥰&template&template=new-icon.yaml&title=%5BNytt+ikon%5D%3A+).

## Oppdatere ikon

Hvis du tenker et ikon fortjener en oppdatering eller er utdatert kan [du foreslå det her.](https://github.com/navikt/aksel/issues/new?labels=forespørsel+🥰&template=update-icon.yml&title=%5BInnspill+til+ikon%5D%3A+)

## Legge til nye ikoner selv

Hvis du selv ønsker å legge til nye ikoner kan du kopiere filenes fra `/template` og legge de inn i `/icons` med egen data. Alle ikonene har naming-format `PascalCase`. Alle ikonene har 1 SVG-fil og 1 tilhørende YML-fil.

### Svg

- Sizing, width og height må være 24x24: `width="24" height="24" `
- Viewbox: `viewBox="0 0 24 24"`
- Fill på path: `fill="#23262A"`

### Yml

```yml
name: Template # Samme som filnavn
category: Template category # Hovedkategori
sub_category: Sub category # Underkategori
keywords: # Samling med søkeord
  - template1
  - template2
  - template3
variant: Stroke # Stroke eller Fill
updated_at: 02.01.2023 # Dato for siste oppdatering
created_at: 01.01.2023 # Dato for opprettelse
```

### Publisere oppdatering

Når du har lagt til nye ikoner kan du opprette en pull request. Denne vil bli automatisk testet og så gått gjennom av Aksel-teamet.
Legg gjerne til en `changeset` ved å kjøre `yarn changeset` i terminalen. Dette vil gi oss bedre oversikt over hva som er endret i endringslogger og automatisk bumpe pakke-versjonen ved merge.

#### Teste nytt ikon

Hvis du ønsker å teste om alt stemmer, både i `svg` og `yml` før du lager en PR kan du kjøre `yarn && cd navikt/aksel-icons && yarn test` i terminalen lokalt.

## Design av nye ikoner

### Generelt

- Designet følger Keyline-malen (under assets i figma-pakken).
- Alle lag og grupper skal bruke `#23262A` for stroke og fill.

### Stroke (linje)

- Ikonet må bestå av kun linjer
- Linjene skal være 1.5px, center-aligned

### Fill (fylt)

- Ikoner hvor shapes kan fylles, bør fylles

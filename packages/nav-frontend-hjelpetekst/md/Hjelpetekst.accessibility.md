## Assosiasjon

Hjelpeteksten bør få en logisk kobling til elementet som det forsøker å beskrive/støtte. I "[Kombinasjon med skjemafelt](/components/hjelpetekst/#kombinasjon-med-skjemafelt)"-eksempelet på Oversikt-siden gjøres dette ved at Hjelpeteksten plasseres inne i skjemafeltets `<label>`-element.

Om hjelpeteksten må plasseres på utsiden av `<label>`, eller på andre måter ikke har noen annen logisk kobling til elementet som det forsøker å beskrive, kan dette løses ved å bruke `aria-describedby` og `aria-labelledby` slik:

```jsx
<span id="mitt-faguttrykk" aria-describedby="min-hjelpetekst">
    Restarbeidsevne
</span>
<Hjelpetekst
    id="min-hjelpetekst"
    aria-labelledby="mitt-faguttrykk"
>
    Mulighet til å jobbe litt eller delvis
</Hjelpetekst>
```

## Mer informasjon

- [WCAG 1.1.1: Ikke-tekstlig innhold](https://uu.difi.no/krav-og-regelverk/wcag-20-standarden/111-ikke-tekstlig-innhold-niva)
- [WCAG 3.3.5: Hjelp](https://uu.difi.no/krav-og-regelverk/wcag-20-standarden/ikke-lovpalagte-krav/335-hjelp-niva-aaa)

# Endringslogg

## 04. desember 2020

### Element for sortering av tabell endres

[#893](https://github.com/navikt/nav-frontend-moduler/pull/893)

- ✅ `<button aria-label="Sorter column synkende">`
- ❌ `<Lenke href="#">`

- Hover og fokusmarkering for element er endret, samt plassering av chevron [Eksempel](https://design.nav.no/components/tabell#sorterbar-tabell)

Hvordan ta i bruk oppdateringen:

- Oppdater `nav-frontend-tabell-styles` til v1.0.0
- Legge til pakken `nav-frontend-knapper-style` som nå er en dependency.
- Endre all bruk av `<Lenke>` i sortert tabell til `<button>`. Kan være lurt å lese de nye punktene her [tabell-UU](https://design.nav.no/components/tabell/accessibility) også da.

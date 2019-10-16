# Endringslogg

> **Obs!** Denne endringsloggen blir manuelt og uregelmessig oppdatert, og er hovedsakelig ment som en grov retrospektiv oppsummering for både tekniske og ikke-tekniske lesere. Det kan dermed ta en stund før publiserte endringer blir loggført her. For å se de siste faktiske endringene kan du ta en titt på [commit-historikken](https://github.com/navikt/nav-frontend-moduler/commits/master), [PR-historikken](https://github.com/navikt/nav-frontend-moduler/pulls?q=is%3Apr+is%3Aclosed) og/eller [release-oversikten](https://github.com/navikt/nav-frontend-moduler/releases) for NPM-pakkene våre.

## 15. oktober 2019

### Nye komponenter

* Tabell: https://design.nav.no/components/tabell
* Ikonknapper: https://design.nav.no/components/ikonknapper

### Endringer

* Fikset støtte for publisering og markering av "beta"-pakker på design.nav.no
* Fikset støtte for å liste opp og vise frem rene "style"-pakker i komponentoversikten på design.nav.no
* Muligheten for å bare innstallere "style"-pakkene har blitt litt tydeligere under "Teknisk" på komponent-sidene
* Fikset støtte for ikoner i knapper: https://design.nav.no/components/knapp#med-ikon
* Fikset aria-varsling og rød markering på tekst-teller når Textarea får for mange tegn: https://github.com/navikt/nav-frontend-moduler/pull/548
* Fikset støtte for React 17.0+ i Ekspanderbartpanel: https://github.com/navikt/nav-frontend-moduler/pull/541 Takk til @erlend.axelsson :tada:
* Fikset støtte for å bruke knappe-stiler på lenker: https://github.com/navikt/nav-frontend-moduler/pull/532
* Tegnbegrensning på Textarea er nå valgfri. Takk til @hakon.planke.holm :tada: https://github.com/navikt/nav-frontend-moduler/pull/490

### Sider publisert på design.nav.no

* Oppdaterte språk-sider: https://design.nav.no/resources/language Takk til @marianne.asheim.friess :tada:
* Tilgjengelighet: https://design.nav.no/accessibility
* Prinsipper for brukeropplevelse på interne flater: https://design.nav.no/resources/internal-ux-principles Takk til @hanna.sofia.hogberg og @elin.thonander.mikkelsen og alle andre som bidro :tada:
* Subdomener: https://design.nav.no/resources/subdomains Takk til @tov.are.jacobsen og @petter.hafskjold :tada:
* Grid: https://design.nav.no/resources/grid
* Typografi: https://design.nav.no/resources/typography

### Bugfikser

* Fikset en gammel og plagsom bug med dårlig font-rendering i Chrome på Windows: https://github.com/navikt/nav-frontend-moduler/pull/557 Takk til @andrii.uvarov :tada:
* Fikset en bug hvor knapper med 100% bredde fikk venstrejustert innhold: https://github.com/navikt/nav-frontend-moduler/pull/532 Takk til @daniel.winsvold :tada:
* Fikset en bug hvor Textarea av og til kunne oppta dobbelt så mye plass som det trengte: https://github.com/navikt/nav-frontend-moduler/pull/530
* Fikset syntax-feil i scaffolding-script: https://github.com/navikt/nav-frontend-moduler/pull/523
* Fikset visuell bug hvor spinner forsvant på knapper med fokus: https://github.com/navikt/nav-frontend-moduler/pull/498

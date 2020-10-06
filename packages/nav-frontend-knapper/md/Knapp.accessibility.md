## Unngå lenker som knapper

For å oppfylle [WCAGs suksesskriterium 1.3.1](https://uu.difi.no/krav-og-regelverk/wcag-20-standarden/131-informasjon-og-relasjoner-niva) skal ting være kodet som det det ser ut som. Derfor skal ting som ser ut som knapper være nettopp knapper og ikke lenker. Du finner eksempler på hvordan navigasjonslenker skal se ut på [komponent-siden for lenker](/components/lenke).

## Bakgrunnskontrast

Ved bruk av standard/sekundær eller flatknapp bør man passe på at bakgrunnsfargen der de plasseres er enten hvit eller lys grå slik at kontrastkravene fra WCAG blir oppfylt.

## Fareknappen

Fareknappen skiller seg bare ut med farge, og bryter dermed egentlig med [WCAGs suksesskriterium 1.4.1](https://uu.difi.no/krav-og-regelverk/wcag-20-standarden/141-bruk-av-farge-niva). Vi har likevel valgt å ikke tilsette noe label for skjermleser. Dette har vi gjort fordi selve navnet på knappen forteller hva son skjer hvis man trykker på den, og fordi en ekstra label vil, etter vår vurdering, kunne snarere tilføye støy enn å skape mer oversikt for skjermleserbrukere.

## Knapper med bare ikon

Husk at knapper med bare ikoner også må få en tekst-verdi av hensyn til skjermlesere. Utility-klassen `sr-only` som gis av [mixins-fila i Core-pakken](https://github.com/navikt/nav-frontend-moduler/blob/master/packages/node_modules/nav-frontend-core/less/_mixins.less) kan brukes for å skjule teksten visuelt - [se eksempel her](/components/knapp/#kompakt).

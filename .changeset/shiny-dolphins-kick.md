---
"@navikt/ds-css": major
---

Oppdatert Modal

- :sparkles: Støtte for header og footer
- :boom: Bruker nå native dialog i stedet for react-modal (med polyfill for eldre nettlesere)
  - Klassen `navds-modal__overlay` er ikke lenger i bruk. For å endre farge kan du bruke token: `::backdrop { --ac-modal-backdrop: white; }`. For annen styling kan du bruke `.navds-modal::backdrop` og `.navds-modal--polyfilled + .backdrop`.
  - Klassen `navds-modal__button--shake` er ikke lenger i bruk
  - Klassen `ReactModal__Body--open` har endret navn til `navds-modal__docbody--open`. Denne klassen tilhørte pakken react-modal, som vi ikke lenger bruker. (Hvis dere av en eller annen grunn har brukt denne pakken til å lage modaler, i tillegg til modal-komponenten i Aksel, må dere kanskje benytte begge klassene.)

---
"@navikt/ds-css": major
---

Oppdatert Modal

- :sparkles: Støtte for header og footer
- :boom: Bruker nå native dialog i stedet for react-modal (med polyfill for eldre nettlesere)
  - Klassen `navds-modal__overlay` er ikke lenger i bruk. For å endre farge kan du bruke token: `::backdrop { --ac-modal-backdrop: white; }`. For annen styling kan du bruke `.navds-modal::backdrop` og `.navds-modal--polyfilled + .backdrop`.
  - Klassen `navds-modal__button--shake` er ikke lenger i bruk

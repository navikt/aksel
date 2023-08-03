---
"@navikt/ds-react": major
---

Oppdatert Modal

- :sparkles: Støtte for header og footer
- :boom: Bruker nå native dialog i stedet for react-modal (med polyfill for eldre nettlesere)
  - `Modal.setAppElement()` er fjernet
  - `onClose` trigges nå _etter_ at modalen er lukket, ikke før (native oppførsel). Hvis du har behov for å hindre at modalen lukkes ved trykk på lukkeknappen (X) eller Esc, bruk `onBeforeClose`.
  - `shouldCloseOnEsc` er fjernet. Du kan hindre at modalen kan lukkes med Esc slik: `onCancel={(e) => e.preventDefault()}`.
  - `shouldCloseOnOverlayClick` er fjernet. Denne oppførselen er uansett ikke anbefalt da det er fort gjort å klikke utenfor ved et uhell.
  - `parentSelector` er fjernet
  - `overlayClassName` er fjernet. For å endre farge kan du bruke token: `::backdrop { --ac-modal-backdrop: white; }`. For annen styling kan du bruke `.navds-modal::backdrop` og `.navds-modal--polyfilled + .backdrop`.
  - `closeButton` er flyttet til headeren. Headeren er ikke synlig som standard, dermed heller ikke lukkeknappen. Men du kan fint ha en tom header med bare lukkeknapp hvis du ønsker.
- Se [dokumentasjonen](https://aksel.nav.no/komponenter/core/modal) for eksempler og mer informasjon om hvordan du bruker den nye modalen på best mulig måte

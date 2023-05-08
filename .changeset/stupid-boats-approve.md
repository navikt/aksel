---
"@navikt/ds-css": major
"@navikt/ds-react": major
"@navikt/ds-react-internal": major
---

Aksels løsninger bruker nå `@navikt/aksel-icons`

**Sideffects:**

- Komponenter som tidligere brukte Expand-ikon har fått oppdatert animasjon.
- Alert bruker samme ikonstørrelse for alle størrelser
- Chips har justert padding/ikonstørrelser
- Datepicker hover-bug på knapper er fikset
- Select har fått justert padding rundt ikon
- Switch bruker samme checkmark som checkbox, er nå også avrundet.
- ReadMore har justert margin for alignment med ikon, fjernet content-animasjon
- Stepper har endret hvordan den håndterer ✔️ -ikon. Hvis du har overskrevet stepper-CSS kan det hende dette må oppdateres lokalt også.
- Tabs bruker default text-default

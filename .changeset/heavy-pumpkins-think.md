---
"@navikt/ds-css": major
"@navikt/ds-react": major
---

Migrerer `Modal`-komponenten til å bruke HTML `<dialog>`-elementet

- `Modal`-komponenten bruker nå HTML `<dialog>`-elementet i stedet for `react-modal`-pakken.
- Flere props er fjernet ved migreringen:
  - `overlayClassName`: Bruk `className::backdrop`-pseudoelementet i stedet.
  - `style`: Style `Modal`-komponentene direkte i stedet.
  - `parentSelector`: Ikke lenger nødvendig.
  - `tabIndex`: Er nå ikke lov å sette. [Ref. MDN.](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog)
- `Modal.setAppElement` er fjernet. Ikke lenger nødvendig.
- Flere props arves nå fra `HTMLDialogElement`:
  - `onClose`
  - `className`
  - `children`
  - `aria-*`
- Flere CSS-klasser er fjernet.
  - `navds-modal__overlay`
  - `navds-modal--focus`
  - `navds-modal__button--shake`

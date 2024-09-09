---
"@navikt/ds-react": major
---

API change for translations

WHAT
Translations now live on the global provider component and we will remove component-level translation props.

WHY
Simplify the translations API, a single point of entry for _all_ components. Work well with i18next

HOW
Wrap your whole app with a `<Provider translations={{...}}>`, or add the translations property to an existing `<Provider>`

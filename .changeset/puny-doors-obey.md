---
"@navikt/ds-react": patch
---

Switch:  `<Switch />` elements inside a `<Fieldset />` with `readOnly` now share a single padlock in the group legend instead of displaying one per switch. Each switch retains screen-reader text indicating its read-only state, and standalone switches keep their individual padlocks.

---
"@navikt/ds-react": patch
---

MonthPicker: `onValidate` from `useMonthpicker` now reports `isInvalid: true` for text that can't be parsed as a month, and `false` for a valid but disabled month.

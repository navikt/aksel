---
"@navikt/ds-react": patch
---

DataGridTable: Keep the keyboard navigation position when the active row is removed, e.g. after loading or changing page. The nearest cell at the same position becomes active instead of resetting to the first cell.

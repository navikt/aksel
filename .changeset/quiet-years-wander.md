---
"@navikt/ds-react": patch
---

DatePicker: Typing a date with an unreasonable year (more than ~150 years from today, or outside `fromDate`/`toDate`) no longer navigates the calendar to that year.

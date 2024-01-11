---
"@navikt/ds-react": minor
---

Accordion.Item, Dropdown, ReadMore og Tooltip: Har en ny prop `onOpenChange?: (open: boolean) => void;` som forteller nå-state når `open`-state endrer seg. Dette vil være nyttig hvis man ikke bruker controlled-state, men fortsatt ønsker å vite om komponenten er `open` eller ikke (f.eks logging).

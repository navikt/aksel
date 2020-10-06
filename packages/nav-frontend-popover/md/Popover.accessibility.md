Trigger-elementet som åpner Popover-komponenten bør få et `aria-controls`-attributt som peker på `id`-attributtet til Popover, og et `aria-haspopup`-attributt som svarer mest mulig til hvilket innhold Popover-komponenten har (vanligvis `dialog`).

Du kan se et eksempel på dette i [implementasjonen av Hjelpetekst](https://github.com/navikt/nav-frontend-moduler/blob/master/packages/node_modules/nav-frontend-hjelpetekst/src/hjelpetekst.tsx), men vær obs på at ditt brukstilfelle kan kreve en litt annerledes løsning.

Det finnes flere forskjellige løsningsforslag på W3 sine nettsider:

- https://www.w3.org/TR/wai-aria-practices-1.1/#menubutton
- https://www.w3.org/TR/wai-aria-practices-1.1/#tooltip

Relevante `aria`-attributter:

- [aria-controls](https://www.w3.org/TR/wai-aria-1.1/#aria-controls)
- [aria-haspopup](https://www.w3.org/TR/wai-aria-1.1/#aria-haspopup)
- [aria-expanded](https://www.w3.org/TR/wai-aria-1.1/#aria-expanded)

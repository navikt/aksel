# Kode-eksempler

Kode-eksempler som blir vist på komponentsider @ aksel.nav.no

## Anatomi

### Struktur

Eksempler må ligge under `eksempler/[gruppe]/[eksempel].tsx`

### Kode

Alle linjer som inneholder `examples/withDsExample` + alt under `// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE` blir automatisk fjernet fra kode-snippet.

Demo-komponent må ha navn `Example` for at CodeSandbox-knapp skal fungere riktig.

`withDsExample` tar imot parametere, se JSDOC for detaljer.

### Args

For å håndtere sortering, kan man sette en index i `args` som da brukes for å bedre sortere eksemplene.

Ved å legge til en `desc` blir en liten tekst vist over eksemplet. Brukes for å gi hint om bruk eller hvordan man ikke skal bruke det spesifikke eksemplet.

```jsx
import { Button } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return <Button>Primary</Button>;
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example);

export const args = {
  index: 0,
  desc: "Primærknapp brukes til xyz",
};
```

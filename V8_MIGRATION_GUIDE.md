# Aksel v8.0.0 Migreringsguide

Denne guiden dekker migreringen fra Aksel v7 til v8, som introduserer **Darkside** som standard designsystem. Darkside bringer forbedret temabehandling, oppdaterte tokens og et mer konsistent API på tvers av alle komponenter.

## 🚀 Rask migrering

Den raskeste måten å migrere på er å bruke våre automatiserte codemods:

```bash
# Kjør alle v8 codemods
npx @navikt/aksel@latest codemod v8-box
npx @navikt/aksel@latest codemod v8-box-new
npx @navikt/aksel@latest codemod v8-list
npx @navikt/aksel@latest codemod v8-tag-variant
npx @navikt/aksel@latest codemod v8-button-variant
npx @navikt/aksel@latest codemod v8-link-variant
npx @navikt/aksel@latest codemod v8-chips-variant
npx @navikt/aksel@latest codemod v8-accordion-variant
npx @navikt/aksel@latest codemod v8-toggle-group-variant
npx @navikt/aksel@latest codemod v8-prop-deprecate
npx @navikt/aksel@latest codemod v8-primitive-spacing
npx @navikt/aksel@latest codemod v8-token-spacing
npx @navikt/aksel@latest codemod v8-token-spacing-js
npx @navikt/aksel@latest codemod v8-tokens
```

---

## 📦 Pakkeendringer

### @navikt/ds-tokens

**Breaking Changes:**

- **Fjernet `/darkside` imports** - Darkside er nå standard
  - ❌ `@navikt/ds-tokens/darkside-css` → ✅ `@navikt/ds-tokens/css`
  - ❌ `@navikt/ds-tokens/darkside-js` → ✅ `@navikt/ds-tokens/js`
  - ❌ `@navikt/ds-tokens/darkside-scss` → ✅ `@navikt/ds-tokens/scss`
  - ❌ `@navikt/ds-tokens/darkside-less` → ✅ `@navikt/ds-tokens/less`

- **Nye spacing-tokens** - Alle spacing-tokens bruker nå `--ax-spacing-*` prefiks
  - Kjør `npx @navikt/aksel@latest codemod v8-token-spacing` for CSS/SCSS/LESS
  - Kjør `npx @navikt/aksel@latest codemod v8-token-spacing-js` for JavaScript

**Migrering:**

```diff
- import "@navikt/ds-tokens/darkside-css";
+ import "@navikt/ds-tokens/css";

- import tokens from "@navikt/ds-tokens/darkside-js";
+ import tokens from "@navikt/ds-tokens/js";
```

### @navikt/ds-css

**Breaking Changes:**

- **Fjernet `/darkside` import** - Darkside er nå standard
  - ❌ `@navikt/ds-css/darkside` → ✅ `@navikt/ds-css`

- **Fjernet `navds-` prefiks på klasser** - Alle klasser bruker nå standard Darkside-navngivning
- **CDN**: Kun `index.css` og `index.min.css` er tilgjengelig via CDN

**Migrering:**

```diff
- import "@navikt/ds-css/darkside";
+ import "@navikt/ds-css";
```

### @navikt/ds-tailwind

**Breaking Changes:**

- **Fjernet gammel config** - Darkside config er nå standard
  - Vanlig import bruker nå den nye Darkside-baserte konfigurasjonen

**Migrering:**

```diff
// tailwind.config.js
- preset: [require("@navikt/ds-tailwind/old")]
+ preset: [require("@navikt/ds-tailwind")]
```

### @navikt/ds-react

**Nye eksporter:**

- `InlineMessage` - Nå tilgjengelig som separat eksport
- `GlobalAlert` - Nå tilgjengelig som separat eksport
- `InfoCard` - Nå tilgjengelig som separat eksport  
- `LocalAlert` - Nå tilgjengelig som separat eksport

```javascript
import { InlineMessage } from "@navikt/ds-react/InlineMessage";
import { GlobalAlert } from "@navikt/ds-react/GlobalAlert";
import { InfoCard } from "@navikt/ds-react/InfoCard";
import { LocalAlert } from "@navikt/ds-react/LocalAlert";
```

---

## 🔧 Komponentendringer

### Accordion

**Deprecated:**

- `variant` prop - Bruk `data-color` i stedet
  - `variant="neutral"` → `data-color="neutral"`
- `headingSize` prop - Har ingen effekt lenger (fjernet i implementasjonen)

**Migrering:**

```diff
- <Accordion variant="neutral">
+ <Accordion data-color="neutral">
```

Kjør `npx @navikt/aksel@latest codemod v8-accordion-variant` for å migrere automatisk.

### Box

**Breaking Changes:**

- `Box` bruker nå det nye tokensystemet (tidligere `Box.New`)
- `Box.New` er deprecated - bruk `Box` i stedet
- Token-prefikser oppdatert:
  - `background` bruker nå `--ax-bg-*` tokens i stedet for `--a-*`
  - `borderColor` bruker nå `--ax-border-*` tokens
  - `shadow` bruker nå `--ax-shadow-*` tokens

**Deprecated:**

- `Box.New` - Bruk `Box` fra `@navikt/ds-react/Box` i stedet

**Migrering:**

```diff
- <Box.New background="default" borderColor="default">
+ <Box background="default" borderColor="default">
```

```diff
- import { Box } from "@navikt/ds-react";
- <Box.New ... />
+ import { Box } from "@navikt/ds-react/Box";
+ <Box ... />
```

Kjør `npx @navikt/aksel@latest codemod v8-box` for å migrere Box med legacy tokens.  
Kjør `npx @navikt/aksel@latest codemod v8-box-new` for å bytte navn fra Box.New til Box.

### Button

**Deprecated:**

- Variant-basert fargesetting erstattet med `data-color` prop
  - `variant="primary-neutral"` → `variant="primary"` + `data-color="neutral"`
  - `variant="secondary-neutral"` → `variant="secondary"` + `data-color="neutral"`
  - `variant="tertiary-neutral"` → `variant="tertiary"` + `data-color="neutral"`
  - `variant="danger"` → `variant="primary"` + `data-color="danger"`

**Nye props:**

- `data-color` - Styrer knappens farge uavhengig av variant

**Migrering:**

```diff
- <Button variant="primary-neutral">
+ <Button variant="primary" data-color="neutral">

- <Button variant="danger">
+ <Button variant="primary" data-color="danger">
```

Kjør `npx @navikt/aksel@latest codemod v8-button-variant` for å migrere automatisk.

### Chips

**Deprecated:**

- `variant` prop på `Chips.Toggle` - Bruk `data-color` i stedet
  - `variant="action"` → `data-color="accent"` (standard)
  - `variant="neutral"` → `data-color="neutral"`

**Nye props:**

- `data-color` - Styrer chip-farge

**Migrering:**

```diff
- <Chips.Toggle variant="neutral">
+ <Chips.Toggle data-color="neutral">
```

Kjør `npx @navikt/aksel@latest codemod v8-chips-variant` for å migrere automatisk.

### Chat

**Deprecated:**

- `variant` prop - Ingen erstatning, variant-styling fjernet

### CopyButton

**Deprecated:**

- `variant` prop - Ingen erstatning, variant-styling fjernet

### Link

**Deprecated:**

- `variant` prop - Bruk `data-color` i stedet
  - `variant="action"` → `data-color="accent"` (standard)
  - `variant="neutral"` → `data-color="neutral"`
  - `variant="subtle"` → `data-color="neutral"`

**Nye props:**

- `data-color` - Styrer lenke-farge

**Migrering:**

```diff
- <Link variant="neutral">
+ <Link data-color="neutral">
```

Kjør `npx @navikt/aksel@latest codemod v8-link-variant` for å migrere automatisk.

### List

**Breaking Changes - Fjernede props:**

- `title` - Flyttet utenfor komponenten, bruk `<Heading>` før `<List>`
- `description` - Flyttet utenfor komponenten, bruk `<BodyShort>` før `<List>`
- `headingTag` - Ikke lenger nødvendig

**Migrering:**

```diff
- <List title="Min liste" description="Listebeskrivelse">
-   <List.Item>Element 1</List.Item>
- </List>

+ <Heading size="small" as="h3">Min liste</Heading>
+ <BodyShort>Listebeskrivelse</BodyShort>
+ <List>
+   <List.Item>Element 1</List.Item>
+ </List>
```

Kjør `npx @navikt/aksel@latest codemod v8-list` for å migrere automatisk (merk: kan kreve manuelle justeringer).

### Modal

**Endringer:**

- Fjernet `navds-modal__document-body` CSS-klasse - intern endring, ingen brukerhandling nødvendig

### Page (Primitive)

**Deprecated:**

- `background` prop - Har ingen effekt lenger

### Popover

**Deprecated:**

- `arrow` prop - Har ingen effekt lenger, piler vises alltid
- `offset` standard endret fra `16` (med pil) eller `4` (uten) til `8`

### Select

**Breaking Changes - Fjernede props:**

- `htmlSize` - Fjernet, ingen erstatning

**Migrering:**

```diff
- <Select htmlSize={5}>
+ <Select>
```

### Tag

**Breaking Changes:**

- Variant-systemet fullstendig redesignet
- Nye varianter: `outline`, `moderate`, `strong`
- Gamle varianter (`info`, `success`, `warning`, `error`, `alt1`, `alt2`, `alt3`, `neutral` med `-filled` og `-moderate` suffikser) er deprecated men fungerer fortsatt

**Nye props:**

- `data-color` - Styrer tag-farge (standard: `"neutral"`)
- `variant` - Aksepterer nå `"outline"`, `"moderate"` eller `"strong"` (standard: `"outline"`)

**Migrering:**

```diff
- <Tag variant="info-filled">
+ <Tag variant="strong" data-color="info">

- <Tag variant="success-moderate">
+ <Tag variant="moderate" data-color="success">

- <Tag variant="warning">
+ <Tag variant="outline" data-color="warning">
```

Kjør `npx @navikt/aksel@latest codemod v8-tag-variant` for å migrere automatisk.

### Checkbox & Radio

**Endringer:**

- Bruker nå ny implementasjon som standard (tidligere bak feature flag)
- Ingen API-endringer, forbedret styling og tilgjengelighet

### ToggleGroup

**Deprecated:**

- `variant` prop - Bruk `data-color` i stedet
  - Samme migreringsmønster som andre komponenter

Kjør `npx @navikt/aksel@latest codemod v8-toggle-group-variant` for å migrere automatisk.

---

## 🎨 Styling & Tokens

### CSS-variabel prefiksendringer

Alle interne CSS-variabler har blitt oppdatert:

- `--__ac-*` → `--__axc-*`

Dette er en intern endring og bør ikke påvirke konsumentkode med mindre du overstyrer interne variabler.

### Spacing-tokens

Alle spacing-tokens bruker nå `--ax-spacing-*` prefikset:

```diff
- var(--a-spacing-4)
+ var(--ax-spacing-4)
```

Kjør `npx @navikt/aksel@latest codemod v8-token-spacing` for å migrere CSS/SCSS/LESS-filer.  
Kjør `npx @navikt/aksel@latest codemod v8-token-spacing-js` for å migrere JavaScript/TypeScript-filer.

---

## 🛠️ Stylelint

### Nye regler

- `aksel/no-legacy-classes` - Advarer om bruk av legacy `navds-*` klasser

### Fjernede regler

- `aksel/design-token-no-component-reference` - Fjernet siden komponent-tokens ikke lenger eksisterer

### Oppdaterte regler

- Eksisterende regler justert for nye token-prefikser og navnekonvensjoner

---

## 📝 Oppsummering

### Hva er nytt

- **Darkside som standard** - Forbedret temabehandling med bedre støtte for dark mode
- **Enhetlig fargesystem** - `data-color` prop for konsistent fargesetting på tvers av komponenter
- **Nye spacing-tokens** - Mer fleksibelt og semantisk spacing-system
- **Forbedrede komponent-APIer** - Mer konsistent prop-navngivning og oppførsel
- **Bedre tree-shaking** - Mer granulære eksporter for mindre bundle-størrelse

### Breaking Changes

1. Token-importstier endret (fjernet `/darkside`)
2. CSS-importstier endret (fjernet `/darkside`)
3. Box API oppdatert til å bruke nye tokens
4. List-komponent API endret (title/description fjernet)
5. Select `htmlSize` prop fjernet
6. Flere komponent `variant` props deprecated til fordel for `data-color`

### Anbefalte migreringssteg

1. **Oppdater dependencies** til v8.x
2. **Oppdater importer** for tokens og CSS
3. **Kjør codemods** i rekkefølge:
   - Token-migreringer først (`v8-token-spacing`, `v8-token-spacing-js`, `v8-tokens`)
   - Komponent-migreringer deretter (alle `v8-*-variant` codemods)
   - Box-migreringer (`v8-box`, `v8-box-new`)
   - List-migrering (`v8-list`)
   - Property deprecation opprydding (`v8-prop-deprecate`)
4. **Test grundig** - spesielt komponenter med `data-color` endringer
5. **Oppdater egen CSS** hvis du overstyrer Aksel-klasser
6. **Gjennomgå Stylelint-advarsler** for legacy klassebruk

### Trenger du hjelp?

- Fullstendig dokumentasjon: https://aksel.nav.no
- GitHub Issues: https://github.com/navikt/aksel/issues
- Slack: #aksel (intern NAV)

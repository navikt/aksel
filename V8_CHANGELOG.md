# Aksel v8.0.0 Endringslogg

## 🎉 Major Release: Darkside som standard

Aksel v8.0.0 markerer full migrering til **Darkside**, vår nye designsystem-baseline. Denne versjonen bringer forbedret temabehandling, oppdaterte design tokens, et mer konsistent komponent-API og bedre støtte for dark mode.

---

## 📦 Pakkeoppdateringer

### @navikt/ds-tokens

#### ✨ Lagt til

- **Nye standard eksporter** uten `/darkside` suffiks:
  - `@navikt/ds-tokens/css` - CSS custom properties
  - `@navikt/ds-tokens/js` - JavaScript/TypeScript tokens
  - `@navikt/ds-tokens/scss` - SCSS variabler
  - `@navikt/ds-tokens/less` - LESS variabler

#### 💥 Breaking Changes

- **Fjernet** `/darkside` imports:
  - `@navikt/ds-tokens/darkside-css`
  - `@navikt/ds-tokens/darkside-js`
  - `@navikt/ds-tokens/darkside-scss`
  - `@navikt/ds-tokens/darkside-less`
- **Oppdatert** spacing token prefiks: `--a-spacing-*` → `--ax-spacing-*`
- **Fjernet** `docs.json` eksport

#### 🔧 Migreringsverktøy

Kjør `npx @navikt/aksel@latest codemod v8-tokens` for interaktiv token-migrering.

---

### @navikt/ds-css

#### ✨ Lagt til

- Darkside-stiler som standard i hovedeksport

#### 💥 Breaking Changes

- **Fjernet** `/darkside` import-sti
- **Fjernet** alle `navds-` prefiks CSS-klasser
- **Forenklet** bygge-prosess - fjernet PostCSS plugins (cssnano, postcss-combine-duplicated-selectors, etc.)
- **CDN**: Kun `index.css` og `index.min.css` tilgjengelig nå

#### 📝 Endringer

- Flyttet CSS-kilde til `src/`-katalog
- Oppdatert browserslist konfigurasjon
- Interne CSS-variabler bruker nå `--__axc-` prefiks (endret fra `--__ac-`)

---

### @navikt/ds-tailwind

#### 💥 Breaking Changes

- **Fjernet** gammel Tailwind-konfigurasjon
- Hovedimport bruker nå Darkside-basert konfigurasjon

#### 📝 Endringer

- Preset inkluderer automatisk nye design tokens og utilities

---

### @navikt/ds-react

#### ✨ Lagt til

- **Nye granulære eksporter** for bedre tree-shaking:
  - `@navikt/ds-react/InlineMessage`
  - `@navikt/ds-react/GlobalAlert`
  - `@navikt/ds-react/InfoCard`
  - `@navikt/ds-react/LocalAlert`

#### 🔧 Versjonsoppdatering

- Oppdatert fra `v7.33.2` til `v7.35.1`
- Oppdaterte avhengigheter:
  - `@navikt/aksel-icons`: `^7.35.1`
  - `@navikt/ds-tokens`: `^7.35.1`

---

### @navikt/aksel (CLI)

#### ✨ Lagt til

Alle nye v8.0.0 codemods:

1. **`v8-tokens`** - Interaktiv token-migreringsassistent
2. **`v8-box`** - Migrer Box til nytt token-system
3. **`v8-box-new`** - Bytt navn fra Box.New til Box
4. **`v8-list`** - Migrer List-komponent (title/description props)
5. **`v8-tag-variant`** - Oppdater Tag variant + data-color props
6. **`v8-button-variant`** - Oppdater Button variant + data-color props
7. **`v8-link-variant`** - Oppdater Link variant + data-color props
8. **`v8-chips-variant`** - Oppdater Chips variant + data-color props
9. **`v8-accordion-variant`** - Oppdater Accordion variant + data-color props
10. **`v8-toggle-group-variant`** - Oppdater ToggleGroup variant + data-color props
11. **`v8-prop-deprecate`** - Fjern deprecated props fra komponenter
12. **`v8-primitive-spacing`** - Oppdater Primitive spacing tokens
13. **`v8-token-spacing`** - Oppdater CSS/SCSS/LESS spacing tokens
14. **`v8-token-spacing-js`** - Oppdater JavaScript spacing tokens

#### 📝 Endringer

- Lagt til chalk-farging til statusutskrift
- Forbedret codemod-testing og håndtering av edge cases
- Bedre feilmeldinger og migreringsadvarsler

#### 🔧 Avhengigheter

- Oppgradert `chalk` fra `4.1.0` til `5.6.2`
- Oppgradert `clipboardy` fra `2.3.0` til `5.0.0`

---

### @navikt/aksel-stylelint

#### ✨ Lagt til

- **Ny regel**: `aksel/no-legacy-classes` - Advarer om bruk av legacy `navds-*` klasser

#### 💥 Breaking Changes

- **Fjernet regel**: `aksel/design-token-no-component-reference` (komponent-tokens eksisterer ikke lenger)

#### 📝 Endringer

- Justerte regler for nye token-prefikser (`--ax-*` i stedet for `--a-*`)
- Oppdatert token-validering for nytt Darkside token-system

---

## 🔧 Komponentendringer

### Accordion

#### 🗑️ Deprecated

- **`variant`** prop - Bruk `data-color` i stedet
  - `variant="neutral"` → `data-color="neutral"`
- **`headingSize`** prop - Har ingen effekt lenger

#### 🔧 Migrering

Kjør `npx @navikt/aksel@latest codemod v8-accordion-variant`

---

### Alert

#### ✨ Lagt til

- Granulære eksporter tilgjengelig:
  - `GlobalAlert` fra `@navikt/ds-react/GlobalAlert`
  - `LocalAlert` fra `@navikt/ds-react/LocalAlert`
  - `InfoCard` fra `@navikt/ds-react/InfoCard`
  - `InlineMessage` fra `@navikt/ds-react/InlineMessage`

---

### Box

#### 💥 Breaking Changes

- **`Box`** bruker nå nytt token-system (tidligere `Box.New` oppførsel)
- Token-prefikser oppdatert:
  - `background`: `--a-*` → `--ax-bg-*`
  - `borderColor`: `--a-*` → `--ax-border-*`
  - `shadow`: `--a-shadow-*` → `--ax-shadow-*`
- Internt CSS-variabel prefiks: `--__ac-box-*` → `--__axc-box-*`

#### 🗑️ Deprecated

- **`Box.New`** - Bruk `Box` fra `@navikt/ds-react/Box` i stedet

#### 📝 Endringer

- Oppdaterte TypeScript-typer til å bruke nye token-typer fra `@navikt/ds-tokens/types`
- Forbedret token-typesikkerhet med spesifikke token-unions

#### 🔧 Migrering

Kjør `npx @navikt/aksel@latest codemod v8-box` for å migrere Box med legacy tokens.  
Kjør `npx @navikt/aksel@latest codemod v8-box-new` for å bytte navn på Box.New-instanser.

---

### Button

#### 🗑️ Deprecated

- Variant-baserte fargeordninger erstattet med `data-color`:
  - `variant="primary-neutral"` → `variant="primary"` + `data-color="neutral"`
  - `variant="secondary-neutral"` → `variant="secondary"` + `data-color="neutral"`
  - `variant="tertiary-neutral"` → `variant="tertiary"` + `data-color="neutral"`
  - `variant="danger"` → `variant="primary"` + `data-color="danger"`

#### ✨ Lagt til

- **`data-color`** prop - Styrer knappens farge uavhengig av variant

#### 📝 Endringer

- Forenklet CSS-klasselogikk - fjernet variant-spesifikke klasser til fordel for data-attributter
- Forbedret fargekonsistens på tvers av designsystemet

#### 🔧 Migrering

Kjør `npx @navikt/aksel@latest codemod v8-button-variant`

---

### Chat

#### 🗑️ Deprecated

- **`variant`** prop - Ingen effekt, styling håndteres av designsystemet

---

### Chips

#### 🗑️ Deprecated

- **`variant`** prop på `Chips.Toggle` - Bruk `data-color` i stedet
  - `variant="action"` → `data-color="accent"` (standard)
  - `variant="neutral"` → `data-color="neutral"`

#### ✨ Lagt til

- **`data-color`** prop - Styrer chip-farge

#### 🔧 Migrering

Kjør `npx @navikt/aksel@latest codemod v8-chips-variant`

---

### Checkbox

#### 📝 Endringer

- **Bruker nå ny implementasjon som standard**
- Tidligere bak feature flag, nå standard
- Forbedret styling og tilgjengelighet
- Ingen API-endringer påkrevd

---

### CopyButton

#### 🗑️ Deprecated

- **`variant`** prop - Ingen erstatning

---

### Link

#### 🗑️ Deprecated

- **`variant`** prop - Bruk `data-color` i stedet
  - `variant="action"` → `data-color="accent"` (standard)
  - `variant="neutral"` → `data-color="neutral"`
  - `variant="subtle"` → `data-color="neutral"`

#### ✨ Lagt til

- **`data-color`** prop - Styrer lenke-farge

#### 📝 Endringer

- Fjernet variant-spesifikke CSS-klasser
- Forenklet fargelogikk

#### 🔧 Migrering

Kjør `npx @navikt/aksel@latest codemod v8-link-variant`

---

### List

#### 💥 Breaking Changes - Fjernede props

- **`title`** - Flytt til separat `<Heading>`-komponent før `<List>`
- **`description`** - Flytt til separat `<BodyShort>`-komponent før `<List>`
- **`headingTag`** - Ikke lenger nødvendig

#### 📝 Begrunnelse

Forbedret komponentkomposisjon og fleksibilitet ved å separere bekymringer. Titler og beskrivelser bør håndteres utenfor list-komponenten.

#### 🔧 Migrering

Kjør `npx @navikt/aksel@latest codemod v8-list` (kan kreve manuelle justeringer for komplekse tilfeller)

---

### Modal

#### 📝 Endringer

- Fjernet `navds-modal__document-body` CSS-klasse (intern endring)
- Oppdatert test for å unngå "not wrapped in act"-advarsel

---

### Page (Primitive)

#### 🗑️ Deprecated

- **`background`** prop - Har ingen effekt lenger

---

### Popover

#### 🗑️ Deprecated

- **`arrow`** prop - Har ingen effekt lenger (piler vises alltid)

#### 📝 Endringer

- Forenklet offset-beregning: standard endret til `8` (var `16` med pil, `4` uten)
- Fjernet arrow ref og middleware (intern forenkling)
- Renere implementasjon med omit utility for deprecated props

---

### Radio

#### 📝 Endringer

- **Bruker nå ny implementasjon som standard**
- Tidligere bak feature flag, nå standard
- Forbedret styling og tilgjengelighet
- Ingen API-endringer påkrevd

---

### Select

#### 💥 Breaking Changes - Fjernede props

- **`htmlSize`** - Fjernet uten erstatning

---

### Stepper

#### 📝 Endringer

- Beholdt `data-interactive` attributt for CSS-styling-krav

---

### Tag

#### 💥 Breaking Changes

- **Fullstendig redesign av variant-system**
- Nye varianter: `outline`, `moderate`, `strong` (standard: `outline`)
- Gamle varianter deprecated men fortsatt funksjonelle gjennom kompatibilitetslag:
  - Alle `-filled` varianter mapper til `strong`
  - Alle `-moderate` varianter mapper til `moderate`
  - Base varianter mapper til `outline`

#### ✨ Lagt til

- **`data-color`** prop - Styrer tag-farge (standard: `"neutral"`)
- **`variant`** prop - Aksepterer nå `"outline"`, `"moderate"` eller `"strong"`

#### 📝 Endringer

- Fjernet variant-spesifikke CSS-klasser
- Bruker data-attributter for styling
- Forbedret fargekonsistens med resten av designsystemet

#### 🔧 Migrering

Kjør `npx @navikt/aksel@latest codemod v8-tag-variant`

---

### ToggleGroup

#### 🗑️ Deprecated

- **`variant`** prop - Bruk `data-color` i stedet

#### ✨ Lagt til

- **`data-color`** prop - Styrer toggle group-farge

#### 🔧 Migrering

Kjør `npx @navikt/aksel@latest codemod v8-toggle-group-variant`

---

## 🎨 Styling & Temabehandling

### CSS-variabler

#### 💥 Breaking Changes

- Internt CSS-variabel prefiks: `--__ac-*` → `--__axc-*`
- Spacing tokens: `--a-spacing-*` → `--ax-spacing-*`
- Background tokens: `--a-*` → `--ax-bg-*`
- Border tokens: `--a-*` → `--ax-border-*`
- Shadow tokens: `--a-shadow-*` → `--ax-shadow-*`

### Temasystem

#### 📝 Endringer

- Darkside er nå standard (ikke behov for `<Theme>`-komponent for grunnleggende bruk)
- Fjernet legacy-tema sjekker og kondisjonell logikk
- Forenklet tema-kontekst-bruk

---

## 🏗️ Infrastruktur & Verktøy

### Byggesystem

#### 📝 Endringer

- **@navikt/ds-css**: Forenklet byggeprosess med esbuild og lightningcss
- **@navikt/ds-tokens**: Reorganisert kildestruktur (`darkside/` → `src/`)
- Fjernet unødvendige PostCSS plugins
- Forbedret byggeytelse

### Testing

#### ✨ Lagt til

- Nye Vitest-tester for codemod-funksjonalitet
- Forbedret Storybook test-dekning
- Lagt til tester for token-migreringsstatus

#### 📝 Endringer

- Omskrevet gamle testing-library tester for Tooltip og Popover med Storybook
- Refaktorerte Chromatic stories til å bruke hjelpefunksjoner
- Fikset ESLint-feil i tester

### CI/CD

#### ✨ Lagt til

- GitHub Actions workflow for utrulling av v7 dokumentasjon (`aksel-v7-deploy.yml`)
- Trusted publishing for NPM-pakker

#### 📝 Endringer

- Oppdatert Dependabot-konfigurasjon med cooldown og gruppering
- Oppdatert Playwright image-versjon

### Avhengigheter

#### ⬆️ Oppgradert

- `chalk`: `4.1.0` → `5.6.2`
- `clipboardy`: `2.3.0` → `5.0.0`
- `browserslist`: Oppdatert til `^4.25.0`
- `mdast-util-to-hast`: `13.2.0` → `13.2.1`
- Storybook group: 9 pakker oppdatert
- Diverse andre sikkerhets- og vedlikeholdsoppdateringer

#### 🔒 Sikkerhet

- Løst CVE-2025-66478
- Oppdatert `node-forge`: `1.3.1` → `1.3.2`
- Oppdatert `valibot`: `1.1.0` → `1.2.0`

---

## 📚 Dokumentasjon & Eksempler

### Nettsted

#### ✨ Lagt til

- GitHub issue-lenke på 404-side med gjeldende URL
- Ny migreringsdokumentasjon
- Oppdaterte eksempler for alle endrede komponenter

#### 📝 Endringer

- Oppdaterte alle komponenteksempler til å bruke nye APIer
- Migrerte maler til å bruke Darkside
- Justerte farge- og styling-eksempler
- Oppdaterte Select, Checkbox, Switch eksempler
- Fikset eksempelnavigasjon i forhåndsvisningsmodus

### Eksempler

#### 📝 Endringer

- **Alle eksempelapper migrert til v8**:
  - `examples/astro`
  - `examples/next-appdir`
  - `examples/referansesider`
  - `examples/shadow-dom`
- Oppdaterte avhengigheter og konfigurasjoner
- Verifisert kompatibilitet med nytt token-system

---

## 🐛 Feilrettinger

### Accordion

- Fjernet `aria-hidden` for å forhindre SiteImprove tilgjengelighetsproblemer

### Modal

- Fikset test-advarsler om operasjoner ikke pakket i `act()`

### Nettsted

- Lagt til `type="button"` på sidebar subnav expand-knapp for å forhindre form submission

### List

- Lagt til advarsel for deprecated props i utviklingsmodus (før full fjerning)

---

## 🔄 Migreringssti

### Anbefalt rekkefølge

1. **Oppdater pakkeversjoner** til v8.x
2. **Oppdater importer**:
   ```bash
   # Tokens
   npx @navikt/aksel@latest codemod v8-tokens
   
   # CSS i JavaScript
   # Endre: @navikt/ds-css/darkside → @navikt/ds-css
   ```
3. **Kjør spacing codemods**:
   ```bash
   npx @navikt/aksel@latest codemod v8-token-spacing       # CSS/SCSS/LESS
   npx @navikt/aksel@latest codemod v8-token-spacing-js    # JavaScript/TypeScript
   npx @navikt/aksel@latest codemod v8-primitive-spacing   # Primitive-komponenter
   ```
4. **Kjør komponent-variant codemods**:
   ```bash
   npx @navikt/aksel@latest codemod v8-button-variant
   npx @navikt/aksel@latest codemod v8-link-variant
   npx @navikt/aksel@latest codemod v8-tag-variant
   npx @navikt/aksel@latest codemod v8-chips-variant
   npx @navikt/aksel@latest codemod v8-accordion-variant
   npx @navikt/aksel@latest codemod v8-toggle-group-variant
   ```
5. **Kjør Box codemods**:
   ```bash
   npx @navikt/aksel@latest codemod v8-box              # Migrer Box til nye tokens
   npx @navikt/aksel@latest codemod v8-box-new          # Bytt navn Box.New til Box
   ```
6. **Kjør List codemod** (kan kreve manuell gjennomgang):
   ```bash
   npx @navikt/aksel@latest codemod v8-list
   ```
7. **Rydd opp deprecated props**:
   ```bash
   npx @navikt/aksel@latest codemod v8-prop-deprecate
   ```
8. **Test grundig** og oppdater egendefinerte stiler om nødvendig

---

## 📊 Statistikk

- **960 filer endret**, 13 982 innlegg(+), 22 075 slettinger(-)
- **65 commits** i denne versjonen
- **15 nye codemods** for å bistå migrering
- **Alle pakker** synkronisert til v7.35.1

---

## 🙏 Takk

Denne utgivelsen representerer en betydelig milepæl i Aksels utvikling. Takk til alle bidragsytere som hjalp med testing, tilbakemeldinger og migrering av interne NAV-prosjekter til Darkside.

For detaljerte migreringsinstruksjoner og komponentspesifikke endringer, se [Migreringsguiden](./V8_MIGRATION_GUIDE.md).

For spørsmål eller problemer, besøk:
- Dokumentasjon: https://aksel.nav.no
- GitHub: https://github.com/navikt/aksel/issues
- Slack: #aksel (intern NAV)

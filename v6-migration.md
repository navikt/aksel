# Aksel v6 migrations

## Nextjs

Komponenter og ikoner bruker nå `use client`, som betyr at de kan brukes rett ut av boksen i f.eks nextjs app-router. En problematikk er at bundle-size blir ekstremt stor da hele react og ikonpakke blir trukket inn, selv om bare 1 modul blir brukt.
Løsningen er:
`optimizePackageImports: ["@navikt/ds-react", "@navikt/aksel-icons"],`
men må dokumenteres på Aksel. Vurdere å lage en egen `nextjs` side under grunnleggende som går litt i dybden om routing, next/link, app-dir og config.

- https://nextjs.org/docs/app/api-reference/next-config-js/optimizePackageImports
- https://github.com/vercel/next.js/issues/60246
- https://github.com/vercel/next.js/issues/44039
- https://github.com/vercel/next.js/issues/12557

## DatePicker/MonthPicker

`openOnFocus`-prop er fjernet helt fra typer

## ErrorSummary

- Heading-prop er satt som required
- Ny prop `focusTargetRef` for å bedre håndtere fokushåntering
- Hinte om at neste major-versjon kommer til å potensielt endre hvordan ref settes på section (tabIndex fjernes) og at de bør bruke `focusTargetRef`.

## Chat

### Props

Fjernet deprecated props `backgroundColor` og `avatarBgColor`. Bruk prop `variant` som erstatning. Om dette ikke dekker behovet eksponerer komponenten css-variabler som kan overstyres.

## Modal

### Props

Prop-typene er gjort strengere for å gjøre det lettere å gjøre rett, primært for å unngå at `onBeforeClose` brukes når man egentlig burde brukt `onClose`.

- Hvis du bruker propen `open` må du også bruke `onClose` for å holde lokal state oppdatert.
- `onBeforeClose` må returnere `boolean`. Dette callbacket er ment for å brukes til å spørre om bekreftelse før modalen lukkes. Kode som alltid skal kjøre når modalen lukkes må legges i `onClose`.
- `aria-label` eller `aria-labelledby` er påkrevd hvis du ikke bruker `header`. Du kan dessuten ikke bruke de to førstnevnte samtidig.

## Grid

### CSS

Alle klasser med `.navds-grid`-prefix er fjernet

### Brekkpunkt er oppdatert

Før:

- sm:448px
- md:648px
- lg:960px

Etter:

- sm:480px
- md:768px
- lg:1024px
- xl:1280px
- 2xl:1440px

### Eksempel

```jsx
// Før
<Grid>
  <Cell className="cell" xs={12} sm={6} lg={4}>
    Kolonne
  </Cell>
  <Cell className="cell" xs={12} sm={6} lg={4}>
    Kolonne
  </Cell>
  <Cell className="cell" xs={12} sm={12} lg={4}>
    Kolonne
  </Cell>
</Grid>

// Etter
<HGrid columns={{ xs: 1, sm: "1fr 1fr 2fr", lg: "1fr 1fr 1fr" }}>
  <div>Kolonne</div>
  <div>Kolonne</div>
  <div>Kolonne</div>
</HGrid>
```

## ContentContainer

### CSS

Alle klasser med `.navds-content-container`-prefix er fjernet

`--navds-content-container-max-width`-token er fjernet

### Eksempel

`width="xl"` er nærmeste ekvalient til ContentContainer

```jsx
// Før
<ContentContainer>Innhold</ContentContainer>

// Etter
<Page>
  <Page.Block width="xl">
    Innhold
  </Page.Block>
</Page>
```

## Tokens

### Z-index

Fjernet `--a-z-index-modal`-token da systemet nå bruker native `dialog`-element. Dette vil også påvirke brukere av `z-modal` i tailwind.

(Unødvendig med codemod da bare 1 løsning bruker den: https://github.com/search?type=code&q=org%3Anavikt+a-z-index-modal)

### Breakpoint

Nytt brekkpunkt for 1440px `--a-breakpoint-2xl`. Alle primitives støtter også nå 2xl-brekkpunkt for responsive props.

For brukere av vår tailwind-config vil dette også si at `screen` er oppdatert. Dette vil overskrive default tailwind-config som er `1536px`, og de tilfellene der man manuelt har overskrevet f.eks `max-w-screen-2xl` til å være noe annet.

```
"screen": {
  "sm": "480px",
  "md": "768px",
  "lg": "1024px",
  "xl": "1280px",
  "2xl": "1440px"
},
```

### Table

SortState.direction har nå `"none"` tilgjengelig, gir lettere type-håndtering for bruker.

```
export interface SortState {
  orderBy: string;
  direction: "ascending" | "descending" | "none";
}
```

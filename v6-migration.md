# Aksel v6 migrations

## Chat

### Props

Fjernet deprecated props `backgroundColor` og `avatarBgColor`. Bruk prop `variant` som erstatning. Om dette ikke dekker behovet eksponerer komponenten css-variabler som kan overstyres.

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

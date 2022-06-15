## Tabs (BREAKING)

## Styling

- Font-weight fra 600 -> 400

### Props

- `loop` er flyttet fra `Tabs.Tablist` -> `Tabs`
- `iconPosition` er flyttet fra `Tabs.Tab` -> `Tabs`

## SpeechBubble (BREAKING)

Heter nå `Chat`. Brukes nå slik:

```jsx
<Chat>
  <Chat.Bubble>
  <Chat.Bubble>
</Chat>
```

### Styling

Selve boblene har nå bedre padding slik at `Chat` med position `left` og `right` kan brukes etter hverandre uten noen ekstra styling.

### Props

- `illustration` -> `avatar`
- `topText` -> `name` og `timestamp`

## Pagination (BREAKING)

### Props

- Størrelses-skalen er forskøvet. Small -> medium, xsmall <- small. Medium er nå tilpasset eksterne flater.
- `renderItem` lar deg nå bruke eks React.Router for eventhandling på Pagination.Item

## Typography (FEATURE)

- Detail er nå default font-weight `400`. Har fått prop Uppercase

## Tokens (BREAKING)

- `--navds-shadow-popover` er fjernet. Bruk `navds-shadow-medium` som erstattning.
- `--navds-shadow-card` er fjernet. Bruk `navds-shadow-medium` som erstattning

## Deprecated komponenter

### MicroCard

Denne komponenten blir i dag brukt på nav.no sine sidemaler, men med et nyere og mer oppdatert design. Vi håper å på sikt få til en løsning for å lettere kunne ta i bruk kompoentene brukt på sidemalene.

### PageHeader

Samme som MicroCard.

### Menu

Samme som MicroCard.

### StepIndicator

Erstattes av `<Stepper />`-komponmenten sin horisontale variant.

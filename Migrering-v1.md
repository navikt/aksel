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

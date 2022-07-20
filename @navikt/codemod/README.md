# NAV designsystem Codemods

Collection of Codemods for easier migration between breaking changes.

Highly inspired by both MUI and NEXT

- [NEXT](https://nextjs.org/docs/advanced-features/codemods)
- [MUI](https://github.com/mui/material-ui/tree/master/packages/mui-codemod)

## Usage

Codemod transformations runs code-transformations programmatically in your project. This helps when migrating lots of breaking changes without spending hours doing it manually.

NOTE: This codemod only supports fairly "default" usage of components. Components used with dynamic imports, styled-components, non-default imports (example `import * as DS from "@navikt/ds-react"` or `from "@navikt/ds-react/cjs"`) will not work as expected.

```javascript
npx @navikt/ds-codemod <transform> <path>
```

transform - name of transform, see available transforms below.
path - files or directory to transform
--dry Do a dry-run, no code will be edited
--print Prints the changed output for comparison

## Beta (0.19.x) -> v1.0.0

`npx @navikt/ds-codemod v1.0.0/preset src`

### preset

Combines all avaliable codemods for migrating from beta -> v1.0.0. This transform should only be ran once.

Includes these transforms

- v1.0.0/tabs
- v1.0.0/chat
- v1.0.0/pagination

### tabs

`npx @navikt/ds-codemod v1.0.0/tabs src`

```diff
<Tabs
  defaultValue="logg"
  onChange={(x) => console.log(x)}
-  loop
+  iconPosition="left"
>
  <Tabs.List
-    loop
  >
    <Tabs.Tab
      value="logg"
      label="logg"
-     iconPosition="left"
    />
  </Tabs.List>
  <Tabs.Panel value="logg">TabPanel for Logg-tab</Tabs.Panel>
</Tabs>
```

### chat

`npx @navikt/ds-codemodmod v1.0.0/chat src`

```diff
-<SpeechBubble
+<Chat
-  illustration={<Illustration />}
-  topText="Ola Normann 01.01.21 14:00"
-  illustrationBgColor="blue"
+  avatar={<Illustration />}
+  name="Ola Normann 01.01.21 14:00"
+  avatarBgColor="blue"
  backgroundColor="red"
>
- <SpeechBubble.Bubble>
+ <Chat.Bubble>
    Aute minim nisi sunt mollit duis sunt nulla minim non proident.
- </SpeechBubble.Bubble>
+ </Chat.Bubble>
-</SpeechBubble>
+</Chat>
```

### pagination

`npx @navikt/ds-codemod v1.0.0/pagination src`

This codemod should only be ran once, since the size-scale will keep decreasing for each subsequent iteration.

```diff
-<Pagiation />
+<Pagiation size="small"/>

-<Pagiation size="medium"/>
+<Pagiation size="small"/>

-<Pagiation size="small"/>
+<Pagiation size="xsmall"/>
```

## License

[MIT](https://github.com/navikt/Designsystemet/blob/master/LICENCE)

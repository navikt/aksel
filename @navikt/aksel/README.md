# Aksel command line interface

CLI tool for managing CSS-imports and Codemods when consuming Aksel-packages.

[Documentation](https://aksel.nav.no/preview/grunnleggende/kode/kommandolinje)

```bash
run:
npx @navikt/aksel

commands:
css-imports: Generate css-imports for all components from Aksel
codemod: Codemods for version-migrations related to Aksel
```

## Codemods

Codemods are code-transformations that patches breaking changes in your project. This helps when migrating without spending time doing it manually.

```bash
To get started:
npx @navikt/aksel codemod --help
```

### v3

There is no general codemods for migrating from v2 -> v3.

#### CopyButton

`npx @navikt/aksel codemod v3-copybutton ...`

`<CopyToClipboard />` has been renamed to `<CopyButton />` and refactored.

- Namechange
- removed props `popoverText`, `iconPosition`, `popoverPlacement`
- changed variants
- refactored CSS and React-code. ⚠️ Overwritten CSS will not be migrated!

```diff
-import { CopyToClipboard } from "@navikt/ds-react-internal";
+import { CopyButton } from "@navikt/ds-react";

-<CopyToClipboard
+<CopyButton
- popoverText="popoverText"
- iconPosition="left"
- popoverPlacement="bottom-end"
  copyText="Text to copy"
  size="medium"
>
- text
+</CopyButton>
-</CopyToClipboard>

```

### v1 -> v2

[Documentation](https://aksel.nav.no/grunnleggende/kode/migrering#h76f47744d112)

v2-css: Patches changed css-variables
v2-js: Patches changed js-variables
v2-sass: Patches changed sass-variables
v2-less: Patches changed less-variables

#### css-tokens (--navds format)

`npx @navikt/aksel codemod v2-css src`

When having redefined a token, you will need to manually find and replace these instances after the codemod-run. A global search for `--v2-migration__` will show all found instances where you had redefined a token.

```diff
.example{
- color: var(--navds-global-color-gray-900);
+ color: var(--a-gray-900);

- --navds-semantic-color-text: red;
+ --v2-migration__navds-semantic-color-text: red;
}
```

#### sass/scss-tokens ($navds format)

`npx @navikt/aksel codemod v2-sass src`

```diff
.example{
- color: $navds-global-color-gray-900;
+ color: $a-gray-900;
}
```

#### less-tokens (@navds format)

`npx @navikt/aksel codemod v2-less src`

```diff
.example{
- color: @navds-global-color-gray-900;
+ color: @a-gray-900;
}
```

#### js-tokens

`npx @navikt/aksel codemod v2-js src`

```diff

- import { NavdsGlobalColorGray900 } from "@navikt/ds-tokens";
+ import { AGray900 } from "@navikt/ds-tokens";

const styled = styled.p`
- color: ${NavdsGlobalColorGray900};
+ color: ${AGray900};
`
```

### beta -> v1

[Documentation](https://aksel.nav.no/grunnleggende/kode/migrering#h50d54a5af8c1)

v1-preset: Runs all codemods for beta -> v1
v1-pagination: Fixes breaking API-changes for <Pagination /> component
v1-tabs: Fixes breaking API-changes for <Tabs /> component
v1-chat: Fixes breaking API-changes for <SpeechBubble /> (now <Chat/>) component

#### preset

Combines all avaliable codemods for migrating from beta -> v1. This transform should only be ran once.

Includes these transforms

- v1-tabs
- v1-chat
- v1-pagination

#### tabs

`npx @navikt/aksel codemod v1-tabs src`

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

#### chat

`npx @navikt/aksel codemod v1-chat src`

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

#### pagination

`npx @navikt/aksel codemod v1-pagination src`

This codemod can only be ran once, since the size-scale will keep decreasing for each subsequent iteration.

```diff
-<Pagiation />
+<Pagiation size="small"/>

-<Pagiation size="medium"/>
+<Pagiation size="small"/>

-<Pagiation size="small"/>
+<Pagiation size="xsmall"/>
```

## License

[MIT](https://github.com/navikt/aksel/blob/main/LICENCE)

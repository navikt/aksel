# Deperecated!

This package has been deprecated in favor of [@navikt/aksel](...)
Run `npx @navikt/aksel codemod --help` to get started

## Usage

Codemod runs code-transformations programmatically in your project. This helps when migrating breaking changes without spending hours doing it manually.

NOTE: This codemod only supports fairly "default" usage of components. Components used with dynamic imports, styled-components, non-default imports (ex `import * as DS from "@navikt/ds-react"` or `from "@navikt/ds-react/cjs"`) can lead to bugs when using codemod.

```javascript
npx @navikt/ds-codemod <migration> <path>
```

migraton - name of migraton, see available migraton below.

path - files or directory to transform

```sh
--dry Do a dry-run, no code will be edited
--print Prints the changed output for comparison
--force Runs even if there are uncommited changes (use with caution)
```

## V1 -> V2

V2.0.0 updated the token-prefix of all tokens + names of all semantic-colors. The migrations below helps when migrating from the formats css, scss, less and js.

### css-tokens (--navds format)

`npx @navikt/ds-codemod v2/css src`

When having redefined a token, you will need to manually find and replace these instances after the codemod-run. A global search for `--v2-migration__` will show all found instances where you had redefined a token.

```diff
.example{
- color: var(--navds-global-color-gray-900);
+ color: var(--a-gray-900);

- --navds-semantic-color-text: red;
+ --v2-migration__navds-semantic-color-text: red;
}
```

### sass/scss-tokens ($navds format)

`npx @navikt/ds-codemod v2/sass src`

```diff
.example{
- color: $navds-global-color-gray-900;
+ color: $a-gray-900;
}
```

### less-tokens (@navds format)

`npx @navikt/ds-codemod v2/less src`

```diff
.example{
- color: @navds-global-color-gray-900;
+ color: @a-gray-900;
}
```

### js-tokens

`npx @navikt/ds-codemod v2/js src`

```diff

- import { NavdsGlobalColorGray900 } from "@navikt/ds-tokens";
+ import { AGray900 } from "@navikt/ds-tokens";

const styled = styled.p`
- color: ${NavdsGlobalColorGray900};
+ color: ${AGray900};
`
```

## Beta (0.19.x) -> v1

`npx @navikt/ds-codemod v1/preset src`

### preset

Combines all avaliable codemods for migrating from beta -> v1. This transform should only be ran once.

Includes these transforms

- v1/tabs
- v1/chat
- v1/pagination

### tabs

`npx @navikt/ds-codemod v1/tabs src`

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

`npx @navikt/ds-codemodmod v1/chat src`

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

`npx @navikt/ds-codemod v1/pagination src`

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

[MIT](https://github.com/navikt/aksel/blob/main/LICENCE)

#

Inspired by both MUI and NEXT

- [NEXT](https://nextjs.org/docs/advanced-features/codemods)
- [MUI](https://github.com/mui/material-ui/tree/master/packages/mui-codemod)

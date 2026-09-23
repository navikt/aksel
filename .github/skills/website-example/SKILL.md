---
name: website-example
description: >
  Add or update a code example or template shown on aksel.nav.no
  (aksel.nav.no/website/pages/eksempler/** or pages/templates/**). Use when
  asked to create a component example, demo, usage snippet or page template
  for the documentation site, or when an example fails the aksel-local ESLint
  rules or validate:eksempler.
argument-hint: "Component group and example name, e.g. button/loading"
---

# Website example

Examples are public copy-paste snippets. The code above the marker comment is shown verbatim on the site and opened in the sandbox.

## 1. Locate

- Component examples: `aksel.nav.no/website/pages/eksempler/<group>/<example-name>.tsx` (group = lowercase component, e.g. `lookup`).
- Page templates: `aksel.nav.no/website/pages/templates/<name>/...`.
- Read 1-2 sibling examples in the same group first and match their tone. Content is in Norwegian (bokmål).

## 2. Write the file

```tsx
import { Button } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return <Button>Lagre</Button>;
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args: ExampleArgsT = {
  index: 0,
  desc: "Kort hint om når eksemplet brukes.",
};
```

Hard rules (enforced by `tooling/eslint` rules `aksel-local/*`):

- With the sandbox enabled (default), import only from `@navikt/*`, `react`, relative `../__parts*` helpers and exactly `@/web/examples/withDsExample`. Anything else breaks the "open in sandbox" button. Set `sandbox: false` in `args` only if it's unavoidable.
- The demo component must be named `Example` (the sandbox depends on it).
- The marker comment `// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE` sits directly above `export default`.
- `export const args: ExampleArgsT` with `index` (sort order within the group). Optional: `desc`, `title`, `sandbox: false`.
- `withDsExample(Example, { variant: "static" | ... })`: see its JSDoc for layout options.

## 3. Validate

```sh
corepack yarn eslint --max-warnings=0 --no-warn-ignored <file>
corepack yarn workspace website validate:eksempler
corepack yarn storybook:aksel   # visual check at :6007, needs no secrets
```

Never run `update:eksempler`. It writes to the Sanity CMS. Tell the user that a maintainer syncs examples to Sanity and links a new group from the component page.

## Done when

ESLint and `validate:eksempler` pass, and the story renders in `storybook:aksel`.

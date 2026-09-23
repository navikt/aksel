---
description: "Writing changeset files for versioning public @navikt packages."
applyTo: ".changeset/**"
---

# Changesets

`yarn changeset` is interactive. Agents write `.changeset/<kebab-slug>.md` directly (see the `add-changeset` skill):

```md
---
"@navikt/ds-react": patch
---

Component: Short, user-facing description of the change
```

- Publishable packages (versioned together via `fixed` in `config.json`): `@navikt/ds-react`, `@navikt/ds-css`, `@navikt/ds-tokens`, `@navikt/ds-tailwind`, `@navikt/aksel-icons`, `@navikt/aksel`, `@navikt/aksel-stylelint`. List only the packages actually changed.
- Everything in `config.json` `ignore` (website, playroom, mcp, tooling, sanity) never gets a changeset.
- Summary format: `<Component>: <what changed for consumers>`. It ends up in the public changelog, so write for consumers, not reviewers.
- Don't edit `config.json`, `CHANGELOG.md` files or package versions. The release workflow does that.

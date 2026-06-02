# @navikt/aksel-mcp

Model Context Protocol (MCP) server for Aksel design system.

It gives coding agents and assistants direct access to:

- Aksel documentation content
- Design token catalog and detailed token metadata
- Icon categories and icon search
- Aksel migration codemods index
- Structured component props

> [!TIP]
> Best result pattern: read `aksel-docs://llm-index` first, then call `aksel_docs` with an exact path from the index.

## Why use this server?

- Faster and more accurate Aksel answers for AI assistants
- Structured APIs for component props, tokens, and icons
- Less guessing: tools enforce valid input schemas with `zod`
- Works over stdio with standard MCP-compatible clients

## Features

### Tools

| Tool                    | What it does                                                     |
| ----------------------- | ---------------------------------------------------------------- |
| `aksel_docs`            | Fetches official Aksel markdown docs by path                     |
| `aksel_token_details`   | Returns complete metadata for one design token                   |
| `aksel_icons_search`    | Searches/filter icons by category, subcategory, keyword, variant |
| `aksel_component_props` | Fetches structured component props by documentation slug         |

### Resources

| Resource URI               | What it contains                                         |
| -------------------------- | -------------------------------------------------------- |
| `aksel-docs://llm-index`   | Full docs index from `https://aksel.nav.no/api/llm/docs` |
| `aksel-tokens://list`      | Lightweight list of all Aksel design tokens              |
| `aksel-icons://categories` | Icon categories + subcategories + counts                 |
| `aksel-migrations://list`  | Available codemods for Aksel migrations                  |

## Recommended usage workflow

1. Read `aksel-docs://llm-index`.
2. Pick the exact docs path.
3. Call `aksel_docs({ path: "/komponenter/core/button.md" })`.
4. For implementation details, also call:
   - `aksel_component_props` for strict prop contracts
   - `aksel_token_details` for token-level design decisions
   - `aksel_icons_search` for icon discovery

## Local development

### Scripts

```bash
yarn workspace @navikt/aksel-mcp dev
yarn workspace @navikt/aksel-mcp build
yarn workspace @navikt/aksel-mcp test
yarn workspace @navikt/aksel-mcp inspect
```

`inspect` starts the MCP Inspector flow for manual testing.

## Package internals

- Entry point: `src/index.ts`
- Tool registrations: `src/tools/tools.ts`
- Resource registrations: `src/resources/resources.ts`
- Prompt registrations: `src/prompts/prompts.ts`

## License

[MIT](https://github.com/navikt/aksel/blob/main/LICENSE)

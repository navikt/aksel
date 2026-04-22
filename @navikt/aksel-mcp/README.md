# aksel-mcp

Model Context Protocol (MCP) server for the Aksel design system. Exposes Aksel documentation, design tokens, icons, and other design system knowledge to AI coding assistants.

## Features

### Resources

- **`aksel-docs://llm-index`** — Complete Aksel documentation index from aksel.nav.no/llm.md
- **`aksel-tokens://list`** — Lightweight list of all design tokens (names, descriptions, categories)
- **`aksel-icons://categories`** — Icon categories and subcategories for scoped icon search

### Tools

- **`aksel_docs`** — Fetch Aksel documentation by path
- **`aksel_token_details`** — Fetch complete details for a specific design token by name
- **`aksel_icons_search`** — Search and filter icons by category, subcategory, keywords, or name

### Prompts

Coming soon.

## Usage Flow

**Design Tokens**:

1. Read `aksel-tokens://list` resource to browse available tokens
2. Call `aksel_token_details` tool with specific token name to get full metadata (CSS variables, values, semantic info, etc.)

**Icons**:

1. Read `aksel-icons://categories` resource to see available categories and subcategories
2. Call `aksel_icons_search` tool with filters (category, subcategory, keyword, variant) to find specific icons

This scoped approach keeps context size minimal (~10kB for lists vs 160kB tokens / 250kB icons for full data).

## Development

```bash
# Build
yarn build

# Watch mode
yarn dev

# Test
yarn test

# Inspect with MCP Inspector
yarn inspect
```

## Usage

The server runs via stdio transport and can be used with any MCP-compatible client (Claude Desktop, Cline, etc.).

See [spec.md](./spec.md) for planned features and implementation roadmap.

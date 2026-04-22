# aksel-mcp

Model Context Protocol (MCP) server for the Aksel design system. Exposes Aksel documentation, design tokens, and other design system knowledge to AI coding assistants.

## Features

### Resources

- **`aksel-docs://llm-index`** — Complete Aksel documentation index from aksel.nav.no/llm.md
- **`aksel-tokens://all`** — Full design token catalog (colors, spacing, typography, breakpoints)

### Tools

- **`aksel_docs`** — Fetch Aksel documentation by path

### Prompts

Coming soon.

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

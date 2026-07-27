# aksel-mcp

Model Context Protocol (MCP) server for Aksel design system.

It gives coding agents and assistants direct access to:

- Aksel documentation content
- Design token catalog and detailed token metadata
- Icon categories and icon search
- Aksel migration codemods index
- Structured component props

> [!TIP]
> Best result pattern: call `aksel_find_docs` first, then call `aksel_get_doc` with an exact returned path.

## Why use this server?

- Faster and more accurate Aksel answers for AI assistants
- Structured APIs for component props, tokens, and icons
- Less guessing: tools enforce valid input schemas with `zod`

## Features

### Tools

| Tool                       | What it does                                                       |
| -------------------------- | ------------------------------------------------------------------ |
| `aksel_find_docs`          | Finds docs paths from the index based on query                     |
| `aksel_get_doc`            | Fetches official Aksel markdown docs by path                       |
| `aksel_get_token_details`  | Returns complete metadata for one design token                     |
| `aksel_find_icons`         | Finds and filters icons by category, subcategory, keyword, variant |
| `aksel_get_component_info` | Fetches structured component props by slug/docs path               |

### Resources

| Resource URI                     | What it contains                                         |
| -------------------------------- | -------------------------------------------------------- |
| `aksel-docs://index`             | Full docs index from `https://aksel.nav.no/api/llm/docs` |
| `aksel-tokens://catalog`         | Lightweight catalog of all Aksel design tokens           |
| `aksel-icons://category-catalog` | Icon categories + subcategories + counts                 |
| `aksel-migrations://catalog`     | Available codemods for Aksel migrations                  |

## Recommended usage workflow

1. Call `aksel_find_docs({ query: "button" })` to find the right path quickly.
2. Call `aksel_get_doc({ path: "/komponenter/core/button.md" })`.
3. For implementation details, also call:
   - `aksel_get_component_info` with either slug (`komponenter/core/button`) or path (`/komponenter/core/button.md`)
   - `aksel_get_token_details` for token-level design decisions
   - `aksel_find_icons` for icon discovery

## Local development

### Scripts

```bash
yarn workspace aksel-mcp dev
yarn workspace aksel-mcp build
yarn workspace aksel-mcp test

```

### Local testing

- Start server `yarn workspace aksel-mcp start`
- Start inspector `yarn workspace aksel-mcp inspect`

## Package internals

- Entry point: `src/index.ts`
- Tool registrations: `src/tools/tools.ts`
- Resource registrations: `src/resources/resources.ts`
- Prompt registrations: `src/prompts/prompts.ts`

## Deployment

Automatic deployment via GitHub Actions on merge to main.

Production: https://aksel-mcp.nav.no

## Metrics

The server exposes Prometheus metrics via `prom-client` at `/metrics`:

- `aksel_mcp_up`: Gauge indicating if server is running.
- `aksel_mcp_requests_total`: Counter for total HTTP requests (labels: `route`, `method`, `status`).
- `aksel_mcp_requests_duration_seconds`: Histogram of HTTP request durations.
- `aksel_mcp_tool_calls_total`: Counter for total MCP tool calls (labels: `tool`, `status`).
- `aksel_mcp_tool_duration_seconds`: Histogram of MCP tool execution durations.
- `aksel_mcp_tool_errors_total`: Counter for tool execution failures.
- `aksel_mcp_cache_hits_total` / `aksel_mcp_cache_misses_total`: Cache performance counters (labels: `cache`).

## Endpoints

- `GET /isalive`: Liveness probe. Returns `{ ok: true }`.
- `GET /isready`: Readiness probe. Returns `{ ok: true }`.
- `GET /metrics`: Serves Prometheus metrics.
- `POST /mcp`: Main MCP transport endpoint. Requires same-origin or no-origin header.

## License

[MIT](https://github.com/navikt/aksel/blob/main/LICENSE)

# Aksel MCP Server - Priority Features

Where possible, use `reference-MCP.js` implementation of a MCP server as reference for how another component library has implemented some features.

## Current State

The Aksel MCP server currently implements:

- **Tool**: `aksel_docs` — Fetches Aksel documentation by path
- **Tool**: `aksel_token_details` — Fetches complete details for a specific design token by name ✅
- **Tool**: `aksel_icons_search` — Search icons by category, subcategory, keywords, or name ✅
- **Tool**: `aksel_migrations` — Returns all available codemods with names, descriptions, and warnings ✅
- **Resource**: `aksel-docs://llm-index` — Full documentation index from aksel.nav.no/llm.md
- **Resource**: `aksel-tokens://list` — Lightweight token list (names, descriptions, categories) ✅
- **Resource**: `aksel-icons://categories` — Icon categories and subcategories for scoped search ✅
- **Prompts**: Empty array (no prompts implemented yet)

## Priority Features

| Feature                               | MCP Primitive   | Priority   | Rationale                                                                                                                                                                                                                                                                                                                        |
| ------------------------------------- | --------------- | ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Design tokens (list + details)**    | Resource + Tool | **High**   | ✅ **COMPLETED** — Tokens are queried constantly during development. Implemented as lightweight list resource (~10kB) plus detailed lookup tool to avoid passing 160kB every query. Zero maintenance burden, extremely high frequency of use. Enables AI to suggest correct tokens instead of hard-coded values.                 |
| **Icon search (categories + search)** | Resource + Tool | **High**   | ✅ **COMPLETED** — Icons are the second-most-queried design system asset. Implemented as categories resource for scoping plus search tool with filters (category, subcategory, keyword, variant). Avoids loading 250kB metadata. Enables natural language icon search ("calendar icon").                                         |
| **Component scaffolding prompt**      | Prompt          | **High**   | Guides AI to generate component usage with proper imports, props, accessibility attributes, and Aksel patterns. Currently prompts array is empty—this is the most impactful first prompt to implement. Medium complexity but very high value for onboarding and consistent usage.                                                |
| **Component props API tool**          | Tool            | **Medium** | Useful for discovering available props without reading full docs. However, documentation already covers this well via existing `aksel_docs` tool. Moderate value, moderate complexity. Would require extracting prop data from TypeScript definitions or Sanity CMS.                                                             |
| **Migration/codemod discovery tool**  | Tool            | **Medium** | ✅ **COMPLETED** — Critical during version upgrades but infrequent. The `@navikt/aksel` CLI already handles this well. Adding MCP exposure helps AI suggest the right migration command. Implemented as a single tool (no resource needed — data is small). Imports directly from `@navikt/aksel/migrations` (zero maintenance). |
| **Import path helper tool**           | Tool            | **Medium** | Helps developers use correct tree-shakeable imports (`@navikt/ds-react/Button` vs `@navikt/ds-react`). Useful for performance and bundle size. Moderate value, low complexity (can be static mapping), but documentation covers this.                                                                                            |
| **Token validation tool**             | Tool            | **Low**    | Validates if a token is being used correctly for its semantic purpose. However, `@navikt/aksel-stylelint` already provides this at build time. Lower priority since linting is more reliable than runtime AI checks.                                                                                                             |
| **Component selector prompt**         | Prompt          | **Low**    | "Which component should I use for X scenario?" High value but requires domain knowledge modeling and decision trees. Complex to implement well—needs curation of use cases and anti-patterns. Better as Phase 2 after gathering user feedback.                                                                                   |

## Recommended Implementation Sequence

### Phase 1 (Immediate—complete the foundation)

1. ✅ **Design tokens (resource + tool)** — `aksel-tokens://list` resource (lightweight browsing) + `aksel_token_details` tool (detailed lookups) **[COMPLETED]**
2. ✅ **Icon search (resource + tool)** — `aksel-icons://categories` resource for scoping + `aksel_icons_search` tool with category/subcategory/keyword/variant filters **[COMPLETED]**

Ignore part 3 for now. Lets revisit it later. 3. **Component usage prompt** (`aksel_component_usage`) — Template for proper component scaffolding

### Phase 2 (After Phase 1 validation)

4. ✅ `aksel_migrations` tool returning full migration list with commands **[COMPLETED]**
5. Component props API explorer
6. Token-to-CSS variable mapping tool

### Phase 3 (Advanced—requires user research)

7. Semantic component selector
8. Accessibility audit prompt
9. Pattern composition guidance

## Why This Prioritization?

### Tokens (Priority #1) ✅ COMPLETED

- Solves the #1 hard-coded value problem in design system adoption
- Data already exists in perfect format (`@navikt/core/tokens/token_docs.js`)
- Zero maintenance burden (updates automatically with token releases)
- Complements existing Stylelint plugin
- **Implementation**: Resource for browsing (~10kB list) + Tool for detailed lookups (avoids 160kB context bloat)
- Completed in <1 hour as predicted

### Icons (Priority #2) ✅ COMPLETED

- Icons are the second-most-queried design system asset after components
- Metadata with semantic keywords already exists (`@navikt/aksel-icons/metadata.js`)
- Enables natural language search ("calendar icon" → finds relevant icons)
- Low maintenance (metadata updates with icon releases)
- **Implementation**: Categories resource for scoping (~2kB) + Search tool with filters (avoids 250kB context bloat)
- Supports filtering by: category, subcategory, keyword, variant (Stroke/Fill)
- Completed in ~2 hours as predicted

### Component scaffolding prompt (Priority #3)

- Prompts array is currently empty—this fills the biggest gap
- Codifies Aksel best practices (imports, accessibility, token usage)
- High leverage: guides every component usage, not just lookups
- Moderate implementation (needs template design)
- Can reference actual Aksel examples from documentation

## Strategic Value

The current MCP server has evolved from **documentation-focused** to **code generation-aware**, which is where AI assistants provide the most value for design systems.

Phase 1 (Tokens + Icons) is now complete. Developers can:

- ✅ Get correct token values without checking documentation
- ✅ Find appropriate icons through natural language search with category/keyword filters
- 🚧 Generate component code that follows Aksel patterns (Phase 1 Part 3: Component scaffolding prompt)

By completing tokens and icons, we've addressed the two most-queried design system assets with efficient, scoped implementations that avoid context bloat.

## Data Sources Already Available

- **Tokens**: `@navikt/core/tokens/token_docs.js` (structured array with all tokens) ✅ In use
- **Icons**: `@navikt/aksel-icons/metadata.js` (icon metadata with keywords/categories) ✅ In use
- **Migrations**: `@navikt/aksel/migrations` (structured codemod list) ✅ In use
- **Documentation**: Already accessible via existing `aksel_docs` tool ✅ In use

## Implementation Notes

✅ **Phase 1 Parts 1-2 and Phase 2 Part 4 Complete**: All features leverage existing, maintained data sources. No new data pipelines or maintenance overhead required. Design tokens, icon metadata, and migration data are already part of the build process and stay automatically synchronized with releases.

**Scoped approach**: Tokens and icons use a lightweight resource for browsing/scoping + detailed tool for lookups. Migrations return the full list directly (low volume — no scoping needed). This pattern:

- Keeps context minimal (10kB vs 160kB for tokens, 2kB vs 250kB for icons)
- Follows MCP best practices (resources for browsing, tools for queries)
- Enables natural developer workflows (discover → scope → fetch details)

# Aksel MCP Server - Priority Features

Where possible, use `reference-MCP.js` implementation of a MCP server as reference for how another component library has implemented some features.

## Current State

The Aksel MCP server currently implements:

- **Tool**: `aksel_docs` — Fetches Aksel documentation by path
- **Resource**: `aksel-docs://llm-index` — Full documentation index from aksel.nav.no/llm.md
- **Prompts**: Empty array (no prompts implemented yet)

## Priority Features

| Feature                              | MCP Primitive | Priority   | Rationale                                                                                                                                                                                                                                                                                                          |
| ------------------------------------ | ------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Design tokens resource**           | Resource      | **High**   | Tokens are queried constantly during development. The structured `docs.json` already exists with all token data (colors, spacing, typography, breakpoints). Very low implementation cost, minimal maintenance, extremely high frequency of use. Enables AI to suggest correct tokens instead of hard-coded values. |
| **Icon search tool**                 | Tool          | **High**   | Developers search for icons dozens of times per day. Metadata with keywords/categories already exists in structured format. Moderate implementation complexity, high developer value. Would allow semantic search ("find me a calendar icon") instead of browsing.                                                 |
| **Component scaffolding prompt**     | Prompt        | **High**   | Guides AI to generate component usage with proper imports, props, accessibility attributes, and Aksel patterns. Currently prompts array is empty—this is the most impactful first prompt to implement. Medium complexity but very high value for onboarding and consistent usage.                                  |
| **Component props API tool**         | Tool          | **Medium** | Useful for discovering available props without reading full docs. However, documentation already covers this well via existing `aksel_docs` tool. Moderate value, moderate complexity. Would require extracting prop data from TypeScript definitions or Sanity CMS.                                               |
| **Migration/codemod discovery tool** | Tool          | **Medium** | Critical during version upgrades but infrequent. The `@navikt/aksel` CLI already handles this well. Adding MCP exposure would help AI suggest the right migration command. Low implementation cost (codemods list already structured), but lower frequency makes it medium priority.                               |
| **Import path helper tool**          | Tool          | **Medium** | Helps developers use correct tree-shakeable imports (`@navikt/ds-react/Button` vs `@navikt/ds-react`). Useful for performance and bundle size. Moderate value, low complexity (can be static mapping), but documentation covers this.                                                                              |
| **Token validation tool**            | Tool          | **Low**    | Validates if a token is being used correctly for its semantic purpose. However, `@navikt/aksel-stylelint` already provides this at build time. Lower priority since linting is more reliable than runtime AI checks.                                                                                               |
| **Component selector prompt**        | Prompt        | **Low**    | "Which component should I use for X scenario?" High value but requires domain knowledge modeling and decision trees. Complex to implement well—needs curation of use cases and anti-patterns. Better as Phase 2 after gathering user feedback.                                                                     |

## Recommended Implementation Sequence

### Phase 1 (Immediate—complete the foundation)

1. **Design tokens resource** (`aksel-tokens://all`) — Read-only resource exposing `docs.json` content
2. **Icon search tool** (`aksel_icons_search`) — Search icons by name/keyword/category from metadata
3. **Component usage prompt** (`aksel_component_usage`) — Template for proper component scaffolding

### Phase 2 (After Phase 1 validation)

4. Migration/codemod discovery tool
5. Component props API explorer
6. Token-to-CSS variable mapping tool

### Phase 3 (Advanced—requires user research)

7. Semantic component selector
8. Accessibility audit prompt
9. Pattern composition guidance

## Why This Prioritization?

### Tokens (Priority #1)

- Solves the #1 hard-coded value problem in design system adoption
- Data already exists in perfect format (`@navikt/core/tokens/docs.json`)
- Zero maintenance burden (updates automatically with token releases)
- Complements existing Stylelint plugin
- Can be implemented in <1 hour

### Icons (Priority #2)

- Icons are the second-most-queried design system asset after components
- Metadata with semantic keywords already exists
- Enables natural language search ("calendar icon" → finds relevant icons)
- Low maintenance (metadata updates with icon releases)
- Can be implemented in ~2 hours

### Component scaffolding prompt (Priority #3)

- Prompts array is currently empty—this fills the biggest gap
- Codifies Aksel best practices (imports, accessibility, token usage)
- High leverage: guides every component usage, not just lookups
- Moderate implementation (needs template design)
- Can reference actual Aksel examples from documentation

## Strategic Value

The current MCP server is **documentation-focused**. These three features shift it to be **code generation-aware**, which is where AI assistants provide the most value for design systems.

By implementing Phase 1, developers will be able to:

- Get correct token values without checking documentation
- Find appropriate icons through natural language
- Generate component code that follows Aksel patterns from the start

## Data Sources Already Available

- **Tokens**: `@navikt/core/tokens/docs.json` (structured JSON with all tokens)
- **Icons**: `@navikt/aksel-icons/dist/metadata.js` (icon metadata with keywords/categories)
- **Codemods**: `@navikt/aksel/src/codemod/migrations.ts` (structured migration list)
- **Documentation**: Already accessible via existing `aksel_docs` tool

## Implementation Notes

All Phase 1 features can leverage existing, maintained data sources. No new data pipelines or maintenance overhead required. The design tokens and icon metadata are already part of the build process and stay automatically synchronized with releases.

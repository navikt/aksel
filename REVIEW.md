# MCP Server Review (`mcp-server/`)

Goal check: good base for “source of truth” usage, but not yet feature-complete for LLM DX. Biggest gaps are token-efficiency controls, discoverability/search, and response contract consistency.

## Feature

### High

1. **Add docs search tool (`aksel_docs_search`)**
   Right now flow depends on fetching full `aksel-docs://llm-index` first. Add indexed search (`query`, `type`, `limit`, optional `lang`) so models can find paths without pulling full index every session.
2. **Add response shaping across tools/resources**
   Add shared params like `format: "compact" | "full"`, `maxChars`, `fields`, `cursor/offset` to reduce token usage and context pressure.
3. **Introduce a stable response envelope**
   Standardize all tool outputs as `{ ok, data, error, meta }`. Current mix of raw JSON strings and ad-hoc error payloads makes tool-chaining brittle.

### Medium

1. **Add component discovery tool**
   `aksel_component_search` (by name/slug/category/deprecated) would reduce dependency on raw path guessing and improve onboarding.
2. **Add “component usage bundle” tool**
   One call returning docs summary + props summary + accessibility notes would reduce multiple roundtrips/context duplication.

### Low

1. **Add version-awareness resource**
   Resource with current ds-react/aksel versions + migration hints to keep generated code aligned with installed version.

## Bugs / Correctness Risks

### High

1. **`aksel_token_details` schema creates huge enum + dead fallback path**
   `z.enum(allTokenNames)` inflates tool schema heavily and makes runtime “token not found” fallback mostly unreachable in normal MCP calls.
2. **Error signaling inconsistent**
   Some failures return JSON `{ error: ... }` as successful text payload, others throw. This can make agent behavior inconsistent and hide hard failures.

### Medium

1. **Unsafe cast in icon metadata parsing**
   `as unknown as Record<string, AkselIcon>` bypasses type safety and can hide metadata shape drift.
2. **Prompt system is effectively unimplemented**
   `prompts.ts` registers an empty array; prompt test is placeholder-only.

### Low

1. **Test coverage misses key production paths**
   No tests for origin validation, HTTP transport behavior, cache hit/miss logic, or external fetch failure handling.

## Token Usage / Context Reduction

### High

1. **Default outputs are too verbose**
   Multiple responses use pretty JSON (`JSON.stringify(..., null, 2)`), which increases token cost without semantic gain.
2. **No server-side truncation/summarization controls**
   Large docs and index payloads can flood context; add deterministic truncation with metadata (`truncated`, `nextCursor`, `remainingChars`).

### Medium

1. **No chunked doc retrieval**
   Add `aksel_docs_chunk(path, from, size)` or `section` retrieval so models can pull only needed parts.
2. **No dedup/compression strategy for repeated calls**
   Add optional compact mode stripping repetitive fields/boilerplate.

### Low

1. **No guidance metadata in responses**
   Include `nextRecommendedCalls` and `sourceVersion` to reduce trial-and-error turns.

## Addons (Feature-Complete Without Over-Complexity)

### High

1. **`aksel_best_practices` resource/tool**
   Curated do/don’t patterns for component usage, accessibility, and composition to improve correctness in generated code.
2. **`aksel_examples_search` tool**
   Search practical examples/snippets by component + intent (form, validation, layout, etc.).

### Medium

1. **Migration-aware assistant tool**
   Given old API usage, return suggested modern equivalent + codemod mapping.
2. **Design-token search tool**
   Search tokens by semantic intent (`surface`, `danger`, `focus`, `spacing`) instead of exact token names.

### Low

1. **Capabilities/self-describe resource**
   `aksel://capabilities` listing tools/resources, limits, and recommended call order for agent bootstrapping.

## QoL / DX

### High

1. **Tighten and shorten tool descriptions**
   Descriptions are helpful but long. Move strict workflow hints into concise “Usage notes” and keep top-line short for planner agents.
2. **Add client-facing quickstart blocks in README**
   Include ready-to-paste configs for common MCP clients + minimal “best call sequence” examples.

### Medium

1. **Add request correlation IDs in logs/metrics**
   Makes production debugging easier when tool calls fail across fetch/cache layers.
2. **Expose cache TTL and freshness in metadata**
   Return `cached`, `ageSeconds`, `ttlSeconds` in `meta`.

### Low

1. **Improve naming consistency**
   Keep tool/resource naming patterns fully uniform (`aksel_*`) and align human-readable names for easier discovery.

## Suggested Next Iteration (Minimal Complexity, Max Value)

1. **Phase 1 (highest ROI):**
   `aksel_docs_search`, compact output mode default, stable response envelope, remove enum-heavy token schema.
2. **Phase 2:**
   doc chunk retrieval, component search, stronger tests for HTTP/origin/fetch/cache failures.
3. **Phase 3:**
   examples search + best-practices resource + migration assist.

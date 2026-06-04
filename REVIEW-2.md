# MCP Server Review

> Goal: Make the server the definitive source of truth for the Aksel design system —
> helping LLMs write correct, idiomatic Aksel code with minimal guessing and minimal token waste.

---

## Bugs

### 🟢 Low — `prompts.test.ts` is a stub

**File:** `src/prompts/prompts.test.ts`

```ts
test("should have tests", () => {
  expect(true).toBe(true);
});
```

This is a placeholder that gives false confidence in CI. Remove it or replace it with real tests once prompts are added.

---

## Features

### 🔴 High — Two-step doc workflow is fragile for LLMs

**Files:** `src/tools/aksel-docs.ts`, `src/tools/component-props.ts`

The current flow is:

1. LLM reads `aksel-docs://llm-index` (large JSON blob)
2. LLM parses and picks the correct path
3. LLM calls `aksel_docs` or strips/transforms the path for `aksel_component_props`

This puts too much burden on the LLM. Resources are often skipped by LLMs that go directly
to tools, and the path-derivation for `component-props` (strip `/`, strip `.md`) is an
accident waiting to happen.

**Fix:** Add a `aksel_docs_search` tool (see Addons) that finds the right path for the LLM.
Also make `aksel_component_props` accept the raw path format (`/komponenter/core/button.md`)
and normalize it internally, rather than asking the LLM to transform it.

---

### 🔴 High — No prompts defined despite full prompt infrastructure

**File:** `src/prompts/prompts.ts`

The `prompts` array is empty. MCP Prompts are the primary mechanism for teaching LLMs _how_ to
use a server correctly — they are pre-built, invocable templates. The whole prompt pipeline
(registration, callback, types) is wired up but unused.

**Fix:** Add at minimum:

- **`use_aksel_component`** — Parameterized prompt (`componentName`): walks the LLM through
  finding docs, fetching props, and selecting tokens. The single most valuable DX addition.
- **`find_aksel_icon`** — Guides icon discovery: check categories → search → pick variant.
- **`aksel_getting_started`** — No-args prompt explaining the server, workflow, and what
  resources/tools are available.

---

### 🟡 Medium — No lightweight component list

There is no tool or resource to get a quick list of all available components with their
slugs. The only way to discover components is to load the entire `llm-index` JSON. For an
LLM that just wants to know "does Aksel have a stepper component?", this is expensive.

**Fix:** Add `aksel-components://list` resource — a static, compact list of component names
and slugs derived from the llm-index (can be bundled at build time or fetched and trimmed).

---

### 🟡 Medium — No token search/filter tool

The workflow for tokens is: load full list → scan → pick exact name → get details.
There is no way to search tokens by keyword or filter by category (e.g. "all shadow tokens").

**Fix:** Add `aksel_token_search` tool with `category` and `keyword` params. Most of the
machinery already exists in `icon-search.ts` — it's just not replicated for tokens.

---

### 🟡 Medium — No changelog or version awareness

LLMs have no way to know the current Aksel version or what changed recently. This leads to
generating code using deprecated APIs or missing new features.

**Fix:** Add `aksel-changelog://latest` resource (or a field in `aksel-migrations://list`)
that surfaces the current package version and a human-readable summary of recent breaking
changes.

---

## Addons

### 🔴 High — Missing: `aksel_docs_search` tool

Without a search tool, the LLM must load the entire llm-index and parse it manually. A
search tool replaces this with one targeted call.

**Suggested signature:**

```ts
aksel_docs_search({ query: string }) → [{ title, path, summary }]
```

This can be implemented as a simple fuzzy-match over the llm-index (which is already cached),
or by calling a search endpoint if one exists on `aksel.nav.no`.

---

### 🟡 Medium — Missing: `aksel_component_examples` tool

Component docs exist, and props exist, but there are no quick code examples surfaced through
the MCP. A tool that returns curated code snippets for a component would be very high-value
for LLMs generating implementation code.

**Suggested signature:**

```ts
aksel_component_examples({ slug: string }) → [{ title, code, language }]
```

Can be powered by the same doc endpoint if it returns structured examples, or a dedicated
`/api/component-examples?slug=` endpoint on the website.

---

### 🟡 Medium — Missing: `aksel_token_by_role` tool

Tokens are named semantically (e.g. `bg-default`, `text-action`), but LLMs often think in
design intent terms ("what's the right background token for a danger state?"). A tool that
accepts a role description and returns relevant tokens would reduce guessing.

**Suggested signature:**

```ts
aksel_token_by_role({ role: "danger-background" | "action-text" | ... }) → Token[]
```

Can be implemented as a static mapping or fuzzy search over token comments.

---

### 🟢 Low — Missing: `aksel_a11y_guidelines` resource

Accessibility is a core concern in NAV's design system. A dedicated resource surfacing
component-level a11y requirements (roles, aria attributes, keyboard nav) would prevent LLMs
from generating inaccessible code. Currently buried in per-component docs.

---

## QOL

### 🔴 High — Inconsistent JSON serialization wastes tokens

Some responses use `JSON.stringify(data, null, 2)` (pretty-printed) and some use compact
JSON. Pretty-printing adds significant token overhead — newlines and indentation are real
tokens. For machine consumption, compact JSON is preferred.

**Affected files:**

- `src/tools/icon-search.ts` — uses `null, 2`
- `src/tools/token-details.ts` — uses `null, 2`
- `src/resources/design-tokens.ts` — uses `null, 2`
- `src/resources/icon-categories.ts` — uses `null, 2`
- `src/resources/migrations.ts` — uses `null, 2`

**Fix:** Use compact `JSON.stringify(data)` everywhere unless the output is specifically
intended for human display. Saves 20–40% tokens on large responses like the token list or
icon categories.

---

### 🟡 Medium — `aksel_docs` response wraps content unnecessarily

**File:** `src/tools/aksel-docs.ts:62`

```ts
return JSON.stringify({ path, url, content: await response.text() });
```

The `url` field (`https://aksel.nav.no${path}`) is fully derivable from `path` — it adds
tokens but zero information. The JSON wrapper itself adds overhead when `content` is already
the only thing the LLM needs.

**Fix:** Return the markdown content directly (plain text), optionally with only `path` as
metadata. This is consistent with how documentation tools in other MCP servers work.

---

### 🟡 Medium — Icon search results include redundant `keywords` field

**File:** `src/tools/icon-search.ts:84`

When the LLM has already searched by keyword, returning the full `keywords[]` array for
every matched icon is redundant. It adds token noise and the LLM already knows why it matched.

**Fix:** Omit `keywords` from results by default. Include only `name`, `category`,
`subcategory`, and `variant`.

---

### 🟡 Medium — Structured logger has no `info` level

**File:** `src/helpers/log.ts`

The logger only has `warn` and `error`. The startup message in `index.ts` uses raw
`console.info(...)` which bypasses the structured JSON format expected by log aggregators.

**Fix:** Add a `logInfo` function. Use it for startup, shutdown, and cache events.

---

### 🟡 Medium — Design tokens and icon metadata should not have a TTL cache

**File:** `src/helpers/node-cache.ts`

Design tokens (`src/resources/design-tokens.ts`) and icon metadata (`src/resources/icon-categories.ts`)
are bundled at build time from npm packages — they cannot change at runtime. Wrapping them
in a TTL cache adds unnecessary overhead with no benefit.

The `node-cache` instances are only used by `aksel-docs` and `component-props` tools (HTTP
fetches). The static resources should either have no cache or a permanent in-memory cache.

---

### 🟢 Low — `componentPropsTool.inputSchema.slug` has no `.describe()`

**File:** `src/tools/component-props.ts`

The `slug` parameter has validation refinements but no `.describe()` call. Other schemas
(like `aksel_docs.path`) provide a natural-language description that helps LLMs understand
the expected format.

**Fix:**

```ts
slug: z.string().trim().min(1)
  .refine(...)
  .describe("Component path slug from llm-index, with leading '/' and trailing '.md' removed (e.g. 'komponenter/core/button').")
```

---

### 🟢 Low — `searchCriteria` echo in icon-search responses adds noise

**File:** `src/tools/icon-search.ts`

Every icon search response includes `searchCriteria: { category, subcategory, keyword, variant }`.
The LLM already knows what it searched for — echoing it back wastes tokens.

**Fix:** Remove `searchCriteria` from the response payload.

---

## Summary table

| #   | Area    | Severity | Finding                                                                 |
| --- | ------- | -------- | ----------------------------------------------------------------------- |
| 1   | Bug     | 🟢 Low   | Stub test in `prompts.test.ts` gives false CI confidence                |
| 2   | Feature | 🔴 High  | Two-step doc workflow is fragile — LLMs often skip resources            |
| 3   | Feature | 🔴 High  | Prompts infrastructure unused — no workflow guidance for LLMs           |
| 4   | Feature | 🟡 Med   | No lightweight component list resource                                  |
| 5   | Feature | 🟡 Med   | No token search/filter tool                                             |
| 6   | Feature | 🟡 Med   | No changelog / version awareness                                        |
| 7   | Addon   | 🔴 High  | Missing `aksel_docs_search` tool                                        |
| 8   | Addon   | 🟡 Med   | Missing `aksel_component_examples` tool                                 |
| 9   | Addon   | 🟡 Med   | Missing `aksel_token_by_role` lookup                                    |
| 10  | Addon   | 🟢 Low   | Missing a11y guidelines resource                                        |
| 11  | QOL     | 🔴 High  | Inconsistent JSON serialization — pretty-print wastes 20–40% tokens     |
| 12  | QOL     | 🟡 Med   | `aksel_docs` wraps response in JSON with redundant `url` field          |
| 13  | QOL     | 🟡 Med   | Icon results include full `keywords[]` — redundant after keyword search |
| 14  | QOL     | 🟡 Med   | Structured logger missing `info` level; startup uses raw `console.info` |
| 15  | QOL     | 🟡 Med   | Design token/icon caches have TTL but data is static (bundled at build) |
| 16  | QOL     | 🟢 Low   | `componentPropsTool.slug` has no `.describe()` hint                     |
| 17  | QOL     | 🟢 Low   | `searchCriteria` echo in icon-search responses wastes tokens            |

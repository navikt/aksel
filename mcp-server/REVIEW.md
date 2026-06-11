# Aksel MCP Server — Incremental Improvement Review

Derived from the 13 manual testing sessions in [`mcp-server/references/`](./references). Findings are taken at face value: every session pain point is treated as a real signal, and the fix is framed as one of three levers we control:

| Tag          | Owner        | Meaning                                                                                              |
| ------------ | ------------ | ---------------------------------------------------------------------------------------------------- |
| `[MCP-DESC]` | MCP server   | Improve a tool/resource **description** so agents pick the right tool and phrase queries well.       |
| `[MCP-TOOL]` | MCP server   | Change tool **behavior** or add/convert a tool (findability).                                        |
| `[SKILL]`    | Aksel skill  | Cannot be solved by the MCP alone — belongs in the dedicated "how to use Aksel" skill. Flagged only. |
| `[DOCS]`     | aksel.nav.no | Underlying documentation content/indexing needs work.                                                |

> Several capabilities that sessions reported as "missing" already exist **as MCP resources** (`aksel-migrations://catalog`, `aksel-tokens://catalog`) and `aksel_get_token_details` already returns "did you mean" suggestions. MCP clients rarely auto-invoke resources — agents reliably call **tools**, not resources. So most of this review is about **findability and descriptions**, not net-new capability.

---

## 1. Executive summary

The single highest-impact problem across the sessions is **`aksel_find_docs` recall**. It uses pure substring scoring with no synonyms, tokenization, language normalization, or query-type detection, so it returns zero results for multi-word, conceptual, English, and migration queries — and only reliably matches exact component names. This one weakness produced friction in 7 of 13 sessions and pushed agents toward GitHub scraping and `runSubagent("Explore")` fallbacks.

The second theme is **routing**: token and migration questions get sent to `aksel_find_docs` (which can't answer them) instead of the dedicated token tool / catalogs. The capability exists; agents just don't discover it because it lives in resources and is not referenced from the descriptions agents actually read.

### Scored backlog (overview)

| #   | Theme                                                           | Sessions         | Impact | Effort | Primary owner               |
| --- | --------------------------------------------------------------- | ---------------- | ------ | ------ | --------------------------- |
| T1  | `find_docs` low recall (multi-word / conceptual / migration)    | 1,2,3,4,5,8,9,13 | High   | Med    | `[MCP-TOOL]`                |
| T2  | English vs Norwegian query mismatch                             | 1,3,4,5          | High   | Med    | `[MCP-TOOL]`                |
| T3  | Token questions mis-routed to docs search                       | 10,11,12,13      | High   | Low    | `[MCP-DESC]` + `[MCP-TOOL]` |
| T4  | Migration/codemod discovery (catalog is a resource, not a tool) | 7,8,9,13         | High   | Low    | `[MCP-TOOL]`                |
| T5  | No token browse/list tool (catalog is a resource)               | 13               | Med    | Low    | `[MCP-TOOL]`                |
| T6  | Component existence / closest-alternative signaling             | 1                | Med    | Med    | `[MCP-TOOL]`                |
| T7  | Icon name aliases / "did you mean"                              | 1                | Med    | Low    | `[MCP-TOOL]`                |
| T8  | 0-result fallback strategy not documented                       | 4,5,13           | High   | Low    | `[SKILL]`                   |
| T9  | Tool-selection routing heuristics (token vs docs vs component)  | 4,5,10,11        | Med    | Low    | `[SKILL]`                   |
| T10 | Detect library context early / auto-validate after install      | 4                | Med    | —      | `[SKILL]`                   |
| T11 | Breaking-change vs deprecation not distinguished                | 9                | Med    | Low    | `[DOCS]` + `[SKILL]`        |
| T12 | Version-specific setup (Tailwind v3 vs v4)                      | 2                | Med    | —      | `[SKILL]` + `[DOCS]`        |
| T13 | Large doc payload `%20` path failure                            | 2                | Low    | —      | Client-side (not MCP)       |
| T14 | Speculative / unnecessary tool calls                            | 5                | Low    | —      | `[SKILL]`                   |
| T15 | Migration docs not indexed/sectioned on site                    | 8,13             | Med    | Med    | `[DOCS]`                    |

---

## 2. Methodology

- Source: 13 session transcripts/notes (`session-1.md` … `session-13.md`) covering setup (Vite, Tailwind), component selection (Button, TextField, icons), token lookups, and v6/v7→v8 migrations.
- Each issue is mapped to exactly one owner tag and one backlog theme (see §8 traceability table).
- MCP recommendations cite the **verbatim current description** from [`src/tools/tools.ts`](./src/tools/tools.ts) before proposing a rewrite.
- `[SKILL]` items are flagged only — no skill content is drafted here (the dedicated Aksel skill owns that).

---

## 3. Per-tool review

### 3.1 `aksel_find_docs` — the priority fix

**Current description (verbatim):**

> "Find Aksel documentation pages by query and return matching docs paths. Use this before calling aksel_get_doc or aksel_get_component_info."

**Current `query` param (verbatim):**

> "Search query for documentation pages (e.g. 'button', 'form', 'tabs')."

**Current ranking:** pure substring scoring — exact name/path 100, name-startsWith 90, name-includes 80, path-includes 70, category/subcategory-includes 40. No tokenization, synonyms, stemming, or language normalization.

**Why it fails (sessions 1–5, 8, 9, 13):**

- Multi-word queries (`"getting started setup installation"`, `"tailwind css configuration setup"`, `"textfield error label form"`) score 0 because the full string never appears as a substring of any single name/path. (S1, S2, S5)
- English queries fail where Norwegian succeeds (`"button"` vs `"knapp"`, English vs `"feilmelding"`). (S1, S3, S4, S5)
- Conceptual / process queries (`"migration upgrade v8"`, `"breaking changes"`, `"codemod"`) have no matching page name, so they dead-end with no next step. (S8, S9, S13)
- Net effect: ~57% call success in S13; reliable only for exact component names.

**Recommendations:**

`[MCP-TOOL]` **Tokenize the query and score per-term.** Split the query on whitespace, match each term independently against name/path/category/keywords, and rank by number of matched terms + per-term score. This alone fixes the multi-word zero-result problem (a query like `"button component react usage variants"` would match on `button`).

`[MCP-TOOL]` **Add a synonym/alias map with EN↔NO normalization.** A small static map resolves the biggest recurring misses. Seed it from the sessions:

| Query term                                                          | Should also match     |
| ------------------------------------------------------------------- | --------------------- |
| `button` ↔ `knapp`                                                  | Button                |
| `textfield`, `input`, `text field`                                  | TextField             |
| `error`, `feilmelding`, `validation`                                | error/validation docs |
| `setup`, `install`, `installation`, `getting started`, `kom i gang` | onboarding/setup      |
| `migration`, `upgrade`, `codemod`, `migrering`, `oppgrader`         | migration pages       |
| `tokens`, `design tokens`, `farger`                                 | token docs            |
| `tailwind`, `tailwind config`                                       | Tailwind setup        |

`[MCP-TOOL]` **Query-type detection + cross-tool routing in the zero-result payload.** Today the no-match payload is:

> `{ "message": "No documentation pages found for query: ...", "hint": "Try a broader keyword such as a component name or category." }`

Make the hint actionable and route to the right tool/resource:

- If the query looks like a token (`bg-…`, `text-…`, `border-…`, `surface-…`, or contains "token"/"color"/"farge") → hint: _"This looks like a design token. Use `aksel_get_token_details` or browse `aksel-tokens://catalog`."_
- If the query contains migration/version terms (`v6`/`v7`/`v8`, "migration", "codemod", "upgrade", "migrering") → hint: _"For version migrations use the migrations catalog (`aksel-migrations://catalog`) / `aksel_find_migrations`."_
- Otherwise → suggest the top-N nearest doc names by single-term overlap so the agent always gets candidates instead of a dead end.

`[MCP-DESC]` **Rewrite the description** to set expectations about scope and the fallback path. Proposed:

> "Search Aksel documentation pages (components, patterns, guides) and return matching paths. Accepts multi-word and Norwegian/English queries. Call this before `aksel_get_doc` / `aksel_get_component_info`. NOTE: this searches pages — for design tokens use `aksel_get_token_details`/`aksel-tokens://catalog`, and for version migrations use `aksel_find_migrations`/`aksel-migrations://catalog`. If a query returns no results, retry with a single keyword (e.g. a component name) before falling back."

`[MCP-DESC]` **Rewrite the `query` param** to nudge good inputs:

> "Keywords describing the page you want. Prefer one or two words; component names work best (e.g. 'button', 'knapp', 'textfield', 'tailwind'). Avoid long sentences."

---

### 3.2 `aksel_get_doc`

**Current description (verbatim):**

> "Fetch official Aksel documentation by path. IMPORTANT: Use `aksel_find_docs` (or `aksel-docs://index`) to get the correct path first. Do NOT guess paths."

**Sessions:** S2 — a large doc was written to a temp file and the follow-up `read_file` failed because the path contained URL-encoded spaces (`%20`).

**Assessment:** `T13` is a **client-side** large-result/path-handling issue (the MCP returned correct content). Not an MCP defect.

`[MCP-DESC]` Minor: the tool returns raw Markdown — fine. No change required to behavior. Optionally note in the description that responses can be large so clients should expect file-backed results. Otherwise keep as-is.

---

### 3.3 `aksel_get_component_info`

**Current description (verbatim):**

> "Fetch structured information for an Aksel component by slug or docs path.\n\nWorkflow:\n1. Find the component path using aksel_find_docs or aksel-docs://index\n2. Call this tool with either slug ('komponenter/core/button') or path ('/komponenter/core/button.md')\n\nExample: aksel_get_component_info({ component: \"/komponenter/core/button.md\" })"

**Sessions:** S1 — agent assumed a generic `Card` component exists (it doesn't; only `ExpansionCard`/`InfoCard`/`LinkCard`), and assumed invalid props (`textAlign` on `Box`). The agent only discovered the truth after a type error.

**Recommendations:**

`[MCP-TOOL]` **Closest-alternative on 404.** Current not-found payload just says "verify the path". When a component isn't found, return nearest existing component slugs (substring/token match against the docs index) — same pattern `aksel_get_token_details` already uses for tokens. For `Card` this would surface `ExpansionCard`, `InfoCard`, `LinkCard`.

`[MCP-DESC]` Add an explicit "props are authoritative" note so agents prefer this tool over guessing prop names:

> "...Returns the authoritative prop list for the component — treat any prop not listed here as invalid (e.g. `Box` has no `textAlign`). On a miss, the response includes the closest existing component names."

`[SKILL]` A generic prop-validator endpoint (input: component + proposed props → invalid props + replacements) was suggested in S1. This is better expressed as skill guidance: _"always confirm props via `aksel_get_component_info` before using them."_ The component-info response already carries the data needed to validate.

---

### 3.4 `aksel_find_icons`

**Current description (verbatim):**

> "Find and filter Aksel icons by category, subcategory, keyword, and variant. Use aksel-icons://category-catalog to discover available categories first."

**Sessions:** S1 — `HomeIcon`, `GitHubLogoIcon` assumed but invalid; correct names are `HouseIcon`, `CodeIcon`. S6 — worked perfectly (the baseline of good behavior).

**Recommendations:**

`[MCP-TOOL]` **Keyword aliases / "did you mean".** Extend keyword matching with a small alias map so common external naming resolves to Aksel names: `home → House`, `github → Code`, `back/previous → ArrowLeft`, `settings → Cog`, etc. When `keyword` yields zero matches, return the nearest icon names instead of just a generic hint.

`[MCP-DESC]` Minor nudge so agents don't assume names:

> "...Icon names follow Aksel naming, not common aliases (e.g. 'home' → `House`, 'github' → `Code`). Search by keyword rather than guessing exact names."

---

### 3.5 `aksel_get_token_details`

**Current description (verbatim):**

> "Fetch complete details for a specific Aksel design token by name. Returns all metadata including value, rawValue, CSS/SCSS/LESS/JS accessors, semantic information, and usage guidelines."

**Current `tokenName` param (verbatim):**

> "The token name to fetch details for (e.g., 'bg-neutral-moderate', 'shadow-dialog'). Use the aksel-tokens://catalog resource to browse available tokens."

**Sessions:** S10, S11, S12, S13 — agents tried `aksel_find_docs` for token questions first and burned calls; then direct token lookup worked. S13 — old v7 tokens (`text-action`, `surface-action`) correctly fail, but agents had no way to **browse/discover** valid names and resorted to build-error trial-and-error.

**Important:** the tool **already returns "did you mean" suggestions** (up to 5 substring matches via `similarTokens`). The problem is (a) agents don't reach this tool for token questions, and (b) there's no list/browse tool. Findings are at face value, so we fix both via findability.

**Recommendations:**

`[MCP-DESC]` **Make this the obvious entry point for token questions** (it currently reads as "details for a token you already know"):

> "Look up an Aksel design token by name and get its value, accessors (CSS/SCSS/LESS/JS), semantics, and usage. THIS is the right tool for any token/color question — do not use `aksel_find_docs` for tokens. Unknown or outdated names (e.g. v7 `text-action`) return the closest existing tokens. To browse all tokens use `aksel_find_tokens` / `aksel-tokens://catalog`."

`[MCP-DESC]` Add a token-name pattern hint to the param so agents can construct names:

> "Token name, e.g. 'bg-neutral-moderate', 'text-danger', 'shadow-dialog'. Tokens follow `<role>-<tone>-<emphasis>` patterns. To discover names use `aksel_find_tokens` or the catalog."

See §4.2 for the new browse tool that closes the discovery gap (T5).

---

## 4. Findability gaps — convert resources to tools

MCP clients reliably call **tools** but rarely auto-load **resources**. Two high-value capabilities are currently locked inside resources, which is exactly why sessions reported them as "missing."

### 4.1 `aksel_find_migrations` (new tool wrapping `aksel-migrations://catalog`) — T4

**Sessions:** S7 (couldn't find any codemods at all), S8 (couldn't find the v6 codemod command), S9 (didn't use MCP for breaking changes), S13 (no direct path to migration info → fell back to Explore).

`[MCP-TOOL]` Add a tool that surfaces the already-existing migrations catalog so agents discover it without knowing the resource URI. Proposed shape:

- Input: optional `version` (e.g. `"v8"`, `"7"`, or `"7->8"`).
- Output: matching codemods with `name`, `description`, `warning`, plus the `runCommand` (`npx @navikt/aksel codemod <name>`) and `cliVersion` already in the catalog.

**Proposed description:**

> "List Aksel codemods/migrations for upgrading between major versions. Use for any 'how do I migrate / upgrade / codemod / breaking changes' question (e.g. v6→v7, v7→v8). Returns codemod names, descriptions, warnings, and the exact `npx @navikt/aksel codemod <name>` command."

This directly closes S7/S8/S13's dead ends and gives S9 a structured source for "what changed."

### 4.2 `aksel_find_tokens` (new tool wrapping `aksel-tokens://catalog`) — T5

**Sessions:** S13 — "Unable to systematically browse token catalog (only works with exact names)"; trial-and-error via build errors.

`[MCP-TOOL]` Add a browse/filter tool over the existing tokens catalog:

- Input: optional `query`/`keyword`, `category`, `type`, `role` (e.g. `neutral`, `danger`), `limit`.
- Output: lightweight `{ name, comment, category, type }` rows (same shape as the catalog), so agents can discover names then drill in with `aksel_get_token_details`.

**Proposed description:**

> "Browse and filter Aksel design tokens by keyword, category, type, or semantic role (e.g. 'danger', 'neutral'). Use this to discover token names, then call `aksel_get_token_details` for full metadata. Prefer this over `aksel_find_docs` for any token question."

### 4.3 Reference resources from tool descriptions

`[MCP-DESC]` Even keeping the resources, every related tool description should name the relevant resource/tool inline (done in the rewrites above). Agents read tool descriptions far more than resource lists, so cross-references in descriptions are the cheapest findability win.

---

## 5. Cross-cutting MCP improvements

`[MCP-TOOL]` **Shared search/normalization layer.** T1+T2 (docs), T3+T5 (tokens), T7 (icons) all share the same root cause: exact-substring matching with no tokenization, alias map, or language normalization. Implement one small helper (tokenize → normalize case/diacritics → apply alias map → per-term scoring) and reuse it in `find-docs`, `find-icons`, and the new token-browse tool. This avoids divergent search behavior across tools.

`[MCP-TOOL]` **Consistent zero-result contract.** Standardize every "no match" payload to include: `message`, an actionable `hint`, and `nearestMatches` (top candidates). `aksel_get_token_details` already does the "did you mean" pattern — bring `find_docs`, `find_icons`, and `get_component_info` up to the same standard so agents never hit a true dead end.

---

## 6. Skill-owned items (flagged only)

These cannot be fixed by the MCP server alone and belong in the dedicated "how to use Aksel" skill. Flagged per the brief — not drafted here.

- `[SKILL]` **T8 — 0-result fallback strategy.** What to do when `aksel_find_docs` returns nothing (retry with a single keyword/component name; for tokens go to token tools; for migrations go to migrations tool). (S4, S5, S13)
- `[SKILL]` **T9 — tool-selection routing.** When to use docs search vs `aksel_get_component_info` vs `aksel_get_token_details` vs `aksel_find_migrations`. Token/color → token tool; version/upgrade → migrations tool; component API/props → component info; concepts/guides → docs search. (S10, S11, S12, S13)
- `[SKILL]` **T10 — detect Aksel context early & auto-validate after install.** Anchor answers to the Aksel library when the workspace uses it, and run a quick post-install check (versions, imports, basic API) against component info without waiting to be asked. (S4)
- `[SKILL]` **T11 — breaking vs deprecation discipline.** When enumerating changes, separate strict breaking changes from deprecations/future removals. (S9)
- `[SKILL]` **T12 — version-aware setup.** Detect Tailwind v3 vs v4 (and Aksel major) and apply the version-specific template rather than generic directives. (S2)
- `[SKILL]` **T14 — avoid speculative tool calls.** Don't fetch components that aren't needed for the answer (e.g. `FormSummary` lookup that went unused). (S5)
- `[SKILL]` **Component existence discipline.** Confirm a component/prop exists via `aksel_get_component_info` before using it (no generic `Card`; `Box` has no `textAlign`). (S1)

---

## 7. Documentation-content items (aksel.nav.no)

These need changes to the underlying docs/index, beyond MCP wiring.

- `[DOCS]` **T15 — migration content discoverability.** Index migration guides/changelogs distinctly from component docs and/or expose a dedicated "Migration" section so they surface in search and `aksel-docs://index`. (S8, S13)
- `[DOCS]` **T11 — breaking vs deprecation labeling.** Mark changelog entries explicitly as breaking vs deprecated so both the MCP and the skill can filter reliably. (S9)
- `[DOCS]` **T12 — version-specific setup docs.** Ensure Tailwind setup docs clearly delineate v3 vs v4 import/layer patterns. (S2)

---

## 8. Traceability — every session issue → recommendation → owner

| Session | Issue (face value)                                    | Theme | Recommendation                                   | Owner                       |
| ------- | ----------------------------------------------------- | ----- | ------------------------------------------------ | --------------------------- |
| S1      | `find_docs("getting started setup installation")` → 0 | T1    | Tokenize + synonyms + onboarding aliases         | `[MCP-TOOL]`                |
| S1      | English fails, NO works                               | T2    | EN↔NO alias map                                  | `[MCP-TOOL]`                |
| S1      | No generic `Card`                                     | T6    | Closest-alternative on component 404             | `[MCP-TOOL]`                |
| S1      | Invalid `Box.textAlign`                               | T6    | "props authoritative" note + skill discipline    | `[MCP-DESC]` / `[SKILL]`    |
| S1      | Icon name mismatches (`HomeIcon`)                     | T7    | Icon alias / did-you-mean                        | `[MCP-TOOL]`                |
| S1      | Dev-server cwd verify fail                            | —     | Client/terminal, not MCP                         | n/a                         |
| S2      | `"tailwind css configuration setup"` → 0              | T1    | Tokenize + `tailwind` alias                      | `[MCP-TOOL]`                |
| S2      | Large doc `%20` path fail                             | T13   | Client-side path handling                        | n/a                         |
| S2      | Generic Tailwind v3 vs Aksel v4                       | T12   | Version-aware setup                              | `[SKILL]` / `[DOCS]`        |
| S3      | English fails, Norwegian succeeds                     | T2    | EN↔NO normalization                              | `[MCP-TOOL]`                |
| S4      | Library context detected late                         | T10   | Detect Aksel context early                       | `[SKILL]`                   |
| S4      | Multiple `find_docs` queries → 0                      | T1    | Tokenize + synonyms                              | `[MCP-TOOL]`                |
| S4      | No auto-validation post-install                       | T10   | Auto-validate after install                      | `[SKILL]`                   |
| S5      | Form queries → 0; component info worked               | T1    | Tokenize + form/feilmelding aliases              | `[MCP-TOOL]`                |
| S5      | No documented fallback after 0 results                | T8    | Fallback strategy                                | `[SKILL]`                   |
| S5      | Unneeded `FormSummary` call                           | T14   | Avoid speculative calls                          | `[SKILL]`                   |
| S6      | No issues (baseline good)                             | —     | —                                                | n/a                         |
| S7      | Codemods not discoverable                             | T4    | `aksel_find_migrations` tool                     | `[MCP-TOOL]`                |
| S8      | v6 codemod not in docs search                         | T4    | `aksel_find_migrations` + migration aliases      | `[MCP-TOOL]`                |
| S8      | No machine-readable migration lookup                  | T4    | Catalog already exists → expose as tool          | `[MCP-TOOL]`                |
| S9      | Breaking vs deprecation mixed                         | T11   | Filter discipline + docs labels                  | `[SKILL]` / `[DOCS]`        |
| S9      | MCP docs tools not used for changes                   | T4    | Migrations tool + skill routing                  | `[MCP-TOOL]` / `[SKILL]`    |
| S10     | Token query tried docs first                          | T3    | Route hint in description + skill                | `[MCP-DESC]` / `[SKILL]`    |
| S10     | No heuristic to route token queries                   | T9    | Skill routing rules                              | `[SKILL]`                   |
| S11     | 3 doc searches failed for token color                 | T3    | Token route hint + zero-result routing           | `[MCP-DESC]` / `[MCP-TOOL]` |
| S11     | Unclear which tool for tokens                         | T9    | Skill routing + token desc rewrite               | `[SKILL]` / `[MCP-DESC]`    |
| S12     | Doc search 0 for token name                           | T3    | Token route hint + browse tool                   | `[MCP-DESC]` / `[MCP-TOOL]` |
| S13     | Migration queries → 0                                 | T1/T4 | Migrations tool + migration aliases              | `[MCP-TOOL]`                |
| S13     | `find_docs` only exact component names                | T1    | Tokenized per-term scoring                       | `[MCP-TOOL]`                |
| S13     | No token browsing                                     | T5    | `aksel_find_tokens` tool                         | `[MCP-TOOL]`                |
| S13     | Trial-and-error token names                           | T5    | Browse tool + existing did-you-mean surfaced     | `[MCP-TOOL]` / `[MCP-DESC]` |
| S13     | No suggestions for non-existent tokens                | T3    | Already returns `similarTokens`; surface in desc | `[MCP-DESC]`                |
| S13     | No direct path to migration docs                      | T15   | Migrations tool + docs indexing                  | `[MCP-TOOL]` / `[DOCS]`     |
| S13     | Conceptual queries unhandled                          | T1    | Tokenize + zero-result candidates                | `[MCP-TOOL]`                |

---

## 9. Suggested implementation order

1. **`aksel_find_docs` recall** (T1, T2): tokenized per-term scoring + EN↔NO synonym/alias map + actionable zero-result routing. _(Unblocks the most sessions.)_
2. **Expose migrations & token catalogs as tools** (T4, T5): `aksel_find_migrations`, `aksel_find_tokens`. _(Low effort, converts "missing" → discoverable.)_
3. **Description rewrites** (T3, T6, T7 wording; token/component/icon tools): cheap, high routing impact.
4. **Closest-alternative on `get_component_info` 404** (T6) and **icon aliases** (T7): reuse the token tool's did-you-mean pattern.
5. **Shared search/normalization helper + consistent zero-result contract** (§5): consolidate behavior.
6. Hand off `[SKILL]` and `[DOCS]` items (§6, §7) to the Aksel skill and docs owners.

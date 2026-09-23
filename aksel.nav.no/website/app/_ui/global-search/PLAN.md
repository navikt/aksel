# Global search – refactor plan

Goals: faster results, a clean client/server split following Next.js best practices, and an autocomplete UX with arrow-key navigation (virtual focus).

Work is split into blocks. **Each block = one PR.** Blocks are ordered; block 3 must land before block 4.

---

## Findings (baseline review)

### Performance

- **F1** `new Fuse(...)` is built on every search, over the whole corpus incl. body text (`server/GlobalSearch.actions.ts`).
- **F2** Search runs as a Server Action: POST, not cacheable, serialized per client (queued while typing), not abortable.
- **F3** Result payload is large: full `FuseResult` (`matches`, `refIndex`) plus `lvl2-4`/`content` is sent for every hit.
- **F4** `fetchArticles()` runs before the `query.length < 2` guard. `minMatchCharLength: 3` doesn't match the guard of 2.
- **F5** `fetchArticles` uses `client.fetch` (no sync tags). Freshness relies on `cacheLife("hours")`. **Decision: keep as is.**
- **F6** The whole search tree (incl. two large inline SVGs) is `"use client"` and ships eagerly on every page.

### Bugs / ranking

- **F7** Sort comparator returns `1` when neither item is an override → inconsistent comparator, can scramble Fuse ranking.
- **F8** `topResults` are duplicated inside `groupedHits`.
- **F9** `totalHits` counts capped hits (max 10/type). Code comment says 20.
- **F10** Anchor is taken from `matches[0]`, not the best match.

### State / architecture

- **F11** Indirect data flow: input → debounce → `replaceState` → `useSearchParams` → effect → action. `useSearchParams` forces a Suspense boundary.
- **F12** Manual `useMemo`/`useCallback` although React Compiler is on. Two contexts. `useIsMac` sets state in an effect.
- **F13** No loading state (`isPending` unused), no error state.

### UX / a11y

- **F14** `aria-autocomplete="both"` without combobox semantics. No arrow-key navigation.
- **F15** `aria-live` regions are mounted conditionally → often not announced.
- **F16** `StatusTag` is `aria-hidden` (e.g. "Avviklet" is never announced). Thumbnail has both `alt` and `aria-hidden`.

---

## Decisions

| #   | Topic                   | Decision                                                                                                                                                                                                               |
| --- | ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Q1  | URL state               | `?query=` deep links must keep working, but the URL does not drive the search. Local state is the source of truth.                                                                                                     |
| Q12 | URL mirroring           | Read `?query=` once on load (opens dialog + prefill). Debounced write-only `replaceState` mirror. Cleared on close.                                                                                                    |
| Q2  | Combobox implementation | Custom, small, website-local. Follow the APG combobox/listbox pattern. No ds-react changes.                                                                                                                            |
| Q13 | Option markup           | `li[role=option]` wrapping a real `<a>` (DocSearch-style), to keep middle-click/Cmd+click/copy-link.                                                                                                                   |
| Q14 | Keyboard                | ↑/↓ (wrap), Enter opens, Cmd/Ctrl+Enter opens in new tab, Home/End stay in input, Esc clears then closes, scroll into view, hover sets active, results not in tab order. First result auto-active. No PageUp/PageDown. |
| Q4  | Ranking                 | Add a golden-query test set and tune against it.                                                                                                                                                                       |
| Q18 | Golden queries          | Drafted from current behaviour (~20 queries), then reviewed/corrected by the team.                                                                                                                                     |
| Q5  | Top-hit duplicates      | Remove "Beste treff" items from their type groups.                                                                                                                                                                     |
| Q20 | Result caps             | Keep the 10/type cap. Show the real total: "Komponenter (10 av 23)".                                                                                                                                                   |
| Q21 | Match highlighting      | No.                                                                                                                                                                                                                    |
| Q22 | Section context         | Show a breadcrumb ("Button › Tilgjengelighet") when a hit has an anchor.                                                                                                                                               |
| Q6  | Content before typing   | Deferred. Discuss after blocks 1–4.                                                                                                                                                                                    |
| Q7  | Shortcuts               | Keep Cmd/Ctrl+K and Cmd/Ctrl+B.                                                                                                                                                                                        |
| Q8  | Tests                   | Unit tests for search logic + component tests (Vitest + Testing Library) for keyboard/ARIA.                                                                                                                            |
| Q9  | Analytics               | Keep events as is.                                                                                                                                                                                                     |
| Q28 | Analytics vs debounce   | Accept a higher `SOK` event count from the shorter debounce. No separate analytics debounce.                                                                                                                           |
| Q10 | Comic Sans easter egg   | Keep, but isolate it (own function, reset on dialog close).                                                                                                                                                            |
| Q15 | Loading / error         | Spinner in input while fetching, keep previous results visible, inline "Søket feilet, prøv igjen" on error.                                                                                                            |
| Q16 | Index freshness         | Keep `cacheLife("hours")`.                                                                                                                                                                                             |
| Q17 | Bundle                  | Trigger button eager. Dialog content via `next/dynamic`, preloaded on button hover/focus and on shortcut.                                                                                                              |
| Q19 | File structure          | `server/` = server-only (fetch, index, search). Config/types shared. Client split by responsibility. Keep `GlobalSearch.*` naming.                                                                                     |
| —   | Search location         | Server. Avoid shipping the index to the client.                                                                                                                                                                        |
| Q23 | Transport               | GET route handler `/api/search?q=` + `AbortController` + `Cache-Control: max-age=60` + client in-memory query cache.                                                                                                   |
| Q24 | Fuse index lifetime     | Built once per process in a module variable, keyed on a version stamp returned by `fetchArticles`. Rebuilt only when data changes.                                                                                     |
| Q25 | Debounce                | 100–120ms.                                                                                                                                                                                                             |
| Q26 | Min query length        | 2 for both the guard and `minMatchCharLength`. Verify with golden queries.                                                                                                                                             |
| Q27 | Endpoint guards         | zod validation + max query length (~100 chars). No rate limiting.                                                                                                                                                      |

---

## Block 1 – Safety net + bug fixes

Scope: correctness and a11y fixes on the current architecture. No transport changes.

- [ ] Extract pure search logic (Fuse options, format, group, sort) so it can be unit tested without Next/Sanity.
- [ ] Add golden-query tests (~20 queries: component names, Norwegian/English synonyms e.g. knapp/button, typos, deep headings). Snapshot current behaviour first, then review expected hits with the team. **Must land before the ranking changes below.**
- [ ] F7: fix sort comparator (return `0` when neither is an override).
- [ ] F10: resolve anchor from the best match (prefer heading matches, then content), not `matches[0]`.
- [ ] Q5 / F8: remove top hits from type groups.
- [ ] Q20 / F9: track the real total per type. Render "Type (shown av total)". Fix the stale "20" comment.
- [ ] Q26 / F4: align min length to 2 (guard + `minMatchCharLength`). Move the guard before `fetchArticles()`.
- [ ] F16: make the status tag readable by screen readers (no `aria-hidden`, or visually hidden text). Fix the thumbnail (`alt=""` + no `aria-hidden` conflict).

Done when: golden + unit tests are green and results are unchanged except for the intended fixes.

## Block 2 – Data layer

Scope: server-side speed and a lean API.

- [x] Q24 / F1: module-level Fuse instance, rebuilt only when the `fetchArticles` version stamp changes.
- [x] Q23 / F2: add GET `app/api/search/route.ts` (`?q=`). zod-validate, max length ~100 (Q27). Response header `Cache-Control: max-age=60`.
- [x] F3: trimmed response shape: `heading`, `slug`, `_type`, `status`, `description`, `anchor`, section heading for anchor hits (Q22), per-type totals.
- [x] Remove the `fuseGlobalSearch` Server Action.
- [ ] Unit tests for the route (validation, empty/short query, shape).
- [ ] Measure before/after (server search time + response size) and note it in the PR.

Done when: the client calls the GET endpoint, the Server Action is gone, and payload/timing improvements are documented.

## Block 3 – Client refactor

Scope: Next.js client/server best practices, state simplification, perceived speed.

- [ ] Q1 / Q12 / F11: local query state as the source of truth. Read `?query=` once on mount (open + prefill). Debounced write-only `replaceState` mirror, cleared on close. Drop `useSearchParams` and the extra Suspense boundary if no longer needed.
- [ ] Q23: fetch with `AbortController` (abort superseded requests) + client in-memory query→results cache.
- [ ] Q25: debounce 100–120ms.
- [ ] Q15 / F13: spinner in input while pending, keep previous results, inline error state.
- [ ] F12: merge into one context. Remove manual memoization (React Compiler). Replace `useIsMac` effect with `useSyncExternalStore` or equivalent.
- [ ] Q17 / F6: trigger button eager. Dialog content via `next/dynamic`, preloaded on hover/focus/shortcut. Keep illustrations out of the eager bundle.
- [ ] Q19: restructure files (`server/` server-only, shared config/types, client split by responsibility).
- [ ] Q7: keep Cmd/Ctrl+K and Cmd/Ctrl+B. Q10: isolate the Comic Sans easter egg, reset on close.

Done when: behaviour matches block 2 output, `?query=` deep links work, and the initial page JS no longer includes the dialog content.

## Block 4 – Autocomplete UX

Scope: APG combobox with virtual focus.

- [ ] Custom combobox hook (Q2): input `role="combobox"`, `aria-expanded`, `aria-controls`, `aria-activedescendant`, `aria-autocomplete="list"` (fixes F14).
- [ ] Listbox with one `role="group"` per type (labelled by the group heading). `li[role=option]` wraps `<a>` (Q13). Unique stable option ids.
- [ ] Keyboard per Q14: ↑/↓ wrap, first result auto-active, Enter opens, Cmd/Ctrl+Enter opens in new tab, Home/End stay in input, Esc clears then closes, scroll active option into view, hover sets active, results not in tab order.
- [ ] Q22: breadcrumb for anchor hits.
- [ ] F15: always-mounted live region for result count / "Ingen resultater".
- [ ] Component tests (Vitest + Testing Library): keyboard navigation, ARIA attributes, live region announcements, Enter/Cmd+Enter behaviour.

Done when: search is fully usable with the keyboard from the input alone, and a11y tests are green.

## Block 5 – Later

- [ ] Q6: content before typing (recent searches, curated quick links, etc.). To be discussed after blocks 1–4.

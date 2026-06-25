# DataGridPreferences — Component Review

Scope: `@navikt/core/react/src/data-grid-preferences/**`
Status: Not yet released — breaking changes allowed.

## Findings

| #   | Category     | Finding                                                                                                               | Severity    | Recommendation                                                                                                            |
| --- | ------------ | --------------------------------------------------------------------------------------------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------- |
| 1   | API          | ~15 hardcoded Norwegian strings (labels, legends, aria-label). `/* TODO: i18n */` left in code.                       | 🔴          | Wire to existing `useI18n` system before release (as Timeline/Process/Dialog do).                                         |
| 2   | API          | Not exported from `src/index.ts` and not attached to `DataGrid` namespace, yet error msg says `DataGrid.Preferences`. | 🔴          | Decide public surface (standalone `DataGridPreferences` vs `DataGrid.Preferences`) and wire it.                           |
| 3   | API          | Error message references `DataGrid.Preferences` but exported name is `DataGridPreferences` — inconsistent.            | 🟡          | Align message with the chosen public name.                                                                                |
| 4   | API          | `default export` in `DataGridPreferencesRoot.tsx` alongside named export; rest of lib is named-export only.           | 🟢          | Drop the `export default`.                                                                                                |
| 5   | Code Quality | `useDataGridContext(false)` + manual `throw` duplicates the strict-context throw behavior.                            | 🟢          | Use strict `useDataGridContext()` (keep specific message via context `errorMessage`).                                     |
| 6   | Code Quality | Root handlers (`handleOpenChange`, `handleSave`, `handleColumnsChange`) recreated each render.                        | 🟡 ✅ Fixed | `useCallback` them — `handleColumnsChange` busts `ColumnSettings`' internal `useCallback` memo.                           |
| 7   | Performance  | `resolveDataGridSettings(draft)` runs every render and feeds new `value` objects to all sub-panels.                   | 🟢 ✅ Fixed | Wrap `resolvedDraft` in `useMemo([draft])`.                                                                               |
| 8   | Performance  | `columnEntries` `useMemo` lists both `columnDefinitionMap` and `columnDefinitions`.                                   | ⚪ Invalid  | `columnDefinitions` is used directly in the memo body (fallback `.map`), so `exhaustive-deps` requires it. Not redundant. |
| 9   | A11y / UX    | "Velg alle" select-all is a `Switch` with no indeterminate/partial state (shows off while some columns visible).      | 🟡          | Use a `Checkbox` with `indeterminate` for select-all semantics.                                                           |
| 10  | API          | Props extend full `React.ButtonHTMLAttributes`; consumer `onClick` is spread onto the trigger `Button`.               | 🟡          | Confirm `DialogTrigger` composes vs overrides consumer `onClick`; consider narrowing the prop set.                        |
| 11  | Code Quality | Empty `@example` block in JSDoc on the public component.                                                              | 🟢          | Fill in a minimal usage example.                                                                                          |
| 12  | Code Quality | `stickyColumns` start/end hardcoded to `1` in layout settings; magic strings `"sticky-start"`/`"sticky-end"`.         | 🟢          | Fine for now (type only allows `1`); extract constants if it grows.                                                       |

## Details

### Finding #6 / #7 — Stabilize handlers and resolved draft

```tsx
// before
const resolvedDraft = resolveDataGridSettings(draft);

function handleOpenChange(nextOpen: boolean) { ... }
function handleSave() { ... }
function handleColumnsChange(columns) { ... }
```

```tsx
// after
const resolvedDraft = useMemo(() => resolveDataGridSettings(draft), [draft]);

const handleOpenChange = useCallback((nextOpen: boolean) => { ... }, [tableSettings]);
const handleSave = useCallback(() => { ... }, [tableSettings, updateTableSettings]);
const handleColumnsChange = useCallback((columns) => { ... }, []);
```

`handleColumnsChange` changing identity each render defeats the `useCallback`s
inside `DataGridPreferencesColumnSettings` (`setDndItems`, `toggleAll`,
`toggleColumn` all depend on `onColumnsChange`).

### Finding #5 — Redundant context guard

```tsx
// before
const context = useDataGridContext(false);
if (!context) {
  throw new Error(
    "[Aksel] DataGrid.Preferences must be used within a DataGrid",
  );
}
```

`createStrictContext` already throws on missing provider when `strict` (default).
Either rely on it (and set a specific `errorMessage` on the `DataGridContext`)
or keep the manual guard but drop the double work.

### Finding #1 — i18n

Established pattern in the repo:

```tsx
import { useI18n } from "../../utils/i18n/i18n.hooks";

const translate = useI18n("DataGrid");
// translate("preferences.title"), etc.
```

All visible strings ("Innstillinger", "Radtetthet", "Kolonner",
"Zebra-striper", "Velg alle", "Lagre", "Avbryt", descriptions, aria-label)
should go through this.

### Finding #9 — Select-all semantics

A `Switch` toggled on/off can't represent "some but not all columns visible".
A `Checkbox` with `indeterminate={!isAllVisible && visibleCount > 0}` communicates
partial selection to assistive tech and sighted users.

## Notes (verified, no action)

- `header: string` on `ColumnDefinition`, so `label: string` in
  `DataGridPreferencesColumnDisplay` is correct (not a type lie).
- Diff-on-save is correct: draft is seeded from the resolved settings and
  `diffDataGridSettings` compares by reference, so only user-touched keys are
  emitted. Cancel / X correctly discard the draft (reset on next open).

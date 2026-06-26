# DataGridPreferences — Component Review

Scope: `root/DataGridPreferencesRoot.tsx` and its direct settings sub-components,
helpers, stories and tests. i18n intentionally excluded.

Baseline reviewed: dialog with built-in settings (row density, text size, row
properties, column layout, column display) + draft/save/cancel flow + newly
added controlled-dialog props (`open`, `defaultOpen`, `onOpenChange`,
`onOpenChangeComplete`, `rootElement`).

## Findings

| #   | Category         | Finding                                                                                                                                                                                                                                                                                                                                                                       | Severity    | Recommendation                                                                                                                           |
| --- | ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Potential Issue  | Draft is only seeded from `tableSettings` inside `handleOpenChange`, which fires solely on Dialog-initiated open/close. Opening via the controlled `open` prop, or starting open via `defaultOpen`, never seeds the draft → dialog shows resolved **defaults** instead of the current table settings, and Save diffs against `tableSettings` so it can emit spurious changes. | 🔴 ✅ Fixed | Seeded on `open` edge via `useClientLayoutEffect`; `tableSettings` excluded from deps to avoid resetting an in-progress draft.           |
| 2   | API              | Controlled-mode props added but no story/test exercises them. Combined with #1, the controlled contract is unverified.                                                                                                                                                                                                                                                        | 🟡 ✅ Fixed | Added `Controlled` story + `TestControlledOpenSeedsDraft` play-test (opens via external button, asserts seeding from `defaultSettings`). |
| 3   | API / Naming     | Throw message `"DataGrid.Preferences must be used within a DataGrid"` and JSDoc `@see {@link DataGridPreferences}` imply a compound `DataGrid.Preferences`, but it ships as a standalone `DataGridPreferences` (alias of `DataGridPreferencesRoot`) and isn't wired into the public `src/index.ts`.                                                                           | 🟡          | Align the error text with the real API name; decide compound vs standalone; wire the export when releasing.                              |
| 4   | Accessibility    | "Velg alle (n/total)" uses a `Switch` with a binary `checked`. On partial selection it reads as off, which is misleading. The conventional pattern is a `Checkbox` with `indeterminate`.                                                                                                                                                                                      | 🟡          | Use `Checkbox` with `indeterminate={!isAllVisible && visibleCount > 0}` for select-all.                                                  |
| 5   | API              | `DataGridPreferencesProps extends React.ButtonHTMLAttributes`, yet the component is a Dialog + trigger button. Button attrs in `...rest` land on the trigger while dialog props are siblings on the same object. `onClick` from `rest` may collide with the `DialogTrigger`'s injected handler.                                                                               | 🟢          | Compose the trigger's onClick via `composeEventHandlers`; document that `rest` targets the trigger button.                               |
| 6   | Consistency      | Field visibility is handled two ways: `rowDensity`/`textSize`/`columnDisplay` are gated by `isFieldVisible(...)` at the root, while `RowProperties`/`ColumnLayout` receive a `fields` object and self-hide (returning `null`).                                                                                                                                                | 🟢          | Acceptable (grouped settings have sub-fields). Note for future consistency.                                                              |
| 7   | Maintainability  | Magic strings `"sticky-start"` / `"sticky-end"` and the literal `1` for sticky width in `ColumnLayoutSettings`.                                                                                                                                                                                                                                                               | 🟢          | Extract named constants.                                                                                                                 |
| 8   | Docs             | Component `@example` JSDoc contains an empty ` ```jsx ``` ` block.                                                                                                                                                                                                                                                                                                            | 🟢 ✅ Fixed | Filled with a minimal `DataGrid` + `DataGridPreferences` usage example.                                                                  |
| 9   | Default mismatch | `DataGridSettingsDefaults.truncateContent = true` unconditionally, but `DataGridSettings.truncateContent` documents the default as `false` when `layout="auto"`. The panel can't see `layout`, so the preview checkbox can disagree with the grid's effective default.                                                                                                        | 🟢          | Acknowledge; ideally read the resolved default from the grid context.                                                                    |

## Details

### Finding #1 — controlled/default open skips draft seeding

```tsx
const handleOpenChange = useCallback(
  (nextOpen: boolean) => {
    if (nextOpen) {
      setDraft(tableSettings ?? {}); // ← only runs on Dialog-initiated open
    }
    setOpenStateInternal(nextOpen);
  },
  [tableSettings, setOpenStateInternal],
);
```

`Dialog` calls `onOpenChange` for user interactions (trigger click, Esc,
backdrop). It does **not** call it when the `open` prop is changed by the
consumer, nor for `defaultOpen` on mount. So in those paths `draft` stays `{}`
→ `resolvedDraft` falls back to `DataGridSettingsDefaults`, not the grid's
actual `tableSettings`.

Suggested fix (seed on open edge, covers controlled + defaultOpen):

```tsx
useClientLayoutEffect(() => {
  if (open) {
    setDraft(tableSettings ?? {});
  }
}, [open]); // intentionally not depending on tableSettings to avoid mid-edit resets
```

(Keep `handleOpenChange` for the close/cancel side; drop its seeding to avoid
double work, or guard it.)

### Finding #4 — select-all should be indeterminate

```tsx
// DataGridPreferencesColumnSettings
<Switch size="small" checked={isAllVisible} onChange={toggleAll}>
  {`Velg alle (${visibleCount}/${columns.length})`}
</Switch>
```

With `0 < visibleCount < columns.length` the switch shows off. Prefer a
tri-state checkbox:

```tsx
<Checkbox
  size="small"
  checked={isAllVisible}
  indeterminate={!isAllVisible && visibleCount > 0}
  onChange={toggleAll}
>
  {`Velg alle (${visibleCount}/${columns.length})`}
</Checkbox>
```

---

## Status legend

- 🔴 Critical — bug / a11y violation / breaking API
- 🟡 Warning — suboptimal pattern, perf, API inconsistency
- 🟢 Suggestion — nice-to-have / minor

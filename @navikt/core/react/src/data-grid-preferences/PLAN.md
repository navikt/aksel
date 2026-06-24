# DataGrid Preferences — Improvement Plan

Tracking improvements/refactors for `@navikt/core/react/src/data-grid-preferences`.

Status legend: `[ ]` todo · `[~]` in progress · `[x]` done

---

## High value

### 1. i18n — wire up translations

- [ ] Replace hardcoded Norwegian strings with `useI18n("DataGridPreferences")`.
- [ ] Affected strings: `"Innstillinger"`, `"Avbryt"`, `"Lagre"`, `"Åpne innstillinger for tabell"` (button aria-label), group legends (`"Tekststørrelse"`, `"Radegenskaper"`, `"Sticky kolonner"`, `"Velg radtetthet"`, `"Vis kolonner"`, `"Velg alle"`), checkbox labels + descriptions, `DataGridSettingsOptions` labels.
- [ ] Add translation entries (see existing `Process` / `Timeline` / `MonthPicker` for pattern).
- [ ] Remove the `/* TODO: i18n */` markers once done.

Reference: `src/utils/i18n/i18n.hooks.ts`, usage in `src/process/Process.tsx`.

### 2. Fix `truncateContent` default mismatch (bug)

- [x] Panel showed `truncateContent ?? false`, but grid default is `true` (when `layout !== "auto"`). Opening the panel showed it unchecked while the table actually truncated → out of sync.
- [x] Resolved by #3: panel now reads canonical defaults via `resolveDataGridSettings`, not raw `draft`.

### 3. Centralize setting defaults (single source of truth)

- [x] Removed scattered `?? false` / `?? true` magic in `DataGridPreferencesRoot` JSX.
- [x] Added `DataGridSettingsDefaults` + `resolveDataGridSettings()` (+ `ResolvedDataGridSettings` type) in `src/data-grid/root/DataGrid.types.ts`.
- [x] `useDataGridSettings` now uses `resolveDataGridSettings(settings)`.
- [x] Prefs panel uses a single `resolvedDraft = resolveDataGridSettings(draft)` for all setting values, so panel + table can't drift. Also pre-selects defaults (e.g. rowDensity, textSize) in the UI.

### 4. Add tests

- [ ] Create `__tests__` for the preferences component.
- [ ] Cover: draft save, cancel/discard, reset-on-open, `columnDividers` default-checked, sticky toggle, column visibility/reorder.

---

## Medium value

### 5. Move presentation labels out of data layer

- [ ] `DataGridSettingsOptions` (Norwegian labels) currently lives in `src/data-grid/root/DataGrid.types.ts`, mixing data model with UI copy.
- [ ] Move labels to the preferences/i18n layer.

### 6. Reconsider `columnDividers` placement

- [ ] Currently under "Radegenskaper" (row properties) though it's a column property; sits oddly next to "Sticky kolonner".
- [ ] Decide: own group, or merge into a dedicated columns group. (UX decision needed.)

---

## Low value

### 7. Reduce type duplication

- [ ] `DataGridPreferencesColumnDisplay = { id, label, visible }` vs `DataGridSettings["columnDisplay"][number]` (`{ id, visible }`).
- [ ] Derive the label-extended type from the source type to avoid drift.

### 8. Diff-only settings update

- [ ] `updateTableSettings?.(draft)` sends the whole draft incl. untouched keys (harmless, merges). Optionally send only changed keys.

---

## Suggested order

1. ~~#1 i18n + #2/#3 defaults bug (related — do together)~~ → #2/#3 done; #1 i18n still todo
2. #4 tests
3. #5, #6 (cleanup / UX)
4. #7, #8 (nice-to-have)

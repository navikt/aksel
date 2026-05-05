### Component: DataTable

**Primitive type:** Data table with optional selection, sorting, nested rows, details panels, sticky columns, column resizing, and keyboard cell navigation.
**Reference libraries:** React Aria Table / Adobe Spectrum TableView, MUI Data Grid, Base UI table patterns. Cloudscape Table is a useful secondary reference for resize/details behavior.

### Launch Review Findings

1. **The auto API has no visible caption slot or caption prop.**
   Consumers can still pass `aria-label`/`aria-labelledby` through native table props, but `children?: never` means the preview API cannot render a native `caption` or a built-in visible summary/title. Mature table APIs usually provide at least one clear accessible naming path.

2. **Column resizing is present, but the preview API still reads as unfinished.**
   Resizing is effectively opt-out in fixed layout because `DataTableColumnHeader` defaults `resizable` to `true`. The interaction also still has unfinished accessibility and i18n details, and `onWidthChange` currently fires for every width step while dragging.

3. **Critical behaviors are under-tested for a preview launch.**
   Existing tests cover selection trees, item expansion state, and low-level keyboard helpers, but not the end-to-end behaviors users will notice first: sorting, details panels, loading states, row click behavior, column resizing, and selection accessibility.

### Feature Gap Table

| #   | Feature                                             | Status     | Priority        | Reference                    | Notes                                                                   |
| --- | --------------------------------------------------- | ---------- | --------------- | ---------------------------- | ----------------------------------------------------------------------- |
| 1   | Arrow/Home/End keyboard cell navigation             | ✅ Present | —               | React Aria, MUI              | Good base coverage in helper tests.                                     |
| 2   | Controlled/uncontrolled sorting                     | ✅ Present | —               | React Aria, MUI              | Supports controlled and uncontrolled sort arrays.                       |
| 3   | Multi-column sorting                                | ✅ Present | —               | MUI, Spectrum                | Shift-click is supported.                                               |
| 4   | Controlled/uncontrolled row selection               | ✅ Present | —               | React Aria, MUI              | Single and multiple selection both exist.                               |
| 5   | Controlled/uncontrolled nested row expansion        | ✅ Present | —               | MUI, Spectrum                | `subRows` API is already solid for preview.                             |
| 6   | Controlled/uncontrolled details panel expansion     | ✅ Present | —               | MUI                          | Good baseline, limited to top-level rows by design.                     |
| 7   | Loading overlay / loading rows / empty state        | ✅ Present | —               | MUI, Spectrum                | Baseline states exist.                                                  |
| 9   | Visible caption / built-in accessible naming path   | ❌ Missing | 🔴 Expected     | React Aria, Spectrum         | Auto API cannot render `caption`; users only get raw HTML attrs.        |
| 13  | Opt-in / polished column resize API                 | ⚠️ Partial | 🟡 Valuable     | MUI, Cloudscape              | Feature exists, but defaults and a11y polish are not preview-ready yet. |
| 14  | Per-row disabled selection callback                 | ❌ Missing | 🟡 Valuable     | React Aria, MUI              | Current API only accepts disabled keys, not row-driven logic.           |
| 15  | Row-level prop/className callback                   | ❌ Missing | 🟡 Valuable     | MUI                          | No way to attach row-specific attrs/classes without custom rendering.   |
| 16  | Header-group / multi-row header support in auto API | ❌ Missing | 🟢 Nice-to-have | React Aria, MUI              | Current auto API is intentionally flat.                                 |
| 17  | Accessor shorthand for simple columns               | ❌ Missing | 🟢 Nice-to-have | MUI, TanStack-style patterns | Would reduce boilerplate for simple data tables.                        |
| 18  | Typeahead row navigation                            | ❌ Missing | 🟢 Nice-to-have | React Aria                   | Useful on large data sets, not necessary for first preview.             |
| 19  | RTL-aware sticky/nesting layout                     | ❌ Missing | 🟢 Nice-to-have | React Aria, MUI              | Current sticky/nesting CSS is mostly physical, not logical.             |

### Implementation Notes

#### 9. Visible caption / built-in accessible naming path

- **What it does:** Lets consumers provide a native table caption or a clearly supported naming API without dropping to raw HTML attributes.
- **Reference behavior:** React Aria tables require an accessible label; Spectrum and MUI also expose a clear naming path.
- **Approach here:** Keep `children` forbidden, but add a `caption?: React.ReactNode` prop that renders a native `caption`. Optionally add `captionProps` for styling hooks.
- **Props/API additions needed:** `caption?: React.ReactNode`, optionally `captionProps?: React.HTMLAttributes<HTMLTableCaptionElement>`.

#### 13. Opt-in / polished column resize API

- **What it does:** Makes resize behavior predictable and avoids surprising every preview consumer with advanced header affordances.
- **Reference behavior:** MUI and Cloudscape treat column resize as an explicit feature and spend a lot of API surface on labels, limits, and commit behavior.
- **Approach here:** Default `resizable` to `false`, add missing slider aria metadata, and only call `onWidthChange` on commit or with a small debounce. Also move hard-coded Norwegian labels into the same i18n pattern as the rest of the component.
- **Props/API additions needed:** No new public props required for a first pass. The main change is default behavior and polish.

#### 14. Per-row disabled selection callback

- **What it does:** Lets consumers disable selection from row data instead of precomputing key arrays.
- **Reference behavior:** Many mature table APIs allow row-driven selection rules.
- **Approach here:** Resolve disabled state during row collection so selection helpers can still work with ids internally.
- **Props/API additions needed:** `isRowSelectionDisabled?: (rowData: T) => boolean`.

#### 15. Row-level prop/className callback

- **What it does:** Lets consumers add row-specific classes, test hooks, aria hooks, and state styling without replacing the table implementation.
- **Reference behavior:** MUI exposes row-class callbacks and row metadata hooks.
- **Approach here:** Apply callbacks when rendering `DataTableTr` so the row id and row data are both available.
- **Props/API additions needed:** `getRowProps?: (rowData: T, rowId: string | number) => React.HTMLAttributes<HTMLTableRowElement>` or a narrower `getRowClassName` if you want to keep the API tighter.

### Internal Refactors

1. Split the current root into a small orchestration hook plus presentational sub-components. `DataTableRoot.tsx` currently owns state setup, context assembly, loading/empty rendering, row rendering, and sticky-wrapper logic in one file.

2. Replace object-keyed `itemDetails` lookups with id-keyed row entries. This fixes the duplicate-object bug and simplifies details-panel and selection wiring.

3. Unify loading-state presence checks. `DataTableTBodyContent` uses nullish checks for `loadingState`, while `showLoadingOverlay` in the root uses truthiness checks; those should match.

4. Make localization an explicit seam. The component currently hard-codes visible and aria labels such as sort-resize instructions, expand/collapse labels, and selection labels directly in render code.

5. Revisit the resize default and commit path before large-table performance work. Continuous `onWidthChange` callbacks can easily push rerenders through the whole table if consumers control widths externally.

6. Decide whether the preview API is a plain table or the start of a data-grid abstraction. A few current seams, especially keyboard navigation and selection, are already grid-like, while captioning and row-header semantics still assume a plain table model.

### Test Gaps Before Preview

1. Sorting interaction story/test covering click, keyboard activation, and multi-sort.
2. Details-panel story/test covering expand, collapse, `aria-controls`, and controlled mode.
3. Loading/empty-state tests covering overlay vs skeleton vs custom loading content.
4. Row-click tests covering selection interaction, text-selection guard, and interactive-content guard.
5. Resize tests covering keyboard resize, pointer resize, and form embedding.
6. Accessibility test coverage for selection labels and row-header semantics once those are implemented.

### Suggested Order For Follow-up Work

1. Fix selection labeling and row-header semantics together.
2. Add a built-in caption/naming API.
3. Harden resize defaults and button semantics.
4. Refactor row metadata to be id-based.
5. Fill the missing user-facing stories/tests around sort, details, loading, and row click.

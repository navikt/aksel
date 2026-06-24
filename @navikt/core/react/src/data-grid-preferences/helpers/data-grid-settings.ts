import type { DataGridSettings } from "../../data-grid/root/DataGrid.types";

/**
 * Fully resolved settings where every value (except `columnDisplay`) has a
 * defined default applied.
 */
type ResolvedDataGridSettings = Required<
  Omit<DataGridSettings, "columnDisplay">
> &
  Pick<DataGridSettings, "columnDisplay">;

/**
 * Canonical default values for all settings.
 *
 * Single source of truth — consumed both by the grid (`useDataGridSettings`)
 * and the preferences panel, so the two can never drift apart.
 */
const DataGridSettingsDefaults: ResolvedDataGridSettings = {
  rowDensity: "standard",
  zebraStripes: false,
  truncateContent: true,
  stickyColumns: {},
  textSize: "medium",
  columnDividers: true,
  columnDisplay: undefined,
};

/**
 * Merges user-provided settings with {@link DataGridSettingsDefaults},
 * returning a fully resolved settings object.
 */
function resolveDataGridSettings(
  settings?: DataGridSettings,
): ResolvedDataGridSettings {
  return {
    rowDensity: settings?.rowDensity ?? DataGridSettingsDefaults.rowDensity,
    zebraStripes:
      settings?.zebraStripes ?? DataGridSettingsDefaults.zebraStripes,
    truncateContent:
      settings?.truncateContent ?? DataGridSettingsDefaults.truncateContent,
    stickyColumns:
      settings?.stickyColumns ?? DataGridSettingsDefaults.stickyColumns,
    textSize: settings?.textSize ?? DataGridSettingsDefaults.textSize,
    columnDividers:
      settings?.columnDividers ?? DataGridSettingsDefaults.columnDividers,
    columnDisplay:
      settings?.columnDisplay ?? DataGridSettingsDefaults.columnDisplay,
  };
}

/**
 * Returns a partial settings object containing only the keys whose value in
 * `next` differs from `base` (compared by reference).
 *
 * Used when saving the preferences draft so we only emit the settings the user
 * actually changed, instead of the whole draft.
 */
function diffDataGridSettings(
  base: DataGridSettings,
  next: DataGridSettings,
): Partial<DataGridSettings> {
  const diff: Partial<DataGridSettings> = {};

  for (const key of Object.keys(next) as (keyof DataGridSettings)[]) {
    if (!Object.is(next[key], base[key])) {
      Object.assign(diff, { [key]: next[key] });
    }
  }

  return diff;
}

export type { ResolvedDataGridSettings };
export {
  DataGridSettingsDefaults,
  diffDataGridSettings,
  resolveDataGridSettings,
};

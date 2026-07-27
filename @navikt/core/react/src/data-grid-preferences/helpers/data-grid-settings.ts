import type { DataGridSettings } from "../../data-grid/root/DataGrid.types";

/**
 * Fully resolved settings where every value (except `columnDisplay`) has a
 * defined default applied.
 */
type ResolvedDataGridSettings = Required<
  Omit<DataGridSettings, "columnDisplay">
> &
  Pick<DataGridSettings, "columnDisplay">;

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
  settings: DataGridSettings,
): ResolvedDataGridSettings {
  return {
    rowDensity: settings.rowDensity ?? DataGridSettingsDefaults.rowDensity,
    zebraStripes:
      settings.zebraStripes ?? DataGridSettingsDefaults.zebraStripes,
    truncateContent:
      settings.truncateContent ?? DataGridSettingsDefaults.truncateContent,
    stickyColumns:
      settings.stickyColumns ?? DataGridSettingsDefaults.stickyColumns,
    textSize: settings.textSize ?? DataGridSettingsDefaults.textSize,
    columnDividers:
      settings.columnDividers ?? DataGridSettingsDefaults.columnDividers,
    columnDisplay:
      settings.columnDisplay ?? DataGridSettingsDefaults.columnDisplay,
  };
}

export { resolveDataGridSettings };

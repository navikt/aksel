import type { DataGridTableSettings } from "./DataGrid.types";

function resolveDefaultSettings(
  settings:
    | {
        table: DataGridTableSettings;
      }
    | undefined,
): {
  table: DataGridTableSettings;
} {
  return {
    table: {
      rowDensity: settings?.table.rowDensity ?? "normal",
      zebraStripes: settings?.table.zebraStripes ?? false,
      truncateContent: settings?.table.truncateContent,
      stickyColumns: settings?.table.stickyColumns ?? {},
      textSize: settings?.table.textSize ?? "medium",
    },
  };
}

export { resolveDefaultSettings };

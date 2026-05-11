import type { SelectionProps } from "./selection.types";

function canSelectTableRow(
  disableRowSelection: SelectionProps["disableRowSelection"],
  args: { row: any; id: string | number },
): boolean {
  if (typeof disableRowSelection === "function") {
    return !disableRowSelection(args);
  }
  return disableRowSelection === false;
}

export { canSelectTableRow };

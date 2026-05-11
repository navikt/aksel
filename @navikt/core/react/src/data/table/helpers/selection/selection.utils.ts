import type { SelectionProps } from "./selection.types";

function canSelectTableRow<T>(
  disableRowSelection: SelectionProps<T>["disableRowSelection"],
  args: { row: T; id: string | number },
): boolean {
  if (typeof disableRowSelection === "function") {
    return !disableRowSelection(args);
  }
  return disableRowSelection === false || disableRowSelection === undefined;
}

export { canSelectTableRow };

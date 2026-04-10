import { focusCell } from "./table-focus";

function getFirstCell(tableRef: HTMLTableElement): Element | null {
  return tableRef.querySelector("td, th");
}

function focusInitialTableTarget(
  tableRef: HTMLTableElement | null,
): Element | null {
  if (!tableRef) {
    return null;
  }

  const firstCell = getFirstCell(tableRef);
  return firstCell ? focusCell(firstCell) : null;
}

export { getFirstCell, focusInitialTableTarget };

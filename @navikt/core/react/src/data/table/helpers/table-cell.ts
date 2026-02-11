import { focusCell } from "./table-focus";

function getFirstCell(tableRef: HTMLTableElement): Element | null {
  return tableRef.querySelector("td, th");
}

function getActiveCell(
  tableRef: HTMLTableElement | null,
  activeCell: Element | null,
): Element | null {
  if (!tableRef) {
    return null;
  }

  if (activeCell) {
    return activeCell;
  }

  const firstCell = getFirstCell(tableRef);
  return firstCell ? focusCell(firstCell) : null;
}

export { getActiveCell, getFirstCell };

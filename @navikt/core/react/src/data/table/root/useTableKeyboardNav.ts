import { useEffect, useState } from "react";
import { useEventCallback } from "../../../utils/hooks";

type DirectionsT = "ArrowUp" | "ArrowDown" | "ArrowLeft" | "ArrowRight";

function useTableKeyboardNav(
  tableRef: HTMLTableElement | null,
  { enabled }: { enabled: boolean },
) {
  const [currentCell, setCurrentCell] = useState<Element | null>(null);

  const onKeyDown = useEventCallback((event: KeyboardEvent): void => {
    if (!tableRef) {
      return;
    }
    const key = event.key;

    let newCell: Element | null = null;
    /**
     * TODO: Check for "abort"-events, like currently editing input, open menu, etc. to avoid interfering with other interactions
     */
    switch (key) {
      case "ArrowDown":
      case "ArrowUp":
      case "ArrowLeft":
      case "ArrowRight": {
        event.preventDefault();
        newCell = onNavigationKeyDown(
          keyToCoord(key as DirectionsT),
          tableRef,
          currentCell,
        );
        break;
      }
    }

    if (newCell && currentCell && newCell !== currentCell) {
      (currentCell as HTMLElement).tabIndex = -1;
    }

    if (newCell) {
      setCurrentCell(newCell);
    }
  });

  const onFocusIn = useEventCallback((event: FocusEvent): void => {
    if (!tableRef) {
      return;
    }

    const target = event.target as Element | null;
    const cell = target?.closest("td, th") ?? null;
    if (!cell || cell === currentCell) {
      return;
    }

    if (currentCell) {
      (currentCell as HTMLElement).tabIndex = -1;
    }

    (cell as HTMLElement).tabIndex = 0;
    setCurrentCell(cell);
  });

  useEffect(() => {
    if (!tableRef || !enabled) {
      return;
    }

    tableRef.addEventListener("keydown", onKeyDown);
    tableRef.addEventListener("focusin", onFocusIn);

    return () => {
      tableRef.removeEventListener("keydown", onKeyDown);
      tableRef.removeEventListener("focusin", onFocusIn);
    };
  }, [tableRef, onKeyDown, onFocusIn, enabled]);

  return {
    tableTabIndex: enabled ? (currentCell ? undefined : 0) : undefined,
    onFocus: () => {
      if (!currentCell && tableRef) {
        onNavigationKeyDown({ x: 0, y: 0 }, tableRef, currentCell);
      }
    },
  };
}

/**
 * TODO:
 * - Save original tabIndex of cells and restore when navigating away?
 */
function onNavigationKeyDown(
  coord: { x: number; y: number },
  tableRef: HTMLTableElement,
  currentCell: Element | null,
) {
  if (!currentCell) {
    const firstCell = tableRef.querySelector("td, th");
    return firstCell ? focusCell(firstCell) : null;
  }

  const currentRow = currentCell.closest("tr");
  if (!currentRow) {
    return null;
  }

  const allRows = tableRef.querySelectorAll("tr");
  const currentRowIndex = Array.from(allRows).indexOf(currentRow);

  const cellsInRow = currentRow.querySelectorAll("td, th");
  const currentCellIndex = Array.from(cellsInRow).indexOf(currentCell);

  const newRowIndex = currentRowIndex + coord.y;
  const newCellIndex = currentCellIndex + coord.x;

  const newRow = allRows[newRowIndex];
  if (!newRow) {
    return null;
  }

  const newCell = newRow.querySelectorAll("td, th")[newCellIndex];
  return newCell ? focusCell(newCell) : null;
}

function focusCell(cell: Element): Element {
  const el = cell as HTMLElement;
  el.tabIndex = 0;

  const focusTarget =
    el.querySelector(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"]), [contenteditable="true"]',
    ) ?? el;

  (focusTarget as HTMLElement).focus({
    preventScroll: true,
  });

  el.scrollIntoView({
    behavior: "smooth",
    block: "nearest",
    inline: "nearest",
  });
  return cell;
}

function keyToCoord(
  key: "ArrowUp" | "ArrowDown" | "ArrowLeft" | "ArrowRight",
): { x: number; y: number } {
  switch (key) {
    case "ArrowUp":
      return { x: 0, y: -1 };
    case "ArrowDown":
      return { x: 0, y: 1 };
    case "ArrowLeft":
      return { x: -1, y: 0 };
    case "ArrowRight":
      return { x: 1, y: 0 };
  }
}

export { useTableKeyboardNav };

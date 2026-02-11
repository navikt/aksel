import { useEffect, useRef, useState } from "react";
import { useEventCallback } from "../../../utils/hooks";
import { shouldBlockArrowKeyNavigation } from "../helpers/block-arrow-navigation";
import { getFocusableTarget } from "../helpers/focusable-target";
import { buildTableGrid } from "../helpers/table-grid";

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
    if (shouldBlockArrowKeyNavigation(event)) {
      return;
    }

    const activeCell = currentCell;

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
          activeCell,
        );
        break;
      }
    }

    if (newCell && activeCell && newCell !== activeCell) {
      (activeCell as HTMLElement).tabIndex = -1;
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
    const newCell = target?.closest("td, th") ?? null;
    if (!newCell || newCell === currentCell) {
      return;
    }

    if (currentCell) {
      (currentCell as HTMLElement).tabIndex = -1;
    }

    setCurrentCell(newCell);
  });

  /**
   * Lets us check if `currentCell` is removed:
   * - When filtering rows
   * - Pagination
   * - Column visibility changes
   */
  const observerRef = useRef<MutationObserver | null>(null);

  useEffect(() => {
    if (!tableRef || !enabled) {
      return;
    }

    observerRef.current = new MutationObserver(() => {
      if (currentCell && !currentCell.isConnected) {
        setCurrentCell(null);
      }
    });

    observerRef.current.observe(tableRef, { subtree: true, childList: true });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, [tableRef, enabled, currentCell]);

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
      if (!tableRef) {
        return;
      }
      if (!currentCell) {
        onNavigationKeyDown({ x: 0, y: 0 }, tableRef, null);
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

  const { grid, positions, maxCols } = buildTableGrid(tableRef);
  const currentPos = positions.get(currentCell);
  if (!currentPos) {
    return null;
  }

  const nextCell = findNextCell(grid, currentPos, coord, currentCell, maxCols);
  return nextCell ? focusCell(nextCell) : null;
}

function findNextCell(
  grid: (Element | undefined)[][],
  currentPos: { x: number; y: number },
  coord: { x: number; y: number },
  currentCell: Element,
  maxCols: number,
): Element | null {
  let x = currentPos.x + coord.x;
  let y = currentPos.y + coord.y;

  const maxRows = grid.length;

  while (y >= 0 && y < maxRows && x >= 0 && x < maxCols) {
    const row = grid[y] ?? [];
    const cell = row[x];
    if (cell && cell !== currentCell && !!getFocusableTarget(cell)) {
      return cell;
    }
    x += coord.x;
    y += coord.y;
  }

  return null;
}

function focusCell(cell: Element): Element | null {
  const focusTarget = getFocusableTarget(cell);
  if (!focusTarget) {
    return null;
  }

  if (focusTarget === cell) {
    (cell as HTMLElement).tabIndex = 0;
  }

  focusTarget.focus({
    preventScroll: true,
  });

  focusTarget.scrollIntoView({
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

import { useEffect } from "react";
import { useEventCallback } from "../../../utils/hooks";
import { focusInitialTableTarget } from "../helpers/table-cell";
import { focusCellAndUpdateTabIndex } from "../helpers/table-focus";
import { findNextFocusableCell } from "../helpers/table-grid-nav";
import {
  getDeltaFromKey,
  shouldBlockArrowKeyNavigation,
} from "../helpers/table-keyboard";
import { useGridCache } from "../hooks/useGridCache";

function useTableKeyboardNav(
  tableRef: HTMLTableElement | null,
  { enabled }: { enabled: boolean },
) {
  const { getTableGrid, activeCell, setActiveCell } = useGridCache(
    tableRef,
    enabled,
  );

  /**
   * TODO:
   * - Save original tabIndex of cells and restore when navigating away?
   */
  const findNextCellInDirection = useEventCallback(
    (delta: { x: number; y: number }) => {
      if (!tableRef) {
        return null;
      }

      let currentCell = activeCell;
      currentCell ??= focusInitialTableTarget(tableRef);

      if (!currentCell) {
        return null;
      }

      const { grid, positions } = getTableGrid(tableRef);
      const currentPos = positions.get(currentCell);

      if (!currentPos) {
        return null;
      }

      const nextCell = findNextFocusableCell(
        grid,
        currentPos,
        delta,
        currentCell,
      );

      return nextCell
        ? focusCellAndUpdateTabIndex(nextCell, currentCell)
        : null;
    },
  );

  /**
   * Handles keyboard navigation with arrow keys.
   * We check if the key is an arrow key, and if so, we calculate the next cell to focus based on the current active cell and the grid structure.
   *
   * TODO:
   * - Check for other "blocking" scenarios, like actionmenus, dropdown etc
   * - Consider having acallback user can hook into to determine if navigation should be blocked
   * - Consider adding Home, End, PageUp, PageDown navigation
   *
   */
  const handleTableKeyDown = useEventCallback((event: KeyboardEvent): void => {
    /* Stops keydown from moving if we can assume that you are currently editing input, select etc */
    if (shouldBlockArrowKeyNavigation(event)) {
      return;
    }

    let newCell: Element | null = null;

    const delta = getDeltaFromKey(event.key);
    if (delta) {
      event.preventDefault();
      newCell = findNextCellInDirection(delta);
    }

    newCell && setActiveCell(newCell);
  });

  /**
   * When focus is moved to elements inside a cell like inputs, checkbox etc
   * we want to update the active cell to the parent td/th, so that keyboard navigation continues to work as expected from there.
   */
  const handleTableFocusIn = useEventCallback((event: FocusEvent): void => {
    const target = event.target as Element | null;

    if (tableRef && target === tableRef) {
      focusInitialTableTarget(tableRef);
      return;
    }

    const newCell = target?.closest("td, th") ?? null;
    if (!newCell || newCell === activeCell) {
      return;
    }

    const updatedCell = focusCellAndUpdateTabIndex(newCell, activeCell, {
      shouldFocus: false,
    });
    if (updatedCell) {
      setActiveCell(updatedCell);
    }
  });

  /**
   * Attach event listeners for keyboard navigation and focus management.
   */
  useEffect(() => {
    if (!tableRef || !enabled) {
      return;
    }

    tableRef.addEventListener("keydown", handleTableKeyDown);
    tableRef.addEventListener("focusin", handleTableFocusIn);

    return () => {
      tableRef.removeEventListener("keydown", handleTableKeyDown);
      tableRef.removeEventListener("focusin", handleTableFocusIn);
    };
  }, [tableRef, handleTableKeyDown, handleTableFocusIn, enabled]);

  return {
    /* Table should only have tabIndex until the focus is moved inside and is enabled */
    tableTabIndex: enabled ? (activeCell ? undefined : 0) : undefined,
  };
}

export { useTableKeyboardNav };

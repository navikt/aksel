import { useEffect } from "react";
import { useEventCallback } from "../../../utils/hooks";
import { focusInitialTableTarget } from "../helpers/table-cell";
import { focusCellAndUpdateTabIndex } from "../helpers/table-focus";
import {
  findFirstCell,
  findFirstCellInRow,
  findLastCell,
  findLastCellInRow,
  findNextFocusableCell,
} from "../helpers/table-grid-nav";
import {
  type NavigationAction,
  getNavigationAction,
  shouldBlockNavigation,
} from "../helpers/table-keyboard";
import { useGridCache } from "../hooks/useGridCache";

type UseTableKeyboardNavOptions = {
  enabled: boolean;
  /**
   * Custom callback to determine if navigation should be blocked.
   * Called before default blocking logic.
   */
  shouldBlockNavigation?: (event: KeyboardEvent) => boolean;
};

function useTableKeyboardNav(
  tableRef: HTMLTableElement | null,
  { enabled, shouldBlockNavigation: customBlockFn }: UseTableKeyboardNavOptions,
) {
  const { getTableGrid, activeCell, setActiveCell } = useGridCache(
    tableRef,
    enabled,
  );

  /**
   * Executes a navigation action and returns the target cell.
   */
  const executeNavigationAction = useEventCallback(
    (action: NavigationAction) => {
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

      let nextCell: Element | null = null;

      switch (action.type) {
        case "delta": {
          if (!currentPos) {
            return null;
          }
          nextCell = findNextFocusableCell(grid, currentPos, action.delta);
          break;
        }

        case "home": {
          if (!currentPos) {
            return null;
          }
          nextCell = findFirstCellInRow(grid, currentPos.y);
          break;
        }

        case "end": {
          if (!currentPos) {
            return null;
          }
          nextCell = findLastCellInRow(grid, currentPos.y);
          break;
        }

        case "tableStart": {
          nextCell = findFirstCell(grid);
          break;
        }

        case "tableEnd": {
          nextCell = findLastCell(grid);
          break;
        }
      }

      if (!nextCell || nextCell === currentCell) {
        return null;
      }

      return focusCellAndUpdateTabIndex(nextCell, currentCell);
    },
  );

  /**
   * Handles keyboard navigation with arrow keys, Home/End, and PageUp/PageDown.
   * Checks if navigation should be blocked based on current focus context.
   */
  const handleTableKeyDown = useEventCallback((event: KeyboardEvent): void => {
    if (customBlockFn?.(event)) {
      return;
    }

    if (shouldBlockNavigation(event)) {
      return;
    }

    const action = getNavigationAction(event);
    if (!action) {
      return;
    }

    event.preventDefault();
    const newCell = executeNavigationAction(action);
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
    tabIndex: enabled ? (activeCell ? undefined : 0) : undefined,
  };
}

export { useTableKeyboardNav };
export type { UseTableKeyboardNavOptions };

import { useEffect, useRef, useState } from "react";
import { useEventCallback } from "../../../utils/hooks";
import { getActiveCell, getFirstCell } from "../helpers/table-cell";
import { focusCell, focusCellAndUpdateTabIndex } from "../helpers/table-focus";
import {
  type GridCache,
  ensureTableGrid,
  findNextCell,
} from "../helpers/table-grid-nav";
import {
  getDeltaFromKey,
  shouldBlockArrowKeyNavigation,
} from "../helpers/table-keyboard";

function useTableKeyboardNav(
  tableRef: HTMLTableElement | null,
  { enabled }: { enabled: boolean },
) {
  const [activeCell, setActiveCell] = useState<Element | null>(null);
  const activeCellRef = useRef<Element | null>(null);
  activeCellRef.current = activeCell;

  const observerRef = useRef<MutationObserver | null>(null);

  const gridCacheRef = useRef<GridCache>({
    grid: null,
    dirty: true,
  });

  /**
   * TODO:
   * - Save original tabIndex of cells and restore when navigating away?
   */
  const navigateByArrowKey = useEventCallback(
    (delta: { x: number; y: number }) => {
      const currentCell = getActiveCell(tableRef, activeCell);
      if (!currentCell || !tableRef) {
        return null;
      }

      const { grid, positions, maxCols } = ensureTableGrid(
        tableRef,
        gridCacheRef.current,
      );
      const currentPos = positions.get(currentCell);

      if (!currentPos) {
        return null;
      }

      const nextCell = findNextCell(
        grid,
        currentPos,
        delta,
        currentCell,
        maxCols,
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
  const onKeyDown = useEventCallback((event: KeyboardEvent): void => {
    /* Stops keydown from moving if we can assume that you are currently editing input, select etc */
    if (shouldBlockArrowKeyNavigation(event)) {
      return;
    }

    let newCell: Element | null = null;

    const delta = getDeltaFromKey(event.key);
    if (delta) {
      event.preventDefault();
      newCell = navigateByArrowKey(delta);
    }

    newCell && setActiveCell(newCell);
  });

  /**
   * When focus is moved to elements inside a cell like inputs, checkbox etc
   * we want to update the active cell to the parent td/th, so that keyboard navigation continues to work as expected from there.
   */
  const onFocusIn = useEventCallback((event: FocusEvent): void => {
    const target = event.target as Element | null;
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
   * Observes changes is table structure and updates the grid cache accordingly.
   * - We want to check if elements are removed/added, like when filtering table, pagination etc
   * - Changes in colspan/rowspan that can affect the grid structure
   * - Hidden attribute or styles that can affect focusability of cells
   *
   * We also check if the active cell is removed from the DOM, and clear it if so.
   */
  useEffect(() => {
    if (!tableRef || !enabled) {
      return;
    }

    observerRef.current = new MutationObserver(() => {
      gridCacheRef.current.dirty = true;
      if (activeCellRef.current && !activeCellRef.current.isConnected) {
        setActiveCell(null);
      }
    });

    observerRef.current.observe(tableRef, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ["colspan", "rowspan", "hidden", "style"],
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, [tableRef, enabled]);

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

  /*
   * If keyboard-nav is re-enabled, we need to make sure to update the grid cache,
   * since the table might have changed while it was disabled.
   */
  useEffect(() => {
    if (!enabled) {
      return;
    }

    gridCacheRef.current.dirty = true;
  }, [enabled]);

  return {
    /* Table should only have tabIndex until the focus is moved inside and is enabled */
    tableTabIndex: enabled ? (activeCell ? undefined : 0) : undefined,
    /*
     * Allows us to capture focus on the table when navigating with Tab from outside, and move it to the first cell.
     * We only want to do this if there is no active cell.
     */
    onFocusCapture: () => {
      if (!tableRef || activeCell) {
        return;
      }

      const firstCell = getFirstCell(tableRef);
      return firstCell ? focusCell(firstCell) : null;
    },
  };
}

export { useTableKeyboardNav };

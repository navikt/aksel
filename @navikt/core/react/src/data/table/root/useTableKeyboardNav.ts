import { useEffect, useRef, useState } from "react";
import { useEventCallback } from "../../../utils/hooks";
import { focusInitialTableTarget } from "../helpers/table-cell";
import { focusCellAndUpdateTabIndex } from "../helpers/table-focus";
import {
  type GridCache,
  ensureTableGrid,
  findNextFocusableCell,
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

      const { grid, positions } = ensureTableGrid(
        tableRef,
        gridCacheRef.current,
      );
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

    tableRef.addEventListener("keydown", handleTableKeyDown);
    tableRef.addEventListener("focusin", handleTableFocusIn);

    return () => {
      tableRef.removeEventListener("keydown", handleTableKeyDown);
      tableRef.removeEventListener("focusin", handleTableFocusIn);
    };
  }, [tableRef, handleTableKeyDown, handleTableFocusIn, enabled]);

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
  };
}

export { useTableKeyboardNav };

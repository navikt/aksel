import { useCallback, useEffect, useRef, useState } from "react";
import { useValueAsRef } from "../../../utils/hooks";
import {
  type GridCache,
  buildTableGridMap,
  findFirstCell,
  findFirstCellInRow,
  isCellFocusable,
} from "../helpers/table-grid-nav";

/**
 * Manages the table grid cache and observes DOM changes that require grid rebuilding.
 * Watches for structural changes (rows/cells added/removed) and attribute changes
 * (colspan, rowspan, hidden) that affect grid layout.
 * Inline `style` is intentionally not observed: focus navigation writes
 * scroll-margin on every move, and the grid never reads styles.
 */
function useGridCache(tableRef: HTMLTableElement | null, enabled: boolean) {
  const gridCacheRef = useRef<GridCache>({
    grid: null,
    dirty: true,
  });

  const [activeCell, setActiveCellState] = useState<Element | null>(null);
  const activeCellRef = useValueAsRef(activeCell);
  const observerRef = useRef<MutationObserver | null>(null);
  const loadingCellPositionRef = useRef<{ x: number; y: number } | undefined>(
    undefined,
  );

  const getTableGrid = useCallback((_tableRef: HTMLTableElement) => {
    if (gridCacheRef.current.dirty || !gridCacheRef.current.grid) {
      gridCacheRef.current.grid = buildTableGridMap(_tableRef);
      gridCacheRef.current.dirty = false;
    }

    return gridCacheRef.current.grid;
  }, []);

  const setActiveCell = useCallback(
    (cell: Element | null) => {
      if (tableRef && cell) {
        /*
         * Make sure the cached grid includes cell.
         * Since setActiveCell is called with a potentially new cell, we need to rebuild the grid if it's dirty.
         */
        getTableGrid(tableRef);
      }
      setActiveCellState(cell);
    },
    [getTableGrid, tableRef],
  );

  useEffect(() => {
    if (!tableRef || !enabled) {
      return;
    }

    /*
     * Keeps the active cell (the roving tabindex target) valid when rows change.
     *
     * When the active cell's row is removed (page change, filtering, sorting, loading rows),
     * the table would otherwise have no tabbable cell. We then pick the cell at the same
     * x/y position in the new grid, clamped to its size, and fall back to the first focusable
     * cell in that row or table.
     *
     * Loading (`aria-busy="true"`): the real rows are often replaced by temporary loading rows,
     * and then by the new data. We save the position of the original cell when it is first
     * removed, keep it for the whole loading phase, and use it again when loading ends.
     * Otherwise, the position would point to a loading row instead of the cell the user left.
     */
    observerRef.current = new MutationObserver(() => {
      gridCacheRef.current.dirty = true;

      const isLoading = tableRef.getAttribute("aria-busy") === "true";
      const currentCell = activeCellRef.current;
      const hasLoadingPosition = loadingCellPositionRef.current !== undefined;
      const wasRemoved =
        currentCell !== null && !tableRef.contains(currentCell);
      /*
       * Restore when the active cell is gone, or when loading just ended with a saved position.
       * The second case covers loading states that render no focusable cells, so no active cell
       * was set while loading.
       */
      if (wasRemoved || (!isLoading && hasLoadingPosition)) {
        /*
         * Prefer the position saved during loading. Otherwise, read the removed cell's last
         * position from the cached grid. That grid was built before the mutation (see
         * `setActiveCell`), so it still has the cell even though it's gone from the DOM.
         */
        const position =
          loadingCellPositionRef.current ??
          (currentCell
            ? gridCacheRef.current.grid?.positions.get(currentCell)
            : undefined);
        if (isLoading) {
          // Save the first position only (`??` above), so loading rows don't replace it.
          loadingCellPositionRef.current = position;
        }
        // Rebuild from the current DOM, then pick the same x/y, clamped to the new grid.
        const { grid } = getTableGrid(tableRef);
        const rowIndex = Math.min(position?.y ?? 0, grid.length - 1);
        const row = grid[rowIndex] ?? [];
        const cell = row[Math.min(position?.x ?? 0, row.length - 1)];
        const nextCell = isCellFocusable(cell)
          ? cell
          : (findFirstCellInRow(grid, rowIndex) ?? findFirstCell(grid));

        /*
         * Only updates which cell is tabbable. Focus is not moved, so focus stays on the
         * control the user used (e.g. a pagination button).
         */
        setActiveCell(nextCell);
      }

      // Loading has ended and the position is restored. Clear it so the next load starts fresh.
      if (!isLoading) {
        loadingCellPositionRef.current = undefined;
      }
    });

    observerRef.current.observe(tableRef, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ["colspan", "rowspan", "hidden", "aria-busy"],
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, [tableRef, enabled, activeCellRef, getTableGrid, setActiveCell]);

  /**
   * If keyboard-nav is re-enabled, mark grid as dirty since
   * the table might have changed while it was disabled.
   */
  useEffect(() => {
    if (enabled) {
      gridCacheRef.current.dirty = true;
    }
  }, [enabled]);

  return {
    getTableGrid,
    activeCell,
    setActiveCell,
  };
}

export { useGridCache };

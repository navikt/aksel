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
 * (colspan, rowspan, hidden, style) that affect grid layout and focusability.
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
        // Retain the active cell's coordinates before its row is removed.
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

    observerRef.current = new MutationObserver(() => {
      gridCacheRef.current.dirty = true;

      const isLoading = tableRef.getAttribute("aria-busy") === "true";
      const currentCell = activeCellRef.current;
      const hasLoadingPosition = loadingCellPositionRef.current !== undefined;
      const wasRemoved =
        currentCell !== null && !tableRef.contains(currentCell);
      // Restore saved coordinates even if loading left no active cell.
      if (wasRemoved || (!isLoading && hasLoadingPosition)) {
        const position =
          loadingCellPositionRef.current ??
          (currentCell
            ? gridCacheRef.current.grid?.positions.get(currentCell)
            : undefined);
        if (isLoading) {
          // Keep the original coordinates across temporary loading rows.
          loadingCellPositionRef.current = position;
        }
        const { grid } = getTableGrid(tableRef);
        const rowIndex = Math.min(position?.y ?? 0, grid.length - 1);
        const row = grid[rowIndex] ?? [];
        const cell = row[Math.min(position?.x ?? 0, row.length - 1)];
        const nextCell = isCellFocusable(cell)
          ? cell
          : (findFirstCellInRow(grid, rowIndex) ?? findFirstCell(grid));

        // Update the tracked cell without moving focus from external controls.
        setActiveCell(nextCell);
      }

      if (!isLoading) {
        loadingCellPositionRef.current = undefined;
      }
    });

    observerRef.current.observe(tableRef, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ["colspan", "rowspan", "hidden", "style", "aria-busy"],
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

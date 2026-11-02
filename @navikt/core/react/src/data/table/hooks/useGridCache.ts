import { useCallback, useEffect, useRef, useState } from "react";
import { useValueAsRef } from "../../../utils/hooks";
import { type GridCache, buildTableGridMap } from "../helpers/table-grid-nav";

/**
 * Manages the table grid cache and observes DOM changes that require grid rebuilding.
 * Watches for structural changes (rows/cells added/removed) and attribute changes
 * (colspan, rowspan, hidden, style) that affect grid layout and focusability.
 * Style mutations that only touch scroll-margin (written during focus navigation) are ignored.
 */
function useGridCache(tableRef: HTMLTableElement | null, enabled: boolean) {
  const gridCacheRef = useRef<GridCache>({
    grid: null,
    dirty: true,
  });

  const [activeCell, setActiveCell] = useState<Element | null>(null);
  const activeCellRef = useValueAsRef(activeCell);
  const observerRef = useRef<MutationObserver | null>(null);

  useEffect(() => {
    if (!tableRef || !enabled) {
      return;
    }

    observerRef.current = new MutationObserver((records) => {
      if (records.every(isScrollMarginOnlyMutation)) {
        return;
      }

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
      attributeOldValue: true,
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, [tableRef, enabled, activeCellRef]);

  /**
   * If keyboard-nav is re-enabled, mark grid as dirty since
   * the table might have changed while it was disabled.
   */
  useEffect(() => {
    if (enabled) {
      gridCacheRef.current.dirty = true;
    }
  }, [enabled]);

  const getTableGrid = useCallback((_tableRef: HTMLTableElement) => {
    if (gridCacheRef.current.dirty || !gridCacheRef.current.grid) {
      gridCacheRef.current.grid = buildTableGridMap(_tableRef);
      gridCacheRef.current.dirty = false;
    }

    return gridCacheRef.current.grid;
  }, []);

  return {
    getTableGrid,
    activeCell,
    setActiveCell,
  };
}

function stripScrollMargin(style: string | null): string {
  if (!style) {
    return "";
  }

  return style
    .split(";")
    .map((declaration) => declaration.trim())
    .filter(
      (declaration) => declaration && !declaration.startsWith("scroll-margin"),
    )
    .join(";");
}

/**
 * Focus navigation temporarily writes inline scroll-margin (see `applyFocusAndScroll`).
 * Those writes don't affect grid topology, so they should not invalidate the cache.
 * Compares the value before the first mutation with the current value, so any
 * net change to other inline styles (e.g. `display: none`) still invalidates.
 */
function isScrollMarginOnlyMutation(record: MutationRecord): boolean {
  if (record.type !== "attributes" || record.attributeName !== "style") {
    return false;
  }

  return (
    stripScrollMargin(record.oldValue) ===
    stripScrollMargin((record.target as Element).getAttribute("style"))
  );
}

export { useGridCache };

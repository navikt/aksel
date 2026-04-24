type SelectionKey = string | number;

type SelectionStats = {
  selectableCount: number;
  selectedCount: number;
};

type SelectionSubtreeHelperArgs = {
  childRowIdsById?: Map<SelectionKey, SelectionKey[]>;
  disabledKeysSet: Set<SelectionKey>;
  selectedKeysSet: Set<SelectionKey>;
};

class SelectionSubtreeHelper {
  private childRowIdsById: Map<SelectionKey, SelectionKey[]>;
  private disabledKeysSet: Set<SelectionKey>;
  private selectedKeysSet: Set<SelectionKey>;
  private selectionStatsCache = new Map<SelectionKey, SelectionStats>();

  constructor({
    childRowIdsById,
    disabledKeysSet,
    selectedKeysSet,
  }: SelectionSubtreeHelperArgs) {
    this.childRowIdsById = childRowIdsById ?? new Map();
    this.disabledKeysSet = disabledKeysSet;
    this.selectedKeysSet = selectedKeysSet;
  }

  getSelectableKeys(rootIds: SelectionKey[]): SelectionKey[] {
    const visitedKeys = new Set<SelectionKey>();
    const selectableKeys: SelectionKey[] = [];
    const stack = [...rootIds].reverse();

    while (stack.length > 0) {
      const key = stack.pop();

      if (key == null || visitedKeys.has(key)) {
        continue;
      }

      visitedKeys.add(key);

      if (!this.disabledKeysSet.has(key)) {
        selectableKeys.push(key);
      }

      const childRowIds = this.childRowIdsById.get(key) ?? [];

      for (
        let childIndex = childRowIds.length - 1;
        childIndex >= 0;
        childIndex--
      ) {
        stack.push(childRowIds[childIndex]);
      }
    }

    return selectableKeys;
  }

  /**
   * Returns the number of selectable and selected rows in the subtree of the given root ID.
   * Results are cached after the first computation to optimize repeated calls for the same root ID.
   *
   * The selectable count excludes disabled rows, and the selected count excludes disabled rows that are selected.
   * The method is implemented iteratively to handle deep trees without hitting call stack limits.
   */
  getSelectionStats(rootId: SelectionKey): SelectionStats {
    const cachedStats = this.selectionStatsCache.get(rootId);

    if (cachedStats) {
      return cachedStats;
    }

    // Compute subtree totals iteratively so deep trees do not depend on call stack depth.
    const stack: { key: SelectionKey; ready: boolean }[] = [
      { key: rootId, ready: false },
    ];

    while (stack.length > 0) {
      const entry = stack.pop();

      if (!entry) {
        continue;
      }

      if (this.selectionStatsCache.has(entry.key)) {
        continue;
      }

      if (entry.ready) {
        let selectableCount = this.disabledKeysSet.has(entry.key) ? 0 : 1;
        let selectedCount =
          !this.disabledKeysSet.has(entry.key) &&
          this.selectedKeysSet.has(entry.key)
            ? 1
            : 0;

        for (const childKey of this.childRowIdsById.get(entry.key) ?? []) {
          const childStats = this.selectionStatsCache.get(childKey);

          if (!childStats) {
            continue;
          }

          selectableCount += childStats.selectableCount;
          selectedCount += childStats.selectedCount;
        }

        this.selectionStatsCache.set(entry.key, {
          selectableCount,
          selectedCount,
        });
        continue;
      }

      stack.push({ key: entry.key, ready: true });

      for (const childKey of this.childRowIdsById.get(entry.key) ?? []) {
        if (!this.selectionStatsCache.has(childKey)) {
          stack.push({ key: childKey, ready: false });
        }
      }
    }

    return (
      this.selectionStatsCache.get(rootId) ?? {
        selectableCount: 0,
        selectedCount: 0,
      }
    );
  }

  isFullySelected(rootId: SelectionKey): boolean {
    const stats = this.getSelectionStats(rootId);

    return (
      stats.selectableCount > 0 && stats.selectedCount === stats.selectableCount
    );
  }
}

export { SelectionSubtreeHelper };
export type { SelectionKey, SelectionStats, SelectionSubtreeHelperArgs };

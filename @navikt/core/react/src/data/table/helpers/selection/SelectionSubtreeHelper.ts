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

/**
 * Helper class for managing selection state in a tree structure.
 * - It provides methods to get selectable keys in a subtree
 * - Compute selection statistics for a subtree
 * - Determine if a subtree is fully selected.
 *
 * Results of selection statistics are cached to optimize performance for repeated calls on the same subtree.
 */
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
   *
   * How it works:
   * - Manually add root ID to stack to get processing going. Note that the ready-flag is `false`.
   * - Pop stack until empty. For each entry:
   * - - If entry is already cached, skip it.
   * - - If entry is not ready, push it back as ready and push all its children as not ready.
   * - - If entry is ready, compute its stats based on its own state and the stats of its children, then cache the result.
   * - Since we add all the children to the stack after pushing element with ready: true, while "popping" the stack we will always encounter the children before their parent is ready, ensuring that the stats for all children are computed and cached before computing the stats for their parent.
   * - Finally, return the cached stats for the root ID.
   */
  getSelectionStats(rootId: SelectionKey): SelectionStats {
    const cachedStats = this.selectionStatsCache.get(rootId);

    if (cachedStats) {
      return cachedStats;
    }

    /* Compute subtree totals iteratively so deep trees do not depend on call stack depth. */
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

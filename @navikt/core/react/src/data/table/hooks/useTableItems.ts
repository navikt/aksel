import { useMemo } from "react";
import { useControllableState } from "../../../utils/hooks";

type UseTableItemsArgs<T> = {
  items: T[];
  getRowId?: (rowData: T, index: number) => string | number;
  /**
   * Master - Detail pattern props
   */
  /* expandedDetailsPanelIds?: (string | number)[];
  defaultExpandedDetailsPanelIds?: (string | number)[];
  isDetailsPanelExpandable?: (rowData: T) => boolean;
  onDetailsPanelChange?: (ids: (string | number)[]) => void;

  getDetailsPanelHeight?: (row: T) => number | "auto";
  getDetailsPanelContent?: (row: T) => React.ReactNode; */
  /**
   * Expanded/Nested rows pattern props
   */
  getSubRows?: (rowData: T) => T[];
  expandedSubRowIds?: (string | number)[];
  defaultExpandedSubRowIds?: (string | number)[];
  isSubRowExpandable?: (rowData: T) => boolean;
  onExpandedSubRowIdsChange?: (ids: (string | number)[]) => void;
};

interface ItemDetail<T> {
  level: number;
  parent: null | T;
  children: readonly T[];
}

function useTableItems<T>(args: UseTableItemsArgs<T>) {
  const {
    items,
    expandedSubRowIds,
    defaultExpandedSubRowIds,
    getSubRows,
    getRowId,
    onExpandedSubRowIdsChange,
    isSubRowExpandable,
  } = args;

  const [nestedSubRowsExpandedIds, setNestedSubRowsExpandedIds] =
    useControllableState({
      value: expandedSubRowIds,
      defaultValue: defaultExpandedSubRowIds ?? [],
      onChange: onExpandedSubRowIdsChange,
    });

  const expandedIdsSet = useMemo(
    () => new Set(nestedSubRowsExpandedIds),
    [nestedSubRowsExpandedIds],
  );

  const { itemDetails, visibleItems } = useMemo(() => {
    if (!getSubRows) {
      return {
        visibleItems: items,
        itemDetails: new Map<T, ItemDetail<T>>(),
      };
    }

    const resolvedGetRowId = (item: T, index: number): string | number =>
      getRowId?.(item, index) ?? index;

    const localItemDetails = new Map<T, ItemDetail<T>>();

    const localVisibleItems: T[] = [];
    let indexCounter = -1;

    function traverseRows(
      item: T,
      details: Omit<ItemDetail<T>, "children">,
      isRootLevel = false,
    ) {
      indexCounter++;
      const itemId = resolvedGetRowId(item, indexCounter);
      const isRowExpandable = isSubRowExpandable?.(item);
      const children = (isRowExpandable ? getSubRows?.(item) : []) ?? [];
      localItemDetails.set(item, { ...details, children });

      if (!expandedIdsSet.has(itemId) && !isRootLevel) {
        return;
      }
      localVisibleItems.push(item);

      for (let i = 0; i < children.length; i++) {
        traverseRows(children[i], {
          level: details.level + 1,
          parent: item,
        });
      }
    }

    for (let i = 0; i < items.length; i++) {
      traverseRows(items[i], { level: 0, parent: null }, true);
    }

    return {
      visibleItems: localVisibleItems,
      itemDetails: localItemDetails,
    };
  }, [getSubRows, items, getRowId, isSubRowExpandable, expandedIdsSet]);

  const handleExpandedSubRowIdChange = (id: string | number) => {
    if (expandedIdsSet.has(id)) {
      expandedIdsSet.delete(id);
      setNestedSubRowsExpandedIds(Array.from(expandedIdsSet));
      return;
    }
    setNestedSubRowsExpandedIds([...nestedSubRowsExpandedIds, id]);
  };

  return {
    visibleItems,
    itemDetails,
    onExpandedSubRowIdsChange: handleExpandedSubRowIdChange,
  };
}

export { useTableItems };

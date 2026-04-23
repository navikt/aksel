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
  } = args;

  const [nestedSubRowsExpandedIds /* , setNestedSubRowsExpandedIds */] =
    useControllableState({
      value: expandedSubRowIds,
      defaultValue: defaultExpandedSubRowIds ?? [],
    });

  const { itemDetails, visibleItems } = useMemo(() => {
    if (getSubRows) {
      return {
        visibleItems: items,
        itemDetails: new Map<T, ItemDetail<T>>(),
      };
    }

    const resolvedGetRowId = (item: T, index: number): string | number =>
      getRowId?.(item, index) ?? index;

    const allItems = items;
    const itemWithDetails = new Map<T, ItemDetail<T>>();

    const visibleItemRows: T[] = [];
    let indexCounter = 0;

    function traverseRows(
      item: T,
      details: Omit<ItemDetail<T>, "children">,
      isRootLevel = false,
    ) {
      indexCounter++;
      const itemId = resolvedGetRowId(item, indexCounter);
      const children = getSubRows?.(item) || [];
      itemWithDetails.set(item, { ...details, children });

      if (!nestedSubRowsExpandedIds.includes(itemId) && !isRootLevel) {
        return;
      }
      visibleItemRows.push(item);

      for (let i = 0; i < children.length; i++) {
        traverseRows(children[i], {
          level: details.level + 1,
          parent: item,
        });
      }
    }

    for (let i = 0; i < allItems.length; i++) {
      traverseRows(allItems[i], { level: 0, parent: null }, true);
    }

    return {
      visibleItems: visibleItemRows,
      itemDetails: itemWithDetails,
    };
  }, [getRowId, getSubRows, items, nestedSubRowsExpandedIds]);

  return {
    visibleItems,
    itemDetails,
  };
}

export { useTableItems };

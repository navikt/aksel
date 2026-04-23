import { useMemo } from "react";
import { createStrictContext } from "../../../utils/helpers";
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
  id: string | number;
  level: number;
  parent: null | T;
  children: readonly T[];
}

type useTableItemsReturn<T> = {
  items: T[];
  itemDetails: Map<T, ItemDetail<T>>;
  onExpandedSubRowIdsChange: (id: string | number) => void;
  isSubRowExpanded: (id: string | number) => boolean;
};

function useTableItems<T>(args: UseTableItemsArgs<T>): useTableItemsReturn<T> {
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
    /**
     * TODO: Can we somehow bypass the parsing if nesting is not enabled
     * - Still need rowIds for selection, but maybe we can do that in a separate pass only for the visible rows?
     */
    /* if (!getSubRows) {
      return {
        visibleItems: items,
        itemDetails: new Map<T, ItemDetail<T>>(),
      };
    } */

    const resolvedGetRowId = (item: T, index: number): string | number =>
      getRowId?.(item, index) ?? index;

    const localItemDetails = new Map<T, ItemDetail<T>>();

    const localVisibleItems: T[] = [];
    let indexCounter = -1;

    function traverseRows(
      item: T,
      details: Omit<ItemDetail<T>, "children" | "id">,
      isVisible: boolean,
    ) {
      indexCounter++;
      const itemId = resolvedGetRowId(item, indexCounter);
      const isRowExpandable = isSubRowExpandable?.(item) ?? true;
      const children = (isRowExpandable ? getSubRows?.(item) : []) ?? [];
      localItemDetails.set(item, { ...details, children, id: itemId });

      if (isVisible) {
        localVisibleItems.push(item);
      }

      if (!expandedIdsSet.has(itemId)) {
        return;
      }

      for (let i = 0; i < children.length; i++) {
        traverseRows(
          children[i],
          {
            level: details.level + 1,
            parent: item,
          },
          isVisible,
        );
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
    items: visibleItems,
    itemDetails,
    onExpandedSubRowIdsChange: handleExpandedSubRowIdChange,
    isSubRowExpanded: (id: string | number) => expandedIdsSet.has(id),
  };
}

const { Provider: TableItemsProvider, useContext: useTableItemsContext } =
  /* TODO: Can we type this better? */
  createStrictContext<useTableItemsReturn<any>>({
    name: "TableItemsContext",
    errorMessage:
      "useTableItemsContext must be used within a TableItemsProvider",
  });

export { useTableItems, TableItemsProvider, useTableItemsContext };
export type { ItemDetail };

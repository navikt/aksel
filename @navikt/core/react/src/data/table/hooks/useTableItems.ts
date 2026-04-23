import { useCallback, useMemo } from "react";
import { createStrictContext } from "../../../utils/helpers";
import { useControllableState } from "../../../utils/hooks";
import {
  type ItemDetail,
  collectTableRowEntries,
} from "../helpers/collectTableRowEntries";

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
    const rowEntriesMap = collectTableRowEntries({
      items,
      getRowId,
      getSubRows,
      isSubRowExpandable,
    });

    const localVisibleItems: T[] = [];
    const addVisibleRows = (rowData: T) => {
      localVisibleItems.push(rowData);

      const details = rowEntriesMap.get(rowData);

      if (!details || !expandedIdsSet.has(details.id)) {
        return;
      }

      for (const childRow of details.children) {
        addVisibleRows(childRow);
      }
    };

    for (const rowData of items) {
      addVisibleRows(rowData);
    }

    return {
      visibleItems: localVisibleItems,
      itemDetails: rowEntriesMap,
    };
  }, [getSubRows, items, getRowId, isSubRowExpandable, expandedIdsSet]);

  const handleExpandedSubRowIdChange = useCallback(
    (id: string | number) => {
      setNestedSubRowsExpandedIds((prev) =>
        prev.includes(id)
          ? prev.filter((expandedId) => expandedId !== id)
          : [...prev, id],
      );
    },
    [setNestedSubRowsExpandedIds],
  );

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

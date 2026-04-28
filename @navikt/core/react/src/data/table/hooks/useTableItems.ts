import { useCallback, useMemo } from "react";
import { createStrictContext } from "../../../utils/helpers";
import { useControllableState } from "../../../utils/hooks";
import {
  type ItemDetail,
  type TableRowEntryId,
  collectTableRowEntries,
} from "../helpers/collectTableRowEntries";

type SubRowsProps<T> = {
  getRows?: (rowData: T) => T[];
  expandedRowIds?: (string | number)[];
  defaultExpandedRowIds?: (string | number)[];
  isRowExpandable?: (rowData: T) => boolean;
  onExpandedRowIdsChange?: (ids: (string | number)[]) => void;
};

type UseTableItemsArgs<T> = {
  items: T[];
  getRowId: (rowData: T, index: number) => TableRowEntryId;
  subRows?: SubRowsProps<T>;
};

type useTableItemsReturn<T> = {
  items: T[];
  itemDetails: Map<T, ItemDetail<T>>;
  /** Row ids for the rows currently rendered in the table body. */
  visibleRowIds: TableRowEntryId[];
  /** Direct child ids for each row, used to traverse selection groups lazily. */
  childRowIdsById: Map<TableRowEntryId, TableRowEntryId[]>;
  onExpandedRowIdsChange: (id: string | number) => void;
  isSubRowExpanded: (id: string | number) => boolean;
};

function useTableItems<T>(args: UseTableItemsArgs<T>): useTableItemsReturn<T> {
  const { items, subRows = {}, getRowId } = args;

  const {
    expandedRowIds,
    defaultExpandedRowIds,
    getRows,
    onExpandedRowIdsChange,
    isRowExpandable,
  } = subRows;

  const [nestedSubRowsExpandedIds, setNestedSubRowsExpandedIds] =
    useControllableState({
      value: expandedRowIds,
      defaultValue: defaultExpandedRowIds ?? [],
      onChange: onExpandedRowIdsChange,
    });

  const expandedIdsSet = useMemo(
    () => new Set(nestedSubRowsExpandedIds),
    [nestedSubRowsExpandedIds],
  );

  const { itemDetails, visibleItems, visibleRowIds, childRowIdsById } =
    useMemo(() => {
      const { itemDetails: rowEntriesMap, childRowIdsById: _childRowIdsById } =
        collectTableRowEntries({
          items,
          getRowId,
          getRows,
          isRowExpandable,
        });

      const localVisibleItems: T[] = [];
      const localVisibleRowIds: TableRowEntryId[] = [];

      const addVisibleRows = (rowData: T): TableRowEntryId[] => {
        const details = rowEntriesMap.get(rowData);

        if (!details) {
          return [];
        }

        localVisibleItems.push(rowData);
        localVisibleRowIds.push(details.id);

        const visibleDescendantRowIds: TableRowEntryId[] = [];

        if (expandedIdsSet.has(details.id)) {
          for (const childRow of details.children) {
            const childVisibleRowIds = addVisibleRows(childRow);
            visibleDescendantRowIds.push(...childVisibleRowIds);
          }
        }

        return [details.id, ...visibleDescendantRowIds];
      };

      for (const rowData of items) {
        addVisibleRows(rowData);
      }

      return {
        visibleItems: localVisibleItems,
        visibleRowIds: localVisibleRowIds,
        childRowIdsById: _childRowIdsById,
        itemDetails: rowEntriesMap,
      };
    }, [getRows, items, getRowId, isRowExpandable, expandedIdsSet]);

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
    visibleRowIds,
    childRowIdsById,
    onExpandedRowIdsChange: handleExpandedSubRowIdChange,
    isSubRowExpanded: (id: string | number) => expandedIdsSet.has(id),
  };
}

const { Provider: TableItemsProvider, useContext: useTableItemsContext } =
  /* TODO: Can we type this better? */
  createStrictContext<
    Omit<useTableItemsReturn<any>, "visibleRowIds" | "childRowIdsById">
  >({
    name: "TableItemsContext",
    errorMessage:
      "useTableItemsContext must be used within a TableItemsProvider",
  });

export { useTableItems, TableItemsProvider, useTableItemsContext };
export type { ItemDetail, SubRowsProps };

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
  getRowId?: (rowData: T) => TableRowEntryId;
  subRows?: SubRowsProps<T>;
};

type useTableItemsReturn<T> = {
  items: T[];
  itemDetails: Map<TableRowEntryId, ItemDetail<T>>;
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
      const {
        itemDetails: rowEntriesMap,
        rootRowIds,
        childRowIdsById: _childRowIdsById,
      } = collectTableRowEntries({
        items,
        getRowId,
        getRows,
        isRowExpandable,
      });

      const localVisibleItems: T[] = [];
      const localVisibleRowIds: TableRowEntryId[] = [];

      const addVisibleRows = (rowId: TableRowEntryId): TableRowEntryId[] => {
        const details = rowEntriesMap.get(rowId);

        if (!details) {
          return [];
        }

        localVisibleItems.push(details.rowData);
        localVisibleRowIds.push(details.id);

        const visibleDescendantRowIds: TableRowEntryId[] = [];

        if (expandedIdsSet.has(details.id)) {
          for (const childRowId of details.children) {
            const childVisibleRowIds = addVisibleRows(childRowId);
            visibleDescendantRowIds.push(...childVisibleRowIds);
          }
        }

        return [details.id, ...visibleDescendantRowIds];
      };

      for (const rowId of rootRowIds) {
        addVisibleRows(rowId);
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
  createStrictContext<Omit<useTableItemsReturn<any>, "childRowIdsById">>({
    name: "TableItemsContext",
    errorMessage:
      "useTableItemsContext must be used within a TableItemsProvider",
  });

export { useTableItems, TableItemsProvider, useTableItemsContext };
export type { ItemDetail, SubRowsProps, useTableItemsReturn };

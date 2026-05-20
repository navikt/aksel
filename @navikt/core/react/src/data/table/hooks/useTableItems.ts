import { useCallback, useMemo } from "react";
import { useControllableState } from "../../../utils/hooks";
import {
  type ItemDetail,
  collectTableRowEntries,
} from "../helpers/collectTableRowEntries";

type SubRowsProps<T> = {
  /**
   * Function to get sub-rows for a given row.
   */
  getRows: (rowData: T) => T[];
  /**
   * Controlled list of IDs of rows that should be expanded.
   */
  expandedRowIds?: string[];
  /**
   * IDs of rows that should be initially expanded.
   * Only used when `expandedRowIds` is not provided, i.e. when the expanded state is uncontrolled.
   */
  defaultExpandedRowIds?: string[];
  /**
   * Called when the list of expanded row IDs changes.
   */
  onExpandedRowIdsChange?: (ids: string[]) => void;
  /**
   * Determines whether a row should be expandable.
   * By default, all rows are expandable when `getRows` is provided.
   */
  isRowExpandable?: (rowData: T) => boolean;
};

type UseTableItemsArgs<T> = {
  items: T[];
  getRowId?: (rowData: T) => string;
  subRows?: SubRowsProps<T>;
};

type UseTableItemsReturn<T> = {
  items: T[];
  itemDetails: Map<string, ItemDetail<T>>;
  /** Row ids for the rows currently rendered in the table body. */
  visibleRowIds: string[];
  /** Direct child ids for each row, used to traverse selection groups lazily. */
  childRowIdsById: Map<string, string[]>;
  onExpandedRowIdsChange: (id: string) => void;
  isSubRowExpanded: (id: string) => boolean;
};

function useTableItems<T>(args: UseTableItemsArgs<T>): UseTableItemsReturn<T> {
  const { items, subRows, getRowId } = args;

  const {
    expandedRowIds,
    defaultExpandedRowIds,
    getRows,
    onExpandedRowIdsChange,
    isRowExpandable,
  } = subRows || {};

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
      const localVisibleRowIds: string[] = [];

      const addVisibleRows = (rowId: string): string[] => {
        const details = rowEntriesMap.get(rowId);

        if (!details) {
          return [];
        }

        localVisibleItems.push(details.rowData);
        localVisibleRowIds.push(details.id);

        const visibleDescendantRowIds: string[] = [];

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
    (id: string) => {
      setNestedSubRowsExpandedIds((prev) =>
        prev.includes(id)
          ? prev.filter((expandedId) => expandedId !== id)
          : [...prev, id],
      );
    },
    [setNestedSubRowsExpandedIds],
  );

  const isSubRowExpanded = useCallback(
    (id: string) => expandedIdsSet.has(id),
    [expandedIdsSet],
  );

  return useMemo(
    () => ({
      items: visibleItems,
      itemDetails,
      visibleRowIds,
      childRowIdsById,
      onExpandedRowIdsChange: handleExpandedSubRowIdChange,
      isSubRowExpanded,
    }),
    [
      visibleItems,
      itemDetails,
      visibleRowIds,
      childRowIdsById,
      handleExpandedSubRowIdChange,
      isSubRowExpanded,
    ],
  );
}

export { useTableItems };
export type { ItemDetail, SubRowsProps, UseTableItemsReturn };

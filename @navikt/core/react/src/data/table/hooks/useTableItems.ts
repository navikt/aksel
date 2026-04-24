import { useCallback, useMemo } from "react";
import { createStrictContext } from "../../../utils/helpers";
import { useControllableState } from "../../../utils/hooks";
import {
  type ItemDetail,
  type TableRowEntryId,
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
  visibleRowIds: TableRowEntryId[];
  descendantRowIdsById: Map<TableRowEntryId, TableRowEntryId[]>;
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

  const { itemDetails, visibleItems, visibleRowIds, descendantRowIdsById } =
    useMemo(() => {
      const rowEntriesMap = collectTableRowEntries({
        items,
        getRowId,
        getSubRows,
        isSubRowExpandable,
      });

      const localVisibleItems: T[] = [];
      const localVisibleRowIds: TableRowEntryId[] = [];
      const localDescendantRowIdsById = new Map<
        TableRowEntryId,
        TableRowEntryId[]
      >();

      const collectDescendantRowIds = (rowData: T): TableRowEntryId[] => {
        const details = rowEntriesMap.get(rowData);

        if (!details) {
          return [];
        }

        const descendantRowIds: TableRowEntryId[] = [];

        for (const childRow of details.children) {
          const childDetails = rowEntriesMap.get(childRow);

          if (!childDetails) {
            continue;
          }

          descendantRowIds.push(
            childDetails.id,
            ...collectDescendantRowIds(childRow),
          );
        }

        localDescendantRowIdsById.set(details.id, descendantRowIds);

        return descendantRowIds;
      };

      for (const rowData of items) {
        collectDescendantRowIds(rowData);
      }

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
        descendantRowIdsById: localDescendantRowIdsById,
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
    visibleRowIds,
    descendantRowIdsById,
    onExpandedSubRowIdsChange: handleExpandedSubRowIdChange,
    isSubRowExpanded: (id: string | number) => expandedIdsSet.has(id),
  };
}

const { Provider: TableItemsProvider, useContext: useTableItemsContext } =
  /* TODO: Can we type this better? */
  createStrictContext<
    Omit<useTableItemsReturn<any>, "visibleRowIds" | "descendantRowIdsById">
  >({
    name: "TableItemsContext",
    errorMessage:
      "useTableItemsContext must be used within a TableItemsProvider",
  });

export { useTableItems, TableItemsProvider, useTableItemsContext };
export type { ItemDetail };

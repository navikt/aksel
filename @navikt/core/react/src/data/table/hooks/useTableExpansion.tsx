import React, { useCallback } from "react";
import { createStrictContext } from "../../../utils/helpers";
import { useControllableState } from "../../../utils/hooks";
import type { ItemDetail } from "./useTableItems";

type DataTableExpansionContextT = {
  expandedIds: (string | number)[];
  isExpanded: (id: string | number) => boolean;
  isDetailsPanelExpandable: (id: string | number) => boolean;
  toggleExpansion: (id: string | number) => void;
  toggleAll: () => void;
  isAllExpanded: boolean;
  getDetailsPanelContent?: (row: unknown) => React.ReactNode;
  getDetailsPanelHeight?: (row: unknown) => number | "auto";
  showExpandAll?: boolean;
  enableDetailsPanel: boolean;
};

const {
  Provider: DataTableExpansionContextProvider,
  useContext: useDataTableExpansion,
} = createStrictContext<DataTableExpansionContextT>({
  name: "DataTableExpansionContext",
  errorMessage:
    "useDataTableExpansion must be used within a DataTableExpansionProvider.",
});

type TableExpansionOptions<T> = {
  detailsPanelRowIds?: (string | number)[];
  defaultDetailsPanelRowIds?: (string | number)[];
  onDetailsPanelChange?: (ids: (string | number)[]) => void;
  itemDetails: Map<T, ItemDetail<T>>;
  getDetailsPanelContent?: (row: T) => React.ReactNode;
  isDetailsPanelExpandable?: (rowData: T) => boolean;
  getDetailsPanelHeight?: (row: T) => number | "auto";
  showExpandAll?: boolean;
};

function DataTableExpansionProvider<T>({
  children,
  detailsPanelRowIds,
  defaultDetailsPanelRowIds = [],
  onDetailsPanelChange,
  itemDetails,
  getDetailsPanelContent,
  isDetailsPanelExpandable,
  getDetailsPanelHeight,
  showExpandAll = false,
}: TableExpansionOptions<T> & { children: React.ReactNode }) {
  const [expandedIds, setExpandedIds] = useControllableState({
    value: detailsPanelRowIds,
    defaultValue: defaultDetailsPanelRowIds,
  });

  const topLevelRowsWithIds = React.useMemo(() => {
    const rowsWithIds: { id: string | number; rowData: T }[] = [];

    for (const [rowData, details] of itemDetails.entries()) {
      if (details.level === 0) {
        rowsWithIds.push({ id: details.id, rowData });
      }
    }

    return rowsWithIds;
  }, [itemDetails]);

  const expandableIds = React.useMemo(() => {
    if (!getDetailsPanelContent) {
      return new Set<string | number>();
    }

    const ids = new Set<string | number>();

    for (const { id, rowData } of topLevelRowsWithIds) {
      if (!isDetailsPanelExpandable || isDetailsPanelExpandable(rowData)) {
        ids.add(id);
      }
    }

    return ids;
  }, [getDetailsPanelContent, isDetailsPanelExpandable, topLevelRowsWithIds]);

  const isDetailsPanelExpandableById = useCallback(
    (id: string | number) => expandableIds.has(id),
    [expandableIds],
  );

  const isExpanded = useCallback(
    (id: string | number) =>
      isDetailsPanelExpandableById(id) && expandedIds.includes(id),
    [expandedIds, isDetailsPanelExpandableById],
  );

  const toggleExpansion = useCallback(
    (id: string | number) => {
      if (!isDetailsPanelExpandableById(id)) {
        return;
      }

      const next = expandedIds.includes(id)
        ? expandedIds.filter((eid) => eid !== id)
        : [...expandedIds, id];
      setExpandedIds(next);
      onDetailsPanelChange?.(next);
    },
    [
      expandedIds,
      isDetailsPanelExpandableById,
      setExpandedIds,
      onDetailsPanelChange,
    ],
  );

  const isAllExpanded =
    expandableIds.size > 0 &&
    Array.from(expandableIds).every((key) => expandedIds.includes(key));

  const toggleAll = useCallback(() => {
    const next = isAllExpanded ? [] : Array.from(expandableIds);
    setExpandedIds(next);
    onDetailsPanelChange?.(next);
  }, [isAllExpanded, expandableIds, setExpandedIds, onDetailsPanelChange]);

  return (
    <DataTableExpansionContextProvider
      expandedIds={expandedIds}
      isExpanded={isExpanded}
      isDetailsPanelExpandable={isDetailsPanelExpandableById}
      toggleExpansion={toggleExpansion}
      toggleAll={toggleAll}
      isAllExpanded={isAllExpanded}
      getDetailsPanelContent={
        getDetailsPanelContent as
          | ((row: unknown) => React.ReactNode)
          | undefined
      }
      getDetailsPanelHeight={
        getDetailsPanelHeight as ((row: unknown) => number | "auto") | undefined
      }
      showExpandAll={showExpandAll}
      enableDetailsPanel={!!getDetailsPanelContent}
    >
      {children}
    </DataTableExpansionContextProvider>
  );
}

export { DataTableExpansionProvider, useDataTableExpansion };

import React, { useCallback } from "react";
import { createStrictContext } from "../../../utils/helpers";
import { useControllableState } from "../../../utils/hooks";

type DataTableExpansionContextT = {
  expandedIds: (string | number)[];
  nestedExpandedIds: (string | number)[];
  isExpanded: (id: string | number) => boolean;
  isDetailsPanelExpandable: (id: string | number) => boolean;
  toggleExpansion: (id: string | number) => void;
  isNestedRowsExpanded: (id: string | number) => boolean;
  toggleNestedRowsExpansion: (id: string | number) => void;
  toggleAll: () => void;
  isAllExpanded: boolean;
  getDetailsPanelContent?: (row: unknown) => React.ReactNode;
  getDetailsPanelHeight?: (row: unknown) => number | "auto";
  getSubRows?: (row: unknown) => unknown[];
  showExpandAll?: boolean;
  enableDetailsPanel: boolean;
  enableNestedRows: boolean;
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
  rowsWithIds?: { id: string | number; rowData: T }[];
  allRowKeys: (string | number)[];
  getDetailsPanelContent?: (row: T) => React.ReactNode;
  isDetailsPanelExpandable?: (rowData: T) => boolean;
  getDetailsPanelHeight?: (row: T) => number | "auto";
  showExpandAll?: boolean;
  getSubRows?: (rowData: T) => T[];
};

function DataTableExpansionProvider<T>({
  children,
  detailsPanelRowIds,
  defaultDetailsPanelRowIds = [],
  onDetailsPanelChange,
  rowsWithIds,
  allRowKeys,
  getDetailsPanelContent,
  isDetailsPanelExpandable,
  getDetailsPanelHeight,
  showExpandAll = false,
  getSubRows,
}: TableExpansionOptions<T> & { children: React.ReactNode }) {
  const [expandedIds, setExpandedIds] = useControllableState({
    value: detailsPanelRowIds,
    defaultValue: defaultDetailsPanelRowIds,
  });
  const [nestedExpandedIds, setNestedExpandedIds] = React.useState<
    (string | number)[]
  >([]);

  const expandableIds = React.useMemo(() => {
    if (!getDetailsPanelContent) {
      return new Set<string | number>();
    }

    if (!isDetailsPanelExpandable) {
      return new Set(allRowKeys);
    }

    return new Set(
      (rowsWithIds ?? [])
        .filter(({ rowData }) => isDetailsPanelExpandable(rowData))
        .map(({ id }) => id),
    );
  }, [
    getDetailsPanelContent,
    isDetailsPanelExpandable,
    allRowKeys,
    rowsWithIds,
  ]);

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

  const isNestedRowsExpanded = useCallback(
    (id: string | number) => nestedExpandedIds.includes(id),
    [nestedExpandedIds],
  );

  const toggleNestedRowsExpansion = useCallback((id: string | number) => {
    setNestedExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((eid) => eid !== id) : [...prev, id],
    );
  }, []);

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
      nestedExpandedIds={nestedExpandedIds}
      isExpanded={isExpanded}
      isDetailsPanelExpandable={isDetailsPanelExpandableById}
      toggleExpansion={toggleExpansion}
      isNestedRowsExpanded={isNestedRowsExpanded}
      toggleNestedRowsExpansion={toggleNestedRowsExpansion}
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
      getSubRows={getSubRows as ((row: unknown) => unknown[]) | undefined}
      showExpandAll={showExpandAll}
      enableDetailsPanel={!!getDetailsPanelContent}
      enableNestedRows={!!getSubRows}
    >
      {children}
    </DataTableExpansionContextProvider>
  );
}

export { DataTableExpansionProvider, useDataTableExpansion };

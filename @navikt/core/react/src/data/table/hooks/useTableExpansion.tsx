import React, { useCallback } from "react";
import { createStrictContext } from "../../../utils/helpers";
import { useControllableState } from "../../../utils/hooks";

type DataTableExpansionContextT = {
  expandedIds: (string | number)[];
  isExpanded: (id: string | number) => boolean;
  toggleExpansion: (id: string | number) => void;
  toggleAll: () => void;
  isAllExpanded: boolean;
  getDetailsPanelContent?: (row: unknown) => React.ReactNode;
  getDetailsPanelHeight?: (row: unknown) => number | "auto";
  getSubRows?: (row: unknown) => unknown[];
  showExpandAll?: boolean;
  enableExpansion: boolean;
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
  allRowKeys: (string | number)[];
  getDetailsPanelContent?: (row: T) => React.ReactNode;
  getDetailsPanelHeight?: (row: T) => number | "auto";
  showExpandAll?: boolean;
  getSubRows?: (rowData: T) => T[];
};

function DataTableExpansionProvider<T>({
  children,
  detailsPanelRowIds,
  defaultDetailsPanelRowIds = [],
  onDetailsPanelChange,
  allRowKeys,
  getDetailsPanelContent,
  getDetailsPanelHeight,
  showExpandAll = false,
  getSubRows,
}: TableExpansionOptions<T> & { children: React.ReactNode }) {
  const [expandedIds, setExpandedIds] = useControllableState({
    value: detailsPanelRowIds,
    defaultValue: defaultDetailsPanelRowIds,
  });

  const isExpanded = useCallback(
    (id: string | number) => expandedIds.includes(id),
    [expandedIds],
  );

  const toggleExpansion = useCallback(
    (id: string | number) => {
      const next = expandedIds.includes(id)
        ? expandedIds.filter((eid) => eid !== id)
        : [...expandedIds, id];
      setExpandedIds(next);
      onDetailsPanelChange?.(next);
    },
    [expandedIds, setExpandedIds, onDetailsPanelChange],
  );

  const isAllExpanded =
    allRowKeys.length > 0 &&
    allRowKeys.every((key) => expandedIds.includes(key));

  const toggleAll = useCallback(() => {
    const next = isAllExpanded ? [] : [...allRowKeys];
    setExpandedIds(next);
    onDetailsPanelChange?.(next);
  }, [isAllExpanded, allRowKeys, setExpandedIds, onDetailsPanelChange]);

  return (
    <DataTableExpansionContextProvider
      expandedIds={expandedIds}
      isExpanded={isExpanded}
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
      getSubRows={getSubRows as ((row: unknown) => unknown[]) | undefined}
      showExpandAll={showExpandAll}
      enableExpansion={!!getDetailsPanelContent || !!getSubRows}
    >
      {children}
    </DataTableExpansionContextProvider>
  );
}

export { DataTableExpansionProvider, useDataTableExpansion };

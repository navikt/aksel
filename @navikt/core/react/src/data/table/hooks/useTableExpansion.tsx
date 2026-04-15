import React, { useCallback } from "react";
import { createStrictContext } from "../../../utils/helpers";
import { useControllableState } from "../../../utils/hooks";

type DataTableExpansionContextT<T> = {
  expandedIds: (string | number)[];
  isExpanded: (id: string | number) => boolean;
  toggleExpansion: (id: string | number) => void;
  toggleAll: () => void;
  isAllExpanded: boolean;
  getDetailsPanelContent?: (row: T) => React.ReactNode;
  getDetailsPanelHeight?: (row: T) => number | "auto";
  showExpandAll?: boolean;
  enableExpansion: boolean;
};

const {
  Provider: DataTableExpansionContextProvider,
  useContext: useDataTableExpansion,
} = createStrictContext<DataTableExpansionContextT<any>>({
  name: "DataTableExpansionContext",
  errorMessage:
    "useTableExpansionContext must be used within a DataTableExpansionProvider.",
});

type TableExpansionOptions<T> = {
  detailsPanelRowIds?: (string | number)[];
  defaultDetailsPanelRowIds?: (string | number)[];
  onDetailsPanelChange?: (ids: (string | number)[]) => void;
  allRowKeys: (string | number)[];
  getDetailsPanelContent?: (row: T) => React.ReactNode;
  getDetailsPanelHeight?: (row: T) => number | "auto";
  showExpandAll?: boolean;
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
      getDetailsPanelContent={getDetailsPanelContent}
      getDetailsPanelHeight={getDetailsPanelHeight}
      showExpandAll={showExpandAll}
      enableExpansion={!!getDetailsPanelContent}
    >
      {children}
    </DataTableExpansionContextProvider>
  );
}

export { DataTableExpansionProvider, useDataTableExpansion };

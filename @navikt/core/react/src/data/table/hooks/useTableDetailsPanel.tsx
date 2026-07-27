import React, { useCallback } from "react";
import { createStrictContext } from "../../../utils/helpers";
import { useControllableState } from "../../../utils/hooks";
import { useDataTableContext } from "../root/DataTableRoot.context";

type DetailsPanelProps<T> = {
  /**
   * Function to get the content to show in the details panel for a given row.
   * When provided, an expand toggle column is added automatically.
   */
  getContent: (rowData: T) => React.ReactNode;
  /**
   * Determines whether a row can be expanded to show details panel content.
   * @default () => true
   */
  isRowExpandable?: (rowData: T) => boolean;
  /**
   * Controlled list of expanded row IDs.
   * Use with `onExpandedRowIdsChange` for controlled usage, or `defaultExpandedRowIds` for uncontrolled.
   */
  expandedRowIds?: string[];
  /**
   * Initial list of expanded row IDs for uncontrolled usage.
   * @default []
   */
  defaultExpandedRowIds?: string[];
  /**
   * Called when the list of expanded row IDs changes.
   */
  onExpandedRowIdsChange?: (ids: string[]) => void; // TODO: Docs: This pattern is called "Master / Detail" in general terms
  /**
   * Returns the height (in px) or `"auto"` for a row's details panel.
   * When a number is returned, the panel scrolls within that fixed height.
   * @default "auto"
   */
  getHeight?: (rowData: T) => number | "auto";
  /**
   * Shows an expand-all toggle button in the expand column header.
   * @default false
   */
  showExpandAll?: boolean;
};

type DataTableDetailsPanelContextT = {
  isExpanded: (id: string) => boolean;
  isDetailsPanelExpandable: (id: string) => boolean;
  toggleExpansion: (id: string) => void;
  toggleAll: () => void;
  isAllExpanded: boolean;
  getDetailsPanelContent?: (row: unknown) => React.ReactNode;
  getDetailsPanelHeight?: (row: unknown) => number | "auto";
  showExpandAll: boolean;
  enableDetailsPanel: boolean;
};

const {
  Provider: DataTableDetailsPanelContextProvider,
  useContext: useDataTableDetailsPanel,
} = createStrictContext<DataTableDetailsPanelContextT>({
  name: "DataTableDetailsPanelContext",
  errorMessage:
    "useDataTableDetailsPanel must be used within a DataTableDetailsPanelProvider.",
});

function DataTableDetailsPanelProvider<T>({
  children,
  detailsPanel,
}: { detailsPanel?: DetailsPanelProps<T> } & { children: React.ReactNode }) {
  const {
    expandedRowIds,
    defaultExpandedRowIds = [],
    onExpandedRowIdsChange,
    getContent,
    isRowExpandable,
    getHeight,
    showExpandAll = false,
  } = detailsPanel || {};

  const [expandedIds, setExpandedIds] = useControllableState({
    value: expandedRowIds,
    defaultValue: defaultExpandedRowIds,
    onChange: onExpandedRowIdsChange,
  });

  /* TODO: False is just fallback until auto and root is merged */
  const tableContext = useDataTableContext(false);

  const { itemDetails } = tableContext?.tableItems ?? {
    itemDetails: new Map<string, { rowData: T; id: string; level: number }>(),
  };

  const expandableIds = React.useMemo(() => {
    if (!getContent) {
      return new Set<string>();
    }

    const ids = new Set<string>();

    for (const { rowData, id, level } of itemDetails.values()) {
      /* We only allow Master - Details pattern on top level rows */
      if (level > 0) {
        continue;
      }

      if (!isRowExpandable || isRowExpandable(rowData)) {
        ids.add(id);
      }
    }

    return ids;
  }, [getContent, isRowExpandable, itemDetails]);

  const isDetailsPanelExpandableById = useCallback(
    (id: string) => expandableIds.has(id),
    [expandableIds],
  );

  const isExpanded = useCallback(
    (id: string) =>
      isDetailsPanelExpandableById(id) && expandedIds.includes(id),
    [expandedIds, isDetailsPanelExpandableById],
  );

  const toggleExpansion = useCallback(
    (id: string) => {
      if (!isDetailsPanelExpandableById(id)) {
        return;
      }

      setExpandedIds((currentExpandedIds) =>
        currentExpandedIds.includes(id)
          ? currentExpandedIds.filter((expandedId) => expandedId !== id)
          : [...currentExpandedIds, id],
      );
    },
    [isDetailsPanelExpandableById, setExpandedIds],
  );

  const isAllExpanded =
    expandableIds.size > 0 &&
    Array.from(expandableIds).every((key) => expandedIds.includes(key));

  const toggleAll = useCallback(() => {
    setExpandedIds(isAllExpanded ? [] : Array.from(expandableIds));
  }, [expandableIds, isAllExpanded, setExpandedIds]);

  return (
    <DataTableDetailsPanelContextProvider
      isExpanded={isExpanded}
      isDetailsPanelExpandable={isDetailsPanelExpandableById}
      toggleExpansion={toggleExpansion}
      toggleAll={toggleAll}
      isAllExpanded={isAllExpanded}
      getDetailsPanelContent={
        getContent as ((row: unknown) => React.ReactNode) | undefined
      }
      getDetailsPanelHeight={
        getHeight as ((row: unknown) => number | "auto") | undefined
      }
      showExpandAll={showExpandAll}
      enableDetailsPanel={!!getContent}
    >
      {children}
    </DataTableDetailsPanelContextProvider>
  );
}

function getDataTableDetailsPanelId(tableId: string, rowId: string) {
  return `${tableId}-expansion-${rowId}`;
}

export {
  DataTableDetailsPanelProvider,
  getDataTableDetailsPanelId,
  useDataTableDetailsPanel,
};

export type { DetailsPanelProps };

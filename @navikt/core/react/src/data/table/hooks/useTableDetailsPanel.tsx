import React, { useCallback } from "react";
import { createStrictContext } from "../../../utils/helpers";
import { useControllableState } from "../../../utils/hooks";
import { useTableItemsContext } from "./useTableItems";

type DetailsPanelProps<T> = {
  /**
   * Renders a details panel below the row when expanded.
   * When provided, an expand toggle column is added automatically.
   */
  getDetailsPanelContent?: (rowData: T) => React.ReactNode;
  /**
   * Determines whether a row can be expanded to show details panel content.
   * @default () => true
   */
  isDetailsPanelExpandable?: (rowData: T) => boolean;
  /**
   * Controlled list of expanded row IDs.
   * Use with `onDetailsPanelChange` for controlled usage, or `defaultDetailsPanelRowIds` for uncontrolled.
   */
  detailsPanelRowIds?: (string | number)[];
  /**
   * Initial list of expanded row IDs for uncontrolled usage.
   * @default []
   */
  defaultDetailsPanelRowIds?: (string | number)[];
  /**
   * Called when the list of expanded row IDs changes.
   *
   *
   * TODO:
   * - Docs: This pattern is called "Master / Detail" in general terms
   */
  onDetailsPanelChange?: (ids: (string | number)[]) => void;
  /**
   * Returns the height (in px) or `"auto"` for a row's details panel.
   * When a number is returned, the panel scrolls within that fixed height.
   * @default "auto"
   */
  getDetailsPanelHeight?: (rowData: T) => number | "auto";
  /**
   * Shows an expand-all toggle button in the expand column header.
   * @default false
   */
  showExpandAll?: boolean;
};

type DataTableDetailsPanelContextT = {
  isExpanded: (id: string | number) => boolean;
  isDetailsPanelExpandable: (id: string | number) => boolean;
  toggleExpansion: (id: string | number) => void;
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
  detailsPanel = {},
}: { detailsPanel?: DetailsPanelProps<T> } & { children: React.ReactNode }) {
  const {
    detailsPanelRowIds,
    defaultDetailsPanelRowIds = [],
    onDetailsPanelChange,
    getDetailsPanelContent,
    isDetailsPanelExpandable,
    getDetailsPanelHeight,
    showExpandAll = false,
  } = detailsPanel;

  const [expandedIds, setExpandedIds] = useControllableState({
    value: detailsPanelRowIds,
    defaultValue: defaultDetailsPanelRowIds,
    onChange: onDetailsPanelChange,
  });

  /* TODO: False is just fallback until auto and root is merged */
  const tableItemsContext = useTableItemsContext(false);

  const { itemDetails } = tableItemsContext ?? {
    itemDetails: new Map(),
  };

  const expandableIds = React.useMemo(() => {
    if (!getDetailsPanelContent) {
      return new Set<string | number>();
    }

    const ids = new Set<string | number>();

    for (const [rowData, { id, level }] of itemDetails.entries()) {
      /* We only allow Master - Details pattern on top level rows */
      if (level > 0) {
        continue;
      }

      if (!isDetailsPanelExpandable || isDetailsPanelExpandable(rowData)) {
        ids.add(id);
      }
    }

    return ids;
  }, [getDetailsPanelContent, isDetailsPanelExpandable, itemDetails]);

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
    </DataTableDetailsPanelContextProvider>
  );
}

function getDataTableDetailsPanelId(tableId: string, rowId: string | number) {
  return `${tableId}-expansion-${rowId}`;
}

export {
  DataTableDetailsPanelProvider,
  getDataTableDetailsPanelId,
  useDataTableDetailsPanel,
};

export type { DetailsPanelProps };

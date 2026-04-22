/* eslint-disable @typescript-eslint/no-unused-vars */
/** biome-ignore-all lint/correctness/noUnusedVariables: temp */
import { useControllableState } from "../../../utils/hooks";

type UseTableItemsArgs<T> = {
  items: T[];
  /**
   * Master - Detail pattern props
   */
  expandedDetailsPanelIds?: (string | number)[];
  defaultExpandedDetailsPanelIds?: (string | number)[];
  isDetailsPanelExpandable?: (rowData: T) => boolean;
  onDetailsPanelChange?: (ids: (string | number)[]) => void;

  getDetailsPanelHeight?: (row: T) => number | "auto";
  getDetailsPanelContent?: (row: T) => React.ReactNode;
  /**
   * Expanded/Nested rows pattern props
   */
  getSubRows?: (rowData: T) => T[];
  expandedSubRowIds?: (string | number)[];
  defaultExpandedSubRowIds?: (string | number)[];
  isSubRowExpandable?: (rowData: T) => boolean;
  onExpandedSubRowIdsChange?: (ids: (string | number)[]) => void;
};

interface ItemDetail<T> {
  level: number;
  setSize: number;
  posInSet: number;
  parent: null | T;
  children: readonly T[];
}

function useTableItems<T>(args: UseTableItemsArgs<T>) {
  const {
    items,
    defaultExpandedDetailsPanelIds,
    expandedDetailsPanelIds,
    expandedSubRowIds,
    defaultExpandedSubRowIds,
    getDetailsPanelContent,
    getSubRows,
  } = args;

  const [expandedIds, setExpandedIds] = useControllableState({
    value: expandedDetailsPanelIds,
    defaultValue: defaultExpandedDetailsPanelIds,
  });

  const [nestedSubRowsExpandedIds, setNestedSubRowsExpandedIds] =
    useControllableState({
      value: expandedSubRowIds,
      defaultValue: defaultExpandedSubRowIds,
    });

  const allItems = items;

  const itemWithDetails = new Map<T, ItemDetail<T>>();

  const isExpandable = !!getDetailsPanelContent || !!getSubRows;

  if (isExpandable) {
    return null;
  }

  return [];
}

export { useTableItems };

import { useMemo } from "react";
import { consoleWarning } from "../../../utils/helpers/consoleWarning";
import type {
  ColumnDefinition,
  ColumnDefinitions,
} from "../root/DataGridTable.types";
import { ACTION_CELL_WIDTH } from "../tr/DataTableTr";

type UseColumnOptions = {
  stickyColumns?: {
    start?: 1;
    end?: 1;
  };
  hasSelection: boolean;
  hasDetailsPanel: boolean;
  layout: "fixed" | "auto";
  columnDisplay?: {
    id: string;
    visible: boolean;
  }[];
};

type StickyStartState = {
  selection: boolean;
  expansion: boolean;
  selectionOffset: number;
  firstColumnOffset: number;
};

type UseColumnOptionsResult<T> = {
  columns: {
    isSticky: "start" | "end" | false;
    isStickyLast?: boolean;
    stickyLeftOffset?: number;
    colDef: ColumnDefinition<T>;
  }[];
  stickyStart: StickyStartState;
  totalColSpan: number;
};

function useColumnOptions<T>(
  columnDefinitions: ColumnDefinitions<T>,
  options: UseColumnOptions,
): UseColumnOptionsResult<T> {
  const {
    stickyColumns,
    hasSelection,
    hasDetailsPanel,
    layout,
    columnDisplay,
  } = options;

  const hasStickyStart = stickyColumns?.start === 1;

  const stickyExpansion = hasStickyStart && hasDetailsPanel;
  const stickySelection = hasStickyStart && hasSelection;

  const stickySelectionOffset = stickyExpansion ? ACTION_CELL_WIDTH : 0;
  const stickyFirstColumnOffset =
    (stickyExpansion ? ACTION_CELL_WIDTH : 0) +
    (stickySelection ? ACTION_CELL_WIDTH : 0);

  const visibleColumns = useMemo(() => {
    return orderColumnsAndFilterByVisibility(columnDefinitions, columnDisplay);
  }, [columnDefinitions, columnDisplay]);

  const columns = useMemo(() => {
    return visibleColumns.map((colDef, index) => {
      const isFirstSticky = hasStickyStart && index === 0;
      const isLastSticky =
        stickyColumns?.end === 1 && index === visibleColumns.length - 1;

      return {
        isSticky: isFirstSticky
          ? ("start" as const)
          : isLastSticky
            ? ("end" as const)
            : (false as const),
        isStickyLast: isFirstSticky && !isLastSticky,
        stickyLeftOffset: isFirstSticky ? stickyFirstColumnOffset : undefined,
        colDef,
      };
    });
  }, [visibleColumns, hasStickyStart, stickyColumns, stickyFirstColumnOffset]);

  const totalColSpan =
    columns.length +
    (layout === "fixed" ? 1 : 0) +
    (hasSelection ? 1 : 0) +
    (hasDetailsPanel ? 1 : 0);

  return {
    stickyStart: {
      selection: stickySelection,
      expansion: stickyExpansion,
      selectionOffset: stickySelectionOffset,
      firstColumnOffset: stickyFirstColumnOffset,
    },
    columns,
    totalColSpan,
  };
}

function orderColumnsAndFilterByVisibility<T>(
  columns: ColumnDefinition<T>[],
  columnDisplay?: { id: string; visible: boolean }[],
): ColumnDefinition<T>[] {
  if (!columnDisplay) {
    return columns;
  }

  const columnMap = new Map(columns.map((col) => [col.id, col]));

  return columnDisplay.reduce<ColumnDefinition<T>[]>((acc, { id, visible }) => {
    const col = columnMap.get(id);

    if (!col) {
      consoleWarning(
        `DataGrid: Column with id "${id}" not found in column definitions. Please check your columnDisplay configuration.`,
      );
    }

    if (col && visible) {
      acc.push(col);
    }
    return acc;
  }, []);
}

export { useColumnOptions };
export type { StickyStartState, UseColumnOptionsResult };

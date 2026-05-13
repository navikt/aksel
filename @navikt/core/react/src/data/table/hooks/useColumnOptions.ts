import { useMemo } from "react";
import type {
  ColumnDefinition,
  ColumnDefinitions,
} from "../root/DataTable.types";
import { ACTION_CELL_WIDTH } from "../tr/DataTableTr";

type UseColumnOptions = {
  stickyColumns?: {
    start?: "1";
    end?: "1";
  };
  hasSelection: boolean;
  hasDetailsPanel: boolean;
  layout: "fixed" | "auto";
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
  const { stickyColumns, hasSelection, hasDetailsPanel, layout } = options;

  const hasStickyStart = stickyColumns?.start === "1";

  const stickyExpansion = hasStickyStart && hasDetailsPanel;
  const stickySelection = hasStickyStart && hasSelection;

  const stickySelectionOffset = stickyExpansion ? ACTION_CELL_WIDTH : 0;
  const stickyFirstColumnOffset =
    (stickyExpansion ? ACTION_CELL_WIDTH : 0) +
    (stickySelection ? ACTION_CELL_WIDTH : 0);

  const columns = useMemo(() => {
    return columnDefinitions.map((colDef, index) => {
      const isFirstSticky = hasStickyStart && index === 0;
      const isLastSticky =
        stickyColumns?.end === "1" && index === columnDefinitions.length - 1;

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
  }, [
    columnDefinitions,
    hasStickyStart,
    stickyColumns,
    stickyFirstColumnOffset,
  ]);

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

export { useColumnOptions };
export type { StickyStartState };
export type { UseColumnOptionsResult };

import { useMemo } from "react";
import type {
  ColumnDefinition,
  ColumnDefinitions,
} from "../root/DataTable.types";
import type { SelectionProps } from "./useTableSelection";

type UseColumnOptions = {
  stickyColumns?: {
    first?: "1";
    last?: "1";
  };
  selectionMode: SelectionProps["selectionMode"];
};

type UseColumnOptionsResult<T> = {
  columns: {
    isSticky: "start" | "end" | false;
    colDef: ColumnDefinition<T>;
  }[];
  stickySelection: boolean;
};

function useColumnOptions<T>(
  columnDefinitions: ColumnDefinitions<T>,
  options: UseColumnOptions,
): UseColumnOptionsResult<T> {
  const { stickyColumns, selectionMode } = options;

  const hasSelection = selectionMode !== "none";

  const columns = useMemo(() => {
    return columnDefinitions.map((colDef, index) => {
      const isFirstSticky =
        stickyColumns?.first === "1" && index === 0 && !hasSelection;
      const isLastSticky =
        stickyColumns?.last === "1" && index === columnDefinitions.length - 1;

      return {
        isSticky: isFirstSticky
          ? ("start" as const)
          : isLastSticky
            ? ("end" as const)
            : (false as const),
        colDef,
      };
    });
  }, [
    columnDefinitions,
    hasSelection,
    stickyColumns?.first,
    stickyColumns?.last,
  ]);

  return {
    stickySelection: selectionMode !== "none" && stickyColumns?.first === "1",
    columns,
  };
}

export { useColumnOptions };
export type { UseColumnOptionsResult };

import { useMemo } from "react";
import type {
  ColumnDefinition,
  ColumnDefinitions,
} from "../root/DataTable.types";
import type { SelectionProps } from "./useTableSelection";

type UseColumnOptions<T> = {
  stickyColumns?: {
    start?: "1";
    end?: "1";
  };
  selectionMode: SelectionProps<T>["selectionMode"];
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
  options: UseColumnOptions<T>,
): UseColumnOptionsResult<T> {
  const { stickyColumns, selectionMode } = options;

  const hasSelection = selectionMode !== "none";

  const columns = useMemo(() => {
    return columnDefinitions.map((colDef, index) => {
      const isFirstSticky =
        stickyColumns?.start === "1" && index === 0 && !hasSelection;
      const isLastSticky =
        stickyColumns?.end === "1" && index === columnDefinitions.length - 1;

      return {
        isSticky: isFirstSticky
          ? ("start" as const)
          : isLastSticky
            ? ("end" as const)
            : (false as const),
        colDef,
      };
    });
  }, [columnDefinitions, hasSelection, stickyColumns]);

  return {
    stickySelection: selectionMode !== "none" && stickyColumns?.start === "1",
    columns,
  };
}

export { useColumnOptions };
export type { UseColumnOptionsResult };

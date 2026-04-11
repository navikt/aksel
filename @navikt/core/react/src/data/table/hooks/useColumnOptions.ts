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

  return {
    stickySelection: selectionMode !== "none" && stickyColumns?.first === "1",
    columns: columnDefinitions.map((colDef, index) => {
      const isFirstSticky =
        stickyColumns?.first === "1" && index === 0 && !hasSelection;
      const isLastSticky =
        stickyColumns?.last === "1" && index === columnDefinitions.length - 1;

      return {
        isSticky: isFirstSticky ? "start" : isLastSticky ? "end" : false,
        colDef,
      };
    }),
  };
}

export { useColumnOptions };

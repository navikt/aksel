import { createStrictContext } from "../../../utils/helpers";
import type {
  StickyStartState,
  UseColumnOptionsResult,
} from "../hooks/useColumnOptions";
import type { UseTableItemsReturn } from "../hooks/useTableItems";
import type { UseTableSelectionReturn } from "../hooks/useTableSelection";
import type { UseTableSortResults } from "../hooks/useTableSort";
import type { DataTableLoadingConfig } from "./DataGridTable.types";

type DataTableContextProps<T> = {
  layout: "fixed" | "auto";
  withKeyboardNav: boolean;
  selectionState: UseTableSelectionReturn;
  stickyStart: StickyStartState;
  stickyHeader: boolean;
  tableId: string;
  loading: DataTableLoadingConfig | undefined;
  onRowAction?: ({
    row,
    id,
    event,
  }: {
    row: T;
    id: string;
    event: React.MouseEvent<HTMLTableRowElement>;
  }) => void;
  columns: UseColumnOptionsResult<T>["columns"];
  /**
   * Used to set exact colspan for detailsPanel, loadingState and emptyState.
   * This is necessary to ensure that these components span the entire width of the table.
   */
  totalColSpan: number;
  /**
   * The current items and related metadata.
   */
  tableItems: UseTableItemsReturn<T>;
  sortingState: UseTableSortResults;
};

const { Provider: DataTableContextProvider, useContext: useDataTableContext } =
  createStrictContext<DataTableContextProps<any>>({
    name: "DataTableContext",
    errorMessage: "useDataTableContext must be used within DataTable",
  });

type DataTableLocation = "thead" | "tbody" | "tfoot";

const {
  Provider: DataTableLocationProvider,
  useContext: useDataTableLocation,
} = createStrictContext<{ location: DataTableLocation }>({
  name: "DataTableLocation",
  errorMessage:
    "Some component is using table context outside of Thead, Tbody or Tfoot. Please make sure to wrap it in the appropriate component.",
});

export {
  DataTableContextProvider,
  DataTableLocationProvider,
  useDataTableContext,
  useDataTableLocation,
};

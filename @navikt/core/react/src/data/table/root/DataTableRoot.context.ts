import { createStrictContext } from "../../../utils/helpers";
import type { UseColumnOptionsResult } from "../hooks/useColumnOptions";
import type { UseTableSelectionReturn } from "../hooks/useTableSelection";

type DataTableContextProps<T> = {
  layout: "fixed" | "auto";
  withKeyboardNav: boolean;
  selectionState: UseTableSelectionReturn;
  stickySelection: boolean;
  stickyHeader: boolean;
  tableId: string;
  showLoadingSkeletons: boolean;
  onRowClick?: (
    rowId: string | number,
    event: React.MouseEvent<HTMLTableRowElement>,
  ) => void;
  isLoading?: boolean;
  showLoadingOverlay: boolean;
  columns: UseColumnOptionsResult<T>["columns"];
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

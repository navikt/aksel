import { createStrictContext } from "../../../utils/helpers";
import type { UseTableSelectionReturn } from "../hooks/useTableSelection";

type DataTableContextProps = {
  layout: "fixed" | "auto";
  withKeyboardNav: boolean;
  /* TODO: Temp optional, should be required */
  selectionState?: UseTableSelectionReturn;
  stickySelection: boolean;
  stickyHeader: boolean;
};

const { Provider: DataTableContextProvider, useContext: useDataTableContext } =
  createStrictContext<DataTableContextProps>({
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

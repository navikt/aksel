import { createStrictContext } from "../../../utils/helpers";

interface DataTableContextProps {
  layout: "fixed" | "auto";
  withKeyboardNav: boolean;
  selectionMode?: "single" | "multiple";
}

const { Provider: DataTableContextProvider, useContext: useDataTableContext } =
  createStrictContext<DataTableContextProps>({
    name: "DataTableContext",
    errorMessage: "useDataTableContext must be used within DataTable",
  });

export { DataTableContextProvider, useDataTableContext };

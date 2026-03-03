import { createStrictContext } from "../../../utils/helpers";

interface DataTableContextProps {
  layout: "fixed" | "auto";
}

const { Provider: DataTableContextProvider, useContext: useDataTableContext } =
  createStrictContext<DataTableContextProps>({
    name: "DataTableContext",
    errorMessage: "useDataTableContext must be used within DataTable",
  });

export { DataTableContextProvider, useDataTableContext };

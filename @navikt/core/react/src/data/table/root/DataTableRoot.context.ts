import { createStrictContext } from "../../../utils/helpers";

interface ColumnRegistration {
  type: "fr" | "fixed";
  frValue: number;
  fixedWidth: number;
  minWidth: number;
  maxWidth: number;
  setResolvedWidth: (width: number) => void;
}

interface DataTableContextProps {
  layout: "fixed" | "auto";
  registerColumn: (id: string, config: ColumnRegistration) => void;
  unregisterColumn: (id: string) => void;
  notifyResize: (id: string, newWidth: number) => void;
}

const { Provider: DataTableContextProvider, useContext: useDataTableContext } =
  createStrictContext<DataTableContextProps>({
    name: "DataTableContext",
    errorMessage: "useDataTableContext must be used within DataTable",
  });

export { DataTableContextProvider, useDataTableContext };
export type { ColumnRegistration };

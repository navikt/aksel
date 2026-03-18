import { createStrictContext } from "../../../utils/helpers";

type SelectionT = string[] | "all";

type SelectionProps = {
  /**
   * Enables selection of rows.
   *
   *
   * When set to "single", only one row can be selected at a time.
   *
   * When set to "multiple", multiple rows can be selected.
   *
   * TODO:
   * - Implement callbacks for selection changes (e.g. onRowSelect, onSelectAll)
   * - Implement controlled state
   * - Implement auto-add checkbox to rows and header when selection is enabled
   *
   * @default "none"
   */
  selectionMode?: "none" | "single" | "multiple";
  selectedKeys?: SelectionT;
  defaultSelectedKeys?: SelectionT;
  onSelectionChange?: (keys: SelectionT) => void;
  disabledKeys?: string[];

  /* disallowEmptySelection?: boolean; */
};

type DataTableContextProps = {
  layout: "fixed" | "auto";
  withKeyboardNav: boolean;
  handleSelectionChange: (key: { value: string } | "all") => void;
  register: (value: string) => void;
  unRegister: (value: string) => void;
  values: any;
} & Required<
  Pick<SelectionProps, "selectedKeys" | "selectionMode" | "disabledKeys">
>;

const { Provider: DataTableContextProvider, useContext: useDataTableContext } =
  createStrictContext<DataTableContextProps>({
    name: "DataTableContext",
    errorMessage: "useDataTableContext must be used within DataTable",
  });

export { DataTableContextProvider, useDataTableContext };
export type { SelectionProps };

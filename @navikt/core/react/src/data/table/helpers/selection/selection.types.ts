import type { CheckboxInputProps } from "../../../../form/checkbox/checkbox-input/CheckboxInput";
import type { RadioInputProps } from "../../../../form/radio/radio-input/RadioInput";
import type { TableRowEntryId } from "../../root/DataGridTable.types";

// TODO: Remove `any` if possible
type SelectionProps<T = unknown> = {
  /**
   * Enables selection of rows.
   *
   * When set to "single", only one row can be selected at a time (renders radio buttons).
   *
   * When set to "multiple", multiple rows can be selected (renders checkboxes).
   * Nested rows use cascading selection, so selecting a parent toggles its descendants too.
   *
   * @default "none"
   */
  mode: "none" | "single" | "multiple";
  /**
   * Controlled selected keys. Should be used in conjunction with `onSelectedRowIdsChange`.
   */
  selectedRowIds?: string[];
  /**
   * Default selected keys when using uncontrolled selection. Should not be used together with `selectedKeys`.
   */
  defaultSelectedRowIds?: string[];
  /**
   * Callback with array of selected keys.
   */
  onSelectedRowIdsChange?: (ids: string[]) => void;
  /**
   * Callback to determine if a row should be enabled for selection.
   *
   * If set to a boolean, it will enable selection for all rows when true, and disable selection for all rows when false.
   */
  enableRowSelection?:
    | (({ row, id }: { row: T; id: TableRowEntryId }) => boolean)
    | boolean;
};

type NoneSelection = {
  mode: "none";
  selectedKeys: string[];
};

type SingleSelection = {
  mode: "single";
  selectedKeys: string[];
  getRowRadioProps: (key: TableRowEntryId, row: any) => RadioInputProps;
  toggleSelection: (key: TableRowEntryId, row: any) => void;
};

type MultipleSelection = {
  mode: "multiple";
  selectedKeys: string[];
  getTheadCheckboxProps: () => CheckboxInputProps;
  getRowCheckboxProps: (key: TableRowEntryId, row: any) => CheckboxInputProps;
  toggleSelection: (key: TableRowEntryId, row: any) => void;
};

type TableSelectionBase = {
  isRowSelected: (rowId: TableRowEntryId) => boolean;
};

type TableSelection = TableSelectionBase &
  (NoneSelection | SingleSelection | MultipleSelection);

export type {
  MultipleSelection,
  NoneSelection,
  SelectionProps,
  SingleSelection,
  TableSelection,
};

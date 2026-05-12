import type { CheckboxInputProps } from "../../../../form/checkbox/checkbox-input/CheckboxInput";
import type { RadioInputProps } from "../../../../form/radio/radio-input/RadioInput";

type SelectedKeysT = (string | number)[];

// TODO: Remove `any` if possible
type SelectionProps<T = any> = {
  /**
   * Enables selection of rows.
   *
   * When set to "single", only one row can be selected at a time (renders radio buttons).
   *
   * When set to "multiple", multiple rows can be selected (renders checkboxes).
   * Nested rows use cascading selection, so selecting a parent toggles its descendants too.
   *
   * @default "none"
   *
   * TODO: Pri zero Make required
   */
  selectionMode?: "none" | "single" | "multiple";
  /**
   * Controlled selected keys. Should be used in conjunction with `onSelectionChange`.
   */
  selectedKeys?: SelectedKeysT;
  /**
   * Default selected keys when using uncontrolled selection. Should not be used together with `selectedKeys`.
   */
  defaultSelectedKeys?: SelectedKeysT;
  /**
   * Callback with array of selected keys.
   */
  onSelectionChange?: (keys: SelectedKeysT) => void;
  /**
   * Callback to determine if a row should be disabled for selection.
   *
   *
   * If set to a boolean, it will disable selection for all rows when true, and enable selection for all rows when false.
   */
  disableRowSelection?:
    | (({ row, id }: { row: T; id: string | number }) => boolean)
    | boolean;
  /**
   * If true, stops clicking a row from toggling its selection state. This can be used if you want to only allow selection through the checkboxes/radios, and not have the entire row be clickable for selection.
   *
   * @default false
   */
  disableRowSelectionOnClick?: boolean;
};

type NoneSelection = {
  selectionMode: "none";
  selectedKeys: SelectedKeysT;
};

type SingleSelection = {
  selectionMode: "single";
  selectedKeys: SelectedKeysT;
  getRowRadioProps: (key: string | number, row: any) => RadioInputProps;
  toggleSelection: (key: string | number, row: any) => void;
};

type MultipleSelection = {
  selectionMode: "multiple";
  selectedKeys: SelectedKeysT;
  getTheadCheckboxProps: () => CheckboxInputProps;
  getRowCheckboxProps: (key: string | number, row: any) => CheckboxInputProps;
  toggleSelection: (key: string | number, row: any) => void;
};

type TableSelectionBase = {
  isRowSelected: (rowId: string | number) => boolean;
};

type TableSelection = TableSelectionBase &
  (NoneSelection | SingleSelection | MultipleSelection);

export type {
  MultipleSelection,
  NoneSelection,
  SelectedKeysT,
  SelectionProps,
  SingleSelection,
  TableSelection,
};

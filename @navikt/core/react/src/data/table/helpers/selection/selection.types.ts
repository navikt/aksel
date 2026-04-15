import type { CheckboxInputProps } from "../../../../form/checkbox/checkbox-input/CheckboxInput";
import type { RadioInputProps } from "../../../../form/radio/radio-input/RadioInput";

type SelectedKeysT = (string | number)[];

type SelectionProps = {
  /**
   * Enables selection of rows.
   *
   * When set to "single", only one row can be selected at a time (renders radio buttons).
   *
   * When set to "multiple", multiple rows can be selected (renders checkboxes).
   *
   * @default "none"
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
   * Keys that should be disabled for selection. These keys will not be selectable and will be styled as disabled.
   *
   *
   * TODO: Consider making this optionally a callback with (rowData:T) => boolean, to allow for more dynamic disabling of selection based on row data.
   */
  disabledSelectionKeys?: SelectedKeysT;
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
  disabledSelectionKeys: SelectedKeysT;
};

type SingleSelection = {
  selectionMode: "single";
  selectedKeys: SelectedKeysT;
  disabledSelectionKeys: SelectedKeysT;
  getRowRadioProps: (key: string | number) => RadioInputProps;
  toggleSelection: (key: string | number) => void;
};

type MultipleSelection = {
  selectionMode: "multiple";
  selectedKeys: SelectedKeysT;
  disabledSelectionKeys: SelectedKeysT;
  getTheadCheckboxProps: () => CheckboxInputProps;
  getRowCheckboxProps: (key: string | number) => CheckboxInputProps;
  toggleSelection: (key: string | number) => void;
};

type TableSelectionBase = {
  isRowSelected: (rowId: string | number) => boolean;
};

type TableSelection = TableSelectionBase &
  (NoneSelection | SingleSelection | MultipleSelection);

export type {
  MultipleSelection,
  NoneSelection,
  SelectionProps,
  SingleSelection,
  TableSelection,
  SelectedKeysT,
};

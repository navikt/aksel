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
  selectedKeys?: SelectedKeysT;
  defaultSelectedKeys?: SelectedKeysT;
  onSelectionChange?: (keys: SelectedKeysT) => void;
  disabledKeys?: SelectedKeysT;
};

type NoneSelection = {
  selectionMode: "none";
  selectedKeys: SelectedKeysT;
  disabledKeys: SelectedKeysT;
};

type SingleSelection = {
  selectionMode: "single";
  selectedKeys: SelectedKeysT;
  disabledKeys: SelectedKeysT;
  getRowRadioProps: (key: string | number) => RadioInputProps;
};

type MultipleSelection = {
  selectionMode: "multiple";
  selectedKeys: SelectedKeysT;
  disabledKeys: SelectedKeysT;
  getTheadCheckboxProps: () => CheckboxInputProps;
  getRowCheckboxProps: (key: string | number) => CheckboxInputProps;
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

import type { CheckboxInputProps } from "../../../../form/checkbox/checkbox-input/CheckboxInput";
import type { RadioInputProps } from "../../../../form/radio/radio-input/RadioInput";

type SelectionT = (string | number)[] | "all";

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
  selectedKeys?: SelectionT;
  defaultSelectedKeys?: SelectionT;
  onSelectionChange?: (keys: SelectionT) => void;
  disabledKeys?: (string | number)[];
};

type NoneSelection = {
  selectionMode: "none";
  allKeys: (string | number)[];
  selectedKeys: (string | number)[];
  disabledKeys: (string | number)[];
};

type SingleSelection = {
  selectionMode: "single";
  allKeys: (string | number)[];
  selectedKeys: (string | number)[];
  disabledKeys: (string | number)[];
  getRowRadioProps: (key: string | number) => RadioInputProps;
};

type MultipleSelection = {
  selectionMode: "multiple";
  allKeys: (string | number)[];
  selectedKeys: SelectionT;
  disabledKeys: (string | number)[];
  getTheadCheckboxProps: () => CheckboxInputProps;
  getRowCheckboxProps: (key: string | number) => CheckboxInputProps;
};

type TableSelection = NoneSelection | SingleSelection | MultipleSelection;

export type {
  MultipleSelection,
  NoneSelection,
  SelectionProps,
  SelectionT,
  SingleSelection,
  TableSelection,
};

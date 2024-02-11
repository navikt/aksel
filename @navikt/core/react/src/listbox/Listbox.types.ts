import { Key } from "react";

export type ListboxBaseProps = {
  virtual?: boolean;
  /**
   * allows setting current focused value to null when ArrowUp while on first item
   */
  focusFirstOnKeydown?: boolean;
  onSelectionChange?: (value: Key) => void;
};

export interface ListboxProps extends ListboxBaseProps {
  children?: React.ReactNode;
}

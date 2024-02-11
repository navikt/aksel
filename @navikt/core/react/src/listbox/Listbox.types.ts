export type ListboxBaseProps = {
  virtual?: boolean;
  focusFirstOnKeydown?: boolean;
};

export interface ListboxProps extends ListboxBaseProps {
  children?: React.ReactNode;
}

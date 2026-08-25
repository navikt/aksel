import React from "react";
import { Label } from "../../../typography";
import { cl } from "../../../utils/helpers";
import { useComboboxRootContext } from "../root/ComboboxRoot";

interface ComboboxLabelProps extends React.HTMLAttributes<HTMLLabelElement> {
  children: string;
}

const ComboboxLabel = ({
  children,
  className,
  ...rest
}: ComboboxLabelProps) => {
  const { triggerId } = useComboboxRootContext();

  return (
    <Label
      htmlFor={triggerId}
      className={cl(
        "aksel-form-field__label aksel-combobox2__label",
        className,
      )}
      {...rest}
    >
      {children}
    </Label>
  );
};

export { ComboboxLabel };

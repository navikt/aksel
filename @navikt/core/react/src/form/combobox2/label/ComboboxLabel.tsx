import React from "react";
import { Label } from "../../../typography";
import { cl } from "../../../utils/helpers";
import { ReadOnlyIconWithTitle } from "../../ReadOnlyIcon";
import { useComboboxRootContext } from "../root/ComboboxRoot";

interface ComboboxLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: string;
  htmlFor: string;
  hide?: boolean;
  readOnly?: boolean;
}

const ComboboxLabel = ({
  children,
  className,
  hide,
  readOnly,
  ...rest
}: ComboboxLabelProps) => {
  const { size } = useComboboxRootContext();

  return (
    <Label
      className={cl(
        "aksel-form-field__label aksel-combobox2__label",
        className,
        { "aksel-sr-only": hide },
      )}
      size={size}
      {...rest}
    >
      {readOnly && <ReadOnlyIconWithTitle />}
      {children}
    </Label>
  );
};

export { ComboboxLabel };

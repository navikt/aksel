import React from "react";
import { Label } from "../../../typography";
import { cl } from "../../../utils/helpers";
import { ReadOnlyIconWithTitle } from "../../ReadOnlyIcon";
import { useComboboxRootContext } from "../root/ComboboxRoot";

interface ComboboxLabelProps extends React.HTMLAttributes<HTMLLabelElement> {
  children: string;
}

const ComboboxLabel = ({
  children,
  className,
  ...rest
}: ComboboxLabelProps) => {
  const { triggerId, size, hideLabel, readOnly } = useComboboxRootContext();

  // TODO: Vurder om hideLabel og readOnly skal være props i Root

  return (
    <Label
      htmlFor={triggerId}
      className={cl(
        "aksel-form-field__label aksel-combobox2__label",
        className,
        {
          "aksel-sr-only": hideLabel,
        },
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

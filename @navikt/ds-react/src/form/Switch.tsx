import React, { forwardRef, InputHTMLAttributes, useState } from "react";
import cl from "classnames";
import { BodyShort, Label, omit } from "..";
import { FormFieldProps, useFormField } from "./useFormField";

export interface SwitchProps
  extends Omit<FormFieldProps, "error" | "errorId">,
    Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  /**
   * Switch-label
   */
  children: React.ReactNode;
  /**
   * If enabled shows the label and description for screenreaders only
   */
  hideLabel?: boolean;
}

const Switch = forwardRef<HTMLInputElement, SwitchProps>((props, ref) => {
  const { inputProps, size, inputDescriptionId } = useFormField(
    props,
    "switch"
  );

  const {
    children,
    className,
    description,
    hideLabel = false,
    ...rest
  } = props;

  const [checked, setChecked] = useState(
    props.checked ?? props.defaultChecked ?? false
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (props.checked && props.onChange) {
      props.onChange(e);
      return;
    }
    setChecked((c) => !c);
  };

  return (
    <div className={cl("navds-switch", props.className)}>
      <input
        {...omit(rest, ["size"])}
        {...inputProps}
        checked={checked}
        onChange={handleChange}
        ref={ref}
        type="checkbox"
        className={cl(className, "navds-switch__input")}
      />
      <span
        className={cl("navds-switch__track", {
          "navds-switch__track--checked": checked,
        })}
      />
      <span
        className={cl("navds-switch__thumb", {
          "navds-switch__thumb--checked": checked,
        })}
      />
      <Label
        htmlFor={inputProps.id}
        size={size}
        as="label"
        className={cl("navds-switch__label", {
          "sr-only": hideLabel,
        })}
      >
        {children}
      </Label>
      {!!description && (
        <BodyShort
          className={cl("navds-switch__description", {
            "sr-only": hideLabel,
          })}
          id={inputDescriptionId}
          size={size}
        >
          {description}
        </BodyShort>
      )}
    </div>
  );
});

export default Switch;

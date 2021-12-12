import React, { forwardRef, InputHTMLAttributes } from "react";
import cl from "classnames";
import { BodyShort, Label, Loader, omit } from "..";
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
  loader?: boolean;
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
    loader,
    hideLabel = false,
    ...rest
  } = props;

  return (
    <div
      className={cl("navds-switch", props.className, `navds-switch--${size}`)}
    >
      <input
        {...omit(rest, ["size"])}
        {...inputProps}
        ref={ref}
        type="checkbox"
        className={cl(className, "navds-switch__input")}
      />
      <span className="navds-switch__track" />
      <span className="navds-switch__thumb">
        {loader && <Loader size="small" />}
      </span>
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

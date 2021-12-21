import React, { forwardRef, InputHTMLAttributes } from "react";
import cl from "classnames";
import { BodyShort, Detail, Loader, omit, useId } from "..";
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
  /**
   * Toggles loading state with loader-component on switch
   */
  loading?: boolean;
}

const Switch = forwardRef<HTMLInputElement, SwitchProps>((props, ref) => {
  const { inputProps, size } = useFormField(props, "switch");

  const {
    children,
    className,
    description,
    hideLabel = false,
    loading,
    ...rest
  } = props;

  const genId = useId();

  const Description = size === "medium" ? BodyShort : Detail;
  const inputDescriptionId = `switch-description-${genId}`;

  return (
    <div
      className={cl("navds-switch", props.className, `navds-switch--${size}`, {
        "navds-switch--disabled": inputProps.disabled,
      })}
    >
      <input
        {...omit(rest, ["size"])}
        {...omit(inputProps, ["aria-invalid", "aria-describedby"])}
        aria-describedby={(description && inputDescriptionId) || undefined}
        ref={ref}
        type="checkbox"
        className={cl(className, "navds-switch__input")}
      />
      <span className="navds-switch__track" />
      <span className="navds-switch__thumb">
        {loading && <Loader size="xsmall" />}
      </span>

      <label htmlFor={inputProps.id} className="navds-switch__label-wrapper">
        <div
          className={cl("navds-switch__content", {
            "sr-only": hideLabel,
            "navds-switch--with-description": !!description && !hideLabel,
          })}
        >
          <BodyShort as="div" size={size} className="navds-switch__label">
            {children}
          </BodyShort>
          {description && (
            <Description
              as="div"
              size="small"
              className="navds-switch__description"
            >
              {description}
            </Description>
          )}
        </div>
      </label>
    </div>
  );
});

export default Switch;

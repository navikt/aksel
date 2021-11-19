import React, { forwardRef, InputHTMLAttributes } from "react";
import cl from "classnames";
import { BodyShort, Detail, omit } from "../..";
import { FormFieldProps } from "../useFormField";
import { useRadio } from "./useRadio";

export interface RadioProps
  extends Omit<FormFieldProps, "error" | "errorId">,
    Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  /**
   * Label for radio
   */
  children: React.ReactNode;
  /**
   * The value of the HTML element
   */
  value: string;
}

const Radio = forwardRef<HTMLInputElement, RadioProps>((props, ref) => {
  const { inputProps, size, hasError } = useRadio(props);

  const Description = size === "medium" ? BodyShort : Detail;

  return (
    <div
      className={cl(props.className, "navds-radio", `navds-radio--${size}`, {
        "navds-radio--error": hasError,
        "navds-radio--disabled": inputProps.disabled,
      })}
    >
      <input
        {...omit(props, ["children", "size", "description"])}
        {...inputProps}
        className="navds-radio__input"
        ref={ref}
      />
      <label htmlFor={inputProps.id} className="navds-radio__label">
        <div className="navds-radio__content">
          <BodyShort size={size}>{props.children}</BodyShort>
          {props.description && (
            <Description size="small" className="navds-radio__description">
              {props.description}
            </Description>
          )}
        </div>
      </label>
    </div>
  );
});

export default Radio;

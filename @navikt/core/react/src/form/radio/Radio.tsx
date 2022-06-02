import React, { forwardRef, InputHTMLAttributes } from "react";
import cl from "classnames";
import { BodyShort, Detail, omit } from "../..";
import { FormFieldProps } from "../useFormField";
import { useRadio } from "./useRadio";

export interface RadioProps
  extends Omit<FormFieldProps, "error" | "errorId">,
    Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "value"> {
  /**
   * Radio label
   */
  children: React.ReactNode;
  /**
   * The value of the HTML element
   */
  value: any;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>((props, ref) => {
  const { inputProps, size, hasError, inputDescriptionId } = useRadio(props);

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
      <BodyShort
        as="label"
        size={size}
        htmlFor={inputProps.id}
        className="navds-radio__label"
      >
        {props.children}
      </BodyShort>
      {props.description && (
        <Description
          as="div"
          size="small"
          className="navds-radio__description"
          id={
            typeof props.description === "string"
              ? inputDescriptionId
              : undefined
          }
        >
          {props.description}
        </Description>
      )}
    </div>
  );
});

export default Radio;

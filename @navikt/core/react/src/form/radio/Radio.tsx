import React, { forwardRef, InputHTMLAttributes } from "react";
import cl from "classnames";
import { BodyShort, Detail, omit } from "../..";
import { FormFieldProps } from "../useFormField";
import { useRadio } from "./useRadio";

export interface RadioProps
  extends Omit<FormFieldProps, "errorId">,
    Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  /**
   * Radio has error
   * @default false
   */
  error?: boolean;
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
  const { inputProps, size, hasError, inputDescriptionId } = useRadio(props);

  return (
    <div
      className={cl(props.className, "navds-radio", `navds-radio--${size}`, {
        "navds-radio--error": hasError,
      })}
    >
      <input
        {...omit(props, [
          "children",
          "size",
          "error",
          "errorId",
          "description",
        ])}
        {...inputProps}
        className="navds-radio__input"
        ref={ref}
      />
      <BodyShort
        as="label"
        htmlFor={inputProps.id}
        size={size}
        className="navds-radio__label"
      >
        {props.children}
      </BodyShort>
      {props.description && (
        <>
          {size === "medium" ? (
            <BodyShort
              size="small"
              id={inputDescriptionId}
              className="navds-radio__description"
            >
              {props.description}
            </BodyShort>
          ) : (
            <Detail
              size="small"
              id={inputDescriptionId}
              className="navds-radio__description"
            >
              {props.description}
            </Detail>
          )}
        </>
      )}
    </div>
  );
});

export default Radio;

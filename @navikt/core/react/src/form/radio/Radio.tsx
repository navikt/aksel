import cl from "clsx";
import React, { forwardRef } from "react";
import { BodyShort } from "../../typography";
import { omit } from "../../util";
import { RadioProps } from "./types";
import { useRadio } from "./useRadio";

export const Radio = forwardRef<HTMLInputElement, RadioProps>((props, ref) => {
  const { inputProps, size, hasError, readOnly } = useRadio(props);

  return (
    <div
      className={cl(props.className, "navds-radio", `navds-radio--${size}`, {
        "navds-radio--error": hasError,
        "navds-radio--disabled": inputProps.disabled,
        "navds-radio--readonly": readOnly,
      })}
    >
      <input
        {...omit(props, ["children", "size", "description", "readOnly"])}
        {...omit(inputProps, ["aria-invalid"])}
        className="navds-radio__input"
        ref={ref}
      />
      <label htmlFor={inputProps.id} className="navds-radio__label">
        <span className="navds-radio__content">
          <BodyShort as="span" size={size}>
            {props.children}
          </BodyShort>
          {props.description && (
            <BodyShort
              as="span"
              size={size}
              className="navds-form-field__subdescription navds-radio__description"
            >
              {props.description}
            </BodyShort>
          )}
        </span>
      </label>
    </div>
  );
});

export default Radio;

import React, { forwardRef } from "react";
import { useRenameCSS } from "../../theme/Theme";
import { BodyShort } from "../../typography";
import { omit } from "../../util";
import { RadioProps } from "./types";
import { useRadio } from "./useRadio";

export const Radio = forwardRef<HTMLInputElement, RadioProps>((props, ref) => {
  const { cn } = useRenameCSS();
  const { inputProps, size, hasError, readOnly } = useRadio(props);

  return (
    <div
      className={cn(props.className, "navds-radio", `navds-radio--${size}`, {
        "navds-radio--error": hasError,
        "navds-radio--disabled": inputProps.disabled,
        "navds-radio--readonly": readOnly,
      })}
      data-color={hasError ? "danger" : props["data-color"]}
    >
      <input
        {...omit(props, ["children", "size", "description", "readOnly"])}
        {...omit(inputProps, ["aria-invalid"])}
        className={cn("navds-radio__input")}
        ref={ref}
      />
      <label htmlFor={inputProps.id} className={cn("navds-radio__label")}>
        <span className={cn("navds-radio__content")}>
          <BodyShort as="span" size={size}>
            {props.children}
          </BodyShort>
          {props.description && (
            <BodyShort
              as="span"
              size={size}
              className={cn(
                "navds-form-field__subdescription navds-radio__description",
              )}
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

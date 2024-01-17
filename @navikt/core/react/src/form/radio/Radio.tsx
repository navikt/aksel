import cl from "clsx";
import React, { forwardRef } from "react";
import { BodyShort } from "../../typography";
import { omit } from "../../util";
import { useId } from "../../util/hooks";
import { RadioProps } from "./types";
import { useRadio } from "./useRadio";

export const Radio = forwardRef<HTMLInputElement, RadioProps>((props, ref) => {
  const { inputProps, size, hasError, readOnly } = useRadio(props);

  const labelId = useId();
  const descriptionId = useId();

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
        aria-labelledby={cl(
          labelId,
          !!props["aria-labelledby"] && props["aria-labelledby"],
          {
            [descriptionId]: props.description,
          },
        )}
        className="navds-radio__input"
        ref={ref}
      />
      <label htmlFor={inputProps.id} className="navds-radio__label">
        <span className="navds-radio__content">
          <BodyShort as="span" id={labelId} size={size} aria-hidden>
            {props.children}
          </BodyShort>
          {props.description && (
            <BodyShort
              as="span"
              id={descriptionId}
              size={size}
              className="navds-form-field__subdescription navds-radio__description"
              aria-hidden
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

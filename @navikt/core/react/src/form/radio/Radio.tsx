import React, { forwardRef } from "react";
import { BodyShort } from "../../typography";
import { omit, useId } from "../../util";
import { cl } from "../../util/className";
import { RadioProps } from "./types";
import { useRadio } from "./useRadio";

export const Radio = forwardRef<HTMLInputElement, RadioProps>((props, ref) => {
  const { inputProps, size, hasError, readOnly } = useRadio(props);
  const descriptionId = useId();

  return (
    <div
      className={cl(props.className, "aksel-radio", `aksel-radio--${size}`, {
        "aksel-radio--error": hasError,
        "aksel-radio--disabled": inputProps.disabled,
        "aksel-radio--readonly": readOnly,
      })}
      data-color={hasError ? "danger" : props["data-color"]}
    >
      <input
        {...omit(props, ["children", "size", "description", "readOnly"])}
        {...omit(inputProps, ["aria-invalid", "aria-describedby"])}
        aria-describedby={
          cl(inputProps["aria-describedby"], {
            [descriptionId]: props.description,
          }) || undefined
        }
        className="aksel-radio__input"
        ref={ref}
      />
      <BodyShort
        as="label"
        htmlFor={inputProps.id}
        className="aksel-radio__label"
        size={size}
      >
        {props.children}
      </BodyShort>
      {props.description && (
        <BodyShort
          id={descriptionId}
          size={size}
          className={cl(
            "aksel-form-field__subdescription aksel-radio__description",
          )}
        >
          {props.description}
        </BodyShort>
      )}
    </div>
  );
});

export default Radio;

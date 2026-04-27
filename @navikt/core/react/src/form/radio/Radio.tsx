import React, { forwardRef } from "react";
import { BodyShort } from "../../typography";
import { omit, useId } from "../../utils-external";
import { cl } from "../../utils/helpers";
import { RadioInput } from "./radio-input/RadioInput";
import { RadioProps } from "./types";
import { useRadio } from "./useRadio";

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  (props: RadioProps, forwardedRef) => {
    const { inputProps, size, hasError, readOnly } = useRadio(props);
    const descriptionId = useId();

    const { className, description, children } = props;

    return (
      <div
        className={cl(className, "aksel-radio", `aksel-radio--${size}`, {
          "aksel-radio--error": hasError,
          "aksel-radio--disabled": inputProps.disabled,
          "aksel-radio--readonly": readOnly,
        })}
        data-color={hasError ? "danger" : props["data-color"]}
      >
        <RadioInput
          ref={forwardedRef}
          {...omit(props, [
            "children",
            "size",
            "description",
            "readOnly",
            "className",
          ])}
          {...omit(inputProps, ["aria-invalid", "aria-describedby"])}
          aria-describedby={
            cl(inputProps["aria-describedby"], {
              [descriptionId]: description,
            }) || undefined
          }
          standalone={false}
        />
        <BodyShort
          as="label"
          htmlFor={inputProps.id}
          className="aksel-radio__label"
          size={size}
        >
          {children}
        </BodyShort>
        {description && (
          <BodyShort
            id={descriptionId}
            size={size}
            className="aksel-form-field__subdescription aksel-radio__description"
          >
            {description}
          </BodyShort>
        )}
      </div>
    );
  },
);

export default Radio;

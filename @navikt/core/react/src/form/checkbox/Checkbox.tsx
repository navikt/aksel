import React, { forwardRef } from "react";
import { BodyShort } from "../../typography";
import { omit, useId } from "../../utils-external";
import { cl } from "../../utils/helpers";
import { ReadOnlyIconWithTitle } from "../ReadOnlyIcon";
import { CheckboxInput } from "./checkbox-input/CheckboxInput";
import type { CheckboxProps } from "./types";
import useCheckbox from "./useCheckbox";

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (props: CheckboxProps, forwardedRef) => {
    const { inputProps, hasError, size, readOnly, nested } = useCheckbox(props);
    const descriptionId = useId();

    const { className, description, children, indeterminate, hideLabel } =
      props;

    return (
      <div
        className={cl(className, "aksel-checkbox", `aksel-checkbox--${size}`, {
          "aksel-checkbox--error": hasError,
          "aksel-checkbox--disabled": inputProps.disabled,
          "aksel-checkbox--readonly": readOnly,
        })}
        data-color={hasError ? "danger" : props["data-color"]}
      >
        <CheckboxInput
          ref={forwardedRef}
          {...omit(props, [
            "children",
            "size",
            "error",
            "description",
            "hideLabel",
            "indeterminate",
            "errorId",
            "readOnly",
            "className",
          ])}
          {...omit(inputProps, ["aria-invalid", "aria-describedby"])}
          aria-describedby={
            cl(inputProps["aria-describedby"], {
              [descriptionId]: description,
            }) || undefined
          }
          indeterminate={indeterminate ?? false}
          standalone={false}
        />
        <BodyShort
          as="label"
          htmlFor={inputProps.id}
          size={size}
          className="aksel-checkbox__label"
          visuallyHidden={hideLabel}
        >
          {!nested && readOnly && <ReadOnlyIconWithTitle />}
          {children}
        </BodyShort>
        {description && (
          <BodyShort
            id={descriptionId}
            size={size}
            className="aksel-form-field__subdescription aksel-checkbox__description"
            visuallyHidden={hideLabel}
          >
            {description}
          </BodyShort>
        )}
      </div>
    );
  },
);

export default Checkbox;

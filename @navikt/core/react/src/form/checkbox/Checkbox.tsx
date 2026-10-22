import React, { forwardRef, useRef } from "react";
import { BodyShort } from "../../typography";
import { omit, useId } from "../../utils-external";
import { cl, createStrictContext } from "../../utils/helpers";
import { useMergeRefs } from "../../utils/hooks";
import { ReadOnlyIconWithTitle } from "../ReadOnlyIcon";
import { CheckboxInput } from "./checkbox-input/CheckboxInput";
import type { CheckboxProps } from "./types";
import useCheckbox from "./useCheckbox";

const {
  Provider: CheckboxCardContextProvider,
  useContext: useCheckboxCardContext,
} = createStrictContext({ name: "checkbox-card" });

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (props: CheckboxProps, forwardedRef) => {
    const { inputProps, hasError, size, readOnly, nested } = useCheckbox(props);
    const descriptionId = useId();
    const cardContext = useCheckboxCardContext(false);

    const checkboxRef = useRef<HTMLInputElement>(null);
    const mergedRefs = useMergeRefs(forwardedRef, checkboxRef);

    const { className, description, children, indeterminate, hideLabel } =
      props;

    return (
      // biome-ignore lint/a11y/noStaticElementInteractions: clickable div for checkbox card
      // biome-ignore lint/a11y/useKeyWithClickEvents: clickable div for checkbox card
      <div
        className={cl(className, "aksel-checkbox", `aksel-checkbox--${size}`, {
          "aksel-checkbox--error": hasError,
          "aksel-checkbox--disabled": inputProps.disabled,
          "aksel-checkbox--readonly": readOnly,
        })}
        data-color={hasError ? "danger" : props["data-color"]}
        onClick={(event) => {
          if (inputProps.disabled || readOnly || !cardContext) {
            return;
          }

          /* Let input and label handle their own click events */
          const target = event.target;
          const nativeHandler =
            target instanceof Element ? target.closest("label, input") : null;

          if (nativeHandler && event.currentTarget.contains(nativeHandler)) {
            return;
          }

          checkboxRef.current?.click();
          checkboxRef.current?.focus({ preventScroll: true });
        }}
      >
        <CheckboxInput
          ref={mergedRefs}
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
export { CheckboxCardContextProvider };

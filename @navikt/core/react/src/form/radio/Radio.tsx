import React, { forwardRef, useRef } from "react";
import { BodyShort } from "../../typography";
import { omit, useId } from "../../utils-external";
import { cl, createStrictContext } from "../../utils/helpers";
import { useMergeRefs } from "../../utils/hooks";
import { RadioInput } from "./radio-input/RadioInput";
import type { RadioProps } from "./types";
import { useRadio } from "./useRadio";

const { Provider: RadioCardContextProvider, useContext: useRadioCardContext } =
  createStrictContext({ name: "radio-card" });

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  (props: RadioProps, forwardedRef) => {
    const { inputProps, size, hasError, readOnly } = useRadio(props);
    const descriptionId = useId();
    const cardContext = useRadioCardContext(false);

    const radioRef = useRef<HTMLInputElement>(null);
    const mergedRefs = useMergeRefs(forwardedRef, radioRef);

    const { className, description, children } = props;

    return (
      // biome-ignore lint/a11y/noStaticElementInteractions: clickable div for radio card
      // biome-ignore lint/a11y/useKeyWithClickEvents: clickable div for radio card
      <div
        className={cl(className, "aksel-radio", `aksel-radio--${size}`, {
          "aksel-radio--error": hasError,
          "aksel-radio--disabled": inputProps.disabled,
          "aksel-radio--readonly": readOnly,
        })}
        data-color={hasError ? "danger" : props["data-color"]}
        onClick={(event) => {
          if (inputProps.disabled || readOnly || cardContext === null) {
            return;
          }

          /* Let input and label handle their own click events */
          if (
            event.target instanceof HTMLInputElement ||
            event.target instanceof HTMLLabelElement
          ) {
            return;
          }

          radioRef.current?.click();
        }}
      >
        <RadioInput
          ref={mergedRefs}
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
export { RadioCardContextProvider };

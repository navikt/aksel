import React, { forwardRef } from "react";
import { useRenameCSS } from "../../theme/Theme";
import { BodyShort } from "../../typography";
import { omit } from "../../util";
import { useId } from "../../util/hooks";
import { ReadOnlyIconWithTitle } from "../ReadOnlyIcon";
import { CheckboxProps } from "./types";
import useCheckbox from "./useCheckbox";

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (props, ref) => {
    const { cn } = useRenameCSS();
    const { inputProps, hasError, size, readOnly, nested } = useCheckbox(props);

    const labelId = useId();
    const descriptionId = useId();

    return (
      <div
        className={cn(
          props.className,
          "navds-checkbox",
          `navds-checkbox--${size}`,
          {
            "navds-checkbox--error": hasError,
            "navds-checkbox--disabled": inputProps.disabled,
            "navds-checkbox--readonly": readOnly,
          },
        )}
      >
        <input
          {...omit(props, [
            "children",
            "size",
            "error",
            "description",
            "hideLabel",
            "indeterminate",
            "errorId",
            "readOnly",
          ])}
          {...omit(inputProps, ["aria-invalid"])}
          type="checkbox"
          className={cn("navds-checkbox__input")}
          ref={(el) => {
            if (el) {
              el.indeterminate = props.indeterminate ?? false;
            }

            if (typeof ref === "function") {
              ref(el);
            } else if (ref != null) {
              ref.current = el;
            }
          }}
          aria-labelledby={cn(
            labelId,
            !!props["aria-labelledby"] && props["aria-labelledby"],
            {
              [descriptionId]: props.description,
            },
          )}
        />
        <label htmlFor={inputProps.id} className={cn("navds-checkbox__label")}>
          <span className={cn("navds-checkbox__icon")}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="0.8125rem"
              height="0.625rem"
              viewBox="0 0 13 10"
              fill="none"
              focusable={false}
              role="img"
              aria-hidden
            >
              <path
                d="M4.03524 6.41478L10.4752 0.404669C11.0792 -0.160351 12.029 -0.130672 12.5955 0.47478C13.162 1.08027 13.1296 2.03007 12.5245 2.59621L5.02111 9.59934C4.74099 9.85904 4.37559 10 4.00025 10C3.60651 10 3.22717 9.84621 2.93914 9.56111L0.439143 7.06111C-0.146381 6.47558 -0.146381 5.52542 0.439143 4.93989C1.02467 4.35437 1.97483 4.35437 2.56036 4.93989L4.03524 6.41478Z"
                fill="currentColor"
              />
            </svg>
          </span>
          <span className={cn("navds-checkbox__icon-indeterminate")} />
          <span
            className={cn("navds-checkbox__content", {
              "navds-sr-only": props.hideLabel,
            })}
          >
            <BodyShort
              as="span"
              id={labelId}
              size={size}
              className={cn("navds-checkbox__label-text")}
              aria-hidden
            >
              {!nested && readOnly && <ReadOnlyIconWithTitle />}
              {props.children}
            </BodyShort>
            {props.description && (
              <BodyShort
                as="span"
                id={descriptionId}
                size={size}
                className={cn(
                  "navds-form-field__subdescription navds-checkbox__description",
                )}
                aria-hidden
              >
                {props.description}
              </BodyShort>
            )}
          </span>
        </label>
      </div>
    );
  },
);

export default Checkbox;

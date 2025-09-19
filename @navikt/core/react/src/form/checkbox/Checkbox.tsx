import cl from "clsx";
import React, { forwardRef } from "react";
import { useRenameCSS, useThemeInternal } from "../../theme/Theme";
import { BodyShort } from "../../typography";
import { omit, useId } from "../../util";
import { ReadOnlyIconWithTitle } from "../ReadOnlyIcon";
import { CheckboxProps } from "./types";
import useCheckbox from "./useCheckbox";

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (props, ref) => {
    const { cn } = useRenameCSS();
    const { inputProps, hasError, size, readOnly, nested } = useCheckbox(props);
    const descriptionId = useId();
    const themeContext = useThemeInternal(false);

    if (themeContext?.isDarkside) {
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
          data-color={hasError ? "danger" : props["data-color"]}
        >
          <div className={cn("navds-checkbox__input-wrapper")}>
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
              {...omit(inputProps, ["aria-invalid", "aria-describedby"])}
              aria-describedby={
                cl(inputProps["aria-describedby"], {
                  [descriptionId]: props.description,
                }) || undefined
              }
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
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 13 10"
              fill="none"
              focusable={false}
              role="img"
              aria-hidden
              className={cn("navds-checkbox__icon")}
            >
              <path
                d="M4.03524 6.41478L10.4752 0.404669C11.0792 -0.160351 12.029 -0.130672 12.5955 0.47478C13.162 1.08027 13.1296 2.03007 12.5245 2.59621L5.02111 9.59934C4.74099 9.85904 4.37559 10 4.00025 10C3.60651 10 3.22717 9.84621 2.93914 9.56111L0.439143 7.06111C-0.146381 6.47558 -0.146381 5.52542 0.439143 4.93989C1.02467 4.35437 1.97483 4.35437 2.56036 4.93989L4.03524 6.41478Z"
                fill="currentColor"
              />
            </svg>
          </div>
          <BodyShort
            as="label"
            htmlFor={inputProps.id}
            size={size}
            className={cn("navds-checkbox__label", {
              "navds-sr-only": props.hideLabel,
            })}
          >
            {!nested && readOnly && <ReadOnlyIconWithTitle />}
            {props.children}
          </BodyShort>
          {props.description && (
            <BodyShort
              id={descriptionId}
              size={size}
              className={cn(
                "navds-form-field__subdescription navds-checkbox__description",
              )}
            >
              {props.description}
            </BodyShort>
          )}
        </div>
      );
    }

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
        data-color={hasError ? "danger" : props["data-color"]}
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
        />
        <label htmlFor={inputProps.id} className={cn("navds-checkbox__label")}>
          <span className={cn("navds-checkbox__icon")}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
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
              size={size}
              className={cn("navds-checkbox__label-text")}
            >
              {!nested && readOnly && <ReadOnlyIconWithTitle />}
              {props.children}
            </BodyShort>
            {props.description && (
              <BodyShort
                as="span"
                size={size}
                className={cn(
                  "navds-form-field__subdescription navds-checkbox__description",
                )}
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

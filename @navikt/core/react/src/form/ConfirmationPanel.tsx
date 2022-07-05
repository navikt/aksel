import React, { forwardRef } from "react";
import cl from "classnames";
import { BodyLong, Checkbox, CheckboxProps, ErrorMessage, omit } from "..";
import { useFormField } from "./useFormField";

export interface ConfirmationPanelProps
  extends Omit<
    CheckboxProps,
    "children" | "indeterminate" | "hideLabel" | "error"
  > {
  /**
   * Additional information on panel
   */
  children?: React.ReactNode;
  /**
   * Checkbox label
   */
  label: React.ReactNode;
  /**
   * Error message for element
   */
  error?: React.ReactNode;
  /**
   * Override internal errorId
   */
  errorId?: string;
}

export const ConfirmationPanel = forwardRef<
  HTMLDivElement,
  ConfirmationPanelProps
>(({ className, children, label, ...props }, ref) => {
  const { errorId, showErrorMsg, hasError, size, inputProps } = useFormField(
    props,
    "confirmationPanel"
  );

  return (
    <div
      ref={ref}
      className={cl("navds-confirmation-panel", "navds-form-field", className, {
        "navds-confirmation-panel--small": size === "small",
        "navds-confirmation-panel--error": hasError,
        "navds-confirmation-panel--checked": !!props.checked,
      })}
    >
      <div className="navds-confirmation-panel__inner">
        {children && (
          <BodyLong
            size={props.size}
            className="navds-confirmation-panel__content"
          >
            {children}
          </BodyLong>
        )}
        <Checkbox
          {...omit(props, ["errorId"])}
          {...inputProps}
          error={hasError}
          size={size}
        >
          {label}
        </Checkbox>
      </div>
      <div
        className="navds-form-field__error"
        id={errorId}
        aria-relevant="additions removals"
        aria-live="polite"
      >
        {showErrorMsg && <ErrorMessage size={size}>{props.error}</ErrorMessage>}
      </div>
    </div>
  );
});

export default ConfirmationPanel;

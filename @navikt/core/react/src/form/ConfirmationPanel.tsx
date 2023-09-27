import React, { forwardRef } from "react";
import cl from "clsx";
import { BodyLong, Checkbox, CheckboxProps, ErrorMessage, useId } from "..";
import { useFormField } from "./useFormField";

export interface ConfirmationPanelProps
  extends Omit<
    CheckboxProps,
    "children" | "indeterminate" | "hideLabel" | "error" | "readOnly"
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

/**
 * A component that displays a confirmation checkbox with a label.
 *
 * @see [📝 Documentation](https://aksel.nav.no/komponenter/core/confirmationpanel)
 * @see 🏷️ {@link ConfirmationPanelProps}
 *
 * @example
 * ```jsx
      <ConfirmationPanel
        checked={state}
        label="Ja, jeg samtykker."
        onChange={() => setState((x) => !x)}
      >
        For å komme videre må du gi oss lov til å hente inn og bruke opplysninger
        om deg.
      </ConfirmationPanel>
 * ```
 */
export const ConfirmationPanel = forwardRef<
  HTMLInputElement,
  ConfirmationPanelProps
>(({ className, children, label, ...props }, ref) => {
  const { errorId, showErrorMsg, hasError, size, inputProps } = useFormField(
    props,
    "confirmation-panel"
  );

  const id = useId();

  return (
    <div
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
            id={`confirmation-panel-${id}`}
            as="div"
          >
            {children}
          </BodyLong>
        )}
        <Checkbox
          ref={ref}
          {...props}
          {...inputProps}
          aria-describedby={cl(
            inputProps["aria-describedby"],
            children && `confirmation-panel-${id}`
          )}
          error={hasError}
          size={size}
        >
          {label}
        </Checkbox>
      </div>
      <div className="navds-form-field__error" id={errorId} role="alert">
        {showErrorMsg && <ErrorMessage size={size}>{props.error}</ErrorMessage>}
      </div>
    </div>
  );
});

export default ConfirmationPanel;

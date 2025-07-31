import cl from "clsx";
import React, { forwardRef } from "react";
import { useRenameCSS } from "../../theme/Theme";
import { BodyLong, ErrorMessage } from "../../typography";
import { useId } from "../../util/hooks";
import { Checkbox, CheckboxProps } from "../checkbox";
import { useFormField } from "../useFormField";

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
 * @deprecated Use `Checkbox` instead. See [new pattern documentation](https://aksel.nav.no/monster-maler/soknadsdialog/introside-for-soknadsdialoger#8346a8cb849b) for more information.
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
  const { cn } = useRenameCSS();
  const { errorId, showErrorMsg, hasError, size, inputProps } = useFormField(
    props,
    "confirmation-panel",
  );

  const id = useId();

  const currentColor = hasError
    ? "danger"
    : props.checked
      ? "success"
      : "warning";

  return (
    <div
      className={cn("navds-confirmation-panel", "navds-form-field", className, {
        "navds-confirmation-panel--small": size === "small",
        "navds-confirmation-panel--error": hasError,
        "navds-confirmation-panel--checked": !!props.checked,
      })}
      data-color={currentColor}
    >
      <div className={cn("navds-confirmation-panel__inner")}>
        {children && (
          <BodyLong
            size={props.size}
            className={cn("navds-confirmation-panel__content")}
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
            children && `confirmation-panel-${id}`,
          )}
          error={hasError}
          size={size}
        >
          {label}
        </Checkbox>
      </div>
      <div className={cn("navds-form-field__error")} id={errorId} role="alert">
        {showErrorMsg && (
          <ErrorMessage size={size} showIcon>
            {props.error}
          </ErrorMessage>
        )}
      </div>
    </div>
  );
});

export default ConfirmationPanel;

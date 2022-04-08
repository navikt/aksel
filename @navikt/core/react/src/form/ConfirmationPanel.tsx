import React, { forwardRef } from "react";
import cl from "classnames";
import { BodyLong, Checkbox, CheckboxProps } from "..";

export interface ConfirmationPanelProps
  extends Omit<CheckboxProps, "children"> {
  /**
   * Additional information on panel
   */
  children?: React.ReactNode;
  /**
   * Checkbox label
   */
  label: React.ReactNode;
}

const ConfirmationPanel = forwardRef<HTMLDivElement, ConfirmationPanelProps>(
  ({ className, children, label, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cl("navds-confirmation-panel", className, {
          "navds-confirmation-panel--small": props.size === "small",
          "navds-confirmation-panel--error": !!props.error,
          "navds-confirmation-panel--checked": !!props.checked,
        })}
      >
        {children && (
          <BodyLong
            size={props.size}
            className="navds-confirmation-panel__content"
          >
            {children}
          </BodyLong>
        )}
        <Checkbox {...props}>{label}</Checkbox>
      </div>
    );
  }
);

export default ConfirmationPanel;

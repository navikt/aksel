import React, { forwardRef } from "react";
import cl from "classnames";
import { BodyLong, Checkbox, CheckboxProps } from "../index";

export interface ConfirmationPanelProps extends Partial<CheckboxProps> {
  /**
   * children
   */
  children?: React.ReactNode;
  /**
   * Checkbox label
   */
  label: string;
  /**
   * Checked state for checkbox
   */
  checked: boolean;
}

const ConfirmationPanel = forwardRef<HTMLDivElement, ConfirmationPanelProps>(
  ({ className, children, label, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cl("navds-confirmation-panel", className, {
          "navds-confirmation-panel--s": props.size === "s",
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

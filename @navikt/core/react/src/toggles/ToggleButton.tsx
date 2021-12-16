import React, { forwardRef } from "react";
import cl from "classnames";

export interface TogglesButtonProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Modal.Content content
   */
  children: React.ReactNode;
}

export type ToggleButtonsType = React.ForwardRefExoticComponent<
  TogglesButtonProps & React.RefAttributes<HTMLDivElement>
>;

const TogglesButton: ToggleButtonsType = forwardRef(
  ({ className, ...rest }, ref) => (
    <div
      {...rest}
      ref={ref}
      className={cl("navds-toggles__button", className)}
    />
  )
);

export default TogglesButton;

import React, { forwardRef } from "react";
import cl from "classnames";
import { BodyShort } from "..";

export interface TogglesButtonProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  /**
   * Modal.Content content
   */
  children: React.ReactNode;
}

export type ToggleButtonsType = React.ForwardRefExoticComponent<
  TogglesButtonProps & React.RefAttributes<HTMLButtonElement>
>;

const TogglesButton: ToggleButtonsType = forwardRef(
  ({ className, children, ...rest }, ref) => (
    <button
      {...rest}
      ref={ref}
      className={cl("navds-toggles__button", className)}
    >
      <BodyShort as="span" className="navds-toggles__button-inner">
        {children}
      </BodyShort>
    </button>
  )
);

export default TogglesButton;

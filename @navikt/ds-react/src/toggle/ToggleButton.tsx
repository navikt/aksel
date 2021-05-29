import React, { forwardRef, HTMLAttributes, useEffect, useState } from "react";
import { Button } from "../index";
import cl from "classnames";

export interface ToggleButtonProps extends HTMLAttributes<HTMLButtonElement> {
  /**
   * Component content
   */
  children: React.ReactNode;
  /**
   * @ignore
   */
  className?: string;
  /**
   *
   */
  active?: boolean;
  /**
   *
   */
  value: string;
  /**
   *
   */
}

const ToggleButton = forwardRef<HTMLButtonElement, ToggleButtonProps>(
  ({ children, className, active, onClick, ...rest }, ref) => {
    const [activeState, setActiveState] = useState(() => active ?? false);

    useEffect(() => {
      active !== undefined && setActiveState(active);
    }, [active]);

    return (
      <button
        ref={ref}
        className={cl("navds-toggle-button", "navds-button", className)}
        aria-pressed={activeState}
        onClick={
          onClick
            ? onClick
            : () => setActiveState((activeState) => !activeState)
        }
        {...rest}
      >
        {children}
      </button>
    );
  }
);

export default ToggleButton;

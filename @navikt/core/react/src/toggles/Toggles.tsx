import cl from "classnames";
import React, { forwardRef, HTMLAttributes } from "react";
import TogglesButton, { ToggleButtonsType } from "./ToggleButton";

export interface TogglesProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

interface TogglesComponent
  extends React.ForwardRefExoticComponent<
    TogglesProps & React.RefAttributes<HTMLDivElement>
  > {
  Button: ToggleButtonsType;
}

const Toggles = forwardRef<HTMLDivElement, TogglesProps>(
  ({ className, children, ...rest }, ref) => {
    return (
      <div ref={ref} className={cl("navds-toggles", className)} {...rest}>
        {children}
      </div>
    );
  }
) as TogglesComponent;

Toggles.Button = TogglesButton;

export default Toggles;

import cl from "classnames";
import React, { forwardRef, HTMLAttributes } from "react";
import TogglesButton, { ToggleButtonsType } from "./ToggleButton";

export interface TogglesProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  size?: "medium" | "small";
}

interface TogglesComponent
  extends React.ForwardRefExoticComponent<
    TogglesProps & React.RefAttributes<HTMLDivElement>
  > {
  Button: ToggleButtonsType;
}

const Toggles = forwardRef<HTMLDivElement, TogglesProps>(
  ({ className, children, size = "medium", ...rest }, ref) => {
    return (
      <div
        ref={ref}
        className={cl("navds-toggles", className, `navds-toggles--${size}`)}
        {...rest}
      >
        {children}
      </div>
    );
  }
) as TogglesComponent;

Toggles.Button = TogglesButton;

export default Toggles;

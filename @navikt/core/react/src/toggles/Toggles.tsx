import cl from "classnames";
import React, { createContext, forwardRef, HTMLAttributes } from "react";
import TogglesButton, { ToggleButtonsType } from "./ToggleButton";

export interface TogglesProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  /**
   * Toggles.Button elements
   */
  children: React.ReactNode;
  /**
   * Changes padding and font-size
   * @default "medium"
   */
  size?: "medium" | "small";
  /**
   * Acitive value
   */
  value: string | string[];
  onChange: (e: string[]) => void;
  /**
   * Allows only a single active element
   */
  exclusive?: boolean;
}

interface TogglesComponent
  extends React.ForwardRefExoticComponent<
    TogglesProps & React.RefAttributes<HTMLDivElement>
  > {
  Button: ToggleButtonsType;
}

interface TogglesContextProps {
  size: string;
  activeValue: string | string[];
  handleChange: (val: string) => void;
}

export const TogglesContext = createContext<TogglesContextProps | null>(null);

const Toggles = forwardRef<HTMLDivElement, TogglesProps>(
  ({ className, children, size = "medium", value, onChange, ...rest }, ref) => {
    const handleChange = (val: string) => {
      onChange([val]);
    };

    console.log(value);
    return (
      <div
        ref={ref}
        className={cl("navds-toggles", className, `navds-toggles--${size}`)}
        role="group"
        {...rest}
      >
        <TogglesContext.Provider
          value={{ size, activeValue: value, handleChange }}
        ></TogglesContext.Provider>
        {children}
      </div>
    );
  }
) as TogglesComponent;

Toggles.Button = TogglesButton;

export default Toggles;

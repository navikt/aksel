import cl from "classnames";
import React, {
  createContext,
  forwardRef,
  HTMLAttributes,
  useState,
} from "react";
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
  value: string[];
  onChange: (e: string[]) => void;
  /**
   * Allows only a single active element
   */
  exclusive?: boolean;
  /**
   * requires atleast one toggle to be active
   */
  required?: boolean;
  /**
   * uses all avalaible space
   */
  fullWidth?: boolean;
}

interface TogglesComponent
  extends React.ForwardRefExoticComponent<
    TogglesProps & React.RefAttributes<HTMLDivElement>
  > {
  Button: ToggleButtonsType;
}

interface TogglesContextProps {
  size: "medium" | "small";
  activeValue: string[];
  handleChange: (val: string) => void;
}

export const TogglesContext = createContext<TogglesContextProps | null>(null);

const Toggles = forwardRef<HTMLDivElement, TogglesProps>(
  (
    {
      className,
      children,
      size = "medium",
      value,
      onChange,
      exclusive,
      required,
      fullWidth,
      ...rest
    },
    ref
  ) => {
    const [state, setState] = useState<string[]>([]);

    const handleChange = (v: string) => {
      const newValue = value ? value : state;
      let newState: string[] = [];

      switch (true) {
        case required && exclusive:
          newState = [v];
          break;
        case required:
          newState =
            newValue.includes(v) && newValue.length === 1
              ? [v]
              : newValue.includes(v)
              ? newValue.filter((x) => x !== v)
              : [...newValue, v];
          break;
        case exclusive:
          newState = newValue.includes(v) ? [] : [v];
          break;
        default:
          newState = newValue.includes(v)
            ? newValue.filter((x) => x !== v)
            : [...newValue, v];
          break;
      }

      value === undefined && setState(newState);
      onChange(newState);
    };

    return (
      <div
        ref={ref}
        className={cl("navds-toggles", className, `navds-toggles--${size}`, {
          "navds-toggles--fullwidth": fullWidth,
        })}
        role="group"
        {...rest}
      >
        <TogglesContext.Provider
          value={{ size, activeValue: value, handleChange: handleChange }}
        >
          {children}
        </TogglesContext.Provider>
      </div>
    );
  }
) as TogglesComponent;

Toggles.Button = TogglesButton;

export default Toggles;

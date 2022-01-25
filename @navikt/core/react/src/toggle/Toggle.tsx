import cl from "classnames";
import React, {
  createContext,
  forwardRef,
  HTMLAttributes,
  useState,
} from "react";
import TogglesButton, { ToggleButtonsType } from "./ToggleButton";

export interface ToggleProps
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
  value?: string[];
  /**
   * DefaultActive version if component should handle state
   */
  defaultValue?: string[];
  /**
   * Returns elements that wants to be active
   */
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
   * @default true
   */
  fullWidth?: boolean;
}

interface ToggleComponent
  extends React.ForwardRefExoticComponent<
    ToggleProps & React.RefAttributes<HTMLDivElement>
  > {
  Button: ToggleButtonsType;
}

interface ToggleContextProps {
  size: "medium" | "small";
  value: string[];
  handleChange: (val: string) => void;
}

export const ToggleContext = createContext<ToggleContextProps | null>(null);

const Toggle = forwardRef<HTMLDivElement, ToggleProps>(
  (
    {
      className,
      children,
      size = "medium",
      value,
      defaultValue,
      onChange,
      exclusive,
      required,
      fullWidth = true,
      ...rest
    },
    ref
  ) => {
    const [state, setState] = useState<string[]>(
      defaultValue ? defaultValue : []
    );

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
        className={cl("navds-toggle", className, `navds-toggle--${size}`, {
          "navds-toggle--fullwidth": fullWidth,
        })}
        role="group"
        {...rest}
      >
        <ToggleContext.Provider
          value={{
            size,
            value: value === undefined ? state : value,
            handleChange: handleChange,
          }}
        >
          {children}
        </ToggleContext.Provider>
      </div>
    );
  }
) as ToggleComponent;

Toggle.Button = TogglesButton;

export default Toggle;

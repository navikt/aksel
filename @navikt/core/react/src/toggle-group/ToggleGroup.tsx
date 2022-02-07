import cl from "classnames";
import React, {
  createContext,
  forwardRef,
  HTMLAttributes,
  useState,
} from "react";
import ToggleItem, { ToggleItemType } from "./ToggleItem";

export interface ToggleGroupProps
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

interface ToggleGroupComponent
  extends React.ForwardRefExoticComponent<
    ToggleGroupProps & React.RefAttributes<HTMLDivElement>
  > {
  Item: ToggleItemType;
}

interface ToggleContextProps {
  size: "medium" | "small";
  value: string[];
  handleChange: (val: string) => void;
}

export const ToggleGroupContext = createContext<ToggleContextProps | null>(
  null
);

const ToggleGroup = forwardRef<HTMLDivElement, ToggleGroupProps>(
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
        <ToggleGroupContext.Provider
          value={{
            size,
            value: value === undefined ? state : value,
            handleChange: handleChange,
          }}
        >
          {children}
        </ToggleGroupContext.Provider>
      </div>
    );
  }
) as ToggleGroupComponent;

ToggleGroup.Item = ToggleItem;

export default ToggleGroup;

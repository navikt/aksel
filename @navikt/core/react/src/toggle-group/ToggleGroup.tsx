import cl from "clsx";
import React, {
  createContext,
  forwardRef,
  HTMLAttributes,
  useState,
} from "react";
import ToggleItem, { ToggleItemType } from "./ToggleItem";
import * as RadixToggleGroup from "@radix-ui/react-toggle-group";
import { Label, useId } from "..";

export interface ToggleGroupProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange" | "dir"> {
  /**
   * Toggles.Item elements
   */
  children: React.ReactNode;
  /**
   * Changes padding and font-size
   * @default "medium"
   */
  size?: "medium" | "small";
  /**
   * Controlled selected value
   */
  value?: string;
  /**
   * If not controlled, a default-value needs to be set
   */
  defaultValue?: string;
  /**
   * Callback for selected toggle
   */
  onChange: (value: string) => void;
  /**
   * Label describing ToggleGroup
   */
  label?: React.ReactNode;
  /**
   * Changes design and interaction-visuals
   * @default "action"
   */
  variant?: "action" | "neutral";
}

interface ToggleGroupComponent
  extends React.ForwardRefExoticComponent<
    ToggleGroupProps & React.RefAttributes<HTMLDivElement>
  > {
  Item: ToggleItemType;
}

interface ToggleContextProps {
  size: "medium" | "small";
}

export const ToggleGroupContext = createContext<ToggleContextProps | null>(
  null
);

export const ToggleGroup = forwardRef<HTMLDivElement, ToggleGroupProps>(
  (
    {
      className,
      children,
      onChange,
      size = "medium",
      label,
      value,
      defaultValue,
      id,
      "aria-describedby": desc,
      variant = "action",
      ...rest
    },
    ref
  ) => {
    const [groupValue, setGroupValue] = useState(defaultValue);
    const labelId = useId();

    const handleValueChange = (v: string) => {
      if (v !== "") {
        setGroupValue(v);
        onChange?.(v);
      }
    };

    if (!value && !defaultValue) {
      console.error("ToggleGroup without value/defaultvalue is not allowed");
    }

    const describeBy = cl({
      [desc ?? ""]: !!desc,
      [labelId ?? ""]: !!label,
    });

    if (!value && !defaultValue) {
      console.error("ToggleGroup needs either a value or defaultValue");
    }

    return (
      <ToggleGroupContext.Provider
        value={{
          size,
        }}
      >
        <div className={cl("navds-toggle-group__wrapper", className)}>
          {label && (
            <Label
              size={size}
              className="navds-toggle-group__label"
              id={labelId}
            >
              {label}
            </Label>
          )}
          <RadixToggleGroup.Root
            {...rest}
            onValueChange={handleValueChange}
            value={value ?? groupValue}
            defaultValue={defaultValue}
            ref={ref}
            className={cl(
              "navds-toggle-group",
              `navds-toggle-group--${size}`,
              `navds-toggle-group--${variant}`
            )}
            {...(describeBy && { "aria-describedby": describeBy })}
            role="radiogroup"
            type="single"
          >
            {children}
          </RadixToggleGroup.Root>
        </div>
      </ToggleGroupContext.Provider>
    );
  }
) as ToggleGroupComponent;

ToggleGroup.Item = ToggleItem;

export default ToggleGroup;

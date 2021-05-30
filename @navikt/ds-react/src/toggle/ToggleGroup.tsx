import React, { forwardRef, HTMLAttributes, useEffect, useState } from "react";
import cl from "classnames";
import ToggleButton, { ToggleButtonProps } from "./ToggleButton";

export interface ToggleGroupProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Component content
   */
  children:
    | React.ReactElement<typeof ToggleButton>
    | React.ReactElement<typeof ToggleButton>[];
  /**
   * @ignore
   */
  className?: string;
  /**
   * active ToggleButton values
   */
  active?: string | string[];
  /**
   * Allow multiple selections
   */
  multiple?: boolean;
  /**
   * Retuns active values of ToggleButtons
   */
  onToggleChange: (value: string[]) => void;
}

const ToggleGroup = forwardRef<HTMLDivElement, ToggleGroupProps>(
  ({ children, className, active, multiple, onToggleChange, ...rest }, ref) => {
    const [activeToggles, setActiveToggles] = useState<string[]>(() =>
      active ? (typeof active === "string" ? [active] : [...active]) : []
    );

    useEffect(() => {
      setActiveToggles(() =>
        active ? (typeof active === "string" ? [active] : [...active]) : []
      );
    }, [active]);

    const handleChange = (value: string) => {
      const index = activeToggles.indexOf(value);
      const newArr = [...activeToggles];
      if (index !== -1) {
        newArr.splice(index, 1);
        onToggleChange([...newArr]);
        !active && setActiveToggles([...newArr]);
      } else {
        if (multiple) {
          onToggleChange([...activeToggles, value]);
          !active && setActiveToggles([...activeToggles, value]);
        } else {
          onToggleChange([value]);
          !active && setActiveToggles([value]);
        }
      }
    };

    return (
      <div
        ref={ref}
        role="group"
        className={cl("navds-toggle-group", className)}
        {...rest}
      >
        {React.Children.toArray(children).map(
          (child: React.ReactElement<ToggleButtonProps>, i) => {
            return React.cloneElement(child, {
              ...child.props,
              onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                child.props.onClick && child.props.onClick(e);
                handleChange(child.props.value);
              },
              active: activeToggles.includes(child.props.value),
            });
          }
        )}
      </div>
    );
  }
);

export default ToggleGroup;

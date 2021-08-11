import React, { createContext, forwardRef, useContext } from "react";
import cl from "classnames";
import { Fieldset, FieldsetProps, FieldsetContext } from "..";

export interface CheckboxGroupState {
  readonly defaultValue: readonly string[];
  readonly value?: readonly string[];
  toggleValue(value: string): void;
}

export const CheckboxGroupContext = createContext<CheckboxGroupState | null>(
  null
);

export interface CheckboxGroupProps extends Omit<FieldsetProps, "onChange"> {
  /**
   * Controlled state for group
   */
  value?: string[];
  /**
   * Default checked checkboxes on render
   */
  defaultValue?: string[];
  /**
   * Returns current checked checkboxes in group
   */
  onChange?: (value: string[]) => void;
}

const CheckboxGroup = forwardRef<HTMLFieldSetElement, CheckboxGroupProps>(
  (
    {
      value,
      defaultValue = [],
      onChange = () => {},
      children,
      className,
      ...rest
    },
    ref
  ) => {
    const state = value ?? [];

    const fieldset = useContext(FieldsetContext);

    return (
      <Fieldset
        {...rest}
        ref={ref}
        className={cl(
          className,
          "navds-checkbox-group",
          `navds-checkbox-group--${rest.size ?? fieldset?.size ?? "m"}`
        )}
      >
        <CheckboxGroupContext.Provider
          value={{
            value,
            defaultValue,
            toggleValue: (value: string) =>
              onChange(
                state.includes(value)
                  ? state.filter((v) => v !== value)
                  : [...state, value]
              ),
          }}
        >
          <div className="navds-checkboxes">{children}</div>
        </CheckboxGroupContext.Provider>
      </Fieldset>
    );
  }
);

export default CheckboxGroup;

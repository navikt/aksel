import React, { createContext, forwardRef, useContext, useState } from "react";
import cl from "classnames";
import { Fieldset, FieldsetProps, FieldsetContext } from "..";

export interface CheckboxGroupState {
  readonly defaultValue?: ReadonlyArray<string | number | boolean>;
  readonly value?: ReadonlyArray<string | number | boolean>;
  toggleValue(value: string | number | boolean): void;
}

export const CheckboxGroupContext = createContext<CheckboxGroupState | null>(
  null
);

export interface CheckboxGroupProps
  extends Omit<
    FieldsetProps,
    "onChange" | "errorPropagation" | "defaultValue"
  > {
  /**
   * Checkboxes
   */
  children: React.ReactNode;
  /**
   * Controlled state for group
   */
  value?: Array<string | number | boolean>;
  /**
   * Default checked checkboxes on render
   */
  defaultValue?: Array<string | number | boolean>;
  /**
   * Returns current checked checkboxes in group
   */
  onChange?: (value: Array<string | number | boolean>) => void;
}

const CheckboxGroup = forwardRef<HTMLFieldSetElement, CheckboxGroupProps>(
  (
    { value, defaultValue, onChange = () => {}, children, className, ...rest },
    ref
  ) => {
    const fieldset = useContext(FieldsetContext);

    const [state, setState] = useState<Array<string | number | boolean>>(
      defaultValue ?? []
    );

    const toggleValue = (v: string | number | boolean) => {
      const newValue = value ?? state;
      const newState = newValue.includes(v)
        ? newValue.filter((x) => x !== v)
        : [...newValue, v];

      value === undefined && setState(newState);
      onChange(newState);
    };

    return (
      <Fieldset
        {...rest}
        ref={ref}
        className={cl(
          className,
          "navds-checkbox-group",
          `navds-checkbox-group--${rest.size ?? fieldset?.size ?? "medium"}`
        )}
      >
        <CheckboxGroupContext.Provider
          value={{
            value,
            defaultValue,
            toggleValue,
          }}
        >
          <div className="navds-checkboxes">{children}</div>
        </CheckboxGroupContext.Provider>
      </Fieldset>
    );
  }
);

export default CheckboxGroup;

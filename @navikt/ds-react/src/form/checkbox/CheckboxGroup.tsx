import React, { createContext } from "react";
import cl from "classnames";
import { forwardRef } from "react";
import { Fieldset, FieldsetProps } from "..";

export interface CheckboxGroupState {
  readonly disabled: boolean;
  readonly defaultValue: readonly string[];
  readonly value?: readonly string[];
  toggleValue(value: string): void;
}

export const CheckboxGroupContext = createContext<CheckboxGroupState | null>(
  null
);

export interface CheckboxGroupProps extends Omit<FieldsetProps, "onChange"> {
  disabled?: boolean;
  value?: string[];
  defaultValue?: string[];
  onChange?: (value: string[]) => void;
}

const CheckboxGroup = forwardRef<HTMLFieldSetElement, CheckboxGroupProps>(
  (
    {
      value,
      defaultValue = [],
      disabled = false,
      onChange = () => {},
      children,
      className,
      ...rest
    },
    ref
  ) => {
    const state = value ?? [];

    return (
      <Fieldset
        {...rest}
        ref={ref}
        className={cl(className, "navds-checkbox-group")}
      >
        <CheckboxGroupContext.Provider
          value={{
            value,
            disabled,
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

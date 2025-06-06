import React, { createContext, forwardRef, useContext, useState } from "react";
import { useRenameCSS } from "../../theme/Theme";
import { Fieldset, FieldsetProps } from "../fieldset";
import { FieldsetContext } from "../fieldset/context";

export interface CheckboxGroupState {
  readonly defaultValue?: readonly any[];
  readonly value?: readonly any[];
  toggleValue(value: any): void;
}

export const CheckboxGroupContext = createContext<CheckboxGroupState | null>(
  null,
);

export interface CheckboxGroupProps
  extends Omit<
    FieldsetProps,
    "onChange" | "errorPropagation" | "defaultValue" | "nativeReadOnly"
  > {
  /**
   * Collection of `<Checkbox/>`.
   */
  children: React.ReactNode;
  /**
   * Controlled state for checkboxes.
   */
  value?: any[];
  /**
   * Default checked checkboxes.
   */
  defaultValue?: any[];
  /**
   * Returns current checked checkboxes in group.
   */
  onChange?: (value: any[]) => void;
}

/**
 * A component that allows users to select one or more options from a list.
 *
 * @see [📝 Documentation](https://aksel.nav.no/komponenter/core/checkbox)
 * @see 🏷️ {@link CheckboxProps}
 *
 * @example
 * ```jsx
 * <CheckboxGroup legend="Transportmiddel">
 *   <Checkbox value="car">Bil</Checkbox>
 *   <Checkbox value="taxi">Drosje</Checkbox>
 *   <Checkbox value="public">Kollektivt</Checkbox>
 * </CheckboxGroup>
 * ```
 */
export const CheckboxGroup = forwardRef<
  HTMLFieldSetElement,
  CheckboxGroupProps
>(
  (
    { value, defaultValue, onChange = () => {}, children, className, ...rest },
    ref,
  ) => {
    const { cn } = useRenameCSS();
    const fieldset = useContext(FieldsetContext);

    const [state, setState] = useState<any[]>(defaultValue ?? []);

    const toggleValue = (v: any) => {
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
        className={cn(
          className,
          "navds-checkbox-group",
          `navds-checkbox-group--${rest.size ?? fieldset?.size ?? "medium"}`,
        )}
        nativeReadOnly={false}
      >
        <CheckboxGroupContext.Provider
          value={{
            value,
            defaultValue,
            toggleValue,
          }}
        >
          <div className={cn("navds-checkboxes")}>{children}</div>
        </CheckboxGroupContext.Provider>
      </Fieldset>
    );
  },
);

export default CheckboxGroup;

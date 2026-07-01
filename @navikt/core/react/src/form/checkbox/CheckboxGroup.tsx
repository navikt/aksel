import React, { forwardRef, useContext, useState } from "react";
import { cl } from "../../utils/helpers";
import { Fieldset, type FieldsetProps } from "../fieldset";
import { FieldsetContext } from "../fieldset/context";
import { CheckboxGroupContext } from "./CheckboxGroup.context";

export interface CheckboxGroupProps extends Omit<
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
      <CheckboxGroupContext.Provider
        value={{
          value,
          defaultValue,
          toggleValue,
        }}
      >
        <Fieldset
          {...rest}
          ref={ref}
          className={cl(
            className,
            "aksel-checkbox-group",
            `aksel-checkbox-group--${rest.size ?? fieldset?.size ?? "medium"}`,
          )}
        >
          <div className="aksel-checkboxes">{children}</div>
        </Fieldset>
      </CheckboxGroupContext.Provider>
    );
  },
);

export default CheckboxGroup;

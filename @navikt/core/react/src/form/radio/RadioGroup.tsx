import React, { forwardRef, useContext } from "react";
import { useId } from "../../utils-external";
import { cl } from "../../utils/helpers";
import { Fieldset, type FieldsetProps } from "../fieldset";
import { FieldsetContext } from "../fieldset/context";
import { RadioGroupContext } from "./RadioGroup.context";

// TODO: Omit "role" in next major
export interface RadioGroupProps extends Omit<
  FieldsetProps,
  "onChange" | "errorPropagation" | "defaultValue" | "nativeReadOnly"
> {
  /**
   * Collection of `<Radio />`-elements
   */
  children: React.ReactNode;
  /**
   * Override internal name
   */
  name?: string;
  /**
   * Default checked Radio
   */
  defaultValue?: any;
  /**
   * Controlled state for Radio
   */
  value?: any;
  /**
   * Returns current checked Radio in group
   */
  onChange?: (value: any) => void;
  /**
   * Tells Fieldset if group is required
   */
  required?: boolean;
}

/**
 * Form radio group
 * @see [📝 Documentation](https://aksel.nav.no/komponenter/core/radio)
 * @see 🏷️ {@link RadioGroupProps}
 * @example
 * <RadioGroup legend="Får du AAP nå?">
 *    <Radio value="ja">Ja</Radio>
 *    <Radio value="Nei">Nei</Radio>
 * </RadioGroup>
 */
export const RadioGroup = forwardRef<HTMLFieldSetElement, RadioGroupProps>(
  (
    {
      children,
      className,
      name,
      defaultValue,
      value,
      onChange = () => {},
      required,
      readOnly,
      ...rest
    },
    ref,
  ) => {
    const fieldset = useContext(FieldsetContext);

    const nameId = useId();

    return (
      <RadioGroupContext.Provider
        value={{
          name: name ?? `radioGroupName-${nameId}`,
          defaultValue,
          value,
          onChange,
          required,
        }}
      >
        <Fieldset
          role="radiogroup"
          {...rest}
          readOnly={readOnly}
          ref={ref}
          className={cl(
            className,
            "aksel-radio-group",
            `aksel-radio-group--${rest.size ?? fieldset?.size ?? "medium"}`,
          )}
        >
          <div className="aksel-radio-buttons">{children}</div>
        </Fieldset>
      </RadioGroupContext.Provider>
    );
  },
);

export default RadioGroup;

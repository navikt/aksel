import React, { forwardRef, useContext } from "react";
import cl from "classnames";
import { Fieldset, FieldsetContext, FieldsetProps } from "..";
import { useId } from "../..";

export interface RadioGroupContextProps {
  name: string;
  defaultValue?: any;
  value?: any;
  onChange: (value: any) => void;
  required?: boolean;
}

export const RadioGroupContext =
  React.createContext<RadioGroupContextProps | null>(null);

export interface RadioGroupProps
  extends Omit<
    FieldsetProps,
    "onChange" | "errorPropagation" | "defaultValue"
  > {
  /**
   * Collection of <Radio />-elements
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
      ...rest
    },
    ref
  ) => {
    const fieldset = useContext(FieldsetContext);

    const nameId = useId();

    return (
      <Fieldset
        {...rest}
        ref={ref}
        className={cl(
          className,
          "navds-radio-group",
          `navds-radio-group--${rest.size ?? fieldset?.size ?? "medium"}`
        )}
      >
        <RadioGroupContext.Provider
          value={{
            name: name ?? `radioGroupName-${nameId}`,
            defaultValue,
            value,
            onChange,
            required,
          }}
        >
          <div className="navds-radio-buttons">{children}</div>
        </RadioGroupContext.Provider>
      </Fieldset>
    );
  }
);

export default RadioGroup;

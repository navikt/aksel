import React, { forwardRef, useContext } from "react";
import cl from "classnames";
import { Fieldset, FieldsetContext, FieldsetProps } from "..";
import { useId } from "../..";

export interface RadioGroupContextProps {
  name: string;
  defaultValue?: string;
  value?: string;
  onChange: (value: string) => void;
  required?: boolean;
}

export const RadioGroupContext = React.createContext<RadioGroupContextProps | null>(
  null
);

export interface RadioGroupProps extends Omit<FieldsetProps, "onChange"> {
  /**
   * Collection of <Radio>-elements
   */
  children: React.ReactNode;
  /**
   * Override internal name
   */
  name?: string;
  /**
   * Default checked radiobutton
   */
  defaultValue?: string;
  /**
   * Controlled state for Radiobutton
   */
  value?: string;
  /**
   * Returns current checked radiobutton in group
   */
  onChange?: (value: string) => void;
  /**
   * Tells Fieldset if group is required
   */
  required?: boolean;
}

const RadioGroup = forwardRef<HTMLFieldSetElement, RadioGroupProps>(
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
          `navds-radio-group--${rest.size ?? fieldset?.size ?? "m"}`
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

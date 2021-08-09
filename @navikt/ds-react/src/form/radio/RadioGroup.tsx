import React, { forwardRef, useContext } from "react";
import cl from "classnames";
import { FieldsetProps } from "..";
import { Fieldset, FieldsetContext } from "../fieldset";
import useId from "../useId";

export interface RadioGroupContextProps {
  name: string;
  defaultValue?: string;
  value?: string;
  onChange: (value: string) => void;
  required: boolean;
  autoFocus?: boolean;
}

export const RadioGroupContext = React.createContext<RadioGroupContextProps | null>(
  null
);

export interface RadioGroupProps extends Omit<FieldsetProps, "onChange"> {
  name?: string;
  defaultValue?: string;
  value?: string;
  onChange?: (value: string) => void;
  required?: boolean;
  autoFocus?: boolean;
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
      required = false,
      autoFocus,
      ...rest
    },
    ref
  ) => {
    const fieldset = useContext(FieldsetContext);

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
            name: useId({ id: name, prefix: "RadioGroupName" }),
            defaultValue,
            value,
            onChange,
            required,
            autoFocus,
          }}
        >
          <div className="navds-radio-buttons">{children}</div>
        </RadioGroupContext.Provider>
      </Fieldset>
    );
  }
);

export default RadioGroup;

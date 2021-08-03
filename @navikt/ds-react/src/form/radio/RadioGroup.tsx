import React, { forwardRef } from "react";
import cl from "classnames";
import { FieldsetProps } from "..";
import Fieldset from "../Fieldset";
import useId from "../useId";

export interface RadioGroupContextProps {
  name: string;
  defaultValue?: string;
  value?: string;
  onChange: (value: string) => void;
  required: boolean;
  autoFocus?: boolean;
  readonly disabled?: boolean;
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
  disabled?: boolean;
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
      disabled = false,
      ...rest
    },
    ref
  ) => {
    return (
      <Fieldset
        {...rest}
        ref={ref}
        className={cl(className, "navds-radio-group")}
      >
        <RadioGroupContext.Provider
          value={{
            name: useId({ id: name, prefix: "RadioGroupName" }),
            defaultValue,
            value,
            onChange,
            required,
            autoFocus,
            disabled,
          }}
        >
          <div className="navds-radio-buttons">{children}</div>
        </RadioGroupContext.Provider>
      </Fieldset>
    );
  }
);

export default RadioGroup;

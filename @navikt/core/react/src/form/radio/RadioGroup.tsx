import React, { forwardRef, useContext } from "react";
import { useRenameCSS } from "../../theme/Theme";
import { useId } from "../../util/hooks";
import { Fieldset, FieldsetProps } from "../fieldset";
import { FieldsetContext } from "../fieldset/context";

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
    const { cn } = useRenameCSS();
    const fieldset = useContext(FieldsetContext);

    const nameId = useId();

    return (
      <Fieldset
        {...rest}
        readOnly={readOnly}
        ref={ref}
        className={cn(
          className,
          "navds-radio-group",
          `navds-radio-group--${rest.size ?? fieldset?.size ?? "medium"}`,
        )}
        nativeReadOnly={false}
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
          <div className={cn("navds-radio-buttons")}>{children}</div>
        </RadioGroupContext.Provider>
      </Fieldset>
    );
  },
);

export default RadioGroup;

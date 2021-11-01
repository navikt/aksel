import { useContext } from "react";
import { CheckboxProps } from "../..";
import { useFormField } from "../useFormField";
import { CheckboxGroupContext } from "./CheckboxGroup";

/**
 * Handles props for Checkboxes in context with Fieldset and CheckboxGroup
 */
const useCheckbox = ({ children, ...props }: CheckboxProps) => {
  const checkboxGroup = useContext(CheckboxGroupContext);

  const { inputProps, ...rest } = useFormField(props, "checkbox");

  if (checkboxGroup) {
    if (props.checked) {
      console.warn(
        "`checked` is unsupported on <Checkbox> elements within a <CheckboxGroup>. Please set a `value` or `defaultValue` on <CheckboxGroup> instead."
      );
    }
    if (props.value === undefined) {
      console.warn(
        "A <Checkbox> element within a <CheckboxGroup> requires a `value` property."
      );
    }
  }

  return {
    ...rest,
    inputProps: {
      ...inputProps,
      type: "checkbox",
      checked: checkboxGroup?.value
        ? checkboxGroup.value.includes(props.value as string)
        : props.checked,
      defaultChecked: checkboxGroup?.defaultValue
        ? checkboxGroup.defaultValue.includes(props.value as string)
        : props.defaultChecked,
      onChange: (e) => {
        props.onChange && props.onChange(e);
        checkboxGroup && checkboxGroup.toggleValue(props.value as string);
      },
    },
  };
};

export default useCheckbox;

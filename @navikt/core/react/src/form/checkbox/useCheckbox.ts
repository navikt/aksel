import { useContext } from "react";
import { CheckboxProps } from "../..";
import { useFormField } from "../useFormField";
import { CheckboxGroupContext } from "./CheckboxGroup";
import { omit } from "../..";

/**
 * Handles props for Checkboxes in context with Fieldset and CheckboxGroup
 */
const useCheckbox = ({ children, ...props }: CheckboxProps) => {
  const checkboxGroup = useContext(CheckboxGroupContext);

  const { inputProps, ...rest } = useFormField(
    omit(props, ["description"]),
    "checkbox"
  );

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
      checked: checkboxGroup?.value
        ? checkboxGroup.value.includes(props.value)
        : props.checked,
      defaultChecked: checkboxGroup?.defaultValue
        ? checkboxGroup.defaultValue.includes(props.value)
        : props.defaultChecked,
      onChange: (e) => {
        props.onChange && props.onChange(e);
        checkboxGroup && checkboxGroup.toggleValue(props.value);
      },
    },
  };
};

export default useCheckbox;

import { useContext } from "react";
import { CheckboxProps, omit } from "../../index";
import { useFormField } from "../useFormField";
import { CheckboxGroupContext } from "./CheckboxGroup";

const useCheckbox = ({ children, ...props }: CheckboxProps) => {
  const checkboxGroup = useContext(CheckboxGroupContext);

  const { inputProps, ...rest } = useFormField(props, "checkbox");

  if (checkboxGroup) {
    if (props.checked) {
      console.warn(
        "`checked` is unsupported on <Checkbox> elements within a <CheckboxGroup>. Please set a `value` or `defaultValue` on <CheckboxGroup> instead."
      );
    }
    if (props.value === null) {
      console.warn(
        "A <Checkbox> element within a <CheckboxGroup> requires a `value` property."
      );
    }
  }

  return {
    ...rest,
    inputProps: {
      ...omit(props, [
        "children",
        "size",
        "error",
        "errorId",
        "className",
        "description",
      ]),
      ...inputProps,
      type: "checkbox",
      checked: checkboxGroup?.value
        ? checkboxGroup.value.includes(props.value as string)
        : props.checked,
      defaultChecked: checkboxGroup
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

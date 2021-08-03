import { useContext } from "react";
import { CheckboxProps, FieldsetContext } from "../../index";
import useId from "../useId";
import { CheckboxGroupContext } from "./CheckboxGroup";

const useCheckbox = ({ children, size, ...props }: CheckboxProps) => {
  const groupState = useContext(CheckboxGroupContext);

  const { error: fieldsetError, errorId: fieldsetErrorId } = useContext(
    FieldsetContext
  );

  const id = useId({ id: props.id, prefix: "Checkbox" });
  const errorId = useId({ id: props.errorId, prefix: "CheckboxError" });

  if (groupState) {
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
    errorId,
    showErrorMsg:
      (groupState?.disabled || props.disabled) && props.error && !fieldsetError,
    inputProps: {
      ...props,
      id,
      type: "checkbox",
      "aria-invalid": !props.disabled && !!(props.error || fieldsetError),
      "aria-describedby":
        !props.disabled && (props.error || fieldsetError)
          ? props.error
            ? props.errorId
              ? props.errorId
              : errorId
            : fieldsetErrorId
          : undefined,
      disabled: groupState?.disabled || props.disabled,
      checked: groupState?.value
        ? groupState.value.includes(props.value as string)
        : props.checked,
      defaultChecked: groupState
        ? groupState.defaultValue.includes(props.value as string)
        : props.defaultChecked,
      onChange: (e) => {
        props.onChange && props.onChange(e);
        groupState && groupState.toggleValue(props.value as string);
      },
    },
  };
};

export default useCheckbox;

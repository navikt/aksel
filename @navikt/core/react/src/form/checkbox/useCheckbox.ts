import { useContext } from "react";
import { omit } from "../../utils-external";
import { consoleWarning } from "../../utils/helpers/consoleWarning";
import { useFormField } from "../useFormField";
import { CheckboxGroupContext } from "./CheckboxGroup.context";
import type { CheckboxProps } from "./types";

/**
 * Handles props for Checkboxes in context with Fieldset and CheckboxGroup
 */
const useCheckbox = (props: CheckboxProps) => {
  const checkboxGroup = useContext(CheckboxGroupContext);

  const { inputProps, readOnly, ...rest } = useFormField(
    omit(props, ["description", "children"]),
    "checkbox",
  );

  if (checkboxGroup) {
    if (props.checked) {
      consoleWarning(
        "`checked` is unsupported on <Checkbox> elements within a <CheckboxGroup>. Please set a `value` or `defaultValue` on <CheckboxGroup> instead.",
      );
    }
    if (props.value === undefined) {
      consoleWarning(
        "A <Checkbox> element within a <CheckboxGroup> requires a `value` property.",
      );
    }
  }

  return {
    ...rest,
    readOnly,
    nested: !!checkboxGroup,
    inputProps: {
      ...inputProps,
      checked: checkboxGroup?.value
        ? checkboxGroup.value.includes(props.value)
        : props.checked,
      defaultChecked: checkboxGroup?.defaultValue
        ? checkboxGroup.defaultValue.includes(props.value)
        : props.defaultChecked,
      onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        if (readOnly) {
          return;
        }
        props.onChange?.(event);
        checkboxGroup?.toggleValue(props.value);
      },
      onClick: (event: React.MouseEvent<HTMLInputElement>) => {
        if (readOnly) {
          event.preventDefault();
          return;
        }
        props?.onClick?.(event);
      },
    },
  };
};

export default useCheckbox;

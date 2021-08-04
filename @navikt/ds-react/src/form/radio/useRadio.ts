import { useContext } from "react";
import { FieldsetContext } from "..";
import useId from "../useId";
import { RadioProps } from "./Radio";
import { RadioGroupContext } from "./RadioGroup";

export const useRadio = (props: RadioProps) => {
  const radioGroup = useContext(RadioGroupContext);
  const { error: fieldsetError, errorId: fieldsetErrorId, size } = useContext(
    FieldsetContext
  );

  if (!radioGroup) {
    console.warn("<Radio> must be used inside <RadioGroup>.");
  }

  const id = useId({ id: props.id, prefix: "Radio" });
  const errorId = useId({ id: props.errorId, prefix: "RadioError" });
  const disabled = radioGroup?.disabled || props.disabled;
  return {
    inputProps: {
      name: radioGroup?.name,
      checked:
        (radioGroup?.value ?? radioGroup?.defaultValue) === props.value
          ? true
          : undefined,
      onChange: (e) => {
        props.onChange && props.onChange(e);
        radioGroup?.onChange && radioGroup.onChange(props.value);
      },
      required: radioGroup?.required || props.required,
      id: id,
      "aria-invalid": !props.disabled && !!(props.error || fieldsetError),
      "aria-describedby":
        !props.disabled && (props.error || fieldsetError)
          ? props.error
            ? props.errorId
              ? props.errorId
              : errorId
            : fieldsetErrorId
          : undefined,
      type: "radio",
      disabled: radioGroup?.disabled || props.disabled,
    },
    _errorId: errorId,
    showErrorStyle: disabled && (props.error || fieldsetError),
    showErrorMsg: disabled && props.error && !fieldsetError,
    _size: props.size ? props.size : size ?? "m",
  };
};

import { useContext } from "react";
import { FieldsetContext } from "..";
import { omit } from "../..";
import { useFormField } from "../useFormField";
import useId from "../useId";
import { RadioProps } from "./Radio";
import { RadioGroupContext } from "./RadioGroup";

export const useRadio = (props: RadioProps) => {
  const radioGroup = useContext(RadioGroupContext);
  /* const { error: fieldsetError, errorId: fieldsetErrorId, size } = useContext(
    FieldsetContext
  ); */

  const { inputProps, ...rest } = useFormField(props, "radio");

  if (!radioGroup) {
    console.warn("<Radio> must be used inside <RadioGroup>.");
  }

  return {
    ...rest,
    inputProps: {
      ...omit(props, ["size", "error", "errorId", "className"]),
      ...inputProps,
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
      type: "radio",
    },
  };
};

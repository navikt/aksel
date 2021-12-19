import { useContext } from "react";
import { useFormField } from "../useFormField";
import { RadioProps } from "./Radio";
import { RadioGroupContext } from "./RadioGroup";
import { omit } from "../..";

/**
 * Handles props for Radios in context with Fieldset and RadioGroup
 */
export const useRadio = (props: RadioProps) => {
  const radioGroup = useContext(RadioGroupContext);

  const { inputProps, ...rest } = useFormField(
    omit(props, ["description"]),
    "radio"
  );

  if (!radioGroup) {
    console.warn("<Radio> must be used inside <RadioGroup>.");
  }

  if (props?.required !== undefined) {
    console.warn("required is only supported on <RadioGroup>.");
  }

  return {
    ...rest,
    inputProps: {
      ...inputProps,
      name: radioGroup?.name,
      defaultChecked:
        radioGroup?.defaultValue === undefined
          ? undefined
          : radioGroup?.defaultValue === props.value,
      checked:
        radioGroup?.value === undefined
          ? undefined
          : radioGroup?.value === props.value,
      onChange: (e) => {
        props.onChange && props.onChange(e);
        radioGroup?.onChange && radioGroup.onChange(props.value);
      },
      required: radioGroup?.required,
      type: "radio",
    },
  };
};

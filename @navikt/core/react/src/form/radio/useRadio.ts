import { useContext } from "react";
import { omit } from "../../util";
import { useFormField } from "../useFormField";
import { RadioGroupContext } from "./RadioGroup";
import { RadioProps } from "./types";

/**
 * Handles props for Radios in context with Fieldset and RadioGroup
 */
export const useRadio = (props: RadioProps) => {
  const radioGroup = useContext(RadioGroupContext);

  const { inputProps, readOnly, ...rest } = useFormField(
    omit(props, ["description"]),
    "radio",
  );

  if (!radioGroup) {
    console.warn("<Radio> must be used inside <RadioGroup>.");
  }

  if (props?.required !== undefined) {
    console.warn("required is only supported on <RadioGroup>.");
  }

  return {
    ...rest,
    readOnly,
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
      onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        if (readOnly) {
          return;
        }
        props.onChange?.(event);
        radioGroup?.onChange?.(props.value);
      },
      onClick: (event: React.MouseEvent<HTMLInputElement>) => {
        if (readOnly) {
          event.preventDefault();
          return;
        }
        props?.onClick?.(event);
      },
      required: radioGroup?.required,
      type: "radio",
    },
  };
};

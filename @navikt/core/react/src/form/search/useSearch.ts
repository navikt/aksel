import cl from "classnames";
import { useContext } from "react";
import { useId } from "../../index";
import { FieldsetContext } from "../index";
import { FormFieldProps } from "../useFormField";

export const useSearch = (props: FormFieldProps, prefix: string) => {
  const { size } = props;

  const fieldset = useContext(FieldsetContext);

  const genId = useId();

  const id = props.id ?? `${prefix}-${genId}`;
  const inputDescriptionId = `${prefix}-description-${genId}`;

  const disabled = fieldset?.disabled || props.disabled;

  return {
    inputDescriptionId,
    size: size ?? fieldset?.size ?? "medium",
    inputProps: {
      id,
      "aria-describedby":
        cl(props["aria-describedby"], {
          [inputDescriptionId]: !!props?.description,
        }) || undefined,
      disabled,
    },
  };
};

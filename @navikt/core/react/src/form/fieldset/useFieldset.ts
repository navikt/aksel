import cl from "clsx";
import { type FormFieldProps, useFormField } from "../useFormField";

/**
 * Handles props for Fieldset in context with parent Fieldset.
 */
export const useFieldset = (props: FormFieldProps) => {
  const formField = useFormField(props, "fieldset");

  return {
    ...formField,
    inputProps: {
      "aria-describedby":
        cl(props["aria-describedby"], {
          [formField.inputDescriptionId]:
            props.description && typeof props.description === "string",
        }) || undefined,
    },
  };
};

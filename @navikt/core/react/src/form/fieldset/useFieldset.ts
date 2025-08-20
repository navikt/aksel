import cl from "clsx";
import {
  type FormFieldProps,
  containsReadMore,
  useFormField,
} from "../useFormField";

/**
 * Handles props for Fieldset in context with parent Fieldset.
 */
export const useFieldset = (props: FormFieldProps) => {
  const formField = useFormField(props, "fieldset");

  return {
    ...formField,
    inputProps: {
      // We don't include errorId here, because it will be included on each radio/checkbox inside.
      "aria-describedby":
        cl(props["aria-describedby"], {
          [formField.inputDescriptionId]:
            props.description && !containsReadMore(props.description),
        }) || undefined,
    },
  };
};

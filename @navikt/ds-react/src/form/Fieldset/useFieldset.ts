import { useFormField } from "../useFormField";

/**
 * Handles props for Fieldset in context with parent Fieldset.
 */
export const useFieldset = (props) => {
  const formField = useFormField(props, "fieldset");
  const { inputProps } = formField;

  return {
    ...formField,
    inputProps: {
      "aria-invalid": inputProps["aria-invalid"],
      "aria-describedby": inputProps["aria-describedby"],
    },
  };
};

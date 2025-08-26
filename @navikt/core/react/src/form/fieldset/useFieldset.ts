import cl from "clsx";
import {
  type FormFieldProps,
  containsReadMore,
  useFormField,
} from "../useFormField";

/**
 * Handles props for Fieldset in context with parent Fieldset.
 */
export const useFieldset = (props: FormFieldProps, legendId: string) => {
  const formField = useFormField(props, "fieldset");

  return {
    ...formField,
    inputProps: {
      // Having both legend and description in labelledby seems to work best, ref. https://mortentollefsen.no/demo/radio-description.html
      "aria-labelledby":
        props["aria-labelledby"] ||
        cl(legendId, {
          [formField.inputDescriptionId]:
            props.description && !containsReadMore(props.description),
        }),
      // We don't include errorId in labelledby/describedby on the fieldset, because it will be included on each input inside.
    },
  };
};

import { useContext } from "react";
import { cl } from "../../utils/helpers";
import { CheckboxGroupContext } from "../checkbox/CheckboxGroup.context";
import { RadioGroupContext } from "../radio/RadioGroup.context";
import { containsReadMore, useFormField } from "../useFormField";
import type { FieldsetProps } from "./Fieldset";

/**
 * Handles props for Fieldset in context with parent Fieldset.
 */
export const useFieldset = (props: FieldsetProps, legendId: string) => {
  const formField = useFormField(props, "fieldset");
  const checkboxGroupContext = useContext(CheckboxGroupContext);
  const radioGroupContext = useContext(RadioGroupContext);

  return {
    ...formField,
    readOnlyIconNeedsTitle: !checkboxGroupContext && !radioGroupContext,
    inputProps: {
      ...(checkboxGroupContext || radioGroupContext
        ? { "aria-invalid": formField.inputProps["aria-invalid"] }
        : {}),

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

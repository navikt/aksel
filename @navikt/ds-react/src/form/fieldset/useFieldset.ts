import cl from "classnames";
import { useContext } from "react";
import { FieldsetContext } from "./index";
import { useFormField } from "../useFormField";

/**
 * Handles props for Fieldset in context with parent Fieldset.
 */
export const useFieldset = (props) => {
  const formField = useFormField(props, "fieldset");
  const { errorId, inputProps, showErrorMsg } = formField;
  const fieldset = useContext(FieldsetContext);

  const errorDescribedBy: string = cl(fieldset?.errorDescribedBy, {
    [errorId]: showErrorMsg,
  });

  return {
    ...formField,
    errorDescribedBy,
    inputProps: {
      "aria-invalid": inputProps["aria-invalid"],
      "aria-describedby": cl(inputProps["aria-describedby"], errorDescribedBy),
    },
  };
};

import cl from "classnames";
import { useContext } from "react";
import { FieldsetContext } from ".";
import useId from "./useId";

export const useFormField = (props: any, prefix?: string) => {
  const { size, error, errorId: propErrorId } = props;

  const fieldset = useContext(FieldsetContext);

  const id = useId({ id: props.id, prefix: prefix ?? "" });
  const errorId = useId({ id: propErrorId, prefix: prefix + "Error" ?? "" });

  const disabled = fieldset?.disabled || props.disabled;
  const hasError = !disabled && (error || fieldset?.error);
  const renderError = !!error && typeof error !== "boolean";

  const newProps = {
    showErrorMsg: !disabled && renderError,
    hasError,
    errorId: errorId,
    size: size ? size : fieldset?.size ?? "m",
    disabled,
    inputProps: {
      id,
      "aria-invalid": hasError,
      "aria-describedby": hasError
        ? cl({
            [errorId]: renderError,
            [fieldset?.errorId || ""]:
              !!fieldset?.error && typeof fieldset?.error !== "boolean",
          })
        : undefined,
    },
  };

  return newProps;
};

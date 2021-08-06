import cl from "classnames";
import { useContext } from "react";
import { FieldsetContext } from ".";
import useId from "./useId";

export interface GenericFormProps {
  error?: React.ReactNode;
  errorId?: string;
  size?: "m" | "s";
  disabled?: boolean;
  description?: React.ReactNode;
  id?: string;
}

export const useFormField = (props: GenericFormProps, prefix?: string) => {
  const { size, error, errorId: propErrorId } = props;

  const fieldset = useContext(FieldsetContext);

  const id = useId({ id: props.id, prefix: prefix ?? "" });
  const errorId = useId({ id: propErrorId, prefix: prefix + "Error" ?? "" });
  const inputDescriptionId = useId({ prefix: prefix + "Description" });

  const disabled = fieldset?.disabled || props.disabled;
  const hasError: boolean = !disabled && !!(error || fieldset?.error);
  const renderError = !!error && typeof error !== "boolean";

  const describedBy: string = cl({
    [errorId]: renderError,
    [fieldset?.errorId || ""]:
      !!fieldset?.error && typeof fieldset?.error !== "boolean",
    [inputDescriptionId]: !!props?.description,
  });

  const newProps = {
    showErrorMsg: !disabled && renderError,
    hasError,
    errorId: errorId,
    inputDescriptionId,
    size: size ? size : fieldset?.size ?? "m",
    inputProps: {
      id,
      "aria-invalid": hasError,
      "aria-describedby": describedBy || undefined,
      disabled,
    },
  };

  return newProps;
};

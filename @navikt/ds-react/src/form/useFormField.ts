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

  const errorDescribedBy: string = cl(fieldset?.errorDescribedBy, {
    [errorId]: renderError,
  });

  const newProps = {
    showErrorMsg: !disabled && renderError,
    hasError,
    errorId,
    fieldsetErrorId: fieldset?.errorId,
    fieldsetError: fieldset?.error,
    inputDescriptionId,
    size: size ? size : fieldset?.size ?? "m",
    errorDescribedBy,
    inputProps: {
      id,
      "aria-invalid": hasError,
      "aria-describedby":
        cl(errorDescribedBy, {
          [inputDescriptionId]: !!props?.description,
        }) || undefined,
      disabled,
    },
  };

  return newProps;
};

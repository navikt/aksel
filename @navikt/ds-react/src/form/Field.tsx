import React, { useContext } from "react";
import cl from "classnames";
import Label from "./Label";
import Description from "./Description";
import ErrorMessage from "./ErrorMessage";
import { FieldsetContext } from "..";
import useId from "./useId";

export interface FieldProps extends React.HTMLAttributes<HTMLElement> {
  size?: "m" | "s";
  label?: React.ReactNode;
  description?: React.ReactNode;
  error?: string;
  errorId?: string;
  disabled?: boolean;

  children(props: any): React.ReactNode;
}

const Field = ({
  children,
  label,
  description,
  error,
  errorId: _errorId,
  ...props
}: FieldProps) => {
  const context = useContext(FieldsetContext);

  const id = useId({ id: props.id, prefix: "Field" });
  const errorId = useId({ id: _errorId, prefix: "FieldError" });
  const descriptionId = useId({ prefix: "FieldDescription" });

  const size = props.size ?? context?.size ?? "m";
  const hasError = !props.disabled && !!(error || context?.error);

  return (
    <div
      className={cl("navds-field", {
        "navds-field--error": hasError,
      })}
    >
      {label && (
        <Label htmlFor={id} size={size}>
          {label}
        </Label>
      )}
      {description && (
        <Description id={descriptionId} size={size}>
          {description}
        </Description>
      )}
      {children({
        ...props,
        id,
        size,
        "aria-invalid": hasError,
        "aria-describedby": cl({
          [descriptionId]: description,
          [context?.errorId ?? errorId]: hasError,
        }),
      })}
      <div id={errorId} aria-relevant="additions removals" aria-live="polite">
        {hasError && !context?.error && (
          <ErrorMessage size={size}>{error}</ErrorMessage>
        )}
      </div>
    </div>
  );
};

export default Field;

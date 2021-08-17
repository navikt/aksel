import cl from "classnames";
import React, { forwardRef } from "react";
import { BodyShort, Label } from "../..";
import ErrorMessage from "../ErrorMessage";
import { FormFieldProps, useFormField } from "../useFormField";

export interface SearchFieldContextProps {
  id: string;
  "aria-invalid": boolean;
  "aria-describedby"?: string;
  disabled?: boolean;
}

export const SearchFieldContext = React.createContext<SearchFieldContextProps | null>(
  null
);

export interface SearchFieldProps
  extends FormFieldProps,
    React.HTMLAttributes<HTMLDivElement> {
  /**
   * SearchFieldInput & SearchFieldButton
   */
  children: React.ReactNode;
  /**
   * If enabled shows the label and description for screenreaders only
   */
  hideLabel?: boolean;
  /**
   * SearchField label
   */
  label: React.ReactNode;
}

const SearchField = forwardRef<HTMLDivElement, SearchFieldProps>(
  (props, ref) => {
    const {
      inputProps,
      errorId,
      showErrorMsg,
      hasError,
      size,
      inputDescriptionId,
    } = useFormField(props, "searchfield");

    return (
      <div
        ref={ref}
        className={cl(
          props?.className,
          "navds-search-field",
          `navds-search-field--${size ?? "m"}`,
          { "navds-search-field--error": hasError }
        )}
      >
        <Label
          htmlFor={inputProps.id}
          size={size}
          component="label"
          className={cl("navds-text-field__label", {
            "sr-only": props?.hideLabel,
          })}
        >
          {props?.label}
        </Label>

        {!!props.description && (
          <BodyShort
            className={cl("navds-text-field__description", {
              "sr-only": props?.hideLabel,
            })}
            id={inputDescriptionId}
            size={size}
          >
            {props?.description}
          </BodyShort>
        )}
        <SearchFieldContext.Provider
          value={{
            ...inputProps,
          }}
        >
          {props.children}
        </SearchFieldContext.Provider>
        <div id={errorId} aria-relevant="additions removals" aria-live="polite">
          {showErrorMsg && (
            <ErrorMessage size={size}>{props.error}</ErrorMessage>
          )}
        </div>
      </div>
    );
  }
);

export default SearchField;

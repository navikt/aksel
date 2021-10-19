import cl from "classnames";
import React, { forwardRef } from "react";
import { BodyShort, Label, omit } from "../..";
import ErrorMessage from "../ErrorMessage";
import { FormFieldProps, useFormField } from "../useFormField";
import SearchFieldButton, { SearchFieldButtonType } from "./SearchFieldButton";
import SearchFieldClearButton, {
  SearchFieldClearButtonType,
} from "./SearchFieldClearButton";
import SearchFieldInput, { SearchFieldInputType } from "./SearchFieldInput";

export interface SearchFieldContextProps {
  inputProps: {
    id: string;
    "aria-invalid": boolean;
    "aria-describedby"?: string;
    disabled?: boolean;
  };
  size?: "medium" | "small";
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

interface SearchFieldComponent
  extends React.ForwardRefExoticComponent<
    SearchFieldProps & React.RefAttributes<HTMLDivElement>
  > {
  Button: SearchFieldButtonType;
  Clear: SearchFieldClearButtonType;
  Input: SearchFieldInputType;
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

    const {
      className,
      hideLabel,
      children,
      label,
      description,
      error,
      ...rest
    } = props;

    return (
      <div
        ref={ref}
        {...omit(rest, ["id", "error", "errorId", "size", "disabled"])}
        className={cl(
          className,
          "navds-form-field",
          `navds-form-field--${size ?? "medium"}`,
          "navds-search-field",
          { "navds-search-field--error": hasError }
        )}
      >
        <Label
          htmlFor={inputProps.id}
          size={size}
          as="label"
          className={cl("navds-text-field__label", {
            "sr-only": hideLabel,
          })}
        >
          {label}
        </Label>
        {!!description && (
          <BodyShort
            className={cl("navds-text-field__description", {
              "sr-only": hideLabel,
            })}
            id={inputDescriptionId}
            size={size}
          >
            {description}
          </BodyShort>
        )}
        <div className="navds-search-field__input-wrapper">
          <SearchFieldContext.Provider
            value={{
              inputProps,
              size,
            }}
          >
            {children}
          </SearchFieldContext.Provider>
        </div>
        <div id={errorId} aria-relevant="additions removals" aria-live="polite">
          {showErrorMsg && <ErrorMessage size={size}>{error}</ErrorMessage>}
        </div>
      </div>
    );
  }
) as SearchFieldComponent;

SearchField.Button = SearchFieldButton;
SearchField.Clear = SearchFieldClearButton;
SearchField.Input = SearchFieldInput;

export default SearchField;

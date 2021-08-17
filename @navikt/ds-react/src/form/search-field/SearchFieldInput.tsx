import React, { forwardRef, InputHTMLAttributes, useContext } from "react";
import cl from "classnames";
import { SearchFieldContext } from "./SearchField";

export interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {}

const SearchFieldInput = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ className, ...rest }, ref) => {
    const searchField = useContext(SearchFieldContext);

    if (searchField === null) {
      console.warn("SearchFieldInput has to be wrapped in <SearchField />");
      return null;
    }
    const { hasError, size, ...inputProps } = searchField;

    return (
      <div
        className={cl(className, {
          "navds-search-field--error": !!hasError,
        })}
      >
        <input
          {...rest}
          {...inputProps}
          ref={ref}
          type="text"
          className={cl(
            className,
            "navds-search-field__input",
            "navds-body-short",
            `navds-body-${size ?? "m"}`
          )}
        />
      </div>
    );
  }
);

export default SearchFieldInput;

import React, { forwardRef, InputHTMLAttributes, useContext } from "react";
import cl from "classnames";
import { SearchFieldContext } from "./SearchField";

export interface SearchFieldInputProps
  extends InputHTMLAttributes<HTMLInputElement> {}

const SearchFieldInput = forwardRef<HTMLInputElement, SearchFieldInputProps>(
  ({ className, ...rest }, ref) => {
    const searchField = useContext(SearchFieldContext);

    if (searchField === null) {
      console.warn("SearchFieldInput has to be wrapped in <SearchField />");
      return null;
    }

    const { size, inputProps } = searchField;

    return (
      <input
        {...rest}
        {...inputProps}
        ref={ref}
        type="text"
        className={cl(
          className,
          "navds-search-field__input",
          "navds-text-field__input",
          "navds-body-short",
          `navds-body-${size ?? "m"}`
        )}
      />
    );
  }
);

export default SearchFieldInput;

import React, { forwardRef, InputHTMLAttributes, useContext } from "react";
import cl from "classnames";
import { SearchFieldContext } from "./SearchField";

export interface SearchFieldInputProps
  extends InputHTMLAttributes<HTMLInputElement> {}

export type SearchFieldInputType = React.ForwardRefExoticComponent<
  SearchFieldInputProps & React.RefAttributes<HTMLInputElement>
>;

const SearchFieldInput: SearchFieldInputType = forwardRef(
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
        type="search"
        role="searchbox"
        ref={ref}
        className={cl(
          className,
          "navds-search-field__input",
          "navds-text-field__input",
          "navds-body-short",
          `navds-body-${size ?? "medium"}`
        )}
      />
    );
  }
);

export default SearchFieldInput;

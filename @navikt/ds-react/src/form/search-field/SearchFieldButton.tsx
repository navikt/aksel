import React, { forwardRef, InputHTMLAttributes, useContext } from "react";
import cl from "classnames";
import { SearchFieldContext } from "./SearchField";
import { Button, ButtonProps } from "../..";

export interface SearchFieldButtonProps extends ButtonProps {
  /**
   * Changes design and interactions
   * @default "action"
   */
  variant?: "primary" | "secondary" | "action" | "danger";
}

const SearchFieldButton = forwardRef<HTMLButtonElement, SearchFieldButtonProps>(
  ({ className, variant = "action", disabled, ...rest }, ref) => {
    const searchField = useContext(SearchFieldContext);

    if (searchField === null) {
      console.warn("SearchFieldButton has to be wrapped in <SearchField />");
      return null;
    }

    const { inputProps } = searchField;

    return (
      <Button
        className={cl(className, "navds-search-field__button")}
        {...rest}
        variant={variant}
        ref={ref}
        disabled={disabled ?? inputProps?.disabled}
      />
    );
  }
);

export default SearchFieldButton;

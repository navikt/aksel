import React, { forwardRef, useContext } from "react";
import cl from "classnames";
import { SearchFieldContext } from "./SearchField";
import { Button, ButtonProps } from "../..";

export interface SearchFieldClearButtonProps extends Omit<ButtonProps, "size"> {
  /**
   * Button text
   * @example <Close /> <span>Søk</span>
   */
  children: React.ReactNode;
  /**
   * Changes design and interactions
   * @default "secondary"
   */
  variant?: "primary" | "secondary";
}

const SearchFieldClearButton = forwardRef<
  HTMLButtonElement,
  SearchFieldClearButtonProps
>(({ className, variant = "secondary", disabled, ...rest }, ref) => {
  const searchField = useContext(SearchFieldContext);

  if (searchField === null) {
    console.warn("SearchFieldClearButton has to be wrapped in <SearchField />");
    return null;
  }

  const { size, inputProps } = searchField;

  return (
    <Button
      {...rest}
      ref={ref}
      className={cl(className, "navds-search-field__clear-button")}
      size={size}
      variant={variant}
      disabled={disabled ?? inputProps?.disabled}
    />
  );
});

export default SearchFieldClearButton;

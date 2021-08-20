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
   * @default "primary"
   */
  variant?: "primary" | "action";
}

const SearchFieldClearButton = forwardRef<
  HTMLButtonElement,
  SearchFieldClearButtonProps
>(({ className, variant = "primary", disabled, ...rest }, ref) => {
  const searchField = useContext(SearchFieldContext);

  if (searchField === null) {
    console.warn("SearchFieldClearButton has to be wrapped in <SearchField />");
    return null;
  }

  const { size, inputProps } = searchField;

  return (
    <Button
      ref={ref}
      className={cl(className, "navds-search-field__button")}
      {...rest}
      size={size}
      variant={variant}
      disabled={disabled ?? inputProps?.disabled}
    />
  );
});

export default SearchFieldClearButton;

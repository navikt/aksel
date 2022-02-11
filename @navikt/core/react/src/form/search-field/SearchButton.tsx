import { Search } from "@navikt/ds-icons";
import cl from "classnames";
import React, { forwardRef, useContext } from "react";
import { SearchFieldContext } from ".";
import { Button, ButtonProps } from "../..";

export interface SearchButtonProps
  extends Omit<ButtonProps, "size" | "children"> {
  /**
   * Text set before <Search/> icon
   */
  children?: React.ReactNode;
  /**
   * Changes button-variant
   * @default "tertiary"
   */
  variant?: "tertiary" | "primary";
}

export type SearchButtonType = React.ForwardRefExoticComponent<
  SearchButtonProps & React.RefAttributes<HTMLButtonElement>
>;

const SearchButton: SearchButtonType = forwardRef(
  (
    { className, children, variant = "tertiary", disabled, onClick, ...rest },
    ref
  ) => {
    const searchField = useContext(SearchFieldContext);

    if (searchField === null) {
      console.warn("<SearchField.Button> has to be wrapped in <SearchField />");
      return null;
    }

    const { size, onSearch } = searchField;

    return (
      <Button
        type="button"
        {...rest}
        ref={ref}
        size={size}
        variant={variant as any}
        className={cl("navds-search-field__search-button", className)}
        disabled={searchField?.disabled ?? disabled}
        onClick={(e) => {
          onSearch();
          onClick?.(e);
        }}
      >
        <Search aria-hidden />
        {children ? children : <span className="navds-sr-only">Søk</span>}
      </Button>
    );
  }
);

export default SearchButton;

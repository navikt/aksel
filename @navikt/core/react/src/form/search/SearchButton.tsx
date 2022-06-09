import { Search } from "@navikt/ds-icons";
import cl from "classnames";
import React, { forwardRef, useContext } from "react";
import { Button, ButtonProps } from "../..";
import { SearchContext } from "./Search";

export interface SearchButtonProps
  extends Omit<ButtonProps, "size" | "children" | "variant"> {
  /**
   * Text set before <Search/> icon
   */
  children?: React.ReactNode;
}

export type SearchButtonType = React.ForwardRefExoticComponent<
  SearchButtonProps & React.RefAttributes<HTMLButtonElement>
>;

const SearchButton: SearchButtonType = forwardRef(
  ({ className, children, disabled, ...rest }, ref) => {
    const context = useContext(SearchContext);

    if (context === null) {
      console.warn("<Search.Button> has to be wrapped in <Search />");
      return null;
    }

    const { size, variant } = context;

    return (
      <Button
        type="submit"
        {...rest}
        ref={ref}
        size={size}
        variant={variant === "secondary" ? "secondary" : "primary"}
        className={cl("navds-search__button-search", className)}
        disabled={context?.disabled ?? disabled}
      >
        <Search aria-hidden />
        {children ? children : <span className="navds-sr-only">Søk</span>}
      </Button>
    );
  }
);

export default SearchButton;

import cl from "clsx";
import React, { forwardRef, useContext } from "react";
import { Button, ButtonProps } from "../..";
import { SearchContext } from "./Search";
import { MagnifyingGlassIcon } from "@navikt/aksel-icons";

export interface SearchButtonProps
  extends Omit<ButtonProps, "size" | "children" | "variant"> {
  /**
   * Text set after <Search/> icon
   */
  children?: React.ReactNode;
}

export type SearchButtonType = React.ForwardRefExoticComponent<
  SearchButtonProps & React.RefAttributes<HTMLButtonElement>
>;

const SearchButton: SearchButtonType = forwardRef(
  ({ className, children, disabled, onClick, ...rest }, ref) => {
    const context = useContext(SearchContext);

    if (context === null) {
      console.warn("<Search.Button> has to be wrapped in <Search />");
      return null;
    }

    const { size, variant, handleClick } = context;

    return (
      <Button
        type="submit"
        {...rest}
        ref={ref}
        size={size}
        variant={variant === "secondary" ? "secondary" : "primary"}
        className={cl("navds-search__button-search", className)}
        disabled={context?.disabled ?? disabled}
        onClick={(e) => {
          handleClick();
          onClick?.(e);
        }}
        icon={
          <MagnifyingGlassIcon
            {...(children ? { "aria-hidden": true } : { title: "Søk" })}
          />
        }
      >
        {children}
      </Button>
    );
  }
);

export default SearchButton;

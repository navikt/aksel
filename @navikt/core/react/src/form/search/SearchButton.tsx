import React, { forwardRef, useContext } from "react";
import { MagnifyingGlassIcon } from "@navikt/aksel-icons";
import { Button, ButtonProps } from "../../button";
import { composeEventHandlers } from "../../util/composeEventHandlers";
import { useI18n } from "../../util/i18n/i18n.hooks";
import { cl } from "../../utils/helpers";
import { SearchContext } from "./context";

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
    const translate = useI18n("Search");
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
        className={cl("aksel-search__button-search", className)}
        disabled={context?.disabled ?? disabled}
        onClick={composeEventHandlers(onClick, handleClick)}
        icon={
          <MagnifyingGlassIcon
            {...(children
              ? { "aria-hidden": true }
              : { title: translate("search") })}
          />
        }
      >
        {children}
      </Button>
    );
  },
);

export default SearchButton;

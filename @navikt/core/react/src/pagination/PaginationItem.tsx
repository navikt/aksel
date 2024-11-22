import cl from "clsx";
import React, { forwardRef } from "react";
import { Button, ButtonProps } from "../button";
import { UNSAFE_useAkselTheme } from "../provider";
import { OverridableComponent } from "../util/types";

export interface PaginationItemProps extends ButtonProps {
  children: React.ReactNode;
  /**
   * Sets selected styling if true
   * @default false
   */
  selected?: boolean;
  /**
   * Currently only sets `data-page` attribute.
   * @deprecated Use `data-page` instead if you need to access the items page number in the future.
   */
  page?: number;
  /**
   * Changes padding, height and font-size
   * @default "medium"
   */
  size?: "medium" | "small" | "xsmall";
}

export type PaginationItemType = OverridableComponent<
  PaginationItemProps,
  HTMLAnchorElement
>;

export const Item: PaginationItemType = forwardRef(
  (
    {
      children,
      as: Component = "button",
      selected = false,
      className,
      page,
      ...rest
    },
    ref,
  ) => {
    const themeContext = UNSAFE_useAkselTheme(false);

    return (
      <Button
        as={Component}
        variant={themeContext ? "tertiary-neutral" : "tertiary"}
        aria-current={selected}
        data-selected={selected}
        ref={ref}
        className={cl("navds-pagination__item", className, {
          "navds-pagination__item--selected": selected,
        })}
        data-page={page}
        /* TODO: Breaking change to remove since it's in use by some applications. Add to future major version. */
        page={page}
        {...(Component === "button" && { type: "button" })}
        {...rest}
      >
        {children}
      </Button>
    );
  },
);

export default Item;

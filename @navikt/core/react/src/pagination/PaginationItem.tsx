import React, { forwardRef } from "react";
import cl from "clsx";
import { Button, ButtonProps, OverridableComponent } from "..";

export interface PaginationItemProps extends ButtonProps {
  children: React.ReactNode;
  /**
   * Sets selected styling if true
   * @default false
   */
  selected?: boolean;
  /**
   * The page the item represents
   */
  page: number;
  /**
   * Changes padding, height and font-size
   * @default medium
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
      ...rest
    },
    ref
  ) => {
    return (
      <Button
        as={Component}
        variant="tertiary"
        aria-current={selected}
        ref={ref}
        className={cl("navds-pagination__item", className, {
          "navds-pagination__item--selected": selected,
        })}
        {...(Component === "button" && { type: "button" })}
        {...rest}
      >
        {children}
      </Button>
    );
  }
);

export default Item;

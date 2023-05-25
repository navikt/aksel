import React, { forwardRef } from "react";
import cl from "clsx";
import { OverridableComponent } from "../util/OverridableComponent";

interface ExpansionCardTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  /**
   * Changes text-sizing
   * @default medium
   */
  size?: "large" | "medium" | "small";
}

export type ExpansionCardTitleType = OverridableComponent<
  ExpansionCardTitleProps,
  HTMLHeadingElement
>;

export const ExpansionCardTitle: ExpansionCardTitleType = forwardRef(
  ({ className, as: Component = "h3", size = "medium", ...rest }, ref) => (
    <Component
      {...rest}
      ref={ref}
      className={cl(
        "navds-expansioncard__title",
        `navds-expansioncard__title--${size}`,
        "navds-heading",
        `navds-heading--${size}`,
        className
      )}
    />
  )
);

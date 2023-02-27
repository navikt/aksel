import React, { forwardRef } from "react";
import cl from "clsx";
import { OverridableComponent } from "../util/OverridableComponent";

interface ExpansionCardTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  /**
   * Changes text-sizing
   * @default small
   */
  size?: "xlarge" | "large" | "medium" | "small" | "xsmall";
}

export type ExpansionCardTitleType = OverridableComponent<
  ExpansionCardTitleProps,
  HTMLHeadingElement
>;

export const ExpansionCardTitle: ExpansionCardTitleType = forwardRef(
  ({ className, as: Component = "h3", size = "small", ...rest }, ref) => (
    <Component
      {...rest}
      ref={ref}
      className={cl(
        "navds-expansioncard__title",
        "navds-heading",
        `navds-heading--${size}`,
        className
      )}
    />
  )
);

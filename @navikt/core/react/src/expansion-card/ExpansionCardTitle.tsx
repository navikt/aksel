import React, { forwardRef } from "react";
import { useRenameCSS } from "../theme/Theme";
import { OverridableComponent } from "../util/types";

export interface ExpansionCardTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  /**
   * Changes text-sizing
   * @default "medium"
   */
  size?: "large" | "medium" | "small";
}

export const ExpansionCardTitle: OverridableComponent<
  ExpansionCardTitleProps,
  HTMLHeadingElement
> = forwardRef(
  ({ className, as: Component = "h3", size = "medium", ...rest }, ref) => {
    const { cn } = useRenameCSS();

    return (
      <Component
        {...rest}
        ref={ref}
        className={cn(
          "navds-expansioncard__title",
          `navds-expansioncard__title--${size}`,
          "navds-heading",
          `navds-heading--${size}`,
          className,
        )}
      />
    );
  },
);

export default ExpansionCardTitle;

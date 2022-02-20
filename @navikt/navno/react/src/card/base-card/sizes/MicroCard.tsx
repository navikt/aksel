import React, { forwardRef } from "react";
import cl from "classnames";
import { OverridableComponent } from "@navikt/ds-react";

export interface MicroCardProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /**
   * Link text
   */
  children: React.ReactNode;
  type?: "situation" | "product" | "tool" | "general";
}

export const MicroCard: OverridableComponent<
  MicroCardProps,
  HTMLAnchorElement
> = forwardRef(
  (
    { className, as: Component = "a", children, type = "general", ...rest },
    ref
  ) => (
    <Component
      ref={ref}
      className={cl(
        "navds-card",
        "navds-card-micro",
        `navds-card--${type}`,
        className
      )}
      title={children}
      {...rest}
    >
      <div className={cl("navds-card__bed")}>{children}</div>
    </Component>
  )
);

export default MicroCard;

import React, { forwardRef } from "react";
import cl from "classnames";
import { OverridableComponent } from "..";

export interface MicroCardProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /**
   * Link text
   */
  children: React.ReactNode;
}

export const MicroCard: OverridableComponent<
  MicroCardProps,
  HTMLAnchorElement
> = forwardRef(({ className, as: Component = "a", children, ...rest }, ref) => (
  <Component
    ref={ref}
    className={cl(
      "navds-card__micro",
      "navds-detail",
      "navds-detail--small",
      className
    )}
    title={children}
    {...rest}
  >
    {children}
  </Component>
));

export default MicroCard;

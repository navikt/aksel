import React, { forwardRef } from "react";
import cl from "classnames";
import { OverridableComponent } from "../util";

export interface MicroCardProps {
  props: {
    children: string;
  } & React.HTMLAttributes<HTMLAnchorElement>;
  defaultComponent: "a";
}

export const MicroCard: OverridableComponent<MicroCardProps> = forwardRef(
  ({ className, component: Component = "a", children, ...rest }, ref) => (
    <Component
      ref={ref}
      className={cl(
        "navds-card__micro",
        "navds-detail",
        "navds-detail--s",
        className
      )}
      title={children}
      {...rest}
    >
      {children}
    </Component>
  )
);

export default MicroCard;

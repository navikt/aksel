import React, { forwardRef } from "react";
import cl from "classnames";
import { OverriddenComponent } from "../util";

export interface MicroCardProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  override?: boolean;
}

export const MicroCard = forwardRef<HTMLAnchorElement, MicroCardProps>(
  ({ className, override = false, ...rest }, ref) => {
    const props = {
      ...rest,
      className: cl(
        "navds-card__micro",
        "navds-detail",
        "navds-detail--s",
        className
      ),
    };

    if (override) {
      return <OverriddenComponent {...props} />;
    } else {
      return <a {...props} ref={ref} />;
    }
  }
);

export default MicroCard;

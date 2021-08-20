import React, { forwardRef } from "react";
import cl from "classnames";

export interface MicroCardProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  override?: boolean;
}

export const MicroCard = forwardRef<HTMLAnchorElement, MicroCardProps>(
  ({ className, children, override = false, ...rest }, ref) => {
    const props = {
      ...rest,
      ref: ref,
      className: cl(
        "navds-card__micro",
        "navds-detail",
        "navds-detail--s",
        className
      ),
    };
    if (override) {
      let child = React.Children.only(children);
      if (React.isValidElement(child)) {
        return React.cloneElement(child, props);
      } else {
        console.error(
          "MicroCard with override=true received invalid react element as child."
        );
        return null;
      }
    }
    return <a {...props}>{children}</a>;
  }
);

export default MicroCard;

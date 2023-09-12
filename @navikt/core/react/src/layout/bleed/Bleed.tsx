import cl from "clsx";
import React, { forwardRef, HTMLAttributes } from "react";
import { OverridableComponent } from "../../util";

export interface BleedProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Bleed: OverridableComponent<BleedProps, HTMLDivElement> =
  forwardRef(({ as: Component = "div", className, ...rest }, ref) => {
    return (
      <Component {...rest} ref={ref} className={cl("navds-bleed", className)} />
    );
  });

export default Bleed;

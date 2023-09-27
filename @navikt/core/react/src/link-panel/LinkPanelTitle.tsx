import React, { forwardRef } from "react";
import cl from "clsx";
import { OverridableComponent } from "../util/OverridableComponent";

export interface LinkPanelTitleProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const LinkPanelTitle: OverridableComponent<
  LinkPanelTitleProps,
  HTMLDivElement
> = forwardRef(({ className, as: Component = "div", ...rest }, ref) => (
  <Component
    {...rest}
    ref={ref}
    className={cl(
      "navds-link-panel__title",
      "navds-heading",
      "navds-heading--medium",
      className
    )}
  />
));

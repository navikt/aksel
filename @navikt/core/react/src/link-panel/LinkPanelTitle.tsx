import cl from "clsx";
import React, { forwardRef } from "react";
import { OverridableComponent } from "../util/types";

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
      className,
    )}
  />
));

export default LinkPanelTitle;

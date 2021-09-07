import React, { forwardRef } from "react";
import cl from "classnames";
import { OverridableComponent } from "..";

interface LinkPanelTitleProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export type LinkPanelTitleType = OverridableComponent<
  LinkPanelTitleProps,
  HTMLDivElement
>;

export const LinkPanelTitle: LinkPanelTitleType = forwardRef(
  ({ className, as: Component = "div", ...rest }, ref) => (
    <Component
      {...rest}
      ref={ref}
      className={cl(
        "navds-link-panel__title",
        "navds-title",
        "navds-title--medium",
        className
      )}
    />
  )
);

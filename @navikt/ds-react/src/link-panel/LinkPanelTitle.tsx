import React, { forwardRef } from "react";
import cl from "classnames";
import { OverridableComponent } from "..";

interface LinkPanelTitleProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
}

export type LinkPanelTitleType = OverridableComponent<
  LinkPanelTitleProps,
  HTMLSpanElement
>;

export const LinkPanelTitle: LinkPanelTitleType = forwardRef(
  ({ className, as: Component = "span", ...rest }, ref) => (
    <Component
      ref={ref}
      className={cl(
        "navds-link-panel-title",
        "navds-title",
        "navds-title--m",
        className
      )}
      {...rest}
    />
  )
);

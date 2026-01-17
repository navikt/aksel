import React, { forwardRef } from "react";
import { cl } from "../util/className";
import { OverridableComponent } from "../util/types";

export interface LinkPanelTitleProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const LinkPanelTitle: OverridableComponent<
  LinkPanelTitleProps,
  HTMLDivElement
> = forwardRef(({ className, as: Component = "div", ...rest }, ref) => {
  return (
    <Component
      {...rest}
      ref={ref}
      className={cl(
        "aksel-link-panel__title",
        "aksel-heading",
        "aksel-heading--medium",
        className,
      )}
    />
  );
});

export default LinkPanelTitle;

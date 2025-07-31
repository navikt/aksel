import React, { forwardRef } from "react";
import { useRenameCSS } from "../theme/Theme";
import { OverridableComponent } from "../util/types";

export interface LinkPanelTitleProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const LinkPanelTitle: OverridableComponent<
  LinkPanelTitleProps,
  HTMLDivElement
> = forwardRef(({ className, as: Component = "div", ...rest }, ref) => {
  const { cn } = useRenameCSS();

  return (
    <Component
      {...rest}
      ref={ref}
      className={cn(
        "navds-link-panel__title",
        "navds-heading",
        "navds-heading--medium",
        className,
      )}
    />
  );
});

export default LinkPanelTitle;

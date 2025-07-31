import React, { forwardRef } from "react";
import { useRenameCSS } from "../theme/Theme";
import { OverridableComponent } from "../util/types";

export interface InternalHeaderTitleProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /**
   * Application title
   */
  children: React.ReactNode;
}

export const InternalHeaderTitle: OverridableComponent<
  InternalHeaderTitleProps,
  HTMLAnchorElement
> = forwardRef(({ as: Component = "a", children, className, ...rest }, ref) => {
  const { cn } = useRenameCSS();

  return (
    <Component
      {...rest}
      ref={ref}
      size="xsmall"
      className={cn(
        "navds-internalheader__title",
        "navds-body-short",
        className,
      )}
    >
      <span>{children}</span>
    </Component>
  );
});

export default InternalHeaderTitle;

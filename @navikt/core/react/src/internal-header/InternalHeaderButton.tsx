import React, { forwardRef } from "react";
import { useRenameCSS } from "../theme/Theme";
import { OverridableComponent } from "../util/types";

export interface InternalHeaderButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Application Button
   */
  children: React.ReactNode;
}
export const InternalHeaderButton: OverridableComponent<
  InternalHeaderButtonProps,
  HTMLButtonElement
> = forwardRef(({ as: Component = "button", className, ...rest }, ref) => {
  const { cn } = useRenameCSS();

  return (
    <Component
      {...rest}
      ref={ref}
      className={cn("navds-internalheader__button", className)}
    />
  );
});

export default InternalHeaderButton;

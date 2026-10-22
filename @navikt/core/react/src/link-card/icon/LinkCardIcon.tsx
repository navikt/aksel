import React, { type HTMLAttributes, forwardRef } from "react";
import { cl } from "../../utils/helpers";

interface LinkCardIconProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

/**
 * @see 🏷️ {@link LinkCardIconProps}
 */
const LinkCardIcon = forwardRef<HTMLDivElement, LinkCardIconProps>(
  ({ children, className, ...restProps }: LinkCardIconProps, forwardedRef) => {
    return (
      <div
        ref={forwardedRef}
        aria-hidden
        className={cl("aksel-link-card__icon", className)}
        {...restProps}
      >
        {children}
      </div>
    );
  },
);

export { LinkCardIcon };
export type { LinkCardIconProps };

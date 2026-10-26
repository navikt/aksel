import React, { type HTMLAttributes, forwardRef } from "react";
import { cl } from "../../utils/helpers";

interface LinkCardFooterProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

/**
 * @see 🏷️ {@link LinkCardFooterProps}
 */
const LinkCardFooter = forwardRef<HTMLDivElement, LinkCardFooterProps>(
  (
    { children, className, ...restProps }: LinkCardFooterProps,
    forwardedRef,
  ) => {
    return (
      <div
        ref={forwardedRef}
        className={cl("aksel-link-card__footer", className)}
        {...restProps}
      >
        {children}
      </div>
    );
  },
);

export { LinkCardFooter };
export type { LinkCardFooterProps };

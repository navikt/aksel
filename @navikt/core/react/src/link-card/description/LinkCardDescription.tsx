import React, { type HTMLAttributes, forwardRef } from "react";
import { cl } from "../../utils/helpers";

interface LinkCardDescriptionProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

/**
 * @see 🏷️ {@link LinkCardDescriptionProps}
 */
const LinkCardDescription = forwardRef<
  HTMLDivElement,
  LinkCardDescriptionProps
>(
  (
    { children, className, ...restProps }: LinkCardDescriptionProps,
    forwardedRef,
  ) => {
    return (
      <div
        ref={forwardedRef}
        className={cl("aksel-link-card__description", className)}
        {...restProps}
      >
        {children}
      </div>
    );
  },
);

export { LinkCardDescription };
export type { LinkCardDescriptionProps };

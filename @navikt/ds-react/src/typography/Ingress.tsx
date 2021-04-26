import React, { forwardRef } from "react";
import cl from "classnames";

export interface IngressProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  /**
   * Component content
   */
  children: React.ReactNode;
  /**
   * Custom styling on element
   */
  className?: string;
  /**
   * Adds margins to typo
   */
  spacing?: boolean;
}

const Ingress = forwardRef<HTMLParagraphElement, IngressProps>(
  ({ className, spacing, ...rest }, ref) => (
    <p
      {...rest}
      ref={ref}
      className={cl(className, "navds-ingress", {
        "navds-typo--spacing": !!spacing,
      })}
    />
  )
);

export default Ingress;

import React, { forwardRef } from "react";
import cl from "classnames";
import OverridableComponent from "../util/newOverridableComponent";

export interface IngressProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  /**
   * Ingress text
   */
  children: React.ReactNode;
  /**
   * Adds margins to typo
   */
  spacing?: boolean;
}

const Ingress: OverridableComponent<
  IngressProps,
  HTMLParagraphElement
> = forwardRef(({ className, spacing, as: Component = "p", ...rest }, ref) => (
  <Component
    {...rest}
    ref={ref}
    className={cl(className, "navds-ingress", {
      "navds-typo--spacing": !!spacing,
    })}
  />
));

export default Ingress;

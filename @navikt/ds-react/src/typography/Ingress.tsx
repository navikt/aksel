import React, { forwardRef } from "react";
import cl from "classnames";
import { OverridableComponent } from "../util";

export interface IngressProps {
  props: {
    /**
     * Ingress text
     */
    children: React.ReactNode;
    /**
     * Adds margins to typo
     */
    spacing?: boolean;
  } & React.HTMLAttributes<HTMLParagraphElement>;
  defaultComponent: "p";
}

const Ingress: OverridableComponent<IngressProps> = forwardRef(
  ({ className, spacing, component: Component = "p", ...rest }, ref) => (
    <Component
      {...rest}
      ref={ref}
      className={cl(className, "navds-ingress", {
        "navds-typo--spacing": !!spacing,
      })}
    />
  )
);

export default Ingress;

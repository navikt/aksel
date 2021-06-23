import React, { forwardRef } from "react";
import cl from "classnames";
import { OverridableComponent } from "../util";

export interface MicroCardProps {
  props: {
    children: string;
    /**
     * @ignore
     */
    className?: string;
    /**
     * @default "m"
     */
    size?: "m" | "s";
    illustration?: React.ReactNode;
  } & React.HTMLAttributes<HTMLAnchorElement>;
  defaultComponent: "a";
}

export const MicroCard: OverridableComponent<MicroCardProps> = forwardRef(
  (
    {
      className,
      component: Component = "a",
      children,
      size = "m",
      illustration,
      ...rest
    },
    ref
  ) => (
    <Component
      ref={ref}
      className={cl("navds-card", className, `navds-card--${size}`)}
      {...rest}
    >
      {children}
    </Component>
  )
);

export default MicroCard;

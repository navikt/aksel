import React, { forwardRef } from "react";
import cl from "classnames";
import { OverridableComponent } from "../util";

export interface MiniCardProps {
  props: {
    children: string;
    /**
     * @ignore
     */
    className?: string;
    /**
     * SVG element
     */
    illustration: React.ReactNode;
    /**
     * Predefined theming for MiniCard
     * @default "guide"
     */
    theme?: "situation" | "product" | "guide";
  } & React.HTMLAttributes<HTMLAnchorElement>;
  defaultComponent: "a";
}

export const MiniCard: OverridableComponent<MiniCardProps> = forwardRef(
  (
    {
      className,
      component: Component = "a",
      children,
      illustration,
      theme = "guide",
      ...rest
    },
    ref
  ) => (
    <Component
      ref={ref}
      className={cl("navds-card-mini", className, `navds-card-mini--${theme}`)}
      {...rest}
    >
      <div className="navds-card-mini__wrapper">
        <div className="navds-card-mini__illustration">{illustration}</div>
        <div className="navds-card-mini__title navds-label">{children}</div>
      </div>
    </Component>
  )
);

export default MiniCard;

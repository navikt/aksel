import React, { forwardRef } from "react";
import cl from "classnames";
import { OverridableComponent } from "../util";

export interface CardProps {
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
    description?: React.ReactNode;
    category?: React.ReactNode;
  } & React.HTMLAttributes<HTMLAnchorElement>;
  defaultComponent: "a";
}

export const Card: OverridableComponent<CardProps> = forwardRef(
  (
    {
      className,
      component: Component = "a",
      children,
      size = "m",
      illustration,
      desciption,
      category,
      ...rest
    },
    ref
  ) => (
    <Component
      ref={ref}
      className={cl("navds-card", className, `navds-card--${size}`)}
      {...rest}
    >
      <div className="navds-card__wrapper">
        {illustration && (
          <div className="navds-card__illustration">{illustration}</div>
        )}
        <div className="navds-card__title navds-title navds-title--l">
          {children}
        </div>
        {desciption && size === "m" && (
          <p className="navds-card__description navds-body-long">
            {desciption}
          </p>
        )}
        {category && size === "m" && (
          <p className="navds-card__category navds-detail navds-detail--s">
            {category}
          </p>
        )}
      </div>
    </Component>
  )
);

export default Card;

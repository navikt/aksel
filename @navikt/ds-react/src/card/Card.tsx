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
     * SVG element
     */
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
      illustration,
      description,
      category,
      ...rest
    },
    ref
  ) => (
    <Component ref={ref} className={cl("navds-card", className)} {...rest}>
      <div className="navds-card__wrapper">
        {illustration && (
          <div className="navds-card__illustration">{illustration}</div>
        )}
        <div className="navds-card__title navds-title navds-title--m">
          {children}
        </div>
        {description && (
          <p className="navds-card__description navds-body-long">
            {description}
          </p>
        )}
        {category && (
          <p className="navds-card__category navds-detail navds-detail--s">
            {category}
          </p>
        )}
      </div>
    </Component>
  )
);

export default Card;

import React, { forwardRef } from "react";
import cl from "classnames";
import { OverridableComponent } from "@navikt/ds-react";
import { Heading, BodyLong, BodyShort } from "@navikt/ds-react";
import { Animation } from "../animation";
import { useInteractions } from "./useInteraction";
export interface LargeCardProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  title: string;
  text: string;
  category: string;
  hoverAnimation?: any;
  activeAnimation?: any;
  type?: "situation" | "product" | "tool" | "general";
}

const LargeCard: OverridableComponent<
  LargeCardProps,
  HTMLAnchorElement
> = forwardRef(
  (
    {
      as: Component = "a",
      className,
      title,
      text,
      category,
      hoverAnimation,
      activeAnimation,
      type,
      ...rest
    },
    ref
  ) => {
    const { handlers, isHovering, isActive } = useInteractions();
    return (
      <Component
        {...rest}
        {...handlers}
        ref={ref}
        className={cl("navds-card-large", className)}
      >
        <div
          className={cl(
            "navds-card-large__bed",
            `navds-product-card__bed--general` // LargeCard has white background regardless of type
          )}
        >
          {hoverAnimation && activeAnimation && (
            <Animation
              isHovering={isHovering}
              isActive={isActive}
              hoverAnimation={hoverAnimation}
              activeAnimation={activeAnimation}
              className={cl("navds-card-large__animation")}
            />
          )}
          <Heading
            level="3"
            size="medium"
            className={cl("navds-card-large__heading")}
          >
            {title}
          </Heading>
          <BodyLong className={cl("navds-card-large__text")}>{text}</BodyLong>
          <BodyShort className={cl("navds-card-large__category")}>
            {category}
          </BodyShort>
        </div>
      </Component>
    );
  }
);

export default LargeCard;

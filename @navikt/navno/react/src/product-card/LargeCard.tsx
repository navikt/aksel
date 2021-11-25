import React, { forwardRef } from "react";
import cl from "classnames";
import { OverridableComponent } from "@navikt/ds-react";
import { Heading, BodyLong, BodyShort } from "@navikt/ds-react";
import { Animation } from "../animation";
import { useInteractions } from "./useInteraction";
import { Pictogram } from "../pictogram";
export interface LargeCardProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  activeAnimation?: any;
  category: string;
  hoverAnimation?: any;
  staticBack?: React.ReactElement<Symbol>;
  staticFront?: React.ReactElement<Symbol>;
  text: string;
  title: string;
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
      staticFront,
      staticBack,
      type = "general",
      ...rest
    },
    ref
  ) => {
    const { handlers, isHovering, isActive } = useInteractions();
    const hasAnimation = !!(hoverAnimation && activeAnimation);
    const hasStatic = !hasAnimation && staticFront && staticBack;

    return (
      <Component
        {...rest}
        {...handlers}
        ref={ref}
        className={cl("navds-card", "navds-card-large", className)}
      >
        <div
          className={cl(
            "navds-card__bed",
            `navds-card__bed--general` // LargeCard has white background regardless of type
          )}
        >
          {hasStatic && (
            <Pictogram
              isActive={isActive}
              front={staticFront}
              back={staticBack}
            />
          )}
          {hoverAnimation && activeAnimation && (
            <Animation
              isHovering={isHovering}
              isActive={isActive}
              hoverAnimation={hoverAnimation}
              activeAnimation={activeAnimation}
              className={cl("navds-card__animation")}
            />
          )}
          <Heading level="3" size="medium" className={cl("navds-card__title")}>
            {title}
          </Heading>
          <BodyLong className={cl("navds-card__text")}>{text}</BodyLong>
          <BodyShort className={cl("navds-card__category")}>
            {category}
          </BodyShort>
        </div>
      </Component>
    );
  }
);

export default LargeCard;

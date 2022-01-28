import React, { forwardRef } from "react";
import cl from "classnames";
import { OverridableComponent, Link } from "@navikt/ds-react";
import { Heading, BodyLong, BodyShort } from "@navikt/ds-react";
import { Animation } from "../../../animation";
import { useInteractions } from "../useInteraction";

export interface LargeCardProps extends React.HTMLAttributes<HTMLElement> {
  activeAnimation?: any;
  category: string;
  hoverAnimation?: any;
  text: string;
  title: string;
  type?: "situation" | "product" | "tool" | "general";
}

const LargeCard: OverridableComponent<LargeCardProps, HTMLElement> = forwardRef(
  (
    {
      as: Component = "article",
      className,
      title,
      text,
      category,
      hoverAnimation,
      activeAnimation,
      type = "general",
      href,
      ...rest
    },
    ref
  ) => {
    const { handlers, isHovering, isActive, isFocused } = useInteractions();
    const hasAnimation = !!(hoverAnimation && activeAnimation);

    const focusClass = isFocused ? "navds-card--focus" : "";
    const activeClass = isActive ? "navds-card--active" : "";

    return (
      <Component
        {...rest}
        {...handlers}
        ref={ref}
        className={cl(
          "navds-card",
          "navds-card-large",
          className,
          focusClass,
          activeClass
        )}
      >
        <div
          className={cl(
            "navds-card__bed",
            `navds-card__bed--general` // LargeCard has white background regardless of type
          )}
        >
          {hasAnimation && (
            <Animation
              isHovering={isHovering}
              isActive={isActive}
              hoverAnimation={hoverAnimation}
              activeAnimation={activeAnimation}
              className={cl("navds-card__animation")}
            />
          )}
          <Heading level="3" size="medium">
            <Link href={href} className={cl("navds-card__title")}>
              {title}
            </Link>
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

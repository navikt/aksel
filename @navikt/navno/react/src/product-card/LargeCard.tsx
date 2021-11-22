import React, { forwardRef } from "react";
import cl from "classnames";
import { OverridableComponent } from "@navikt/ds-react";
import { Heading, BodyLong, BodyShort } from "@navikt/ds-react";
import { Animation } from "@navikt/ds-react-navno";
import { useInteractions } from "./useInteraction";
export interface LargeCardProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  title: string;
  text: string;
  category: string;
  hoverAnimation?: any;
  activeAnimation?: any;
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
        className={cl("navds-large-card", className)}
      >
        <div className={cl("navds-large-card__bed")}>
          {hoverAnimation && activeAnimation && (
            <Animation
              isHovering={isHovering}
              isActive={isActive}
              hoverAnimation={hoverAnimation}
              activeAnimation={activeAnimation}
              className={cl("navds-large-card__animation")}
            />
          )}
          <Heading
            level="3"
            size="medium"
            className={cl("navds-large-card__heading")}
          >
            {title}
          </Heading>
          <BodyLong className={cl("navds-large-card__text")}>{text}</BodyLong>
          <BodyShort className={cl("navds-large-card__category")}>
            {category}
          </BodyShort>
        </div>
      </Component>
    );
  }
);

export default LargeCard;

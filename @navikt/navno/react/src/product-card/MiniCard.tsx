import React, { forwardRef } from "react";
import cl from "classnames";
import { OverridableComponent } from "@navikt/ds-react";
import { Heading, BodyLong } from "@navikt/ds-react";
import { Animation } from "../animation";
import { useInteractions } from "./useInteraction";

export interface MiniCardProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  title: string;
  hoverAnimation?: any;
  activeAnimation?: any;
}

const MiniCard: OverridableComponent<
  MiniCardProps,
  HTMLAnchorElement
> = forwardRef(
  (
    {
      activeAnimation,
      as: Component = "a",
      className,
      hoverAnimation,
      title,
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
        className={cl("navds-mini-card", className)}
      >
        <div className={cl("navds-mini-card__bed")}>
          {hoverAnimation && activeAnimation && (
            <Animation
              isHovering={isHovering}
              isActive={isActive}
              hoverAnimation={hoverAnimation}
              activeAnimation={activeAnimation}
              className={cl("navds-mini-card__animation")}
            />
          )}
          <Heading
            level="3"
            size="medium"
            className={cl("navds-mini-card__heading")}
          >
            {title}
          </Heading>
        </div>
      </Component>
    );
  }
);

export default MiniCard;

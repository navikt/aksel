import React, { forwardRef } from "react";
import cl from "classnames";
import { BodyShort, OverridableComponent } from "@navikt/ds-react";
import { Animation } from "../../../animation";
import { useInteractions } from "../../useInteraction";

export interface MiniCardProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  title: string;
  hoverAnimation?: any;
  activeAnimation?: any;
  type?: "situation" | "product" | "tool" | "general";
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
      type = "general",
      ...rest
    },
    ref
  ) => {
    const { handlers, isHovering, isActive } = useInteractions();
    const hasAnimation = !!(hoverAnimation && activeAnimation);

    return (
      <Component
        {...rest}
        {...handlers}
        ref={ref}
        className={cl("navds-card", "navds-card-mini", className)}
      >
        <div className={cl("navds-card__bed", `navds-card__bed--${type}`)}>
          {hasAnimation && (
            <Animation
              isHovering={isHovering}
              isActive={isActive}
              hoverAnimation={hoverAnimation}
              activeAnimation={activeAnimation}
              className={cl("navds-card__animation")}
            />
          )}
          <BodyShort className={cl("navds-card__title")}>{title}</BodyShort>
        </div>
      </Component>
    );
  }
);

export default MiniCard;

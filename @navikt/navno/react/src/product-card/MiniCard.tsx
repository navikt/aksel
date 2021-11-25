import React, { forwardRef } from "react";
import cl from "classnames";
import { BodyShort, OverridableComponent } from "@navikt/ds-react";
import { Animation } from "../animation";
import { Pictogram } from "../pictogram";
import { useInteractions } from "./useInteraction";

export interface MiniCardProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  title: string;
  hoverAnimation?: any;
  activeAnimation?: any;
  staticBack?: React.ReactElement<Symbol>;
  staticFront?: React.ReactElement<Symbol>;
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
      staticFront,
      staticBack,
      title,
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
        className={cl("navds-card", "navds-card-mini", className)}
      >
        <div className={cl("navds-card__bed", `navds-card__bed--${type}`)}>
          {hasStatic && (
            <Pictogram
              isActive={isActive}
              front={staticFront}
              back={staticBack}
              className={cl("navds-card__pictogram")}
            />
          )}
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

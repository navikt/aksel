import React, { forwardRef } from "react";
import cl from "classnames";
import { BodyShort, OverridableComponent } from "@navikt/ds-react";
import { Animation } from "../animation";
import { useInteractions } from "./useInteraction";

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
    return (
      <Component
        {...rest}
        {...handlers}
        ref={ref}
        className={cl("navds-card-mini", className)}
      >
        <div
          className={cl(
            "navds-card-mini__bed",
            `navds-product-card__bed--${type}`
          )}
        >
          {hoverAnimation && activeAnimation && (
            <Animation
              isHovering={isHovering}
              isActive={isActive}
              hoverAnimation={hoverAnimation}
              activeAnimation={activeAnimation}
              className={cl("navds-card-mini__animation")}
            />
          )}
          <BodyShort className={cl("navds-card-mini__heading")}>
            {title}
          </BodyShort>
        </div>
      </Component>
    );
  }
);

export default MiniCard;

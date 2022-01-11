import React, { forwardRef } from "react";
import cl from "classnames";
import { BodyShort, OverridableComponent, Link } from "@navikt/ds-react";
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
      as: Component = "article",
      className,
      hoverAnimation,
      title,
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

    console.log(href);

    return (
      <Component
        {...rest}
        {...handlers}
        ref={ref}
        className={cl(
          "navds-card",
          "navds-card-mini",
          className,
          focusClass,
          activeClass
        )}
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
          <BodyShort>
            <Link href={href} className={cl("navds-card__title")}>
              {title}
            </Link>
          </BodyShort>
        </div>
      </Component>
    );
  }
);

export default MiniCard;

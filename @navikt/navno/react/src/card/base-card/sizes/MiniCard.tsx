import React from "react";
import cl from "classnames";
import { BodyShort, Link } from "@navikt/ds-react";
import { Animation } from "../../../animation";
import { useInteractions } from "../useInteraction";

export interface MiniCardProps extends React.HTMLAttributes<HTMLElement> {
  title: string;
  hoverAnimation: any;
  className?: string;
  href: string;
  renderLink?: any;
  type?: "situation" | "product" | "tool" | "general";
}

const MiniCard = ({
  className,
  href,
  renderLink,
  hoverAnimation,
  title,
  type = "general",
  ...rest
}: MiniCardProps) => {
  const { handlers, isHovering, isFocused, isActive } = useInteractions();
  const hasAnimation = !!hoverAnimation;

  const focusClass = isFocused ? "navds-card--focus" : "";
  const activeClass = isActive ? "navds-card--active" : "";

  return (
    <article
      {...rest}
      {...handlers}
      className={cl(
        "navds-card",
        "navds-card-mini",
        `navds-card--${type}`,
        className,
        focusClass,
        activeClass
      )}
    >
      <div className={cl("navds-card__bed")}>
        {hasAnimation && (
          <Animation
            isHovering={isHovering}
            hoverAnimation={hoverAnimation}
            className={cl("navds-card__animation")}
          />
        )}
        <BodyShort>
          <Link href={href} className={cl("navds-card__title")}>
            {title}
          </Link>
        </BodyShort>
      </div>
    </article>
  );
};

export default MiniCard;

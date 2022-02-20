import React from "react";
import cl from "classnames";
import { Link } from "@navikt/ds-react";
import { Heading, BodyLong, BodyShort } from "@navikt/ds-react";
import { Animation } from "../../../animation";
import { useInteractions } from "../useInteraction";

export interface LargeCardProps extends React.HTMLAttributes<HTMLElement> {
  category: string;
  hoverAnimation: any;
  text: string;
  href: string;
  className?: string;
  renderLink?: any;
  title: string;
  type?: "situation" | "product" | "tool" | "general";
}

const LargeCard = ({
  className = "",
  title,
  text,
  category,
  hoverAnimation,
  type = "general",
  href,
  ...rest
}: LargeCardProps) => {
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
        "navds-card-large",
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
        <Heading level="3" size="medium">
          <Link href={href} className={cl("navds-card__title")}>
            {title}
          </Link>
        </Heading>
        <BodyLong className={cl("navds-card__text")}>{text}</BodyLong>
        <BodyShort className={cl("navds-card__category")}>{category}</BodyShort>
      </div>
    </article>
  );
};

export default LargeCard;

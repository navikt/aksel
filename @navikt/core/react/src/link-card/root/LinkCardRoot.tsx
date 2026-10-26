import React, { type HTMLAttributes, forwardRef } from "react";
import type { AkselColor } from "../../types";
import { BodyLong } from "../../typography";
import {
  LinkAnchorArrow,
  LinkAnchorOverlay,
} from "../../utils/components/link-anchor";
import { cl } from "../../utils/helpers";
import {
  LinkCardAnchor,
  type LinkCardAnchorProps,
} from "../anchor/LinkCardAnchor";
import {
  LinkCardDescription,
  type LinkCardDescriptionProps,
} from "../description/LinkCardDescription";
import {
  LinkCardFooter,
  type LinkCardFooterProps,
} from "../footer/LinkCardFooter";
import { LinkCardIcon, type LinkCardIconProps } from "../icon/LinkCardIcon";
import { LinkCardImage, type LinkCardImageProps } from "../image/LinkCardImage";
import { LinkCardTitle, type LinkCardTitleProps } from "../title/LinkCardTitle";
import { LinkCardContextProvider } from "./LinkCardRoot.context";

interface LinkCardProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * @default true
   */
  arrow?: boolean;
  /**
   * Adjusts arrow position.
   * @default "baseline"
   */
  arrowPosition?: "baseline" | "center";
  /**
   * Changes padding and typo sizes.
   * @default "medium"
   */
  size?: "small" | "medium";
  /**
   * Overrides color.
   *
   * We recommend avoiding status-colors (`info`, `success`, `warning`, `danger`) in LinkCards.
   * @default "neutral"
   * @see 🏷️ {@link AkselColor}
   * @see [📝 Documentation](https://aksel.nav.no/grunnleggende/styling/farger-tokens)
   */
  "data-color"?: AkselColor;
  /**
   * Changes the HTML element used for the root element.
   *
   * **When using `section`, provide either `aria-label` or `aria-labelledby` for better accessibility.**
   * `axe-core` might warn about unique landmarks if you have multiple Accordions on page with the same label.
   * In those cases consider updating to unique `aria-label` or `aria-labelledby` props.
   * @see [📝 Landmarks unique](https://dequeuniversity.com/rules/axe/4.6/landmark-unique)
   *
   *
   * **When using `article`, make sure `<LinkCard.Title />` is a heading and not a `span`.**
   * @default "div"
   */
  as?: "div" | "section" | "article";
}

const LinkCardRoot = forwardRef<HTMLDivElement, LinkCardProps>(
  (
    {
      children,
      className,
      arrow = true,
      arrowPosition = "baseline",
      size = "medium",
      as: Component = "div",
      ...restProps
    }: LinkCardProps,
    forwardedRef,
  ) => {
    return (
      <LinkCardContextProvider size={size}>
        <LinkAnchorOverlay asChild>
          <BodyLong
            as={Component}
            size={size}
            ref={forwardedRef}
            data-color="neutral"
            className={cl(
              "aksel-link-card",
              className,
              `aksel-link-card--${size}`,
            )}
            data-align-arrow={arrowPosition}
            {...restProps}
          >
            {children}
            {arrow && (
              <LinkAnchorArrow
                fontSize={size === "medium" ? "1.75rem" : "1.5rem"}
                className="aksel-link-card__arrow"
              />
            )}
          </BodyLong>
        </LinkAnchorOverlay>
      </LinkCardContextProvider>
    );
  },
);

/**
 * Accessible clickable card as a link.
 *
 * @see [📝 Documentation](https://aksel.nav.no/komponenter/core/linkcard)
 * @see 🏷️ {@link LinkCardProps}
 *
 *
 * @example
 * ```tsx
 * <LinkCard>
 *   <LinkCard.Icon>
 *     <IconOrPictogram />
 *   </LinkCard.Icon>
 *   <LinkCard.Title>
 *     <LinkCard.Anchor href="/href">
 *       LinkCard title
 *     </LinkCard.Anchor>
 *   </LinkCard.Title>
 *   <LinkCard.Description>
 *     This is a description of the link card.
 *   </LinkCard.Description>
 *   <LinkCard.Footer>Footer content</LinkCard.Footer>
 * </LinkCard>
 * ```
 */
const LinkCard = Object.assign(LinkCardRoot, {
  /**
   * @see 🏷️ {@link LinkCardTitleProps}
   */
  Title: LinkCardTitle,
  /**
   * @see 🏷️ {@link LinkCardAnchorProps}
   */
  Anchor: LinkCardAnchor,
  /**
   * @see 🏷️ {@link LinkCardDescriptionProps}
   */
  Description: LinkCardDescription,
  /**
   * @see 🏷️ {@link LinkCardFooterProps}
   */
  Footer: LinkCardFooter,
  /**
   * @see 🏷️ {@link LinkCardIconProps}
   */
  Icon: LinkCardIcon,
  /**
   * @see 🏷️ {@link LinkCardImageProps}
   */
  Image: LinkCardImage,
});

export {
  LinkCard,
  LinkCardTitle,
  LinkCardDescription,
  LinkCardFooter,
  LinkCardAnchor,
  LinkCardIcon,
  LinkCardImage,
};
export type {
  LinkCardProps,
  LinkCardTitleProps,
  LinkCardDescriptionProps,
  LinkCardFooterProps,
  LinkCardAnchorProps,
  LinkCardIconProps,
  LinkCardImageProps,
};

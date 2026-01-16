import React, { HTMLAttributes, forwardRef } from "react";
import type { AkselColor } from "../types";
import { BodyLong, Heading } from "../typography";
import { cl } from "../util/className";
import { createStrictContext } from "../util/create-strict-context";
import {
  LinkAnchor,
  LinkAnchorArrow,
  LinkAnchorOverlay,
  LinkAnchorProps,
} from "../util/link-anchor";

/* ------------------------------ LinkCard Root ----------------------------- */
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
   * Overrides inherited color.
   *
   * We reccomend avoiding status-colors (`info`, `success`, `warning`, `danger`) in LinkCards.
   * @see 🏷️ {@link AkselColor}
   * @see [📝 Documentation](https://aksel.nav.no/grunnleggende/styling/farger-tokens)
   */
  "data-color"?: AkselColor;
}

type LinkCardContextProps = {
  size: LinkCardProps["size"];
};

const { Provider: LinkCardContextProvider, useContext: useLinkCardContext } =
  createStrictContext<LinkCardContextProps>({
    name: "LinkCardContextProvider",
  });

interface LinkCardComponent
  extends React.ForwardRefExoticComponent<
    LinkCardProps & React.RefAttributes<HTMLDivElement>
  > {
  /**
   * @see 🏷️ {@link LinkCardTitleProps}
   */
  Title: typeof LinkCardTitle;
  /**
   * @see 🏷️ {@link LinkCardAnchorProps}
   */
  Anchor: typeof LinkCardAnchor;
  /**
   * @see 🏷️ {@link LinkCardDescriptionProps}
   */
  Description: typeof LinkCardDescription;
  /**
   * @see 🏷️ {@link LinkCardFooterProps}
   */
  Footer: typeof LinkCardFooter;
  /**
   * @see 🏷️ {@link LinkCardIconProps}
   */
  Icon: typeof LinkCardIcon;
  /**
   * @see 🏷️ {@link LinkCardImageProps}
   */
  Image: typeof LinkCardImage;
}

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
export const LinkCard = forwardRef<HTMLDivElement, LinkCardProps>(
  (
    {
      children,
      className,
      arrow = true,
      arrowPosition = "baseline",
      size = "medium",
      ...restProps
    }: LinkCardProps,
    forwardedRef,
  ) => {
    return (
      <LinkCardContextProvider size={size}>
        <LinkAnchorOverlay asChild>
          <BodyLong
            as="div"
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
) as LinkCardComponent;

/* ---------------------------- LinkCard Title ---------------------------- */
type LinkCardTitleProps = HTMLAttributes<HTMLHeadingElement> & {
  children: React.ReactNode;
  /**
   * Heading tag. Use "span" if you want a non header defining card
   * (eg. you have a lot of them all at once, such as in a grid)
   * @default "span"
   */
  as?: "span" | "h2" | "h3" | "h4" | "h5" | "h6";
};

/**
 * @see 🏷️ {@link LinkCardTitleProps}
 */
export const LinkCardTitle = forwardRef<HTMLHeadingElement, LinkCardTitleProps>(
  (
    { children, as = "span", className, ...restProps }: LinkCardTitleProps,
    forwardedRef,
  ) => {
    const context = useLinkCardContext();

    return (
      <Heading
        ref={forwardedRef}
        as={as}
        size={context.size === "medium" ? "small" : "xsmall"}
        className={cl("aksel-link-card__title", className)}
        {...restProps}
      >
        {children}
      </Heading>
    );
  },
);

/* ---------------------------- LinkCard Anchor ---------------------------- */
type LinkCardAnchorProps = LinkAnchorProps;

/**
 * @see 🏷️ {@link LinkCardAnchorProps}
 */
export const LinkCardAnchor = LinkAnchor;

/* ---------------------------- LinkCard Description ---------------------------- */
interface LinkCardDescriptionProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

/**
 * @see 🏷️ {@link LinkCardDescriptionProps}
 */
export const LinkCardDescription = forwardRef<
  HTMLDivElement,
  LinkCardDescriptionProps
>(
  (
    { children, className, ...restProps }: LinkCardDescriptionProps,
    forwardedRef,
  ) => {
    return (
      <div
        ref={forwardedRef}
        className={cl("aksel-link-card__description", className)}
        {...restProps}
      >
        {children}
      </div>
    );
  },
);

/* ---------------------------- LinkCard Footer ---------------------------- */
interface LinkCardFooterProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

/**
 * @see 🏷️ {@link LinkCardFooterProps}
 */
export const LinkCardFooter = forwardRef<HTMLDivElement, LinkCardFooterProps>(
  (
    { children, className, ...restProps }: LinkCardFooterProps,
    forwardedRef,
  ) => {
    return (
      <div
        ref={forwardedRef}
        className={cl("aksel-link-card__footer", className)}
        {...restProps}
      >
        {children}
      </div>
    );
  },
);

/* ---------------------------- LinkCard Icon ---------------------------- */
interface LinkCardIconProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

/**
 * @see 🏷️ {@link LinkCardIconProps}
 */
export const LinkCardIcon = forwardRef<HTMLDivElement, LinkCardIconProps>(
  ({ children, className, ...restProps }: LinkCardIconProps, forwardedRef) => {
    return (
      <div
        ref={forwardedRef}
        aria-hidden
        className={cl("aksel-link-card__icon", className)}
        {...restProps}
      >
        {children}
      </div>
    );
  },
);

/* ---------------------------- LinkCard Image ---------------------------- */
type ImageAspectRatio = "1/1" | "16/9" | "16/10" | "4/3" | (string & {});

interface LinkCardImageProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /**
   * The aspect-ratio CSS property allows you to define the desired width-to-height ratio of an element's box.
   * This means that even if the parent container or viewport size changes, the browser will adjust the element's dimensions to maintain the specified width-to-height ratio.
   */
  aspectRatio?: ImageAspectRatio;
}

/**
 * @see 🏷️ {@link LinkCardImageProps}
 */
export const LinkCardImage = forwardRef<HTMLDivElement, LinkCardImageProps>(
  (
    {
      children,
      className,
      aspectRatio,
      style,
      ...restProps
    }: LinkCardImageProps,
    forwardedRef,
  ) => {
    return (
      <div
        ref={forwardedRef}
        className={cl("aksel-link-card__image-container", className)}
        style={{
          ...style,
          aspectRatio,
        }}
        {...restProps}
      >
        {children}
      </div>
    );
  },
);

LinkCard.Title = LinkCardTitle;
LinkCard.Anchor = LinkCardAnchor;
LinkCard.Description = LinkCardDescription;
LinkCard.Footer = LinkCardFooter;
LinkCard.Icon = LinkCardIcon;
LinkCard.Image = LinkCardImage;

export type {
  LinkCardAnchorProps,
  LinkCardDescriptionProps,
  LinkCardFooterProps,
  LinkCardIconProps,
  LinkCardImageProps,
  LinkCardProps,
  LinkCardTitleProps,
};

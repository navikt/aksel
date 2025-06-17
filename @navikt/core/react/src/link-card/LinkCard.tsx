import React, { HTMLAttributes, ImgHTMLAttributes, forwardRef } from "react";
import { useRenameCSS } from "../theme/Theme";
import { BodyLong, Heading } from "../typography";
import {
  LinkAnchor,
  LinkAnchorArrow,
  LinkAnchorOverlay,
  type LinkAnchorOverlayProps,
  LinkAnchorProps,
} from "./LinkAnchor";

/* ------------------------------ LinkCard Root ----------------------------- */
type LinkCardProps = LinkAnchorOverlayProps & {
  /**
   * @default true
   */
  hasArrow?: boolean;
  /**
   * Adds a pressed state to the link card.
   * This is useful for indicating that the current context is related to the card.
   * Should be used in tandem with `aria-current`-attribute on `LinkCardAnchor`.
   * @see https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-current
   * @default false
   */
  isPressed?: boolean;
};

interface LinkCardComponent
  extends React.ForwardRefExoticComponent<
    LinkCardProps & React.RefAttributes<HTMLDivElement>
  > {
  Title: typeof LinkCardTitle;
  Anchor: typeof LinkCardAnchor;
  Description: typeof LinkCardDescription;
  Footer: typeof LinkCardFooter;
  Icon: typeof LinkCardIcon;
  Image: typeof LinkCardImage;
}

export const LinkCard = forwardRef<HTMLDivElement, LinkCardProps>(
  (
    {
      children,
      className,
      isPressed = false,
      hasArrow = true,
      ...restProps
    }: LinkCardProps,
    forwardedRef,
  ) => {
    const { cn } = useRenameCSS();

    return (
      <LinkAnchorOverlay asChild>
        <div
          ref={forwardedRef}
          data-color="neutral"
          {...restProps}
          className={cn("navds-link-card", className)}
          data-arrow={hasArrow}
          data-pressed={isPressed}
        >
          {children}
        </div>
      </LinkAnchorOverlay>
    );
  },
) as LinkCardComponent;

/* ---------------------------- LinkCard Title ---------------------------- */
type LinkCardTitleProps = HTMLAttributes<HTMLHeadingElement> & {
  children: React.ReactNode;
  /**
   * Heading tag, only use "div" if you want a non header defining card
   * (eg. you have a lot of them all at once, such as in a grid)
   * @default "span"
   */
  as?: "span" | "h2" | "h3" | "h4" | "h5" | "h6";
};

export const LinkCardTitle = forwardRef<HTMLHeadingElement, LinkCardTitleProps>(
  ({ children, as = "span", className }: LinkCardTitleProps, forwardedRef) => {
    const { cn } = useRenameCSS();

    return (
      <Heading
        as={as}
        size="small"
        ref={forwardedRef}
        className={cn("navds-link-card__title", className)}
      >
        {children}
        <LinkAnchorArrow className={cn("navds-link-card__arrow")} />
      </Heading>
    );
  },
);

/* ---------------------------- LinkCard Anchor ---------------------------- */
type LinkCardAnchorProps = LinkAnchorProps;

export const LinkCardAnchor = forwardRef<
  HTMLAnchorElement,
  LinkCardAnchorProps
>((props: LinkCardAnchorProps, forwardedRef) => {
  return <LinkAnchor ref={forwardedRef} {...props} />;
});

/* ---------------------------- LinkCard Description ---------------------------- */
interface LinkCardDescriptionProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const LinkCardDescription = forwardRef<
  HTMLDivElement,
  LinkCardDescriptionProps
>(({ children }: LinkCardDescriptionProps, forwardedRef) => {
  const { cn } = useRenameCSS();

  return (
    <BodyLong
      as="div"
      size="medium"
      ref={forwardedRef}
      className={cn("navds-link-card__description")}
    >
      {children}
    </BodyLong>
  );
});

/* ---------------------------- LinkCard Footer ---------------------------- */
interface LinkCardFooterProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const LinkCardFooter = forwardRef<HTMLDivElement, LinkCardFooterProps>(
  ({ children }: LinkCardFooterProps, forwardedRef) => {
    const { cn } = useRenameCSS();

    return (
      <div ref={forwardedRef} className={cn("navds-link-card__footer")}>
        {children}
      </div>
    );
  },
);

/* ---------------------------- LinkCard Icon ---------------------------- */
interface LinkCardIconProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const LinkCardIcon = forwardRef<HTMLDivElement, LinkCardIconProps>(
  ({ children, className, ...restProps }: LinkCardIconProps, forwardedRef) => {
    const { cn } = useRenameCSS();

    return (
      <div
        ref={forwardedRef}
        className={cn("navds-link-card__icon", className)}
        aria-hidden
        {...restProps}
      >
        {children}
      </div>
    );
  },
);

/* ---------------------------- LinkCard Image ---------------------------- */
type ImageAspectRatio = "1/1" | "16/9" | "16/10" | "4/3" | (string & {});

interface LinkCardImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  /**
   * The src attribute holds the path to the image you want to embed.
   */
  src: string;
  /**
   * The alt attribute holds a textual replacement for the image, which is mandatory and incredibly useful for accessibility — screen readers read the attribute value out to their users so they know what the image means.
   * Alt text is also displayed on the page if the image can't be loaded for some reason: for example, network errors, content blocking, or link rot.
   */
  alt: string;
  /**
   * The aspect-ratio CSS property allows you to define the desired width-to-height ratio of an element's box.
   * This means that even if the parent container or viewport size changes, the browser will adjust the element's dimensions to maintain the specified width-to-height ratio.
   */
  aspectRatio?: ImageAspectRatio;
}

export const LinkCardImage = forwardRef<HTMLImageElement, LinkCardImageProps>(
  (
    {
      className,
      alt,
      aspectRatio,
      width = aspectRatio ? "100%" : "",
      height = aspectRatio ? "100%" : "",
      style,
      ...restProps
    }: LinkCardImageProps,
    forwardedRef,
  ) => {
    const { cn } = useRenameCSS();

    return (
      <span className={cn("navds-link-card__image-container")}>
        <img
          ref={forwardedRef}
          {...restProps}
          style={{
            aspectRatio: aspectRatio ? aspectRatio : undefined,
            ...style,
          }}
          className={cn("navds-link-card__image", className)}
          alt={alt}
          width={width}
          height={height}
        />
      </span>
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

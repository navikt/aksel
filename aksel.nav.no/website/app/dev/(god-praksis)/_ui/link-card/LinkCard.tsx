/* eslint-disable @next/next/no-img-element */

/* TODO: Use `usRenameCSS` when ported to react-package */
import cn from "clsx";
import React, {
  AnchorHTMLAttributes,
  HTMLAttributes,
  ImgHTMLAttributes,
  forwardRef,
} from "react";
import { ArrowRightIcon } from "@navikt/aksel-icons";
import {
  BodyLong,
  BodyShortProps,
  Heading,
  HeadingProps,
} from "@navikt/ds-react";

/* ------------------------------ LinkCard Root ----------------------------- */
interface LinkCardProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /**
   * @default true
   */
  hasArrow?: boolean;
  /**
   * @default true
   */
  autoLayout?: boolean;
}

const LinkCard = forwardRef<HTMLDivElement, LinkCardProps>(
  (
    {
      children,
      className,
      hasArrow = true,
      autoLayout = true,
      ...restProps
    }: LinkCardProps,
    forwardedRef,
  ) => {
    return (
      <div
        ref={forwardedRef}
        data-color="neutral"
        {...restProps}
        className={cn("aksel-link-card", className)}
        data-arrow={hasArrow}
        data-layout={autoLayout ? "auto" : undefined}
      >
        {children}
      </div>
    );
  },
);

/* ---------------------------- LinkCard Title ---------------------------- */
type LinkCardTitleProps = HTMLAttributes<HTMLHeadingElement> & {
  children: React.ReactNode;
  /**
   * Heading tag, only use "div" if you want a non header defining card (eg. you have a lot of them all at once, such as in a masonry grid)
   * @default "h3"
   */
  as: "h2" | "h3" | "h4" | "h5" | "h6" | "span" | "div";
  /**
   *
   */
  size?: HeadingProps["size"];
  /**
   *
   */
  weight?: BodyShortProps["weight"];
  /**
   * @default "default"
   */
  variant?: "default" | "subtle";
  /**
   * Whether to show animated arrow icon
   * @default true
   */
  showArrow?: boolean;
};

const LinkCardTitle = forwardRef<HTMLHeadingElement, LinkCardTitleProps>(
  (
    {
      children,
      as,
      size = "small",
      weight = "semibold",
      variant = "default",
      showArrow = true,
      className,
    }: LinkCardTitleProps,
    forwardedRef,
  ) => {
    return (
      <Heading
        as={as}
        size={size}
        ref={forwardedRef}
        data-variant={variant}
        className={cn(
          "aksel-link-card__title",
          `aksel-link-card__title--${weight}`,
          className,
        )}
      >
        {children}
        {showArrow && <LinkCardArrow />}
      </Heading>
    );
  },
);

/* ---------------------------- LinkCard Anchor ---------------------------- */
interface LinkCardAnchorProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
}

/**
 * TODO:
 * - Support OverridableComponent
 */
const LinkCardAnchor = forwardRef<HTMLAnchorElement, LinkCardAnchorProps>(
  ({ children, className, ...restProps }, forwardedRef) => {
    return (
      <a
        ref={forwardedRef}
        {...restProps}
        className={cn("aksel-link-card__anchor", className)}
      >
        {children}
      </a>
    );
  },
);

/* ---------------------------- LinkCard Description ---------------------------- */
interface LinkCardDescriptionProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const LinkCardDescription = forwardRef<
  HTMLDivElement,
  LinkCardDescriptionProps
>(({ children }: LinkCardDescriptionProps, forwardedRef) => {
  return (
    <BodyLong
      as="div"
      size="medium"
      ref={forwardedRef}
      className={cn("aksel-link-card__description")}
    >
      {children}
    </BodyLong>
  );
});

/* ---------------------------- LinkCard Footer ---------------------------- */
interface LinkCardFooterProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const LinkCardFooter = forwardRef<HTMLDivElement, LinkCardFooterProps>(
  ({ children }: LinkCardFooterProps, forwardedRef) => {
    return (
      <div ref={forwardedRef} className={cn("aksel-link-card__footer")}>
        {children}
      </div>
    );
  },
);

/* ---------------------------- LinkCard Icon ---------------------------- */
interface LinkCardIconProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  /**
   * Whether the icon should have a background
   * @default true
   */
  hasBackground?: boolean;
}

const LinkCardIcon = forwardRef<HTMLDivElement, LinkCardIconProps>(
  (
    {
      children,
      hasBackground = true,
      className,
      ...restProps
    }: LinkCardIconProps,
    forwardedRef,
  ) => {
    return (
      <div
        ref={forwardedRef}
        className={cn("aksel-link-card__icon", className, {
          "aksel-link-card__icon--background": hasBackground,
        })}
        aria-hidden
        data-color="neutral"
        {...restProps}
      >
        {children}
      </div>
    );
  },
);

/* ---------------------------- LinkCard Arrow ---------------------------- */
const LinkCardArrow = () => {
  return (
    <ArrowRightIcon aria-hidden className={cn("aksel-link-card__arrow")} />
  );
};

/* ---------------------------- LinkCard Image ---------------------------- */
export type ImageAspectRatio = "1:1" | "16:9" | "16:10" | "4:3";

interface LinkCardImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  aspectRatio?: ImageAspectRatio;
  /**
   * Ignores card padding
   * @default false
   */
  isInset?: boolean;
}

const LinkCardImage = forwardRef<HTMLImageElement, LinkCardImageProps>(
  (
    {
      className,
      alt,
      aspectRatio,
      width = aspectRatio ? "100%" : "",
      height = aspectRatio ? "100%" : "",
      isInset = false,
      ...restProps
    }: LinkCardImageProps,
    forwardedRef,
  ) => {
    return (
      <span
        className={cn("aksel-link-card__image-container", {
          "aksel-link-card__image-container--inset": isInset,
        })}
      >
        <img
          ref={forwardedRef}
          {...restProps}
          className={cn(
            "aksel-link-card__image",
            className,
            aspectRatioClassName(aspectRatio),
          )}
          alt={alt}
          width={width}
          height={height}
        />
      </span>
    );
  },
);

function aspectRatioClassName(aspectRatio?: ImageAspectRatio): string {
  if (!aspectRatio) {
    return "";
  }

  const [width, height] = aspectRatio.split(":").map(Number);
  return `aksel-link-card__image--aspect-${width}-${height}`;
}

export {
  LinkCard,
  LinkCardAnchor,
  LinkCardArrow,
  LinkCardDescription,
  LinkCardFooter,
  LinkCardIcon,
  LinkCardImage,
  LinkCardTitle,
};

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
        data-color-role="neutral"
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
   * Heading tag
   * @default "h3"
   */
  as: "h2" | "h3" | "h4" | "h5" | "h6" | "span";
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
};

const LinkCardTitle = forwardRef<HTMLHeadingElement, LinkCardTitleProps>(
  (
    {
      children,
      as,
      size = "small",
      weight = "semibold",
      variant = "default",
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
        )}
      >
        {children}
        <LinkCardArrow />
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
  ({ children, ...restProps }, forwardedRef) => {
    return (
      <a
        ref={forwardedRef}
        {...restProps}
        className={cn("aksel-link-card__anchor")}
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
  /**
   * Whether the icon should have a background
   * @default true
   */
  hasBackground?: boolean;
}

const LinkCardIcon = forwardRef<HTMLDivElement, LinkCardIconProps>(
  (
    { children, hasBackground = true, ...restProps }: LinkCardIconProps,
    forwardedRef,
  ) => {
    return (
      <div
        ref={forwardedRef}
        className={cn("aksel-link-card__icon", {
          "aksel-link-card__icon--background": hasBackground,
        })}
        aria-hidden
        data-color-role="neutral"
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

  return (
    <svg
      className={cn("aksel-link-card__arrow")}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      focusable={false}
    >
      <path
        fill="currentColor"
        d="M7.28033 3.21967C6.98744 2.92678 6.51256 2.92678 6.21967 3.21967C5.92678 3.51256 5.92678 3.98744 6.21967 4.28033L7.28033 3.21967ZM11 8L11.5303 8.53033C11.8232 8.23744 11.8232 7.76256 11.5303 7.46967L11 8ZM6.21967 11.7197C5.92678 12.0126 5.92678 12.4874 6.21967 12.7803C6.51256 13.0732 6.98744 13.0732 7.28033 12.7803L6.21967 11.7197ZM6.21967 4.28033L10.4697 8.53033L11.5303 7.46967L7.28033 3.21967L6.21967 4.28033ZM10.4697 7.46967L6.21967 11.7197L7.28033 12.7803L11.5303 8.53033L10.4697 7.46967Z"
      />
      <path
        className={cn("aksel-link-card__arrow-line")}
        stroke="currentColor"
        d="M1.75 8H11"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
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
  LinkCardTitle,
  LinkCardIcon,
  LinkCardImage,
};
